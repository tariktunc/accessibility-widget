# Changelog

## [next 2.0.0-alpha.3] — 2026-08-25

### Fixed
- alpha.2 was published with `npm publish` from the pnpm workspace, so its `@blakfy/a11y-core` dependency shipped as the literal `workspace:*` and the package could not be installed. alpha.2 is deprecated on npm; alpha.3 is the same build published with `pnpm publish` (dependency resolved to `2.0.0-alpha.1`). Always publish this package with pnpm.

## [next 2.0.0-alpha.2] — 2026-08-25

### Changed
- `@blakfy/accessibility-widget-next` peer range widened to `next >=14.0.0 <17.0.0` — Next.js 16 accepted. Verified on Next 16.3.2 + React 19.2.8: clean install, `next build`, `<A11yServerHelper />` emits the `data-a11y-*` attributes server-side (no FOUC). No runtime change (`next/headers` `cookies()` is already awaited).

## [Unreleased] — v2.0.0

### Added
- CDN distribution via jsDelivr (auto-update, `@v1` floating tag, `@1.0.0` immutable pin)
- Web Component + Shadow DOM (CSS isolation; `<blakfy-a11y>` custom element)
- 15 CSS custom properties for theming (`--blakfy-a11y-*`)
- `@blakfy/accessibility-widget-next` (Next.js helpers: `<A11yServerHelper />`, `<A11yScript />`)
- `@blakfy/accessibility-widget-react` (React 18 / Vite: `<A11yWidget />` bileşeni + `useA11yPreferences()` hook)
- Diagnostics API (`window.BlakfyA11y.diagnostics()`)
- Auto-detection: OpenDyslexic CDN missing, host CSS `!important` conflict, OS `prefers-*` signals
- Custom events: `blakfy:a11y:ready`, `blakfy:a11y:change`, `blakfy:a11y:open`, `blakfy:a11y:close`
- Configuration priority: `BlakfyA11y.configure()` > `window.__BLAKFY_A11Y__` > `data-*` attrs
- Storage migration: schema versioning + auto-merge for new preference fields
- `data-dev-pipe` for Next.js dev terminal log streaming (`?a11y-debug=1` query support)
- 14 RED LINE CI tests (axe-core, focus trap, contrast, target size, RTL, bundle size, etc.)
- Locked public API contract (STABLE-API.md, ADR-004)
- Migration guide v1 → v2
- 7 yeni tercih alanı: `lineHeight`, `letterSpacing`, `textAlign`, `highlightHeadings`, `saturation`, `cursorSize`, `hideImages`
- OS signal detection: prefers-reduced-transparency, prefers-reduced-data (diagnostics only, parity with existing OS-signal handling)
- Quick-preset "profiles" (epilepsy/vision/cognitive/adhd/blindness) in the panel UI — apply a bundle of preferences in one click
- readAloud preference: click-to-read via native Web Speech API
- readingMask preference: cursor-following reading mask/ruler (dims viewport except a horizontal band), rendered inside the widget's own Shadow DOM
- magnifier preference: cursor-following DOM-clone lens (~2.5x zoom), zero new dependency (static snapshot — doesn't reflect live video/canvas)
- stopAutoplay preference: pauses autoplaying video/audio and watches for dynamically-added media (WCAG 2.2.2 Pause, Stop, Hide)
- readingWidth preference: constrains text block width (default/narrow/narrower) for easier line-tracking (WCAG 1.4.8)

### Fixed
- Correct contradictory README profile claims and document preset active-state, toggle-off, and shared-field behavior in STABLE-API.
- `.info-btn` tap target enlarged from 16x16 to a real 24x24 (WCAG 2.2 AA SC 2.5.8 Target Size Minimum) — was a genuine AA violation, visual dot unchanged via `::before` (#63). Note: `.stepper-btn`/`.opt-btn`/`.switch`/`.btn-reset` still fall short of the stronger 44x44 figure quoted in the v1.0.0 entry above — tracked separately, not yet resolved.
- `document.cookie` read (`_getCookie`) now catches `SecurityError` — a sandboxed cross-origin iframe without `allow-same-origin` (Wix "Embed a Widget", #15) throws on cookie access, which previously aborted `mount()` before it rendered anything.
- Panel color-contrast: `--__muted` text (profile descriptions, etc.) raised from 0.45 to 0.62 (light) / 0.58 (dark) alpha — the lighter value fell under WCAG AA 4.5:1 against `--__card`, caught by `contrast.spec.ts` (axe-core).
- e2e test suite realigned with UI changes landed earlier this session that were never re-verified against Chromium (browser wasn't installed until now): stale switch-by-index selectors → accessible-name lookups, `.btn-secondary`/`.scale-btn` → `.btn-reset`/stepper buttons, stale blue-palette (`#2563eb`)/old dark-bg (`#0a0a0a`) color assertions → current black/white palette + `#111111`, RTL badge assertion corrected to match the shipped same-side (not opposite-side) stacking behavior.

### Changed (BREAKING)
- Distribution model: `npx degit` → CDN script tag / NPM package
- Public API: scattered named exports → `window.BlakfyA11y` namespace
- Storage key: `wf_a11y_prefs` → `blakfy_a11y_prefs`
- UI framework: React 18 + Radix UI → Preact + Shadow DOM (custom Dialog/Switch ARIA APG)
- CSS approach: Tailwind utility classes + `!important` → 15 CSS custom properties (Shadow DOM scoped)
- Component prop config: React props (`<AccessibilityWidget font="..." />`) → `data-*` script attrs / `window.__BLAKFY_A11Y__` global
- Open dispatcher: `openA11yPanel()` → `window.BlakfyA11y.open()`
- Preference change: `onPreferencesChange` prop → `window.__BLAKFY_A11Y__.onPreferencesChange` OR `blakfy:a11y:change` event

### Removed (BREAKING)
- npm package v1 export structure (`@/components/a11y` import path no longer applies)
- `setup.mjs` interactive script (no longer needed — CDN install is zero-config)
- React peer dependencies (`@radix-ui/react-dialog`, `@radix-ui/react-switch`)
- `borderWidth` / `borderRadius` direct prop control (locked to design tokens for v1 stability)

### Migration
See [docs/migration/v1-to-v2.md](./docs/migration/v1-to-v2.md).

---

## [1.1.0] — 2026-04-26

### Added
- `keyboardShortcut` prop (default true) — Alt+0 ile panel acar
- `iconStyle` prop ('walking' | 'access' | 'eye') — default 'access' (universal access symbol)
- `onPreferencesChange` callback prop (external integration)
- `<A11yServerHelper />` async server helper — SSR FOUC korumasi tek satirda
- "Sifirla" 2-tiklama onay (3 saniye timer, kazara tiklama riskini azalt)
- OpenDyslexic CDN tespit + console warning (font yuklenmemisse uyarir)
- `PreferencesChangeHandler` ve `IconStyle` tip exports
- CONTRIBUTING.md (anti-overlay felsefesi PR kurali olarak)
- tests/README.md (Playwright + axe-core test stratejisi)

### Fixed
- package.json version 1.0.1 → 1.1.0 hizalandi

## [1.0.1] — 2026-04-26
- 'Operated by Blakfy Studio' imza metni

## [1.0.0] — 2026-04-26

### Added
- AccessibilityWidget: Sag-alt/sol FAB butonu (Radix Dialog ile acilan panel)
- AccessibilityPanel: 7 tercih kontrolu (font olcegi, kontrast, fokus halkasi, link altcizgi, motion, dyslexia font, okuma modu)
- preferences-store: localStorage + cookie + SSR FOUC koruma + OS media query merge
- styles.css: :root[data-a11y-*] CSS degiskenleri (DOM patch'i YOK, ARIA enjeksiyonu YOK)
- 9 dil destegi: TR, EN, DE, FR, ES, IT, AR (RTL), HE (RTL), RU
- BlakfyBadge: Powered by Blakfy imzasi (non-removable)
- prefers-reduced-motion ve prefers-contrast OS sinyallerine saygi
- Disleksi font notu: arastirma karisik (Wery 2017 etkisiz, Broadbent 2023 %58 prefer) — dürüst etiket
- Disclaimer: "Bu panel kullanici tercih kontrolu sunar; teknik a11y yapi seviyesinde saglanmistir"
- WCAG 2.2 AA: 44x44px touch target, focus-visible, klavye erisilebilirligi, semantic HTML — **düzeltme (#63, 2026-09-13):** bu iddia v1'in Radix UI tabanlı kontrollerini anlatıyordu; v2'nin Preact/Shadow DOM panelinde (`packages/widget/src/styles/widget.css`) `.stepper-btn`/`.opt-btn`/`.switch`/`.btn-reset` 44×44'ün altında (24-42px aralığında), gerçek uygulanan eşik **WCAG 2.2 AA SC 2.5.8 (Target Size Minimum, ≥24×24px)**'dir — `.info-btn` bu eşiğin altındaydı ve 2279a2f'de 24×24'e büyütüldü. Yalnızca FAB (48×48 / 280px'te 44×44) 44×44'ü gerçekten karşılıyor.
- Light / Dark / Auto tema (OS prefers-color-scheme takibi)
- Akiskan tipografi (clamp, min 10px max 18px)
- 280px responsive
- Position prop: bottom-left (default) / bottom-right / top-left / top-right
- Open dispatcher: Footer linki vb. icin openA11yPanel() helper

### Anti-pattern Avoidance (Arastirma Bulgulari)
- ❌ DOM rewriting / otomatik ARIA enjeksiyonu YOK
- ❌ "Screen reader" toggle YOK (gercek SR'lari bozar)
- ❌ "WCAG compliant" / "ADA compliant" iddiasi YOK
- ❌ Otomatik alt text uretimi YOK
- ❌ "Seizure-safe profile" gibi pazarlama profilleri YOK

Bu widget ACCESSIBE / USERWAY / AUDIOEYE TARZINDA OVERLAY DEGILDIR.
Native preferences panel olarak konumlanmistir.

### References
- Overlay Fact Sheet: https://overlayfactsheet.com/en/
- FTC vs accessiBe (2024): $1M ceza
- WCAG 2.2 (2023-10-05 W3C Recommendation)
- AB Erisilebilirlik Yasasi (EAA) 28 Haziran 2025 yururlukte
