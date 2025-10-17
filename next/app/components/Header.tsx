"use client";
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect, useRef } from 'react';

function Header() {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Dropdown dışına tıklandığında kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  // Mobile menu için ESC tuşu ve overlay click
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowMobileMenu(false);
      }
    };

    const handleOverlayClick = (event: MouseEvent) => {
      if (showMobileMenu && event.target === event.currentTarget) {
        setShowMobileMenu(false);
      }
    };

    if (showMobileMenu) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('click', handleOverlayClick);
      document.body.style.overflow = 'hidden'; // Scroll'u engelle
    } else {
      document.body.style.overflow = 'unset'; // Scroll'u geri aç
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleOverlayClick);
      document.body.style.overflow = 'unset';
    };
  }, [showMobileMenu]);

  return (
    <header className="site-header">
      <a className="brand" href="/">
        <div className="brand-logo">
          <img src="/img/icon.png" alt="İnteraktif Kitaplar" className="brand-icon" />
        </div>
        <h1>İnteraktif Kitaplar</h1>
      </a>
      
      {/* Desktop Navigation */}
      <nav className="nav desktop-nav">
        <a href="/">Ana Sayfa</a>
        <div className="user-section">
          <div className="user-avatar">
            {user ? user.avatar : '👤'}
          </div>
          <div className="user-dropdown" ref={dropdownRef}>
            <button 
              className="user-btn"
              onClick={(e) => {
                e.stopPropagation();
                setShowDropdown(!showDropdown);
              }}
            >
              <div className="user-info">
                <span className="user-name">
                  {user ? user.name : 'Giriş Yap'}
                </span>
                <span className="user-status">
                  {user ? user.email : ''}
                </span>
              </div>
              <span className="dropdown-arrow">▼</span>
            </button>
            <div 
              className="dropdown-menu" 
              onClick={(e) => e.stopPropagation()}
              style={{ 
                display: showDropdown ? 'block' : 'none',
                opacity: showDropdown ? 1 : 0,
                visibility: showDropdown ? 'visible' : 'hidden',
                transform: showDropdown ? 'translateY(0)' : 'translateY(-10px)'
              }}
            >
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
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-btn"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        aria-label="Menüyü aç/kapat"
      >
        <span className={`hamburger-line ${showMobileMenu ? 'active' : ''}`}></span>
        <span className={`hamburger-line ${showMobileMenu ? 'active' : ''}`}></span>
        <span className={`hamburger-line ${showMobileMenu ? 'active' : ''}`}></span>
      </button>

      {/* Mobile Navigation */}
      {showMobileMenu && (
        <div 
          className="mobile-nav-overlay"
          onClick={() => setShowMobileMenu(false)}
        >
          <div 
            className="mobile-nav"
            ref={mobileMenuRef}
            onClick={(e) => e.stopPropagation()}
          >
        <div className="mobile-nav-content">
          <a href="/" className="mobile-nav-item" onClick={() => setShowMobileMenu(false)}>
            <span className="mobile-nav-icon">🏠</span>
            <span className="mobile-nav-text">Ana Sayfa</span>
          </a>
          
          {user ? (
            <>
              <div className="mobile-user-info">
                <div className="mobile-user-avatar">{user.avatar}</div>
                <div className="mobile-user-details">
                  <span className="mobile-user-name">{user.name}</span>
                  <span className="mobile-user-email">{user.email}</span>
                </div>
              </div>
              
              <a href="/kitaplarim" className="mobile-nav-item" onClick={() => setShowMobileMenu(false)}>
                <span className="mobile-nav-icon">📚</span>
                <span className="mobile-nav-text">Kitaplarım</span>
                <span className="mobile-nav-badge">5</span>
              </a>
              
              <a href="/favoriler" className="mobile-nav-item" onClick={() => setShowMobileMenu(false)}>
                <span className="mobile-nav-icon">❤️</span>
                <span className="mobile-nav-text">Favoriler</span>
              </a>
              
              <button 
                className="mobile-nav-item logout"
                onClick={() => {
                  logout();
                  setShowMobileMenu(false);
                }}
              >
                <span className="mobile-nav-icon">🚪</span>
                <span className="mobile-nav-text">Çıkış Yap</span>
              </button>
            </>
          ) : (
            <>
              <a href="/giris" className="mobile-nav-item" onClick={() => setShowMobileMenu(false)}>
                <span className="mobile-nav-icon">🔑</span>
                <span className="mobile-nav-text">Giriş Yap</span>
              </a>
              
              <a href="/kayit" className="mobile-nav-item" onClick={() => setShowMobileMenu(false)}>
                <span className="mobile-nav-icon">📝</span>
                <span className="mobile-nav-text">Kayıt Ol</span>
              </a>
            </>
          )}
        </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
