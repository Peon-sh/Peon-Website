export type DocSection = {
  h: string;
  p: string[];
  list?: string[];
  code?: string;
  /** Optional language label shown above the code block (e.g. json). */
  codeLang?: string;
};

export type DocPage = {
  slug: string;
  title: string;
  /** Full <title> when set; bypasses the root "%s | Peon" template. */
  seoTitle?: string;
  description: string;
  sections: DocSection[];
};

export type DocGroup = {
  label: string;
  pages: DocPage[];
};
