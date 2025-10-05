"use client";
import './theme.css';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin') || false;

  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/img/icon.png" type="image/png" />
        <title>İnteraktif Kitaplar</title>
      </head>
      <body>
        <AuthProvider>
          <div className="container">
            {!isAdminPage && <Header />}
            {children}
            {!isAdminPage && (
              <footer className="footer">
                <div className="footer-bottom">
                  <div className="footer-branding">
                    <div className="footer-left">
                      <small>İnteraktif Kitap Projesi</small>
                    </div>
                    <div className="footer-center">
                      <img 
                        src="/img/odtülogo.png" 
                        alt="ODTÜ Yayıncılık Logo" 
                        className="odtu-logo"
                      />
                    </div>
                    <div className="footer-right">
                      <div className="progenx-logo">
                        <span className="copyright-symbol">©</span>
                        <span className="progenx-text">Progenx</span>
                      </div>
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