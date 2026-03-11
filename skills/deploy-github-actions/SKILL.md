---
name: deploy-github-actions
description: Deploys the static site via GitHub Actions to GitHub Pages. Use when deploying the app, changing deployment workflow, or documenting git/deploy steps. References docs/deployment.md for one-time setup and how to deploy later.
---

# Deploy via GitHub Actions

## What’s in place

- **Workflow**: `.github/workflows/deploy.yml` — runs on push to `main` or manual dispatch.
- **Docs**: [docs/deployment.md](docs/deployment.md) — one-time repo setup, how to deploy, git details.

## When to use this skill

- Deploying the app or explaining how to deploy.
- Changing the GitHub Actions workflow or Pages setup.
- Adding or updating deployment or git instructions.

## Deploying (later)

1. **Automatic**: Push to `main` → Actions runs → site updates at `https://<owner>.github.io/<repo>/`.
2. **Manual**: Actions → Deploy to GitHub Pages → Run workflow (from `main`).
3. **One-time**: Repo Settings → Pages → Source = **GitHub Actions** (see docs/deployment.md).

## Git workflow (short)

- Commit: short, one-line message; focus on main change.
- Push: `git push origin main` (after first time: `git push -u origin main`).
- Remote: `git remote add origin https://github.com/<owner>/<repo>.git` if new.

## Changing the workflow

- Edit `.github/workflows/deploy.yml`. Build step copies `index.html` and dirs `css`, `js`, `img`, `audio`, `docs` into `_site/`; add or remove dirs there if the app layout changes.
- Keep docs/deployment.md in sync with any new trigger, branch, or setup step.
