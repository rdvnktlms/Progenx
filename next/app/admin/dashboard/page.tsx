"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats, setStats] = useState({
    totalBooks: 5,
    totalUsers: 1247,
    totalGames: 12,
    monthlyVisits: 8934,
    popularBooks: [
      { id: 1, title: "Oyunlarla Satranç", views: 2341, sales: 156 },
      { id: 2, title: "Hava Olayları", views: 1892, sales: 98 },
      { id: 3, title: "Benim Küçük Deneylerim", views: 1654, sales: 87 },
      { id: 4, title: "Atalarımızdan Dersler", views: 1432, sales: 76 },
      { id: 5, title: "50 Macera", views: 1287, sales: 65 }
    ],
    recentActivity: [
      { id: 1, user: "Ahmet Yılmaz", action: "Oyunlarla Satranç kitabını favorilere ekledi", time: "2 dakika önce" },
      { id: 2, user: "Elif Kaya", action: "Hava Olayları oyununu tamamladı", time: "5 dakika önce" },
      { id: 3, user: "Mehmet Demir", action: "Benim Küçük Deneylerim kitabını satın aldı", time: "8 dakika önce" },
      { id: 4, user: "Zeynep Öz", action: "Atalarımızdan Dersler oyununu oynadı", time: "12 dakika önce" },
      { id: 5, user: "Can Arslan", action: "50 Macera haritasını çizdi", time: "15 dakika önce" }
    ]
  });
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (!auth) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin/login');
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
          <h1>Yönetim Paneli</h1>
        </div>
        <div className="header-right">
          <span className="admin-welcome">Hoş geldiniz, Admin</span>
          <button onClick={handleLogout} className="logout-btn">Çıkış Yap</button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="admin-nav">
        <a href="/admin/dashboard" className="nav-item active">📊 Dashboard</a>
        <a href="/admin/books" className="nav-item">📚 Kitaplar</a>
        <a href="/admin/users" className="nav-item">👥 Kullanıcılar</a>
        <a href="/admin/games" className="nav-item">🎮 Oyunlar</a>
        <a href="/admin/reports" className="nav-item">📈 Raporlar</a>
      </nav>

      {/* Main Content */}
      <main className="admin-content">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-info">
              <h3>{stats.totalBooks}</h3>
              <p>Toplam Kitap</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>{stats.totalUsers.toLocaleString()}</h3>
              <p>Kayıtlı Kullanıcı</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎮</div>
            <div className="stat-info">
              <h3>{stats.totalGames}</h3>
              <p>Etkileşimli Oyun</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-info">
              <h3>{stats.monthlyVisits.toLocaleString()}</h3>
              <p>Aylık Ziyaret</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-section">
          <div className="chart-card">
            <h3>En Popüler Kitaplar</h3>
            <div className="popular-books">
              {stats.popularBooks.map((book, index) => (
                <div key={book.id} className="popular-book-item">
                  <div className="book-rank">#{index + 1}</div>
                  <div className="book-info">
                    <h4>{book.title}</h4>
                    <div className="book-stats">
                      <span>👁️ {book.views.toLocaleString()} görüntüleme</span>
                      <span>💰 {book.sales} satış</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="chart-card">
            <h3>Son Aktiviteler</h3>
            <div className="activity-list">
              {stats.recentActivity.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-content">
                    <strong>{activity.user}</strong> {activity.action}
                  </div>
                  <div className="activity-time">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3>Hızlı İşlemler</h3>
          <div className="action-buttons">
            <a href="/admin/books" className="action-btn">
              <span className="btn-icon">➕</span>
              <span>Yeni Kitap Ekle</span>
            </a>
            <a href="/admin/games" className="action-btn">
              <span className="btn-icon">🎮</span>
              <span>Yeni Oyun Ekle</span>
            </a>
            <a href="/admin/reports" className="action-btn">
              <span className="btn-icon">📊</span>
              <span>Rapor Oluştur</span>
            </a>
            <a href="/" className="action-btn">
              <span className="btn-icon">👁️</span>
              <span>Siteyi Görüntüle</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
