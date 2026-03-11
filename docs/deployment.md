# Deployment (GitHub Actions + GitHub Pages)

The app is deployed as a static site via **GitHub Actions** to **GitHub Pages**.

## How it works

- **Workflow**: `.github/workflows/deploy.yml`
- **Trigger**: Push to `main`, or manual run (Actions → Deploy to GitHub Pages → Run workflow)
- **Build**: Copies `index.html`, `css/`, `js/`, `img/`, `audio/`, `docs/` into `_site/` and uploads as artifact
- **Deploy**: `actions/deploy-pages` publishes the artifact to GitHub Pages

## One-time repo setup

1. **Create the repo on GitHub** (if not already):
   - New repository, optionally push existing local repo.

2. **Enable GitHub Pages from Actions**:
   - Repo → **Settings** → **Pages**
   - Under "Build and deployment", set **Source** to **GitHub Actions**

3. **Ensure default branch is `main`** (or change `on.push.branches` in `.github/workflows/deploy.yml` to your branch).

## Deploying (how to do it later)

**Automatic**: Push to `main`:

```bash
git add .
git commit -m "your message"
git push origin main
```

Then check **Actions** tab; when the workflow finishes, the site is live at `https://<owner>.github.io/<repo>/`.

**Manual**: Repo → **Actions** → **Deploy to GitHub Pages** → **Run workflow** (run from `main`).

## Git details

- **First-time push**: Create the repo on GitHub (empty, no README). Then:
  `git remote add origin https://github.com/<owner>/<repo>.git`
  `git push -u origin main`
- **Later**: `git push origin main`. Short, one-line commit messages.

## Local vs deployed

- Deployed URL uses repo root as site root (e.g. `/css/style.css`, `/index.html`).
- GitHub Pages may add a base path if the repo is a **project site** (`/<repo>/`). For a **user/org site** (repo named `<user>.github.io`), the site is at the root.
