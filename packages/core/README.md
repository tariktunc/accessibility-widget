# @blakfy/a11y-core

[![npm](https://img.shields.io/npm/v/@blakfy/a11y-core.svg)](https://www.npmjs.com/package/@blakfy/a11y-core)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

Framework-agnostic core for [`@blakfy/accessibility-widget`](https://www.npmjs.com/package/@blakfy/accessibility-widget) — preferences engine, i18n loader, schema, event bus.

> **⚠️ Alpha:** `2.0.0-alpha.x`. Bu paket, widget'ın iç bağımlılığı olarak otomatik kurulur; çoğu kullanıcının doğrudan yüklemesine **gerek yoktur**. Public API kilitli **değildir**.

## Yükleme

```bash
pnpm add @blakfy/a11y-core
# veya
npm install @blakfy/a11y-core
```

## Ne yapar

- `Preferences` tipi + default değerler
- `localStorage` + cookie senkronizasyonu (`blakfy_a11y_prefs`)
- 9 dilde i18n bundle loader
- Tipli event bus (`onChange`, `dispatch`)
- DOM-bağımsız: SSR ortamlarında da çalışır

## Ne yapmaz

- DOM patching
- React/Vue/Preact bağımlılığı
- UI rendering (panel/FAB)

UI ve mount ihtiyaçları için → [`@blakfy/accessibility-widget`](https://www.npmjs.com/package/@blakfy/accessibility-widget) (Preact-based widget) veya [`@blakfy/accessibility-widget-next`](https://www.npmjs.com/package/@blakfy/accessibility-widget-next) (Next.js helpers).

## Daha fazla

- Tam dokümantasyon: [GitHub README](https://github.com/tariktunc/accessibility-widget#readme)
- Public API kontratı: [`docs/STABLE-API.md`](https://github.com/tariktunc/accessibility-widget/blob/main/docs/STABLE-API.md)
- Lisans: [MIT](https://github.com/tariktunc/accessibility-widget/blob/main/LICENSE)
