"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Eğer login sayfasındaysak güvenlik kontrolü yapma
      if (pathname === '/admin/login') {
        setIsLoading(false);
        return;
      }

      const adminAuth = localStorage.getItem('adminAuth');
      if (adminAuth) {
        try {
          const authData = JSON.parse(adminAuth);
          // Token süresini kontrol et (24 saat)
          const now = new Date().getTime();
          const tokenTime = new Date(authData.timestamp).getTime();
          const hoursDiff = (now - tokenTime) / (1000 * 60 * 60);
          
          if (hoursDiff < 24) {
            setIsAuthenticated(true);
          } else {
            // Token süresi dolmuş
            localStorage.removeItem('adminAuth');
            window.location.href = '/admin/login?key=odtu-admin-2024-secret';
            return;
          }
        } catch (error) {
          // Geçersiz token
          localStorage.removeItem('adminAuth');
          window.location.href = '/admin/login?key=odtu-admin-2024-secret';
          return;
        }
      } else {
        window.location.href = '/admin/login?key=odtu-admin-2024-secret';
        return;
      }
      setIsLoading(false);
    }
  }, [pathname]);

  // Login sayfasındaysak direkt children'ı göster
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Loading durumu
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f8f9fa'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{ color: '#666', fontSize: '1rem', margin: '0' }}>Güvenlik kontrolü yapılıyor...</p>
        </div>
      </div>
    );
  }

  // Giriş yapmamış kullanıcı
  if (!isAuthenticated) {
    return null;
  }

  const navItems = [
    { href: '/admin/dashboard?key=odtu-admin-2024-secret', label: 'Dashboard', icon: '📊' },
    { href: '/admin/books?key=odtu-admin-2024-secret', label: 'Kitaplar', icon: '📚' },
    { href: '/admin/users?key=odtu-admin-2024-secret', label: 'Kullanıcılar', icon: '👥' },
    { href: '/admin/games?key=odtu-admin-2024-secret', label: 'Oyunlar', icon: '🎮' },
    { href: '/admin/keys?key=odtu-admin-2024-secret', label: 'Key Yönetimi', icon: '🔑' },
    { href: '/admin/reports?key=odtu-admin-2024-secret', label: 'Raporlar', icon: '📈' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    // Güvenli admin login URL'ine yönlendir
    window.location.href = '/admin/login?key=odtu-admin-2024-secret';
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#f8f9fa'
    }}>
      <nav style={{
        width: '250px',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        color: 'white',
        padding: '20px 0',
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto',
        zIndex: 1000
      }}>
        <div style={{
          padding: '0 20px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ margin: '0', fontSize: '1.2rem', fontWeight: '700' }}>Admin Panel</h2>
          <button onClick={handleLogout} style={{
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '0.8rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}>
            🚪 Çıkış
          </button>
        </div>
        <ul style={{ listStyle: 'none', padding: '0', margin: '20px 0' }}>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 20px',
                  color: 'white',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  borderLeft: '3px solid transparent',
                  backgroundColor: pathname === item.href ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  borderLeftColor: pathname === item.href ? '#4CAF50' : 'transparent'
                }}
              >
                <span style={{ marginRight: '10px', fontSize: '1.1rem' }}>{item.icon}</span>
                <span style={{ fontWeight: '500' }}>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div style={{
          marginTop: 'auto',
          padding: '20px 0 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <Link href="/" style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 20px',
            color: 'white',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            borderLeft: '3px solid transparent'
          }}>
            <span style={{ marginRight: '10px', fontSize: '1.1rem' }}>🏠</span>
            <span style={{ fontWeight: '500' }}>Ana Sayfa</span>
          </Link>
        </div>
      </nav>
      
      <main style={{
        flex: 1,
        marginLeft: '250px',
        padding: '20px'
      }}>
        {children}
      </main>
    </div>
  );
}