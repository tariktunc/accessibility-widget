# @blakfy/accessibility-widget

[![npm](https://img.shields.io/npm/v/@blakfy/accessibility-widget.svg)](https://www.npmjs.com/package/@blakfy/accessibility-widget)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![WCAG 2.2 AA](https://img.shields.io/badge/WCAG-2.2%20AA-blueviolet.svg)](https://www.w3.org/TR/WCAG22/)

> Native accessibility preferences panel for Next.js + vanilla sites. Auto-updates via jsDelivr CDN.

**Overlay değil, kullanıcı tercih paneli.** DOM patch yok, sahte WCAG iddiası yok, telemetri yok. Bundle ≤18 KB gz.

> **⚠️ Alpha:** `2.0.0-alpha.x`. Public API kilitli **değildir**, breaking change gelebilir. Üretim için `2.0.0` stabil sürümü bekleyin veya tam sürüm pinleyin.

## Hızlı kurulum (CDN — önerilen)

```html
<script
  src="https://cdn.jsdelivr.net/npm/@blakfy/accessibility-widget@2.0.0-alpha.0/dist/widget.js"
  data-locale="tr"
  data-theme="auto"
  data-position="bottom-left"
  defer
></script>
```

FAB sol-altta görünür; panel açılır; tercihler `localStorage` + cookie ile saklanır.

## NPM ile

```bash
pnpm add @blakfy/accessibility-widget
```

```js
import '@blakfy/accessibility-widget';
// auto-mount: window.BlakfyA11y global'i hazır olur
```

## Custom Element (Wix / Webflow / Shopify)

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@blakfy/accessibility-widget@2.0.0-alpha.0/dist/widget-element.js"
></script>

<blakfy-a11y locale="tr" theme="auto" position="bottom-left"></blakfy-a11y>
```

## Next.js helpers

Next.js App Router için ek paket: [`@blakfy/accessibility-widget-next`](https://www.npmjs.com/package/@blakfy/accessibility-widget-next) — SSR FOUC koruması, `<A11yScript />` ve `<A11yServerHelper />` bileşenleri.

## API özeti

```js
BlakfyA11y.open();                        // paneli aç
BlakfyA11y.close();
BlakfyA11y.getPreferences();              // aktif tercihleri al
BlakfyA11y.setPreferences({ fontScale: 125 });
BlakfyA11y.onChange((prefs) => { /* ... */ });
BlakfyA11y.diagnostics();                 // destek için snapshot
```

Tam API + 7 tercih + 9 dil + tema değişkenleri için → [GitHub README](https://github.com/tariktunc/accessibility-widget#readme).

## Anti-pattern'lar

❌ DOM patching · ❌ AI alt-text · ❌ Otomatik ARIA enjeksiyonu · ❌ "Profil" preset'leri · ❌ Telemetri · ❌ AT fingerprinting

Sebepler ve referanslar (FTC vs accessiBe 2025, Overlay Fact Sheet, WebAIM çalışmaları): [GitHub README](https://github.com/tariktunc/accessibility-widget#anti-patternlarin-eklenmedigi).

## Lisans

[MIT](https://github.com/tariktunc/accessibility-widget/blob/main/LICENSE). Marka rozeti ("Powered by Blakfy Studio") gizlenemez.
