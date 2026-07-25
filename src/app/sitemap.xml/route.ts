import { publicEnv } from '@/lib/env';
import { renderSitemapIndex, xmlResponse } from '@/lib/sitemap/xml';

/** Sitemap index: links site + blog child sitemaps. */
export function GET() {
  const base = publicEnv.siteUrl;
  const xml = renderSitemapIndex([
    { loc: `${base}/site-sitemap.xml` },
    { loc: `${base}/blog-sitemap.xml` },
  ]);
  return xmlResponse(xml);
}
