export type BlogTag = {
  id: string;
  name: string;
  slug: string;
};

export type BlogMedia = {
  url: string;
  alt: string;
};

export type BlogPostListItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  publishedAt: string | null;
  updatedAt: string;
  readingMinutes: number;
  tags: BlogTag[];
  featuredImage: BlogMedia | null;
};

export type BlogPostDetail = BlogPostListItem & {
  bodyHtml: string;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
  canonicalUrl: string | null;
  robotsMeta: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  twitterCard: string | null;
  twitterTitle: string | null;
  twitterDescription: string | null;
  jsonLdType: string | null;
  jsonLdHeadline: string | null;
  jsonLdAuthorName: string | null;
  jsonLdPublisherName: string | null;
  jsonLdPublisherLogoUrl: string | null;
  jsonLdMainEntityOfPage: string | null;
  ogImage: BlogMedia | null;
  authorName: string | null;
};
