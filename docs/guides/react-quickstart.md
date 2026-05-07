# React (Vite + TypeScript) Hızlı Başlangıç

`@blakfy/accessibility-widget-react` — Vite + React 18 + TypeScript + Tailwind projeleri için.

## Kurulum

```bash
npm install @blakfy/accessibility-widget-react
# veya
pnpm add @blakfy/accessibility-widget-react
```

**Peer dependency:** React ≥ 18.0.0

## Temel Kullanım

`<A11yWidget />` bileşenini uygulama kök bileşenine ekleyin:

```tsx
// src/App.tsx
import { A11yWidget } from '@blakfy/accessibility-widget-react';

function App() {
  return (
    <>
      <A11yWidget locale="tr" theme="auto" position="bottom-right" />
      <main>...</main>
    </>
  );
}
```

Widget DOM'a kendi eklenir ve görsel çıktısı olmayan `null` döndürür. Yalnızca bir kez mount edilir.

## Props

`A11yWidget` props'ları `WidgetOptions` ile bire bir eşleşir:

| Prop | Tip | Varsayılan | Açıklama |
|---|---|---|---|
| `locale` | `'tr' \| 'en'` | `'tr'` | Arayüz dili |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'auto'` | Renk teması |
| `position` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | `'bottom-right'` | Widget konumu |
| `font` | `string` | — | Varsayılan font |
| `debug` | `boolean` | `false` | Konsol çıktısı |

## Tercih Değişikliklerini Dinlemek

`useA11yPreferences` hook'u güncel `Preferences` nesnesini döndürür. Kullanıcı bir ayarı değiştirdiğinde otomatik güncellenir:

```tsx
import { useA11yPreferences } from '@blakfy/accessibility-widget-react';

function MyComponent() {
  const prefs = useA11yPreferences();

  return (
    <article
      style={{
        fontSize: prefs.fontScale === 125 ? '1.25rem' : '1rem',
        lineHeight: prefs.lineHeight === 'loose' ? 2 : 1.5,
      }}
    >
      İçerik
    </article>
  );
}
```

### Tailwind ile Kullanım

`useA11yPreferences` döndürdüğü değerlere göre koşullu sınıflar uygulayabilirsiniz:

```tsx
import { useA11yPreferences } from '@blakfy/accessibility-widget-react';

function Card({ children }: { children: React.ReactNode }) {
  const { fontScale, contrast, motion } = useA11yPreferences();

  return (
    <div
      className={[
        'rounded-lg p-4',
        fontScale === 125 && 'text-lg',
        contrast === 'high' && 'border-2 border-black',
        motion === 'reduced' && '[&_*]:transition-none',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}
```

## Preferences Alanları

`useA11yPreferences()` döndüren nesnenin tüm alanları:

| Alan | Tip | Varsayılan |
|---|---|---|
| `fontScale` | `100 \| 110 \| 125 \| 150` | `100` |
| `contrast` | `'default' \| 'high' \| 'low'` | `'default'` |
| `focusRing` | `boolean` | `false` |
| `linkUnderline` | `boolean` | `false` |
| `motion` | `'default' \| 'reduced'` | `'default'` |
| `dyslexiaFont` | `boolean` | `false` |
| `readingMode` | `boolean` | `false` |
| `lineHeight` | `'default' \| 'loose'` | `'default'` |
| `letterSpacing` | `'default' \| 'wide'` | `'default'` |
| `textAlign` | `'default' \| 'left'` | `'default'` |
| `highlightHeadings` | `boolean` | `false` |
| `saturation` | `'default' \| 'low' \| 'none'` | `'default'` |
| `cursorSize` | `'default' \| 'large'` | `'default'` |
| `hideImages` | `boolean` | `false` |

## main.tsx'de Tek Seferlik Mount

Bileşen ağacının dışında sadece widget'ı mount etmek istiyorsanız direkt `mount()` kullanabilirsiniz:

```tsx
// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { mount } from '@blakfy/accessibility-widget';
import App from './App';

mount({ locale: 'tr', position: 'bottom-right' });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

Bu yaklaşımda `useA11yPreferences` hook'u React ağacı içinde çalışmaya devam eder.

## TypeScript Tipleri

Paketin kendi tiplerini re-export eder:

```ts
import type {
  A11yWidgetProps,
  Preferences,
  WidgetOptions,
  Locale,
  Theme,
  Position,
} from '@blakfy/accessibility-widget-react';
```
