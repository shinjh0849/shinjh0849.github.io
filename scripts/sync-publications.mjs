// Sync src/data/publications.json with OpenAlex.
//
//   node scripts/sync-publications.mjs            # apply changes, write summary
//   node scripts/sync-publications.mjs --dry-run  # report only
//
// Rules (see scripts/sync-config.json for the author id and ignore list):
//  - A work must share at least one co-author with an existing entry, otherwise
//    it is skipped (OpenAlex sometimes merges other "Jiho Shin"s into the profile).
//  - Matching against existing entries: arXiv id / DOI first, then normalized
//    title, then fuzzy title (flagged for review).
//  - An existing preprint whose matched OpenAlex work now has a non-preprint
//    venue is promoted to conference/journal with the new link.
//  - An unmatched work is added. Preprints are only added if they are from the
//    current or previous year, so old arXiv versions of published papers do not
//    reappear.
//  - Nothing is ever deleted.

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = resolve(root, 'src/data/publications.json');
const CONFIG = resolve(root, 'scripts/sync-config.json');
const SUMMARY = resolve(root, 'sync-summary.md');
const dryRun = process.argv.includes('--dry-run');

const config = JSON.parse(readFileSync(CONFIG, 'utf8'));
const pubs = JSON.parse(readFileSync(DATA, 'utf8'));
const thisYear = new Date().getFullYear();

/* ---------- helpers ---------- */
const norm = (s) => (s ?? '').toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
const tokens = (s) => new Set(norm(s).split(' ').filter((w) => w.length > 2));
const jaccard = (a, b) => { const A = tokens(a), B = tokens(b); const i = [...A].filter((x) => B.has(x)).length; return i / (A.size + B.size - i || 1); };
const prefix = (s) => { const p = norm(s.split(':')[0]); return p.length >= 8 ? p : null; };
const arxivIdOf = (s) => (s ?? '').match(/(\d{4}\.\d{4,5})(v\d+)?/)?.[1] ?? null;
const doiOf = (s) => (s ?? '').match(/10\.\d{4,9}\/[^\s"']+/i)?.[0]?.toLowerCase().replace(/[.,;)]+$/, '') ?? null;
// Full first + last name (initials like "S. Wang" are too ambiguous for the co-author filter).
const nameKey = (n) => { const parts = norm(n).split(' ').filter(Boolean); return parts.length >= 2 && parts[0].length > 1 ? `${parts[0]} ${parts[parts.length - 1]}` : ''; };
const isPreprintSource = (w) => {
  const name = w.primary_location?.source?.display_name ?? '';
  return w.type === 'preprint' || /arxiv|hal\b|ssrn|preprint|research square/i.test(name);
};
const abbrev = (full) => {
  for (const [needle, abbr] of Object.entries(config.venueAbbreviations)) if (full.toLowerCase().includes(needle.toLowerCase())) return abbr;
  return null;
};

/* ---------- known co-authors from existing data ---------- */
const knownCoauthors = new Set();
for (const p of pubs) for (const a of p.authors.split(',')) { const k = nameKey(a); if (k && k !== 'j shin') knownCoauthors.add(k); }

/* ---------- fetch ---------- */
async function fetchWorks() {
  const out = [];
  let cursor = '*';
  while (cursor) {
    const url = `https://api.openalex.org/works?filter=author.id:${config.openalexAuthorId}&per-page=100&cursor=${cursor}&select=id,title,publication_year,type,doi,ids,primary_location,authorships,locations`;
    const res = await fetch(url, { headers: { 'User-Agent': 'shinjh0849.github.io publication sync' } });
    if (!res.ok) throw new Error(`OpenAlex ${res.status}: ${await res.text()}`);
    const json = await res.json();
    out.push(...json.results);
    cursor = json.meta?.next_cursor ?? null;
    if (!json.results.length) break;
  }
  return out;
}

/* ---------- matching ---------- */
function findMatch(work) {
  const wDoi = doiOf(work.doi);
  const wArxiv = arxivIdOf(work.ids?.openalex ? work.doi : null) ?? arxivIdOf(work.doi);
  const wArxivFromLocations = (work.locations ?? []).map((l) => arxivIdOf(l.landing_page_url ?? l.pdf_url)).find(Boolean);
  for (const p of pubs) {
    if (p.openalex && p.openalex === work.id) return { pub: p, how: 'openalex-id' };
    const pArxiv = arxivIdOf(p.href), pDoi = doiOf(p.href);
    if (wArxiv && pArxiv === wArxiv) return { pub: p, how: 'arxiv-id' };
    if (wArxivFromLocations && pArxiv === wArxivFromLocations) return { pub: p, how: 'arxiv-id' };
    if (wDoi && pDoi === wDoi) return { pub: p, how: 'doi' };
  }
  for (const p of pubs) if (norm(p.title) === norm(work.title)) return { pub: p, how: 'title' };
  let best = null;
  for (const p of pubs) {
    const j = jaccard(p.title, work.title);
    const samePrefix = prefix(p.title) && prefix(p.title) === prefix(work.title);
    if (j >= 0.6 || samePrefix) if (!best || j > best.score) best = { pub: p, how: 'fuzzy', score: j };
  }
  return best;
}

function venueFor(work) {
  const full = work.primary_location?.source?.display_name ?? '';
  const short = abbrev(full);
  return { short: short ? `${short} ${work.publication_year}` : `${full} ${work.publication_year}`.trim(), full, guessed: !short };
}

/* ---------- main ---------- */
const works = await fetchWorks();
const changes = { promoted: [], added: [], skipped: [], review: [] };

for (const w of works.sort((a, b) => (b.publication_year ?? 0) - (a.publication_year ?? 0))) {
  if (!w.title) continue;
  if (config.ignoreOpenAlexIds.includes(w.id)) continue;
  const coauthors = (w.authorships ?? []).map((a) => nameKey(a.author?.display_name ?? ''));
  const shares = coauthors.some((k) => knownCoauthors.has(k));
  if (!shares) { changes.skipped.push(`${w.title} (${w.publication_year}) — no known co-author`); continue; }

  const m = findMatch(w);
  const preprint = isPreprintSource(w);
  const link = w.doi ?? w.primary_location?.landing_page_url ?? undefined;

  if (m) {
    const p = m.pub;
    if (!p.openalex && m.how !== 'fuzzy') p.openalex = w.id;
    if (m.how === 'fuzzy') changes.review.push(`"${w.title}" fuzzily matched "${p.title}" (score ${m.score.toFixed(2)}) — verify`);
    if (p.kind === 'preprint' && !preprint) {
      const v = venueFor(w);
      const kind = w.primary_location?.source?.type === 'journal' ? 'journal' : 'conference';
      const before = `${p.venue} (${p.kind})`;
      p.kind = kind; p.venue = v.short; p.venueFull = v.full || undefined; p.year = w.publication_year ?? p.year;
      delete p.note; if (link) p.href = link; p.openalex = w.id;
      changes.promoted.push(`${p.title}: ${before} → ${v.short} (${kind})${v.guessed ? ' — venue abbreviation GUESSED, fix the tag' : ''}`);
    }
    continue;
  }

  if (preprint && (w.publication_year ?? 0) < thisYear - 1) { changes.skipped.push(`${w.title} (${w.publication_year}) — old preprint, not added`); continue; }
  const v = venueFor(w);
  const entry = {
    kind: preprint ? 'preprint' : w.primary_location?.source?.type === 'journal' ? 'journal' : 'conference',
    year: w.publication_year,
    title: w.title,
    authors: (w.authorships ?? []).map((a) => a.author?.display_name).filter(Boolean).join(', '),
    venue: preprint ? `${/hal/i.test(v.full) ? 'HAL' : 'arXiv'} ${w.publication_year}` : v.short,
    ...(preprint ? { note: 'under review' } : v.full ? { venueFull: v.full } : {}),
    ...(link ? { href: link } : {}),
    openalex: w.id,
  };
  pubs.unshift(entry);
  changes.added.push(`${entry.title} — ${entry.venue} (${entry.kind})${!preprint && v.guessed ? ' — venue abbreviation GUESSED, fix the tag' : ''}`);
}

/* ---------- output ---------- */
const lines = ['## Publication sync from OpenAlex', ''];
const section = (title, items) => { if (!items.length) return; lines.push(`### ${title}`, ...items.map((i) => `- ${i}`), ''); };
section('Promoted preprint → published', changes.promoted);
section('Added', changes.added);
section('Needs a look', changes.review);
section('Skipped', changes.skipped);
const changed = changes.promoted.length + changes.added.length > 0;
if (!changed) lines.push('_No new or promoted publications._', '');
lines.push(`Source: https://openalex.org/${config.openalexAuthorId} · ${works.length} works checked on ${new Date().toISOString().slice(0, 10)}`);
const summary = lines.join('\n');
console.log(summary);

if (!dryRun) {
  // Always rewrite: this also persists newly stamped `openalex` ids. The
  // workflow only opens a PR when the file actually changed.
  pubs.sort((a, b) => b.year - a.year || a.kind.localeCompare(b.kind));
  writeFileSync(DATA, JSON.stringify(pubs, null, 2) + '\n');
  writeFileSync(SUMMARY, summary + '\n');
  console.log(`\n${changed ? 'Updated' : 'No content changes in'} ${DATA}`);
}
