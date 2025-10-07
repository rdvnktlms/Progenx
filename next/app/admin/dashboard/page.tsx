"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createTestData, clearTestData, showTestDataInfo } from '../../utils/testData';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalBooks: 5,
    totalUsers: 1247,
    totalGames: 12,
    monthlyVisits: 8934
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

      // Demo veriler
      setStats({
        totalBooks: 5,
        totalUsers: 1247,
        totalGames: 12,
        monthlyVisits: 8934
      });
    }
  }, [router]);

  return (
    <div style={{
      padding: '20px',
      background: '#f8f9fa',
      minHeight: '100vh'
    }}>
      <div style={{
        marginBottom: '30px',
        background: 'linear-gradient(135deg, rgb(205, 23, 25), rgb(180, 20, 22))',
        color: 'white',
        padding: '20px',
        borderRadius: '12px'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: 'white',
          margin: '0 0 10px 0'
        }}>📊 Dashboard</h1>
        <p style={{
          color: 'white',
          fontSize: '1rem',
          margin: '0'
        }}>İnteraktif Kitap Projesi Yönetim Paneli</p>
        
        {/* Test Verileri Butonları */}
        <div style={{
          marginTop: '20px',
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={createTestData}
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            🧪 Test Verileri Oluştur
          </button>
          <button
            onClick={clearTestData}
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            🗑️ Test Verilerini Temizle
          </button>
          <button
            onClick={() => {
              const info = showTestDataInfo();
              alert(`Test Verileri:\nOyun Oturumları: ${info.gameSessions}\nSayfa Görüntülemeleri: ${info.pageViews}`);
            }}
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            📊 Test Verilerini Göster
          </button>
        </div>
      </div>

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
          }}>📚</div>
          <div>
            <h3 style={{
              fontSize: '0.9rem',
              color: '#6b7280',
              margin: '0 0 4px 0',
              fontWeight: '500'
            }}>Toplam Kitaplar</h3>
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#1f2937'
            }}>{stats.totalBooks}</div>
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
          }}>👥</div>
          <div>
            <h3 style={{
              fontSize: '0.9rem',
              color: '#6b7280',
              margin: '0 0 4px 0',
              fontWeight: '500'
            }}>Kayıtlı Kullanıcı</h3>
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#1f2937'
            }}>{stats.totalUsers.toLocaleString()}</div>
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
            }}>Toplam Oyunlar</h3>
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#1f2937'
            }}>{stats.totalGames}</div>
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
          }}>📈</div>
          <div>
            <h3 style={{
              fontSize: '0.9rem',
              color: '#6b7280',
              margin: '0 0 4px 0',
              fontWeight: '500'
            }}>Aylık Ziyaret</h3>
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#1f2937'
            }}>{stats.monthlyVisits.toLocaleString()}</div>
          </div>
        </div>
      </div>

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
          }}>📚 Popüler Kitaplar</h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
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
                fontWeight: '500',
                color: '#1f2937'
              }}>Benim Küçük Deneylerim</span>
              <span style={{
                color: '#059669',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}>156 satış</span>
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
                fontWeight: '500',
                color: '#1f2937'
              }}>Hava Olayları</span>
              <span style={{
                color: '#059669',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}>98 satış</span>
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
                fontWeight: '500',
                color: '#1f2937'
              }}>Oyunlarla Satranç</span>
              <span style={{
                color: '#059669',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}>87 satış</span>
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
          }}>🎮 Son Aktiviteler</h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              background: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <span style={{ fontSize: '1.2rem' }}>🎯</span>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontWeight: '500',
                  color: '#1f2937',
                  fontSize: '0.9rem'
                }}>Termometre oyunu oynandı</div>
                <div style={{
                  color: '#6b7280',
                  fontSize: '0.8rem'
                }}>2 dakika önce</div>
              </div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              background: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <span style={{ fontSize: '1.2rem' }}>🌊</span>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontWeight: '500',
                  color: '#1f2937',
                  fontSize: '0.9rem'
                }}>Su gemisi simülasyonu</div>
                <div style={{
                  color: '#6b7280',
                  fontSize: '0.8rem'
                }}>5 dakika önce</div>
              </div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              background: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <span style={{ fontSize: '1.2rem' }}>🎈</span>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontWeight: '500',
                  color: '#1f2937',
                  fontSize: '0.9rem'
                }}>Fırlayan balon deneyi</div>
                <div style={{
                  color: '#6b7280',
                  fontSize: '0.8rem'
                }}>10 dakika önce</div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
          }}>⚡ Hızlı İşlemler</h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <button style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              padding: '12px 16px',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}>📚 Yeni Kitap Ekle</button>
            <button style={{
              background: '#f3f4f6',
              color: '#374151',
              border: '1px solid #d1d5db',
              padding: '12px 16px',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}>👥 Kullanıcı Ekle</button>
            <button style={{
              background: '#f3f4f6',
              color: '#374151',
              border: '1px solid #d1d5db',
              padding: '12px 16px',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}>🎮 Oyun Ekle</button>
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
          }}>📊 Sistem Durumu</h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 0'
            }}>
              <span style={{
                color: '#6b7280',
                fontSize: '0.9rem'
              }}>Sunucu</span>
              <span style={{
                color: '#059669',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}>Çevrimiçi</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 0'
            }}>
              <span style={{
                color: '#6b7280',
                fontSize: '0.9rem'
              }}>Veritabanı</span>
              <span style={{
                color: '#059669',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}>Çevrimiçi</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 0'
            }}>
              <span style={{
                color: '#6b7280',
                fontSize: '0.9rem'
              }}>API</span>
              <span style={{
                color: '#059669',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}>Çevrimiçi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}