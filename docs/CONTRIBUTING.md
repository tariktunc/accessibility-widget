# Contributing

Katkı kabul edilir — issue, PR, çeviri, dokümantasyon.

---

## İçindekiler

- [Setup](#setup)
- [Geliştirme](#gelistirme)
- [Test](#test)
- [Changesets](#changesets)
- [Linting ve formatlama](#linting-ve-formatlama)
- [PR kuralları](#pr-kurallari)
- [Commit conventions](#commit-conventions)
- [Branch isimlendirme](#branch-isimlendirme)
- [Felsefe — KEEP IT NATIVE](#felsefe-keep-it-native)
- [Yeni dil ekleme](#yeni-dil-ekleme)
- [Yeni preference ekleme](#yeni-preference-ekleme)

---

<a id="setup"></a>

## Setup

```bash
git clone https://github.com/tariktunc/accessibility-widget
cd accessibility-widget
pnpm install
```

Monorepo yapısı (pnpm workspaces):
- `packages/widget` — core CDN bundle (Preact + Web Component)
- `packages/widget-next` — Next.js helpers (`A11yServerHelper`, `A11yScript`)
- `apps/playground` — local development sandbox
- `tests/` — unit, e2e (Playwright), contract (snapshot)

---

<a id="gelistirme"></a>

## Geliştirme

### Tüm workspace'i

```bash
pnpm dev
```

### Belirli bir paket

```bash
pnpm --filter @blakfy/accessibility-widget dev
pnpm --filter @blakfy/accessibility-widget-next dev
```

### Playground

```bash
pnpm --filter playground dev
```

`http://localhost:3000` — widget'i test ortamında deneyin.

---

<a id="test"></a>

## Test

| Komut | Açıklama |
|---|---|
| `pnpm test` | Unit testler (Vitest) |
| `pnpm test:e2e` | Playwright (Chromium + Firefox + WebKit) |
| `pnpm test:contract` | Snapshot tests — kilitli API yüzeyini doğrular |
| `pnpm test:axe` | axe-core a11y testleri |
| `pnpm test:bundle-size` | Bundle ≤18 KB gz kontrolü |
| `pnpm typecheck` | TypeScript strict |
| `pnpm lighthouse` | Lighthouse CWV regression check |

### 14 RED LINE testi

Her release'de geçer (CI gate). Detay: [`docs/STABLE-API.md` §13](./STABLE-API.md).

1. axe-core 0 violation (FAB closed + modal open)
2. Klavye-only flow (FAB → Tab × 9 → ESC → fokus FAB'a döner)
3. Focus trap (Tab/Shift-Tab cycle)
4. `role="switch"` + `aria-checked` her toggle'da
5. Kontrast ≥4.5:1 text, ≥3:1 non-text (light + dark + auto)
6. Target size ≥24×24 her interactive element
7. Reflow 320×256 (yatay scroll yok)
8. RTL smoke (ar/he aynalanma)
9. `prefers-reduced-motion` saygısı
10. Manuel SR sanity (NVDA + VoiceOver) — release-gate
11. Bundle ≤18 KB gz
12. Lighthouse CWV regression yok (LCP/CLS/INP delta)
13. Contract test — Public API yüzeyi snapshot
14. Storage migration test — eski cookie/localStorage parse

---

<a id="changesets"></a>

## Changesets

Her PR'da changeset zorunludur (CI bunu kontrol eder).

```bash
pnpm changeset add
```

Tip seçimi:
- **patch** — bug fix, perf, internal refactor (STABLE-API.md değişmez)
- **minor** — yeni preference / yeni dil / yeni CSS var / yeni event ekleme
- **major** — kilitli API yüzeyinde breaking change (ADR-004 yasak listesinden biri)

CI gate'ler:
- `STABLE-API.md` değiştiyse `CHANGELOG.md` da güncellenmelidir
- Bundle 18 KB'ı aştıysa fail
- Contract snapshot değiştiyse manuel onay gerekir
- `dist/` manuel commit edilmiş PR'lar bloke (sadece release workflow yazabilir)

Detay: [ADR-006](./ADR/006-versioning-auto-update.md).

---

<a id="linting-ve-formatlama"></a>

## Linting ve formatlama

```bash
pnpm lint        # ESLint, 0 warning hedefi
pnpm format      # Prettier, otomatik düzelt
pnpm format:check # CI'da, değişiklik yoksa pass
```

TypeScript strict — `any` ve `@ts-ignore` PR review'da reddedilir (justified comment yoksa).

---

<a id="pr-kurallari"></a>

## PR kuralları

1. **Branch'i yeni aç** — `main`'e doğrudan push yok
2. **Changeset ekle** — `pnpm changeset add`
3. **Test geç** — `pnpm test && pnpm test:e2e && pnpm test:contract`
4. **Lint geç** — `pnpm lint && pnpm format:check`
5. **Bundle bütçe** — ≤18 KB gz
6. **STABLE-API güncellemesi** — kilitli yüzey değiştiyse [STABLE-API.md](./STABLE-API.md) güncel olmalı, CHANGELOG.md güncel olmalı
7. **Major bump** — extra code review + 30 gün önceden duyuru ([ADR-006](./ADR/006-versioning-auto-update.md))

Locked contract politikası: [ADR-004](./ADR/004-locked-contracts.md).

---

<a id="commit-conventions"></a>

## Commit conventions

Conventional Commits formatı:

| Prefix | Kullanım |
|---|---|
| `feat:` | Yeni özellik (genellikle minor bump) |
| `fix:` | Bug fix (patch bump) |
| `docs:` | Dokümantasyon (versiyon değişikliği yok) |
| `chore:` | Build, tooling, deps |
| `test:` | Test ekleme/düzenleme |
| `refactor:` | Kod yeniden düzenleme (davranış değişmez) |
| `perf:` | Performans iyileştirme |
| `style:` | Formatlama (semantic değişiklik yok) |

Örnekler:

```
feat(i18n): add Polish (pl) translation
fix(panel): focus trap leaks on Shift-Tab from FAB
docs(readme): add Stripe-style theme example
chore(deps): bump preact 10.19.0 → 10.20.0
```

Breaking change: footer'a `BREAKING CHANGE:` notu ekle.

```
feat(api): rename setPreferences to updatePreferences

BREAKING CHANGE: BlakfyA11y.setPreferences kaldırıldı, updatePreferences kullan.
Migration: window.BlakfyA11y.setPreferences(...) → updatePreferences(...)
```

---

<a id="branch-isimlendirme"></a>

## Branch isimlendirme

| Tip | Pattern | Örnek |
|---|---|---|
| Yeni özellik | `feat/<konu>` | `feat/saturation-toggle` |
| Bug fix | `fix/<konu>` | `fix/focus-trap-rtl` |
| Doküman | `docs/<konu>` | `docs/stripe-theme-example` |
| Refactor | `refactor/<konu>` | `refactor/preact-signals` |
| CI / tooling | `chore/<konu>` | `chore/bump-preact` |
| Test | `test/<konu>` | `test/axe-modal-open` |

---

<a id="felsefe-keep-it-native"></a>

## Felsefe — KEEP IT NATIVE

Bu widget **asla overlay olamaz**. PR kabulü için:

- ❌ DOM patching YASAK (runtime DOM rewrite)
- ❌ Otomatik ARIA enjeksiyonu YASAK
- ❌ "WCAG compliance" / "ADA compliance" iddiası YASAK
- ❌ Telemetri YASAK (privacy-by-default — ADR-005)
- ❌ Profil preset'leri YASAK ("Epilepsy", "Blind", "ADHD" gibi sahte kategoriler)
- ❌ AT (assistive tech) fingerprinting YASAK
- ❌ Otomatik alt text üretimi YASAK
- ❌ "Screen reader" toggle YASAK
- ✅ CSS variable / data-attribute toggle
- ✅ OS `prefers-*` media query saygısı
- ✅ Yapısal a11y site sahibinin sorumluluğu — widget ek katman

Bu kuralları ihlal eden PR otomatik reddedilir.

Detay:
- [Overlay Fact Sheet](https://overlayfactsheet.com/) — 900+ a11y uzmanı imzalı
- [FTC vs accessiBe (2025)](https://adrianroselli.com/2025/01/ftc-catches-up-to-accessibe.html)

---

<a id="yeni-dil-ekleme"></a>

## Yeni dil ekleme

1. `packages/widget/src/i18n/<locale>.json` oluştur (örn. `pl.json`)
2. `packages/widget/src/i18n/index.ts`'e import + locale kodu ekle
3. RTL ise `direction: 'rtl'` ile işaretle, `AccessibilityPanel` mount logic'inde `isRtl` kontrolüne ekle
4. STABLE-API.md `WidgetOptions.locale` enum'una yeni dil ekle (minor bump satırı olarak)
5. PR commit: `feat(i18n): add <language>`
6. Changeset: minor bump

---

<a id="yeni-preference-ekleme"></a>

## Yeni preference ekleme

1. `packages/widget/src/types.ts` `Preferences` interface'ine alan ekle
2. `DEFAULT_PREFS` objesi içine default değer ekle
3. `applyPrefs` içine `<html>` data-attribute yaz
4. `tokens.css` (Shadow DOM) içine yeni `:root[data-a11y-...]` rule ekle
5. `AccessibilityPanel.tsx` içinde toggle UI ekle (custom Switch component, ARIA APG pattern)
6. `i18n/<locale>.json` 9 dile etiket ekle
7. **Kanıt-temelli olmalı** — anti-pattern'lardan kaçın
8. `tests/contract/api.spec.ts` snapshot'ını yenile
9. STABLE-API.md `Preferences` interface'ine satır ekle (minor bump)
10. CHANGELOG.md `[Unreleased]` altına ekle
11. PR commit: `feat(prefs): add <preference>`
12. Changeset: minor bump

---

## Yardım

- **GitHub Discussions**: sorular, ideas, breaking change feedback'i
- **GitHub Issues**: bug report, feature request
- **E-posta**: blakfy@hotmail.com
- **Code of Conduct**: [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
- **Security**: [SECURITY.md](./SECURITY.md)
