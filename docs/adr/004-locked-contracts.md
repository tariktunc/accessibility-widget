# ADR-004: Kilitlenmiş Public Kontratlar (v1)

**Durum**: Kabul edildi — ASLA DEĞİŞMEZ
**Tarih**: 2026-04-30

> Bu ADR aşağıdaki yüzeyleri **v1 boyunca dondurur**. Tam envanter `docs/STABLE-API.md`'dedir. Bu dosya **politikayı** tanımlar; STABLE-API.md envanteri tutar.

## Bağlam

İş modeli: tek repo'dan yapılan güncellemeler tüm tema müşterilerinin sitelerine yansır. Bu güç beraberinde sorumluluk getirir:

- Müşteri kodu (footer'da `window.BlakfyA11y.open()`, custom CSS theme override) bizim API yüzeyimize bağlanır
- Bizim API'mizi değiştirmek = tüm müşterilerin kodunu kırmak
- Auto-update modelinde breaking change felaket → API DONDURULMALI

Kullanıcının ifadesiyle: "kalıtlaşmış mimari".

## Karar

Aşağıdaki 8 yüzey **v1.x.x boyunca asla değişmez**. Değişiklik (kaldırma, isim değişikliği, davranış değişikliği) **major bump (v2)** gerektirir.

### Kilitli yüzeyler

1. **Public JavaScript API**: `window.BlakfyA11y.{open, close, getPreferences, setPreferences, reset, onChange, configure, diagnostics, version}`
2. **Custom Events**: `blakfy:a11y:ready`, `:change`, `:open`, `:close`
3. **HTML data-attributes** (host `<html>` üzerinde): `data-a11y-fontscale`, `data-a11y-contrast`, `data-a11y-focus`, `data-a11y-links`, `data-a11y-motion`, `data-a11y-dyslexia`, `data-a11y-reading`
4. **CSS custom properties** (15 adet): `--blakfy-a11y-*` listesi STABLE-API.md'de
5. **Storage schema**: `blakfy_a11y_prefs` key, `{prefs, version, timestamp, locale}` şekli
6. **Script `data-*` config**: `data-locale`, `data-theme`, `data-position`, `data-font`, `data-debug`, `data-dev-pipe`
7. **Web Component attributes**: `<blakfy-a11y locale="..." theme="..." position="...">`
8. **Marka rozeti davranışı**: konum (sağ-alt LTR, sol-alt RTL), URL (`https://blakfy.com`), metin ("Powered by Blakfy Studio") — gizlenemez, değiştirilemez

### İzin verilen değişiklikler (v1 boyunca)

- **Yeni CSS variable EKLEME** (kaldırma değil) — minor bump
- **Yeni preference EKLEME** (kaldırma değil) — minor bump
- **Yeni event EKLEME** — minor bump
- **Yeni dil EKLEME** — minor bump
- **Internal implementation değişikliği** (API değişmeden) — patch bump
- **Bug fix, performans iyileştirme, görsel rötuş** — patch bump

### Yasak değişiklikler (major bump şart)

- API method/property kaldırma veya yeniden adlandırma
- Method imza değişikliği (parametre tip/sayı)
- Event ismi değişikliği veya kaldırma
- HTML data-attribute ismi değişikliği
- CSS custom property ismi değişikliği veya kaldırma
- Storage key/schema değişikliği (migration olmaksızın)
- Default davranış değişikliği (örn. FAB konumu, marka rozeti varlığı)

## Garanti mekanizmaları

### 1. Contract testleri

`tests/contract/*.spec.ts` her release'de çalışır:
- Public API yüzey snapshot — herhangi bir method/property eksilirse fail
- CSS variable list snapshot
- Storage schema validation (Zod runtime)
- Event listener round-trip test
- HTML data-attribute snapshot

### 2. CI gate

`pnpm test:contract` PR'da çalışır. Snapshot değiştiyse manuel onay gereklidir (semver hangisi sorulur).

### 3. SemVer enforcement

`changesets/` ile her PR'da değişiklik tipi (patch/minor/major) belirtilir. Major değişiklik için ek code review gerekir.

### 4. Belgeleme zorunluluğu

Her API değişikliği `STABLE-API.md`'de güncellenir. STABLE-API.md değiştiyse CHANGELOG.md de güncellenmiş olmalı (lint check).

## Sonuçlar

**Kabul edilen**:
- (+) Müşteri kodu güvenli, breaking change garantisi yok
- (+) Auto-update riski minimize
- (+) API tasarım disiplini yüksek olur

**Trade-off'lar**:
- (-) Hatalı API tasarımı v1 boyunca yaşar — ilk tasarım çok dikkatli olmalı
- (-) Yeni özellik backward-compat şart → bazen ekstra kod
- (-) v2'ye geçiş zor olabilir → migration guide şart

## Referanslar

- `docs/STABLE-API.md` — kilitli yüzey envanteri
- SemVer 2.0: https://semver.org/
- Changesets: https://github.com/changesets/changesets
