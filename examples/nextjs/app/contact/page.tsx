// Demo: İletişim sayfası — form ile widget'ın farklı sayfada çalışmasını test eder
export default function ContactPage() {
  return (
    <main style={{ maxWidth: 560, margin: '0 auto', padding: '2rem 1rem' }}>
      <nav style={{ marginBottom: '2rem' }}>
        <a href="/" style={{ marginRight: '1rem' }}>← Ana Sayfa</a>
        <a href="/blog">Blog →</a>
      </nav>

      <h1>İletişim</h1>
      <p style={{ marginTop: '0.5rem', color: '#666', lineHeight: 1.6 }}>
        Widget tüm sayfalarda çalışır — tercihler localStorage'da saklanır
        ve sayfa geçişlerinde korunur.
      </p>

      <form
        style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        onSubmit={(e) => e.preventDefault()}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          <label htmlFor="name" style={{ fontWeight: 600 }}>Ad Soyad</label>
          <input
            id="name"
            type="text"
            placeholder="Adınızı girin"
            style={{ padding: '0.625rem', border: '1px solid #d4d4d4', borderRadius: 6, fontSize: 14 }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          <label htmlFor="email" style={{ fontWeight: 600 }}>E-posta</label>
          <input
            id="email"
            type="email"
            placeholder="email@ornek.com"
            style={{ padding: '0.625rem', border: '1px solid #d4d4d4', borderRadius: 6, fontSize: 14 }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          <label htmlFor="message" style={{ fontWeight: 600 }}>Mesaj</label>
          <textarea
            id="message"
            rows={5}
            placeholder="Mesajınızı yazın..."
            style={{ padding: '0.625rem', border: '1px solid #d4d4d4', borderRadius: 6, fontSize: 14, resize: 'vertical' }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '0.75rem 1.5rem',
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            fontWeight: 600,
            fontSize: 14,
            cursor: 'pointer',
            alignSelf: 'flex-start',
          }}
        >
          Gönder
        </button>
      </form>
    </main>
  );
}
