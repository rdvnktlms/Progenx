"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookKey, createKeys, exportKeysToExcel, getBookTitle, generateKey, addKeyToActiveKeys } from '../../utils/keySystem';

// Hash fonksiyonu (keySystem'den kopyalandı)
const hashKey = (key: string): string => {
  let hash = 0;
  const str = key.toUpperCase().trim();
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  const hashStr = Math.abs(hash).toString(16).padStart(8, '0');
  return (hashStr + hashStr + hashStr + hashStr + hashStr + hashStr + hashStr + hashStr).substring(0, 64);
};

export default function KeysPage() {
  const router = useRouter();
  const [keys, setKeys] = useState<BookKey[]>([]);
  const [selectedBook, setSelectedBook] = useState('');
  const [keyCount, setKeyCount] = useState(10);
  const [isCreating, setIsCreating] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Satranç alıştırması oluşturma state'leri
  const [puzzleTitle, setPuzzleTitle] = useState('');
  const [puzzleDescription, setPuzzleDescription] = useState('');
  const [correctMove, setCorrectMove] = useState('');
  const [explanation, setExplanation] = useState('');
  const [board, setBoard] = useState<Array<{type: string, color: string, position: string} | null>>(
    Array(64).fill(null)
  );
  const [draggedPiece, setDraggedPiece] = useState<{type: string, color: string} | null>(null);
  const [generatedCode, setGeneratedCode] = useState('');

  const books = [
    { id: 'hava-olaylari', title: 'Hava Olayları' },
    { id: 'benim-kucuk-deneylerim', title: 'Benim Küçük Deneylerim' },
    { id: 'tatilde-50-macera', title: 'Tatilde 50 Macera' },
    { id: 'atalarimizdan-dersler', title: 'Atalarımızdan Dersler' },
    { id: 'oyunlarla-satranc', title: 'Oyunlarla Satranç' },
    { id: 'satrancta-tas-alisverisi', title: 'Satrançta Taş Alışverişi' }
  ];

  // Test key'leri (sadece mevcut key'ler için)
  const getKeyFromHash = (keyHash: string): string => {
    // localStorage'dan gerçek key'leri kontrol et
    if (typeof window !== 'undefined') {
      const storedKeys = localStorage.getItem('bookKeys');
      if (storedKeys) {
        try {
          const parsedKeys = JSON.parse(storedKeys);
          const keyData = parsedKeys.find((k: any) => k.keyHash === keyHash);
          if (keyData && keyData.actualKey) {
            return keyData.actualKey;
          }
        } catch (error) {
          console.error('Key parsing error:', error);
        }
      }
    }

    // Test key'leri
    const testKeys: { [key: string]: string } = {
      '77290e2277290e2277290e2277290e2277290e2277290e2277290e2277290e22': 'SATR-ANCT-OYUN-LAR',
      '41c866f141c866f141c866f141c866f141c866f141c866f141c866f141c866f1': 'HAVA-OLAY-LARI-123',
      '4c64cae24c64cae24c64cae24c64cae24c64cae24c64cae24c64cae24c64cae2': 'DENEY-LERI-MEKANIK',
      '36215a3b36215a3b36215a3b36215a3b36215a3b36215a3b36215a3b36215a3b': 'SATR-ANCT-ASAL-ISVE'
    };
    return testKeys[keyHash] || 'KEY-BULUNAMADI';
  };

  // Key kopyalama fonksiyonu
  const copyKeyToClipboard = async (keyHash: string) => {
    const actualKey = getKeyFromHash(keyHash);
    try {
      await navigator.clipboard.writeText(actualKey);
      setCopiedKey(keyHash);
      setTimeout(() => setCopiedKey(null), 2000); // 2 saniye sonra temizle
    } catch (err) {
      // Fallback: textarea ile kopyalama
      const textArea = document.createElement('textarea');
      textArea.value = actualKey;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedKey(keyHash);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  // Satranç alıştırması yardımcı fonksiyonları
  const getPieceSymbol = (type: string, color: string) => {
    const symbols: {[key: string]: string} = {
      'king': color === 'white' ? '♔' : '♚',
      'queen': color === 'white' ? '♕' : '♛',
      'rook': color === 'white' ? '♖' : '♜',
      'bishop': color === 'white' ? '♗' : '♝',
      'knight': color === 'white' ? '♘' : '♞',
      'pawn': color === 'white' ? '♙' : '♟'
    };
    return symbols[type] || '?';
  };

  const getSquareColor = (index: number) => {
    const row = Math.floor(index / 8);
    const col = index % 8;
    return (row + col) % 2 === 0 ? '#f0d9b5' : '#b58863';
  };

  const getPositionFromIndex = (index: number) => {
    const row = 8 - Math.floor(index / 8);
    const col = String.fromCharCode(97 + (index % 8)); // a-h
    return `${col}${row}`;
  };

  const getIndexFromPosition = (position: string) => {
    const col = position.charCodeAt(0) - 97; // a=0, b=1, etc.
    const row = 8 - parseInt(position[1]); // 8=0, 7=1, etc.
    return row * 8 + col;
  };

  const handleDragStart = (e: React.DragEvent, piece: {type: string, color: string}) => {
    setDraggedPiece(piece);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, squareIndex: number) => {
    e.preventDefault();
    if (!draggedPiece) return;

    const newBoard = [...board];
    newBoard[squareIndex] = {
      ...draggedPiece,
      position: getPositionFromIndex(squareIndex)
    };
    setBoard(newBoard);
    setDraggedPiece(null);
  };

  const removePieceFromBoard = (squareIndex: number) => {
    const newBoard = [...board];
    newBoard[squareIndex] = null;
    setBoard(newBoard);
  };

  const generatePuzzleCode = () => {
    const pieces = board.filter(piece => piece !== null) as Array<{type: string, color: string, position: string}>;
    
    if (pieces.length === 0) {
      alert('En az bir taş yerleştirin!');
      return;
    }

    const puzzleId = Math.floor(Math.random() * 1000) + 1;
    const boardCode = pieces.map(piece => 
      `        { type: '${piece.type}', color: '${piece.color}', position: '${piece.position}' }`
    ).join(',\n');

    const code = `    {
      id: ${puzzleId},
      title: "",
      description: "",
      board: [
${boardCode}
      ],
      correctMove: '',
      explanation: ""
    }`;

    setGeneratedCode(code);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    alert('Kod kopyalandı!');
  };

  const clearPuzzle = () => {
    setBoard(Array(64).fill(null));
    setGeneratedCode('');
  };

  const availablePieces = [
    { type: 'king', color: 'white' },
    { type: 'queen', color: 'white' },
    { type: 'rook', color: 'white' },
    { type: 'bishop', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'pawn', color: 'white' },
    { type: 'king', color: 'black' },
    { type: 'queen', color: 'black' },
    { type: 'rook', color: 'black' },
    { type: 'bishop', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'pawn', color: 'black' }
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Gizli admin URL kontrolü
      const urlParams = new URLSearchParams(window.location.search);
      const secretKey = urlParams.get('key');
      const validSecretKey = 'odtu-admin-2024-secret';
      
      if (secretKey !== validSecretKey) {
        // Yanlış veya eksik key - 404 sayfasına yönlendir
        router.push('/404');
        return;
      }

      // Önce localStorage'dan yükle
      const storedKeys = localStorage.getItem('bookKeys');
      if (storedKeys) {
        try {
          const parsedKeys = JSON.parse(storedKeys);
          // Veri bütünlüğünü kontrol et
          const validKeys = parsedKeys.filter(key => 
            key && 
            key.bookId && 
            key.keyHash && 
            key.title && 
            typeof key.isActive === 'boolean'
          );
          setKeys(validKeys);
        } catch (error) {
          console.error('Keys yükleme hatası:', error);
          // Hatalı veri varsa ACTIVE_KEYS'den yükle
          const { getAllActiveKeys } = require('../../utils/keySystem');
          setKeys(getAllActiveKeys());
        }
      } else {
        // localStorage'da yoksa ACTIVE_KEYS'den yükle
        const { getAllActiveKeys } = require('../../utils/keySystem');
        setKeys(getAllActiveKeys());
      }
    }
  }, [router]);

  const handleCreateKeys = () => {
    if (!selectedBook || keyCount <= 0) {
      alert('Lütfen kitap seçin ve geçerli bir sayı girin!');
      return;
    }

    setIsCreating(true);
    
    // Simüle edilmiş API çağrısı
    setTimeout(() => {
      // Direkt admin panelinde key oluştur
      const keysWithActualKeys = [];
      
      for (let i = 0; i < keyCount; i++) {
        const actualKey = generateKey(); // Gerçek key oluştur
        const bookTitle = getBookTitle(selectedBook);
        
        const newKey = {
          bookId: selectedBook,
          keyHash: hashKey(actualKey), // Gerçek key'in hash'ini hesapla
          title: bookTitle,
          isActive: true,
          createdAt: new Date().toISOString(),
          actualKey: actualKey
        };
        
        // ACTIVE_KEYS'e ekle
        addKeyToActiveKeys(newKey);
        
        keysWithActualKeys.push(newKey);
      }
      
      setKeys(prev => [...prev, ...keysWithActualKeys]);
      setIsCreating(false);
      alert(`${keyCount} adet key başarıyla oluşturuldu!`);
    }, 1000);
  };



  const handleExportKeys = () => {
    if (keys.length === 0) {
      alert('Export edilecek key bulunamadı!');
      return;
    }
    exportKeysToExcel(keys);
  };

  const handleExportBookKeys = (bookId: string) => {
    const bookKeys = keys.filter(key => key.bookId === bookId);
    if (bookKeys.length === 0) {
      alert('Bu kitap için key bulunamadı!');
      return;
    }
    exportKeysToExcel(bookKeys);
  };

  const handleToggleKey = (index: number) => {
    setKeys(prev => {
      const updatedKeys = prev.map((key, i) => 
        i === index ? { ...key, isActive: !key.isActive } : key
      );
      // localStorage'ı güncelle
      if (typeof window !== 'undefined') {
        localStorage.setItem('bookKeys', JSON.stringify(updatedKeys));
      }
      return updatedKeys;
    });
  };

  const getBookStats = (bookId: string) => {
    const bookKeys = keys.filter(key => key.bookId === bookId);
    const activeKeys = bookKeys.filter(key => key.isActive);
    return {
      total: bookKeys.length,
      active: activeKeys.length,
      inactive: bookKeys.length - activeKeys.length
    };
  };

  return (
    <>
      <section className="hero" style={{
        background: 'linear-gradient(135deg, rgb(205, 23, 25), rgb(180, 20, 22))',
        color: 'white',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '30px'
      }}>
        <h2 style={{ color: 'white', margin: '0 0 10px 0' }}>🔑 Key Yönetimi</h2>
        <p style={{ color: 'white', margin: '0' }}>Kitap key'lerini oluşturun ve yönetin</p>
      </section>

      <section className="admin-section">
        <div className="admin-grid">
          {/* Key Oluşturma */}
          <div className="admin-card">
            <h3>📝 Yeni Key Oluştur</h3>
            <div className="form-group">
              <label htmlFor="bookSelect">Kitap Seçin</label>
              <select
                id="bookSelect"
                value={selectedBook}
                onChange={(e) => setSelectedBook(e.target.value)}
                className="form-input"
              >
                <option value="">Kitap seçin...</option>
                {books.map(book => (
                  <option key={book.id} value={book.id}>
                    {book.title}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="keyCount">Key Sayısı</label>
              <input
                type="number"
                id="keyCount"
                value={keyCount}
                onChange={(e) => setKeyCount(parseInt(e.target.value) || 0)}
                min="1"
                max="100"
                className="form-input"
              />
            </div>
            
            <button
              onClick={handleCreateKeys}
              disabled={isCreating || !selectedBook || keyCount <= 0}
              className="create-btn"
            >
              {isCreating ? 'Oluşturuluyor...' : '🔑 Key Oluştur'}
            </button>
          </div>

          {/* İstatistikler */}
          <div className="admin-card">
            <h3>📊 Key İstatistikleri</h3>
            <div className="stats-grid">
              {books.map(book => {
                const stats = getBookStats(book.id);
                return (
                  <div key={book.id} className="stat-card">
                    <h4>{book.title}</h4>
                    <div className="stat-numbers">
                      <div className="stat-item">
                        <span className="stat-label">Toplam:</span>
                        <span className="stat-value">{stats.total}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Aktif:</span>
                        <span className="stat-value used">{stats.active}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Pasif:</span>
                        <span className="stat-value available">{stats.inactive}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleExportBookKeys(book.id)}
                      className="export-btn-small"
                      disabled={stats.total === 0}
                    >
                      📊 Export
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Export İşlemleri */}
          <div className="admin-card">
            <h3>📤 Export İşlemleri</h3>
            <div className="export-actions">
              <button
                onClick={handleExportKeys}
                className="export-btn"
                disabled={keys.length === 0}
              >
                📊 Tüm Key'leri Export Et
              </button>
              <p className="export-info">
                Excel formatında CSV dosyası olarak indirilir
              </p>
            </div>
          </div>

          {/* Key Listesi */}
          <div className="admin-card full-width">
            <h3>📋 Key Listesi</h3>
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Key</th>
                    <th>Kitap</th>
                    <th>Durum</th>
                    <th>Kullanıcı</th>
                    <th>Kullanım Tarihi</th>
                    <th>Oluşturma Tarihi</th>
                  </tr>
                </thead>
                <tbody>
                  {keys.slice(0, 50).map((key, index) => (
                    <tr key={`${key.bookId}-${index}`}>
                      <td className="key-cell">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <code style={{ 
                            background: '#f3f4f6', 
                            padding: '4px 8px', 
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontFamily: 'monospace',
                            flex: 1
                          }}>
                            {key.actualKey || getKeyFromHash(key.keyHash)}
                          </code>
                          <button
                            onClick={() => copyKeyToClipboard(key.keyHash)}
                            style={{
                              background: copiedKey === key.keyHash ? '#10b981' : '#3b82f6',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              padding: '4px 8px',
                              fontSize: '12px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              transition: 'all 0.2s ease'
                            }}
                            title={copiedKey === key.keyHash ? 'Kopyalandı!' : 'Key\'i kopyala'}
                          >
                            {copiedKey === key.keyHash ? '✓' : '📋'}
                          </button>
                        </div>
                      </td>
                      <td>{getBookTitle(key.bookId)}</td>
                      <td>
                        <span className={`status-badge ${key.isActive ? 'available' : 'used'}`}>
                          {key.isActive ? 'Aktif' : 'Pasif'}
                        </span>
                      </td>
                      <td>-</td>
                      <td>-</td>
                      <td>{key.createdAt ? new Date(key.createdAt).toLocaleDateString('tr-TR') : 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {keys.length > 50 && (
                <p className="table-note">İlk 50 key gösteriliyor. Tümünü görmek için export edin.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Satranç Alıştırması Oluşturma Bölümü */}
      <section className="admin-section">
        <div className="admin-grid">
          <div className="admin-card" style={{ gridColumn: '1 / -1' }}>
            <h3>♟️ Satranç Alıştırması Oluştur</h3>
            <p>Sürükle-bırak ile satranç alıştırmalarını kolayca oluşturun</p>
            
            <div className="chess-puzzle-creator" style={{ marginTop: '20px' }}>
              {/* Sadece taş konumları için kod üretimi */}
              
              {/* Sürükle-Bırak Satranç Tahtası */}
              <div className="chess-board-container" style={{ 
                display: 'flex', 
                gap: '30px', 
                marginTop: '30px',
                alignItems: 'flex-start'
              }}>
                {/* Sol: Mevcut Taşlar */}
                <div className="pieces-palette" style={{
                  background: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid #dee2e6',
                  minWidth: '200px'
                }}>
                  <h4 style={{ margin: '0 0 15px 0', color: '#495057' }}>Mevcut Taşlar</h4>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <h5 style={{ margin: '0 0 10px 0', color: '#6c757d' }}>Beyaz Taşlar</h5>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                      {availablePieces.filter(p => p.color === 'white').map((piece, index) => (
                        <div
                          key={`white-${piece.type}`}
                          draggable
                          onDragStart={(e) => handleDragStart(e, piece)}
                          style={{
                            width: '50px',
                            height: '50px',
                            background: '#ffffff',
                            border: '2px solid #dee2e6',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px',
                            cursor: 'grab',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            position: 'relative'
                          }}
                          title={`Beyaz ${piece.type === 'king' ? 'Şah' : piece.type === 'queen' ? 'Vezir' : piece.type === 'rook' ? 'Kale' : piece.type === 'bishop' ? 'Fil' : piece.type === 'knight' ? 'At' : 'Piyon'}`}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                          }}
                        >
                          {/* Beyaz taş arka planı */}
                          <div 
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              width: '16px',
                              height: '16px',
                              borderRadius: '50%',
                              backgroundColor: 'rgba(255, 255, 255, 0.4)',
                              zIndex: 1
                            }}
                          />
                          {getPieceSymbol(piece.type, piece.color)}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 style={{ margin: '0 0 10px 0', color: '#6c757d' }}>Siyah Taşlar</h5>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                      {availablePieces.filter(p => p.color === 'black').map((piece, index) => (
                        <div
                          key={`black-${piece.type}`}
                          draggable
                          onDragStart={(e) => handleDragStart(e, piece)}
                          style={{
                            width: '50px',
                            height: '50px',
                            background: '#ffffff',
                            border: '2px solid #dee2e6',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px',
                            cursor: 'grab',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            position: 'relative'
                          }}
                          title={`Siyah ${piece.type === 'king' ? 'Şah' : piece.type === 'queen' ? 'Vezir' : piece.type === 'rook' ? 'Kale' : piece.type === 'bishop' ? 'Fil' : piece.type === 'knight' ? 'At' : 'Piyon'}`}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                          }}
                        >
                          {/* Siyah taş arka planı */}
                          <div 
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              width: '16px',
                              height: '16px',
                              borderRadius: '50%',
                              backgroundColor: 'rgba(0, 0, 0, 0.4)',
                              zIndex: 1
                            }}
                          />
                          {getPieceSymbol(piece.type, piece.color)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sağ: Satranç Tahtası */}
                <div className="chess-board" style={{
                  background: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid #dee2e6'
                }}>
                  <h4 style={{ margin: '0 0 15px 0', color: '#495057' }}>Satranç Tahtası</h4>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(8, 1fr)',
                    gap: '2px',
                    width: '400px',
                    height: '400px',
                    border: '3px solid #8b4513',
                    borderRadius: '8px',
                    padding: '4px',
                    background: '#8b4513'
                  }}>
                    {Array.from({ length: 64 }, (_, index) => (
                      <div
                        key={index}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                        onClick={() => board[index] && removePieceFromBoard(index)}
                        style={{
                          background: getSquareColor(index),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '28px',
                          cursor: board[index] ? 'pointer' : 'default',
                          position: 'relative',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          if (!board[index]) {
                            e.currentTarget.style.background = '#ffeb3b';
                            e.currentTarget.style.opacity = '0.7';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!board[index]) {
                            e.currentTarget.style.background = getSquareColor(index);
                            e.currentTarget.style.opacity = '1';
                          }
                        }}
                      >
                        {board[index] && (
                          <>
                            {/* Taş arka planı - renk göstergesi */}
                            <div 
                              style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                backgroundColor: board[index]!.color === 'white' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
                                zIndex: 1
                              }}
                            />
                            <span 
                              title={`${board[index]!.color === 'white' ? 'Beyaz' : 'Siyah'} ${board[index]!.type === 'king' ? 'Şah' : board[index]!.type === 'queen' ? 'Vezir' : board[index]!.type === 'rook' ? 'Kale' : board[index]!.type === 'bishop' ? 'Fil' : board[index]!.type === 'knight' ? 'At' : 'Piyon'}`}
                            >
                              {getPieceSymbol(board[index]!.type, board[index]!.color)}
                            </span>
                            <div
                              style={{
                                position: 'absolute',
                                top: '2px',
                                right: '2px',
                                background: '#ff4757',
                                color: 'white',
                                borderRadius: '50%',
                                width: '16px',
                                height: '16px',
                                fontSize: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                removePieceFromBoard(index);
                              }}
                            >
                              ×
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div style={{ marginTop: '10px', fontSize: '12px', color: '#6c757d' }}>
                    💡 Taşları sürükleyip bırakın. Mevcut taşlara tıklayarak kaldırabilirsiniz.
                  </div>
                </div>
              </div>

              {/* Aksiyon Butonları */}
              <div className="puzzle-actions" style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
                <button onClick={generatePuzzleCode} className="cta-button">
                  📋 Taş Konumları Kodunu Oluştur
                </button>
                <button onClick={clearPuzzle} className="secondary-button">
                  🗑️ Tahtayı Temizle
                </button>
              </div>

              {/* Oluşturulan Kod */}
              {generatedCode && (
                <div className="generated-code" style={{ marginTop: '30px' }}>
                  <h4>Taş Konumları Kodu:</h4>
                  <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>
                    Sadece taş konumları oluşturuldu. Başlık, açıklama ve doğru hamle bilgilerini manuel olarak ekleyin.
                  </p>
                  <textarea
                    value={generatedCode}
                    readOnly
                    rows={12}
                    onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                    style={{
                      width: '100%',
                      padding: '15px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontFamily: 'Courier New, monospace',
                      fontSize: '13px',
                      marginTop: '10px',
                      background: '#f8f9fa',
                      resize: 'vertical',
                      minHeight: '250px'
                    }}
                  />
                  <button onClick={copyCode} className="cta-button" style={{ marginTop: '15px' }}>
                    📋 Kodu Kopyala
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
