import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/marketing/site-header';
import { SiteFooter } from '@/components/marketing/site-footer';
import {
  buildBlogJsonLd,
  getPublishedPost,
  relatedPublishedPosts,
} from '@/lib/blog';
import { AppCtaLink } from '@/components/marketing/app-cta-link';
import { publicEnv } from '@/lib/env';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) return {};

  const title = post.seoTitle?.trim() || post.title;
  const description =
    post.seoDescription?.trim() || post.excerpt?.trim() || undefined;
  const keywords = post.seoKeywords
    ?.split(',')
    .map((k) => k.trim())
    .filter(Boolean);
  const canonical = post.canonicalUrl?.trim() || `/blogs/${post.slug}`;
  const ogImage = post.ogImage ?? post.featuredImage;
  const robots = post.robotsMeta?.trim();

  return {
    title,
    description,
    keywords: keywords?.length ? keywords : undefined,
    alternates: { canonical },
    robots: robots || undefined,
    openGraph: {
      type: 'article',
      title: post.ogTitle?.trim() || title,
      description: post.ogDescription?.trim() || description,
      url: canonical,
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      siteName: 'Peon',
      images: ogImage?.url
        ? [{ url: ogImage.url, alt: ogImage.alt || title }]
        : undefined,
    },
    twitter: {
      card:
        (post.twitterCard?.trim() as 'summary' | 'summary_large_image' | undefined) ||
        'summary_large_image',
      title: post.twitterTitle?.trim() || title,
      description: post.twitterDescription?.trim() || description,
      images: ogImage?.url ? [ogImage.url] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  const related = await relatedPublishedPosts(post);
  const jsonLd = buildBlogJsonLd(post, publicEnv.siteUrl);
  const primaryTag = post.tags[0];
  const author =
    post.jsonLdAuthorName?.trim() || post.authorName?.trim() || null;
  const publishedLabel = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;
  const byline = [
    author,
    publishedLabel,
    `${post.readingMinutes} min read`,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader active="blog" />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-14">
        <nav className="font-mono text-[11px] uppercase tracking-wide text-faint">
          <Link href="/blogs" className="hover:text-foreground">
            blog
          </Link>
          {primaryTag ? (
            <>
              {' / '}
              <span className="text-phosphor">{primaryTag.name}</span>
            </>
          ) : null}
        </nav>

        <h1 className="mt-4 text-3xl font-800 leading-tight sm:text-4xl">{post.title}</h1>
        {post.excerpt ? (
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
        ) : null}
        {byline ? (
          <p className="mt-4 font-mono text-[11px] uppercase tracking-wide text-faint">
            {byline}
          </p>
        ) : null}

        {post.featuredImage?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.featuredImage.url}
            alt={post.featuredImage.alt || post.title}
            className="mt-8 max-h-80 w-full rounded-lg border border-border object-cover"
          />
        ) : null}

        <article
          className="prose-blog mt-10"
          dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
        />

        <aside className="bg-hero mt-14 rounded-xl border border-phosphor/40 bg-card p-8 text-center">
          <h2 className="text-xl font-800">Deploy it on your own server</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Peon is the open-source deployment platform: git push to deploy, automatic HTTPS,
            managed databases with backups - $3 per project, unlimited team members.
          </p>
          <AppCtaLink
            path="/register"
            className="mt-5 inline-block rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Start deploying for $3
          </AppCtaLink>
        </aside>

        {related.length > 0 ? (
          <section className="mt-14">
            <h2 className="font-mono text-xs uppercase tracking-widest text-phosphor">
              Related articles
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blogs/${r.slug}`}
                  className="group rounded-lg border border-border bg-card p-4 transition-colors hover:border-border-bright"
                >
                  <h3 className="font-heading text-xs font-700 leading-snug group-hover:text-phosphor">
                    {r.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>

      <SiteFooter />
    </div>
  );
}
