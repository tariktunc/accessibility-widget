# @blakfy/demo-nextjs

Next.js 15 App Router demo — `@blakfy/accessibility-widget` entegrasyonu.

## Çalıştırma

```bash
pnpm install
pnpm --filter @blakfy/demo-nextjs dev
```

http://localhost:3000

## Nelere bakmalısınız

- `app/layout.tsx` — `<A11yServerHelper />`, `<A11yScript />`, `<A11yPreconnect />` kullanımı
- `app/api/__blakfy_a11y_log/route.ts` — dev pipe handler (terminal log entegrasyonu)
- Sayfada açılır panel, sağ-altta marka rozeti

## Üretim

`pnpm --filter @blakfy/demo-nextjs build` sonrası static export veya Vercel/Netlify deploy edilebilir.
