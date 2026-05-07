# API Reference

Otomatik üretilen API referansı. Diátaxis "reference" çeyreği — tam, sistematik, açıklamasız.

## Durum

> Henüz oluşturulmadı. Şu an için public API kontrat olarak [`docs/STABLE-API.md`](../STABLE-API.md) ve TypeScript tip tanımları (her paketin `dist/index.d.ts`'i) referans alınmalıdır.

## Planlanan altyapı

[Microsoft API Extractor](https://api-extractor.com/) ile her paket için `etc/<package>.api.md` üretilmesi planlanıyor — bu yöntemde public yüzeydeki her değişiklik PR'da diff olarak görünür ve semver disiplini fiziksel olarak zorlanır.

[TypeDoc](https://typedoc.org/) ile bu klasörün altına HTML/Markdown referans çıktısı üretilecek.

İlerleme: [issue tracker](https://github.com/tariktunc/accessibility-widget/issues).
