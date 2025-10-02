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
    <>
      <section className="hero">
        <h2>🔑 Giriş Yap</h2>
        <p>Hesabınıza giriş yaparak kitaplarınıza ve oyunlarınıza erişin</p>
      </section>

      <section className="auth-section">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <h3>Giriş Yap</h3>
              <p>Hesabınıza giriş yapın</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {error && <div className="error-message">{error}</div>}
              
              <div className="form-group">
                <label htmlFor="email">E-posta</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="ornek@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Şifre</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                />
              </div>

              <button 
                type="submit" 
                className="auth-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              </button>
            </form>

            <div className="auth-footer">
              <p>Hesabınız yok mu? <a href="/kayit">Kayıt olun</a></p>
            </div>

            <div className="demo-credentials">
              <h4>Demo Hesaplar:</h4>
              <div className="demo-list">
                <div className="demo-item">
                  <strong>ahmet@example.com</strong> / 123456
                </div>
                <div className="demo-item">
                  <strong>elif@example.com</strong> / 123456
                </div>
                <div className="demo-item">
                  <strong>mehmet@example.com</strong> / 123456
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
