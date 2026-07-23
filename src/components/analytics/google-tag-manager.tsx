import Script from 'next/script';
import { publicEnv } from '@/lib/env';

/**
 * Google Tag Manager. Renders nothing when `NEXT_PUBLIC_GTM_ID` is unset.
 */
export function GoogleTagManager() {
  const gtmId = publicEnv.gtmId;
  if (!gtmId) return null;

  return (
    <Script id="google-tag-manager" strategy="afterInteractive">{`
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');
    `}</Script>
  );
}

/** GTM noscript iframe — place immediately inside `<body>`. */
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
