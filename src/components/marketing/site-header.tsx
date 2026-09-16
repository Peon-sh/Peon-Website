import { LogoMark } from '@/components/logo';
import { GithubIcon } from '@/components/icons/github';
import { Button, buttonClass } from '@/components/ui/button';
import { SPONSOR_LINKS } from '@/lib/sponsors';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: 'Product', href: '/#features' },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Docs', href: '/docs' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Blog', href: '/blogs' },
  { label: 'Open source', href: '/open-source' },
] as const;

type NavItem = (typeof NAV_ITEMS)[number];
type ActivePage = 'docs' | 'blog' | 'open-source' | 'marketplace';

const ACTIVE_HREF: Record<ActivePage, string> = {
  docs: '/docs',
  blog: '/blogs',
  marketplace: '/marketplace',
  'open-source': '/open-source',
};

function NavLink({
  item,
  active,
  className,
}: {
  item: NavItem;
  active?: ActivePage;
  className?: string;
}) {
  const current = active ? ACTIVE_HREF[active] === item.href : false;
  return (
    <a
      href={item.href}
      aria-current={current ? 'page' : undefined}
      className={cn(
        'rounded-md px-2.5 py-1.5 text-sm transition-colors',
        current ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
        className,
      )}
    >
      {item.label}
    </a>
  );
}

/**
 * Marketing header. Auth CTAs point at the Peon app origin (separate host).
 * Native `<a>` so the App Router client is not pulled into every page.
 */
export function SiteHeader({ active }: { active?: ActivePage }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6">
        <a href="/" className="inline-flex items-center gap-2.5 text-[15px] font-semibold tracking-tight">
          <LogoMark size={24} />
          <span>Peon</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} item={item} active={active} />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={SPONSOR_LINKS.githubApp}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass({ variant: 'ghost', size: 'sm', className: 'hidden px-2 lg:inline-flex' })}
            aria-label="Peon on GitHub"
          >
            <GithubIcon className="size-4" />
            <span>GitHub</span>
          </a>
          <Button appPath="/login" variant="ghost" size="sm" className="hidden lg:inline-flex">
            Log in
          </Button>
          <Button appPath="/register" variant="primary" size="sm" className="hidden lg:inline-flex">
            Get started
          </Button>

          <details className="group lg:hidden">
            <summary
              className="flex size-9 cursor-pointer list-none items-center justify-center rounded-md text-foreground hover:bg-accent"
              aria-label="Open menu"
            >
              <svg className="size-5 group-open:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden>
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
              <svg className="hidden size-5 group-open:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </summary>
            <div className="absolute inset-x-0 top-14 border-b border-border bg-background">
              <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-6 py-4">
                {NAV_ITEMS.map((item) => (
                  <NavLink key={item.href} item={item} active={active} className="-mx-2.5 py-2.5 text-base" />
                ))}
                <a
                  href={SPONSOR_LINKS.githubApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="-mx-2.5 inline-flex items-center gap-2 rounded-md px-2.5 py-2.5 text-base text-muted-foreground hover:text-foreground"
                >
                  <GithubIcon className="size-4" /> GitHub
                </a>
                <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-4">
                  <Button appPath="/login" variant="secondary" size="md">
                    Log in
                  </Button>
                  <Button appPath="/register" variant="primary" size="md">
                    Get started
                  </Button>
                </div>
              </div>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
