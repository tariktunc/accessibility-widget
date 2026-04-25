# Hizli Kurulum

## YONTEM 1 — degit (ONERILEN)

```bash
# 1. Klasoru cek (token tasarrufu, git gecmisi yok)
npx degit tariktunc/accessibility-widget src/components/a11y

# 2. Bagimliliklar
npm i @radix-ui/react-dialog @radix-ui/react-switch

# 3. Interaktif kurulum (proje token'larini otomatik tespit eder)
cd src/components/a11y && node setup.mjs
```

`setup.mjs` size sorar:
- Diller (virgulle, default: tr)
- Varsayilan dil
- Yazi tipi (`tokens.config.ts` varsa otomatik tespit)
- Buton border genisligi (default: 3px)
- Buton kose yuvarliyi (default: 0.5rem)
- FAB konumu (default: bottom-left)

---

## YONTEM 2 — Manuel ZIP

1. https://github.com/tariktunc/accessibility-widget → "Download ZIP"
2. ZIP'i ac, klasoru `src/components/a11y/` olarak kopyala
3. `npm i @radix-ui/react-dialog @radix-ui/react-switch`

---

## ENTEGRASYON (Tum yontemlerde ortak)

### Adim 1 — CSS import

`src/app/globals.css` (Tailwind layer'larindan SONRA):
```css
@import "@/components/a11y/styles.css";
```

Veya Tailwind kullanmiyorsaniz dogrudan layout'tan import edin:
```tsx
import '@/components/a11y/styles.css';
```

### Adim 2 — Layout entegrasyonu

`src/app/layout.tsx` (cok dilli ise `[locale]/layout.tsx`):

```tsx
import { AccessibilityWidget } from '@/components/a11y';

export default function RootLayout({ children, params }: { children: React.ReactNode; params: { locale?: string } }) {
  return (
    <html lang={params.locale ?? 'tr'}>
      <head>
        {/* Default font Poppins icin: */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" />

        {/* Disleksi tercihi destegi (opsiyonel ama onerilen): */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/open-dyslexic@1.0.3/open-dyslexic-regular.css" />
      </head>
      <body>
        {children}
        <AccessibilityWidget locale={params.locale as any ?? 'tr'} theme="auto" />
      </body>
    </html>
  );
}
```

### Adim 3 — SSR FOUC korumasi (onemli)

Cookie'den ilk paint dogru olsun diye `<html>`'e data-attribute'lari sunucudan koy:

```tsx
import { cookies } from 'next/headers';

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const prefsCookie = cookieStore.get('wf_a11y_prefs')?.value;
  const prefs = prefsCookie ? JSON.parse(prefsCookie).prefs : null;

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
      <body>{children}<AccessibilityWidget /></body>
    </html>
  );
}
```

### Adim 4 — Footer'a re-open linki

```tsx
import { openA11yPanel } from '@/components/a11y';

<button onClick={openA11yPanel}>Erisilebilirlik Tercihleri</button>
```

---

## OZELLESTIRME

### Font

```tsx
{/* Default — Poppins */}
<AccessibilityWidget />

{/* Projenin font'unu kullan */}
<AccessibilityWidget font="inherit" />

{/* CSS degiskeni */}
<AccessibilityWidget font="var(--font-sans)" />

{/* Ozel */}
<AccessibilityWidget font="'Inter', system-ui, sans-serif" />
```

### Konum

```tsx
<AccessibilityWidget position="bottom-left" />   {/* default — sag-altta cookie/chat icin yer */}
<AccessibilityWidget position="bottom-right" />
<AccessibilityWidget position="top-left" />
<AccessibilityWidget position="top-right" />
```

### Tema

```tsx
<AccessibilityWidget theme="auto" />    {/* OS prefers-color-scheme takibi */}
<AccessibilityWidget theme="light" />
<AccessibilityWidget theme="dark" />
```

---

## SIK SORULAR

**S: Bu widget WCAG compliance saglar mi?**
C: **Hayir.** Widget kullanici tercih sunar; structural a11y site kodunda olmalidir. Bu widget'in varligi sitenize yasal koruma vermez.

**S: AccessiBe / UserWay yerine kullanilabilir mi?**
C: Evet, ama farkli bir sey yapar. Onlar overlay (DOM patch). Bu native preferences panel. Ikisinin amaci farkli.

**S: Disleksi font niye opsiyonel etiketle?**
C: Arastirma karisik (Wery & Diliberto 2017 etkisiz, Broadbent 2023 %58 prefer). "Bazi kullanicilar tercih eder" demek dogru, "okuma sorunlarini cozer" demek yanlis.

**S: SSR FOUC olur mu?**
C: Cookie'den server-side data-attribute koyarsaniz olmaz. Adim 3'u takip edin.

**S: Bundle size?**
C: ~8KB gzip (Radix Dialog + Switch zaten projede varsa). 9 dil yuklu — `setup.mjs` ile gereksizleri silebilirsiniz.

**S: Sirf JS/HTML site icin var mi?**
C: Su an React-only. Vanilla port roadmap'te.

---

## KATKI

PR ve issue'lar acik. Repo: github.com/tariktunc/accessibility-widget
