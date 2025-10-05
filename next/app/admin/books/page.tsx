"use client";
import { useState, useEffect } from 'react';

export default function BookManagement() {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Oyunlarla Satranç",
      author: "Ozan ÇAPAN",
      cover: "/img/oyunlarla-satranc-4228-9.webp",
      originalPrice: "₺450,00",
      currentPrice: "₺360,00",
      discount: "20%",
      category: "Satranç",
      ageGroup: "7-12 Yaş",
      buyLink: "https://www.odtuyayincilik.com.tr/oyunlarla-satranc-233",
      status: "active",
      views: 2341,
      sales: 156
    },
    {
      id: 2,
      title: "Hava Olayları",
      author: "Elisabeth de LAMBILLY",
      cover: "/img/hava-4a9c-b724-.jpg",
      originalPrice: "₺195,00",
      currentPrice: "₺156,00",
      discount: "20%",
      category: "Bilim",
      ageGroup: "7-12 Yaş",
      buyLink: "https://www.odtuyayincilik.com.tr/hava-307",
      status: "active",
      views: 1892,
      sales: 98
    },
    {
      id: 3,
      title: "Benim Küçük Deneylerim",
      author: "Melanie PEREZ",
      cover: "/img/benim-kucuk-deneylerim-mekanik...-5-4bcd.jpg",
      originalPrice: "₺195,00",
      currentPrice: "₺156,00",
      discount: "20%",
      category: "Bilim",
      ageGroup: "7-12 Yaş",
      buyLink: "https://www.odtuyayincilik.com.tr/benim-kucuk-deneylerim-mekanik...-317",
      status: "active",
      views: 1654,
      sales: 87
    },
    {
      id: 4,
      title: "Atalarımızdan Dersler",
      author: "Raksha Dave",
      cover: "/img/atalarımızdan dersler.jpg",
      originalPrice: "₺350,00",
      currentPrice: "₺280,00",
      discount: "20%",
      category: "Tarih",
      ageGroup: "7-12 Yaş",
      buyLink: "https://www.odtuyayincilik.com.tr/atalarimizdan-dersler",
      status: "active",
      views: 1432,
      sales: 76
    },
    {
      id: 5,
      title: "13 Yaşına Gelmeden Tatilde Yaşanacak 50 Macera İçin Kılavuz",
      author: "P.D. BACCALARIO",
      cover: "/img/tatil kitabı.jpg",
      originalPrice: "₺400,00",
      currentPrice: "₺320,00",
      discount: "20%",
      category: "Macera",
      ageGroup: "7-12 Yaş",
      buyLink: "https://www.odtuyayincilik.com.tr/13-yasina-gelmeden-tatilde-yasanacak-50-macera-icin-kilavuz",
      status: "active",
      views: 1287,
      sales: 65
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    cover: '',
    originalPrice: '',
    currentPrice: '',
    discount: '',
    category: '',
    ageGroup: '',
    buyLink: '',
    description: ''
  });

  const handleAddBook = () => {
    const book = {
      id: books.length + 1,
      ...newBook,
      status: "active",
      views: 0,
      sales: 0
    };
    setBooks([...books, book]);
    setShowAddModal(false);
    setNewBook({
      title: '',
      author: '',
      cover: '',
      originalPrice: '',
      currentPrice: '',
      discount: '',
      category: '',
      ageGroup: '',
      buyLink: '',
      description: ''
    });
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
  };

  const handleUpdateBook = () => {
    setBooks(books.map(book => 
      book.id === editingBook.id ? editingBook : book
    ));
    setEditingBook(null);
  };

  const handleDeleteBook = (bookId) => {
    if (confirm('Bu kitabı silmek istediğinizden emin misiniz?')) {
      setBooks(books.filter(book => book.id !== bookId));
    }
  };

  const toggleBookStatus = (bookId) => {
    setBooks(books.map(book => 
      book.id === bookId 
        ? { ...book, status: book.status === 'active' ? 'inactive' : 'active' }
        : book
    ));
  };

  const handleImageUpload = (event, isEdit = false) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result as string;
        if (isEdit && editingBook) {
          setEditingBook({ ...editingBook, cover: imageUrl });
        } else {
          setNewBook({ ...newBook, cover: imageUrl });
        }
      };
      reader.readAsDataURL(file);
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
        }}>📚 Kitap Yönetimi</h1>
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
          ➕ Yeni Kitap Ekle
        </button>
      </div>

      {/* Books Table */}
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
              }}>Kapak</th>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                fontWeight: '600',
                color: '#374151'
              }}>Kitap Bilgileri</th>
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
              }}>Fiyat</th>
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
            {books.map(book => (
              <tr key={book.id} style={{
                borderBottom: '1px solid #f3f4f6'
              }}>
                <td style={{ padding: '12px' }}>
                  <img 
                    src={book.cover} 
                    alt={book.title}
                    style={{
                      width: '60px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb'
                    }}
                  />
                </td>
                <td style={{ padding: '12px' }}>
                  <div>
                    <div style={{
                      fontWeight: '600',
                      color: '#1f2937',
                      marginBottom: '4px',
                      fontSize: '0.9rem'
                    }}>{book.title}</div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: '#6b7280',
                      marginBottom: '4px'
                    }}>{book.author}</div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: '#6b7280'
                    }}>{book.ageGroup}</div>
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
                  }}>{book.category}</span>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{
                    fontSize: '0.9rem'
                  }}>
                    <div style={{
                      fontWeight: '600',
                      color: '#059669'
                    }}>{book.currentPrice}</div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: '#9ca3af',
                      textDecoration: 'line-through'
                    }}>{book.originalPrice}</div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: '#dc2626',
                      fontWeight: '500'
                    }}>{book.discount} indirim</div>
                  </div>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#6b7280'
                  }}>
                    <div>👁️ {book.views} görüntüleme</div>
                    <div>💰 {book.sales} satış</div>
                  </div>
                </td>
                <td style={{ padding: '12px' }}>
                  <button 
                    style={{
                      background: book.status === 'active' ? '#dcfce7' : '#fee2e2',
                      color: book.status === 'active' ? '#166534' : '#dc2626',
                      border: 'none',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                    onClick={() => toggleBookStatus(book.id)}
                  >
                    {book.status === 'active' ? 'Aktif' : 'Pasif'}
                  </button>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{
                    display: 'flex',
                    gap: '8px'
                  }}>
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
                      onClick={() => handleEditBook(book)}
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
                      onClick={() => handleDeleteBook(book.id)}
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

      {/* Add Book Modal */}
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
            maxWidth: '600px',
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
              }}>Yeni Kitap Ekle</h3>
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
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500',
                  color: '#374151'
                }}>Kitap Adı:</label>
                <input 
                  type="text" 
                  value={newBook.title}
                  onChange={(e) => setNewBook(prev => ({ ...prev, title: e.target.value }))}
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
                }}>Yazar:</label>
                <input 
                  type="text" 
                  value={newBook.author}
                  onChange={(e) => setNewBook(prev => ({ ...prev, author: e.target.value }))}
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
                }}>Orijinal Fiyat:</label>
                <input 
                  type="text" 
                  value={newBook.originalPrice}
                  onChange={(e) => setNewBook(prev => ({ ...prev, originalPrice: e.target.value }))}
                  placeholder="₺450,00"
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
                }}>Güncel Fiyat:</label>
                <input 
                  type="text" 
                  value={newBook.currentPrice}
                  onChange={(e) => setNewBook(prev => ({ ...prev, currentPrice: e.target.value }))}
                  placeholder="₺360,00"
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
                }}>İndirim:</label>
                <input 
                  type="text" 
                  value={newBook.discount}
                  onChange={(e) => setNewBook(prev => ({ ...prev, discount: e.target.value }))}
                  placeholder="20%"
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
                }}>Kategori:</label>
                <select 
                  value={newBook.category}
                  onChange={(e) => setNewBook(prev => ({ ...prev, category: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="">Seçiniz</option>
                  <option value="Satranç">Satranç</option>
                  <option value="Bilim">Bilim</option>
                  <option value="Tarih">Tarih</option>
                  <option value="Macera">Macera</option>
                </select>
              </div>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500',
                  color: '#374151'
                }}>Yaş Grubu:</label>
                <select 
                  value={newBook.ageGroup}
                  onChange={(e) => setNewBook(prev => ({ ...prev, ageGroup: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="">Seçiniz</option>
                  <option value="7-12 Yaş">7-12 Yaş</option>
                  <option value="13-18 Yaş">13-18 Yaş</option>
                </select>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500',
                  color: '#374151'
                }}>Satın Alma Linki:</label>
                <input 
                  type="url" 
                  value={newBook.buyLink}
                  onChange={(e) => setNewBook(prev => ({ ...prev, buyLink: e.target.value }))}
                  placeholder="https://www.odtuyayincilik.com.tr/..."
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500',
                  color: '#374151'
                }}>Kitap Kapağı:</label>
                <div style={{
                  border: '2px dashed #d1d5db',
                  borderRadius: '8px',
                  padding: '20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => document.getElementById('cover-upload')?.click()}
                >
                  {newBook.cover ? (
                    <img 
                      src={newBook.cover} 
                      alt="Kapak önizleme"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '200px',
                        borderRadius: '8px'
                      }}
                    />
                  ) : (
                    <div>
                      <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📁</div>
                      <div style={{ color: '#6b7280' }}>Kapak resmi yüklemek için tıklayın</div>
                    </div>
                  )}
                  <input
                    id="cover-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => handleImageUpload(e, false)}
                  />
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
                onClick={handleAddBook}
              >Kitap Ekle</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Book Modal */}
      {editingBook && (
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
            maxWidth: '600px',
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
              }}>Kitap Düzenle</h3>
              <button 
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
                onClick={() => setEditingBook(null)}
              >×</button>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500',
                  color: '#374151'
                }}>Kitap Adı:</label>
                <input 
                  type="text" 
                  value={editingBook.title}
                  onChange={(e) => setEditingBook(prev => ({ ...prev, title: e.target.value }))}
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
                }}>Yazar:</label>
                <input 
                  type="text" 
                  value={editingBook.author}
                  onChange={(e) => setEditingBook(prev => ({ ...prev, author: e.target.value }))}
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
                }}>Orijinal Fiyat:</label>
                <input 
                  type="text" 
                  value={editingBook.originalPrice}
                  onChange={(e) => setEditingBook(prev => ({ ...prev, originalPrice: e.target.value }))}
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
                }}>Güncel Fiyat:</label>
                <input 
                  type="text" 
                  value={editingBook.currentPrice}
                  onChange={(e) => setEditingBook(prev => ({ ...prev, currentPrice: e.target.value }))}
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
                }}>İndirim:</label>
                <input 
                  type="text" 
                  value={editingBook.discount}
                  onChange={(e) => setEditingBook(prev => ({ ...prev, discount: e.target.value }))}
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
                }}>Kategori:</label>
                <select 
                  value={editingBook.category}
                  onChange={(e) => setEditingBook(prev => ({ ...prev, category: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="Satranç">Satranç</option>
                  <option value="Bilim">Bilim</option>
                  <option value="Tarih">Tarih</option>
                  <option value="Macera">Macera</option>
                </select>
              </div>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500',
                  color: '#374151'
                }}>Yaş Grubu:</label>
                <select 
                  value={editingBook.ageGroup}
                  onChange={(e) => setEditingBook(prev => ({ ...prev, ageGroup: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="7-12 Yaş">7-12 Yaş</option>
                  <option value="13-18 Yaş">13-18 Yaş</option>
                </select>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500',
                  color: '#374151'
                }}>Satın Alma Linki:</label>
                <input 
                  type="url" 
                  value={editingBook.buyLink}
                  onChange={(e) => setEditingBook(prev => ({ ...prev, buyLink: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500',
                  color: '#374151'
                }}>Kitap Kapağı:</label>
                <div style={{
                  border: '2px dashed #d1d5db',
                  borderRadius: '8px',
                  padding: '20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => document.getElementById('edit-cover-upload')?.click()}
                >
                  {editingBook.cover ? (
                    <img 
                      src={editingBook.cover} 
                      alt="Kapak önizleme"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '200px',
                        borderRadius: '8px'
                      }}
                    />
                  ) : (
                    <div>
                      <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📁</div>
                      <div style={{ color: '#6b7280' }}>Kapak resmi yüklemek için tıklayın</div>
                    </div>
                  )}
                  <input
                    id="edit-cover-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => handleImageUpload(e, true)}
                  />
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
                onClick={() => setEditingBook(null)}
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
                onClick={handleUpdateBook}
              >Güncelle</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}