import { publicEnv } from '@/lib/env';

/** GTM noscript iframe. Place immediately inside `<body>`. */
export function GoogleTagManagerNoscript() {
  const gtmId = publicEnv.gtmId;
  if (!gtmId) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height={0}
        width={0}
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
