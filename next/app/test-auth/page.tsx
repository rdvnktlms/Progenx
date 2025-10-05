"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { clearUserStorage, resetTestAccounts } from '../utils/clearStorage';

export default function TestAuthPage() {
  const { user, isLoading } = useAuth();
  const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const books = JSON.parse(localStorage.getItem('userBooks') || '[]');
      setUserBooks(books);
    }
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Auth Test Sayfası</h1>
      <div style={{ marginBottom: '20px' }}>
        <h2>Kullanıcı Bilgileri:</h2>
        <p><strong>Loading:</strong> {isLoading ? 'Evet' : 'Hayır'}</p>
        <p><strong>User:</strong> {user ? JSON.stringify(user) : 'Yok'}</p>
        <p><strong>User Books:</strong> {JSON.stringify(userBooks)}</p>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Test Linkleri:</h2>
        <a href="/oyunlar/firlayan-balon" style={{ display: 'block', margin: '10px 0' }}>
          Fırlayan Balon Oyunu
        </a>
        <a href="/oyunlar/su-gemisi" style={{ display: 'block', margin: '10px 0' }}>
          Su Gemisi Oyunu
        </a>
        <a href="/oyunlar/sirt-cantasi" style={{ display: 'block', margin: '10px 0' }}>
          Sırt Çantası Oyunu
        </a>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Storage İşlemleri:</h2>
        <button 
          onClick={clearUserStorage}
          style={{
            background: '#ef4444',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            margin: '5px',
            cursor: 'pointer'
          }}
        >
          🗑️ Storage Temizle
        </button>
        <button 
          onClick={resetTestAccounts}
          style={{
            background: '#f59e0b',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            margin: '5px',
            cursor: 'pointer'
          }}
        >
          🔄 Test Hesaplarını Sıfırla
        </button>
      </div>
    </div>
  );
}
