import './theme.css';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/img/icon.png" type="image/png" />
        <title>İnteraktif Kitaplar</title>
      </head>
      <body>
        <div className="container">
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
                  👤 Kullanıcı
                  <span className="dropdown-arrow">▼</span>
                </button>
                <div className="dropdown-menu">
                  <a href="/kitaplarim">📚 Kitaplarım</a>
                  <a href="/profil">⚙️ Profil</a>
                  <a href="/cikis">🚪 Çıkış</a>
                </div>
              </div>
            </nav>
          </header>
          {children}
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
        </div>
      </body>
    </html>
  );
}


