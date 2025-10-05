"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { verifyKey, getBookTitle, isValidKeyFormat } from '../../utils/keySystem';

export default function OyunlarlaSatrancPage(){
  const { user } = useAuth();
  const [keyInput, setKeyInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');
  const [hasBookAccess, setHasBookAccess] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const bookId = 'oyunlarla-satranc';

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
        <h2>♟️ Oyunlarla Satranç</h2>
        <p>Koyunlar ve Kurt, Hırsız ve Polis ile eğitici mini oyunlar.</p>
      </div>
      
      <div className="book-info-section">
        <div className="book-cover-large">
          <img src="/img/oyunlarla-satranc-4228-9.webp" alt="Oyunlarla Satranç - Ozan ÇAPAN" className="book-cover-image" />
          <h3>Oyunlarla Satranç</h3>
          <p className="author">Ozan ÇAPAN</p>
        </div>
        <div className="book-description">
          <p>Satranç taşlarını eğlenceli oyunlarla öğren! Koyunlar ve Kurt, Hırsız ve Polis gibi mini oyunlarla satranç kurallarını keşfet.</p>
          <div className="book-features">
            <span className="feature">♟️ Satranç Öğrenimi</span>
            <span className="feature">🎮 Eğlenceli Oyunlar</span>
            <span className="feature">🧠 Stratejik Düşünme</span>
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
      
      <div className="games-section">
        <h2>🎮 Satranç Oyunları</h2>
        <div className="games-grid">
          <div className="game-card">
            <div className="game-icon">👮🏃</div>
            <h3>Hırsız & Polis <span className="page-number">Sayfa 49</span></h3>
            <p>Polis olarak hırsızları yakalayın veya hırsız olarak kaçmaya çalışın!</p>
            <a href="/oyunlar/hirsiz-polis" className="play-btn">Oyna</a>
          </div>
          
          <div className="game-card">
            <div className="game-icon">🐑🐺</div>
            <h3>Kurt vs Koyunlar <span className="page-number">Sayfa 59</span></h3>
            <p>1 Kurt vs 8 Koyun – Koyunlar en üste ulaşmaya çalışırken kurdu yakalamaya çalışın!</p>
            <a href="/oyunlar/kurt-vs-koyunlar" className="play-btn">Oyna</a>
          </div>
        </div>
      </div>
    </>
  );
}