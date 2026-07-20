# Contributing

Hey, thanks for your interest in contributing to Peon Website! We appreciate your help and taking the time to contribute.

Before you start, please first discuss the feature or bug you want to work on with the owners and community via [GitHub issues](https://github.com/Peon-sh/Peon-Website/issues).

We have a few guidelines to follow when contributing to this project:

- [Commit Convention](#commit-convention)
- [Setup](#setup)
- [Development](#development)
- [Build](#build)
- [Pull Request](#pull-request)
- [Important Considerations](#important-considerations-for-pull-requests)
- [Marketplace & templates](#marketplace--templates)
- [App repository](#app-repository)

## Author

Maintained by **[Hiren Kavad (hironate)](https://github.com/hironate)**.

## Commit Convention

Before you create a Pull Request, please make sure your commit message follows the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Type

Must be one of the following:

| Type | Description |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation only changes |
| `style` | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.) |
| `refactor` | A code change that neither fixes a bug nor adds a feature |
| `perf` | A code change that improves performance |
| `test` | Adding missing tests or correcting existing tests |
| `build` | Changes that affect the build system or external dependencies |
| `ci` | Changes to our CI configuration files and scripts |
| `chore` | Other changes that don't modify `src` or test files |
| `revert` | Reverts a previous commit |

Example:

```
docs: clarify self-host install steps
```

## Setup

Before you start, please clone based on the **`staging`** branch. `main` should reflect the latest stable release; PRs are merged to `staging` unless maintainers ask otherwise.

We use **Node.js 22** (see `engines` in `package.json`). If you have `nvm` installed:

```bash
nvm install 22 && nvm use
```

```bash
git clone https://github.com/Peon-sh/Peon-Website.git
cd Peon-Website
git checkout staging
pnpm install
cp .env.example .env.local
```

### Requirements

- Node.js 22.x
- [pnpm](https://pnpm.io/)
- Optional: peon-analytics Postgres if you need live blog SSR (`DATABASE_URL` in `.env.example`)

Point `NEXT_PUBLIC_APP_URL` at a running Peon app (default `http://localhost:3000`) so login and deploy links work.

## Development

```bash
pnpm dev    # http://localhost:3001
```

### Ways to contribute

- **Docs**: guides under `src/lib/docs` and pages in `src/app/docs`
- **Blog**: posts and SSR wiring (`src/lib/blog`, `src/app/blogs`, analytics `DATABASE_URL`)
- **Marketplace**: catalog + logos (`src/lib/templates`, `public/svgs`, `src/components/marketing/marketplace-grid.tsx`)
- **Landing / UX**: marketing sections in `src/app/page.tsx` and `src/components`
- **Bugs**: open an issue with URL, screenshot, and expected vs. actual behavior

### Project layout

```
src/app            Pages: landing, docs, blogs, marketplace, open-source, legal
src/components     Marketing UI (header, footer, marketplace grid, etc.)
src/lib            Env helpers, docs/blog/template content, SEO pages
public             Static assets, brand logos, marketplace svgs
```

### Note

This project uses ESLint (`pnpm lint`) and TypeScript (`pnpm typecheck`). Keep editor format-on-save aligned with the repo so PRs stay focused.

## Build

```bash
pnpm build
pnpm start    # production server on port 3001
```

Before opening a PR:

```bash
pnpm lint
pnpm typecheck
```

Verify changed pages on desktop and mobile.

## Pull Request

- The **`staging`** branch is the integration branch; **`main`** should reflect the latest stable release.
- Create a new branch for each feature or bug fix (`feature/`, `bugfix/`, `hotfix/`, `chore/`, `docs/`).
- Provide a clear, concise PR description. Screenshots or a short video for UI changes are awesome.
- If your PR fixes an open issue, reference it (e.g. `Fixes #123`).
- Do not commit `.env`, `.env.local`, or secrets.

## Important Considerations for Pull Requests

**Testing is mandatory.** All Pull Requests must be tested by the PR author before submission. Verify your changes with `pnpm dev` (see [Setup](#setup) / [Development](#development)). Untested PRs will be rejected.

**Focus and scope.** Each PR should address a single, well-defined problem or one new feature.

**Avoid unfocused changes.** Please avoid PRs that contain only whitespace, IDE formatting, or drive-by refactors unless they are part of a clearly defined cleanup issue.

**Issue association.** For any significant change, open an issue first to discuss the approach with maintainers. Link related issues in the PR description.

**Large features.** Broad marketing or docs rewrites should be outlined in an issue first so the site stays coherent with Peon’s product direction.

Thank you for your contribution!

## Marketplace & templates

The public marketplace catalog is vendored here (`src/lib/templates/service-templates.json`) with logos under `public/svgs/`. The Peon app keeps a parallel catalog for one-click deploy.

Recommendations:

- Keep slogans, categories, tags, and logo paths in sync with [Peon-sh/Peon](https://github.com/Peon-sh/Peon).
- Logos belong in `public/svgs/`; reference them as `svgs/<file>` in the catalog JSON.
- Test marketplace cards and deploy CTAs against a local or staging app URL.

## App repository

Platform code (dashboard, API, worker, template deploy engine) lives in **[Peon-sh/Peon](https://github.com/Peon-sh/Peon)**. See that repository’s [CONTRIBUTING.md](https://github.com/Peon-sh/Peon/blob/main/CONTRIBUTING.md).

## Releases (maintainers)

```bash
./deploy.sh     # promote staging → main (creates a backup branch)
pnpm release    # tag + GitHub release
```

Requires `OPENAI_API_KEY` and authenticated `gh` (`gh auth login`).

Typical flow:

```bash
git checkout staging && git pull
./deploy.sh
git checkout main && git pull
pnpm release
```

## Code of conduct

Be respectful and constructive.
