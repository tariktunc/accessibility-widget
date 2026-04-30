# @blakfy/accessibility-widget

> Next.js + vanilla siteler için doğal erişilebilirlik tercih paneli — jsDelivr CDN üzerinden otomatik güncellenir.

[![npm version](https://img.shields.io/badge/npm-v1.0.0-blue.svg)](https://www.npmjs.com/package/@blakfy/accessibility-widget)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![Bundle ≤18 KB gz](https://img.shields.io/badge/bundle-%E2%89%A418KB%20gz-brightgreen.svg)](./docs/ADR/002-preact-web-component.md)
[![WCAG 2.2 AA](https://img.shields.io/badge/WCAG-2.2%20AA-blueviolet.svg)](https://www.w3.org/TR/WCAG22/)

**Overlay değil, kullanıcı tercih paneli. DOM patch yok, sahte WCAG iddiası yok, telemetri yok.**

---

## İçindekiler

- [Hızlı kurulum](#hizli-kurulum)
- [Neden bu widget?](#neden-bu-widget)
- [Özellikler](#ozellikler)
- [Kurulum](#kurulum)
- [Konfigürasyon](#konfigurasyon)
- [Tema özelleştirme](#tema-ozellestirme)
- [Programatik API](#programatik-api)
- [Tarayıcı desteği](#tarayici-destegi)
- [Sürümleme ve otomatik güncelleme](#surumleme-ve-otomatik-guncelleme)
- [Tanı (Diagnostics)](#tani-diagnostics)
- [Erişilebilirlik beyanı](#erisilebilirlik-beyani)
- [Anti-pattern'ların eklenmediği](#anti-patternlarin-eklenmedigi)
- [Lisans](#lisans)
- [Referanslar](#referanslar)

---

<a id="hizli-kurulum"></a>

## Hızlı kurulum

30 saniyede çalışır hâle gelir — tek `<script>` tag'i, npm install yok.

### Next.js (App Router) — en basit form

```tsx
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        {children}
        <Script
          src="https://cdn.jsdelivr.net/npm/@blakfy/accessibility-widget@v1/dist/widget.js"
          strategy="lazyOnload"
          data-locale="tr"
          data-theme="auto"
          data-position="bottom-left"
        />
      </body>
    </html>
  );
}
```

### Vanilla HTML

```html
<!DOCTYPE html>
<html lang="tr">
  <head>
    <link rel="preconnect" href="https://cdn.jsdelivr.net" />
  </head>
  <body>
    <!-- içerik -->

    <script
      src="https://cdn.jsdelivr.net/npm/@blakfy/accessibility-widget@v1/dist/widget.js"
      data-locale="tr"
      data-theme="auto"
      defer
    ></script>
  </body>
</html>
```

Bu kadar. FAB sol-altta görünür, panel açılır, tercihler `localStorage` + cookie ile saklanır.

---

<a id="neden-bu-widget"></a>

## Neden bu widget?

### Overlay'lerden farkı

| Konu | Overlay'ler (UserWay/accessiBe/AudioEye) | @blakfy/accessibility-widget |
|---|---|---|
| Yaklaşım | DOM'u runtime'da yamalar (alt text, ARIA, heading enjekte eder) | Yalnızca CSS değişkenleri ve `data-*` toggle eder |
| WCAG iddiası | "WCAG/ADA compliant" pazarlar | İddia etmez — yalnızca UI'sının kendisi WCAG 2.2 AA |
| Site tasarımına etkisi | Genelde bozar — gerçek SR'lerle çakışır | Sıfır — Shadow DOM içinde izole |
| Profil preset'leri | "Epilepsy", "ADHD", "Blind" gibi sahte kategoriler | Yok (anti-pattern) |
| Telemetri | Genelde var, AT-fingerprinting riski | Hiçbir telemetri yok |
| Yasal bağlam | FTC vs accessiBe (2025) — $1M ceza | Pazarlama iddiası yok, hukuki risk minimum |

WebAIM verisine göre **kullanıcıların %67'si overlay'leri etkisiz buluyor**. Bu widget farklı bir varsayım üzerine kurulu: **site sahibi structural a11y'i kendisi yapmalı; bu widget kullanıcı tercih panelidir.**

### Kullanıcı tercih panelinin işlevi

Kullanıcı kendi cihazında geçici tercihler ayarlar (font ölçeği, kontrast, fokus halkası, hareket azaltma vb.). Tercihler `localStorage` + cookie ile kalıcılaşır. Site sahibi bu tercihleri `:root[data-a11y-*]` selector'leri ile CSS seviyesinde kullanır.

---

<a id="ozellikler"></a>

## Özellikler

| Özellik | Durum |
|---|---|
| 7 kullanıcı tercihi (font/kontrast/fokus/link/motion/disleksi/okuma) | ✅ |
| 9 dil (TR, EN, DE, FR, ES, IT, AR, HE, RU) | ✅ |
| WCAG 2.2 AA uyumlu UI (panel, FAB, switch'ler) | ✅ |
| EAA 2025 standardı (EN 301 549 v3.2.3) UI seviyesinde | ✅ |
| 280px ekranda yatay scroll yok (responsive) | ✅ |
| Light / Dark / Auto tema (`prefers-color-scheme` takibi) | ✅ |
| Bundle ≤18 KB gz | ✅ |
| Shadow DOM CSS izolasyon (host stillerinden bağımsız) | ✅ |
| jsDelivr CDN otomatik güncelleme | ✅ |
| Hiçbir telemetri, hiçbir AT-fingerprinting | ✅ |
| Marka rozeti "Powered by Blakfy Studio" (sağ-alt, kalıcı) | ✅ Non-removable |

Detaylı kontrat: [`docs/STABLE-API.md`](./docs/STABLE-API.md).

---

<a id="kurulum"></a>

## Kurulum

### Next.js (App Router) — detaylı

İki yol vardır.

#### Yol A — Tek `<Script>` tag (en basit, framework-agnostic)

`app/layout.tsx`:

```tsx
import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
      </head>
      <body>
        {children}
        <Script
          src="https://cdn.jsdelivr.net/npm/@blakfy/accessibility-widget@v1/dist/widget.js"
          strategy="lazyOnload"
          data-locale="tr"
          data-theme="auto"
          data-position="bottom-left"
        />
      </body>
    </html>
  );
}
```

`strategy="lazyOnload"` LCP'ye dokunmaz — widget pencereye yüklendikten sonra mount olur.

#### Yol B — NPM + Next.js helpers

```bash
npm i @blakfy/accessibility-widget-next
```

`app/layout.tsx`:

```tsx
import { A11yServerHelper, A11yScript } from '@blakfy/accessibility-widget-next';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <A11yServerHelper lang="tr">
      <body>
        {children}
        <A11yScript locale="tr" theme="auto" position="bottom-left" />
      </body>
    </A11yServerHelper>
  );
}
```

`<A11yServerHelper />` async server component'tir — cookie'yi okur, `<html>` etiketine `data-a11y-*` attribute'larını yazar (SSR FOUC engellenir). `<A11yScript />` jsDelivr URL'iyle `<Script>` tag'ini render eder.

#### SSR FOUC fix (manuel)

Helper kullanmıyorsanız, `<html>` etiketine cookie'den okunan tercihleri sunucu tarafında yazın:

```tsx
import { cookies } from 'next/headers';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const c = await cookies();
  const raw = c.get('blakfy_a11y_prefs')?.value;
  let prefs: any = null;
  try { prefs = raw ? JSON.parse(decodeURIComponent(raw)).prefs : null; } catch {}

  return (
    <html
      lang="tr"
      data-a11y-fontscale={prefs?.fontScale ?? '100'}
      data-a11y-contrast={prefs?.contrast ?? 'normal'}
      data-a11y-focus={prefs?.focusRing ? 'enhanced' : 'default'}
      data-a11y-links={prefs?.linkUnderline ? 'underline' : 'default'}
      data-a11y-motion={prefs?.motion ?? 'auto'}
      data-a11y-dyslexia={String(prefs?.dyslexiaFont ?? false)}
      data-a11y-reading={String(prefs?.readingMode ?? false)}
    >
      <body>{children}</body>
    </html>
  );
}
```

#### Vanilla — pre-paint snippet

Vanilla HTML için `<head>` içine 500-byte inline script:

```html
<head>
  <script>
    (function() {
      try {
        var raw = document.cookie.split('; ').find(function(r){return r.indexOf('blakfy_a11y_prefs=')===0;});
        if (!raw) return;
        var p = JSON.parse(decodeURIComponent(raw.split('=')[1])).prefs;
        var html = document.documentElement;
        html.setAttribute('data-a11y-fontscale', p.fontScale || '100');
        html.setAttribute('data-a11y-contrast', p.contrast || 'normal');
        html.setAttribute('data-a11y-focus', p.focusRing ? 'enhanced' : 'default');
        html.setAttribute('data-a11y-links', p.linkUnderline ? 'underline' : 'default');
        html.setAttribute('data-a11y-motion', p.motion || 'auto');
        html.setAttribute('data-a11y-dyslexia', String(!!p.dyslexiaFont));
        html.setAttribute('data-a11y-reading', String(!!p.readingMode));
      } catch (e) {}
    })();
  </script>
</head>
```

### Vanilla HTML — detaylı

Tam dosya örneği:

```html
<!DOCTYPE html>
<html lang="tr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Site</title>
    <link rel="preconnect" href="https://cdn.jsdelivr.net" />

    <!-- Pre-paint snippet (FOUC korumasi) -->
    <script>
      (function() {
        try {
          var c = document.cookie.split('; ').find(function(r){return r.indexOf('blakfy_a11y_prefs=')===0;});
          if (!c) return;
          var p = JSON.parse(decodeURIComponent(c.split('=')[1])).prefs;
          var h = document.documentElement;
          h.setAttribute('data-a11y-fontscale', p.fontScale || '100');
          h.setAttribute('data-a11y-contrast', p.contrast || 'normal');
          h.setAttribute('data-a11y-focus', p.focusRing ? 'enhanced' : 'default');
          h.setAttribute('data-a11y-links', p.linkUnderline ? 'underline' : 'default');
          h.setAttribute('data-a11y-motion', p.motion || 'auto');
          h.setAttribute('data-a11y-dyslexia', String(!!p.dyslexiaFont));
          h.setAttribute('data-a11y-reading', String(!!p.readingMode));
        } catch (e) {}
      })();
    </script>
  </head>
  <body>
    <main>
      <h1>Hoş geldiniz</h1>
      <p>Site içeriği...</p>
    </main>

    <!-- Widget mount -->
    <script
      src="https://cdn.jsdelivr.net/npm/@blakfy/accessibility-widget@v1/dist/widget.js"
      data-locale="tr"
      data-theme="auto"
      data-position="bottom-left"
      defer
    ></script>
  </body>
</html>
```

### Wix / Webflow / Shopify

Custom Element variant'ı kullanın:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@blakfy/accessibility-widget@v1/dist/widget-element.js"></script>

<blakfy-a11y locale="tr" theme="auto" position="bottom-left"></blakfy-a11y>
```

Custom Element framework-agnostiktir; HTML embed alanı olan tüm platformlar destekler. Detay: [ADR-002](./docs/ADR/002-preact-web-component.md).

---

<a id="konfigurasyon"></a>

## Konfigürasyon

### Üç yol — öncelik (yüksekten düşüğe)

1. `window.BlakfyA11y.configure({...})` — runtime, mount sonrası
2. `window.__BLAKFY_A11Y__ = {...}` — global, mount öncesi
3. Script `data-*` attribute'ları

### Script `data-*` attribute tablosu

| Attribute | Tip | Default | Açıklama |
|---|---|---|---|
| `data-locale` | `"tr" \| "en" \| "de" \| "fr" \| "es" \| "it" \| "ar" \| "he" \| "ru"` | `"en"` | Aktif dil |
| `data-theme` | `"light" \| "dark" \| "auto"` | `"auto"` | Panel teması |
| `data-position` | `"bottom-left" \| "bottom-right" \| "top-left" \| "top-right"` | `"bottom-left"` | FAB konumu |
| `data-font` | string | sistem fontları | font-family değeri |
| `data-debug` | `"true" \| "false"` | `"false"` | Verbose console log |
| `data-dev-pipe` | string (path) | yok | Next.js dev terminal log endpoint |

Tam kontrat: [`docs/STABLE-API.md` §6](./docs/STABLE-API.md).

### Üç senaryo

**Sade — sadece dil**:
```html
<script src="https://cdn.jsdelivr.net/npm/@blakfy/accessibility-widget@v1/dist/widget.js"
        data-locale="tr" defer></script>
```

**Gelişmiş — callback ile analytics**:
```html
<script>
  window.__BLAKFY_A11Y__ = {
    locale: 'tr',
    theme: 'auto',
    onPreferencesChange: function (record) {
      // record: { prefs, version, timestamp, locale }
      window.gtag && gtag('event', 'a11y_preference_changed', record.prefs);
    }
  };
</script>
<script src="https://cdn.jsdelivr.net/npm/@blakfy/accessibility-widget@v1/dist/widget.js" defer></script>
```

**Runtime — footer butonu**:
```html
<button onclick="window.BlakfyA11y.open()">Erişilebilirlik Tercihleri</button>
```

---

<a id="tema-ozellestirme"></a>

## Tema özelleştirme

Widget Shadow DOM içindedir — host CSS sızamaz. Tema sadece **15 CSS custom property** üzerinden değiştirilir. Detay: [ADR-003](./docs/ADR/003-shadow-dom-isolation.md).

### Tüm değişkenler

| Variable | Default | Açıklama |
|---|---|---|
| `--blakfy-a11y-primary` | `#2563eb` | FAB rengi, accent |
| `--blakfy-a11y-primary-hover` | `#1d4ed8` | FAB hover rengi |
| `--blakfy-a11y-primary-text` | `#ffffff` | FAB icon rengi |
| `--blakfy-a11y-panel-bg` | `#ffffff` | Panel arkaplan (light) |
| `--blakfy-a11y-panel-text` | `#171717` | Panel metin (light) |
| `--blakfy-a11y-panel-muted` | `#525252` | Panel ikincil metin (light) |
| `--blakfy-a11y-panel-border` | `#e5e5e5` | Panel border (light) |
| `--blakfy-a11y-panel-bg-dark` | `#0a0a0a` | Panel arkaplan (dark) |
| `--blakfy-a11y-panel-text-dark` | `#fafafa` | Panel metin (dark) |
| `--blakfy-a11y-panel-muted-dark` | `#a3a3a3` | Panel ikincil metin (dark) |
| `--blakfy-a11y-panel-border-dark` | `#262626` | Panel border (dark) |
| `--blakfy-a11y-toggle-on` | `#171717` | Switch açık rengi |
| `--blakfy-a11y-toggle-off` | `#d4d4d4` | Switch kapalı rengi |
| `--blakfy-a11y-focus-ring` | `#2563eb` | Fokus halkası rengi |
| `--blakfy-a11y-fab-size` | `48px` | FAB buton boyutu |

### Hazır tema 1 — Default Blakfy (mavi)

```css
:root {
  --blakfy-a11y-primary: #2563eb;
  --blakfy-a11y-primary-hover: #1d4ed8;
  --blakfy-a11y-primary-text: #ffffff;
  --blakfy-a11y-toggle-on: #171717;
  --blakfy-a11y-focus-ring: #2563eb;
}
```

### Hazır tema 2 — Stripe-vari mor

```css
:root {
  --blakfy-a11y-primary: #635bff;
  --blakfy-a11y-primary-hover: #524bff;
  --blakfy-a11y-primary-text: #ffffff;
  --blakfy-a11y-toggle-on: #635bff;
  --blakfy-a11y-focus-ring: #635bff;
}
```

### Hazır tema 3 — Vercel-vari siyah-beyaz

```css
:root {
  --blakfy-a11y-primary: #000000;
  --blakfy-a11y-primary-hover: #333333;
  --blakfy-a11y-primary-text: #ffffff;
  --blakfy-a11y-toggle-on: #000000;
  --blakfy-a11y-focus-ring: #0070f3;
}
```

CSS custom property'ler v1 boyunca **kilitlidir** ([ADR-004](./docs/ADR/004-locked-contracts.md)). Kaldırılmaz, yeniden adlandırılmaz.

---

<a id="programatik-api"></a>

## Programatik API

Mount sonrası `window.BlakfyA11y` global'i hazırdır. Ayrıca `blakfy:a11y:ready` custom event'i `window`'da dispatch edilir.

### Methods

| Method | İmza | Açıklama |
|---|---|---|
| `open` | `() => void` | Paneli açar |
| `close` | `() => void` | Paneli kapatır |
| `getPreferences` | `() => Preferences` | Aktif tercihleri döner |
| `setPreferences` | `(p: Partial<Preferences>) => void` | Tercih(ler) günceller, persiste eder, uygular |
| `reset` | `() => void` | Tüm tercihleri default'a döner |
| `onChange` | `(cb) => () => void` | Değişiklik dinleyicisi, unsubscribe döner |
| `configure` | `(opts: Partial<WidgetOptions>) => void` | Runtime config (locale, theme vb.) |
| `diagnostics` | `() => DiagnosticsSnapshot` | Tanı verisi snapshot'ı |
| `version` | `string` (property) | Aktif widget sürümü |

Tam tip tanımları: [`docs/STABLE-API.md` §1](./docs/STABLE-API.md).

### Senaryolar

**Footer linki — re-open**:
```html
<button onclick="BlakfyA11y.open()">Erişilebilirlik</button>
```

**Analytics entegrasyonu**:
```js
const unsubscribe = BlakfyA11y.onChange(prefs => {
  analytics.track('a11y_pref_changed', prefs);
});
// ileride: unsubscribe();
```

**Programatik tercih**:
```js
BlakfyA11y.setPreferences({ fontScale: 125, contrast: 'high' });
```

**Diagnostics snapshot** (destek talebi için):
```js
console.log(JSON.stringify(BlakfyA11y.diagnostics(), null, 2));
```

**Custom event dinleme**:
```js
window.addEventListener('blakfy:a11y:change', (e) => {
  const record = e.detail; // { prefs, version, timestamp, locale }
  console.log('Yeni tercih:', record.prefs);
});
```

---

<a id="tarayici-destegi"></a>

## Tarayıcı desteği

- Chrome / Edge — son 2 sürüm
- Firefox — son 2 sürüm
- Safari — son 2 sürüm (macOS + iOS)
- Samsung Internet — son sürüm

Custom Elements + Shadow DOM gereklidir. **IE11 desteklenmez.** Polyfill önerilmez — modern web platform özellikleri pazarın %97'sinde mevcuttur.

---

<a id="surumleme-ve-otomatik-guncelleme"></a>

## Sürümleme ve otomatik güncelleme

İki kurulum URL'i.

```html
<!-- ÖNERILEN — auto-update, 7-gün CDN cache TTL -->
<script src="https://cdn.jsdelivr.net/npm/@blakfy/accessibility-widget@v1/dist/widget.js" defer></script>

<!-- PIN — kaya gibi sabit, 1-yıl immutable cache -->
<script src="https://cdn.jsdelivr.net/npm/@blakfy/accessibility-widget@1.0.0/dist/widget.js" defer></script>
```

`@v1` URL'iyle yeni patch ve minor sürümler 7 gün içinde otomatik gelir. Breaking change asla — major bump (v2) ayrı opt-in URL gerektirir. Detay: [ADR-006](./docs/ADR/006-versioning-auto-update.md).

> **Tavsiye edilmeyen**: `@latest`. Major bump'ları otomatik alır → breaking change riski yüksektir.

---

<a id="tani-diagnostics"></a>

## Tanı (Diagnostics)

### Console log prefix

Tüm log'lar `[blakfy-a11y v1.x.y]` prefix'i ile basılır. Seviyeler:
- `info` — sadece dev mod (`?a11y-debug=1` query param VEYA `data-debug="true"`)
- `warn` / `error` — daima

### Verbose mod

```
https://site.example/?a11y-debug=1
```
veya
```html
<script src="..." data-debug="true" defer></script>
```

### Diagnostics API

```js
const snap = BlakfyA11y.diagnostics();
// { version, locale, theme, storage, osPreferences, performance, issues, config, timestamp }
```

Müşteri destek talebinde bu çıktıyı kopyala-yapıştır gönderebilir.

### Next.js dev terminal pipe

`<Script>` tag'ine `data-dev-pipe="/api/__blakfy_a11y_log"` ekleyin:

```ts
// app/api/__blakfy_a11y_log/route.ts
export async function POST(req: Request) {
  if (process.env.NODE_ENV !== 'development') return Response.json({});
  const body = await req.json();
  console.log('[blakfy-a11y]', body.level, body.code, body.msg);
  return Response.json({ ok: true });
}
```

Client log'lar `npm run dev` terminalinde görünür. Prod'da silent fail. Detay: [ADR-005](./docs/ADR/005-diagnostics-logging.md).

---

<a id="erisilebilirlik-beyani"></a>

## Erişilebilirlik beyanı

### Bu widget yapar

- ✅ WCAG 2.2 AA uyumlu UI sunar (panel, FAB, switch'ler test edilmiştir)
- ✅ EN 301 549 v3.2.3 (EAA 2025) standardına UI seviyesinde uyumludur
- ✅ NVDA + JAWS + VoiceOver + TalkBack ile manuel test edilmiştir
- ✅ Kullanıcı tercihlerini cihazda saklar (localStorage + cookie)
- ✅ OS sinyallerini saygı gösterir (`prefers-reduced-motion`, `prefers-contrast`, `prefers-color-scheme`)

### Bu widget YAPMAZ

- ❌ Sitenizin tamamını WCAG uyumlu yapmaz
- ❌ ARIA, alt text, heading hiyerarşisi enjekte etmez
- ❌ Screen reader simülasyonu sunmaz
- ❌ "ADA compliant" / "WCAG compliant" iddia etmez

**Net mesaj**: structural a11y site sahibinin sorumluluğudur; bu widget ek bir kullanıcı tercih katmanıdır.

---

<a id="anti-patternlarin-eklenmedigi"></a>

## Anti-pattern'ların eklenmediği

| Anti-pattern | Bu widget'ta var mı? | Sebep |
|---|---|---|
| DOM patching (runtime DOM rewrite) | ❌ Yok | Gerçek SR'leri bozar; sürdürülemez |
| AI alt text üretimi | ❌ Yok | Hatalı alt text > yok alt text |
| Otomatik ARIA enjeksiyonu | ❌ Yok | FTC vs accessiBe (2025) — yasal risk |
| "Profil" preset'leri (Epilepsy, Blind, ADHD) | ❌ Yok | Pazarlama uydurması, kullanıcıyı temsil etmez |
| Telemetri / analytics auto-pipe | ❌ Yok | Privacy-by-default |
| AT (assistive tech) fingerprinting | ❌ Yok | Etik dışı, kullanıcı izlemesi |
| "Screen reader" toggle | ❌ Yok | Gerçek SR kullananın araçları zaten var |

---

<a id="lisans"></a>

## Lisans

MIT — bkz. [LICENSE](./LICENSE).

**Marka rozeti** ("Powered by Blakfy Studio") iş kuralı gereği gizlenemez ve değiştirilemez (sağ-altta sürekli görünür). Detay: [`docs/STABLE-API.md` §9](./docs/STABLE-API.md).

---

**Powered by**: [Blakfy Studio](https://blakfy.com)

---

<a id="referanslar"></a>

## Referanslar

### Dış kaynaklar

- [Overlay Fact Sheet](https://overlayfactsheet.com/) — 900+ a11y uzmanı imzalı
- [FTC vs accessiBe (2025)](https://adrianroselli.com/2025/01/ftc-catches-up-to-accessibe.html) — $1M ceza
- [Should I Use An Accessibility Overlay?](https://shouldiuseanaccessibilityoverlay.com/)
- [WCAG 2.2 (W3C)](https://www.w3.org/TR/WCAG22/)
- [EAA Direktifi (Directive 2019/882)](https://eur-lex.europa.eu/eli/dir/2019/882/oj) — 28 Haz 2025 yürürlükte
- [EN 301 549 v3.2.3](https://www.etsi.org/deliver/etsi_en/301500_301599/301549/)
- [ARIA APG patterns](https://www.w3.org/WAI/ARIA/apg/)

### İç dokümantasyon

- [STABLE-API.md](./docs/STABLE-API.md) — kilitli public yüzey envanteri
- [ADR-001 — CDN dağıtım](./docs/ADR/001-cdn-distribution.md)
- [ADR-002 — Preact + Web Component](./docs/ADR/002-preact-web-component.md)
- [ADR-003 — Shadow DOM izolasyonu](./docs/ADR/003-shadow-dom-isolation.md)
- [ADR-004 — Kilitli kontratlar](./docs/ADR/004-locked-contracts.md)
- [ADR-005 — Diagnostics ve logging](./docs/ADR/005-diagnostics-logging.md)
- [ADR-006 — Sürümleme ve auto-update](./docs/ADR/006-versioning-auto-update.md)
- [AI_INSTALL.md](./AI_INSTALL.md) — AI agent'lar için deterministik kurulum
- [MIGRATION-v1-to-v2.md](./MIGRATION-v1-to-v2.md) — v1 → v2 geçiş rehberi
- [CHANGELOG.md](./CHANGELOG.md)
- [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md)
- [docs/SECURITY.md](./docs/SECURITY.md)
- [docs/CODE_OF_CONDUCT.md](./docs/CODE_OF_CONDUCT.md)
