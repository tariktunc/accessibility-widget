# AI Installation Guide — accessibility-widget

> **AI agent'lar (Claude, GPT, Cursor, Copilot) icin yazildi.**
> Insan okumasi: [INSTALL.md](./INSTALL.md)

---

## 0. ON KOSULLAR (yaml check)

```yaml
required:
  framework: Next.js >= 14 (App Router)
  language: TypeScript >= 5
  styling: Tailwind CSS >= 3 (opsiyonel ama onerilen)
peer_deps_install:
  - "@radix-ui/react-dialog"
  - "@radix-ui/react-switch"
optional:
  tokens_path: src/lib/design-system/tokens.config.ts
  open_dyslexic_cdn: https://cdn.jsdelivr.net/npm/open-dyslexic@1.0.3/open-dyslexic-regular.css
```

---

## 1. PRE-FLIGHT (kullaniciya tek mesajda sor)

```
1. DIL: Hangi dilleri dahil etmek istiyorsunuz? (default: tr)
   Mevcut: tr, en, de, fr, es, it, ar, he, ru

2. VARSAYILAN DIL: (default: tr)

3. TEMA: light / dark / auto (default: auto)

4. FAB KONUMU: bottom-left / bottom-right / top-left / top-right (default: bottom-left)
   Not: bottom-right'da cookie banner / chat olabilir, bottom-left tercih edin

5. YAZI TIPI: (default: Poppins, tokens.config.ts varsa onu oner)

6. BUTON STILI:
   - borderWidth (default: 3px)
   - borderRadius (default: 0.5rem)

7. DISLEKSI FONT YUKLE? (yes/no)
   Yes ise layout'a OpenDyslexic CDN linki ekle
```

---

## 2. KURULUM ADIMLARI (deterministik)

### 2.1 — degit ile cek
```bash
npx degit tariktunc/accessibility-widget src/components/a11y
```

### 2.2 — Bagimliliklar
```bash
npm i @radix-ui/react-dialog @radix-ui/react-switch
```

### 2.3 — Setup script
```bash
cd src/components/a11y && node setup.mjs
```

### 2.4 — CSS import
**`src/app/globals.css`** sonuna ekle (Tailwind layer'larindan SONRA):
```css
@import "@/components/a11y/styles.css";
```

### 2.5 — Layout entegrasyonu
`src/app/layout.tsx` (veya `[locale]/layout.tsx`):

**`<head>` icine:**
```tsx
{/* Poppins font (varsayilan) */}
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" />

{/* Disleksi font destegi (kullanici onayladiysa) */}
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/open-dyslexic@1.0.3/open-dyslexic-regular.css" />
```

**`<body>` sonuna:**
```tsx
import { AccessibilityWidget } from '@/components/a11y';

<AccessibilityWidget locale="<DEFAULT_LOCALE>" theme="<THEME>" position="<POSITION>" />
```

### 2.6 — SSR FOUC korumasi (ZORUNLU)
`<html>` etiketine cookie'den okunan data-attribute'lari ekle:

```tsx
import { cookies } from 'next/headers';

export default async function RootLayout({ children }) {
  const c = await cookies();
  const cookieValue = c.get('wf_a11y_prefs')?.value;
  let prefs = null;
  try { prefs = cookieValue ? JSON.parse(cookieValue).prefs : null; } catch {}

  return (
    <html
      lang="<DEFAULT_LOCALE>"
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

### 2.7 — Footer'a re-open linki
```tsx
import { openA11yPanel } from '@/components/a11y';

<button onClick={openA11yPanel}>Erisilebilirlik Tercihleri</button>
```

---

## 3. DOGRULAMA

```yaml
checks:
  - file_exists: src/components/a11y/AccessibilityWidget.tsx
  - file_exists: src/components/a11y/styles.css
  - globals_css_imports: '@/components/a11y/styles.css'
  - layout_renders: <AccessibilityWidget />
  - typecheck: npm run typecheck → 0 error
  - lint: npm run lint → 0 warning
  - dev: npm run dev → 200 OK
  - fab_visible: bottom-left'te FAB butonu gorunur
  - panel_opens: FAB tiklandiginda Radix Dialog acilir
  - 7_prefs_visible: panel'de 7 tercih (font/contrast/focus/link/motion/dyslexia/reading)
  - persists: tercih kaydedip refresh'te korunur
  - ssr_no_fouc: ilk paint'te font olcegi dogru
  - axe_zero_violations: panel acik durumda axe-core 0 violation
```

---

## 4. ANTI-PATTERN'LAR (KESINLIKLE YAPMA)

| Yanlis | Sebep |
|--------|-------|
| "WCAG compliant" / "ADA compliant" rozeti ekle | FTC suclamasi (accessiBe $1M ceza) |
| Otomatik ARIA enjeksiyonu (DOM patch) | Real SR'lari bozar |
| "Screen reader" toggle ekle | Anti-pattern, gercek SR var zaten |
| Alt text otomatik uretme | Hatali alt text > yok alt text |
| Widget'i a11y stratejisinin yerine koy | Yasal risk + yanlis pazarlama |
| `<html>` etiketine cookie'siz render | SSR FOUC olusur (fontScale 1 paint, sonra 1.25) |
| `styles.css` import'u Tailwind layer'larindan ONCE | Specificity bozulur |
| `position="bottom-right"` zorla | Cookie banner / chat ile cakisir |

---

## 5. CIKTI RAPORU SABLONU

```
✅ accessibility-widget v1.0.0 kuruldu

📁 Olusturulan dosyalar:
   - src/components/a11y/* (degit ile cekildi)

🔧 Konfigurasyon:
   - Diller: <X, Y, Z>
   - Varsayilan: <X>
   - Tema: <auto/light/dark>
   - Konum: <bottom-left>
   - Font: <font>
   - Border: <Npx solid>

✅ Eklenen:
   - globals.css'e import
   - layout.tsx'e <AccessibilityWidget />
   - <html> etiketine SSR FOUC koruma data-attribute'lari
   - Poppins font preconnect+stylesheet
   - (Opsiyonel) OpenDyslexic CDN

📋 Yapilacaklar:
   1. Footer'a "Erisilebilirlik Tercihleri" linki ekle
   2. Test: npm run dev → bottom-left'te FAB gorunmeli
   3. axe-core ile dogrula: 0 violation
   4. WCAG 2.2 AA uyumu IICIN sitenin kendisinde:
      - Renk kontrasti AA (4.5:1)
      - Semantic HTML (h1-h6 hiyerarsi)
      - Klavye navigasyonu
      - alt text tum gorseller
      - focus-visible tum interaktif elemanlar
   5. Bu widget structural a11y'in YERINE GECMEZ — sitenin kendisinde a11y olmali

🔗 Linkler:
   - Repo: https://github.com/tariktunc/accessibility-widget
   - Docs: ./README.md
   - WCAG 2.2: https://www.w3.org/TR/WCAG22/
```

---

## 6. SORUN GIDERME

| Sorun | Cozum |
|-------|-------|
| FAB gorunmuyor | `<AccessibilityWidget />` body'de mi? |
| Tercihler uygulanmiyor | `globals.css`'te `@import` var mi? |
| SSR FOUC | `<html>` cookie'den data-attribute alıyor mu? |
| Modal acilmiyor | Radix Dialog kurulu mu? |
| Disleksi font yuklenmiyor | OpenDyslexic CDN linki head'de mi? |
| Hydration error | `'use client'` var mi (zaten var)? |

---

## 7. TAMAMLANMA KRITERLERI

```yaml
done_when:
  - npm run dev → bottom-left'te FAB butonu gorunur
  - FAB tiklandiginda panel acilir (Radix Dialog)
  - 7 tercih hepsi gorunur ve toggle calisir
  - "Yazi olcegi" 110% sectiginde body font-size dogru artar
  - "Yuksek kontrast" actiginda body siyah arka olur
  - "Hareketi azalt" actiginda animasyonlar durur
  - Refresh sonrasi tercihler korunur (localStorage + cookie)
  - "Sifirla" butonu hepsini default'a doner
  - axe-core panel uzerinde 0 violation
  - Lighthouse a11y > 95 (sitenin kendisi)
  - 280px ekranda yatay scroll yok
  - Klavye ile FAB → panel → toggle → close erisilebilir
```
