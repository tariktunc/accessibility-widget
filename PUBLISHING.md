# Publishing Guide — accessibility-widget

GitHub repo yayinlama ve npm release adimlari.

## 1. GitHub repo
```bash
cd webforge/assets/accessibility-widget
git init
git add .
git commit -m "Initial commit — v1.0.0"
git branch -M main
gh repo create tariktunc/accessibility-widget --public --source=. --push
git tag v1.0.0 && git push origin v1.0.0
gh release create v1.0.0 --title "v1.0.0 — Native Preferences Panel" --generate-notes
```

## 2. (Opsiyonel) npm yayinla
```bash
npm login
npm publish --access public
```
Paket adi: `accessibility-widget` (npm'de mevcutsa: `@blakfy/accessibility-widget`)

## 3. Versiyon stratejisi
- MAJOR — yeni tercih ekleme/cikarma, prop API kirici degisiklik
- MINOR — yeni dil, yeni FAB konumu, geriye uyumlu
- PATCH — bug fix, stil iyilestirme
