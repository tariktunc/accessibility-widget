# Stable API — v1 Kilitli Yüzey

> **Bu dosya v1 boyunca asla geriye dönük kırılmaz.** Buradaki her sembol/property/event/CSS-var/storage-key tema müşterilerinin kullanabileceği bir kontrattır. Politika için `docs/ADR/004-locked-contracts.md`.

**Sürüm**: 1.0.0
**Son güncelleme**: 2026-04-30
**Test referansı**: `tests/contract/*.spec.ts`

---

## 1. Public JavaScript API

`window.BlakfyA11y` global objesi mount sonrası mevcuttur. NPM tüketicileri için aynı yüzey named export.

### 1.1 Methods

| Method | İmza | Açıklama | Sürüm |
|---|---|---|---|
| `open` | `() => void` | Paneli açar | 1.0.0 |
| `close` | `() => void` | Paneli kapatır | 1.0.0 |
| `getPreferences` | `() => Preferences` | Aktif tercihleri döner | 1.0.0 |
| `setPreferences` | `(p: Partial<Preferences>) => void` | Tercih(ler) günceller, persiste eder, uygular | 1.0.0 |
| `reset` | `() => void` | Tüm tercihleri default'a döner | 1.0.0 |
| `onChange` | `(cb: (p: Preferences) => void) => () => void` | Değişiklik dinleyicisi, unsubscribe fonksiyonu döner | 1.0.0 |
| `configure` | `(opts: Partial<WidgetOptions>) => void` | Runtime config (locale, theme vb.) | 1.0.0 |
| `diagnostics` | `() => DiagnosticsSnapshot` | Tanı verisi snapshot'ı | 1.0.0 |

### 1.2 Properties

| Property | Tip | Açıklama | Sürüm |
|---|---|---|---|
| `version` | `string` | Aktif widget sürümü (örn. "1.2.3") | 1.0.0 |

### 1.3 Type'lar

```ts
interface Preferences {
  fontScale: 100 | 110 | 125;
  contrast: 'normal' | 'high';
  focusRing: boolean;
  linkUnderline: boolean;
  motion: 'auto' | 'reduce';
  dyslexiaFont: boolean;
  readingMode: boolean;
}

interface WidgetOptions {
  locale: 'tr' | 'en' | 'de' | 'fr' | 'es' | 'it' | 'ar' | 'he' | 'ru';
  theme: 'light' | 'dark' | 'auto';
  position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  font: string;
  debug: boolean;
}

interface PreferencesRecord {
  prefs: Preferences;
  version: string;
  timestamp: string;
  locale: string;
}

interface DiagnosticsSnapshot {
  version: string;
  locale: string;
  theme: string;
  storage: {
    version: string;
    migratedFrom: string | null;
    keysFound: Array<'localStorage' | 'cookie'>;
  };
  osPreferences: {
    reducedMotion: boolean;
    contrast: 'normal' | 'more' | 'less';
    colorScheme: 'light' | 'dark' | 'no-preference';
  };
  performance: {
    mountTimeMs: number;
    bundleSizeGz: number;
    timeToFirstClick: number | null;
  };
  issues: Array<{
    level: 'info' | 'warn' | 'error';
    code: string;
    timestamp: string;
    msg: string;
  }>;
  config: WidgetOptions;
  timestamp: string;
}
```

---

## 2. Custom Events

Tüm event'ler `window` üzerinde dispatch edilir.

| Event ismi | Detail tipi | Tetiklenme | Sürüm |
|---|---|---|---|
| `blakfy:a11y:ready` | `{ version: string }` | Mount tamamlandı, API hazır | 1.0.0 |
| `blakfy:a11y:change` | `PreferencesRecord` | Tercih değişti | 1.0.0 |
| `blakfy:a11y:open` | `{}` | Panel açıldı | 1.0.0 |
| `blakfy:a11y:close` | `{}` | Panel kapatıldı | 1.0.0 |

```ts
window.addEventListener('blakfy:a11y:change', (e) => {
  const record = (e as CustomEvent<PreferencesRecord>).detail;
  console.log('Yeni tercih:', record.prefs);
});
```

---

## 3. HTML data-attributes (host `<html>` üzerinde)

Bu attribute'lar widget tarafından `<html>` elementine yazılır. Müşteri CSS'i bunlara `:root[data-a11y-*]` ile bağlanır.

| Attribute | Değer | Açıklama | Sürüm |
|---|---|---|---|
| `data-a11y-fontscale` | `"100" \| "110" \| "125"` | Yazı ölçeği yüzdesi | 1.0.0 |
| `data-a11y-contrast` | `"normal" \| "high"` | Kontrast modu | 1.0.0 |
| `data-a11y-focus` | `"default" \| "enhanced"` | Fokus halkası | 1.0.0 |
| `data-a11y-links` | `"default" \| "underline"` | Link altçizgisi | 1.0.0 |
| `data-a11y-motion` | `"auto" \| "reduce"` | Hareket azaltma | 1.0.0 |
| `data-a11y-dyslexia` | `"true" \| "false"` | Disleksi font | 1.0.0 |
| `data-a11y-reading` | `"true" \| "false"` | Okuma modu | 1.0.0 |

### Müşteri kullanım örneği

```css
:root[data-a11y-fontscale="125"] body { font-size: 1.25rem; }
:root[data-a11y-contrast="high"] a { color: yellow; }
:root[data-a11y-motion="reduce"] * { animation: none !important; }
```

---

## 4. CSS Custom Properties (15 adet — kilitli)

Müşteri tema customization'ı için. `:root` veya widget'in dış container'ına yazılır → Shadow DOM içine yayılır.

| Variable | Default | Açıklama | Sürüm |
|---|---|---|---|
| `--blakfy-a11y-primary` | `#2563eb` | FAB rengi, accent | 1.0.0 |
| `--blakfy-a11y-primary-hover` | `#1d4ed8` | FAB hover rengi | 1.0.0 |
| `--blakfy-a11y-primary-text` | `#ffffff` | FAB icon rengi | 1.0.0 |
| `--blakfy-a11y-panel-bg` | `#ffffff` | Panel arkaplan (light) | 1.0.0 |
| `--blakfy-a11y-panel-text` | `#171717` | Panel metin (light) | 1.0.0 |
| `--blakfy-a11y-panel-muted` | `#525252` | Panel ikincil metin (light) | 1.0.0 |
| `--blakfy-a11y-panel-border` | `#e5e5e5` | Panel border (light) | 1.0.0 |
| `--blakfy-a11y-panel-bg-dark` | `#0a0a0a` | Panel arkaplan (dark) | 1.0.0 |
| `--blakfy-a11y-panel-text-dark` | `#fafafa` | Panel metin (dark) | 1.0.0 |
| `--blakfy-a11y-panel-muted-dark` | `#a3a3a3` | Panel ikincil metin (dark) | 1.0.0 |
| `--blakfy-a11y-panel-border-dark` | `#262626` | Panel border (dark) | 1.0.0 |
| `--blakfy-a11y-toggle-on` | `#171717` | Switch açık rengi | 1.0.0 |
| `--blakfy-a11y-toggle-off` | `#d4d4d4` | Switch kapalı rengi | 1.0.0 |
| `--blakfy-a11y-focus-ring` | `#2563eb` | Fokus halkası rengi | 1.0.0 |
| `--blakfy-a11y-fab-size` | `48px` | FAB buton boyutu | 1.0.0 |

### Tema örneği — Stripe-vari mor

```css
:root {
  --blakfy-a11y-primary: #635bff;
  --blakfy-a11y-primary-hover: #524bff;
  --blakfy-a11y-focus-ring: #635bff;
  --blakfy-a11y-toggle-on: #635bff;
}
```

### Tema örneği — Vercel-vari siyah-beyaz

```css
:root {
  --blakfy-a11y-primary: #000000;
  --blakfy-a11y-primary-hover: #333333;
  --blakfy-a11y-toggle-on: #000000;
  --blakfy-a11y-focus-ring: #0070f3;
}
```

---

## 5. Storage Schema

### 5.1 Anahtarlar

| Anahtar | Konum | Tip | Sürüm |
|---|---|---|---|
| `blakfy_a11y_prefs` | localStorage | JSON string | 1.0.0 |
| `blakfy_a11y_prefs` | cookie | `encodeURIComponent(JSON)`, SameSite=Lax, 365 gün | 1.0.0 |

### 5.2 Schema

```ts
interface PreferencesRecord {
  prefs: Preferences;       // bkz. §1.3
  version: string;          // schema sürümü, "1.0.0"
  timestamp: string;        // ISO 8601
  locale: string;           // örn. "tr"
}
```

### 5.3 Migration kuralları

- Yeni `Preferences` alanı eklenirse: `DEFAULT_PREFS` ile merge — eski kayıtlar default değer alır
- Mevcut alanın enum'una yeni değer eklenirse: backward-compat, eski değerler kalır
- Mevcut alan kaldırılır VEYA tip değişirse: **major bump şart**, migration codemod yazılır

---

## 6. Script Tag `data-*` Konfigürasyon Attribute'ları

Auto-mount script tag'i kendi `data-*` attribute'larını okur:

| Attribute | Tip | Default | Açıklama | Sürüm |
|---|---|---|---|---|
| `data-locale` | string | `"en"` | Aktif dil | 1.0.0 |
| `data-theme` | `"light" \| "dark" \| "auto"` | `"auto"` | Tema | 1.0.0 |
| `data-position` | `"bottom-left" \| "bottom-right" \| "top-left" \| "top-right"` | `"bottom-left"` | FAB konumu | 1.0.0 |
| `data-font` | string | sistem fontları | font-family değeri | 1.0.0 |
| `data-debug` | `"true" \| "false"` | `"false"` | Verbose log | 1.0.0 |
| `data-dev-pipe` | string (path) | yok | Dev terminal log endpoint | 1.0.0 |

---

## 7. Web Component Attributes

`<blakfy-a11y>` custom element için. Script `data-*` ile aynı isimler ama prefix'siz:

```html
<blakfy-a11y locale="tr" theme="auto" position="bottom-left"></blakfy-a11y>
```

Tüm attribute'lar `data-*` ile aynı semantiği taşır (§6). Reactivity: attribute değişirse runtime config güncellenir.

---

## 8. `window.__BLAKFY_A11Y__` Konfigürasyon Globali

Programatik config (data-attr alternatifi). Mount'tan ÖNCE set edilirse okunur:

```ts
window.__BLAKFY_A11Y__ = {
  locale: 'tr',
  theme: 'auto',
  position: 'bottom-left',
  font: "'Inter', sans-serif",
  debug: false,
  onPreferencesChange: (record) => { /* analytics, sentry vb. */ }
};
```

Tip: `Partial<WidgetOptions> & { onPreferencesChange?: (record: PreferencesRecord) => void }`.

### Konfigürasyon önceliği (yüksekten düşüğe)

1. `window.BlakfyA11y.configure({...})` (runtime, mount sonrası)
2. `window.__BLAKFY_A11Y__` globali (mount öncesi)
3. Script `data-*` attribute'ları
4. Default değerler

---

## 9. Marka Rozeti (Powered by Blakfy Studio)

Widget her sayfada **sürekli görünür** marka rozeti basar.

| Property | Değer | Değiştirilebilir? |
|---|---|---|
| Konum | bottom-right (LTR), bottom-left (RTL aynalanır) | Hayır |
| Metin | "Powered by Blakfy Studio" | Hayır |
| URL | `https://blakfy.com` | Hayır |
| Açılış | `target="_blank" rel="noopener noreferrer"` | Hayır |
| z-index | 9997 (FAB'in altında) | Hayır |
| Opaklık | 0.7 default, hover'da 1.0 | Hayır |
| Görünürlük | Daima görünür | Hayır (iş kuralı) |

Bu davranış v1 boyunca sabittir. Major bump (v2) ile değişebilir.

---

## 10. Versiyonlama Politikası

- **Patch (X.Y.Z+1)**: Bug fix, perf, internal refactor — bu dosyada değişiklik YOK
- **Minor (X.Y+1.0)**: Bu dosyaya **yeni satır eklenir**, mevcut satırlar değişmez
- **Major (X+1.0.0)**: Bu dosya **kırılabilir** — `MIGRATION-vN-to-vN+1.md` zorunlu

### Snapshot test

`tests/contract/stable-api.snapshot.ts` bu dosyadan üretilen JSON snapshot'ı runtime ile karşılaştırır. Eşleşmezse CI fail.

---

## 11. Breaking Change Politikası

> Aşağıdakilerden biri olursa **major bump** ZORUNLU:

1. Tablolardan satır kaldırma
2. Method/property imza değişikliği
3. Default değer değişikliği (kullanıcı görünür davranış)
4. Storage schema kaldırma/yeniden adlandırma
5. Event ismi değişikliği veya kaldırma
6. CSS variable kaldırma veya yeniden adlandırma
7. HTML data-attribute kaldırma veya yeniden adlandırma
8. Marka rozeti davranış değişikliği

**Eğer ekleme yapıyorsanız** (yeni method, yeni event, yeni CSS var, yeni preference, yeni dil), bu **minor bump**'tır ve mevcut müşterileri etkilemez.

---

## 12. Test referansları

| Yüzey | Test dosyası |
|---|---|
| Public API (§1) | `tests/contract/api.spec.ts` |
| Events (§2) | `tests/contract/events.spec.ts` |
| HTML data-attributes (§3) | `tests/contract/html-attrs.spec.ts` |
| CSS variables (§4) | `tests/contract/css-vars.spec.ts` |
| Storage schema (§5) | `tests/contract/storage.spec.ts` |
| Script config (§6) | `tests/contract/script-config.spec.ts` |
| Web Component (§7) | `tests/contract/web-component.spec.ts` |
| Window globali (§8) | `tests/contract/window-config.spec.ts` |
| Marka rozeti (§9) | `tests/contract/badge.spec.ts` |

Hepsi snapshot-based. Snapshot değişmesi PR'da görünür → semver kararı verilir.

---

## 13. WCAG/EAA RED LINE testleri

Aşağıdaki 14 madde her release'de geçer (CI gate). Detaylar `docs/ADR/`'de R2 araştırma referansı.

1. axe-core 0 violation (FAB closed + modal open)
2. Klavye-only flow (FAB → Tab×9 → ESC → odak FAB'a döner)
3. Focus trap (Tab/Shift-Tab cycle)
4. `role="switch"` + `aria-checked` her toggle'da
5. Kontrast ≥4.5:1 text, ≥3:1 non-text (light + dark + auto)
6. Target size ≥24×24 her interactive element
7. Reflow 320×256 (yatay scroll yok)
8. RTL smoke (ar/he aynalanma)
9. `prefers-reduced-motion` saygısı
10. Manual SR sanity (NVDA + VoiceOver) — release-gate
11. Bundle ≤18KB gz
12. Lighthouse CWV regression yok (LCP/CLS/INP delta)
13. Contract test — Public API yüzeyi snapshot
14. Storage migration test — eski cookie/localStorage parse

---

## 14. Değişiklik takibi

Bu dosyadaki her değişiklik `CHANGELOG.md`'de kaydedilir. CHANGELOG güncellemesiz STABLE-API.md değişikliği CI'da bloke edilir.
