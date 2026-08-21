import { LogoMark } from '@/components/logo';
import { GithubIcon } from '@/components/icons/github';
import { AppCtaLink } from '@/components/marketing/app-cta-link';

const NAV_ITEMS = [
  { label: 'Features', href: '/#features' },
  { label: 'Compare', href: '/#compare' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Docs', href: '/docs' },
  { label: 'Blog', href: '/blogs' },
  { label: 'Open Source', href: '/open-source', differentiator: true },
] as const;

/**
 * Marketing header. Auth CTAs point at the Peon app origin (separate host).
 * Native `<a>` so the App Router client is not pulled into every page.
 */
export function SiteHeader({
  active,
}: {
  active?: 'docs' | 'blog' | 'open-source' | 'marketplace';
}) {
  return (
    <header className="border-border bg-background sticky top-0 z-40 border-b">
      <nav className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
        <a
          href="/"
          className="font-heading font-800 inline-flex items-center gap-2 text-base tracking-tight"
        >
          <LogoMark size={26} />
          <span className="text-phosphor">Peon</span>
        </a>

        <div className="text-muted-foreground hidden items-center gap-5 text-sm lg:flex">
          {NAV_ITEMS.map((item) => {
            if ('differentiator' in item && item.differentiator) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-1.5 rounded-md border border-phosphor/40 bg-accent/50 px-2.5 py-1 font-semibold text-phosphor hover:border-phosphor hover:bg-accent"
                >
                  <GithubIcon className="size-3.5 shrink-0" />
                  {item.label}
                </a>
              );
            }

            const isActive =
              (active === 'docs' && item.href === '/docs') ||
              (active === 'blog' && item.href === '/blogs') ||
              (active === 'marketplace' && item.href === '/marketplace');

            return (
              <a
                key={item.href}
                href={item.href}
                className={
                  isActive
                    ? 'font-semibold text-phosphor'
                    : 'hover:text-foreground'
                }
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <AppCtaLink
          path="/login"
          className="bg-primary text-primary-foreground rounded-md px-3 py-1.5 text-sm font-semibold hover:opacity-90"
        >
          Log in
        </AppCtaLink>
      </nav>
    </header>
  );
}
