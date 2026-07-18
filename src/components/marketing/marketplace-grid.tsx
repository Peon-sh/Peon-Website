'use client';

import { useMemo, useState } from 'react';
import type { TemplateSummary } from '@/lib/templates';
import { appHref } from '@/lib/env';

/**
 * Client-side searchable grid for the public marketplace. Deploy links go to
 * the Peon app (`/deploy/[slug]` on the app host).
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

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return templates.filter((t) => {
      if (category !== 'all' && (t.category ?? '') !== category) return false;
      if (!q) return true;
      return `${t.slug} ${t.slogan} ${t.tags.join(' ')}`.toLowerCase().includes(q);
    });
  }, [templates, search, category]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          placeholder="Search services (analytics, wordpress, n8n...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-border bg-card placeholder:text-faint focus:border-border-bright h-10 flex-1 rounded-md border px-3 text-sm outline-none"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
        {filtered.map((t) => (
          <div
            key={t.slug}
            className="border-border bg-card hover:border-border-bright flex flex-col rounded-lg border p-5 transition-colors"
          >
            <div className="flex items-start gap-3">
              {t.logo ? (
                // eslint-disable-next-line @next/next/no-img-element -- vendored local SVG/PNG assets
                <img
                  src={t.logo}
                  alt=""
                  width={36}
                  height={36}
                  className="size-9 shrink-0 rounded-md bg-white object-contain p-1"
                  loading="lazy"
                />
              ) : (
                <div className="bg-secondary text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-md text-xs font-semibold">
                  {t.name.charAt(0)}
                </div>
              )}
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
              <a
                href={appHref(`/deploy/${t.slug}`)}
                className="bg-primary text-primary-foreground rounded-md px-3 py-1.5 text-xs font-semibold hover:opacity-90"
              >
                Deploy
              </a>
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
    </div>
  );
}
