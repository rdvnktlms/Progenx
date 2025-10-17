"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { verifyKey, getBookTitle, isValidKeyFormat } from '../../utils/keySystem';

export default function SatranctaTasAlisverisiPage(){
  const { user } = useAuth();
  const [keyInput, setKeyInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');
  const [hasBookAccess, setHasBookAccess] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const bookId = 'satrancta-tas-alisverisi';

  useEffect(() => {
    setIsClient(true);
    if (user) {
      const userBooks = JSON.parse(localStorage.getItem('userBooks') || '[]');
      const hasBook = userBooks.some((book: any) => book.id === bookId);
      setHasBookAccess(hasBook);
    }
  }, [user, bookId]);

  const handleKeyVerification = async () => {
    if (!user) {
      setVerificationMessage('Lütfen önce giriş yapın!');
      return;
    }

    if (!keyInput.trim()) {
      setVerificationMessage('Lütfen key girin!');
      return;
    }

    // Key formatını kontrol et
    if (!isValidKeyFormat(keyInput)) {
      setVerificationMessage('❌ Geçersiz key formatı! Format: XXXX-XXXX-XXXX-XXXX');
      return;
    }

    setIsVerifying(true);
    setVerificationMessage('');

    setTimeout(() => {
      // Gerçek key doğrulama
      const isValid = verifyKey(keyInput, bookId);
      
      if (isValid) {
        setVerificationMessage('✅ Key başarıyla doğrulandı! Kitaba erişim kazandınız.');
        // Kullanıcının kitaplarına ekle
        const userBooks = JSON.parse(localStorage.getItem('userBooks') || '[]');
        const newBook = {
          id: bookId,
          title: getBookTitle(bookId),
          purchaseDate: new Date().toISOString()
        };
        userBooks.push(newBook);
        localStorage.setItem('userBooks', JSON.stringify(userBooks));
        setHasBookAccess(true);
        setKeyInput('');
        // Sayfayı yenile
        window.location.reload();
      } else {
        setVerificationMessage('❌ Geçersiz key! Bu kitap için doğru keyi girin.');
      }
      
      setIsVerifying(false);
    }, 1000);
  };

  if (!isClient) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontSize: '1.2rem' }}>
        <div className="loading-spinner"></div>
        <p style={{ marginLeft: '10px' }}>Yükleniyor...</p>
      </div>
    );
  }

  return (
    <>
      <div className="hero">
        <h2>♟️ Satrançta Taş Alışverişi</h2>
        <p>Doğru taş alışverişi tekniklerini öğren ve satranç becerilerini geliştir!</p>
      </div>
      
      <div className="book-info-section">
        <div className="book-cover-large">
          <img src="/img/Satrançta Taş Alışverişi.jpeg" alt="Satrançta Taş Alışverişi - Ozan ÇAPAN" className="book-cover-image" />
          <h3>Satrançta Taş Alışverişi</h3>
          <p className="author">Ozan ÇAPAN</p>
        </div>
        <div className="book-description">
          <p>
            Bu kitap ile "doğru taş alışverişi"ni her yönüyle inceleyebilir, 
            bu gibi konumlarda nasıl düşünülmesi gerektiğini öğrenebilirsiniz. 
            Hesaplama yapabilmenin taktik temalardan bağımsız olarak incelendiği bu kitapta, 
            taş alışları ile hesaplama yöntemi örneklerle ve uygulanabilir bir sistem anlayışıyla anlatılmaktadır.
          </p>
          <div className="book-features">
            <span className="feature">♟️ Taş Alışverişi</span>
            <span className="feature">🧮 Hesaplama</span>
            <span className="feature">🎯 Strateji</span>
          </div>
          
          {/* Satın Al Butonu */}
          <div className="purchase-section">
            <a 
              href="https://odtuyayincilik.com.tr/cocuklar-icin-satrancta-tas-alisverisi-128?srsltid=AfmBOoptXn_SdOJcdSJnwit_sxb-bz3AoyTiDCJ-zpAYiQtOlA5eDpYo" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="cta-button purchase-btn"
            >
              📚 Kitabı Satın Al - ODTÜ Yayıncılık
            </a>
          </div>
        </div>
      </div>

      {/* Key Girişi Alanı - Kitaba sahip değilse görünür */}
      {!hasBookAccess && (
        <div className="key-section">
          <div className="key-container">
            <h3>🔑 Kitap Key'i Girin</h3>
            <p>Bu kitaba tam erişim sağlamak için lütfen keyinizi girin.</p>
            
            <div className="key-input-group">
              <input
                type="text"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value.toUpperCase())}
                placeholder="XXXX-XXXX-XXXX-XXXX"
                className="key-input"
                maxLength={19}
              />
              <button
                onClick={handleKeyVerification}
                disabled={isVerifying || !keyInput.trim()}
                className="key-button"
              >
                {isVerifying ? 'Doğrulanıyor...' : 'Doğrula'}
              </button>
            </div>
            
            {verificationMessage && (
              <div className={`verification-message ${verificationMessage.includes('✅') ? 'success' : 'error'}`}>
                {verificationMessage}
              </div>
            )}
            
            <div className="key-help">
              <p>💡 Key'i nereden bulabilirim?</p>
              <ul>
                <li>Kitabın arka kapağında QR kod tarayın</li>
                <li>Kitap içindeki key bölümünü kontrol edin</li>
                <li>Satın alma e-postanızda key bilgisi bulunur</li>
              </ul>
            </div>
          </div>
        </div>
      )}
      
      {/* İçerik Bölümü - Kitaba sahipse görünür */}
      {hasBookAccess && (
        <div className="content-section">
          <h2>📖 Kitap İçeriği</h2>
          
          <section className="interactive-section">
            <h3>🎯 Konu 1: Boştaki Taşı Bulmak</h3>
            <p>
              Satrançta en önemli becerilerden biri, rakibin hangi taşlarının savunmasız olduğunu 
              görebilmektir. Bu konuda boştaki taşları nasıl tespit edeceğinizi ve bu fırsatları 
              nasıl değerlendireceğinizi öğreneceksiniz.
            </p>
            <div className="topic-features">
              <span className="feature-tag">🔍 Taş Tespiti</span>
              <span className="feature-tag">⚡ Hızlı Analiz</span>
              <span className="feature-tag">🎯 Fırsat Değerlendirme</span>
            </div>
            <a href="/oyunlar/satrancta-tas-alisverisi-konu1" className="cta-button">
              🎮 Konu 1 Antrenmanlarını Başlat
            </a>
          </section>

          <section className="interactive-section">
            <h3>⚖️ Konu 2: Taşların Değerinin Farkına Varmak</h3>
            <p>
              Her satranç taşının farklı bir değeri vardır. Bu konuda taşların değerlerini 
              öğrenecek ve hangi taş alışverişlerinin avantajlı olduğunu nasıl hesaplayacağınızı 
              keşfedeceksiniz.
            </p>
            <div className="topic-features">
              <span className="feature-tag">💰 Taş Değerleri</span>
              <span className="feature-tag">🧮 Matematiksel Hesaplama</span>
              <span className="feature-tag">⚖️ Avantaj Analizi</span>
            </div>
            <a href="/oyunlar/satrancta-tas-alisverisi-konu2" className="cta-button">
              🎮 Konu 2 Antrenmanlarını Başlat
            </a>
          </section>

          <section className="coming-soon-section">
            <h3>🚧 Yakında Gelecek Konular</h3>
            <div className="coming-topics">
              <div className="topic-preview">
                <h4>🏆 Konu 3: Kalite Kazancı</h4>
                <p>Kalite farkı yaratma teknikleri</p>
              </div>
              <div className="topic-preview">
                <h4>⚔️ Konu 4: Saldıran ve Savunma Yapan Taşları Sayabilmek</h4>
                <p>Taşların rollerini analiz etme</p>
              </div>
              <div className="topic-preview">
                <h4>⚠️ Konu 5: Tehdide Dikkat Ederek Taş Alışı</h4>
                <p>Güvenli taş alışverişi teknikleri</p>
              </div>
              <div className="topic-preview">
                <h4>⏰ Konu 6: Tempoyla Taş Alışını Hesaplayabilmek</h4>
                <p>Zaman faktörünü değerlendirme</p>
              </div>
              <div className="topic-preview">
                <h4>🎯 Konu 7: Doğru Taşla Alış Yapabilmek</h4>
                <p>En uygun taş seçimi</p>
              </div>
            </div>
          </section>
        </div>
      )}

      <div className="book-actions">
        <a href="/" className="cta primary">Ana Sayfaya Dön</a>
        <a href="/kitaplar" className="cta secondary">Diğer Kitaplar</a>
      </div>
    </>
  );
}
