import { LogoMark } from '@/components/logo';
import { GithubIcon } from '@/components/icons/github';
import { AppCtaLink } from '@/components/marketing/app-cta-link';
import { SPONSOR_LINKS } from '@/lib/sponsors';

const PRODUCT = [
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Self-hosted PaaS', href: '/solutions/self-hosted-paas' },
  { label: 'Application deployment', href: '/solutions/application-deployment' },
  { label: 'Databases', href: '/solutions/databases' },
  { label: 'MCP & AI', href: '/solutions/mcp-ai' },
  { label: 'Enterprise', href: '/solutions/enterprise' },
];

const COMPARE = [
  { label: 'Peon vs Coolify', href: '/compare/peon-vs-coolify' },
  { label: 'Peon vs Dokploy', href: '/compare/peon-vs-dokploy' },
  { label: 'Peon vs Vercel', href: '/compare/peon-vs-vercel' },
  { label: 'Peon vs Heroku', href: '/compare/peon-vs-heroku' },
  { label: 'Peon vs DigitalOcean', href: '/compare/peon-vs-digitalocean' },
  { label: 'Peon vs Railway', href: '/compare/peon-vs-railway' },
  { label: 'Peon vs Render', href: '/compare/peon-vs-render' },
  { label: 'Peon vs Netlify', href: '/compare/peon-vs-netlify' },
  { label: 'Peon vs Portainer', href: '/compare/peon-vs-portainer' },
  { label: 'Peon vs Cloudflare', href: '/compare/peon-vs-cloudflare' },
];

const RESOURCES = [
  { label: 'Docs', href: '/docs' },
  { label: 'Open source', href: '/open-source' },
  { label: 'Blog', href: '/blogs' },
  { label: 'GitHub', href: SPONSOR_LINKS.githubApp, external: true },
  { label: 'Log in', href: '/login', app: true },
  { label: 'Privacy', href: '/privacy-policy' },
  { label: 'Terms', href: '/terms-of-services' },
];

type FooterLink = { label: string; href: string; app?: boolean; external?: boolean };

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <p className="text-sm font-medium text-foreground">{title}</p>
      <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            {link.app ? (
              <AppCtaLink path={link.href} className="hover:text-foreground">
                {link.label}
              </AppCtaLink>
            ) : (
              <a
                href={link.href}
                className="hover:text-foreground"
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href="/" className="inline-flex items-center gap-2.5 text-[15px] font-semibold tracking-tight">
              <LogoMark size={24} />
              <span>Peon</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Open-source deployment platform for servers you already own. Free to self-host,
              $3 per project on Cloud, unlimited team members.
            </p>
            <a
              href={SPONSOR_LINKS.githubApp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <GithubIcon className="size-4" />
              Peon-sh/Peon
            </a>
          </div>
          <FooterColumn title="Product" links={PRODUCT} />
          <FooterColumn title="Compare" links={COMPARE} />
          <FooterColumn title="Resources" links={RESOURCES} />
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Peon. MIT licensed.</p>
          <a
            href="https://www.producthunt.com/products/peon?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-peon"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block opacity-70 transition-opacity hover:opacity-100"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- self-hosted badge route */}
            <img
              src="/badges/product-hunt-featured.svg"
              alt="Peon - Featured on Product Hunt"
              width={200}
              height={43}
              className="h-8 w-auto"
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
