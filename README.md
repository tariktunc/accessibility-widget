# Accessibility Widget — Native Preferences Panel

> **Bu bir overlay DEGILDIR.** accessiBe / UserWay / AudioEye gibi araclarin aksine,
> bu widget DOM'u runtime'da degistirmez, ARIA enjekte etmez, "WCAG compliant" iddia etmez.
>
> **Bu widget kullanici tercih panelidir** — sadece CSS degiskenlerini toggle eder.
> Sitenin teknik a11y'si yapi seviyesinde saglanmali; bu panel kullanici tercihlerini ekler.

🔗 [github.com/tariktunc/accessibility-widget](https://github.com/tariktunc/accessibility-widget)
📋 [INSTALL.md](./INSTALL.md) | [AI_INSTALL.md](./AI_INSTALL.md) | [CHANGELOG.md](./CHANGELOG.md)
🛡 Powered by [Blakfy](https://blakfy.com) · MIT Lisans · v1.0.0

---

## OZELLIKLER

| Ozellik | Durum |
|---------|-------|
| **7 kullanici tercihi** (font/kontrast/fokus/link/motion/disleksi/okuma) | ✅ |
| **WCAG 2.2 AA uyumlu** (kendi widget'i da erisilebilir) | ✅ |
| **9 dil** (TR/EN/DE/FR/ES/IT/AR/HE/RU) | ✅ |
| Light / Dark / Auto tema | ✅ |
| OS `prefers-reduced-motion` saygisi | ✅ |
| OS `prefers-contrast` saygisi | ✅ |
| Radix Dialog (focus trap, ESC, ARIA built-in) | ✅ |
| 280px responsive | ✅ |
| Akiskan tipografi (clamp, min 10px) | ✅ |
| Touch target min 44x44px (WCAG 2.5.8) | ✅ |
| 4 FAB konumu (bottom-left default) | ✅ |
| localStorage + cookie + SSR FOUC korumasi | ✅ |
| **No DOM patching · No ARIA injection · No fake compliance claims** | ✅ |
| Powered by Blakfy imzasi | ✅ Non-removable |

---

## 7 TERCIH (Kanit-Temelli)

1. **Yazi olcegi** — 100% / 110% / 125% (WCAG 1.4.4)
2. **Yuksek kontrast** — Siyah arka + sari linkler (AAA 7:1)
3. **Belirgin fokus halkasi** — 4px mavi halka (klavye kullanicilari)
4. **Link altcizgisi** — Renge dayanmama (WCAG 1.4.1)
5. **Hareketi azalt** — `prefers-reduced-motion` override
6. **Disleksi dostu yazi** — OpenDyslexic (⚠ arastirma karisik, durust etiket)
7. **Okuma modu** — Sidebar gizler, dikkat dagiticiyi azaltir

**Anti-pattern'larin EKLENMEDIGI:**
- ❌ "Screen reader" toggle (gercek SR'lari bozar)
- ❌ Otomatik ARIA enjeksiyonu (FTC suclamasi accessiBe)
- ❌ "Seizure-safe profile" (pazarlama uydurmasi)
- ❌ "WCAG compliant achieved" iddiasi (yasal risk)

---

## HIZLI KURULUM

```bash
npx degit tariktunc/accessibility-widget src/components/a11y
npm i @radix-ui/react-dialog @radix-ui/react-switch
cd src/components/a11y && node setup.mjs
```

`globals.css`:
```css
@import "@/components/a11y/styles.css";
```

`layout.tsx`:
```tsx
import { AccessibilityWidget } from '@/components/a11y';

<AccessibilityWidget locale="tr" theme="auto" />
```

Detay: [INSTALL.md](./INSTALL.md)

---

## API

```tsx
<AccessibilityWidget
  locale="tr"                    // 9 dilden biri
  theme="auto"                   // 'light' | 'dark' | 'auto'
  font="'Inter', sans-serif"     // varsayilan: Poppins
  borderWidth="3px"              // varsayilan: 3px
  borderRadius="0.5rem"          // varsayilan: 0.5rem
  position="bottom-left"         // varsayilan: bottom-left
  blakfyBadgeUrl="https://blakfy.com"
/>
```

### Programatik kontrol

```tsx
import { openA11yPanel, usePreferences, getPrefs, savePrefs } from '@/components/a11y';

// Footer'a re-open butonu
<button onClick={openA11yPanel}>Erisilebilirlik</button>

// React'te tercih okuma
const prefs = usePreferences();
console.log(prefs.fontScale, prefs.contrast);

// Programatik ayar
savePrefs({ ...getPrefs(), fontScale: 125 }, 'tr');
```

---

## YASAL & ETIK POZISYON

Bu widget **kasitli olarak** asagidakileri YAPMAZ:

1. **WCAG / ADA / EAA "compliance" iddia etmez.** Site sahibi structural a11y'i kendi koduna yerlestirmek zorundadir.
2. **DOM'u runtime'da patch'lemez.** ARIA, alt text, heading sirasi otomatik enjekte edilmez.
3. **Screen reader simulasyonu sunmaz.** Gercek NVDA/JAWS/VoiceOver kullanicilarin kendi araclari vardir.
4. **Otomatik a11y rapor uretmez.** Bu yanilticidir.

### Tavsiye

A11y stratejiniz:
1. **Token seviyesi:** Renk kontrasti AA (4.5:1) garanti
2. **Component seviyesi:** Semantic HTML, ARIA, klavye, focus-visible
3. **Test:** axe-core, NVDA/JAWS manuel, Lighthouse a11y > 95
4. **Bu widget:** Kullanici tercih ek katmani

---

## REFERANSLAR

- [Overlay Fact Sheet](https://overlayfactsheet.com/) — 900+ a11y uzmani imzasi
- [FTC vs accessiBe (2024)](https://adrianroselli.com/2025/01/ftc-catches-up-to-accessibe.html) — $1M ceza
- [Should I Use An Accessibility Overlay?](https://shouldiuseanaccessibilityoverlay.com/)
- [WCAG 2.2 (W3C, 2023-10-05)](https://www.w3.org/TR/WCAG22/)
- [AB EAA (Directive 2019/882)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32019L0882) — 28 Haz 2025 yururlukte
- [BBC Mobile Accessibility Standards](https://www.bbc.co.uk/accessibility/forproducts/guides/mobile/)
- [GOV.UK Design System Accessibility](https://design-system.service.gov.uk/accessibility/)

### Inspiration (open source widgets incelendi)

- [bennyluk/Sienna](https://github.com/bennyluk/Sienna-Accessibility-Widget) — vanilla, MIT
- [verto-health/astral-accessibility](https://github.com/verto-health/astral-accessibility) — Angular Web Component
- [RosenGray/accessibilik](https://github.com/RosenGray/accessibilik) — React + 38 dil
