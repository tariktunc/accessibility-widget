# Next.js Quickstart

`@blakfy/accessibility-widget-next` ile Next.js 14+ (App Router) projesine widget entegrasyonu.

## Kurulum

```bash
npm install @blakfy/accessibility-widget-next
# veya
pnpm add @blakfy/accessibility-widget-next
```

## 1. Root layout'a ekle

`app/layout.tsx` (veya `app/layout.js`):

```tsx
import { A11yServerHelper, A11yScript } from '@blakfy/accessibility-widget-next';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const a11yAttrs = await A11yServerHelper();

  return (
    <html lang="tr" {...a11yAttrs}>
      <head>
        <A11yScript version="2.0.0-alpha.0" locale="tr" theme="auto" position="bottom-right" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

**`A11yServerHelper`** cookie'den tercihleri okur ve `data-a11y-*` attribute'larını `<html>` etiketine yazar — ilk render'da FOUC (stilsiz içerik yanıp sönmesi) olmaz.

**`A11yScript`** jsDelivr CDN'den widget IIFE'sini yükler ve FOUC koruması için inline script ekler.

## 2. `A11yScript` props

| Prop | Tip | Varsayılan | Açıklama |
|---|---|---|---|
| `version` | `string` | `'2.0.0-alpha.0'` | CDN'den yüklenecek widget versiyonu |
| `locale` | `Locale` | `'tr'` | Arayüz dili |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'auto'` | Widget teması |
| `position` | `Position` | `'bottom-right'` | FAB butonu konumu |
| `onPreferencesChange` | `string` | — | Tercih değişiminde çağrılacak global callback adı |

## 3. Tema özelleştirme (CSS custom properties)

Widget 15 CSS custom property sunar. `globals.css` veya herhangi bir stylesheet'te override et:

```css
:root {
  --a11y-fab-bg: #1d4ed8;          /* FAB arka plan rengi */
  --a11y-fab-color: #ffffff;        /* FAB ikon rengi */
  --a11y-panel-bg: #ffffff;         /* Panel arka plan */
  --a11y-panel-radius: 12px;        /* Panel köşe yuvarlaklığı */
  --a11y-accent: #2563eb;           /* Vurgu rengi */
}
```

Tüm CSS custom property listesi için `docs/STABLE-API.md §4` bölümüne bakın.

## 4. Tercih değişimini dinleme

```tsx
'use client';
import { useEffect } from 'react';

export function PrefsListener() {
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      console.log('Tercihler değişti:', e.detail);
    };
    window.addEventListener('blakfy:preferenceschange', handler as EventListener);
    return () => window.removeEventListener('blakfy:preferenceschange', handler as EventListener);
  }, []);
  return null;
}
```

## 5. Programatik API

```ts
// Panel'i aç
window.BlakfyA11y?.open();

// Tercihleri oku
const prefs = window.BlakfyA11y?.getPreferences();

// Tercihleri sıfırla
window.BlakfyA11y?.reset();

// Diagnostics snapshot
const snapshot = window.BlakfyA11y?.diagnostics();
```

## Sorun Giderme

**FOUC görüyorum:** `A11yServerHelper` async fonksiyondur; `layout.tsx`'in `async` olduğundan emin ol.

**Widget yüklenmiyor:** Tarayıcı konsolunda `[blakfy-a11y]` başlıklı diagnostics mesajlarını kontrol et. CDN URL'nin doğru versiyonu gösterdiğini doğrula.

**TypeScript hataları:** `@blakfy/a11y-core` peerDependency olarak gerekmez; `@blakfy/accessibility-widget-next` bağımlılık olarak getirir.
