# @blakfy/accessibility-widget-next

[![npm](https://img.shields.io/npm/v/@blakfy/accessibility-widget-next.svg)](https://www.npmjs.com/package/@blakfy/accessibility-widget-next)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

Next.js App Router helpers for [`@blakfy/accessibility-widget`](https://www.npmjs.com/package/@blakfy/accessibility-widget). Three tiny components — no client-side state, just glue.

> **⚠️ Alpha:** `2.0.0-alpha.x`. Public API kilitli **değildir**, breaking change gelebilir. `@blakfy/accessibility-widget` ile aynı major sürüme pinlenmesi önerilir.

## Yükleme

```bash
pnpm add @blakfy/accessibility-widget-next
```

Peer dependency: `next >= 14`, `react >= 18`.

## Bileşenler

- **`A11yServerHelper`** — async RSC helper. Prefs cookie'sini okur, `<html>`'e spread edilecek `data-a11y-*` attribute'ları döner (FOUC koruması).
- **`A11yScript`** — `next/script` wrapper. Widget IIFE bundle'ını jsDelivr'dan yükler ve kilitli `data-*` config yüzeyini iletir. Alpha aşamasında pinli sürüme yüklenir; stabil sürüme geçtikten sonra `@v2` floating tag default olacak.
- **`A11yPreconnect`** — jsDelivr origin'i için `<link rel="preconnect">` ipucu.

## Kullanım

```tsx
// app/layout.tsx
import {
  A11yServerHelper,
  A11yScript,
  A11yPreconnect,
} from '@blakfy/accessibility-widget-next';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" {...await A11yServerHelper()}>
      <head>
        <A11yPreconnect />
      </head>
      <body>
        {children}
        <A11yScript locale="tr" theme="auto" position="bottom-left" />
      </body>
    </html>
  );
}
```

## Daha fazla

- Tam dokümantasyon: [GitHub README](https://github.com/tariktunc/accessibility-widget#readme)
- Next.js entegrasyon detayı (Yol A vs Yol B, SSR FOUC pattern'leri, dev-pipe log endpoint'i): [Kurulum bölümü](https://github.com/tariktunc/accessibility-widget#kurulum)
- Public API kontratı: [`docs/STABLE-API.md`](https://github.com/tariktunc/accessibility-widget/blob/main/docs/STABLE-API.md)
- Lisans: [MIT](https://github.com/tariktunc/accessibility-widget/blob/main/LICENSE)
