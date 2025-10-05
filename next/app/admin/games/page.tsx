"use client";
import { useState, useEffect } from 'react';

export default function GameManagement() {
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
        }}>🎮 Oyun Yönetimi</h1>
        <button 
          style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'transform 0.2s ease'
          }}
          onClick={() => setShowAddModal(true)}
        >
          ➕ Yeni Oyun Ekle
        </button>
      </div>

      {/* Game Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem'
          }}>🎮</div>
          <div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1f2937'
            }}>{games.length}</div>
            <div style={{
              fontSize: '0.9rem',
              color: '#6b7280'
            }}>Toplam Oyun</div>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem'
          }}>👥</div>
          <div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1f2937'
            }}>{games.reduce((sum, game) => sum + game.playCount, 0)}</div>
            <div style={{
              fontSize: '0.9rem',
              color: '#6b7280'
            }}>Toplam Oynanma</div>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem'
          }}>⭐</div>
          <div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1f2937'
            }}>{Math.round(games.reduce((sum, game) => sum + game.avgScore, 0) / games.length)}</div>
            <div style={{
              fontSize: '0.9rem',
              color: '#6b7280'
            }}>Ortalama Skor</div>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem'
          }}>🔥</div>
          <div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1f2937'
            }}>{games.filter(g => g.status === 'active').length}</div>
            <div style={{
              fontSize: '0.9rem',
              color: '#6b7280'
            }}>Aktif Oyun</div>
          </div>
        </div>
      </div>

      {/* Games Table */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e5e7eb',
        overflow: 'auto'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse'
        }}>
          <thead>
            <tr style={{
              borderBottom: '2px solid #e5e7eb'
            }}>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                fontWeight: '600',
                color: '#374151'
              }}>Oyun Adı</th>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                fontWeight: '600',
                color: '#374151'
              }}>Kitap</th>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                fontWeight: '600',
                color: '#374151'
              }}>Kategori</th>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                fontWeight: '600',
                color: '#374151'
              }}>Zorluk</th>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                fontWeight: '600',
                color: '#374151'
              }}>İstatistikler</th>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                fontWeight: '600',
                color: '#374151'
              }}>Durum</th>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                fontWeight: '600',
                color: '#374151'
              }}>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {games.map(game => (
              <tr key={game.id} style={{
                borderBottom: '1px solid #f3f4f6'
              }}>
                <td style={{ padding: '12px' }}>
                  <div>
                    <div style={{
                      fontWeight: '600',
                      color: '#1f2937',
                      marginBottom: '4px'
                    }}>{game.name}</div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: '#6b7280'
                    }}>{game.description}</div>
                  </div>
                </td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    background: '#dbeafe',
                    color: '#1e40af',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: '500'
                  }}>{game.book}</span>
                </td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    background: '#f3e8ff',
                    color: '#7c3aed',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: '500'
                  }}>{game.category}</span>
                </td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    background: game.difficulty === 'Kolay' ? '#dcfce7' : 
                               game.difficulty === 'Orta' ? '#fef3c7' : '#fee2e2',
                    color: game.difficulty === 'Kolay' ? '#166534' : 
                           game.difficulty === 'Orta' ? '#92400e' : '#dc2626',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: '500'
                  }}>{game.difficulty}</span>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#6b7280'
                  }}>
                    <div>🎮 {game.playCount} oynanma</div>
                    <div>⭐ {game.avgScore} ortalama</div>
                  </div>
                </td>
                <td style={{ padding: '12px' }}>
                  <button 
                    style={{
                      background: game.status === 'active' ? '#dcfce7' : '#fee2e2',
                      color: game.status === 'active' ? '#166534' : '#dc2626',
                      border: 'none',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                    onClick={() => toggleGameStatus(game.id)}
                  >
                    {game.status === 'active' ? 'Aktif' : 'Pasif'}
                  </button>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{
                    display: 'flex',
                    gap: '8px'
                  }}>
                    <button style={{
                      background: '#dbeafe',
                      color: '#1e40af',
                      border: 'none',
                      padding: '6px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.8rem'
                    }}>▶️</button>
                    <button 
                      style={{
                        background: '#fef3c7',
                        color: '#92400e',
                        border: 'none',
                        padding: '6px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                      onClick={() => handleEditGame(game)}
                    >
                      ✏️
                    </button>
                    <button 
                      style={{
                        background: '#fee2e2',
                        color: '#dc2626',
                        border: 'none',
                        padding: '6px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
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
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#1f2937',
                margin: '0'
              }}>Yeni Oyun Ekle</h3>
              <button 
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
                onClick={() => setShowAddModal(false)}
              >×</button>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500',
                  color: '#374151'
                }}>Oyun Adı:</label>
                <input 
                  type="text" 
                  value={newGame.name}
                  onChange={(e) => setNewGame(prev => ({ ...prev, name: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500',
                  color: '#374151'
                }}>Kitap:</label>
                <select 
                  value={newGame.book}
                  onChange={(e) => setNewGame(prev => ({ ...prev, book: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="">Seçiniz</option>
                  <option value="Benim Küçük Deneylerim">Benim Küçük Deneylerim</option>
                  <option value="Hava Olayları">Hava Olayları</option>
                  <option value="50 Macera">50 Macera</option>
                  <option value="Atalarımızdan Dersler">Atalarımızdan Dersler</option>
                  <option value="Oyunlarla Satranç">Oyunlarla Satranç</option>
                </select>
              </div>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500',
                  color: '#374151'
                }}>Kategori:</label>
                <select 
                  value={newGame.category}
                  onChange={(e) => setNewGame(prev => ({ ...prev, category: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.9rem'
                  }}
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
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500',
                  color: '#374151'
                }}>Zorluk:</label>
                <select 
                  value={newGame.difficulty}
                  onChange={(e) => setNewGame(prev => ({ ...prev, difficulty: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="">Seçiniz</option>
                  <option value="Kolay">Kolay</option>
                  <option value="Orta">Orta</option>
                  <option value="Zor">Zor</option>
                </select>
              </div>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500',
                  color: '#374151'
                }}>Açıklama:</label>
                <textarea 
                  value={newGame.description}
                  onChange={(e) => setNewGame(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    resize: 'vertical'
                  }}
                />
              </div>
            </div>
            <div style={{
              display: 'flex',
              gap: '12px',
              marginTop: '20px',
              justifyContent: 'flex-end'
            }}>
              <button 
                style={{
                  background: '#f3f4f6',
                  color: '#374151',
                  border: '1px solid #d1d5db',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
                onClick={() => setShowAddModal(false)}
              >İptal</button>
              <button 
                style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
                onClick={handleAddGame}
              >Oyun Ekle</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Game Modal */}
      {editingGame && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#1f2937',
                margin: '0'
              }}>Oyun Düzenle</h3>
              <button 
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
                onClick={() => setEditingGame(null)}
              >×</button>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500',
                  color: '#374151'
                }}>Oyun Adı:</label>
                <input 
                  type="text" 
                  value={editingGame.name}
                  onChange={(e) => setEditingGame(prev => ({ ...prev, name: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500',
                  color: '#374151'
                }}>Kitap:</label>
                <select 
                  value={editingGame.book}
                  onChange={(e) => setEditingGame(prev => ({ ...prev, book: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="Benim Küçük Deneylerim">Benim Küçük Deneylerim</option>
                  <option value="Hava Olayları">Hava Olayları</option>
                  <option value="50 Macera">50 Macera</option>
                  <option value="Atalarımızdan Dersler">Atalarımızdan Dersler</option>
                  <option value="Oyunlarla Satranç">Oyunlarla Satranç</option>
                </select>
              </div>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500',
                  color: '#374151'
                }}>Kategori:</label>
                <select 
                  value={editingGame.category}
                  onChange={(e) => setEditingGame(prev => ({ ...prev, category: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.9rem'
                  }}
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
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500',
                  color: '#374151'
                }}>Zorluk:</label>
                <select 
                  value={editingGame.difficulty}
                  onChange={(e) => setEditingGame(prev => ({ ...prev, difficulty: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="Kolay">Kolay</option>
                  <option value="Orta">Orta</option>
                  <option value="Zor">Zor</option>
                </select>
              </div>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500',
                  color: '#374151'
                }}>Açıklama:</label>
                <textarea 
                  value={editingGame.description}
                  onChange={(e) => setEditingGame(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    resize: 'vertical'
                  }}
                />
              </div>
            </div>
            <div style={{
              display: 'flex',
              gap: '12px',
              marginTop: '20px',
              justifyContent: 'flex-end'
            }}>
              <button 
                style={{
                  background: '#f3f4f6',
                  color: '#374151',
                  border: '1px solid #d1d5db',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
                onClick={() => setEditingGame(null)}
              >İptal</button>
              <button 
                style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
                onClick={handleUpdateGame}
              >Güncelle</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}