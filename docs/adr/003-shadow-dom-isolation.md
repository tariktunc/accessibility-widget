# ADR-003: Shadow DOM Stil İzolasyonu

**Durum**: Kabul edildi
**Tarih**: 2026-04-30

## Bağlam

Widget tüm tema müşterilerinin farklı sitelerinde çalışacak. Bu sitelerin CSS sistemleri çeşitli:

- Tailwind + utility class'ları
- CSS-in-JS (styled-components, emotion, vanilla-extract)
- BEM
- Eski global CSS, CSS reset'leri

Mevcut v1.1.0 Tailwind class'ları + `!important` kullanıyor. Bu yaklaşım:
- Host site `*` selector veya CSS reset'leri ile çakışıyor
- `!important` her yerde — kontrol kaybediyor, debug zor
- Tema müşterisi widget'ın görünümünü kazara etkileyebiliyor

## Karar

**Tüm widget UI'sı Shadow DOM içinde render edilir** (`mode: 'open'`).

```
<body>
  <!-- host site içeriği -->
  <blakfy-a11y-root>            <!-- Custom Element host -->
    #shadow-root (open)         <!-- Tam izole alan -->
      <style>/* inline */</style>
      <button class="fab">...</button>
      <div class="panel" role="dialog">...</div>
      <a class="badge" href="https://blakfy.com">Powered by Blakfy</a>
  </blakfy-a11y-root>
</body>
```

### Tek-yönlü taşma kuralı

**Shadow → Host**: yalnızca **host'un `<html>` elementine yazılan `data-a11y-*` attribute'ları**.

Bu attribute'lar host CSS'inden okunur (örn. `:root[data-a11y-fontscale="125"] { font-size: 1.25rem }`) ve kullanıcı tercihlerini host content'e uygular. Bu, widget'ın asıl işlevi — host CSS'ine müdahale etmek.

**Host → Shadow**: **hiçbir CSS sızması yok**. Kasıtlı.

### Tema customization yüzeyi (taşmanın izinli yolu)

Shadow içine erişim 15 CSS custom property üzerinden:

```css
/* Host site bunları :root'a yazar */
:root {
  --blakfy-a11y-primary: #ff0066;     /* FAB rengi değiştir */
  --blakfy-a11y-panel-bg: #ffeedd;    /* Panel arkaplanı */
  /* ... 13 daha — bkz. STABLE-API.md */
}
```

CSS custom property'ler Shadow boundary'sini geçer (CSS spec özelliği). 15 değişken `docs/STABLE-API.md`'de kilitli.

## Sonuçlar

**Kabul edilen**:
- (+) Host CSS Shadow DOM'a sızamaz — en güçlü izolasyon
- (+) `!important` ihtiyacı yok → Shadow içindeki CSS temiz
- (+) Tailwind/CSS-in-JS ile sıfır çakışma
- (+) Tema customization 15 değişkenle kontrollü, breaking risk yok
- (+) `prefers-color-scheme` Shadow root'a doğal yayılır
- (+) R3 araştırması: Googlebot WRS Shadow DOM'u flatten edip indeksliyor → SEO etkisi yok

**Trade-off'lar**:
- (-) Form auto-fill bazı SR'lerde edge case yaratabilir → Playwright + manuel SR test
- (-) DevTools debug için "Show user agent shadow DOM" ayarı gerekir
- (-) Bazı 3rd-party tooltip kütüphaneleri Shadow'a erişemez (önemsiz, kendi dialog'umuz var)

## Değerlendirilen alternatifler

| Alternatif | Reddetme nedeni |
|---|---|
| **Scoped class names** (`blakfy-a11y-*`) | Host site `*` selector veya CSS reset bunları ezer |
| **CSS-in-JS (runtime scoping)** | Bundle büyür, runtime cost, SSR karmaşıklığı |
| **iframe isolation** | SR ve focus management uyumsuz, SEO sıkıntılı, performans kötü |
| **`!important` spam (mevcut)** | Kontrol kaybı, debug zor, tema özelleştirmesi imkânsız |

## Referanslar

- Shadow DOM v1: https://www.w3.org/TR/shadow-dom/
- CSS Shadow Parts (theming alternatif): https://drafts.csswg.org/css-shadow-parts/
- R3 araştırma raporu — Google Search Central JS rendering ve Shadow DOM
