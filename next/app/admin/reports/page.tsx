"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAnalyticsData, AnalyticsData } from '../../utils/analytics';

export default function ReportsPage() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [reports, setReports] = useState<AnalyticsData>({
    totalUsers: 0,
    totalGamesPlayed: 0,
    totalViews: 0,
    averageScore: 0,
    mostPopularBooks: [],
    mostPlayedGames: [],
    userGrowth: [],
    categoryStats: []
  });

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

      // Gerçek analytics verilerini yükle
      const analyticsData = getAnalyticsData();
      setReports(analyticsData);
    }
  }, [router]);

  const exportToExcel = () => {
    const data = [
      ['Rapor Türü', 'Metrik', 'Değer'],
      ['Kullanıcılar', 'Toplam Kullanıcı', reports.totalUsers],
      ['Oyunlar', 'Toplam Oynanma', reports.totalGamesPlayed],
      ['Oyunlar', 'Ortalama Skor', reports.averageScore],
      ['Görüntüleme', 'Toplam Görüntüleme', reports.totalViews],
      ['Analitik', 'En Popüler Kitap', reports.mostPopularBooks[0]?.title || 'N/A'],
      ['Analitik', 'En Çok Oynanan Oyun', reports.mostPlayedGames[0]?.name || 'N/A']
    ];

    const csvContent = data.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `rapor_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{
      padding: '20px',
      background: '#f8f9fa',
      minHeight: '100vh',
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, Noto Sans'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '30px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '30px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          background: 'linear-gradient(135deg, rgb(205, 23, 25), rgb(180, 20, 22))',
          color: 'white',
          padding: '20px',
          borderRadius: '12px'
        }}>
          <h1 style={{
            margin: '0',
            fontSize: '2rem',
            fontWeight: '700',
            color: 'white'
          }}>
            📈 Raporlar ve Analitik
          </h1>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '0.9rem',
                background: 'white'
              }}
            >
              <option value="week">Son Hafta</option>
              <option value="month">Son Ay</option>
              <option value="quarter">Son 3 Ay</option>
              <option value="year">Son Yıl</option>
            </select>
            <button
              onClick={exportToExcel}
              style={{
                background: 'linear-gradient(135deg, #059669, #047857)',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              📊 Excel'e Aktar
            </button>
          </div>
        </div>

        {/* Ana Metrikler */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            color: 'white',
            padding: '25px',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '8px' }}>
              {reports.totalUsers.toLocaleString()}
            </div>
            <div style={{ fontSize: '1rem', opacity: 0.9 }}>Toplam Kullanıcı</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            padding: '25px',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '8px' }}>
              {reports.totalGamesPlayed.toLocaleString()}
            </div>
            <div style={{ fontSize: '1rem', opacity: 0.9 }}>Toplam Oynanma</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: 'white',
            padding: '25px',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '8px' }}>
              {reports.averageScore}%
            </div>
            <div style={{ fontSize: '1rem', opacity: 0.9 }}>Ortalama Skor</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            color: 'white',
            padding: '25px',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '8px' }}>
              {reports.totalViews.toLocaleString()}
            </div>
            <div style={{ fontSize: '1rem', opacity: 0.9 }}>Toplam Görüntüleme</div>
          </div>
        </div>

        {/* En Popüler Kitaplar */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '25px',
          marginBottom: '30px',
          border: '1px solid #e5e7eb'
        }}>
          <h2 style={{
            margin: '0 0 20px 0',
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1f2937'
          }}>
            📚 En Popüler Kitaplar
          </h2>
          {reports.mostPopularBooks.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {reports.mostPopularBooks.map((book, index) => (
                <div key={book.bookId} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{
                      width: '30px',
                      height: '30px',
                      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                      color: 'white',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '0.9rem'
                    }}>
                      {index + 1}
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                        {book.title}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                        {book.views} görüntüleme • {book.gamesPlayed} oyun
                      </div>
                    </div>
                  </div>
                  <div style={{
                    background: '#e0f2fe',
                    color: '#0369a1',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>
                    {book.views + book.gamesPlayed} toplam
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#6b7280',
              fontSize: '1.1rem'
            }}>
              Henüz veri bulunmuyor
            </div>
          )}
        </div>

        {/* En Çok Oynanan Oyunlar */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '25px',
          marginBottom: '30px',
          border: '1px solid #e5e7eb'
        }}>
          <h2 style={{
            margin: '0 0 20px 0',
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1f2937'
          }}>
            🎮 En Çok Oynanan Oyunlar
          </h2>
          {reports.mostPlayedGames.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {reports.mostPlayedGames.map((game, index) => (
                <div key={game.gameId} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{
                      width: '30px',
                      height: '30px',
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      color: 'white',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '0.9rem'
                    }}>
                      {index + 1}
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                        {game.name}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                        {game.plays} oynanma • Ortalama: {game.avgScore}%
                      </div>
                    </div>
                  </div>
                  <div style={{
                    background: '#dcfce7',
                    color: '#166534',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>
                    {game.plays} oyun
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#6b7280',
              fontSize: '1.1rem'
            }}>
              Henüz veri bulunmuyor
            </div>
          )}
        </div>

        {/* Kullanıcı Büyümesi */}
        {reports.userGrowth.length > 0 && (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '25px',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{
              margin: '0 0 20px 0',
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#1f2937'
            }}>
              📈 Kullanıcı Büyümesi
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {reports.userGrowth.map((growth, index) => (
                <div key={growth.month} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 15px',
                  background: '#f8f9fa',
                  borderRadius: '8px'
                }}>
                  <span style={{ fontWeight: '500', color: '#1f2937' }}>{growth.month}</span>
                  <div style={{
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    +{growth.users} kullanıcı
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}