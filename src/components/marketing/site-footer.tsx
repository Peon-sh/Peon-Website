import Link from 'next/link';
import { AppCtaLink } from '@/components/marketing/app-cta-link';

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
  { label: 'Open Source', href: '/open-source' },
  { label: 'Blog', href: '/blogs' },
  { label: 'Privacy', href: '/privacy-policy' },
  { label: 'Terms', href: '/terms-of-services' },
  { label: 'Log in', href: '/login', app: true },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; app?: boolean }[];
}) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-widest text-phosphor">{title}</p>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            {link.app ? (
              <AppCtaLink path={link.href} className="hover:text-foreground">
                {link.label}
              </AppCtaLink>
            ) : (
              <Link href={link.href} className="hover:text-foreground">
                {link.label}
              </Link>
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
      <div className="mx-auto w-full max-w-6xl px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-heading text-base font-800 text-phosphor">Peon</p>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-muted-foreground">
              Open-source deployment platform. Your servers, our pipelines. $3 per project
              or free self-host.
            </p>
            <a
              href="https://www.producthunt.com/products/peon?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-peon"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block transition-opacity hover:opacity-80"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Peon - Open source alternative to Vercel, Heroku, Netlify. | Product Hunt"
                width={250}
                height={54}
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1206439&theme=light&t=1785051322486"
              />
            </a>
          </div>
          <FooterColumn title="Product" links={PRODUCT} />
          <FooterColumn title="Compare" links={COMPARE} />
          <FooterColumn title="Resources" links={RESOURCES} />
        </div>
        <p className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Peon. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
