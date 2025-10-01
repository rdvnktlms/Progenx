export default function Tatilde50MaceraPage(){
  return (
    <>
      <div className="hero">
        <h2>🗺️ Tatilde 50 Macera</h2>
        <p>13 yaşına gelmeden yaşanacak tatil maceraları!</p>
      </div>
      
      <div className="book-info-section">
        <div className="book-cover-large">
          <img src="/img/tatil kitabı.jpg" alt="Tatilde 50 Macera" className="book-cover-image" />
          <h3>Tatilde 50 Macera</h3>
          <p className="author">Pierdomenico Baccalario & Lucia Stipari</p>
        </div>
        <div className="book-description">
          <p>Macera dolu tatil aktiviteleri! Harita çizme, sırt çantası hazırlama ve daha birçok eğlenceli aktivite ile tatilinizi unutulmaz kılın!</p>
          <div className="book-features">
            <span className="feature">🗺️ İnteraktif Harita</span>
            <span className="feature">🎒 Çanta Hazırlama</span>
            <span className="feature">🏖️ Tatil Aktiviteleri</span>
          </div>
        </div>
      </div>
      
      <div className="experiments-section">
        <h2>🎮 Macera Aktiviteleri</h2>
        <div className="experiments-grid">
          <div className="experiment-card">
            <div className="experiment-icon">🎒</div>
            <h3>Sırt Çantası Hazırlama <span className="page-number">Macera 2, Sayfa 21</span></h3>
            <p>Sadece gerekli eşyaları seç ve doğru ağırlıkta hazırla!</p>
            <a href="/oyunlar/sirt-cantasi" className="play-btn">Dene</a>
          </div>
          
          <div className="experiment-card">
            <div className="experiment-icon">🗺️</div>
            <h3>Tatil Haritası Çizme <span className="page-number">Macera 4, Sayfa 28</span></h3>
            <p>Önemli yerleri ve hayalî karakterleri haritana ekle!</p>
            <a href="/oyunlar/tatil-haritasi" className="play-btn">Dene</a>
          </div>
        </div>
      </div>
    </>
  );
}
