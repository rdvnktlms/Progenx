"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GameManagement() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [games, setGames] = useState([
    {
      id: 1,
      name: "Koyun vs Kurt",
      book: "Benim Küçük Deneylerim",
      category: "Strateji",
      difficulty: "Orta",
      playCount: 234,
      avgScore: 85,
      status: "active",
      description: "Koyunları koruyarak kurtları uzak tutma oyunu"
    },
    {
      id: 2,
      name: "Polis vs Hırsız",
      book: "Benim Küçük Deneylerim",
      category: "Strateji",
      difficulty: "Kolay",
      playCount: 189,
      avgScore: 92,
      status: "active",
      description: "Polisleri kullanarak hırsızları yakalama oyunu"
    },
    {
      id: 3,
      name: "Sırt Çantası Hazırlama",
      book: "50 Macera",
      category: "Planlama",
      difficulty: "Orta",
      playCount: 156,
      avgScore: 78,
      status: "active",
      description: "Tatil için sırt çantası hazırlama simülasyonu"
    },
    {
      id: 4,
      name: "Tatil Haritası Çizme",
      book: "50 Macera",
      category: "Yaratıcılık",
      difficulty: "Kolay",
      playCount: 143,
      avgScore: 88,
      status: "active",
      description: "Tatil rotası çizme ve planlama oyunu"
    },
    {
      id: 5,
      name: "Rüzgar Yönü",
      book: "Hava Olayları",
      category: "Bilim",
      difficulty: "Kolay",
      playCount: 198,
      avgScore: 91,
      status: "active",
      description: "Rüzgar yönünü tahmin etme oyunu"
    },
    {
      id: 6,
      name: "Yağmur Bulutu",
      book: "Hava Olayları",
      category: "Bilim",
      difficulty: "Orta",
      playCount: 167,
      avgScore: 83,
      status: "active",
      description: "Yağmur oluşum sürecini öğrenme oyunu"
    },
    {
      id: 7,
      name: "Gökkuşağı Renkleri",
      book: "Hava Olayları",
      category: "Bilim",
      difficulty: "Kolay",
      playCount: 201,
      avgScore: 89,
      status: "active",
      description: "Gökkuşağı renklerini öğrenme oyunu"
    },
    {
      id: 8,
      name: "Fırtına Simülatörü",
      book: "Hava Olayları",
      category: "Simülasyon",
      difficulty: "Zor",
      playCount: 134,
      avgScore: 76,
      status: "active",
      description: "Fırtına oluşumunu simüle etme oyunu"
    },
    {
      id: 9,
      name: "Termometre",
      book: "Hava Olayları",
      category: "Bilim",
      difficulty: "Orta",
      playCount: 178,
      avgScore: 87,
      status: "active",
      description: "Sıcaklık ölçme ve tahmin etme oyunu"
    },
    {
      id: 10,
      name: "Fırlayan Balon",
      book: "Benim Küçük Deneylerim",
      category: "Fizik",
      difficulty: "Kolay",
      playCount: 145,
      avgScore: 94,
      status: "active",
      description: "Balon fiziği ve hareket simülasyonu"
    },
    {
      id: 11,
      name: "Su Gemisi",
      book: "Benim Küçük Deneylerim",
      category: "Fizik",
      difficulty: "Orta",
      playCount: 123,
      avgScore: 81,
      status: "active",
      description: "Su üzerinde gemi hareketi simülasyonu"
    },
    {
      id: 12,
      name: "Asma Köprü",
      book: "Benim Küçük Deneylerim",
      category: "Mühendislik",
      difficulty: "Zor",
      playCount: 98,
      avgScore: 72,
      status: "active",
      description: "Köprü açma-kapama mekanizması simülasyonu"
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingGame, setEditingGame] = useState(null);
  const [newGame, setNewGame] = useState({
    name: '',
    book: '',
    category: '',
    difficulty: '',
    description: ''
  });
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('adminAuth');
      if (!auth) {
        router.push('/admin/login');
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [router]);

  const handleAddGame = () => {
    const game = {
      id: games.length + 1,
      ...newGame,
      playCount: 0,
      avgScore: 0,
      status: "active"
    };
    setGames([...games, game]);
    setShowAddModal(false);
    setNewGame({
      name: '',
      book: '',
      category: '',
      difficulty: '',
      description: ''
    });
  };

  const handleEditGame = (game) => {
    setEditingGame(game);
  };

  const handleUpdateGame = () => {
    setGames(games.map(game => 
      game.id === editingGame.id ? editingGame : game
    ));
    setEditingGame(null);
  };

  const handleDeleteGame = (gameId) => {
    if (confirm('Bu oyunu silmek istediğinizden emin misiniz?')) {
      setGames(games.filter(game => game.id !== gameId));
    }
  };

  const toggleGameStatus = (gameId) => {
    setGames(games.map(game => 
      game.id === gameId 
        ? { ...game, status: game.status === 'active' ? 'inactive' : 'active' }
        : game
    ));
  };

  if (!isAuthenticated) {
    return <div className="loading">Yükleniyor...</div>;
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="header-left">
          <img src="/img/icon.png" alt="ODTÜ Yayıncılık" className="header-logo" />
          <h1>Oyun Yönetimi</h1>
        </div>
        <div className="header-right">
          <span className="admin-welcome">Hoş geldiniz, Admin</span>
          <button onClick={() => router.push('/admin/login')} className="logout-btn">Çıkış Yap</button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="admin-nav">
        <a href="/admin/dashboard" className="nav-item">📊 Dashboard</a>
        <a href="/admin/books" className="nav-item">📚 Kitaplar</a>
        <a href="/admin/users" className="nav-item">👥 Kullanıcılar</a>
        <a href="/admin/games" className="nav-item active">🎮 Oyunlar</a>
        <a href="/admin/reports" className="nav-item">📈 Raporlar</a>
      </nav>

      {/* Main Content */}
      <main className="admin-content">
        <div className="page-header">
          <h2>Oyun Yönetimi</h2>
          <button 
            className="add-btn"
            onClick={() => setShowAddModal(true)}
          >
            ➕ Yeni Oyun Ekle
          </button>
        </div>

        {/* Game Stats */}
        <div className="game-stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🎮</div>
            <div className="stat-info">
              <h3>{games.length}</h3>
              <p>Toplam Oyun</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>{games.reduce((sum, game) => sum + game.playCount, 0)}</h3>
              <p>Toplam Oynanma</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <h3>{Math.round(games.reduce((sum, game) => sum + game.avgScore, 0) / games.length)}</h3>
              <p>Ortalama Skor</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔥</div>
            <div className="stat-info">
              <h3>{games.filter(g => g.status === 'active').length}</h3>
              <p>Aktif Oyun</p>
            </div>
          </div>
        </div>

        {/* Games Table */}
        <div className="games-table-container">
          <table className="games-table">
            <thead>
              <tr>
                <th>Oyun Adı</th>
                <th>Kitap</th>
                <th>Kategori</th>
                <th>Zorluk</th>
                <th>İstatistikler</th>
                <th>Durum</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {games.map(game => (
                <tr key={game.id}>
                  <td>
                    <div className="game-info">
                      <strong>{game.name}</strong>
                      <p className="game-description">{game.description}</p>
                    </div>
                  </td>
                  <td>
                    <span className="book-badge">{game.book}</span>
                  </td>
                  <td>
                    <span className="category-badge">{game.category}</span>
                  </td>
                  <td>
                    <span className={`difficulty-badge ${game.difficulty.toLowerCase()}`}>
                      {game.difficulty}
                    </span>
                  </td>
                  <td>
                    <div className="game-stats">
                      <span>🎮 {game.playCount} oynanma</span>
                      <span>⭐ {game.avgScore} ortalama</span>
                    </div>
                  </td>
                  <td>
                    <button 
                      className={`status-btn ${game.status}`}
                      onClick={() => toggleGameStatus(game.id)}
                    >
                      {game.status === 'active' ? 'Aktif' : 'Pasif'}
                    </button>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="play-btn">▶️</button>
                      <button 
                        className="edit-btn"
                        onClick={() => handleEditGame(game)}
                      >
                        ✏️
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDeleteGame(game.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Game Modal */}
        {showAddModal && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>Yeni Oyun Ekle</h3>
                <button className="close-btn" onClick={() => setShowAddModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Oyun Adı:</label>
                  <input 
                    type="text" 
                    value={newGame.name}
                    onChange={(e) => setNewGame(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Kitap:</label>
                  <select 
                    value={newGame.book}
                    onChange={(e) => setNewGame(prev => ({ ...prev, book: e.target.value }))}
                  >
                    <option value="">Seçiniz</option>
                    <option value="Benim Küçük Deneylerim">Benim Küçük Deneylerim</option>
                    <option value="Hava Olayları">Hava Olayları</option>
                    <option value="50 Macera">50 Macera</option>
                    <option value="Atalarımızdan Dersler">Atalarımızdan Dersler</option>
                    <option value="Oyunlarla Satranç">Oyunlarla Satranç</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Kategori:</label>
                  <select 
                    value={newGame.category}
                    onChange={(e) => setNewGame(prev => ({ ...prev, category: e.target.value }))}
                  >
                    <option value="">Seçiniz</option>
                    <option value="Strateji">Strateji</option>
                    <option value="Bilim">Bilim</option>
                    <option value="Fizik">Fizik</option>
                    <option value="Planlama">Planlama</option>
                    <option value="Yaratıcılık">Yaratıcılık</option>
                    <option value="Simülasyon">Simülasyon</option>
                    <option value="Mühendislik">Mühendislik</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Zorluk:</label>
                  <select 
                    value={newGame.difficulty}
                    onChange={(e) => setNewGame(prev => ({ ...prev, difficulty: e.target.value }))}
                  >
                    <option value="">Seçiniz</option>
                    <option value="Kolay">Kolay</option>
                    <option value="Orta">Orta</option>
                    <option value="Zor">Zor</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Açıklama:</label>
                  <textarea 
                    value={newGame.description}
                    onChange={(e) => setNewGame(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setShowAddModal(false)}>İptal</button>
                <button className="btn-primary" onClick={handleAddGame}>Oyun Ekle</button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Game Modal */}
        {editingGame && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>Oyun Düzenle</h3>
                <button className="close-btn" onClick={() => setEditingGame(null)}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Oyun Adı:</label>
                  <input 
                    type="text" 
                    value={editingGame.name}
                    onChange={(e) => setEditingGame(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Kitap:</label>
                  <select 
                    value={editingGame.book}
                    onChange={(e) => setEditingGame(prev => ({ ...prev, book: e.target.value }))}
                  >
                    <option value="Benim Küçük Deneylerim">Benim Küçük Deneylerim</option>
                    <option value="Hava Olayları">Hava Olayları</option>
                    <option value="50 Macera">50 Macera</option>
                    <option value="Atalarımızdan Dersler">Atalarımızdan Dersler</option>
                    <option value="Oyunlarla Satranç">Oyunlarla Satranç</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Kategori:</label>
                  <select 
                    value={editingGame.category}
                    onChange={(e) => setEditingGame(prev => ({ ...prev, category: e.target.value }))}
                  >
                    <option value="Strateji">Strateji</option>
                    <option value="Bilim">Bilim</option>
                    <option value="Fizik">Fizik</option>
                    <option value="Planlama">Planlama</option>
                    <option value="Yaratıcılık">Yaratıcılık</option>
                    <option value="Simülasyon">Simülasyon</option>
                    <option value="Mühendislik">Mühendislik</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Zorluk:</label>
                  <select 
                    value={editingGame.difficulty}
                    onChange={(e) => setEditingGame(prev => ({ ...prev, difficulty: e.target.value }))}
                  >
                    <option value="Kolay">Kolay</option>
                    <option value="Orta">Orta</option>
                    <option value="Zor">Zor</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Açıklama:</label>
                  <textarea 
                    value={editingGame.description}
                    onChange={(e) => setEditingGame(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setEditingGame(null)}>İptal</button>
                <button className="btn-primary" onClick={handleUpdateGame}>Güncelle</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
