"use client";
import { useState, useEffect } from 'react';

export default function ReportsPage() {
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
        { category: "Satranç", users: 189, percentage: 15 },
        { category: "Tarih", users: 156, percentage: 13 },
        { category: "Fizik", users: 123, percentage: 10 }
      ]
    }
  });

  const exportToExcel = () => {
    const data = [
      ['Rapor Türü', 'Metrik', 'Değer'],
      ['Kullanıcılar', 'Toplam Kullanıcı', reports.users.totalUsers],
      ['Kullanıcılar', 'Yeni Kullanıcı', reports.users.newUsers],
      ['Kullanıcılar', 'Aktif Kullanıcı', reports.users.activeUsers],
      ['Etkileşim', 'Toplam Görüntüleme', reports.engagement.totalViews],
      ['Etkileşim', 'Toplam Etkileşim', reports.engagement.totalInteractions],
      ['Oyunlar', 'Toplam Oynanma', reports.games.totalPlays],
      ['Oyunlar', 'Ortalama Skor', reports.games.avgScore],
      ['Analitik', 'Ortalama Oturum Süresi', reports.analytics.avgSessionTime],
      ['Analitik', 'Çıkış Oranı', reports.analytics.bounceRate],
      ['Analitik', 'Geri Dönen Ziyaretçi', reports.analytics.returnVisitors]
    ];

    const csvContent = data.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'rapor.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{
      padding: '20px',
      background: '#f8f9fa',
      minHeight: '100vh'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: '#1f2937',
          margin: '0'
        }}>📈 Raporlar ve Analitik</h1>
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center'
        }}>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '2px solid #e5e7eb',
              borderRadius: '6px',
              fontSize: '0.9rem',
              background: 'white',
              cursor: 'pointer'
            }}
          >
            <option value="week">Son Hafta</option>
            <option value="month">Son Ay</option>
            <option value="quarter">Son Çeyrek</option>
            <option value="year">Son Yıl</option>
          </select>
          <button
            onClick={exportToExcel}
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '0.9rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            📊 Excel'e Aktar
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem'
          }}>👥</div>
          <div>
            <h3 style={{
              fontSize: '0.9rem',
              color: '#6b7280',
              margin: '0 0 4px 0',
              fontWeight: '500'
            }}>Toplam Kullanıcı</h3>
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#1f2937'
            }}>{reports.users.totalUsers.toLocaleString()}</div>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem'
          }}>👁️</div>
          <div>
            <h3 style={{
              fontSize: '0.9rem',
              color: '#6b7280',
              margin: '0 0 4px 0',
              fontWeight: '500'
            }}>Toplam Görüntüleme</h3>
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#1f2937'
            }}>{reports.engagement.totalViews.toLocaleString()}</div>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem'
          }}>🎮</div>
          <div>
            <h3 style={{
              fontSize: '0.9rem',
              color: '#6b7280',
              margin: '0 0 4px 0',
              fontWeight: '500'
            }}>Toplam Oynanma</h3>
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#1f2937'
            }}>{reports.games.totalPlays.toLocaleString()}</div>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem'
          }}>⭐</div>
          <div>
            <h3 style={{
              fontSize: '0.9rem',
              color: '#6b7280',
              margin: '0 0 4px 0',
              fontWeight: '500'
            }}>Ortalama Skor</h3>
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#1f2937'
            }}>{reports.games.avgScore}</div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{
            fontSize: '1.2rem',
            fontWeight: '600',
            color: '#1f2937',
            margin: '0 0 20px 0'
          }}>En Popüler Kitaplar</h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {reports.engagement.topViewedBooks.map((book, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px',
                background: '#f8f9fa',
                borderRadius: '8px'
              }}>
                <div>
                  <div style={{
                    fontWeight: '500',
                    color: '#1f2937',
                    marginBottom: '2px'
                  }}>{book.name}</div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#6b7280'
                  }}>{book.interactions} etkileşim</div>
                </div>
                <div style={{
                  background: '#dbeafe',
                  color: '#1e40af',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: '500'
                }}>
                  {book.views} görüntüleme
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{
            fontSize: '1.2rem',
            fontWeight: '600',
            color: '#1f2937',
            margin: '0 0 20px 0'
          }}>En Çok Oynanan Oyunlar</h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {reports.games.mostPlayedGames.map((game, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px',
                background: '#f8f9fa',
                borderRadius: '8px'
              }}>
                <div>
                  <div style={{
                    fontWeight: '500',
                    color: '#1f2937',
                    marginBottom: '2px'
                  }}>{game.name}</div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#6b7280'
                  }}>{game.avgScore} ortalama skor</div>
                </div>
                <div style={{
                  background: '#dcfce7',
                  color: '#166534',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: '500'
                }}>
                  {game.plays} oynanma
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{
            fontSize: '1.2rem',
            fontWeight: '600',
            color: '#1f2937',
            margin: '0 0 20px 0'
          }}>Kullanıcı Analitikleri</h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              background: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <span style={{
                fontSize: '0.9rem',
                color: '#6b7280'
              }}>Ortalama Oturum Süresi</span>
              <span style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#1f2937'
              }}>{reports.analytics.avgSessionTime}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              background: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <span style={{
                fontSize: '0.9rem',
                color: '#6b7280'
              }}>Çıkış Oranı</span>
              <span style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#1f2937'
              }}>{reports.analytics.bounceRate}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              background: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <span style={{
                fontSize: '0.9rem',
                color: '#6b7280'
              }}>Geri Dönen Ziyaretçi</span>
              <span style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#1f2937'
              }}>{reports.analytics.returnVisitors}</span>
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{
            fontSize: '1.2rem',
            fontWeight: '600',
            color: '#1f2937',
            margin: '0 0 20px 0'
          }}>Favori Kategoriler</h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {reports.analytics.favoriteCategories.map((category, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px',
                background: '#f8f9fa',
                borderRadius: '8px'
              }}>
                <div>
                  <div style={{
                    fontWeight: '500',
                    color: '#1f2937',
                    marginBottom: '2px'
                  }}>{category.category}</div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#6b7280'
                  }}>{category.users} kullanıcı</div>
                </div>
                <div style={{
                  background: '#dbeafe',
                  color: '#1e40af',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: '500'
                }}>
                  %{category.percentage}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}