'use client';

import { useEffect, useMemo, useState } from 'react';
import type { TemplateSummary } from '@/lib/templates';
import { AppCtaLink } from '@/components/marketing/app-cta-link';
import { MarketplaceLogo } from '@/components/marketing/marketplace-logo';
import { applyCtaAttribution } from '@/lib/attribution';

const PAGE_SIZE = 48;

/**
 * Client-side searchable grid for the public marketplace. Deploy links go to
 * the Peon app (`/deploy/[slug]` on the app host). Cards paginate so the
 * initial hydrate is ~48 nodes instead of the full catalog.
 */
export function MarketplaceGrid({
  templates,
  categories,
}: {
  templates: TemplateSummary[];
  categories: string[];
}) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return templates.filter((t) => {
      if (category !== 'all' && (t.category ?? '') !== category) return false;
      if (!q) return true;
      return `${t.slug} ${t.slogan} ${t.tags.join(' ')}`.toLowerCase().includes(q);
    });
  }, [templates, search, category]);

  const shown = filtered.slice(0, visible);

  useEffect(() => {
    applyCtaAttribution();
  }, [visible, search, category]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          placeholder="Search services (analytics, wordpress, n8n...)"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setVisible(PAGE_SIZE);
          }}
          className="border-border bg-card placeholder:text-faint focus:border-border-bright h-10 flex-1 rounded-md border px-3 text-sm outline-none"
        />
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setVisible(PAGE_SIZE);
          }}
          className="border-border bg-card focus:border-border-bright h-10 rounded-md border px-3 text-sm outline-none sm:w-56"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <p className="text-faint mt-3 font-mono text-[11px] uppercase tracking-wide">
        {filtered.length} of {templates.length} services
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((t, index) => (
          <div
            key={t.slug}
            className="border-border bg-card hover:border-border-bright flex flex-col rounded-lg border p-5 transition-colors"
          >
            <div className="flex items-start gap-3">
              <MarketplaceLogo src={t.logo} name={t.name} priority={index < 6} />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-heading font-700 text-sm">{t.name}</h3>
                  {t.category && (
                    <span className="border-border text-muted-foreground shrink-0 rounded border px-1.5 py-0.5 text-[10px]">
                      {t.category}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground mt-2 line-clamp-3 text-xs leading-relaxed">
                  {t.slogan || 'Self-hostable service, deployable in one click.'}
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-1 items-end justify-between">
              <AppCtaLink
                path={`/deploy/${t.slug}`}
                className="bg-primary text-primary-foreground rounded-md px-3 py-1.5 text-xs font-semibold hover:opacity-90"
              >
                Deploy
              </AppCtaLink>
              {t.documentation && (
                <a
                  href={t.documentation}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground text-xs"
                >
                  Docs ↗
                </a>
              )}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-muted-foreground col-span-full py-16 text-center text-sm">
            No services match &quot;{search}&quot;.
          </p>
        )}
      </div>
      {shown.length < filtered.length && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((n) => n + PAGE_SIZE)}
            className="border-border-bright hover:bg-accent rounded-md border px-5 py-2.5 text-sm font-semibold"
          >
            Show more services
          </button>
        </div>
      )}
    </div>
  );
}
