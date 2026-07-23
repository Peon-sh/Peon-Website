import { getSiteSitemapUrls, renderUrlSet, xmlResponse } from '@/lib/sitemap/xml';

/** Static marketing pages. Safe to cache / generate at build. */
export const dynamic = 'force-static';

export function GET() {
  return xmlResponse(renderUrlSet(getSiteSitemapUrls()));
}
