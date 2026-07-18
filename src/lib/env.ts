/** Public (browser-safe) config for the marketing site. */
export const publicEnv = {
  /** Peon app origin (login, register, deploy). */
  appUrl: (process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.peon.sh').replace(/\/$/, ''),
  /** This marketing site origin. */
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://peon.sh').replace(/\/$/, ''),
};

/** Absolute URL into the Peon app. */
export function appHref(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${publicEnv.appUrl}${p}`;
}
