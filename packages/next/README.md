# @blakfy/accessibility-widget-next

Next.js App Router helpers for [`@blakfy/accessibility-widget`](https://www.npmjs.com/package/@blakfy/accessibility-widget). Three tiny components — no client-side state, just glue.

- **`A11yServerHelper`** — async RSC helper that reads the prefs cookie and returns `data-a11y-*` attributes to spread on `<html>` (FOUC protection).
- **`A11yScript`** — `next/script` wrapper that loads the widget IIFE bundle from jsDelivr (`@v1` floating tag by default) and forwards the locked `data-*` config surface.
- **`A11yPreconnect`** — `<link rel="preconnect">` hint for the jsDelivr origin.

## Usage

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

See the [root README](../../README.md) and [`docs/STABLE-API.md`](../../docs/STABLE-API.md) for the locked v1 surface.
