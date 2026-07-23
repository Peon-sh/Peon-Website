import { analyticsQuery } from '@/lib/db/analytics';
import type { BlogMedia, BlogPostDetail, BlogPostListItem, BlogTag } from './types';

type PostRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body_html?: string;
  published_at: Date | null;
  updated_at: Date;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  canonical_url: string | null;
  robots_meta: string | null;
  og_title: string | null;
  og_description: string | null;
  twitter_card: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  json_ld_type: string | null;
  json_ld_headline: string | null;
  json_ld_author_name: string | null;
  json_ld_publisher_name: string | null;
  json_ld_publisher_logo_url: string | null;
  json_ld_main_entity_of_page: string | null;
  author_name: string | null;
  featured_url: string | null;
  featured_alt: string | null;
  og_url: string | null;
  og_alt: string | null;
};

type TagRow = {
  post_id: string;
  id: string;
  name: string;
  slug: string;
};

function estimateReadingMinutes(html: string): number {
  const text = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const words = text ? text.split(' ').length : 0;
  return Math.max(1, Math.round(words / 200));
}

function media(url: string | null, alt: string | null): BlogMedia | null {
  if (!url?.trim()) return null;
  return { url, alt: alt?.trim() || '' };
}

function iso(d: Date | null | undefined): string | null {
  return d ? d.toISOString() : null;
}

async function tagsByPostIds(postIds: string[]): Promise<Map<string, BlogTag[]>> {
  const map = new Map<string, BlogTag[]>();
  if (postIds.length === 0) return map;

  const rows = await analyticsQuery<TagRow>(
    `SELECT pt."postId" AS post_id, t.id, t.name, t.slug
     FROM "BlogPostTag" pt
     INNER JOIN "BlogTag" t ON t.id = pt."tagId"
     WHERE pt."postId" = ANY($1::text[])
     ORDER BY t.name ASC`,
    [postIds],
  );

  for (const row of rows) {
    const list = map.get(row.post_id) ?? [];
    list.push({ id: row.id, name: row.name, slug: row.slug });
    map.set(row.post_id, list);
  }
  return map;
}

function toListItem(row: PostRow, tags: BlogTag[], bodyHtml?: string): BlogPostListItem {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    publishedAt: iso(row.published_at),
    updatedAt: row.updated_at.toISOString(),
    readingMinutes: estimateReadingMinutes(bodyHtml ?? row.excerpt ?? row.title),
    tags,
    featuredImage: media(row.featured_url, row.featured_alt),
  };
}

const LIST_SELECT = `
  p.id,
  p.title,
  p.slug,
  p.excerpt,
  p."publishedAt" AS published_at,
  p."updatedAt" AS updated_at,
  fm.url AS featured_url,
  fm.alt AS featured_alt
`;

/** Published posts only, newest first. */
export async function listPublishedPosts(): Promise<BlogPostListItem[]> {
  const rows = await analyticsQuery<PostRow>(
    `SELECT ${LIST_SELECT}, p."bodyHtml" AS body_html
     FROM "BlogPost" p
     LEFT JOIN "MediaAsset" fm ON fm.id = p."featuredMediaId"
     WHERE p.status = 'PUBLISHED'
     ORDER BY p."publishedAt" DESC NULLS LAST, p."updatedAt" DESC`,
  );

  const tags = await tagsByPostIds(rows.map((r) => r.id));
  return rows.map((row) => toListItem(row, tags.get(row.id) ?? [], row.body_html));
}

/** Sitemap / lightweight listing: slug + dates only. */
export async function listPublishedPostSitemapEntries(): Promise<
  { slug: string; publishedAt: string | null; updatedAt: string }[]
> {
  const rows = await analyticsQuery<{
    slug: string;
    published_at: Date | null;
    updated_at: Date;
  }>(
    `SELECT slug, "publishedAt" AS published_at, "updatedAt" AS updated_at
     FROM "BlogPost"
     WHERE status = 'PUBLISHED'
     ORDER BY "publishedAt" DESC NULLS LAST`,
  );

  return rows.map((r) => ({
    slug: r.slug,
    publishedAt: iso(r.published_at),
    updatedAt: r.updated_at.toISOString(),
  }));
}

export async function getPublishedPost(slug: string): Promise<BlogPostDetail | null> {
  const rows = await analyticsQuery<PostRow>(
    `SELECT
       p.id,
       p.title,
       p.slug,
       p.excerpt,
       p."bodyHtml" AS body_html,
       p."publishedAt" AS published_at,
       p."updatedAt" AS updated_at,
       p."seoTitle" AS seo_title,
       p."seoDescription" AS seo_description,
       p."seoKeywords" AS seo_keywords,
       p."canonicalUrl" AS canonical_url,
       p."robotsMeta" AS robots_meta,
       p."ogTitle" AS og_title,
       p."ogDescription" AS og_description,
       p."twitterCard" AS twitter_card,
       p."twitterTitle" AS twitter_title,
       p."twitterDescription" AS twitter_description,
       p."jsonLdType" AS json_ld_type,
       p."jsonLdHeadline" AS json_ld_headline,
       p."jsonLdAuthorName" AS json_ld_author_name,
       p."jsonLdPublisherName" AS json_ld_publisher_name,
       p."jsonLdPublisherLogoUrl" AS json_ld_publisher_logo_url,
       p."jsonLdMainEntityOfPage" AS json_ld_main_entity_of_page,
       a.name AS author_name,
       fm.url AS featured_url,
       fm.alt AS featured_alt,
       og.url AS og_url,
       og.alt AS og_alt
     FROM "BlogPost" p
     INNER JOIN "StaffUser" a ON a.id = p."authorId"
     LEFT JOIN "MediaAsset" fm ON fm.id = p."featuredMediaId"
     LEFT JOIN "MediaAsset" og ON og.id = p."ogImageMediaId"
     WHERE p.slug = $1 AND p.status = 'PUBLISHED'
     LIMIT 1`,
    [slug],
  );

  const row = rows[0];
  if (!row || !row.body_html) return null;

  const tags = await tagsByPostIds([row.id]);
  const list = toListItem(row, tags.get(row.id) ?? [], row.body_html);

  return {
    ...list,
    bodyHtml: row.body_html,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    seoKeywords: row.seo_keywords,
    canonicalUrl: row.canonical_url,
    robotsMeta: row.robots_meta,
    ogTitle: row.og_title,
    ogDescription: row.og_description,
    twitterCard: row.twitter_card,
    twitterTitle: row.twitter_title,
    twitterDescription: row.twitter_description,
    jsonLdType: row.json_ld_type,
    jsonLdHeadline: row.json_ld_headline,
    jsonLdAuthorName: row.json_ld_author_name,
    jsonLdPublisherName: row.json_ld_publisher_name,
    jsonLdPublisherLogoUrl: row.json_ld_publisher_logo_url,
    jsonLdMainEntityOfPage: row.json_ld_main_entity_of_page,
    ogImage: media(row.og_url, row.og_alt),
    authorName: row.author_name,
  };
}

export async function relatedPublishedPosts(
  post: BlogPostDetail,
  count = 3,
): Promise<BlogPostListItem[]> {
  const tagIds = post.tags.map((t) => t.id);
  if (tagIds.length === 0) {
    const all = await listPublishedPosts();
    return all.filter((p) => p.slug !== post.slug).slice(0, count);
  }

  const rows = await analyticsQuery<PostRow>(
    `SELECT DISTINCT ON (p.id) ${LIST_SELECT}, p."bodyHtml" AS body_html
     FROM "BlogPost" p
     INNER JOIN "BlogPostTag" pt ON pt."postId" = p.id
     LEFT JOIN "MediaAsset" fm ON fm.id = p."featuredMediaId"
     WHERE p.status = 'PUBLISHED'
       AND p.id <> $1
       AND pt."tagId" = ANY($2::text[])
     ORDER BY p.id, p."publishedAt" DESC NULLS LAST`,
    [post.id, tagIds],
  );

  // Re-sort by publish date after DISTINCT ON
  rows.sort((a, b) => {
    const ta = a.published_at?.getTime() ?? 0;
    const tb = b.published_at?.getTime() ?? 0;
    return tb - ta;
  });

  const sliced = rows.slice(0, count);
  const tags = await tagsByPostIds(sliced.map((r) => r.id));
  return sliced.map((row) => toListItem(row, tags.get(row.id) ?? [], row.body_html));
}

export function buildBlogJsonLd(
  post: BlogPostDetail,
  siteUrl: string,
): Record<string, unknown> {
  const pageUrl =
    post.jsonLdMainEntityOfPage?.trim() ||
    post.canonicalUrl?.trim() ||
    `${siteUrl}/blogs/${post.slug}`;
  const headline =
    post.jsonLdHeadline?.trim() ||
    post.seoTitle?.trim() ||
    post.title;
  const description =
    post.seoDescription?.trim() || post.excerpt?.trim() || undefined;
  const image = post.ogImage ?? post.featuredImage;
  const authorName =
    post.jsonLdAuthorName?.trim() || post.authorName?.trim() || 'Peon';
  const publisherName = post.jsonLdPublisherName?.trim() || 'Peon';
  const publisherLogo = post.jsonLdPublisherLogoUrl?.trim();

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': post.jsonLdType?.trim() || 'BlogPosting',
    headline,
    name: headline,
    description,
    datePublished: post.publishedAt ?? undefined,
    dateModified: post.updatedAt,
    keywords: post.seoKeywords?.trim() || undefined,
    inLanguage: 'en',
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    url: pageUrl,
    author: { '@type': 'Person', name: authorName },
    publisher: {
      '@type': 'Organization',
      name: publisherName,
      ...(publisherLogo
        ? { logo: { '@type': 'ImageObject', url: publisherLogo } }
        : {}),
    },
  };

  if (image?.url) {
    jsonLd.image = [image.url];
  }
  if (post.tags.length) {
    jsonLd.articleSection = post.tags.map((t) => t.name);
  }

  for (const key of Object.keys(jsonLd)) {
    if (jsonLd[key] === undefined) delete jsonLd[key];
  }

  return jsonLd;
}

/** Group posts by primary tag (first tag), untagged last. */
export function groupPostsByTag(
  posts: BlogPostListItem[],
): { tag: BlogTag | null; posts: BlogPostListItem[] }[] {
  const groups = new Map<string, { tag: BlogTag | null; posts: BlogPostListItem[] }>();
  const untagged: BlogPostListItem[] = [];

  for (const post of posts) {
    const primary = post.tags[0];
    if (!primary) {
      untagged.push(post);
      continue;
    }
    const existing = groups.get(primary.slug);
    if (existing) {
      existing.posts.push(post);
    } else {
      groups.set(primary.slug, { tag: primary, posts: [post] });
    }
  }

  const ordered = [...groups.values()];
  if (untagged.length) {
    ordered.push({ tag: null, posts: untagged });
  }
  return ordered;
}
