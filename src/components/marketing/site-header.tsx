import { LogoMark } from '@/components/logo';
import { GithubIcon } from '@/components/icons/github';
import { AppCtaLink } from '@/components/marketing/app-cta-link';
import { cn } from '@/lib/utils';

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

type NavItem = (typeof NAV_ITEMS)[number];
type ActivePage = 'docs' | 'blog' | 'open-source' | 'marketplace';

const HASH_ITEMS = NAV_ITEMS.filter((item) => item.href.startsWith('/#'));
const PAGE_ITEMS = NAV_ITEMS.filter(
  (item) => !item.href.startsWith('/#') && !('differentiator' in item),
);
const OPEN_SOURCE_ITEM = NAV_ITEMS.find((item) => 'differentiator' in item)!;

const LOGIN_CLASS =
  'bg-primary text-primary-foreground rounded-md px-3 py-1.5 text-sm font-semibold hover:opacity-90';

function isActiveItem(item: NavItem, active?: ActivePage) {
  return (
    (active === 'docs' && item.href === '/docs') ||
    (active === 'blog' && item.href === '/blogs') ||
    (active === 'marketplace' && item.href === '/marketplace')
  );
}

function NavLink({
  item,
  active,
  className,
}: {
  item: NavItem;
  active?: ActivePage;
  className?: string;
}) {
  if ('differentiator' in item && item.differentiator) {
    return (
      <a
        href={item.href}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-md border border-phosphor/40 bg-accent/50 px-2.5 py-1 font-semibold text-phosphor hover:border-phosphor hover:bg-accent',
          className,
        )}
      >
        <GithubIcon className="size-3.5 shrink-0" />
        {item.label}
      </a>
    );
  }

  return (
    <a
      href={item.href}
      className={cn(
        isActiveItem(item, active)
          ? 'font-semibold text-phosphor'
          : 'hover:text-foreground',
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
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} item={item} active={active} />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <details className="group lg:hidden">
            <summary
              className="text-foreground hover:bg-accent cursor-pointer list-none rounded-md p-2 marker:hidden [&::-webkit-details-marker]:hidden"
              aria-label="Open menu"
            >
              <svg
                className="size-5 group-open:hidden"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className="hidden size-5 group-open:block"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </summary>

            <div className="border-border bg-background absolute inset-x-0 top-14 border-b">
              <div className="mx-auto flex w-full max-w-6xl flex-col px-4 py-4 text-sm">
                <div className="text-muted-foreground flex flex-col">
                  {HASH_ITEMS.map((item) => (
                    <NavLink
                      key={item.href}
                      item={item}
                      active={active}
                      className="py-2"
                    />
                  ))}
                </div>
                <div className="border-border my-2 border-t" />
                <div className="text-muted-foreground flex flex-col">
                  {PAGE_ITEMS.map((item) => (
                    <NavLink
                      key={item.href}
                      item={item}
                      active={active}
                      className="py-2"
                    />
                  ))}
                </div>
                <NavLink
                  item={OPEN_SOURCE_ITEM}
                  active={active}
                  className="mt-3 w-fit"
                />
                <AppCtaLink
                  path="/login"
                  className={cn(LOGIN_CLASS, 'mt-4 block w-full py-2 text-center')}
                >
                  Log in
                </AppCtaLink>
              </div>
            </div>
          </details>

          <AppCtaLink path="/login" className={cn(LOGIN_CLASS, 'hidden lg:inline-flex')}>
            Log in
          </AppCtaLink>
        </div>
      </nav>
    </header>
  );
}
