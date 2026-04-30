// Phase 10 — Next.js 15 App Router demo: HomePage.
//
// `'use client'` yönergesi yalnızca `useEffect` ile `blakfy:a11y:ready`
// custom event'ini dinleyebilmek ve `window.BlakfyA11y` global'ine
// erişebilmek için gerekli. Layout sunucu bileşeni olarak kalır.
'use client';

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [version, setVersion] = useState<string>('—');

  useEffect(() => {
    // Widget mount sonrası version property'si dolar.
    const handler = (): void => {
      const w = window as unknown as { BlakfyA11y?: { version?: string } };
      setVersion(w.BlakfyA11y?.version ?? '—');
    };
    window.addEventListener('blakfy:a11y:ready', handler);
    handler();
    return () => window.removeEventListener('blakfy:a11y:ready', handler);
  }, []);

  // Programatik aç — footer link / button tarafından çağrılır.
  const openPanel = (): void => {
    const w = window as unknown as { BlakfyA11y?: { open?: () => void } };
    w.BlakfyA11y?.open?.();
  };

  return (
    <main className="container">
      <h1>Blakfy Accessibility Widget Demo</h1>
      <p className="lead">
        Bu sayfa Next.js 15 App Router üzerinde widget&apos;ın canlı
        demosudur.
      </p>

      <section>
        <h2>Widget Durumu</h2>
        <dl>
          <dt>Sürüm</dt>
          <dd>{version}</dd>
          <dt>Konum</dt>
          <dd>Sol-alt FAB butonu</dd>
          <dt>Marka</dt>
          <dd>Sağ-alt &ldquo;Powered by Blakfy Studio&rdquo;</dd>
        </dl>
      </section>

      <section>
        <h2>Nasıl Test Edilir?</h2>
        <ol>
          <li>
            Sol-altta erişilebilirlik FAB butonunu tıklayın (veya{' '}
            <kbd>Alt</kbd> + <kbd>0</kbd>)
          </li>
          <li>Panel açılır, 7 tercih kontrolü görünür</li>
          <li>
            Bir tercih değiştirin — sayfa anında uygular, refresh sonrası
            korur
          </li>
          <li>Reset butonu iki kere tıklayınca defaultlara döner</li>
        </ol>
      </section>

      <section>
        <h2>Programatik Açma</h2>
        <p>Footer linkleri için:</p>
        <button type="button" onClick={openPanel}>
          Erişilebilirlik Tercihleri
        </button>
      </section>

      <section>
        <h2>Tanı Bilgisi</h2>
        <p>DevTools console&apos;unda:</p>
        <pre>
          <code>window.BlakfyA11y.diagnostics()</code>
        </pre>
      </section>

      <section>
        <h2>Örnek İçerik</h2>
        <p>
          Bu paragraf yazı ölçeği 110% veya 125%&apos;e çıkarıldığında
          büyür. Tercih widget üzerinden yapılır.
        </p>
        <p>
          Yüksek kontrast modu açılırsa siyah-beyaz palet uygulanır.
          Linkler sarı olur: <a href="#ornek">örnek link</a>.
        </p>
        <p>
          Disleksi font modunda OpenDyslexic font kullanılır (CDN
          yüklüyse).
        </p>
      </section>

      <footer>
        <button type="button" onClick={openPanel}>
          Erişilebilirlik
        </button>
      </footer>
    </main>
  );
}
