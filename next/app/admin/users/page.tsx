"use client";
import { useState, useEffect } from 'react';

export default function UserManagement() {
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
      lastActive: "1 saat önce",
      booksRead: 2,
      favoriteGenres: ["Bilim", "Fizik"],
      totalGamesPlayed: 7,
      status: "inactive"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tümü');
  const [showUserDetails, setShowUserDetails] = useState(null);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Tümü' || user.status === statusFilter.toLowerCase();
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
        }}>👥 Kullanıcı Yönetimi</h1>
      </div>

      {/* Filters */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '30px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e5e7eb',
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          minWidth: '200px'
        }}>
          <label style={{
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#374151'
          }}>Arama:</label>
          <input
            type="text"
            placeholder="İsim veya email ile ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '10px 15px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '0.9rem'
            }}
          />
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          minWidth: '150px'
        }}>
          <label style={{
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#374151'
          }}>Durum:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '10px 15px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '0.9rem',
              background: 'white',
              cursor: 'pointer'
            }}
          >
            <option value="Tümü">Tümü</option>
            <option value="active">Aktif</option>
            <option value="inactive">Pasif</option>
          </select>
        </div>
        <div style={{
          background: '#f3f4f6',
          padding: '10px 20px',
          borderRadius: '20px',
          fontSize: '0.9rem',
          color: '#6b7280',
          fontWeight: '500',
          marginLeft: 'auto'
        }}>
          {filteredUsers.length} kullanıcı bulundu
        </div>
      </div>

      {/* Users Table */}
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
              }}>Kullanıcı</th>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                fontWeight: '600',
                color: '#374151'
              }}>Katılım Tarihi</th>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                fontWeight: '600',
                color: '#374151'
              }}>Son Aktivite</th>
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
              }}>Favori Kategoriler</th>
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
            {filteredUsers.map(user => (
              <tr key={user.id} style={{
                borderBottom: '1px solid #f3f4f6'
              }}>
                <td style={{ padding: '12px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: '600',
                      fontSize: '0.9rem'
                    }}>
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{
                        fontWeight: '600',
                        color: '#1f2937',
                        marginBottom: '2px'
                      }}>{user.name}</div>
                      <div style={{
                        fontSize: '0.8rem',
                        color: '#6b7280'
                      }}>{user.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#6b7280'
                  }}>
                    {new Date(user.joinDate).toLocaleDateString('tr-TR')}
                  </div>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#6b7280'
                  }}>
                    {user.lastActive}
                  </div>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#6b7280'
                  }}>
                    <div>📚 {user.booksRead} kitap</div>
                    <div>🎮 {user.totalGamesPlayed} oyun</div>
                  </div>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{
                    display: 'flex',
                    gap: '4px',
                    flexWrap: 'wrap'
                  }}>
                    {user.favoriteGenres.map((genre, index) => (
                      <span key={index} style={{
                        background: '#dbeafe',
                        color: '#1e40af',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        fontWeight: '500'
                      }}>
                        {genre}
                      </span>
                    ))}
                  </div>
                </td>
                <td style={{ padding: '12px' }}>
                  <button 
                    style={{
                      background: user.status === 'active' ? '#dcfce7' : '#fee2e2',
                      color: user.status === 'active' ? '#166534' : '#dc2626',
                      border: 'none',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                    onClick={() => toggleUserStatus(user.id)}
                  >
                    {user.status === 'active' ? 'Aktif' : 'Pasif'}
                  </button>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{
                    display: 'flex',
                    gap: '8px'
                  }}>
                    <button 
                      style={{
                        background: '#dbeafe',
                        color: '#1e40af',
                        border: 'none',
                        padding: '6px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                      onClick={() => setShowUserDetails(user)}
                    >
                      👁️
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

      {/* User Details Modal */}
      {showUserDetails && (
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
              }}>Kullanıcı Detayları</h3>
              <button 
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
                onClick={() => setShowUserDetails(null)}
              >×</button>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                background: '#f8f9fa',
                borderRadius: '8px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '1.2rem'
                }}>
                  {showUserDetails.name.charAt(0)}
                </div>
                <div>
                  <div style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '4px'
                  }}>{showUserDetails.name}</div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#6b7280'
                  }}>{showUserDetails.email}</div>
                </div>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px'
              }}>
                <div>
                  <div style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '4px'
                  }}>Katılım Tarihi</div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#6b7280'
                  }}>{new Date(showUserDetails.joinDate).toLocaleDateString('tr-TR')}</div>
                </div>
                <div>
                  <div style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '4px'
                  }}>Son Aktivite</div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#6b7280'
                  }}>{showUserDetails.lastActive}</div>
                </div>
                <div>
                  <div style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '4px'
                  }}>Okunan Kitap</div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#6b7280'
                  }}>{showUserDetails.booksRead} kitap</div>
                </div>
                <div>
                  <div style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '4px'
                  }}>Oynanan Oyun</div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#6b7280'
                  }}>{showUserDetails.totalGamesPlayed} oyun</div>
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>Favori Kategoriler</div>
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  flexWrap: 'wrap'
                }}>
                  {showUserDetails.favoriteGenres.map((genre, index) => (
                    <span key={index} style={{
                      background: '#dbeafe',
                      color: '#1e40af',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: '500'
                    }}>
                      {genre}
                    </span>
                  ))}
                </div>
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
                onClick={() => setShowUserDetails(null)}
              >Kapat</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}