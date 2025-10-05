"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { checkDemoSession, startDemoSession, endDemoSession, hasUsedDemo } from './demoSystem';
import { verifyKey, getBookTitle, isValidKeyFormat } from './keySystem';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredBookId?: string;
  gameId?: string;
}

export default function AuthGuard({ children, requiredBookId, gameId }: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isChecking, setIsChecking] = useState(true);
  const [keyInput, setKeyInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');

  useEffect(() => {
    // Client-side kontrolü
    if (typeof window === 'undefined') return;

    const checkAccess = () => {
      console.log('AuthGuard: Checking access...', { 
        user: user?.email, 
        requiredBookId, 
        gameId,
        isLoading,
        showDemoModal,
        isAuthorized,
        isChecking
      });

      // Kullanıcı giriş yapmamışsa
      if (!user) {
        console.log('AuthGuard: No user, redirecting to login');
        router.push('/giris');
        return;
      }

      // Kitap kontrolü gerekliyse
      if (requiredBookId) {
        const userBooks = JSON.parse(localStorage.getItem('userBooks') || '[]');
        const hasBook = userBooks.some((book: any) => book.id === requiredBookId);
        
        console.log('AuthGuard: Book check', { userBooks, hasBook, requiredBookId });
        
        if (hasBook) {
          console.log('AuthGuard: User has book, access granted');
          setIsAuthorized(true);
          setIsChecking(false);
          return;
        } else {
          // Kitaba sahip değil, demo kontrolü yap
          if (requiredBookId) {
            const hasUsedDemoBefore = hasUsedDemo(requiredBookId, user.id.toString());
            console.log('AuthGuard: Demo check', { hasUsedDemoBefore });
            
            if (hasUsedDemoBefore) {
              // Demo zaten kullanılmış, key giriş ekranı göster
              console.log('AuthGuard: Demo already used, showing key modal');
              setShowKeyModal(true);
              setIsChecking(false);
              return;
            } else {
              // Demo kullanılmamış, demo modal göster
              console.log('AuthGuard: Demo available, showing demo modal');
              setShowDemoModal(true);
              setIsChecking(false);
              return;
            }
          } else {
            console.log('AuthGuard: No book access, redirecting to book page');
            router.push(`/kitaplar/${requiredBookId}`);
            return;
          }
        }
      }

      // Kitap kontrolü gerekmiyorsa
      console.log('AuthGuard: No book required, access granted');
      setIsAuthorized(true);
      setIsChecking(false);
    };

    // Kısa bir gecikme ile kontrol et
    const timer = setTimeout(() => {
      checkAccess();
    }, 100);

    return () => clearTimeout(timer);
  }, [user, isLoading, requiredBookId, gameId, router]);

  // Demo süresi kontrolü
  useEffect(() => {
    if (requiredBookId && isAuthorized && timeLeft > 0 && user) {
      const interval = setInterval(() => {
        const demoCheck = checkDemoSession(requiredBookId, user.id.toString());
        if (demoCheck.canPlay) {
          setTimeLeft(demoCheck.timeLeft);
        } else {
          // Demo süresi bitti
          endDemoSession(requiredBookId);
          setIsAuthorized(false);
          if (requiredBookId) {
            router.push(`/kitaplar/${requiredBookId}`);
          }
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [requiredBookId, isAuthorized, timeLeft, router, user]);

  const startDemo = () => {
    console.log('Starting demo for book:', requiredBookId, 'user:', user?.id);
    if (requiredBookId && user && startDemoSession(requiredBookId, user.id.toString())) {
      setShowDemoModal(false);
      setIsAuthorized(true);
      setIsChecking(false);
      const demoCheck = checkDemoSession(requiredBookId, user.id.toString());
      setTimeLeft(demoCheck.timeLeft);
    } else {
      // Demo kullanılmış, kitap sayfasına yönlendir
      if (requiredBookId) {
        router.push(`/kitaplar/${requiredBookId}`);
      }
    }
  };

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
      const isValid = verifyKey(keyInput, requiredBookId || '');
      
      if (isValid) {
        setVerificationMessage('✅ Key başarıyla doğrulandı! Kitaba erişim kazandınız.');
        // Kullanıcının kitaplarına ekle
        const userBooks = JSON.parse(localStorage.getItem('userBooks') || '[]');
        const newBook = {
          id: requiredBookId,
          title: getBookTitle(requiredBookId || ''),
          purchaseDate: new Date().toISOString()
        };
        userBooks.push(newBook);
        localStorage.setItem('userBooks', JSON.stringify(userBooks));
        
        setShowKeyModal(false);
        setIsAuthorized(true);
        setIsChecking(false);
        setKeyInput('');
      } else {
        setVerificationMessage('❌ Geçersiz key! Bu kitap için doğru keyi girin.');
      }
      
      setIsVerifying(false);
    }, 1000);
  };

  const getBookTitle = (bookId: string) => {
    const titles: { [key: string]: string } = {
      'oyunlarla-satranc': 'Oyunlarla Satranç',
      'hava-olaylari': 'Hava Olayları',
      'benim-kucuk-deneylerim': 'Benim Küçük Deneylerim',
      'atalarimizdan-dersler': 'Atalarımızdan Dersler',
      'tatilde-50-macera': 'Tatilde 50 Macera'
    };
    return titles[bookId] || bookId;
  };

  // Key Modal - Demo hakkı yoksa key giriş ekranı
  if (showKeyModal) {
    console.log('AuthGuard: Rendering key modal', { showKeyModal, isAuthorized, isChecking });
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '40px',
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          maxWidth: '500px'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '20px'
          }}>🔑</div>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0 0 15px 0'
          }}>
            Key Girişi Gerekli
          </h2>
          <p style={{
            color: '#6b7280',
            fontSize: '1rem',
            margin: '0 0 25px 0',
            lineHeight: '1.6'
          }}>
            Bu kitap için demo hakkınız kullanılmış. Tam erişim için lütfen keyinizi girin.
          </p>
          
          <div style={{
            marginBottom: '20px'
          }}>
                <input
                  type="text"
                  value={keyInput}
                  onChange={(e) => {
                    let value = e.target.value.toUpperCase();
                    // Sadece harf ve rakam kabul et
                    value = value.replace(/[^A-Z0-9-]/g, '');
                    // Otomatik tire ekleme
                    if (value.length > 4 && value[4] !== '-') {
                      value = value.slice(0, 4) + '-' + value.slice(4);
                    }
                    if (value.length > 9 && value[9] !== '-') {
                      value = value.slice(0, 9) + '-' + value.slice(9);
                    }
                    if (value.length > 14 && value[14] !== '-') {
                      value = value.slice(0, 14) + '-' + value.slice(14);
                    }
                    // Maksimum 19 karakter (XXXX-XXXX-XXXX-XXXX)
                    if (value.length > 19) {
                      value = value.slice(0, 19);
                    }
                    setKeyInput(value);
                  }}
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    textAlign: 'center',
                    letterSpacing: '2px'
                  }}
                  maxLength={19}
                />
          </div>
          
          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center'
          }}>
            <button
              onClick={handleKeyVerification}
              disabled={isVerifying || !keyInput.trim()}
              style={{
                background: isVerifying || !keyInput.trim() ? '#9ca3af' : 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: isVerifying || !keyInput.trim() ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {isVerifying ? 'Doğrulanıyor...' : 'Key Doğrula'}
            </button>
            <button
              onClick={() => router.push(`/kitaplar/${requiredBookId}`)}
              style={{
                background: 'linear-gradient(135deg, #6b7280, #4b5563)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Kitap Sayfası
            </button>
          </div>
          
          {verificationMessage && (
            <div style={{
              marginTop: '20px',
              padding: '12px 16px',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: '500',
              background: verificationMessage.includes('✅') ? '#d1fae5' : '#fee2e2',
              color: verificationMessage.includes('✅') ? '#065f46' : '#dc2626',
              border: `1px solid ${verificationMessage.includes('✅') ? '#a7f3d0' : '#fecaca'}`
            }}>
              {verificationMessage}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Demo Modal - Bu öncelikli olarak kontrol edilmeli
  if (showDemoModal) {
    console.log('AuthGuard: Rendering demo modal', { showDemoModal, isAuthorized, isChecking });
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '40px',
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          maxWidth: '500px'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '20px'
          }}>🎮</div>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0 0 15px 0'
          }}>
            Demo Erişim
          </h2>
          <p style={{
            color: '#6b7280',
            fontSize: '1rem',
            margin: '0 0 25px 0',
            lineHeight: '1.6'
          }}>
            Bu oyuna erişmek için kitaba sahip olmalısınız. Demo olarak <strong>1 dakika</strong> oynayabilirsiniz.
          </p>
          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center'
          }}>
            <button
              onClick={startDemo}
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Demo Başlat
            </button>
            <button
              onClick={() => router.push(`/kitaplar/${requiredBookId}`)}
              style={{
                background: 'linear-gradient(135deg, #6b7280, #4b5563)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Kitap Sayfası
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Loading durumu
  if (isLoading || isChecking) {
    console.log('AuthGuard: Rendering loading screen', { isLoading, isChecking, showDemoModal });
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '40px',
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid #e5e7eb',
            borderTop: '4px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <h3 style={{
            fontSize: '1.2rem',
            fontWeight: '600',
            color: '#374151',
            margin: '0 0 10px 0'
          }}>
            Kontrol Ediliyor...
          </h3>
          <p style={{
            color: '#6b7280',
            fontSize: '0.9rem',
            margin: '0'
          }}>
            Erişim yetkileriniz kontrol ediliyor
          </p>
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Yetkisiz erişim
  if (!isAuthorized) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '40px',
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{
            fontSize: '1.2rem',
            fontWeight: '600',
            color: '#374151',
            margin: '0 0 10px 0'
          }}>
            Erişim Reddedildi
          </h3>
          <p style={{
            color: '#6b7280',
            fontSize: '0.9rem',
            margin: '0'
          }}>
            Bu oyuna erişim yetkiniz bulunmuyor.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {children}
      {/* Demo süresi göstergesi */}
      {requiredBookId && timeLeft > 0 && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '10px 15px',
          borderRadius: '8px',
          fontSize: '0.9rem',
          fontWeight: '600',
          zIndex: 1000
        }}>
          Demo: {Math.ceil(timeLeft / 1000)}s
        </div>
      )}
    </>
  );
}