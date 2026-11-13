import raw from './publications.json';

export type PubKind = 'conference' | 'journal' | 'preprint' | 'thesis';

export interface Publication {
  title: string;
  authors: string; // "Jiho Shin" is highlighted automatically
  venue: string; // short label shown as a tag, e.g. "ICSE 2026"
  venueFull?: string;
  year: number;
  date: string; // YYYY-MM, used for ordering (newest first)
  kind: PubKind;
  href?: string;
  note?: string; // e.g. "to appear", "under review"
  award?: string; // e.g. "Distinguished Paper Award"
  openalex?: string; // OpenAlex work id, set by scripts/sync-publications.mjs
}

// publications.json is the source of truth. scripts/sync-publications.mjs
// (run on demand via .github/workflows/sync-publications.yml) proposes edits to it
// from OpenAlex via a pull request.
export const publications = (raw as Publication[]).slice().sort((a, b) => b.date.localeCompare(a.date));

const selectedTitles = [
  'Retrieval-Augmented Test Generation: How Far Are We?',
  'SecVulEval: Benchmarking LLMs for Real-World C/C++ Vulnerability Detection',
  'StaAgent: An Agentic Framework for Testing Static Analyzers',
  'Assessing Evaluation Metrics for Neural Test Oracle Generation',
];
export const selected = selectedTitles
  .map((t) => publications.find((p) => p.title === t))
  .filter((p): p is Publication => Boolean(p));

export const counts = {
  all: publications.length,
  conference: publications.filter((p) => p.kind === 'conference').length,
  journal: publications.filter((p) => p.kind === 'journal').length,
  preprint: publications.filter((p) => p.kind === 'preprint').length,
  thesis: publications.filter((p) => p.kind === 'thesis').length,
  peerReviewed: publications.filter((p) => p.kind === 'conference' || p.kind === 'journal').length,
  awards: publications.filter((p) => p.award && p.kind !== 'thesis').length,
};
