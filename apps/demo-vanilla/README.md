# @blakfy/demo-vanilla

Vanilla HTML demo — `@blakfy/accessibility-widget` jsDelivr CDN ile entegrasyon.

## Çalıştırma

```bash
pnpm install
pnpm --filter @blakfy/demo-vanilla dev
```

http://localhost:3001 (otomatik açılır)

## Nelere bakmalısınız

- `public/index.html` `<head>` içindeki **inline pre-paint script** — SSR olmayan sitelerde FOUC önleme yöntemi
- `<body>` sonundaki `<script src="...jsdelivr.net/...widget.js" data-locale="tr" defer>` — tek-tag kurulum
- WordPress / static site / herhangi bir HTML site için aynı pattern geçerli
