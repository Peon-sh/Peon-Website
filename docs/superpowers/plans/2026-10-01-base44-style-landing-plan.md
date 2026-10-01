# Base44-style landing — implementation plan

Spec: `../specs/2026-10-01-base44-style-landing-design.md`. Executed inline on `design/brand-colors`.

1. **Art** — `scripts/generate-brand-art.ts`; run once, commit `public/art/*.webp` (8 tiles). Idempotent: skips existing files.
2. **Foundation** — `globals.css`: surface tokens, `display`/`title-xl` type utilities, `bg-dots`, marquee keyframes with reduced-motion guard, `details` summary marker reset.
3. **Primitives** — `ui/reveal.tsx` (`<details>` row with circled-arrow summary; two sizes), `ui/stat-tile.tsx`, `ui/arrow-circle.tsx`.
4. **Header / footer** — taller header, indigo pill; footer thick top border.
5. **Hero** — display headline, one-line sub, collapsed paragraph; `MockDashboard` removed from hero.
6. **Image strip** — `landing/art-strip.tsx`: full-bleed marquee of the 8 tiles.
7. **Stack list** — rewrite `landing/features.tsx` as split title + 6 `Reveal` rows; `MockDashboard` inside row 1; keep the `ALSO` copy inside rows.
8. **How it works** — cream cards with coloured bottom borders.
9. **Indigo panel** — new `landing/platform-panel.tsx` with 3 `Reveal` rows (MCP/assistant, RBAC/audit, open source); absorbs `OpenSourceStrip` copy.
10. **Stat tiles** — new `landing/stats.tsx`.
11. **Comparison, pricing, FAQ, final CTA** — restyle in place.
12. **Compose** — `app/page.tsx` order: Hero, ArtStrip, LogoCloud, Stack, HowItWorks, PlatformPanel, Stats, Comparison, Pricing, Faq, FinalCta.
13. **Verify** — typecheck, lint, build; grep built HTML for collapsed copy; preview at 1440/390; reduced-motion; commit; update PR #61 title/body.
