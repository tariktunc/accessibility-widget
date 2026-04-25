# Changelog

## [1.1.0] — 2026-04-26

### Added
- `keyboardShortcut` prop (default true) — Alt+0 ile panel acar
- `iconStyle` prop ('walking' | 'access' | 'eye') — default 'access' (universal access symbol)
- `onPreferencesChange` callback prop (external integration)
- `<A11yServerHelper />` async server helper — SSR FOUC korumasi tek satirda
- "Sifirla" 2-tiklama onay (3 saniye timer, kazara tiklama riskini azalt)
- OpenDyslexic CDN tespit + console warning (font yuklenmemisse uyarir)
- `PreferencesChangeHandler` ve `IconStyle` tip exports
- CONTRIBUTING.md (anti-overlay felsefesi PR kurali olarak)
- tests/README.md (Playwright + axe-core test stratejisi)

### Fixed
- package.json version 1.0.1 → 1.1.0 hizalandi

## [1.0.1] — 2026-04-26
- 'Operated by Blakfy Studio' imza metni

## [1.0.0] — 2026-04-26

### Added
- AccessibilityWidget: Sag-alt/sol FAB butonu (Radix Dialog ile acilan panel)
- AccessibilityPanel: 7 tercih kontrolu (font olcegi, kontrast, fokus halkasi, link altcizgi, motion, dyslexia font, okuma modu)
- preferences-store: localStorage + cookie + SSR FOUC koruma + OS media query merge
- styles.css: :root[data-a11y-*] CSS degiskenleri (DOM patch'i YOK, ARIA enjeksiyonu YOK)
- 9 dil destegi: TR, EN, DE, FR, ES, IT, AR (RTL), HE (RTL), RU
- BlakfyBadge: Powered by Blakfy imzasi (non-removable)
- prefers-reduced-motion ve prefers-contrast OS sinyallerine saygi
- Disleksi font notu: arastirma karisik (Wery 2017 etkisiz, Broadbent 2023 %58 prefer) — dürüst etiket
- Disclaimer: "Bu panel kullanici tercih kontrolu sunar; teknik a11y yapi seviyesinde saglanmistir"
- WCAG 2.2 AA: 44x44px touch target, focus-visible, klavye erisilebilirligi, semantic HTML
- Light / Dark / Auto tema (OS prefers-color-scheme takibi)
- Akiskan tipografi (clamp, min 10px max 18px)
- 280px responsive
- Position prop: bottom-left (default) / bottom-right / top-left / top-right
- Open dispatcher: Footer linki vb. icin openA11yPanel() helper

### Anti-pattern Avoidance (Arastirma Bulgulari)
- ❌ DOM rewriting / otomatik ARIA enjeksiyonu YOK
- ❌ "Screen reader" toggle YOK (gercek SR'lari bozar)
- ❌ "WCAG compliant" / "ADA compliant" iddiasi YOK
- ❌ Otomatik alt text uretimi YOK
- ❌ "Seizure-safe profile" gibi pazarlama profilleri YOK

Bu widget ACCESSIBE / USERWAY / AUDIOEYE TARZINDA OVERLAY DEGILDIR.
Native preferences panel olarak konumlanmistir.

### References
- Overlay Fact Sheet: https://overlayfactsheet.com/en/
- FTC vs accessiBe (2024): $1M ceza
- WCAG 2.2 (2023-10-05 W3C Recommendation)
- AB Erisilebilirlik Yasasi (EAA) 28 Haziran 2025 yururlukte
