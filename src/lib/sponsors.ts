import { appHref, publicEnv } from '@/lib/env';

/** Sponsorship / donate destinations — override via env when accounts go live. */
export const SPONSOR_LINKS = {
  githubSponsors:
    process.env.NEXT_PUBLIC_GITHUB_SPONSORS_URL ?? 'https://github.com/sponsors/hironate',
  openCollective:
    process.env.NEXT_PUBLIC_OPEN_COLLECTIVE_URL ?? 'https://opencollective.com/peon',
  /** One-time or recurring donation via Stripe Payment Link. */
  stripeOrDirect:
    process.env.NEXT_PUBLIC_STRIPE_DONATE_URL ??
    'https://buy.stripe.com/00w9ANd2u5Occ7k7EU4sE00',
  githubOrg: 'https://github.com/Peon-sh',
  githubApp: 'https://github.com/Peon-sh/Peon',
  githubWebsite: 'https://github.com/Peon-sh/Peon-Website',
  cloud: appHref('/register'),
  site: publicEnv.siteUrl,
} as const;

export type SponsorChannel = {
  id: string;
  name: string;
  description: string;
  href: string;
  cta: string;
  /** Kept in config but not shown on the page while other channels are preferred. */
  hidden?: boolean;
};

export const SPONSOR_CHANNELS: readonly SponsorChannel[] = [
  {
    id: 'github',
    name: 'GitHub Sponsors',
    description: 'Monthly or one-time support via GitHub. Funds go straight to Peon development.',
    href: SPONSOR_LINKS.githubSponsors,
    cta: 'Sponsor on GitHub',
    hidden: true,
  },
  {
    id: 'opencollective',
    name: 'Open Collective',
    description: 'Transparent community funding with public budgets and expenses.',
    href: SPONSOR_LINKS.openCollective,
    cta: 'Support on Open Collective',
    hidden: true,
  },
  {
    id: 'direct',
    name: 'Direct / Stripe',
    description:
      'Support open-source development and ongoing maintenance of Peon via Stripe.',
    href: SPONSOR_LINKS.stripeOrDirect,
    cta: 'Donate with Stripe',
  },
] as const;

export const VISIBLE_SPONSOR_CHANNELS = SPONSOR_CHANNELS.filter((c) => !c.hidden);
