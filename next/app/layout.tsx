"use client";
import './theme.css';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isAdminPage, setIsAdminPage] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    setIsAdminPage(path.startsWith('/admin'));
  }, []);
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/img/icon.png" type="image/png" />
        <title>İnteraktif Kitaplar</title>
      </head>
      <body>
        <div className="container">
          {!isAdminPage && (
            <header className="site-header">
              <a className="brand" href="/">
                <div className="brand-logo">
                  <img src="/img/icon.png" alt="İnteraktif Kitaplar" className="brand-icon" />
                </div>
                <h1>İnteraktif Kitaplar</h1>
              </a>
              <nav className="nav">
                <a href="/">Ana Sayfa</a>
                <div className="user-dropdown">
                  <button className="user-btn">
                    <div className="user-avatar">👤</div>
                    <div className="user-info">
                      <span className="user-name">Kullanıcı</span>
                      <span className="user-status">Giriş Yapmış</span>
                    </div>
                    <span className="dropdown-arrow">▼</span>
                  </button>
                  <div className="dropdown-menu">
                    <div className="dropdown-header">
                      <div className="user-avatar-large">👤</div>
                      <div className="user-details">
                        <span className="user-name-large">Kullanıcı</span>
                        <span className="user-email">user@example.com</span>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <a href="/kitaplarim" className="dropdown-item">
                      <span className="item-icon">📚</span>
                      <span className="item-text">Kitaplarım</span>
                      <span className="item-badge">5</span>
                    </a>
                    <a href="/hesap" className="dropdown-item">
                      <span className="item-icon">💳</span>
                      <span className="item-text">Hesap</span>
                    </a>
                    <a href="/profil" className="dropdown-item">
                      <span className="item-icon">⚙️</span>
                      <span className="item-text">Profil Ayarları</span>
                    </a>
                    <a href="/favoriler" className="dropdown-item">
                      <span className="item-icon">❤️</span>
                      <span className="item-text">Favoriler</span>
                    </a>
                    <div className="dropdown-divider"></div>
                    <a href="/cikis" className="dropdown-item logout">
                      <span className="item-icon">🚪</span>
                      <span className="item-text">Çıkış Yap</span>
                    </a>
                  </div>
                </div>
              </nav>
            </header>
          )}
          {children}
          {!isAdminPage && (
            <footer className="footer">
              <div className="footer-content">
                <div className="footer-left">
                  <small>İnteraktif Kitap Projesi</small>
                </div>
                <div className="footer-right">
                  <div className="progenx-logo">
                    <span className="copyright-symbol">©</span>
                    <span className="progenx-text">Progenx</span>
                  </div>
                </div>
              </div>
            </footer>
          )}
        </div>
      </body>
    </html>
  );
}


