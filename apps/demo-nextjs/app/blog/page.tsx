// Demo: Blog sayfası — widget'ın farklı sayfalarda çalışmasını test eder
export default function BlogPage() {
  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1rem' }}>
      <nav style={{ marginBottom: '2rem' }}>
        <a href="/" style={{ marginRight: '1rem' }}>← Ana Sayfa</a>
        <a href="/contact">İletişim →</a>
      </nav>

      <article>
        <h1>Erişilebilirlik Neden Önemli?</h1>
        <p style={{ marginTop: '0.5rem', color: '#666' }}>
          12 Mayıs 2025 · Blakfy Studio
        </p>

        <p style={{ marginTop: '1.5rem', lineHeight: 1.7 }}>
          Web erişilebilirliği, engelli kullanıcıların dijital içeriklere eşit biçimde
          erişebilmesini sağlar. WCAG 2.2 standartları; görme, işitme, motor ve bilişsel
          engelleri olan kullanıcılar için minimum gereksinimler tanımlar.
        </p>

        <h2 style={{ marginTop: '2rem' }}>Kontrast Oranları</h2>
        <p style={{ lineHeight: 1.7 }}>
          Normal metin için AA seviyesi en az <strong>4.5:1</strong> kontrast oranı gerektirir.
          AAA seviyesi için bu oran <strong>7:1</strong>'e çıkar. Widget'ın Yüksek Kontrast
          modunda sunduğu siyah zemin + sarı link kombinasyonu 7:1 oranını karşılar.
        </p>

        <h2 style={{ marginTop: '2rem' }}>Klavye Navigasyonu</h2>
        <p style={{ lineHeight: 1.7 }}>
          Tüm interaktif elementler klavye ile erişilebilir olmalıdır. Bu sayfada
          <kbd>Alt</kbd>+<kbd>0</kbd> kısayolu ile erişilebilirlik panelini açabilirsiniz.
        </p>

        <p style={{ marginTop: '2rem', lineHeight: 1.7 }}>
          Örnek bağlantılar: <a href="#">WCAG 2.2 Rehberi</a>,{' '}
          <a href="#">ARIA Authoring Practices</a>,{' '}
          <a href="#">WebAIM Kontrast Kontrolü</a>.
        </p>
      </article>
    </main>
  );
}
