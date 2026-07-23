'use client';

import Link from 'next/link';
import { LogoMark } from '@/components/logo';
import { GithubIcon } from '@/components/icons/github';
import { appHref } from '@/lib/env';

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
 */
export function SiteHeader({
  active,
}: {
  active?: 'docs' | 'blog' | 'open-source' | 'marketplace';
}) {
  return (
    <header className="border-border bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
      <nav className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="font-heading font-800 inline-flex items-center gap-2 text-base tracking-tight"
        >
          <LogoMark size={26} />
          <span className="text-phosphor">peon</span>
        </Link>

        <div className="text-muted-foreground hidden items-center gap-5 text-sm lg:flex">
          {NAV_ITEMS.map((item) => {
            if ('differentiator' in item && item.differentiator) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-1.5 rounded-md border border-phosphor/40 bg-accent/50 px-2.5 py-1 font-semibold text-phosphor hover:border-phosphor hover:bg-accent"
                >
                  <GithubIcon className="size-3.5 shrink-0" />
                  {item.label}
                </Link>
              );
            }

            const isActive =
              (active === 'docs' && item.href === '/docs') ||
              (active === 'blog' && item.href === '/blogs') ||
              (active === 'marketplace' && item.href === '/marketplace') ||
              (active === 'open-source' && item.href === '/open-source');

            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? 'text-foreground' : 'hover:text-foreground'}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={appHref('/login')}
            className="text-muted-foreground hover:text-foreground text-sm"
          >
            Log in
          </a>
          <a
            href={appHref('/register')}
            className="bg-primary text-primary-foreground rounded-md px-3 py-1.5 text-sm font-semibold hover:opacity-90"
          >
            Start deploying
          </a>
        </div>
      </nav>
    </header>
  );
}
