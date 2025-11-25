# jihoShin.github.io

Personal site for Jiho Shin powered by [Jekyll](https://jekyllrb.com/) and the [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes) theme. The repo already contains a hero-style landing page, About page, and a test page you can use to verify deployments to `jihoShin.github.io`.

## Local development

1. Ensure Ruby and Bundler are installed.
2. Install dependencies: `bundle install`
3. Serve locally: `bundle exec jekyll serve`
4. Visit <http://localhost:4000> to preview the site.

To run a production build locally (useful before deploying), run:

```bash
JEKYLL_ENV=production bundle exec jekyll build
```

## Repo layout

- `index.md` – splashy landing page with hero copy and featured links.
- `_pages/` – About, Projects, Notes (blog archive), and a Test page for deployment checks.
- `_posts/` – Markdown blog posts (`YYYY-MM-DD-title.md`).
- `_data/navigation.yml` – Primary navigation items.
- `assets/css/main.scss` – Imports the Minimal Mistakes theme and any custom styles.

## Deployment

This repository is a user site (`jihoShin.github.io`), so every push to `main` automatically redeploys via GitHub Pages. After making changes:

```bash
git add .
git commit -m "Update site"
git push origin main
```

Within a couple of minutes you should see the updated site live at <https://jihoShin.github.io>. If you enabled GitHub Actions or custom workflows, monitor their logs for build status.

After each deploy hit <https://jihoShin.github.io/test/> to confirm the test page reflects the latest changes.
