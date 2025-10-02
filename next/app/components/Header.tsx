"use client";
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

function Header() {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
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
          <button 
            className="user-btn"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="user-avatar">
              {user ? user.avatar : '👤'}
            </div>
            <div className="user-info">
              <span className="user-name">
                {user ? user.name : 'Giriş Yap'}
              </span>
              <span className="user-status">
                {user ? 'Giriş Yapmış' : 'Misafir'}
              </span>
            </div>
            <span className="dropdown-arrow">▼</span>
          </button>
          {showDropdown && (
            <div className="dropdown-menu">
              {user ? (
                <>
                  <div className="dropdown-header">
                    <div className="user-avatar-large">{user.avatar}</div>
                    <div className="user-details">
                      <span className="user-name-large">{user.name}</span>
                      <span className="user-email">{user.email}</span>
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
                  <button 
                    className="dropdown-item logout"
                    onClick={() => {
                      logout();
                      setShowDropdown(false);
                    }}
                  >
                    <span className="item-icon">🚪</span>
                    <span className="item-text">Çıkış Yap</span>
                  </button>
                </>
              ) : (
                <>
                  <a href="/giris" className="dropdown-item">
                    <span className="item-icon">🔑</span>
                    <span className="item-text">Giriş Yap</span>
                  </a>
                  <a href="/kayit" className="dropdown-item">
                    <span className="item-icon">📝</span>
                    <span className="item-text">Kayıt Ol</span>
                  </a>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
