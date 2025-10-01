export default function Page(){
  return (
    <>
      <section className="hero">
        <h2>Kitaptan oyuna, oyundan öğrenmeye</h2>
        <p>Seçtiğin kitabın içinden mini oyunlara geç.</p>
      </section>
      
      <section className="featured-book">
        <div className="book-cover">
          <img src="/img/oyunlarla-satranc-4228-9.webp" alt="Oyunlarla Satranç - Ozan ÇAPAN" className="book-image" />
          <div className="book-badge">Yeni!</div>
        </div>
        <div className="book-info">
          <h3>Oyunlarla Satranç</h3>
          <p className="author">Ozan ÇAPAN</p>
          <p className="description">Satranç taşlarını eğlenceli karakterler olarak tanıyın! Koyunlar ve Kurt senaryolarıyla strateji geliştirin.</p>
          <div className="book-features">
            <span className="feature">🎮 İnteraktif Oyunlar</span>
            <span className="feature">📚 Eğitici İçerik</span>
            <span className="feature">👶 Çocuk Dostu</span>
          </div>
          <a className="cta primary" href="/kitaplar/satranc">Kitabı İncele</a>
          <a className="cta secondary" href="/oyunlar/kurt-vs-koyunlar">Kurt vs Koyunlar</a>
          <a className="cta secondary" href="/oyunlar/hirsiz-polis">Hırsız & Polis</a>
        </div>
      </section>

      <section className="featured-book">
        <div className="book-cover">
          <img src="/img/hava-4a9c-b724-.jpg" alt="Hava Olayları - Doğa Bilimci" className="book-image" />
          <div className="book-badge">Yeni!</div>
        </div>
        <div className="book-info">
          <h3>Hava Olayları</h3>
          <p className="author">Doğa Bilimci</p>
          <p className="description">Havanın sırlarını keşfet! Yağmur, rüzgar, gökkuşağı ve fırtına oluşumunu eğlenceli oyunlarla öğren.</p>
          <div className="book-features">
            <span className="feature">🌧️ İnteraktif Oyunlar</span>
            <span className="feature">🔬 Bilimsel Bilgiler</span>
            <span className="feature">👶 Çocuk Dostu</span>
          </div>
          <a className="cta primary" href="/kitaplar/hava-olaylari">Kitabı İncele</a>
          <a className="cta secondary" href="/oyunlar/yagmur-bulutu">Yağmur Bulutu</a>
          <a className="cta secondary" href="/oyunlar/ruzgar-yonu">Rüzgar Yönü</a>
          <a className="cta secondary" href="/oyunlar/gokkusagi-renkleri">Gökkuşağı</a>
          <a className="cta secondary" href="/oyunlar/firtina-simulatoru">Fırtına Simülatörü</a>
          <a className="cta secondary" href="/oyunlar/sicaklik-termometresi">Termometre</a>
        </div>
      </section>

      <section className="other-books">
        <h3>Diğer Kitaplar</h3>
        <div className="card-grid">
          <article className="card">
            <img src="/img/atalarımızdan dersler.jpg" alt="Atalarımızdan Dersler" style={{width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem'}} />
            <h4>Atalarımızdan Dersler</h4>
            <p>Arkeolojik kalıntılarla tarihi uygarlıkları keşfet!</p>
            <div className="card-actions">
              <a href="/kitaplar/atalarimizdan-dersler" className="cta">Kitabı İncele</a>
            </div>
          </article>
          <article className="card">
            <img src="/img/benim-kucuk-deneylerim-mekanik...-5-4bcd.jpg" alt="Benim Küçük Deneylerim" style={{width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem'}} />
            <h4>Benim Küçük Deneylerim</h4>
            <p>Mekanik prensipleri eğlenceli deneylerle öğren!</p>
            <a href="/kitaplar/benim-kucuk-deneylerim" className="cta">Kitabı İncele</a>
          </article>
          <article className="card">
            <img src="/img/tatil kitabı.jpg" alt="Tatilde 50 Macera" style={{width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem'}} />
            <h4>Tatilde 50 Macera</h4>
            <p>13 yaşına gelmeden yaşanacak tatil maceraları!</p>
            <a href="/kitaplar/tatilde-50-macera" className="cta">Kitabı İncele</a>
          </article>
          <article className="card coming-soon">
            <h4>Renklerle Matematik</h4>
            <p>Renkli oyunlarla sayılar ve işlemler.</p>
            <span className="coming-badge">Yakında</span>
          </article>
          <article className="card coming-soon">
            <h4>Masal Labirenti</h4>
            <p>Masal kahramanını güvenle çıkışa ulaştır.</p>
            <span className="coming-badge">Yakında</span>
          </article>
        </div>
      </section>
    </>
  );
}


