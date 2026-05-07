# ADR-005: Diagnostics ve Logging Sistemi

**Durum**: Kabul edildi
**Tarih**: 2026-04-30

## Bağlam

Auto-update modeli sürüm uyumsuzluğu, schema migration, CDN cache stale, host CSS çakışmaları gibi sorunlara açık. Müşteri "bir şey çalışmıyor" derken kök neden tespiti zor.

Kullanıcının ifadesiyle: "Güncelleme kaynaklı sorunları log kaydı olarak düşürmeli, npm run dev olarak başlatıldığında bu sorun görülmelidir, kullanıcı bunu takip edebilmelidir."

## Karar

4 katmanlı tanı sistemi.

### Katman 1: Console logger

Tüm log'lar `[blakfy-a11y vX.Y.Z]` prefix'i ile.

```
[blakfy-a11y v1.2.3] ✓ initialized in 12ms (locale: tr, theme: auto)
[blakfy-a11y v1.2.3] ⚠ Storage migrated: 1.0.0 → 1.2.0
[blakfy-a11y v1.2.3] ✗ OpenDyslexic CDN unreachable — fallback active
```

**Seviyeler**:
- `info` — sadece dev (`NODE_ENV !== 'production'`) VEYA `?a11y-debug=1` query param VEYA `data-debug="true"` script attr
- `warn` — daima konsola
- `error` — daima konsola, diagnostics snapshot'ına kalıcı olarak eklenir

### Katman 2: Diagnostics snapshot API

```ts
window.BlakfyA11y.diagnostics(): DiagnosticsSnapshot
```

Dönen yapı:

```ts
{
  version: '1.2.3',
  locale: 'tr',
  theme: 'auto',
  storage: {
    version: '1.0.0',
    migratedFrom: null,
    keysFound: ['localStorage', 'cookie']
  },
  osPreferences: {
    reducedMotion: true,
    contrast: 'normal',
    colorScheme: 'dark'
  },
  performance: {
    mountTimeMs: 12,
    bundleSizeGz: 17834,
    timeToFirstClick: null
  },
  issues: [
    { level: 'warn', code: 'OPENDYSLEXIC_CDN_MISSING', timestamp: '...', msg: '...' },
    { level: 'error', code: 'CSS_CONFLICT_IMPORTANT', timestamp: '...', msg: '...' }
  ],
  config: { /* effective WidgetOptions */ },
  timestamp: '2026-04-30T...'
}
```

### Katman 3: Otomatik tespit (boot-time + runtime)

| Kod | Tespit | Seviye |
|---|---|---|
| `INITIALIZED` | Mount tamamlandı | info |
| `OPENDYSLEXIC_CDN_MISSING` | Dyslexia font etkin ama CDN yüklenmemiş | warn |
| `STORAGE_MIGRATED` | Schema eski sürümden migrate edildi | info |
| `STORAGE_PARSE_ERROR` | Cookie/localStorage bozuk | error |
| `SSR_HYDRATION_MISMATCH` | Server data-attr ≠ client tercihler | error |
| `HOST_CSS_IMPORTANT_CONFLICT` | High-contrast bozucu host CSS tespit edildi | warn |
| `LOCALE_FETCH_FAILED` | Lazy locale yüklenemedi, fallback `en` | warn |
| `CDN_VERSION_MISMATCH` | Beklenen `data-version` ≠ runtime version | error |
| `OS_PREFERS_REDUCED_MOTION` | OS sinyali tespit edildi | info |
| `OS_PREFERS_CONTRAST_MORE` | OS sinyali tespit edildi | info |
| `OS_PREFERS_COLOR_SCHEME_DARK` | OS sinyali tespit edildi | info |

Çalışma zamanında host CSS çakışma tespiti şu yöntemle: `getComputedStyle` ile `<a>`, `<body>`, `<main>` üzerinde `!important`-flagged kuralları sample'lar.

### Katman 4: Next.js dev terminal pipe (opsiyonel)

```tsx
<Script
  src="..."
  data-locale="tr"
  data-dev-pipe="/api/__blakfy_a11y_log"
/>
```

Kullanıcı `app/api/__blakfy_a11y_log/route.ts` yazar (5 satır):

```ts
export async function POST(req: Request) {
  if (process.env.NODE_ENV !== 'development') return Response.json({});
  const body = await req.json();
  console.log('[blakfy-a11y]', body.level, body.code, body.msg);
  return Response.json({ ok: true });
}
```

**Sonuç**: client log'lar `npm run dev` terminalinde görünür.

**Disiplin**:
- Prod'da `data-dev-pipe` çalışmaz (NODE_ENV check, runtime + client-side double-guard)
- Pipe başarısızsa silent fail — site asla bozulmaz
- Throttling: max 10 mesaj/saniye (client-side rate limiter)

## Privacy

Diagnostics asla otomatik olarak gönderilmez. Sadece:
1. `window.BlakfyA11y.diagnostics()` çağrısında dönülür (kullanıcı eylemi)
2. `data-dev-pipe` ile yalnızca dev modda kullanıcının kendi backend'ine gider

Müşteri kendi Sentry/Datadog'una pipe etmek isterse `onError` callback'i ile kendi yapsın. Default: hiçbir telemetry yok. Bu, R1'deki "no telemetry, no AT-fingerprinting" diferansiyasyonumuzun parçası.

## Sonuçlar

**Kabul edilen**:
- (+) Sürüm sorunları görünür, sessizce kaybolmaz
- (+) Müşteri destek talebinde diagnostics snapshot kopyalanabilir
- (+) Dev'de detaylı, prod'da sessiz
- (+) Next.js dev pipe ile terminal entegrasyonu opsiyonel
- (+) Privacy-by-default

**Trade-off'lar**:
- (-) Verbose log'lar host site console'unu kirletir → seviye disiplini şart (default warn+ ve üstü)
- (-) Dev pipe Next.js dışı için yok → vanilla için DevTools yeterli
- (-) Diagnostics snapshot kullanıcı verisi içerebilir → kopyalanırken müşteri sorumlu

## Referanslar

- Console API: https://developer.mozilla.org/en-US/docs/Web/API/console
- DOMException codes: https://developer.mozilla.org/en-US/docs/Web/API/DOMException
- ADR-001 (auto-update model — bu sistem onu izler)
