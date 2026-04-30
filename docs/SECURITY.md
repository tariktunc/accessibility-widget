# Security Policy

---

## Güvenlik açığı bildirimi

Bir güvenlik açığı keşfettiyseniz **lütfen public GitHub Issue açmayın**. Aşağıdaki yollardan biriyle özel olarak bildirin:

### 1. GitHub Security Advisory (önerilen)

[https://github.com/tariktunc/accessibility-widget/security/advisories/new](https://github.com/tariktunc/accessibility-widget/security/advisories/new)

GitHub'ın private disclosure flow'u — biz advisor olarak çalışırız, açık kapatıldığında public CVE yayınlanır.

### 2. E-posta (alternatif)

**blakfy@hotmail.com** — mümkünse PGP ile şifreleyin (anahtar talep üzerine sağlanır).

E-postanızda lütfen şunları belirtin:
- Etkilenen sürüm(ler)
- Açığı tetikleyen minimal repro
- Potansiyel etki (XSS, CSRF, data leak vb.)
- Önerdiğiniz CVSS skoru (varsa)
- İletişim bilgileriniz (credit verilebilmesi için, anonim de kabul edilir)

---

## Yanıt SLA'sı

| Adım | Süre |
|---|---|
| İlk yanıt | 72 saat içinde |
| Kabul / red kararı | 7 gün içinde |
| Düzeltme PR'ı | 30 gün içinde (kritik), 90 gün içinde (orta) |
| Coordinated disclosure | 90 gün (eğer gizli kalmasını istiyorsanız) |
| CVE yayınlaması | düzeltme sürümü çıkınca |

---

## Desteklenen sürümler

| Sürüm | Destek durumu | Güvenlik patch'i |
|---|---|---|
| v2.x (latest minor) | ✅ Aktif | Evet |
| v2.x-1 (önceki minor) | ✅ Aktif | Evet |
| v2.x-2 ve önceki minor'lar | ⚠ Sadece kritik | Sadece CVSS ≥ 7.0 |
| v1.x | ⚠ Deprecated, security-only (12 ay) | Evet, sadece security |
| v0.x | ❌ Unmaintained | Yok |

### Major sürüm sunset takvimi

[ADR-006](./ADR/006-versioning-auto-update.md) gereği:

- **v1 → v2 release tarihinden itibaren**:
  - 12 ay: v1 deprecated, sadece security patch
  - 18 ay: v1 unmaintained, yeni issue/PR kabul edilmez
- v2 → v3 geçişinde aynı politika uygulanır

CDN URL'leri (`@v1`, `@1.0.0`) sunset sonrası da çalışmaya devam eder — sadece patch akışı durur.

---

## Bilinen olmayan zafiyet politikası

Eğer bildirilen sorun:

- **Gerçek bir zafiyet değilse** (örn. yanlış kullanım, beklenen davranış) — kibarca açıklayıp kapatırız
- **Out-of-scope** ise (örn. host site'in HTML'indeki XSS, widget'ı etkilemeyen tarayıcı bug'ı) — yönlendirme yaparız
- **Gerçek zafiyet** ise — yanıt SLA'sı uygulanır

### In-scope

- Widget bundle'ında XSS / DOM clobbering
- Storage (localStorage/cookie) üzerinden kullanıcı verisi sızıntısı
- Diagnostics / dev pipe üzerinden privacy ihlali
- CDN tedarik zinciri saldırısı (npm publish, jsDelivr cache poison)
- Shadow DOM bypass (host CSS'in widget'ı manipüle etmesi)

### Out-of-scope

- Host sitesinin kendi a11y / XSS sorunları
- Browser engine bug'ları (Mozilla / Chromium / WebKit'e bildirin)
- jsDelivr CDN altyapısı (jsDelivr'a bildirin)
- Theme customization yoluyla görsel "bozma" (özellik, bug değil)
- "Marka rozetini gizleme" — iş kuralı, security konusu değil

---

## Coordinated disclosure

Default: **90 gün**.

- Düzeltme sürümü 90 günden önce yayınlanırsa, advisory hemen public olur
- 90 gün içinde düzeltme tamamlanamazsa, raporlayan kişi public yapma hakkına sahip olur (bizimle koordinasyon önerilir)
- Aktif istismar varsa süre kısalabilir — agresif disclosure yapabiliriz

Credit: raporlayan kişi advisory'de credit alır (anonim talep edilirse aksi belirtilmez).

---

## Privacy ve tedarik zinciri

Bu widget:
- Hiçbir telemetri toplamaz ([ADR-005](./ADR/005-diagnostics-logging.md))
- Hiçbir AT (assistive tech) fingerprinting yapmaz
- Hiçbir 3rd-party analytics çağırmaz
- jsDelivr CDN üzerinden dağıtılır (npm + jsDelivr tedarik zinciri)
- npm publish `--provenance` ile imzalanır ([ADR-006](./ADR/006-versioning-auto-update.md))

Privacy ihlali olarak değerlendirilen davranış kasıtlıysa **major bug**, kasıtsızsa **patch**.

---

## Geçmiş advisory'ler

Henüz CVE yayınlanmadı. Tüm güvenlik düzeltmeleri [CHANGELOG.md](../CHANGELOG.md)'de `Security` etiketi ile işaretlenir.

---

## İletişim

- **Security**: blakfy@hotmail.com
- **GitHub**: [github.com/tariktunc/accessibility-widget/security](https://github.com/tariktunc/accessibility-widget/security)
- **General**: [docs/CONTRIBUTING.md](./CONTRIBUTING.md)
