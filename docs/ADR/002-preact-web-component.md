# ADR-002: Preact + Custom Element Mimarisi

**Durum**: Kabul edildi
**Tarih**: 2026-04-30

## Bağlam

Mevcut v1.1.0 React 18 + Radix UI peer dependency'leri kullanıyor. Sorunlar:

- React peer dep, kullanıcının React sürümüyle çakışma riski
- Radix Dialog + Switch kombinasyonu büyük (~12-15 KB)
- Bundle bütçesi 18 KB gz (R3 araştırması) — React + Radix bunu aşar
- Vanilla HTML / Wix / Webflow / Shopify gibi React-olmayan ortamlar desteklenmeli

## Karar

**Preact 10.x** UI framework olarak. **Custom Element + Shadow DOM** ile sarılır.

### Stack ve bundle dağılımı (tahmini, hedef)

```
Preact (10.x)              ~3 KB gz   JSX, hooks, React API uyumlu
+ Custom Dialog component  ~1 KB gz   ARIA APG Dialog pattern
+ Custom Switch component  ~0.5 KB gz ARIA APG Switch pattern
+ Custom Element wrapper   ~0.3 KB gz <blakfy-a11y> registration
─────────────────────────────────
Total UI                   ~5 KB gz
+ Preferences/i18n/store   ~3 KB gz
+ Styles (Shadow inline)   ~3 KB gz
+ Aktif locale JSON        ~1.5 KB gz (lazy)
─────────────────────────────────
Core bundle                ~12.5 KB gz   (≤18 KB bütçenin altında)
```

### Mount stratejileri (3 yol, aynı core)

```html
<!-- 1) CDN auto-mount (default — script kendini mount eder) -->
<script src="...widget.js" data-locale="tr" defer></script>

<!-- 2) Custom Element (eksplisit DOM'da yer ver) -->
<blakfy-a11y locale="tr" theme="auto"></blakfy-a11y>
```

```ts
// 3) Programmatic (NPM)
import { mount } from '@blakfy/accessibility-widget';
mount({ locale: 'tr', theme: 'auto' });
```

## Sonuçlar

**Kabul edilen**:
- (+) Bundle 18 KB hedefin altında
- (+) Kullanıcı React sürümünden tamamen bağımsız
- (+) Custom Element framework-agnostic — Wix/Webflow/Shopify direkt çalışır
- (+) JSX DX korunur (vanilla JS karmaşıklığı yok)
- (+) Preact'in `compat` paketi varsa NPM tarafında React component olarak da export edilebilir

**Trade-off'lar**:
- (-) Custom Dialog/Switch yazılması gerekiyor — ARIA APG'ye tam uyum şart (R2 SC 4.1.2, 4.1.3)
- (-) Radix'in battle-tested implementasyonu kaybedilir → sıkı unit + e2e test ile kapatılır
- (-) Preact ekosistemi React kadar geniş değil — şu an bağımlılığımız yok, önemsiz

## Değerlendirilen alternatifler

| Alternatif | Tahmini bundle | Reddetme nedeni |
|---|---|---|
| **React 18 + Radix** | ~25 KB+ | Bütçe aşımı, peer dep yükü |
| **Vanilla JS** | ~5 KB | State + i18n + JSX karmaşıklığı kod büyümesine yol açar |
| **Svelte** | ~6 KB | JSX değil, ekibin React deneyimine uzak |
| **Lit** | ~5 KB | JSX değil, dialog state machine yazımı karmaşık |
| **Preact + Headless UI** | ~10 KB | Headless UI Preact desteği zayıf, hack'ler gerekir |

## ARIA pattern referansları (custom componentlerde kelime kelime takip edilir)

- Dialog (modal): https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- Switch: https://www.w3.org/WAI/ARIA/apg/patterns/switch/
- Custom Element best practices: https://web.dev/articles/custom-elements-best-practices

## Referanslar

- Preact: https://preactjs.com
- Web Components MDN: https://developer.mozilla.org/en-US/docs/Web/API/Web_components
- R2 araştırma raporu (WCAG/ARIA gereksinimleri)
