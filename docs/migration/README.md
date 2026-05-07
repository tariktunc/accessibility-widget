# Migration guides

Sürümler arası kırılma değişiklikleri ve geçiş adımları.

## Mevcut

- [`v1-to-v2.md`](./v1-to-v2.md) — Single-package + degit modelinden monorepo + CDN modeline geçiş

## Versiyon politikası

Major bump = breaking change. [Sunset takvimi ADR-006](../adr/006-versioning-auto-update.md): eski major sürüm 12 ay deprecated, 18 ay unmaintained.

Her major bump için:
1. Bu klasörde `vN-to-vN+1.md` oluşturulur
2. CHANGELOG'da `BREAKING CHANGE` notu
3. 30 gün önceden GitHub Discussions duyurusu
4. Mümkünse otomatik codemod (`@blakfy/codemod-vN-to-vN+1`)
