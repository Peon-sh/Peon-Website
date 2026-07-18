import type { DocGroup } from './types';
import { AI_PAGES } from './ai';
import { GETTING_STARTED_PAGES } from './getting-started';
import { INFRA_PAGES } from './infra';
import { SERVICE_PAGES } from './services';
import { OPS_PAGES, REFERENCE_PAGES } from './ops';

export type { DocSection, DocPage, DocGroup } from './types';

export const DOC_GROUPS: DocGroup[] = [
  {
    label: 'AI & Agents',
    pages: AI_PAGES,
  },
  {
    label: 'Get Started',
    pages: GETTING_STARTED_PAGES,
  },
  {
    label: 'Infrastructure',
    pages: INFRA_PAGES,
  },
  {
    label: 'Services',
    pages: SERVICE_PAGES,
  },
  {
    label: 'Operations',
    pages: OPS_PAGES,
  },
  {
    label: 'Reference',
    pages: REFERENCE_PAGES,
  },
];

export const ALL_DOC_PAGES = DOC_GROUPS.flatMap((g) => g.pages);

export function getDocPage(slug: string) {
  return ALL_DOC_PAGES.find((p) => p.slug === slug);
}

export function docGroupFor(slug: string) {
  return DOC_GROUPS.find((g) => g.pages.some((p) => p.slug === slug));
}
