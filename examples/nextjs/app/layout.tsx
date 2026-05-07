// Phase 10 — Next.js 15 App Router demo: RootLayout.
//
// `<A11yServerHelper />` async server component'i cookie'yi okur ve
// `<html>` üzerine kilitli `data-a11y-*` attribute'larını yazar (FOUC fix).
// `<A11yPreconnect />` jsDelivr CDN'e DNS+TLS warm-up yapar.
// `<A11yScript />` widget'ı `next/script` lazyOnload stratejisiyle yükler.
import type { Metadata } from 'next';
import Script from 'next/script';
import {
  A11yServerHelper,
  A11yPreconnect,
} from '@blakfy/accessibility-widget-next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Blakfy Accessibility Widget — Demo',
  description:
    "Tek script tag ile entegre edilmiş erişilebilirlik tercih paneli demo sayfası",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" {...(await A11yServerHelper())}>
      <head>
        <A11yPreconnect />
      </head>
      <body suppressHydrationWarning>
        {children}
        {/* LOCAL DEV: yerel build — CDN'e yayınlanınca <A11yScript> ile değiştir */}
        <Script
          id="blakfy-a11y-widget"
          src="/widget.js"
          strategy="lazyOnload"
          data-locale="tr"
          data-theme="auto"
          data-position="bottom-left"
        />
      </body>
    </html>
  );
}
