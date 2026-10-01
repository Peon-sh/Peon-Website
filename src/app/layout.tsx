import type { Metadata } from 'next';
import { IBM_Plex_Mono, Inter } from 'next/font/google';
import { GoogleTagManagerNoscript } from '@/components/analytics/google-tag-manager';
import { MarketingBoot } from '@/components/analytics/marketing-boot';
import { cn } from '@/lib/utils';
import { publicEnv } from '@/lib/env';
import { defaultOgImage } from '@/lib/og';
import './globals.css';

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
  preload: false,
});

const interHeading = Inter({
  subsets: ['latin'],
  weight: '600',
  variable: '--font-inter-heading',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
  preload: false,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(publicEnv.siteUrl),
  title: {
    default: 'Peon - Deploy your apps on your server in clicks',
    template: '%s | Peon',
  },
  description: 'Self-hostable application deployment platform',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    siteName: 'Peon',
    title: 'Peon - Deploy your apps on your server in clicks',
    images: [defaultOgImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Peon - Deploy your apps on your server in clicks',
    images: [defaultOgImage],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn('dark antialiased', plexMono.variable, inter.variable, interHeading.variable)}
    >
      <body>
        <GoogleTagManagerNoscript />
        <MarketingBoot />
        <div className="bg-background text-foreground min-h-screen">{children}</div>
      </body>
    </html>
  );
}
