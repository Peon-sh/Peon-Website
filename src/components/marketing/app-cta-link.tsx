'use client';

import { useSyncExternalStore, type ComponentPropsWithoutRef } from 'react';
import { appHref } from '@/lib/env';
import { withAttributionQuery } from '@/lib/attribution';

type Props = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
  /** Path on the Peon app, e.g. `/register` or `/login`. */
  path: string;
};

function subscribeNoop() {
  return () => {};
}

/**
 * Link to the Peon app that appends first-touch attribution query params
 * (from cookie or current page search) after mount.
 */
export function AppCtaLink({ path, children, ...rest }: Props) {
  const bare = appHref(path);
  const href = useSyncExternalStore(
    subscribeNoop,
    () => withAttributionQuery(bare),
    () => bare,
  );

  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}
