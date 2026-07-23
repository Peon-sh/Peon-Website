import { ALL_DOC_PAGES } from '@/lib/docs';
import { ALL_SEO_PAGES } from '@/lib/seo-pages';
import { publicEnv } from '@/lib/env';

export type SitemapUrl = {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
};

/** Static marketing site URLs (no blog posts). Built into site-sitemap.xml. */
export function getSiteSitemapUrls(): SitemapUrl[] {
  const base = publicEnv.siteUrl;
  const now = new Date().toISOString();

  return [
    { loc: base, lastmod: now, changefreq: 'weekly', priority: 1 },
    { loc: `${base}/blogs`, lastmod: now, changefreq: 'weekly', priority: 0.8 },
    { loc: `${base}/marketplace`, lastmod: now, changefreq: 'weekly', priority: 0.8 },
    { loc: `${base}/docs`, lastmod: now, changefreq: 'weekly', priority: 0.8 },
    { loc: `${base}/open-source`, lastmod: now, changefreq: 'monthly', priority: 0.85 },
    { loc: `${base}/privacy-policy`, lastmod: now, changefreq: 'yearly', priority: 0.3 },
    { loc: `${base}/terms-of-services`, lastmod: now, changefreq: 'yearly', priority: 0.3 },
    ...ALL_SEO_PAGES.map((page) => ({
      loc: `${base}/${page.kind === 'solution' ? 'solutions' : 'compare'}/${page.slug}`,
      lastmod: now,
      changefreq: 'monthly' as const,
      priority: 0.85,
    })),
    ...ALL_DOC_PAGES.map((page) => ({
      loc: `${base}/docs/${page.slug}`,
      lastmod: now,
      changefreq: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function renderUrlSet(urls: SitemapUrl[]): string {
  const body = urls
    .map((u) => {
      const parts = [`    <loc>${escapeXml(u.loc)}</loc>`];
      if (u.lastmod) parts.push(`    <lastmod>${escapeXml(u.lastmod)}</lastmod>`);
      if (u.changefreq) parts.push(`    <changefreq>${u.changefreq}</changefreq>`);
      if (u.priority != null) {
        parts.push(`    <priority>${u.priority.toFixed(1)}</priority>`);
      }
      return `  <url>\n${parts.join('\n')}\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

export function renderSitemapIndex(sitemaps: { loc: string }[]): string {
  const body = sitemaps
    .map(
      (s) => `  <sitemap>
    <loc>${escapeXml(s.loc)}</loc>
  </sitemap>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</sitemapindex>
`;
}

export function xmlResponse(body: string): Response {
  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
