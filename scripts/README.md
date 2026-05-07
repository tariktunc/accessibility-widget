# scripts/

Geliştirme ve release helper script'leri. CI tarafı `.github/workflows/` altında — bu klasör tools içindir.

## Mevcut

| Dosya | Komut | Amaç |
|---|---|---|
| `publish-manual.mjs` | `pnpm release:manual` | CI dışından (lokal makineden) `@blakfy/*` paketlerini publishler. Provenance flag'ini geçici kaldırır, publish, geri alır. Acil hotfix veya CI öncesi alpha publish için. |

## Manuel publish — kullanım

```bash
# Tüm paketler dry-run
node scripts/publish-manual.mjs --dry-run

# Tek paket
node scripts/publish-manual.mjs --filter @blakfy/accessibility-widget-next

# Tümü gerçek publish
pnpm release:manual
```

> **Not:** Üretim release'leri için bu yerine `changesets` + GitHub Actions OIDC kullanın (`release.yml`). OIDC publish provenance imzasını otomatik ekler, bu da supply-chain saldırılarına karşı paketi imzalar.
