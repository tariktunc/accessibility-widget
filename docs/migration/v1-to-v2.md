# Migration Guide: v1 → v2

> v1 (degit kopyalama) kullanıcıları için v2 (CDN + Web Component) geçiş rehberi.

---

## İçindekiler

- [Neden v2?](#neden-v2)
- [Breaking changes tablosu](#breaking-changes-tablosu)
- [Migration adımları](#migration-adimlari)
- [FAQ](#faq)

---

<a id="neden-v2"></a>

## Neden v2?

### CDN auto-update

v1'de her güncelleme manuel `npx degit` çekme + dosya değişikliklerini merge etmek demekti. v2'de tek `<script>` tag'i — yeni patch ve minor sürümler 7 gün içinde otomatik gelir. Detay: [ADR-001](./docs/ADR/001-cdn-distribution.md).

### Framework-agnostic

v1 React-only idi. v2 Web Component — Wix, Webflow, Shopify, vanilla HTML hepsi destekleniyor. Detay: [ADR-002](./docs/ADR/002-preact-web-component.md).

### Daha küçük bundle

v1: React 18 + Radix UI peer deps (~25 KB+). v2: Preact + custom componentler (≤18 KB gz, hedef bütçe).

### Shadow DOM CSS izolasyonu

v1 Tailwind class + `!important` spam'i — host site CSS'iyle çakışıyordu. v2 Shadow DOM içinde — host CSS sızamaz. Detay: [ADR-003](./docs/ADR/003-shadow-dom-isolation.md).

---

<a id="breaking-changes-tablosu"></a>

## Breaking changes tablosu

| Konu | v1 | v2 |
|---|---|---|
| Dağıtım | `npx degit tariktunc/accessibility-widget src/components/a11y` | `<script src="https://cdn.jsdelivr.net/npm/@blakfy/accessibility-widget@v1/dist/widget.js">` |
| Component import | `import { AccessibilityWidget } from '@/components/a11y'` | `import { A11yScript } from '@blakfy/accessibility-widget-next'` (NPM yolu) VEYA hiç import yok (CDN) |
| UI framework | React 18 + Radix UI | Preact + custom Dialog/Switch (Shadow DOM) |
| Storage key (cookie + localStorage) | `wf_a11y_prefs` | `blakfy_a11y_prefs` |
| Public API | `getPrefs()`, `savePrefs()`, `openA11yPanel()` named export | `window.BlakfyA11y.{open, close, getPreferences, setPreferences, reset, onChange, configure, diagnostics}` |
| CSS sınıfları | Tailwind utility (`fixed bottom-4 ...`) | Shadow DOM içinde, dışarıdan erişilemez |
| Tema customization | `<AccessibilityWidget font="..." borderWidth="..." />` props | 15 CSS custom property (`:root { --blakfy-a11y-* }`) |
| Open event | `openA11yPanel()` named export | `window.BlakfyA11y.open()` |
| Preference change callback | `onPreferencesChange` prop | `window.__BLAKFY_A11Y__.onPreferencesChange` VEYA `window.addEventListener('blakfy:a11y:change', ...)` |
| Konfigürasyon | React props | Script `data-*` attribute VEYA `window.__BLAKFY_A11Y__` global VEYA `BlakfyA11y.configure()` |
| Bağımlılıklar | `@radix-ui/react-dialog`, `@radix-ui/react-switch` peer deps | Yok (CDN) VEYA `@blakfy/accessibility-widget-next` (Next.js helper) |
| Setup script | `setup.mjs` interaktif | Yok — kurulum tek script tag |
| SSR FOUC fix | Manuel cookie-read kodu `RootLayout`'ta | `<A11yServerHelper />` async server component VEYA inline pre-paint snippet |
| Marka rozeti | Var (non-removable) | Var (non-removable, sağ-alt sabit, [STABLE-API §9](./docs/STABLE-API.md)) |

---

<a id="migration-adimlari"></a>

## Migration adımları

### Adım 1 — v1 dosyalarını sil

```bash
rm -rf src/components/a11y
```

### Adım 2 — `globals.css`'ten import'u kaldır

```diff
- @import "@/components/a11y/styles.css";
```

### Adım 3 — `peerDependencies` kaldır

```bash
npm uninstall @radix-ui/react-dialog @radix-ui/react-switch
```

(Başka yerde kullanmıyorsan.)

### Adım 4 — `layout.tsx` güncelle

#### Eski (v1)

```tsx
import { AccessibilityWidget } from '@/components/a11y';
import { cookies } from 'next/headers';

export default async function RootLayout({ children }) {
  const c = await cookies();
  const v = c.get('wf_a11y_prefs')?.value;
  let prefs = null;
  try { prefs = v ? JSON.parse(v).prefs : null; } catch {}

  return (
    <html
      lang="tr"
      data-a11y-fontscale={prefs?.fontScale ?? '100'}
      data-a11y-contrast={prefs?.contrast ?? 'normal'}
      /* ... 5 attribute daha ... */
    >
      <body>
        {children}
        <AccessibilityWidget locale="tr" theme="auto" position="bottom-left" />
      </body>
    </html>
  );
}
```

#### Yeni (v2) — CDN yolu

```tsx
import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){try{var c=document.cookie.split('; ').find(function(r){return r.indexOf('blakfy_a11y_prefs=')===0});if(!c)return;var p=JSON.parse(decodeURIComponent(c.split('=')[1])).prefs;var h=document.documentElement;h.setAttribute('data-a11y-fontscale',p.fontScale||'100');h.setAttribute('data-a11y-contrast',p.contrast||'normal');h.setAttribute('data-a11y-focus',p.focusRing?'enhanced':'default');h.setAttribute('data-a11y-links',p.linkUnderline?'underline':'default');h.setAttribute('data-a11y-motion',p.motion||'auto');h.setAttribute('data-a11y-dyslexia',String(!!p.dyslexiaFont));h.setAttribute('data-a11y-reading',String(!!p.readingMode))}catch(e){}})();
            `,
          }}
        />
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

#### Yeni (v2) — NPM helpers yolu

```bash
npm i @blakfy/accessibility-widget-next
```

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

### Adım 5 — Footer butonu güncelle

```diff
- import { openA11yPanel } from '@/components/a11y';
- <button onClick={openA11yPanel}>Erişilebilirlik</button>

+ <button onClick={() => window.BlakfyA11y.open()}>Erişilebilirlik</button>
```

veya inline HTML:

```html
<button onclick="window.BlakfyA11y.open()">Erişilebilirlik</button>
```

### Adım 6 — Tema customization (varsa) CSS variable'a çevir

#### Eski (v1)

```tsx
<AccessibilityWidget
  font="'Inter', sans-serif"
  borderWidth="3px"
  borderRadius="0.5rem"
/>
```

#### Yeni (v2)

`globals.css`:
```css
:root {
  --blakfy-a11y-primary: #2563eb;
  --blakfy-a11y-primary-hover: #1d4ed8;
  --blakfy-a11y-toggle-on: #171717;
  --blakfy-a11y-focus-ring: #2563eb;
  --blakfy-a11y-fab-size: 48px;
  /* 10 değişken daha — bkz. STABLE-API §4 */
}
```

`data-font` attribute fontu kontrol eder:
```html
<script src="..." data-font="'Inter', sans-serif" defer></script>
```

`borderWidth` ve `borderRadius` v2'de doğrudan değişken olarak yok — Shadow DOM içinde kilitli. v2 default'u tek tutarlı görünüm sunar. İhtiyaç varsa GitHub Issue açın.

### Adım 7 — Storage migration (bir kerelik)

v2 widget eski `wf_a11y_prefs` cookie'sini görmez. Kullanıcı tercihlerini korumak için bir kerelik migration script:

```html
<script>
  // Bu script <head>'in en üstünde, v2 widget yüklenmeden ÖNCE çalışmalı
  (function () {
    try {
      var oldKey = 'wf_a11y_prefs';
      var newKey = 'blakfy_a11y_prefs';
      // Cookie migration
      var cookies = document.cookie.split('; ');
      var oldCookie = cookies.find(function (r) { return r.indexOf(oldKey + '=') === 0; });
      var hasNew = cookies.some(function (r) { return r.indexOf(newKey + '=') === 0; });
      if (oldCookie && !hasNew) {
        var val = oldCookie.split('=')[1];
        document.cookie = newKey + '=' + val + '; path=/; max-age=' + (60 * 60 * 24 * 365) + '; SameSite=Lax';
      }
      // localStorage migration
      var oldLs = localStorage.getItem(oldKey);
      var newLs = localStorage.getItem(newKey);
      if (oldLs && !newLs) {
        localStorage.setItem(newKey, oldLs);
      }
    } catch (e) {}
  })();
</script>
```

Bu script idempotent'tir — birden fazla kez çalıştırılabilir, problem oluşturmaz. 1-2 ay sonra kaldırabilirsiniz.

### Adım 8 — Doğrulama

```bash
pnpm typecheck
pnpm dev
```

Tarayıcıda kontrol:
- FAB sol-altta görünür
- Panel açılır
- Tercihler kalıcı (refresh sonrası korunur)
- `console.log(window.BlakfyA11y.diagnostics())` snapshot döner
- DevTools `Application > Cookies` sekmesinde `blakfy_a11y_prefs` var

---

<a id="faq"></a>

## FAQ

### v1 ne zaman desteksiz kalacak?

v2 release'inden itibaren:
- **12 ay sonra** v1 deprecated — sadece security patch alır.
- **18 ay sonra** v1 unmaintained — yeni issue/PR kabul edilmez.

v1 GitHub kaynak ağacı dondurulmuş olarak kalır. Detay: [ADR-006](./docs/ADR/006-versioning-auto-update.md).

### İkisini birlikte kullanabilir miyim?

**Hayır.** v1 ve v2 birlikte kullanmak şu sorunlara yol açar:
- Storage key çakışması (eski + yeni cookie)
- İki ayrı FAB render olur
- Public API çakışması (`openA11yPanel` vs `BlakfyA11y.open`)
- Bundle iki katı

Sadece birini seç.

### degit ile v1'i güncelleyebilir miyim?

**Hayır** — v1 dondu. Yeni özellikler ve bug fix'ler sadece v2'de. Sadece security patch'leri v1'e backport edilir (12 ay süreyle).

### Custom font'larımı nasıl korurum?

v2'de body'de tanımlı font otomatik miras alınır (Shadow DOM CSS custom property miras kuralı). Ek olarak script tag'inde `data-font` ile özel font verebilirsiniz:

```html
<script src="..." data-font="'Inter', sans-serif" defer></script>
```

Tema customization için 15 CSS custom property mevcut — bkz. [README §Tema](./README.md).

### Tailwind ile çakışıyor mu?

**Hayır.** v2 Shadow DOM içinde — host Tailwind utility'leri Shadow boundary'sini geçemez. Aynı zamanda Shadow içindeki CSS de host'a sızmaz. Tek istisna: 15 CSS custom property (kasten tasarlanan tema yüzeyi).

### React 18 / 19 uyumlu mu?

CDN yolu React'tan tamamen bağımsız (Preact iç framework, host'la temas yok). NPM yolu (`@blakfy/accessibility-widget-next`) Next.js 14+ destekler — React 18 ve 19 ikisinde de.

### Server Component içinde kullanabilir miyim?

`<A11yServerHelper />` async server component'tir — RSC içinde direk kullanılır. `<A11yScript />` `<Script>` wrapper'ı (client-side mount). v1'deki `'use client'` kısıtlaması v2'de yok.

### NPM olmadan tema değiştirebilir miyim?

Evet. CDN yolunda da CSS custom property'ler `:root`'a yazılır:

```css
:root {
  --blakfy-a11y-primary: #635bff;
  --blakfy-a11y-toggle-on: #635bff;
}
```

Shadow boundary'sini geçer (CSS spec özelliği). Detay: [ADR-003](./docs/ADR/003-shadow-dom-isolation.md).

### Codemod var mı?

Henüz **yok**. Manuel migration adımları yukarıda. Otomatik codemod gelecek bir minor sürümde planlanıyor (`v1.1+`).

### Test etmem gereken şeyler?

- Footer butonu açıyor mu (`BlakfyA11y.open()`)?
- Storage migration script çalıştı mı (eski tercihler korundu mu)?
- SSR FOUC yok mu (refresh'te ilk paint doğru)?
- Custom theme override çalışıyor mu (CSS variable ile)?
- axe-core 0 violation
- Bundle ≤18 KB gz

---

## Yardım

- **GitHub Discussions**: sorular ve breaking change feedback'i
- **GitHub Issues**: bug report
- **E-posta**: blakfy@hotmail.com (security için, bkz. [SECURITY.md](./docs/SECURITY.md))
- **Referans**: [STABLE-API.md](./docs/STABLE-API.md) — v2 kilitli yüzey envanteri
