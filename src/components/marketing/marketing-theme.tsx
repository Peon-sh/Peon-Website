'use client';

import { useEffect } from 'react';
import { useTheme } from '@teispace/next-themes';

/** Marketing pages are always dark. */
export function MarketingTheme({ children }: { children: React.ReactNode }) {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('dark');
  }, [setTheme]);

  return children;
}
