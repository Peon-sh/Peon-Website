import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SeoMarketingPage } from '@/components/marketing/seo-page';
import { COMPARE_PAGES, getComparePage } from '@/lib/seo-pages';

export const dynamic = 'force-static';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return COMPARE_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getComparePage(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: `/compare/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `/compare/${page.slug}`,
      siteName: 'Peon',
      type: 'website',
    },
  };
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params;
  const page = getComparePage(slug);
  if (!page) notFound();
  return <SeoMarketingPage page={page} />;
}
