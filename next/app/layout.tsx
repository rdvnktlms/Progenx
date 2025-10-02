"use client";
import './theme.css';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isAdminPage, setIsAdminPage] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      setIsAdminPage(path.startsWith('/admin'));
    }
  }, []);
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/img/icon.png" type="image/png" />
        <title>İnteraktif Kitaplar</title>
      </head>
      <body>
        <AuthProvider>
          <div className="container">
          {isClient && !isAdminPage && <Header />}
          {children}
          {isClient && !isAdminPage && (
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
        </AuthProvider>
      </body>
    </html>
  );
}


