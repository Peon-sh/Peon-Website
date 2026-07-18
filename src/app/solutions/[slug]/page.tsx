import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SeoMarketingPage } from '@/components/marketing/seo-page';
import { SOLUTION_PAGES, getSolutionPage } from '@/lib/seo-pages';

export const dynamic = 'force-static';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SOLUTION_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getSolutionPage(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: `/solutions/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `/solutions/${page.slug}`,
      siteName: 'Peon',
      type: 'website',
    },
  };
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const page = getSolutionPage(slug);
  if (!page) notFound();
  return <SeoMarketingPage page={page} />;
}
