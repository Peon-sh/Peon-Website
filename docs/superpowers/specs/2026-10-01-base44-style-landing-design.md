# Base44-style landing redesign

Date: 2026-10-01 · Branch: `design/brand-colors` · Status: approved (user will review the result rather than the spec)

## Goal

Make the marketing site look bold and colourful in the manner of base44.com — huge display type, flat colour-block panels, an illustrated image strip, stat tiles, minimal visible body copy — while keeping the dark theme and every piece of SEO copy in the HTML.

## Decisions

- **Theme**: stay dark. Borrow base44's structure, not its light palette.
- **Palette**: logo colours only. Indigo `#7170FF` plays base44's electric-blue panel role; pink `#F472B6` and cyan `#22D3EE` for tiles/borders/stats; cream `#F3EFE7` for light cards on the dark page; `#0A0A0A` type on colour.
- **Imagery**: 8 flat-vector infra illustrations generated once with the OpenAI Images API, committed to `public/art/`.
- **Scope**: `/` plus header and footer. Other routes inherit tokens and type only.
- **Sub-text**: never removed, never `display:none`/`sr-only`. Long paragraphs collapse behind native `<details>` with a one-line visible summary. Crawlers index `<details>` content at full weight; JSON-LD and FAQ schema unchanged.

## Foundation

- New tokens: `--surface-indigo`, `--surface-pink`, `--surface-cyan`, `--surface-cream` with matching `-foreground` tokens; exposed via `@theme inline`.
- Type: `.display` = `clamp(3rem, 7vw, 6rem)`, tracking −0.04em, line-height 0.95. Section titles `clamp(2.5rem, 4.5vw, 3.5rem)`.
- Texture: `bg-dots` utility (13px dot grid, faint) replaces `bg-grid` on the hero and CTA.
- The gradient utilities from the colour-token pass stay defined but are no longer used on the landing page.

## Landing page sections

1. Header: h-16, centred nav, indigo "Get started" pill.
2. Hero: display headline, one-line sub, two CTAs, `<details>` "What is Peon" holding the full paragraph.
3. Image strip: full-bleed marquee of 8 tiles, bracket corner markers, CSS scroll, pause on hover, static under `prefers-reduced-motion`.
4. Logo cloud: kept.
5. Stack list: 3-line title left; right, 6 big-type `<details>` rows (summary = title + circled arrow; content = body + mock). Replaces the feature-card grid. Row 1 holds `MockDashboard`.
6. How it works: three cream cards, thick cyan/pink/indigo bottom borders, big step numbers, mocks inside.
7. Indigo panel: left indigo block with huge white headline; right, 3 `<details>` rows (MCP + assistant, RBAC + audit, Open source).
8. Stat tiles: pink/cyan/indigo/cream, staggered heights.
9. Comparison: table kept; indigo header row; Peon column tinted.
10. Pricing: big title left, three cards right; Cloud card in cream.
11. FAQ: kept; larger question type.
12. Final CTA: full-bleed indigo block.
13. Footer: thick top border, larger wordmark.

## Imagery

`scripts/generate-brand-art.ts` (run with `pnpm tsx`): reads `OPENAI_API_KEY` from `.env`, generates 8 WebP tiles at 1536×1024 with a shared style prefix (flat vector, `#0A0A0A` background, strictly indigo/pink/cyan/white, no text), skips files that already exist. Subjects: server rack, git push, database + backup, TLS shield, terminal, team avatars, globe/domains, Compose blocks.

## Testing

`pnpm typecheck`, `pnpm lint`, `pnpm build`; grep the built HTML for collapsed copy; visual pass at 1440 and 390 wide in the preview; marquee hover and reduced-motion; keyboard-open every `<details>`.
