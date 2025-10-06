"use client";
import Link from 'next/link';

export default function Custom404() {
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
        textAlign: 'center',
        color: 'white',
        maxWidth: '600px',
        padding: '40px 20px'
      }}>
        <div style={{
          fontSize: '8rem',
          fontWeight: 'bold',
          marginBottom: '20px',
          textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
        }}>
          404
        </div>
        <h1 style={{
          fontSize: '2.5rem',
          marginBottom: '20px',
          fontWeight: '700'
        }}>
          Sayfa Bulunamadı
        </h1>
        <p style={{
          fontSize: '1.2rem',
          marginBottom: '40px',
          opacity: 0.9,
          lineHeight: '1.6'
        }}>
          Aradığınız sayfa mevcut değil veya erişim yetkiniz bulunmuyor.
        </p>
        <div style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link href="/" style={{
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            border: '2px solid rgba(255, 255, 255, 0.3)'
          }}>
            🏠 Ana Sayfaya Dön
          </Link>
          <button 
            onClick={() => window.history.back()}
            style={{
              background: 'transparent',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              cursor: 'pointer'
            }}
          >
            ← Geri Dön
          </button>
        </div>
      </div>
    </div>
  );
}
