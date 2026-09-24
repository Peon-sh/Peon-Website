import type { DocPage } from './types';

const DOCS_INDEX_NAME = 'Peon Docs: Deployments, MCP, Databases & Troubleshooting';
const DOCS_INDEX_DESCRIPTION =
  'Peon documentation: set up MCP for Cursor and Claude, configure workspaces, deploy services, manage databases, and troubleshoot common issues.';

function organization(siteUrl: string) {
  return { '@type': 'Organization', name: 'Peon', url: siteUrl };
}

function breadcrumb(items: { name: string; item: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
}

export function buildDocsIndexJsonLd(siteUrl: string) {
  const url = `${siteUrl}/docs`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': url,
        url,
        name: DOCS_INDEX_NAME,
        description: DOCS_INDEX_DESCRIPTION,
        publisher: organization(siteUrl),
      },
      breadcrumb([
        { name: 'Peon', item: siteUrl },
        { name: 'Docs', item: url },
      ]),
    ],
  };
}

export function buildDocArticleJsonLd(page: DocPage, siteUrl: string) {
  const url = `${siteUrl}/docs/${page.slug}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': url,
        url,
        headline: page.seoTitle ?? `${page.title} | Docs | Peon`,
        description: page.description,
        author: organization(siteUrl),
        publisher: organization(siteUrl),
      },
      breadcrumb([
        { name: 'Peon', item: siteUrl },
        { name: 'Docs', item: `${siteUrl}/docs` },
        { name: page.title, item: url },
      ]),
    ],
  };
}
