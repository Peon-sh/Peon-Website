import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/marketing/site-header';
import { SiteFooter } from '@/components/marketing/site-footer';
import { groupPostsByTag, listPublishedPosts } from '@/lib/blog';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog - Guides, Comparisons & Tech Help for Self-Hosting',
  description:
    'Practical deployment guides, honest platform comparisons, and Docker troubleshooting for teams running self-hosted apps on their own servers.',
  alternates: { canonical: '/blogs' },
};

function formatDate(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default async function BlogIndexPage() {
  const posts = await listPublishedPosts();
  const groups = groupPostsByTag(posts);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active="blog" />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16">
        <h1 className="panel-title-slashes text-3xl font-800">The Peon Blog</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Practical guides, honest comparisons and troubleshooting help for teams deploying
          on their own servers.
        </p>

        {posts.length === 0 ? (
          <p className="mt-14 text-sm text-muted-foreground">No published posts yet.</p>
        ) : (
          groups.map(({ tag, posts: groupPosts }) => (
            <section key={tag?.slug ?? 'untagged'} className="mt-14">
              <h2 className="font-mono text-xs uppercase tracking-widest text-phosphor">
                {tag?.name ?? 'Articles'} · {groupPosts.length}
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {groupPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blogs/${post.slug}`}
                    className="group overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-border-bright"
                  >
                    <div className="aspect-[16/10] overflow-hidden border-b border-border bg-[#050807]">
                      {post.featuredImage?.url ? (
                        // eslint-disable-next-line @next/next/no-img-element -- R2 CDN URLs
                        <img
                          src={post.featuredImage.url}
                          alt={post.featuredImage.alt || post.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center font-mono text-[10px] uppercase tracking-widest text-faint">
                          peon
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading text-sm font-700 leading-snug group-hover:text-phosphor">
                        {post.title}
                      </h3>
                      {post.excerpt ? (
                        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                          {post.excerpt}
                        </p>
                      ) : null}
                      <p className="mt-3 font-mono text-[10px] uppercase tracking-wide text-faint">
                        {formatDate(post.publishedAt)}
                        {post.publishedAt ? ' · ' : ''}
                        {post.readingMinutes} min read
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
