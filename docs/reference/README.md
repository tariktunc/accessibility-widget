# API Reference

Otomatik üretilen API referansı. Diátaxis "reference" çeyreği — tam, sistematik, açıklamasız.

## Üretmek için

```bash
pnpm docs:reference
```

Bu komut [TypeDoc](https://typedoc.org/) + `typedoc-plugin-markdown` ile bu klasörün altına Markdown formatında modül bazlı API referansı üretir. Çıktı .gitignore'lı — her release için yeniden üretilir.

## Kapsam

| Paket | Entry point |
|---|---|
| `@blakfy/a11y-core` | `packages/core/src/index.ts` |
| `@blakfy/accessibility-widget` | `packages/widget/src/public-api.ts` |
| `@blakfy/accessibility-widget-next` | `packages/next/src/index.ts` |

## Tamamlayıcı dokümanlar

- [`STABLE-API.md`](../STABLE-API.md) — kilitli public yüzey kontratı (insan dostu)
- `packages/*/etc/*.api.md` — [API Extractor](https://api-extractor.com/) çıktısı; PR'larda kontrat değişimini diff olarak gösterir (`pnpm api:check` CI gate)
- TypeScript tip tanımları — yayınlanan paketlerde `dist/index.d.ts`
