"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(formData.email, formData.password);
    
    if (success) {
      router.push('/');
    } else {
      setError('E-posta veya şifre hatalı!');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };


  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '30px'
          }}>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#1f2937',
              margin: '0 0 10px 0'
            }}>
              🔑 Giriş Yap
            </h1>
            <p style={{
              color: '#6b7280',
              fontSize: '1rem',
              margin: '0'
            }}>
              Hesabınıza giriş yaparak kitaplarınıza ve oyunlarınıza erişin
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#374151',
                fontSize: '0.9rem'
              }}>E-posta Adresi</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#374151',
                fontSize: '0.9rem'
              }}>Şifre</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
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
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>

          <div style={{
            textAlign: 'center',
            marginTop: '20px'
          }}>
            <p style={{
              color: '#6b7280',
              fontSize: '0.9rem',
              margin: '0'
            }}>
              Hesabınız yok mu? <a href="/kayit" style={{
                color: '#667eea',
                textDecoration: 'none',
                fontWeight: '500'
              }}>Kayıt olun</a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}