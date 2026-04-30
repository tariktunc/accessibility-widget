# ADR-001: CDN-First Dağıtım Modeli

**Durum**: Kabul edildi
**Tarih**: 2026-04-30
**Karar verici**: Tarık Tunç (Blakfy Studio)

## Bağlam

Projenin ana iş gereksinimi: tek bir kaynaktan yapılan güncellemeler tüm tema müşterilerinin sitelerine **sıfır kullanıcı eylemiyle** yansımalıdır.

Mevcut v1.1.0 mimarisi `npx degit` ile dosyaları kullanıcının repo'suna kopyalıyor. Bu model:
- Kopyalandığı an dondurur — güncelleme imkânsız
- Bug fix yayınlamak için her müşteriye tek tek bildirim gerekir
- "Auto-update" iş gereksinimiyle tamamen çelişir

## Karar

**Birincil dağıtım: jsDelivr CDN üzerinden npm-scoped paket**.

```
https://cdn.jsdelivr.net/npm/@blakfy/accessibility-widget@v1/dist/widget.js
```

3 kanal, hepsi aynı kaynaktan üretilir:

| Kanal | Hedef kitle | Çıktı | Yükleme |
|---|---|---|---|
| **CDN IIFE** | Çoğunluk (auto-mount) | `dist/widget.js` | `<script src="...jsdelivr.net/npm/@v1/dist/widget.js">` |
| **NPM ESM** | React tree entegre kullanım | `dist/widget.esm.js` | `npm i @blakfy/accessibility-widget` |
| **Web Component** | Wix/Webflow/Shopify | `dist/widget-element.js` | `<blakfy-a11y>` |

### Sürüm URL stratejisi

| URL kalıbı | Davranış | CDN cache TTL | Önerilen kullanım |
|---|---|---|---|
| `@v1` | En son 1.x.x | 7 gün | **Auto-update** (default) |
| `@1.0.0` | Tam pin | 1 yıl immutable | Kaya gibi sabit prod |
| `@latest` | En son tüm sürümler | 7 gün | Bleeding edge (önerilmez) |

### Auto-update akışı

```
git tag v1.x.y → push
  → GitHub Actions: test, build, bundle-size gate
  → npm publish (jsDelivr otomatik sync)
  → opsiyonel: jsDelivr purge API (acil patch için)
  → 7 gün içinde tüm @v1 kullananlar yeni sürümü alır
```

## Sonuçlar

**Kabul edilen**:
- (+) Tek tag = tüm müşterilerde otomatik güncelleme
- (+) jsDelivr ücretsiz, küresel edge, %99.97 uptime, milyonlarca site kullanıyor
- (+) Pin isteyenler için reproducible build
- (+) Major bump (`@v2`) bilinçli opt-in, breaking change güvenli

**Trade-off'lar**:
- (-) npm publish disiplini şart — bozuk paket tüm müşterileri etkiler (CI gate'ler bunu önler)
- (-) Floating tag kullananlar 7 güne kadar eski sürüm görebilir (acil için manuel purge)
- (-) jsDelivr down olursa direkt fallback yok — workaround: aynı npm paketi unpkg.com'da otomatik mevcut

## Değerlendirilen alternatifler

| Alternatif | Reddetme nedeni |
|---|---|
| **npm-only** | Auto-update için kullanıcı `npm update` çağırmalı — gereksinimle çelişir |
| **Self-hosted CDN (Cloudflare Pages)** | Maliyet + altyapı yükü; jsDelivr zaten ücretsiz çözüyor |
| **Git submodule** | DX kötü, müşteri repo'larında karmaşıklık |
| **degit (mevcut)** | Kopyalama → güncelleme imkânsız |
| **Vanity domain (`cdn.blakfy.studio`)** | v1'de gereksiz overhead; v1.5+'da CNAME jsDelivr'a alias yapılabilir |

## Referanslar

- jsDelivr docs: https://www.jsdelivr.com/documentation
- web.dev third-party JS: https://web.dev/articles/optimizing-content-efficiency-loading-third-party-javascript
- R3 araştırma raporu (sentez kararlarının kaynağı)
