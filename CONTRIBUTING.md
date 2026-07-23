# Contributing to Peon Website

Thanks for helping improve the Peon marketing site, docs, blog, and marketplace.

## Author

Maintained by **[Hiren Kavad (hironate)](https://github.com/hironate)**.

## Ways to contribute

- **Docs**: improve guides under `src/lib/docs` and pages in `src/app/docs`.
- **Blog**: add or edit posts under `src/lib/blog` and `src/app/blogs`.
- **Marketplace / templates**: keep catalog copy and listings in sync with the [Peon app](https://github.com/Peon-sh/Peon).
- **Landing / UX**: polish marketing sections in `src/components` and `src/app/page.tsx`.
- **Bugs**: open an issue with URL, screenshot, and expected vs. actual behavior.

## Development setup

```bash
git clone https://github.com/Peon-sh/Peon-Website.git
cd Peon-Website
pnpm install
cp .env.example .env.local
pnpm dev    # http://localhost:3001
```

Point `NEXT_PUBLIC_APP_URL` at a running Peon app (default `http://localhost:3000`) so login and deploy links work.

## Branching

- Branch from `staging`.
- Use prefixes: `feature/`, `bugfix/`, `hotfix/`, `chore/`, `docs/`.
- Open PRs against `staging` unless maintainers ask otherwise.

## Pull request guidelines

1. Keep PRs focused and small.
2. Run `pnpm lint` and `pnpm typecheck` before pushing.
3. Verify the page on desktop and mobile when changing UI.
4. Do not commit `.env`, `.env.local`, or secrets.

## Security

Report vulnerabilities privately — see [SECURITY.md](./SECURITY.md). Open PRs against **`staging`** only; `main` is maintainer-managed.

## Commit messages

Use Conventional Commits:

- `feat:` / `fix:` / `docs:` / `style:` / `refactor:` / `chore:`

## Releases (maintainers)

```bash
./deploy.sh     # promote staging → main
pnpm release    # tag + GitHub release
```

Requires `OPENAI_API_KEY` and authenticated `gh`.

## Code of conduct

Be respectful and constructive.
