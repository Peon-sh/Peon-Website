import { listPublishedPostSitemapEntries } from '@/lib/blog';
import { publicEnv } from '@/lib/env';
import { renderUrlSet, xmlResponse } from '@/lib/sitemap/xml';

/** Published blog posts from analytics DB. Always fresh (SSR). */
export const dynamic = 'force-dynamic';

export async function GET() {
  const base = publicEnv.siteUrl;
  const posts = await listPublishedPostSitemapEntries();

  const urls = posts.map((post) => ({
    loc: `${base}/blogs/${post.slug}`,
    lastmod: post.updatedAt ?? post.publishedAt ?? undefined,
    changefreq: 'monthly' as const,
    priority: 0.7,
  }));

  return xmlResponse(renderUrlSet(urls));
}
