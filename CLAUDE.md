# CLAUDE.md — @blakfy/accessibility-widget

Bu dosya Claude Code oturumlarına proje bağlamı sağlar.

---

## Proje Özeti

TypeScript monorepo. Üç yayınlanan paket + iki örnek uygulama.

**Amaç:** Next.js ve vanilla HTML siteleri için WCAG 2.2 uyumlu erişilebilirlik tercih paneli widget'ı.

**CDN dağıtımı:** `@blakfy/accessibility-widget` jsDelivr üzerinden IIFE olarak yüklenir.
**Next.js entegrasyonu:** `@blakfy/accessibility-widget-next` → `A11yScript` + `A11yServerHelper`.

---

## Paket Yapısı

```
packages/
  core/     → @blakfy/a11y-core           (framework-agnostic: i18n, schema, events)
  widget/   → @blakfy/accessibility-widget (Preact UI + IIFE/ESM/Web Component)
  next/     → @blakfy/accessibility-widget-next (Next.js SSR helpers)

examples/
  nextjs/        → Next.js 15 tam örnek
  vanilla-html/  → CDN script tag örneği

test-site/  → Manuel hızlı test (build artifact, git tracked değil)
docs/       → Diátaxis-lite: guides/, reference/, migration/, adr/
scripts/    → publish-manual.mjs (CI dışı manual publish)
.github/    → workflows/ + topluluk dosyaları (CONTRIBUTING, SUPPORT, CODE_OF_CONDUCT, SECURITY)
```

---

## Temel Komutlar

```bash
pnpm build            # Tüm paketleri derle
pnpm dev              # Watch modu (paralel)
pnpm test             # Unit testler
pnpm test:contract    # Kontrat testleri
pnpm typecheck        # TypeScript kontrolü
pnpm lint             # ESLint (max-warnings=0)
pnpm format:check     # Prettier

pnpm api:check        # API Extractor — kontrat kırılmasını yakala (CI gate)
pnpm api:update       # etc/*.api.md baseline'larını yeniden oluştur
pnpm docs:reference   # TypeDoc → docs/reference/ (output git-ignored)

pnpm release:manual   # Lokal npm publish (provenance'ı geçici kaldırır)
pnpm changeset        # Yeni changeset oluştur
pnpm version          # Changesets ile versiyonla
pnpm release          # Build + changeset publish (CI'da OIDC ile)
```

---

## Yayın / Release Akışı

### Otomatik (önerilen)
1. `pnpm changeset` → `.changeset/*.md` dosyası oluştur
2. `git push` → GitHub Actions `release.yml` çalışır
3. changesets/action ya "Version Packages" PR açar ya da direkt yayınlar (OIDC provenance ile)

**Gerekli GitHub secret:** `NPM_TOKEN` → Settings → Secrets → Actions
(Token değeri npm hesabından alınır; Bypass 2FA etkin Granular Access Token gereklidir)

### Manuel (CI dışı / acil hotfix)
```bash
pnpm release:manual              # Tüm paketler
pnpm release:manual --dry-run    # Simülasyon
pnpm release:manual --filter @blakfy/accessibility-widget-next  # Tek paket
```

### publishConfig.provenance
`provenance: true` sadece GitHub Actions OIDC ortamında çalışır. Lokal publish'te hata verir.
`scripts/publish-manual.mjs` bunu otomatik yönetir (geçici kaldırır, publish, geri alır).

---

## CDN URL Yapısı

```
# Alpha (kesin pin — floating tag yok)
https://cdn.jsdelivr.net/npm/@blakfy/accessibility-widget@2.0.0-alpha.1/dist/widget.js

# Stable (gelecek)
https://cdn.jsdelivr.net/npm/@blakfy/accessibility-widget@v2/dist/widget.js
```

`A11yScript.tsx`'deki `version` prop'u bu URL'yi oluşturur. Alpha'da kesin versiyon zorunlu.

---

## API Kontrat Sistemi

`packages/*/etc/*.api.md` dosyaları API Extractor'ın ürettiği baseline raporları.
- **Commit edilir** — PR'larda kontrat değişimini diff olarak gösterir
- `pnpm api:check` → CI gate; kontrat kırılması build'i başarısız yapar
- `pnpm api:update` → bilinçli API değişikliklerinden sonra baseline'ı güncelle

---

## GitHub Hesabı

Bu repo `tariktunc` hesabına aittir.

```bash
# Push öncesi
gh auth switch --user tariktunc
git push
```

SSH: `git@github.com:tariktunc/accessibility-widget.git`

---

## Bilinen Sorunlar

- `examples/nextjs/contact/page.tsx` → Event handler'ı Server Component içinde, prerender hatası.
  Yayınlanan paketleri etkilemez. Sonraki geliştirmede düzeltilecek.

---

## Versiyon Durumu (Mayıs 2026)

| Paket | npm Versiyonu |
|---|---|
| `@blakfy/a11y-core` | 2.0.0-alpha.1 |
| `@blakfy/accessibility-widget` | 2.0.0-alpha.0 |
| `@blakfy/accessibility-widget-next` | 2.0.0-alpha.1 |

Stable release için `2.0.0` hedefleniyor. Alpha'da breaking change beklenir.
