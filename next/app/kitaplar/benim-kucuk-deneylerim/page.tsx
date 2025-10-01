export default function BenimKucukDeneylerimPage(){
  return (
    <>
      <div className="hero">
        <h2>🔬 Benim Küçük Deneylerim</h2>
        <p>Mekanik prensipleri eğlenceli deneylerle öğren!</p>
      </div>
      
      <div className="book-info-section">
        <div className="book-cover-large">
          <img src="/img/benim-kucuk-deneylerim-mekanik...-5-4bcd.jpg" alt="Benim Küçük Deneylerim - Mekanik Prensipler" className="book-cover-image" />
          <h3>Benim Küçük Deneylerim</h3>
          <p className="author">Bilim Öğretmeni</p>
        </div>
        <div className="book-description">
          <p>Hava basıncı, yüzdürme, aerodinamik ve yapı mühendisliği! Bu kitapta çocukların yapabileceği basit ama etkileyici deneyler var!</p>
          <div className="book-features">
            <span className="feature">🔬 İnteraktif Deneyler</span>
            <span className="feature">⚗️ Bilimsel Prensipler</span>
            <span className="feature">👶 Çocuk Dostu</span>
          </div>
        </div>
      </div>
      
      <div className="experiments-section">
        <h2>🧪 Deneyler</h2>
        <div className="experiments-grid">
          <div className="experiment-card">
            <div className="experiment-icon">🎈</div>
            <h3>Fırlayan Balon <span className="page-number">Sayfa 8</span></h3>
            <p>Hava basıncı ile balonu fırlat! İtme kuvvetini öğren!</p>
            <a href="/oyunlar/firlayan-balon" className="play-btn">Dene</a>
          </div>
          
          <div className="experiment-card">
            <div className="experiment-icon">🚢</div>
            <h3>Su Gemisi <span className="page-number">Sayfa 10</span></h3>
            <p>Gemini suda yüzdür! Yüzdürme prensibini keşfet!</p>
            <a href="/oyunlar/su-gemisi" className="play-btn">Dene</a>
          </div>
          
          <div className="experiment-card">
            <div className="experiment-icon">🌉</div>
            <h3>Asma Köprü <span className="page-number">Sayfa 18</span></h3>
            <p>Köprü inşa et! Yapı mühendisliğini keşfet!</p>
            <a href="/oyunlar/asma-kopru" className="play-btn">Dene</a>
          </div>
        </div>
      </div>
    </>
  );
}
