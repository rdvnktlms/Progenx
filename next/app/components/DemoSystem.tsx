"use client";
import { useDemoSystem } from '../hooks/useDemoSystem';
import { getBookTitle } from '../utils/keySystem';

interface DemoSystemProps {
  gameId: string;
  children: React.ReactNode;
}

export const DemoSystem = ({ gameId, children }: DemoSystemProps) => {
  const { 
    accessLevel, 
    demoStatus, 
    timeLeft, 
    isPlaying, 
    startDemo, 
    stopDemo 
  } = useDemoSystem(gameId);

  if (!accessLevel) {
    return <div className="loading-spinner">Yükleniyor...</div>;
  }

  // Misafir kullanıcı
  if (!accessLevel.canPlay && accessLevel.reason === 'Giriş yapmalısınız') {
    return <GuestUserPage />;
  }

  // Demo süresi dolmuş
  if (!accessLevel.canPlay && accessLevel.reason === 'Demo hakkınız kullanılmış') {
    return <DemoExpiredPage bookId={gameId} />;
  }

  // Demo erişimi
  if (accessLevel.canPlay && accessLevel.timeLeft) {
    return (
      <BookDemoPage 
        gameId={gameId}
        bookId={gameId}
        timeLeft={timeLeft}
        isPlaying={isPlaying}
        onStartDemo={startDemo}
        onStopDemo={stopDemo}
      />
    );
  }

  // Tam erişim
  return <>{children}</>;
};

const GuestUserPage = () => (
  <div className="guest-restriction">
    <div className="restriction-card">
      <div className="restriction-icon">🔒</div>
      <h2>Oyunlara Erişim İçin Kitap Gerekli</h2>
      <p>
        Etkileşimli oyunları kullanmak için en az bir kitap satın almalısınız.
        Bu sayede hem kitabınızı okuyabilir hem de oyunları deneyimleyebilirsiniz!
      </p>
      
      <div className="book-showcase">
        <h3>Önerilen Kitaplar:</h3>
        <div className="book-grid">
          <div className="book-card">
            <h4>📚 Hava Olayları</h4>
            <p>Rüzgar, yağmur, gökkuşağı deneyimleri</p>
          </div>
          <div className="book-card">
            <h4>🧪 Benim Küçük Deneylerim</h4>
            <p>Fizik ve kimya deneyleri</p>
          </div>
        </div>
      </div>
      
      <div className="cta-section">
        <button className="primary-cta">
          📚 İlk Kitabımı Satın Al
        </button>
        <p className="cta-subtitle">
          Satın aldıktan sonra tüm oyunlara erişim kazanacaksınız!
        </p>
      </div>
    </div>
  </div>
);

const DemoExpiredPage = ({ bookId }: { bookId: string }) => {
  const handleRedirectToBook = () => {
    // Kitap sayfasına yönlendir
    const bookPages: Record<string, string> = {
      'hava-olaylari': '/kitaplar/hava-olaylari',
      'benim-kucuk-deneylerim': '/kitaplar/benim-kucuk-deneylerim',
      'tatilde-50-macera': '/kitaplar/tatilde-50-macera',
      'atalarimizdan-dersler': '/kitaplar/atalarimizdan-dersler',
      'satranc': '/kitaplar/satranc'
    };
    
    const bookPage = bookPages[bookId];
    if (bookPage) {
      window.location.href = bookPage;
    }
  };

  return (
    <div className="demo-expired">
      <h4>⏰ Günlük Demo Süreniz Doldu</h4>
      <p>
        <strong>{getBookTitle(bookId)}</strong> kitabı için günlük demo süreniz doldu. 
        Tam erişim için kitabı satın alın veya yarın tekrar deneyin!
      </p>
      <div className="demo-expired-actions">
        <button className="purchase-btn" onClick={handleRedirectToBook}>
          📚 {getBookTitle(bookId)} Kitabını İncele
        </button>
        <button className="retry-btn" onClick={() => window.location.reload()}>
          🔄 Sayfayı Yenile
        </button>
      </div>
    </div>
  );
};

interface BookDemoPageProps {
  gameId: string;
  bookId: string;
  timeLeft: number;
  isPlaying: boolean;
  onStartDemo: () => void;
  onStopDemo: () => void;
}

const BookDemoPage = ({ 
  gameId, 
  bookId, 
  timeLeft, 
  isPlaying, 
  onStartDemo, 
  onStopDemo 
}: BookDemoPageProps) => (
  <div className="book-demo-container">
    <div className="demo-header">
      <div className="book-info">
        <h3>📚 {getBookTitle(bookId)} - Demo</h3>
        <p>Bu kitap için günlük demo süreniz: {timeLeft} saniye</p>
      </div>
      
      <div className="demo-controls">
        {!isPlaying ? (
          <button 
            className="start-demo-btn"
            onClick={onStartDemo}
            disabled={timeLeft <= 0}
          >
            ▶️ Demo Başlat
          </button>
        ) : (
          <button className="stop-demo-btn" onClick={onStopDemo}>
            ⏹️ Demo Durdur
          </button>
        )}
      </div>
    </div>
    
    {isPlaying && (
      <div className="demo-game">
        <div className="demo-timer">
          ⏱️ Kalan: {timeLeft}s
        </div>
        <div className="game-content">
          {/* Burada oyun içeriği render edilecek */}
          <p>🎮 Demo oyunu burada çalışacak...</p>
        </div>
      </div>
    )}
    
    {timeLeft <= 0 && !isPlaying && (
      <div className="demo-expired">
        <h4>⏰ Günlük Demo Süreniz Doldu</h4>
        <p>Tam erişim için kitabı satın alın veya yarın tekrar deneyin!</p>
        <button className="purchase-btn">
          📚 {getBookTitle(bookId)} Satın Al
        </button>
      </div>
    )}
  </div>
);
