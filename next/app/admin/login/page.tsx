"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    adminCode: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();

  // Gizli admin URL kontrolü
  const checkAdminAccess = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const secretKey = urlParams.get('key');
    const validSecretKey = 'odtu-admin-2024-secret';
    
    if (secretKey === validSecretKey) {
      setShowLogin(true);
    } else {
      // Yanlış veya eksik key - 404 sayfasına yönlendir
      router.push('/404');
    }
  };

  // Component mount olduğunda kontrol et
  React.useEffect(() => {
    checkAdminAccess();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Gizli admin kodu kontrolü
    const validAdminCode = 'ODTU2024ADMIN';
    
    // Demo admin credentials + gizli kod
    if (credentials.username === 'admin' && 
        credentials.password === 'odtu2024' && 
        credentials.adminCode === validAdminCode) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Güvenli token oluştur
      const authData = {
        username: credentials.username,
        timestamp: new Date().toISOString(),
        token: btoa(`${credentials.username}:${Date.now()}`) // Basit token
      };
      
      localStorage.setItem('adminAuth', JSON.stringify(authData));
      router.push('/admin/dashboard?key=odtu-admin-2024-secret');
    } else {
      setError('Giriş bilgileri hatalı! Lütfen tüm alanları doğru doldurun.');
    }
    
    setIsLoading(false);
  };

  // Eğer geçerli key yoksa loading göster
  if (!showLogin) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, Noto Sans'
      }}>
        <div style={{
          color: 'white',
          fontSize: '1.2rem',
          textAlign: 'center'
        }}>
          Yükleniyor...
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      padding: '20px',
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, Noto Sans'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: '30px' }}>
          <div style={{ marginBottom: '20px' }}>
            <img 
              src="/img/icon.png" 
              alt="ODTÜ Yayıncılık" 
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '12px'
              }}
            />
          </div>
          <h1 style={{
            margin: '0 0 10px 0',
            color: '#1f2937',
            fontSize: '1.8rem',
            fontWeight: '700'
          }}>ODTÜ Yayıncılık</h1>
          <h2 style={{
            margin: '0',
            color: '#6b7280',
            fontSize: '1.1rem',
            fontWeight: '500'
          }}>Yönetim Paneli</h2>
        </div>

        <form onSubmit={handleLogin} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div style={{ textAlign: 'left' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#374151',
              fontWeight: '600',
              fontSize: '0.9rem'
            }} htmlFor="username">Kullanıcı Adı</label>
            <input
              type="text"
              id="username"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
              placeholder="admin"
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ textAlign: 'left' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#374151',
              fontWeight: '600',
              fontSize: '0.9rem'
            }} htmlFor="password">Şifre</label>
            <input
              type="password"
              id="password"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              placeholder="••••••••"
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ textAlign: 'left' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#374151',
              fontWeight: '600',
              fontSize: '0.9rem'
            }} htmlFor="adminCode">Admin Kodu</label>
            <input
              type="password"
              id="adminCode"
              value={credentials.adminCode}
              onChange={(e) => setCredentials(prev => ({ ...prev, adminCode: e.target.value }))}
              placeholder="Gizli admin kodu"
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {error && (
            <div style={{
              background: '#fee2e2',
              color: '#dc2626',
              padding: '12px 16px',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            style={{
              background: isLoading ? '#9ca3af' : 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              padding: '14px 24px',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>

      </div>
    </div>
  );
}