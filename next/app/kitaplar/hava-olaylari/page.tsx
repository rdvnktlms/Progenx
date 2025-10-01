export default function HavaOlaylariPage(){
  return (
    <>
      <div className="hero">
        <h2>🌤️ Hava Olayları</h2>
        <p>Havanın sırlarını keşfet, eğlenceli oyunlarla öğren!</p>
      </div>
      
      <div className="book-info-section">
        <div className="book-cover-large">
          <img src="/img/hava-4a9c-b724-.jpg" alt="Hava Olayları - Doğa Bilimci" className="book-cover-image" />
          <h3>Hava Olayları</h3>
          <p className="author">Doğa Bilimci</p>
        </div>
        <div className="book-description">
          <p>Havanın içerisinde ne var? Yağmur nasıl oluşur? Rüzgar nereden gelir? Bu eğlenceli kitapta hava olaylarının sırlarını keşfedeceksin!</p>
          <div className="book-features">
            <span className="feature">🌧️ İnteraktif Oyunlar</span>
            <span className="feature">🔬 Bilimsel Bilgiler</span>
            <span className="feature">👶 Çocuk Dostu</span>
          </div>
        </div>
      </div>
      
      <div className="games-section">
        <h2>🎮 Hava Oyunları</h2>
        <div className="games-grid">
          <div className="game-card">
            <div className="game-icon">🌪️</div>
            <h3>Rüzgar Yönü <span className="page-number">Sayfa 8</span></h3>
            <p>Rüzgarın yönünü doğru tahmin et!</p>
            <a href="/oyunlar/ruzgar-yonu" className="play-btn">Oyna</a>
          </div>
          
          <div className="game-card">
            <div className="game-icon">🌧️</div>
            <h3>Yağmur Bulutu <span className="page-number">Sayfa 14</span></h3>
            <p>Su damlalarını bulutlardan yere düşür!</p>
            <a href="/oyunlar/yagmur-bulutu" className="play-btn">Oyna</a>
          </div>
          
          <div className="game-card">
            <div className="game-icon">🌈</div>
            <h3>Gökkuşağı Renkleri <span className="page-number">Sayfa 18</span></h3>
            <p>Gökkuşağının renklerini doğru sıraya koy!</p>
            <a href="/oyunlar/gokkusagi-renkleri" className="play-btn">Oyna</a>
          </div>
          
          <div className="game-card">
            <div className="game-icon">⚡</div>
            <h3>Fırtına Simülatörü <span className="page-number">Sayfa 24</span></h3>
            <p>Fırtına oluşturmak için elementleri seç!</p>
            <a href="/oyunlar/firtina-simulatoru" className="play-btn">Oyna</a>
          </div>
          
          <div className="game-card">
            <div className="game-icon">🌡️</div>
            <h3>Sıcaklık Termometresi <span className="page-number">Sayfa 36</span></h3>
            <p>Hava durumuna göre sıcaklık ayarla!</p>
            <a href="/oyunlar/sicaklik-termometresi" className="play-btn">Oyna</a>
          </div>
        </div>
      </div>
    </>
  );
}
