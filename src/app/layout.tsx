import type { Metadata } from 'next';
import { Archivo, IBM_Plex_Mono, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { MarketingTheme } from '@/components/marketing/marketing-theme';
import {
  GoogleTagManager,
  GoogleTagManagerNoscript,
} from '@/components/analytics/google-tag-manager';
import { MetaPixel, MetaPixelNoscript } from '@/components/analytics/meta-pixel';
import { AttributionCapture } from '@/components/analytics/attribution-capture';
import { cn } from '@/lib/utils';
import { publicEnv } from '@/lib/env';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-archivo',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-mono',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
    images: [
      {
        url: '/og.jpg',
        width: 1024,
        height: 599,
        alt: 'Peon — Deploy your apps on your server in clicks',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Peon - Deploy your apps on your server in clicks',
    images: ['/og.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn('dark antialiased', archivo.variable, plexMono.variable, inter.variable)}
    >
      <body>
        <GoogleTagManagerNoscript />
        <MetaPixelNoscript />
        <GoogleTagManager />
        <MetaPixel />
        <AttributionCapture />
        <ThemeProvider>
          <MarketingTheme>
            <div className="bg-background text-foreground min-h-screen">{children}</div>
          </MarketingTheme>
        </ThemeProvider>
      </body>
    </html>
  );
}
