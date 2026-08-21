import { type ComponentPropsWithoutRef } from 'react';
import { appHref } from '@/lib/env';

type Props = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
  /** Path on the Peon app, e.g. `/register` or `/login`. */
  path: string;
};

/**
 * Link to the Peon app. Renders a static href; the inline marketing boot
 * script appends first-touch query params (`data-peon-cta`) after parse.
 */
export function AppCtaLink({ path, children, ...rest }: Props) {
  return (
    <a href={appHref(path)} data-peon-cta="" {...rest}>
      {children}
    </a>
  );
}
