import { appHref, publicEnv } from '@/lib/env';

/** Sponsorship / donate destinations — override via env when accounts go live. */
export const SPONSOR_LINKS = {
  githubSponsors:
    process.env.NEXT_PUBLIC_GITHUB_SPONSORS_URL ?? 'https://github.com/sponsors/hironate',
  openCollective:
    process.env.NEXT_PUBLIC_OPEN_COLLECTIVE_URL ?? 'https://opencollective.com/peon',
  /** One-time or invoice sponsorship — Stripe Payment Link or mailto until configured. */
  stripeOrDirect:
    process.env.NEXT_PUBLIC_STRIPE_DONATE_URL ??
    'mailto:support@peon.sh?subject=Sponsorship%20/%20donation',
  githubOrg: 'https://github.com/Peon-sh',
  githubApp: 'https://github.com/Peon-sh/Peon',
  githubWebsite: 'https://github.com/Peon-sh/Peon-Website',
  cloud: appHref('/register'),
  site: publicEnv.siteUrl,
} as const;

export const SPONSOR_CHANNELS = [
  {
    id: 'github',
    name: 'GitHub Sponsors',
    description: 'Monthly or one-time support via GitHub. Funds go straight to Peon development.',
    href: SPONSOR_LINKS.githubSponsors,
    cta: 'Sponsor on GitHub',
  },
  {
    id: 'opencollective',
    name: 'Open Collective',
    description: 'Transparent community funding with public budgets and expenses.',
    href: SPONSOR_LINKS.openCollective,
    cta: 'Support on Open Collective',
  },
  {
    id: 'direct',
    name: 'Direct / Stripe',
    description: 'One-time donation or company sponsorship. We will send a payment link or invoice.',
    href: SPONSOR_LINKS.stripeOrDirect,
    cta: 'Support Us',
  },
] as const;
