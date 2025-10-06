"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { verifyKey, getBookTitle, isValidKeyFormat } from '../../utils/keySystem';
import { recordPageView } from '../../utils/analytics';

export default function BenimKucukDeneylerimPage(){
  const { user } = useAuth();
  const [keyInput, setKeyInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');
  const [hasBookAccess, setHasBookAccess] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const bookId = 'benim-kucuk-deneylerim';

  useEffect(() => {
    setIsClient(true);
    if (user) {
      const userBooks = JSON.parse(localStorage.getItem('userBooks') || '[]');
      const hasBook = userBooks.some((book: any) => book.id === bookId);
      setHasBookAccess(hasBook);
    }
    
    // Sayfa görüntüleme kaydı
    recordPageView('/kitaplar/benim-kucuk-deneylerim', user?.email || 'guest', 0);
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
        <h2>🔬 Benim Küçük Deneylerim</h2>
        <p>Eğlenceli deneyler ve oyunlarla bilimi keşfedin!</p>
      </div>
      
      <div className="book-info-section">
        <div className="book-cover-large">
          <img src="/img/benim-kucuk-deneylerim-mekanik...-5-4bcd.jpg" alt="Benim Küçük Deneylerim - Melanie PEREZ" className="book-cover-image" />
          <h3>Benim Küçük Deneylerim</h3>
          <p className="author">Melanie PEREZ</p>
        </div>
        <div className="book-description">
          <p>Mekanik prensipleri eğlenceli deneylerle öğren! Balon, gemi ve köprü deneyleriyle bilimin sırlarını keşfet.</p>
          <div className="book-features">
            <span className="feature">🔬 Bilim Deneyleri</span>
            <span className="feature">🎈 Eğlenceli Aktiviteler</span>
            <span className="feature">👶 Çocuk Dostu</span>
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
                placeholder="XXXX-XXXX-XXXX"
                className="key-input"
                maxLength={14}
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

      <div className="experiments-section">
        <h2>🧪 Bilim Deneyleri</h2>
        <div className="experiments-grid">
          <div className="experiment-card">
            <div className="experiment-icon">🎈</div>
            <h3>Fırlayan Balon <span className="page-number">Sayfa 8</span></h3>
            <p>Balon ve ip ile eğlenceli bir deney yapın!</p>
            <a href="/oyunlar/firlayan-balon" className="play-btn">Dene</a>
          </div>
          
          <div className="experiment-card">
            <div className="experiment-icon">🚢</div>
            <h3>Su Gemisi <span className="page-number">Sayfa 10</span></h3>
            <p>Su ile çalışan bir gemi yapın!</p>
            <a href="/oyunlar/su-gemisi" className="play-btn">Dene</a>
          </div>
          
          <div className="experiment-card">
            <div className="experiment-icon">🌉</div>
            <h3>Asma Köprü <span className="page-number">Sayfa 18</span></h3>
            <p>Kendi asma köprünüzü inşa edin!</p>
            <a href="/oyunlar/asma-kopru" className="play-btn">Dene</a>
          </div>
        </div>
      </div>
    </>
  );
}