# Vanilla HTML Quickstart

Framework olmadan, sadece tek bir `<script>` etiketiyle widget entegrasyonu.

## Temel Kullanım

```html
<!doctype html>
<html lang="tr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- FOUC koruması: tercih cookie'sini ilk paint'ten önce uygula -->
    <script>
      (function () {
        try {
          var m = document.cookie.match(/blakfy_a11y_prefs=([^;]+)/);
          if (!m) return;
          var p = JSON.parse(decodeURIComponent(m[1])).prefs;
          if (!p) return;
          var h = document.documentElement;
          h.setAttribute('data-a11y-fontscale', String(p.fontScale || 100));
          h.setAttribute('data-a11y-contrast', p.contrast || 'normal');
          h.setAttribute('data-a11y-motion', p.motion || 'auto');
          h.setAttribute('data-a11y-lineheight', p.lineHeight || 'normal');
          h.setAttribute('data-a11y-letterspacing', p.letterSpacing || 'normal');
          h.setAttribute('data-a11y-saturation', p.saturation || 'normal');
        } catch (e) {}
      })();
    </script>

    <!-- jsDelivr preconnect (opsiyonel, performans için) -->
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />
  </head>
  <body>
    <!-- İçerik -->

    <!-- Widget — kesin versiyon pini (alpha'da floating tag kullanma) -->
    <script
      src="https://cdn.jsdelivr.net/npm/@blakfy/accessibility-widget@2.0.0-alpha.0/dist/widget.js"
      data-locale="tr"
      data-theme="auto"
      data-position="bottom-right"
      defer
    ></script>
  </body>
</html>
```

## `data-*` Attribute Referansı

| Attribute | Değerler | Varsayılan | Açıklama |
|---|---|---|---|
| `data-locale` | `tr` `en` `de` `fr` `es` `it` `ar` `he` `ru` | `tr` | Arayüz dili |
| `data-theme` | `light` `dark` `auto` | `auto` | Widget teması |
| `data-position` | `bottom-right` `bottom-left` `top-right` `top-left` | `bottom-right` | FAB konumu |
| `data-version` | versiyon string'i | script URL'den okunur | Diagnostics için runtime versiyon |

## CDN URL Yapısı

```
# Alpha — kesin versiyon pini zorunlu
https://cdn.jsdelivr.net/npm/@blakfy/accessibility-widget@2.0.0-alpha.0/dist/widget.js

# Stable release sonrası floating tag kullanılabilir
https://cdn.jsdelivr.net/npm/@blakfy/accessibility-widget@v2/dist/widget.js
```

> **Not:** Alpha sürümlerinde `@latest` veya `@v2` gibi floating tag kullanma.
> Beklenmedik breaking change alabilirsin.

## Programatik API

Widget yüklendikten sonra `window.BlakfyA11y` nesnesi kullanılabilir:

```js
// Panel'i aç
window.BlakfyA11y.open();

// Panel'i kapat
window.BlakfyA11y.close();

// Tercihleri oku
var prefs = window.BlakfyA11y.getPreferences();
console.log(prefs.fontScale, prefs.contrast);

// Tercihleri sıfırla
window.BlakfyA11y.reset();

// Diagnostics snapshot (hata ayıklama)
var snapshot = window.BlakfyA11y.diagnostics();
console.log(snapshot);
```

## Tercih Değişimini Dinleme

```js
window.addEventListener('blakfy:preferenceschange', function (e) {
  console.log('Yeni tercihler:', e.detail.prefs);
  // Örnek: kendi analitiğine gönder
  // analytics.track('a11y_prefs_changed', e.detail.prefs);
});
```

## CSS Custom Properties ile Tema

Widget, sayfanın `:root`'unda override edilebilen CSS custom property'ler yayar:

```css
:root {
  --a11y-fab-bg: #1d4ed8;
  --a11y-fab-color: #ffffff;
  --a11y-panel-bg: #f9fafb;
  --a11y-panel-radius: 12px;
  --a11y-accent: #2563eb;
  --a11y-font-size-base: 1rem;
}
```

## data-a11y-* HTML Attribute'ları

Widget tercihleri `<html>` etiketine `data-a11y-*` attribute olarak yazılır.
Bunları CSS selector'da kullanarak sitenin stilini tercihlere bağlayabilirsin:

```css
/* Yüksek kontrast */
:root[data-a11y-contrast='high'] {
  --text-color: #000000;
  --bg-color: #ffffff;
}

/* Hareket azaltma */
:root[data-a11y-motion='reduce'] * {
  animation: none !important;
  transition: none !important;
}

/* Yazı ölçeği */
:root[data-a11y-fontscale='125'] body {
  font-size: 1.25rem;
}
```

Tüm `data-a11y-*` attribute listesi için `docs/STABLE-API.md §3` bölümüne bakın.
