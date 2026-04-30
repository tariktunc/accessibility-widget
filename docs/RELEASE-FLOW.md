# Release Flow

@blakfy/accessibility-widget v2 sürüm süreci. Politika için
[ADR-006](./ADR/006-versioning-auto-update.md) ve
[ADR-004](./ADR/004-locked-contracts.md) referanstır. Bu doküman **operasyonel**
adımları açıklar.

## Yayımlanan paketler

- `@blakfy/accessibility-widget` (widget — IIFE + ESM + web component)
- `@blakfy/a11y-core` (framework-agnostic core)
- `@blakfy/accessibility-widget-next` (Next.js helpers)

Üçü `linked` (changesets) — biri minor bump alırsa diğerleri de minor olur.

## Normal sürüm flow

1. **Feature branch** aç (`feat/...`, `fix/...`, `chore/...`).
2. Değişikliği yap. Sonra:
   ```bash
   pnpm changeset add
   ```
   - Bump tipi seç: patch / minor / major (ADR-006 tablosu).
   - Kısa bir değişiklik özeti yaz (CHANGELOG'a girecek).
3. `.changeset/*.md` dosyasını commit'e dahil et, PR aç.
4. CI gate'leri yeşil olmalı:
   - `lint` (0 warning)
   - `typecheck`
   - `test` (unit)
   - `test:contract` (kilitli yüzey doğrulaması)
   - `build`
   - `size` (≤ 18 KB gz)
   - `e2e` + `axe`
5. PR merge edildiğinde `release.yml` tetiklenir. **Bekleyen changeset varsa**
   Changesets bot otomatik olarak **"Version Packages"** PR'ı açar (veya günceller).
   Bu PR:
   - `package.json` `version` alanlarını bump eder
   - `CHANGELOG.md` dosyalarını günceller
   - `.changeset/*.md` dosyalarını siler
6. **Version Packages PR'ı** review edip merge et. Merge anında `release.yml` tekrar
   tetiklenir ve bu sefer:
   - `pnpm release` (= `pnpm build && changeset publish`) çalışır
   - npm registry'ye `--provenance` ile publish edilir
   - jsDelivr otomatik sync olur (npm webhook → genelde < 5 dk)
   - `purge-cdn` job'ı `@v1` ve `@latest` URL'lerini purge eder
7. Yayım sonrası kontrol:
   ```bash
   curl -I https://cdn.jsdelivr.net/npm/@blakfy/accessibility-widget@v1/dist/widget.js
   npm view @blakfy/accessibility-widget version
   ```

## Acil patch flow (hotfix)

Floating tag (`@v1`) cache TTL'i 7 gün. Acil bir patch tüm dünyaya hemen
yayılmalıysa manuel purge şart.

1. `hotfix/...` branch aç.
2. Düzeltmeyi yap.
3. `pnpm changeset add` → **patch** seç.
4. PR + merge → Version Packages PR otomatik → onayla → merge.
5. `release.yml` çalışır, `purge-cdn` job'ı zaten cache'i temizler.
6. Eğer `purge-cdn` herhangi bir nedenle başarısız olursa **manuel** çağır:
   ```bash
   curl -fsSL https://purge.jsdelivr.net/npm/@blakfy/accessibility-widget@v1/dist/widget.js
   curl -fsSL https://purge.jsdelivr.net/npm/@blakfy/accessibility-widget@v1/dist/widget.esm.js
   curl -fsSL https://purge.jsdelivr.net/npm/@blakfy/accessibility-widget@v1/dist/widget-element.js
   curl -fsSL https://purge.jsdelivr.net/npm/@blakfy/accessibility-widget@latest/dist/widget.js
   ```
7. < 1 saat içinde tüm `@v1` kullanıcıları yeni patch'i alır.

## Major bump flow (v1 → v2)

Major bump yıkıcıdır — ADR-006 disiplinine uy.

1. **30 gün önceden** GitHub Discussions'da duyuru aç.
   - Hangi STABLE-API yüzeyleri değişiyor
   - Hangi tarihte yayımlanacak
   - Migration linkleri
2. README'ye banner ekle (üst kısımda uyarı bloğu).
3. `docs/MIGRATION-vN-to-vN+1.md` yaz:
   - Eski API → yeni API eşlemesi
   - Codemod (varsa) komutu
   - Manuel migration adımları
4. `pnpm changeset add` → **major** seç. Açıklamada migration link'i ekle.
5. Normal flow'la merge → publish.
6. Eski sürüm bakımı:
   - `legacy/v{N}` branch oluştur (örn. `legacy/v1`).
   - `dist-tags`'i ayarla:
     ```bash
     npm dist-tag add @blakfy/accessibility-widget@1.x.x v1
     npm dist-tag add @blakfy/accessibility-widget@2.x.x v2
     npm dist-tag add @blakfy/accessibility-widget@2.x.x latest
     ```
   - Eski sürüm sadece **security patch** alır (12 ay), 18 ay sonra
     unmaintained ilan edilir.

## Rollback flow

Bozuk bir paket yayımlandığında:

1. **npm deprecate** ile uyarı ekle:
   ```bash
   npm deprecate @blakfy/accessibility-widget@x.y.z "Bozuk yayın — x.y.(z+1) kullanın"
   ```
2. jsDelivr cache'ini purge et (yukarıdaki acil patch komutları).
3. Hotfix patch yayınla (yukarıdaki acil patch flow).
4. **npm unpublish ÇAĞIRMA** — npm 72 saat kuralı + hash farklılıkları
   müşteri build'lerini kırar. Sadece `deprecate` + yeni patch.

## Gerekli GitHub secrets

| Secret | Amaç |
|---|---|
| `NPM_TOKEN` | npm automation token, `@blakfy` scope publish hakkı |
| `GITHUB_TOKEN` | otomatik (Actions tarafından sağlanır) |

Secret'ları GitHub repo > Settings > Secrets and variables > Actions üzerinden ekle.

## Çağrılan workflow'lar

| Dosya | Trigger | Görev |
|---|---|---|
| `.github/workflows/ci.yml` | push/PR `main` | lint + typecheck + test + size + e2e |
| `.github/workflows/release.yml` | push `main` | changesets PR + npm publish + CDN purge |
| `.github/workflows/lighthouse-ci.yml` | PR `main` | demo CWV ölçüm (Phase 10 sonrası enforce) |

## Referanslar

- [ADR-001 — CDN dağıtım](./ADR/001-cdn-distribution.md)
- [ADR-004 — Kilitli kontratlar](./ADR/004-locked-contracts.md)
- [ADR-006 — Sürümleme disiplini](./ADR/006-versioning-auto-update.md)
- [Changesets docs](https://github.com/changesets/changesets)
- [jsDelivr purge API](https://www.jsdelivr.com/documentation#id-purge-cache)
