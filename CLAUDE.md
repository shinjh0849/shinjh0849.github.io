# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal CV/portfolio site for Jiho Shin, deployed as a GitHub Pages user site at https://shinjh0849.github.io. Built with **Astro** (static output) plus **GSAP + ScrollTrigger** for animation and **Lenis** for smooth scrolling. The default branch is `master`; pushes to it trigger `.github/workflows/deploy.yml`, which builds `dist/` and deploys via GitHub Pages Actions (the Pages source must be set to "GitHub Actions" in repo settings).

## Commands

```bash
npm install          # Node >= 22
npm run dev          # dev server at http://localhost:4321
npm run build        # production build into dist/
npm run preview      # serve dist/ locally
npm run check        # astro check (TypeScript + template diagnostics)
```

There are no tests. Verify visually with `npm run dev`; the Claude-in-Chrome extension may be unavailable, in which case a Playwright script against a cached Chromium works (headless Chrome `--screenshot` does NOT: GSAP intro animations never tick, so the page captures blank).

## Architecture

- **Content is data, not markup.** Everything shown on the site lives in typed arrays under `src/data/`: `experience.ts` (experience + education timeline entries), `publications.ts` (all papers, `kind` = conference | journal | preprint, plus the `selected` subset for the home page), `misc.ts` (awards, conferences, service, gallery), `site.ts` (name, links, nav, portrait path). To add a paper or role, edit the data file; the page templates loop over it.
- **Pages** in `src/pages/*.astro` are thin: each wraps content in `layouts/Base.astro` and (except the home page) a `PageHead` component. Shared pieces are `Timeline.astro` (experience/education) and `PubItem.astro` (publication row, auto-bolds "Jiho Shin").
- **One global stylesheet** `src/styles/global.css` holds the design tokens (`:root` vars), typography (Instrument Serif display / Inter body / JetBrains Mono labels, all self-hosted via @fontsource), and reusable classes (`.card`, `.btn`, `.timeline`, `.pub`, `.row`, `.masonry`, `.lightbox`). Page-specific styles use scoped `<style>` blocks in the page.
- **Motion system** is `src/scripts/motion.ts`, loaded once from `Base.astro`. It uses `data-*` hooks rather than per-page code:
  - `data-split` word-splits a headline and animates it in on load; `data-hero-fade` fades in after it.
  - `data-reveal` (single element) and `data-stagger` (children) fade/rise on scroll.
  - `data-counter="N"` counts up; `data-magnetic` buttons follow the cursor; `data-tilt` adds 3D tilt; `data-parallax` / `data-hscrub` scrub with scroll.
  - `.timeline-track span` is drawn with scroll scrub; `.card` gets a cursor spotlight via `--mx/--my`.
  - Everything honors `prefers-reduced-motion`. CSS sets `opacity: 0` on reveal targets only when `html.js` is present, so the site still reads without JS.
- **View transitions** are on via `<ClientRouter />`. Because pages swap without a full reload, `motion.ts` re-inits on `astro:page-load` and tears down ScrollTriggers on `astro:before-swap`. Any new page-level script must follow the same pattern: bind listeners once at document level (delegation), never per element on load. See the publications filter and gallery lightbox scripts for the pattern.
- **Static assets** live in `public/` (`images/gallery_N.jpg`, `CV.pdf`, `favicon.svg`). `site.portrait` currently points to an SVG placeholder; swap in a real photo there.

## Reference sources

- Old personal website (content source for the migration; will be retired once the new site is approved): https://sites.google.com/view/jiho-shin
- Google Scholar profile (authoritative publication list and citation data): https://scholar.google.com/citations?hl=en&user=kowMMYcAAAAJ
