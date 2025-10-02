"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UserManagement() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Ahmet Yılmaz",
      email: "ahmet@example.com",
      joinDate: "2024-01-15",
      lastActive: "2 dakika önce",
      booksRead: 3,
      favoriteGenres: ["Bilim", "Macera"],
      totalGamesPlayed: 8,
      status: "active"
    },
    {
      id: 2,
      name: "Elif Kaya",
      email: "elif@example.com",
      joinDate: "2024-02-03",
      lastActive: "5 dakika önce",
      booksRead: 2,
      favoriteGenres: ["Tarih", "Eğitim"],
      totalGamesPlayed: 12,
      status: "active"
    },
    {
      id: 3,
      name: "Mehmet Demir",
      email: "mehmet@example.com",
      joinDate: "2024-01-28",
      lastActive: "8 dakika önce",
      booksRead: 4,
      favoriteGenres: ["Satranç", "Bilim"],
      totalGamesPlayed: 15,
      status: "active"
    },
    {
      id: 4,
      name: "Zeynep Öz",
      email: "zeynep@example.com",
      joinDate: "2024-03-10",
      lastActive: "12 dakika önce",
      booksRead: 1,
      favoriteGenres: ["Macera"],
      totalGamesPlayed: 5,
      status: "active"
    },
    {
      id: 5,
      name: "Can Arslan",
      email: "can@example.com",
      joinDate: "2024-02-20",
      lastActive: "15 dakika önce",
      booksRead: 2,
      favoriteGenres: ["Bilim", "Tarih"],
      totalGamesPlayed: 9,
      status: "inactive"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
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

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const deleteUser = (userId) => {
    if (confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const viewUser = (user) => {
    alert(`Kullanıcı Detayları:\n\nAd: ${user.name}\nE-posta: ${user.email}\nOkunan Kitap: ${user.booksRead}\nOynanan Oyun: ${user.gamesPlayed}\nSon Aktivite: ${user.lastActivity}\nFavori Kategoriler: ${user.favoriteGenres.join(', ')}`);
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
          <h1>Kullanıcı Yönetimi</h1>
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
        <a href="/admin/users" className="nav-item active">👥 Kullanıcılar</a>
        <a href="/admin/games" className="nav-item">🎮 Oyunlar</a>
        <a href="/admin/reports" className="nav-item">📈 Raporlar</a>
      </nav>

      {/* Main Content */}
      <main className="admin-content">
        <div className="page-header">
          <h2>Kullanıcı Yönetimi</h2>
          <div className="user-stats">
            <span className="stat-item">Toplam: {users.length}</span>
            <span className="stat-item">Aktif: {users.filter(u => u.status === 'active').length}</span>
            <span className="stat-item">Pasif: {users.filter(u => u.status === 'inactive').length}</span>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Kullanıcı adı veya e-posta ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-select">
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Tüm Durumlar</option>
              <option value="active">Aktif</option>
              <option value="inactive">Pasif</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Kullanıcı</th>
                <th>E-posta</th>
                <th>Kayıt Tarihi</th>
                <th>Son Aktivite</th>
                <th>Okunan Kitap</th>
                <th>Oynanan Oyun</th>
                <th>Favori Kategoriler</th>
                <th>Durum</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">
                        {user.name.charAt(0)}
                      </div>
                      <div className="user-details">
                        <strong>{user.name}</strong>
                        <span>ID: {user.id}</span>
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.joinDate}</td>
                  <td>{user.lastActive}</td>
                  <td>
                    <span className="stat-badge">{user.booksRead}</span>
                  </td>
                  <td>
                    <span className="stat-badge">{user.totalGamesPlayed}</span>
                  </td>
                  <td>
                    <div className="genres-list">
                      {user.favoriteGenres.map((genre, index) => (
                        <span key={index} className="genre-tag">{genre}</span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <button 
                      className={`status-btn ${user.status}`}
                      onClick={() => toggleUserStatus(user.id)}
                    >
                      {user.status === 'active' ? 'Aktif' : 'Pasif'}
                    </button>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="view-btn" onClick={() => viewUser(user)}>👁️</button>
                      <button className="edit-btn" onClick={() => alert('Kullanıcı düzenleme özelliği yakında eklenecek!')}>✏️</button>
                      <button 
                        className="delete-btn"
                        onClick={() => deleteUser(user.id)}
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

        {/* User Analytics */}
        <div className="analytics-section">
          <div className="analytics-card">
            <h3>Kullanıcı Analizi</h3>
            <div className="analytics-grid">
              <div className="analytics-item">
                <h4>En Aktif Kullanıcılar</h4>
                <div className="top-users">
                  {users
                    .sort((a, b) => b.totalGamesPlayed - a.totalGamesPlayed)
                    .slice(0, 3)
                    .map((user, index) => (
                      <div key={user.id} className="top-user">
                        <span className="rank">#{index + 1}</span>
                        <span className="name">{user.name}</span>
                        <span className="games">{user.totalGamesPlayed} oyun</span>
                      </div>
                    ))}
                </div>
              </div>
              <div className="analytics-item">
                <h4>Popüler Kategoriler</h4>
                <div className="category-stats">
                  {['Bilim', 'Macera', 'Tarih', 'Satranç', 'Eğitim'].map(category => {
                    const count = users.filter(user => 
                      user.favoriteGenres.includes(category)
                    ).length;
                    return (
                      <div key={category} className="category-stat">
                        <span className="category-name">{category}</span>
                        <span className="category-count">{count} kullanıcı</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
