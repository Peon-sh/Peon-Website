import { COMPARISON_POSTS } from './posts-comparisons';
import { GUIDE_POSTS } from './posts-guides';
import { TECH_HELP_POSTS } from './posts-tech-help';
import type { BlogCategory, BlogPost } from './types';

export type { BlogCategory, BlogPost, BlogSection } from './types';

export const ALL_POSTS: BlogPost[] = [
  ...COMPARISON_POSTS,
  ...GUIDE_POSTS,
  ...TECH_HELP_POSTS,
].sort((a, b) => b.date.localeCompare(a.date));

export const CATEGORY_LABELS: Record<BlogCategory, string> = {
  comparison: 'Comparisons',
  guide: 'Guides',
  'tech-help': 'Tech Help',
};

export function getPost(slug: string): BlogPost | undefined {
  return ALL_POSTS.find((p) => p.slug === slug);
}

export function relatedPosts(post: BlogPost, count = 3): BlogPost[] {
  return ALL_POSTS.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, count);
}
