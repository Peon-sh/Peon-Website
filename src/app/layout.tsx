import type { Metadata } from 'next';
import { Archivo, IBM_Plex_Mono, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { MarketingTheme } from '@/components/marketing/marketing-theme';
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
    default: 'Peon - Open-source deployment platform. Your servers, $2/project',
    template: '%s | Peon',
  },
  description: 'Self-hostable application deployment platform',
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
      { url: '/logo.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
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
        <ThemeProvider>
          <MarketingTheme>
            <div className="bg-background text-foreground min-h-screen">{children}</div>
          </MarketingTheme>
        </ThemeProvider>
      </body>
    </html>
  );
}
