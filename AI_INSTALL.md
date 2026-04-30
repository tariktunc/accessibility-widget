# AI Installation Guide — @blakfy/accessibility-widget v2

> AI agent'lar (Claude, GPT, Cursor, Copilot) için deterministik kurulum rehberi.
> İnsan okuması: [README.md](./README.md).

---

## 0. Önkoşullar (YAML)

```yaml
required:
  framework: Next.js >= 14 OR vanilla HTML/JS
  language: TypeScript >= 5 (Next.js için)
distribution_options:
  - cdn (önerilen): jsDelivr — sıfır npm install gerekir
  - npm: "@blakfy/accessibility-widget-next" — Next.js helpers ile
optional:
  open_dyslexic_cdn: https://cdn.jsdelivr.net/npm/open-dyslexic@1.0.3/open-dyslexic-regular.css
forbidden:
  - "Script tag with @latest URL"
  - "FloatingBadge'i CSS ile gizleme"
  - "WCAG/ADA 'compliant' rozeti ekleme"
```

---

## 1. Pre-flight (kullanıcıya tek mesajda sor)

```
1. DİL (default: tr)
   Mevcut: tr, en, de, fr, es, it, ar, he, ru

2. TEMA: light / dark / auto (default: auto)

3. FAB KONUMU: bottom-left / bottom-right / top-left / top-right
   default: bottom-left
   Not: sağ-altta marka rozeti olduğu için sol-alt önerilir;
        ayrıca cookie banner / live chat genelde sağ-altta olur.

4. YAZI TİPİ (default: sistem fontları, "inherit" kabul edilir)

5. DİSLEKSİ FONT YÜKLE? (yes/no, default: no)
   Yes ise <head>'e OpenDyslexic CDN linki eklenir.

6. KURULUM YÖNTEMİ:
   a) CDN script tag (önerilen — npm install yok, framework-agnostic)
   b) NPM helpers (@blakfy/accessibility-widget-next, sadece Next.js için)
```

---

## 2. Kurulum adımları (deterministik)

### Senaryo A — CDN (default)

#### Adım 1 — `<head>`'e preconnect

`app/layout.tsx` (Next.js) veya `index.html` (vanilla):

```html
<link rel="preconnect" href="https://cdn.jsdelivr.net" />
```

#### Adım 2 — SSR FOUC inline snippet (`<head>` içinde)

```html
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
```

Next.js'te bu snippet'i `<head>` içinde inline `<script dangerouslySetInnerHTML={{__html: '...'}} />` ile koy.

#### Adım 3 — `<body>` sonuna widget tag

**Next.js**:
```tsx
import Script from 'next/script';

<Script
  src="https://cdn.jsdelivr.net/npm/@blakfy/accessibility-widget@v1/dist/widget.js"
  strategy="lazyOnload"
  data-locale="<LOCALE>"
  data-theme="<THEME>"
  data-position="<POSITION>"
/>
```

**Vanilla HTML**:
```html
<script
  src="https://cdn.jsdelivr.net/npm/@blakfy/accessibility-widget@v1/dist/widget.js"
  data-locale="<LOCALE>"
  data-theme="<THEME>"
  data-position="<POSITION>"
  defer
></script>
```

### Senaryo B — NPM + Next.js helpers

#### Adım 1 — Install

```bash
npm i @blakfy/accessibility-widget-next
```

#### Adım 2 — `<A11yServerHelper />` `<html>`'e

`app/layout.tsx`:

```tsx
import { A11yServerHelper, A11yScript } from '@blakfy/accessibility-widget-next';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <A11yServerHelper lang="<LOCALE>">
      <body>
        {children}
        <A11yScript locale="<LOCALE>" theme="<THEME>" position="<POSITION>" />
      </body>
    </A11yServerHelper>
  );
}
```

`A11yServerHelper` async server component'tir — cookie'yi okur, `<html>`'e `data-a11y-*` yazar (SSR FOUC engellenir).

#### Adım 3 — `<A11yScript />` `<body>` sonuna

Yukarıdaki örnekte ikisi de aynı `RootLayout` içinde. `A11yScript` jsDelivr CDN URL'iyle `<Script>` tag'i render eder.

---

## 3. Doğrulama

```yaml
checks:
  - file_or_marker: "Script tag at app/layout.tsx with src containing 'jsdelivr.net'"
  - typecheck: "pnpm typecheck → 0 error"
  - dev: "pnpm dev → 200 OK, FAB sol-altta görünür"
  - panel_opens: "FAB tıklandığında panel açılır (focus trap aktif)"
  - persists: "tercih kaydedip refresh'te korunur"
  - badge_visible: "sağ-altta 'Powered by Blakfy Studio' rozeti"
  - no_console_errors: "DevTools console temiz (sadece [blakfy-a11y] info log'u olabilir)"
  - axe_zero_violations: "axe-core paneli açıkken 0 violation"
  - keyboard_flow: "FAB → Tab × 9 → ESC çalışır, fokus FAB'a döner"
  - rtl_smoke: "locale=ar/he ise panel aynalanır (yön: rtl)"
```

---

## 4. Anti-pattern'lar (KESİNLİKLE YAPMA)

| Yanlış | Sebep |
|---|---|
| `strategy="beforeInteractive"` | LCP'yi geciktirir; widget non-critical |
| Cookie banner ile aynı pozisyon | UX çakışması — `bottom-left` önerilir |
| `<Script>` tag'ini `<head>` içinde | DOM hazır olmadan mount denenir |
| FloatingBadge'i CSS ile gizleme | İş kuralı ihlali (non-removable, STABLE-API §9) |
| URL'de `@latest` kullanma | 7-gün TTL + breaking change riski; `@v1` veya `@1.0.0` kullan |
| `wf_a11y_prefs` cookie key'ini varsay | v2'de key `blakfy_a11y_prefs` |
| `@/components/a11y` import yolu varsay | v1 deseniydi, v2'de geçersiz — CDN script tag veya `@blakfy/accessibility-widget-next` |
| "WCAG compliant" rozeti ekleme | FTC vs accessiBe (2025) — yasal risk |
| Otomatik ARIA enjeksiyonu yapma | Anti-pattern, gerçek SR'leri bozar |
| Profil preset'leri ekleme (Epilepsy/Blind) | Pazarlama uydurması |

---

## 5. Çıktı raporu şablonu

```
✅ @blakfy/accessibility-widget v2.x.x kuruldu

📁 Yöntem: <CDN | NPM>
🔧 Konfigürasyon:
   - Dil: <tr>
   - Tema: <auto>
   - Konum: <bottom-left>
   - Marka rozeti: sağ-alt (sürekli, gizlenemez)

✅ Eklenen:
   - Preconnect to jsDelivr (<link rel="preconnect">)
   - SSR FOUC pre-paint script (<head> inline)
   - Widget script tag (<body> sonu)
   - (Opsiyonel) OpenDyslexic CDN

📋 Yapılacaklar (kullanıcı için):
   1. Footer'a "Erişilebilirlik" linki:
      <button onclick="BlakfyA11y.open()">Erişilebilirlik</button>
   2. WCAG 2.2 AA için sitenin kendisinde:
      - Renk kontrastı 4.5:1 (text), 3:1 (non-text)
      - Semantic HTML (h1-h6 hiyerarşi)
      - Klavye navigasyonu (Tab order)
      - alt text tüm görseller
      - focus-visible tüm interaktif elemanlar
   3. Bu widget structural a11y'in YERİNE GEÇMEZ — site kodunda da a11y olmalı

🔗 Referanslar:
   - README: ./README.md
   - STABLE-API: ./docs/STABLE-API.md
   - WCAG 2.2: https://www.w3.org/TR/WCAG22/
```

---

## 6. Sorun giderme

| Sorun | Çözüm |
|---|---|
| FAB görünmüyor | `<Script>` tag'i `<body>` sonunda mı? Console'da `[blakfy-a11y]` log'u var mı? |
| Tercihler uygulanmıyor | `<html>` üzerinde `data-a11y-*` attribute'ları var mı? Pre-paint snippet eklendi mi? |
| SSR FOUC (ilk paint'te yanlış font ölçeği) | Pre-paint snippet `<head>` içinde mi (en üst, defer/async olmadan)? |
| Hydration mismatch | Next.js'te `A11yServerHelper` kullanın VEYA cookie'yi server'da oku ve `<html data-a11y-*>` yaz |
| Disleksi font yüklenmiyor | OpenDyslexic CDN linki `<head>`'de mi? `BlakfyA11y.diagnostics()` ile `OPENDYSLEXIC_CDN_MISSING` issue'sunu kontrol et |
| Modal açılmıyor | `BlakfyA11y` global'i mevcut mu? `console.log(window.BlakfyA11y)` |
| Console kirli (info log'lar prod'da) | `data-debug="false"` (default) kullan; `?a11y-debug=1` query'yi kaldır |
| CSS çakışması | Widget Shadow DOM içinde — host CSS sızamaz. Tema için 15 CSS variable kullan ([README §Tema](./README.md)) |
| Yanlış pozisyon | `data-position` attribute'unu kontrol et; CSS ile override etmeyin |
| Bundle ≥18 KB | CDN'den yüklendiyse impossible — kontrol et: `Network` tab'de `widget.js` boyutu ≤18 KB gz |

---

## 7. Tamamlanma kriterleri (`done_when`)

```yaml
done_when:
  - script_tag_present: "src='https://cdn.jsdelivr.net/npm/@blakfy/accessibility-widget@v1/...' OR @blakfy/accessibility-widget-next imported"
  - preconnect_present: "<link rel='preconnect' href='https://cdn.jsdelivr.net'>"
  - pre_paint_snippet: "<head> içinde inline cookie-read script VEYA A11yServerHelper kullanımı"
  - dev_server_runs: "pnpm dev → http 200, no errors"
  - fab_visible: "bottom-left'te 48x48 FAB butonu görünür"
  - panel_opens: "FAB tıklandığında panel açılır, focus trap aktif"
  - 7_prefs_visible: "panel'de 7 tercih (fontScale/contrast/focusRing/linkUnderline/motion/dyslexiaFont/readingMode)"
  - persists_localstorage: "tercih kaydedip refresh sonrası korunur (key: blakfy_a11y_prefs)"
  - persists_cookie: "cookie 'blakfy_a11y_prefs' var, SameSite=Lax, 365 gün"
  - reset_works: "Sıfırla butonu hepsini default'a döner"
  - badge_present: "sağ-altta 'Powered by Blakfy Studio' linki, blakfy.com'a, target=_blank"
  - keyboard_accessible: "Tab → FAB → Enter → panel → toggle'lar → ESC → fokus FAB'a döner"
  - axe_zero_violations: "panel açıkken axe-core 0 violation"
  - bundle_size: "widget.js ≤18 KB gz (Network tab)"
  - api_global_ready: "window.BlakfyA11y mevcut, methods: open, close, getPreferences, setPreferences, reset, onChange, configure, diagnostics"
```

---

## 8. Özet

- **Default install**: CDN script tag, `@v1` URL, `data-locale="tr"`, `data-position="bottom-left"`, `strategy="lazyOnload"`.
- **NPM yolu** sadece Next.js helpers istenirse.
- **Pre-paint snippet** SSR FOUC için zorunlu (helper kullanılmıyorsa).
- **Asla** `@latest`, asla DOM patch, asla "compliant" iddiası.
- **Marka rozeti** non-removable (iş kuralı).

Detay: [README.md](./README.md), [docs/STABLE-API.md](./docs/STABLE-API.md), [docs/ADR/](./docs/ADR/).
