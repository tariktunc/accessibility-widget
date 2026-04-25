# Contributing

Katki kabul edilir — issue, PR, ceviri, dokuman.

## Pull request kurallari

- Ana branch: `main`
- Yeni ozellik → `feat/<isim>` branch
- Bug fix → `fix/<isim>` branch
- Conventional Commits formati
- TypeScript strict, eslint warning yok
- Yeni dil eklerken `translations.json` + `Locale` tipi

## Versiyon (SemVer)

- MAJOR — breaking change
- MINOR — yeni ozellik (geriye uyumlu)
- PATCH — bug fix

## Felsefe — KEEP IT NATIVE

Bu widget ASLA overlay olamaz. PR kabulu icin:
- ❌ DOM manipulation YASAK
- ❌ Otomatik ARIA enjeksiyonu YASAK
- ❌ "WCAG compliance" iddiasi YASAK
- ✅ CSS variable / data-attribute toggle
- ✅ OS prefers-* media query saygisi
- ✅ Yapisal a11y site sahibinin sorumlulugu

Detay: [Overlay Fact Sheet](https://overlayfactsheet.com/).

## Yeni dil ekleme

1. `translations.json` icine yeni locale objesi ekle
2. `types.ts` `Locale` tipine kodunu ekle
3. RTL ise `AccessibilityWidget.tsx` ve `AccessibilityPanel.tsx`'te `isRtl` kontrolune ekle
4. PR commit: `feat(i18n): add <language>`

## Yeni tercih ekleme

Her yeni tercih icin:
1. `types.ts` `Preferences` tipine alan ekle
2. `preferences-store.ts` `DEFAULT_PREFS`'e default ekle
3. `applyPrefs` icine `<html>` data-attribute yaz
4. `styles.css` icine `:root[data-a11y-...]` CSS rule ekle
5. `AccessibilityPanel.tsx` icinde toggle UI ekle
6. `translations.json` 9 dile etiket ekle
7. **Kanit-temelli olmali** — anti-pattern'lardan kacin (research/decisions belge ekle)
