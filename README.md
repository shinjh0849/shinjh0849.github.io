# shinjh0849.github.io

Personal site for Jiho Shin, built with [Astro](https://astro.build) and [GSAP](https://gsap.com).

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs dist/
```

## Content

All content is in `src/data/` (experience, education, publications, awards, conferences, service, gallery). Edit those files; the pages render from them.

## Deploy

Pushing to `master` runs the GitHub Actions workflow in `.github/workflows/deploy.yml`, which builds and deploys to GitHub Pages. In the repo settings, set **Pages → Source** to **GitHub Actions** (one-time).
