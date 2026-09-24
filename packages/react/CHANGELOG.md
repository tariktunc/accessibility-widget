# @blakfy/accessibility-widget-react

## 2.0.0-alpha.8

### Patch Changes

- FAB shadow changed to a neutral 3% black (removed the blue tint), FAB background is now solid dark with a white icon, and the panel's default theme is `light` (white panel, black text) instead of following system preference.
- Updated dependencies
  - @blakfy/accessibility-widget@2.0.0-alpha.8
  - @blakfy/a11y-core@2.0.0-alpha.8

## 2.0.0-alpha.7

### Patch Changes

- Updated dependencies
  - @blakfy/accessibility-widget@2.0.0-alpha.7

## 2.0.0-alpha.6

### Patch Changes

- Updated dependencies
  - @blakfy/accessibility-widget@2.0.0-alpha.6

## 2.0.0-alpha.5

### Patch Changes

- Updated dependencies
  - @blakfy/accessibility-widget@2.0.0-alpha.5

## 2.0.0-alpha.4

### Minor Changes

- 279cd1c: Batch of accumulated v2.0.0-alpha work since the last release, all 53 backlog issues now closed except #39 (WordPress live verification, blocked on a real test environment):

  **New preferences (Preferences interface, additive — see STABLE-API.md §2):** `readingWidth`, `readAloud` (click-to-read via Web Speech API), `readingMask` (cursor-following reading band), `magnifier` (DOM-clone cursor lens), `stopAutoplay` (pauses autoplaying media, WCAG 2.2.2). OS signal detection extended: `prefers-reduced-transparency`, `prefers-reduced-data`. New quick-preset "profiles" (epilepsy/vision/cognitive/adhd/blindness) in the panel UI.

  **Public API additions:** `mount`/`defineCustomElement` now documented as part of the locked `window.BlakfyA11y` surface (STABLE-API.md §1.1) — they were already present in the IIFE bundle, now formally contracted.

  **Bug fixes:**
  - Sandboxed cross-origin iframe (Wix "Embed a Widget", #15/#19): `document.cookie` read no longer throws uncaught `SecurityError`, which previously aborted `mount()` before the widget rendered at all.
  - `.info-btn` touch target enlarged 16×16 → 24×24 (real WCAG 2.2 AA SC 2.5.8 violation, #63).
  - Panel muted-text color contrast raised to meet WCAG AA 4.5:1 (was failing against `--__card` background).
  - `_inferBaseURL`'s script-src fallback path now checks an origin allowlist (jsDelivr/unpkg) before trusting a matched `<script>` tag as the locale-fetch base (#54, low-severity hardening).
  - `diagnostics().performance.bundleSizeGz` and `.timeToFirstClick` now report real measured values instead of permanent stubs (#50).

  **Removed (dead code, pre-release, no real breaking impact):** `--blakfy-a11y-panel-bg-dark`/`-panel-text-dark`/`-panel-muted-dark`/`-panel-border-dark` CSS vars — declared but never consumed anywhere; the dark theme is served entirely by the non-suffixed vars via `:host([data-theme="dark"])` (#73).

  **New default palette:** black/white replacing the earlier blue accent (#65, owner decision).

  **Docs/examples:** new `examples/react-vite/` (Vite + React demo, #21); WordPress integration guide (`docs/guides/wordpress.md`, explicitly flagged as not yet verified against a real WordPress install, #38/#39); Wix/Webflow/Shopify/İkas guide (#16/#17/#18); corrected stale `Preferences` type values in `react-quickstart.md`.

  **Test coverage:** `packages/core/tests/contract/` now has real Phase 4 contract tests (#59); e2e suite covers the 280px Galaxy Fold breakpoint (#53); widget API/storage contract snapshots reconciled with the real v2 surface (#74).

  `@blakfy/accessibility-widget-react` publishes to npm for the first time with this release.

### Patch Changes

- Updated dependencies [279cd1c]
  - @blakfy/accessibility-widget@2.0.0-alpha.4
  - @blakfy/a11y-core@2.0.0-alpha.4
