export type BlogSection = {
  /** h2 heading */
  h: string;
  /** paragraphs */
  p: string[];
  /** optional bullet list rendered after paragraphs */
  list?: string[];
  /** optional code block rendered after paragraphs/list */
  code?: string;
};

export type BlogCategory = 'comparison' | 'guide' | 'tech-help';

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: BlogCategory;
  keywords: string[];
  /** ISO date */
  date: string;
  readingMinutes: number;
  sections: BlogSection[];
};
