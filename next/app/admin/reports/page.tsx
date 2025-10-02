"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ReportsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [reports, setReports] = useState({
    engagement: {
      totalViews: 45680,
      totalInteractions: 482,
      topViewedBooks: [
        { name: "Oyunlarla Satranç", views: 156, interactions: 2341 },
        { name: "Hava Olayları", views: 98, interactions: 1892 },
        { name: "Benim Küçük Deneylerim", views: 87, interactions: 1654 },
        { name: "Atalarımızdan Dersler", views: 76, interactions: 1432 },
        { name: "50 Macera", views: 65, interactions: 1287 }
      ]
    },
    users: {
      totalUsers: 1247,
      newUsers: 89,
      activeUsers: 892,
      userGrowth: [
        { month: "Ocak", users: 156 },
        { month: "Şubat", users: 189 },
        { month: "Mart", users: 234 },
        { month: "Nisan", users: 198 },
        { month: "Mayıs", users: 267 },
        { month: "Haziran", users: 203 }
      ]
    },
    games: {
      totalPlays: 1892,
      avgScore: 84,
      mostPlayedGames: [
        { name: "Koyun vs Kurt", plays: 234, avgScore: 85 },
        { name: "Rüzgar Yönü", plays: 198, avgScore: 91 },
        { name: "Gökkuşağı Renkleri", plays: 201, avgScore: 89 },
        { name: "Polis vs Hırsız", plays: 189, avgScore: 92 },
        { name: "Termometre", plays: 178, avgScore: 87 }
      ]
    },
    analytics: {
      avgSessionTime: "12:34",
      bounceRate: "23%",
      returnVisitors: "67%",
      favoriteCategories: [
        { category: "Bilim", users: 456, percentage: 37 },
        { category: "Macera", users: 234, percentage: 19 },
        { category: "Satranç", users: 198, percentage: 16 },
        { category: "Tarih", users: 178, percentage: 14 },
        { category: "Eğitim", users: 181, percentage: 14 }
      ]
    }
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

  const generateReport = () => {
    alert('Rapor PDF olarak indiriliyor... (Demo)');
  };

  const exportData = (type) => {
    let csvContent = '';
    let filename = '';
    
    if (type === 'Etkileşim') {
      csvContent = 'Sıra,Kitap Adı,Görüntüleme,Etkileşim\n';
      reports.engagement.topViewedBooks.forEach((book, index) => {
        csvContent += `${index + 1},"${book.name}",${book.views},${book.interactions}\n`;
      });
      filename = 'etkilesim-raporu.csv';
    } else if (type === 'Kullanıcı') {
      csvContent = 'Ay,Kullanıcı Sayısı\n';
      reports.users.userGrowth.forEach(data => {
        csvContent += `${data.month},${data.users}\n`;
      });
      filename = 'kullanici-buyumesi.csv';
    } else if (type === 'Oyun') {
      csvContent = 'Sıra,Oyun Adı,Oynanma,Ortalama Skor\n';
      reports.games.mostPlayedGames.forEach((game, index) => {
        csvContent += `${index + 1},"${game.name}",${game.plays},${game.avgScore}\n`;
      });
      filename = 'oyun-raporu.csv';
    }
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          <h1>Raporlar ve Analitik</h1>
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
        <a href="/admin/games" className="nav-item">🎮 Oyunlar</a>
        <a href="/admin/reports" className="nav-item active">📈 Raporlar</a>
      </nav>

      {/* Main Content */}
      <main className="admin-content">
        <div className="page-header">
          <h2>Raporlar ve Analitik</h2>
          <div className="report-controls">
            <select 
              value={selectedPeriod} 
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="period-select"
            >
              <option value="week">Son Hafta</option>
              <option value="month">Son Ay</option>
              <option value="quarter">Son 3 Ay</option>
              <option value="year">Son Yıl</option>
            </select>
            <button className="generate-btn" onClick={generateReport}>
              📄 Rapor Oluştur
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon">👁️</div>
            <div className="metric-info">
              <h3>{reports.engagement.totalViews.toLocaleString()}</h3>
              <p>Toplam Görüntüleme</p>
              <span className="metric-change">+12% bu ay</span>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">🎯</div>
            <div className="metric-info">
              <h3>{reports.engagement.totalInteractions}</h3>
              <p>Toplam Etkileşim</p>
              <span className="metric-change">+8% bu ay</span>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">👥</div>
            <div className="metric-info">
              <h3>{reports.users.totalUsers.toLocaleString()}</h3>
              <p>Toplam Kullanıcı</p>
              <span className="metric-change">+{reports.users.newUsers} yeni</span>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">🎮</div>
            <div className="metric-info">
              <h3>{reports.games.totalPlays.toLocaleString()}</h3>
              <p>Oyun Oynanma</p>
              <span className="metric-change">+15% bu ay</span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-section">
          {/* Engagement Report */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>En Çok Görüntülenen Kitaplar</h3>
              <button className="export-btn" onClick={() => exportData('Etkileşim')}>
                📊 Excel
              </button>
            </div>
            <div className="chart-content">
              {reports.engagement.topViewedBooks.map((book, index) => (
                <div key={book.name} className="chart-item">
                  <div className="item-rank">#{index + 1}</div>
                  <div className="item-info">
                    <h4>{book.name}</h4>
                    <div className="item-stats">
                      <span>👁️ {book.views} görüntüleme</span>
                      <span>🎯 {book.interactions} etkileşim</span>
                    </div>
                  </div>
                  <div className="item-bar">
                    <div 
                      className="bar-fill" 
                      style={{ width: `${(book.views / 156) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Growth */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Kullanıcı Büyümesi</h3>
              <button className="export-btn" onClick={() => exportData('Kullanıcı')}>
                📊 Excel
              </button>
            </div>
            <div className="chart-content">
              <div className="growth-chart">
                {reports.users.userGrowth.map((data, index) => (
                  <div key={data.month} className="growth-bar">
                    <div 
                      className="bar" 
                      style={{ height: `${(data.users / 267) * 100}%` }}
                    ></div>
                    <span className="bar-label">{data.month}</span>
                    <span className="bar-value">{data.users}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Game Performance */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>En Popüler Oyunlar</h3>
              <button className="export-btn" onClick={() => exportData('Oyun')}>
                📊 Excel
              </button>
            </div>
            <div className="chart-content">
              {reports.games.mostPlayedGames.map((game, index) => (
                <div key={game.name} className="game-item">
                  <div className="game-rank">#{index + 1}</div>
                  <div className="game-info">
                    <h4>{game.name}</h4>
                    <div className="game-stats">
                      <span>🎮 {game.plays} oynanma</span>
                      <span>⭐ {game.avgScore} ortalama</span>
                    </div>
                  </div>
                  <div className="score-bar">
                    <div 
                      className="score-fill" 
                      style={{ width: `${game.avgScore}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Analysis */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Kategori Analizi</h3>
              <button className="export-btn" onClick={() => exportData('Kategori')}>
                📊 Excel
              </button>
            </div>
            <div className="chart-content">
              {reports.analytics.favoriteCategories.map((category, index) => (
                <div key={category.category} className="category-item">
                  <div className="category-info">
                    <h4>{category.category}</h4>
                    <span>{category.users} kullanıcı</span>
                  </div>
                  <div className="category-bar">
                    <div 
                      className="category-fill" 
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <div className="category-percentage">{category.percentage}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Engagement Metrics */}
        <div className="engagement-section">
          <h3>Kullanıcı Etkileşim Metrikleri</h3>
          <div className="engagement-grid">
            <div className="engagement-item">
              <div className="engagement-icon">⏱️</div>
              <div className="engagement-info">
                <h4>Ortalama Oturum Süresi</h4>
                <p>{reports.analytics.avgSessionTime}</p>
              </div>
            </div>
            <div className="engagement-item">
              <div className="engagement-icon">📈</div>
              <div className="engagement-info">
                <h4>Geri Dönüş Oranı</h4>
                <p>{reports.analytics.returnVisitors}</p>
              </div>
            </div>
            <div className="engagement-item">
              <div className="engagement-icon">📉</div>
              <div className="engagement-info">
                <h4>Çıkış Oranı</h4>
                <p>{reports.analytics.bounceRate}</p>
              </div>
            </div>
            <div className="engagement-item">
              <div className="engagement-icon">⭐</div>
              <div className="engagement-info">
                <h4>Ortalama Oyun Skoru</h4>
                <p>{reports.games.avgScore}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="export-section">
          <h3>Veri Dışa Aktarma</h3>
          <div className="export-buttons">
            <button className="export-btn" onClick={() => exportData('Tüm Veriler')}>
              📊 Tüm Veriler (Excel)
            </button>
            <button className="export-btn" onClick={() => exportData('Satış Raporu')}>
              💰 Satış Raporu (PDF)
            </button>
            <button className="export-btn" onClick={() => exportData('Kullanıcı Analizi')}>
              👥 Kullanıcı Analizi (Excel)
            </button>
            <button className="export-btn" onClick={() => exportData('Oyun İstatistikleri')}>
              🎮 Oyun İstatistikleri (Excel)
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
