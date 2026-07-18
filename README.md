# Peon Website

Marketing site for [Peon](https://peon.sh) — the open-source, self-hostable deployment platform. This repository powers the landing page, documentation, blog, and marketplace at **peon.sh**.

Auth and “Deploy” CTAs link to the Peon app ([app.peon.sh](https://app.peon.sh) / [Peon-sh/Peon](https://github.com/Peon-sh/Peon)).

## Author

**[Hiren Kavad (hironate)](https://github.com/hironate)**

## Related repositories

| Repository | Description |
|------------|-------------|
| [Peon-sh/Peon-Website](https://github.com/Peon-sh/Peon-Website) | This site (landing, docs, blog, marketplace) |
| [Peon-sh/Peon](https://github.com/Peon-sh/Peon) | Peon app, API, and worker |

## Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io/)

## Quick start

```bash
git clone https://github.com/Peon-sh/Peon-Website.git
cd Peon-Website
pnpm install
cp .env.example .env.local
pnpm dev
```

Runs on [http://localhost:3001](http://localhost:3001).

### Environment

| Variable | Description | Local default |
|----------|-------------|----------------|
| `NEXT_PUBLIC_SITE_URL` | Public URL of this marketing site | `http://localhost:3001` |
| `NEXT_PUBLIC_APP_URL` | Peon app URL (login / deploy CTAs) | `http://localhost:3000` |

Production:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://peon.sh` |
| `NEXT_PUBLIC_APP_URL` | `https://app.peon.sh` |

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Dev server on port 3001 |
| `pnpm build` / `pnpm start` | Production build and serve |
| `pnpm lint` / `pnpm typecheck` | Quality checks |
| `pnpm release` | Create a GitHub release (`release.mjs`) |

## Project layout

```
src/app            Pages: landing, docs, blogs, marketplace
src/components     Marketing UI (header, sections, etc.)
src/lib            Env helpers, docs/blog/template content
public             Static assets and logos
```

## Branching and deployment

| Branch | Purpose |
|--------|---------|
| `staging` | Integration / pre-production |
| `main` | Production |

### Promote staging → main

```bash
chmod +x ./deploy.sh
./deploy.sh
```

Creates a timestamped backup of `main`, then force-promotes `staging` to `main`.

### Create a release

Requires `OPENAI_API_KEY` in the environment and [GitHub CLI](https://cli.github.com/) (`gh auth login`).

```bash
git checkout main
git pull origin main
pnpm release
```

Typical flow:

```bash
git checkout staging && git pull
./deploy.sh
git checkout main && git pull
pnpm release
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

[MIT](./LICENSE)
