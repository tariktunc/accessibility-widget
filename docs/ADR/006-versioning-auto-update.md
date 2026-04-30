# ADR-006: Sürümleme ve Auto-Update Disiplini

**Durum**: Kabul edildi
**Tarih**: 2026-04-30

## Bağlam

ADR-001 CDN dağıtım kararını verdi. Bu karar, sürüm yönetiminin hassasiyetini artırıyor:

- jsDelivr `@v1` floating tag → 7 gün TTL → tag attığımızda 7 gün içinde tüm müşteriler alır
- jsDelivr `@1.0.0` pinned tag → 1 yıl immutable cache
- Bozuk yayın tüm müşterileri etkiler — geri alma zor

ADR-004 ise API yüzeyini dondurdu. Bu ADR, **hangi değişikliğin hangi bump'ı gerektirdiğini** ve **release sürecinin bu disiplini nasıl uyguladığını** tanımlar.

## Karar

### SemVer 2.0 sıkı disiplini

| Bump tipi | Değişiklik | Örnek |
|---|---|---|
| **Patch** (1.0.0 → 1.0.1) | Bug fix, perf, görsel rötuş, internal refactor | Toggle hover stili düzeltildi |
| **Minor** (1.0.x → 1.1.0) | Yeni preference EKLEME, yeni dil, yeni CSS variable EKLEME, yeni event EKLEME | `saturation` toggle eklendi |
| **Major** (1.x → 2.0.0) | API kaldırma/değişiklik, default davranış değişikliği, breaking schema | Storage key yeniden adlandırıldı |

### CDN URL stratejisi (kullanıcıya sunulan)

README'de **iki kurulum yolu** dokümante edilir:

```html
<!-- ÖNERILEN: Auto-update — yeni patch ve minor sürümleri otomatik alır -->
<script src="https://cdn.jsdelivr.net/npm/@blakfy/accessibility-widget@v1/dist/widget.js" defer></script>

<!-- PIN: Belirli sürüme kilitlenir, manuel bump gerekir -->
<script src="https://cdn.jsdelivr.net/npm/@blakfy/accessibility-widget@1.0.0/dist/widget.js" defer></script>
```

### Release flow

```
1. Geliştirici PR açar
   └─ pnpm changeset add ile değişiklik kaydı (patch/minor/major)
   
2. CI gate'leri (pre-merge)
   ├─ pnpm test (unit + e2e + axe)
   ├─ pnpm typecheck
   ├─ pnpm test:contract (kilitli yüzey doğrulaması)
   ├─ pnpm bundle-size (≤18 KB gz)
   └─ Lighthouse CI (LCP/CLS/INP regression yok)

3. Merge to main
   └─ pnpm changeset version → CHANGELOG.md auto-update + version bump

4. Tag ve release
   ├─ git tag v1.x.y
   ├─ git push --tags
   └─ GitHub Action:
      ├─ pnpm build
      ├─ npm publish (--provenance)
      ├─ jsDelivr otomatik sync (npm webhook)
      └─ GitHub Release notes auto-generated

5. Acil patch (manuel, opsiyonel)
   └─ curl https://purge.jsdelivr.net/npm/@blakfy/accessibility-widget@v1/dist/widget.js
      → CDN cache anında yenilenir, < 1 saatte tüm dünyaya yayılır
```

### Major bump iletişimi (v1 → v2)

Major bump yıkıcı potansiyele sahip. Disiplin:

1. **Önceden duyuru**: 30 gün önce GitHub Discussions + README banner + CHANGELOG warning
2. **Migration guide**: `docs/MIGRATION-v1-to-v2.md` zorunlu
3. **Codemod (mümkünse)**: Otomatik migration script
4. **Eski sürüm dondurma**: `@v1` URL'i çalışmaya devam eder, sadece security patch alır
5. **Sunset takvimi**: v1 yaklaşık 12 ay sonra deprecated, 18 ay sonra unmaintained

### CI'ın engellediği şeyler

Aşağıdaki PR'lar otomatik bloke edilir:

- `dist/` manuel commit edilmiş (sadece release workflow yazabilir)
- `package.json` `version` PR içinde değişmiş (changeset version yapar)
- `STABLE-API.md` değişmiş ama CHANGELOG güncellemesi yok
- Bundle 18 KB'ı geçmiş
- Lighthouse CWV regression > %5
- `tests/contract/*.spec.ts` snapshot değişmiş ama PR description'da semver belirtilmemiş

## Sonuçlar

**Kabul edilen**:
- (+) Müşteri istediği stabilite/güncellik dengesini seçer
- (+) Acil bug fix < 1 saat'te yayılır (manuel purge)
- (+) Major bump'lar kontrollü, breaking change yıkıcı değil
- (+) CI disiplini hatalı yayınları engeller

**Trade-off'lar**:
- (-) Floating tag kullananlar 7 güne kadar eski sürüm görür (acil için manuel purge)
- (-) Changeset disiplini ekstra adım — DX overhead
- (-) Major bump iletişimi 30 gün hazırlık gerektirir

## Referanslar

- SemVer 2.0: https://semver.org/
- Changesets: https://github.com/changesets/changesets
- jsDelivr purge: https://www.jsdelivr.com/documentation#id-purge-cache
- npm provenance: https://docs.npmjs.com/generating-provenance-statements
- ADR-001 (CDN dağıtım modeli)
- ADR-004 (kilitli kontratlar)
