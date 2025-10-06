"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UserBook {
  bookId: string;
  bookTitle: string;
  activationKey: string;
  activationDate: string;
  lastPlayed: string;
  gamesPlayed: number;
  totalPlayTime: number; // dakika
  addedBy: 'admin' | 'publisher' | 'user';
  expiryDate?: string; // YYYY-MM-DD formatında
  isActive: boolean;
}

interface User {
  id: number;
  name: string;
  email: string;
  joinDate: string;
  lastActive: string;
  status: 'active' | 'inactive' | 'suspended';
  books: UserBook[];
  totalGamesPlayed: number;
  favoriteGenres: string[];
}

export default function UserManagement() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Ahmet Yılmaz",
      email: "ahmet@example.com",
      joinDate: "2024-01-15",
      lastActive: "2 dakika önce",
      status: "active",
      books: [
        {
          bookId: "hava-olaylari",
          bookTitle: "Hava Olayları",
          activationKey: "HAVA-1234-5678-9012",
          activationDate: "2024-01-16",
          lastPlayed: "2 dakika önce",
          gamesPlayed: 8,
          totalPlayTime: 45,
          addedBy: "admin",
          expiryDate: "2024-12-31",
          isActive: true
        },
        {
          bookId: "benim-kucuk-deneylerim",
          bookTitle: "Benim Küçük Deneylerim",
          activationKey: "DENEY-2345-6789-0123",
          activationDate: "2024-01-20",
          lastPlayed: "1 saat önce",
          gamesPlayed: 12,
          totalPlayTime: 78,
          addedBy: "publisher",
          expiryDate: "2024-12-31",
          isActive: true
        },
        {
          bookId: "oyunlarla-satranc",
          bookTitle: "Oyunlarla Satranç",
          activationKey: "SATRANC-3456-7890-1234",
          activationDate: "2024-02-01",
          lastPlayed: "3 saat önce",
          gamesPlayed: 15,
          totalPlayTime: 120,
          addedBy: "user",
          isActive: true
        }
      ],
      totalGamesPlayed: 35,
      favoriteGenres: ["Bilim", "Eğitim", "Satranç"]
    },
    {
      id: 2,
      name: "Elif Kaya",
      email: "elif@example.com",
      joinDate: "2024-02-03",
      lastActive: "5 dakika önce",
      status: "active",
      books: [
        {
          bookId: "tatilde-50-macera",
          bookTitle: "Tatilde 50 Macera",
          activationKey: "MACERA-4567-8901-2345",
          activationDate: "2024-02-05",
          lastPlayed: "5 dakika önce",
          gamesPlayed: 6,
          totalPlayTime: 32,
          addedBy: "publisher",
          expiryDate: "2024-12-31",
          isActive: true
        }
      ],
      totalGamesPlayed: 6,
      favoriteGenres: ["Macera", "Eğitim"]
    },
    {
      id: 3,
      name: "Mehmet Demir",
      email: "mehmet@example.com",
      joinDate: "2024-01-28",
      lastActive: "8 dakika önce",
      status: "active",
      books: [],
      totalGamesPlayed: 0,
      favoriteGenres: []
    },
    {
      id: 4,
      name: "Zeynep Öz",
      email: "zeynep@example.com",
      joinDate: "2024-03-10",
      lastActive: "12 dakika önce",
      status: "active",
      books: [
        {
          bookId: "atalarimizdan-dersler",
          bookTitle: "Atalarımızdan Dersler",
          activationKey: "ATALAR-5678-9012-3456",
          activationDate: "2024-03-12",
          lastPlayed: "12 dakika önce",
          gamesPlayed: 4,
          totalPlayTime: 28,
          addedBy: "admin",
          expiryDate: "2024-12-31",
          isActive: true
        }
      ],
      totalGamesPlayed: 4,
      favoriteGenres: ["Tarih", "Eğitim"]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tümü');
  const [bookFilter, setBookFilter] = useState('Tümü');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    status: 'active' as 'active' | 'inactive' | 'suspended',
    favoriteGenres: [] as string[]
  });
  const [newBookForm, setNewBookForm] = useState({
    bookId: '',
    bookTitle: '',
    addedBy: 'admin' as 'admin' | 'publisher',
    expiryType: 'permanent' as 'permanent' | 'days' | 'weeks' | 'months',
    expiryValue: 30,
    expiryDate: ''
  });

  // Mevcut kitaplar listesi
  const availableBooks = [
    { id: 'hava-olaylari', title: 'Hava Olayları' },
    { id: 'benim-kucuk-deneylerim', title: 'Benim Küçük Deneylerim' },
    { id: 'oyunlarla-satranc', title: 'Oyunlarla Satranç' },
    { id: 'tatilde-50-macera', title: 'Tatilde 50 Macera' },
    { id: 'atalarimizdan-dersler', title: 'Atalarımızdan Dersler' }
  ];

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
    }
  }, [router]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Tümü' || user.status === statusFilter;
    const matchesBook = bookFilter === 'Tümü' || 
                       (bookFilter === 'Kitap Sahibi' && user.books.length > 0) ||
                       (bookFilter === 'Kitap Sahibi Değil' && user.books.length === 0);
    
    return matchesSearch && matchesStatus && matchesBook;
  });

  const toggleUserStatus = (userId: number) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'suspended' : 'active' }
        : user
    ));
  };

  const deleteUser = (userId: number) => {
    if (confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
    }
  };

  const startEditing = (user: User) => {
    setEditForm({
      name: user.name,
      email: user.email,
      status: user.status,
      favoriteGenres: [...user.favoriteGenres]
    });
    setIsEditing(true);
  };

  const saveEdit = () => {
    if (!selectedUser) return;
    
    setUsers(prev => prev.map(user => 
      user.id === selectedUser.id 
        ? { ...user, ...editForm }
        : user
    ));
    setIsEditing(false);
    setSelectedUser(null);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditForm({
      name: '',
      email: '',
      status: 'active',
      favoriteGenres: []
    });
  };

  const generateKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 16; i++) {
      if (i > 0 && i % 4 === 0) {
        result += '-';
      }
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const calculateExpiryDate = (type: string, value: number) => {
    if (type === 'permanent') return undefined;
    
    const now = new Date();
    switch (type) {
      case 'days':
        now.setDate(now.getDate() + value);
        break;
      case 'weeks':
        now.setDate(now.getDate() + (value * 7));
        break;
      case 'months':
        now.setMonth(now.getMonth() + value);
        break;
    }
    return now.toISOString().split('T')[0];
  };

  const handleBookSelection = (bookId: string) => {
    const selectedBook = availableBooks.find(book => book.id === bookId);
    if (selectedBook) {
      setNewBookForm(prev => ({
        ...prev,
        bookId: selectedBook.id,
        bookTitle: selectedBook.title
      }));
    }
  };

  const addBookToUser = () => {
    if (!selectedUser || !newBookForm.bookId || !newBookForm.bookTitle) {
      alert('Lütfen bir kitap seçin!');
      return;
    }

    // Kullanıcının zaten bu kitabı var mı kontrol et
    const userHasBook = selectedUser.books.some(book => book.bookId === newBookForm.bookId);
    if (userHasBook) {
      alert('Bu kullanıcı zaten bu kitaba sahip!');
      return;
    }

    const expiryDate = calculateExpiryDate(newBookForm.expiryType, newBookForm.expiryValue);
    const newBook: UserBook = {
      bookId: newBookForm.bookId,
      bookTitle: newBookForm.bookTitle,
      activationKey: generateKey(),
      activationDate: new Date().toISOString().split('T')[0],
      lastPlayed: 'Henüz oynanmadı',
      gamesPlayed: 0,
      totalPlayTime: 0,
      addedBy: newBookForm.addedBy,
      expiryDate: expiryDate,
      isActive: true
    };

    setUsers(prev => prev.map(user => 
      user.id === selectedUser.id 
        ? { ...user, books: [...user.books, newBook] }
        : user
    ));

    setNewBookForm({
      bookId: '',
      bookTitle: '',
      addedBy: 'admin',
      expiryType: 'permanent',
      expiryValue: 30,
      expiryDate: ''
    });
    setIsAddingBook(false);
    alert('Kitap başarıyla eklendi!');
  };

  const removeBookFromUser = (bookId: string) => {
    if (!selectedUser) return;
    
    const bookToRemove = selectedUser.books.find(book => book.bookId === bookId);
    if (!bookToRemove) return;
    
    if (confirm(`"${bookToRemove.bookTitle}" kitabını kullanıcıdan kaldırmak istediğinizden emin misiniz?`)) {
      setUsers(prev => prev.map(user => 
        user.id === selectedUser.id 
          ? { ...user, books: user.books.filter(book => book.bookId !== bookId) }
          : user
      ));
      
      // Seçili kullanıcıyı güncelle
      setSelectedUser(prev => prev ? {
        ...prev,
        books: prev.books.filter(book => book.bookId !== bookId)
      } : null);
      
      alert('Kitap başarıyla kaldırıldı!');
    }
  };

  const toggleBookStatus = (bookId: string) => {
    if (!selectedUser) return;
    
    setUsers(prev => prev.map(user => 
      user.id === selectedUser.id 
        ? { 
            ...user, 
            books: user.books.map(book => 
              book.bookId === bookId 
                ? { ...book, isActive: !book.isActive }
                : book
            )
          }
        : user
    ));
  };

  return (
    <div style={{
      padding: '20px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      {/* Header */}
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
          marginBottom: '8px'
        }}>
          Kullanıcı Yönetimi
        </h1>
        <p style={{
          color: 'white',
          fontSize: '1rem'
        }}>
          Kullanıcıların kitap sahipliği, key kullanımı ve aktivasyon bilgilerini yönetin
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgb(205, 23, 25), rgb(180, 20, 22))',
          color: 'white',
          padding: '20px',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: '700' }}>{users.length}</div>
          <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Toplam Kullanıcı</div>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #059669, #047857)',
          color: 'white',
          padding: '20px',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: '700' }}>
            {users.filter(u => u.status === 'active').length}
          </div>
          <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Aktif Kullanıcı</div>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
          color: 'white',
          padding: '20px',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: '700' }}>
            {users.filter(u => u.books.length > 0).length}
          </div>
          <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Kitap Sahibi</div>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #059669, #047857)',
          color: 'white',
          padding: '20px',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: '700' }}>
            {users.reduce((sum, u) => sum + u.totalGamesPlayed, 0)}
          </div>
          <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Toplam Oyun</div>
        </div>
      </div>

      {/* Filters */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e5e7eb',
        display: 'flex',
        gap: '20px',
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
            <option value="suspended">Askıya Alındı</option>
            <option value="inactive">Pasif</option>
          </select>
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
          }}>Kitap Sahipliği:</label>
          <select
            value={bookFilter}
            onChange={(e) => setBookFilter(e.target.value)}
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
            <option value="Kitap Sahibi">Kitap Sahibi</option>
            <option value="Kitap Sahibi Değil">Kitap Sahibi Değil</option>
          </select>
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
              }}>Kitap Sayısı</th>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                fontWeight: '600',
                color: '#374151'
              }}>Sahip Olduğu Kitaplar</th>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                fontWeight: '600',
                color: '#374151'
              }}>Toplam Oyun</th>
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
                      background: 'linear-gradient(135deg, rgb(205, 23, 25), rgb(180, 20, 22))',
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
                      <div style={{
                        fontSize: '0.7rem',
                        color: '#9ca3af'
                      }}>Katılım: {user.joinDate}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: user.books.length > 0 ? 'rgb(205, 23, 25)' : '#6b7280'
                    }}>
                      {user.books.length}
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: '#6b7280'
                    }}>
                      {user.totalGamesPlayed} oyun
                    </div>
                  </div>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    maxWidth: '300px'
                  }}>
                    {user.books.length > 0 ? (
                      user.books.map((book, index) => (
                        <div key={index} style={{
                          padding: '8px 12px',
                          background: book.isActive ? '#f9fafb' : '#fef2f2',
                          borderRadius: '8px',
                          border: `1px solid ${book.isActive ? '#e5e7eb' : '#fecaca'}`,
                          opacity: book.isActive ? 1 : 0.6
                        }}>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '4px'
                          }}>
                            <div style={{
                              fontWeight: '600',
                              fontSize: '0.9rem',
                              color: '#1f2937'
                            }}>
                              {book.bookTitle}
                            </div>
                            <div style={{
                              display: 'flex',
                              gap: '4px'
                            }}>
                              <button
                                style={{
                                  background: book.isActive ? '#fecaca' : '#dcfce7',
                                  color: book.isActive ? '#dc2626' : '#166534',
                                  border: 'none',
                                  borderRadius: '4px',
                                  padding: '2px 6px',
                                  fontSize: '0.7rem',
                                  cursor: 'pointer'
                                }}
                                onClick={() => toggleBookStatus(book.bookId)}
                              >
                                {book.isActive ? 'Pasif' : 'Aktif'}
                              </button>
                              <button
                                style={{
                                  background: '#fecaca',
                                  color: '#dc2626',
                                  border: 'none',
                                  borderRadius: '4px',
                                  padding: '2px 6px',
                                  fontSize: '0.7rem',
                                  cursor: 'pointer'
                                }}
                                onClick={() => removeBookFromUser(book.bookId)}
                                title="Kitabı kaldır"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                          <div style={{
                            fontSize: '0.7rem',
                            color: '#6b7280',
                            marginBottom: '2px'
                          }}>
                            Key: {book.activationKey}
                          </div>
                          <div style={{
                            fontSize: '0.7rem',
                            color: '#6b7280',
                            marginBottom: '2px'
                          }}>
                            Aktivasyon: {book.activationDate}
                          </div>
                          <div style={{
                            fontSize: '0.7rem',
                            color: '#6b7280',
                            marginBottom: '2px'
                          }}>
                            Son Oyun: {book.lastPlayed}
                          </div>
                          <div style={{
                            fontSize: '0.7rem',
                            color: '#6b7280',
                            marginBottom: '2px'
                          }}>
                            {book.gamesPlayed} oyun, {book.totalPlayTime} dk
                          </div>
                          <div style={{
                            fontSize: '0.7rem',
                            color: book.addedBy === 'admin' ? '#dc2626' : 
                                   book.addedBy === 'publisher' ? '#059669' : '#6b7280',
                            fontWeight: '600',
                            marginBottom: '2px'
                          }}>
                            Ekleyen: {book.addedBy === 'admin' ? 'Admin' : 
                                     book.addedBy === 'publisher' ? 'Yayınevi' : 'Kullanıcı'}
                          </div>
                          {book.expiryDate && (
                            <div style={{
                              fontSize: '0.7rem',
                              color: '#6b7280'
                            }}>
                              Bitiş: {book.expiryDate}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div style={{
                        padding: '8px 12px',
                        background: '#fef2f2',
                        borderRadius: '8px',
                        border: '1px solid #fecaca',
                        color: '#dc2626',
                        fontSize: '0.8rem',
                        textAlign: 'center'
                      }}>
                        Kitap sahibi değil
                      </div>
                    )}
                  </div>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: user.totalGamesPlayed > 0 ? 'rgb(205, 23, 25)' : '#6b7280'
                  }}>
                    {user.totalGamesPlayed}
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
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    background: user.status === 'active' 
                      ? '#dcfce7' 
                      : user.status === 'suspended' 
                        ? '#fef2f2' 
                        : '#f3f4f6',
                    color: user.status === 'active' 
                      ? '#166534' 
                      : user.status === 'suspended' 
                        ? '#dc2626' 
                        : '#6b7280'
                  }}>
                    {user.status === 'active' ? 'Aktif' : 
                     user.status === 'suspended' ? 'Askıya Alındı' : 'Pasif'}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{
                    display: 'flex',
                    gap: '8px'
                  }}>
                    <button 
                      style={{
                        padding: '6px 12px',
                        background: 'linear-gradient(135deg, rgb(205, 23, 25), rgb(180, 20, 22))',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}
                      onClick={() => setSelectedUser(user)}
                    >
                      Detay
                    </button>
                    <button 
                      style={{
                        padding: '6px 12px',
                        background: '#f3f4f6',
                        color: '#6b7280',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}
                      onClick={() => toggleUserStatus(user.id)}
                    >
                      {user.status === 'active' ? 'Askıya Al' : 'Aktifleştir'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
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
            padding: '30px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1f2937'
              }}>
                {selectedUser.name} - Detaylı Bilgiler
              </h2>
              <div style={{ display: 'flex', gap: '10px' }}>
                {!isEditing ? (
                  <>
                    <button 
                      style={{
                        background: 'linear-gradient(135deg, rgb(205, 23, 25), rgb(180, 20, 22))',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px 16px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                      onClick={() => startEditing(selectedUser)}
                    >
                      Düzenle
                    </button>
                    <button 
                      style={{
                        background: '#059669',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px 16px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                      onClick={() => setIsAddingBook(true)}
                    >
                      Kitap Ekle
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      style={{
                        background: '#059669',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px 16px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                      onClick={saveEdit}
                    >
                      Kaydet
                    </button>
                    <button 
                      style={{
                        background: '#6b7280',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px 16px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                      onClick={cancelEdit}
                    >
                      İptal
                    </button>
                  </>
                )}
                <button 
                  style={{
                    background: '#f3f4f6',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setSelectedUser(null);
                    setIsEditing(false);
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gap: '20px'
            }}>
              <div>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '10px'
                }}>
                  Genel Bilgiler
                </h3>
                {isEditing ? (
                  <div style={{
                    background: '#f9fafb',
                    padding: '20px',
                    borderRadius: '8px',
                    display: 'grid',
                    gap: '15px'
                  }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
                        İsim:
                      </label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '6px',
                          fontSize: '0.9rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
                        Email:
                      </label>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '6px',
                          fontSize: '0.9rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
                        Durum:
                      </label>
                      <select
                        value={editForm.status}
                        onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value as 'active' | 'inactive' | 'suspended' }))}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '6px',
                          fontSize: '0.9rem',
                          background: 'white'
                        }}
                      >
                        <option value="active">Aktif</option>
                        <option value="inactive">Pasif</option>
                        <option value="suspended">Askıya Alındı</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div style={{
                    background: '#f9fafb',
                    padding: '15px',
                    borderRadius: '8px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '10px'
                  }}>
                    <div><strong>Email:</strong> {selectedUser.email}</div>
                    <div><strong>Katılım:</strong> {selectedUser.joinDate}</div>
                    <div><strong>Son Aktivite:</strong> {selectedUser.lastActive}</div>
                    <div><strong>Kitap Sayısı:</strong> {selectedUser.books.length}</div>
                    <div><strong>Toplam Oyun:</strong> {selectedUser.totalGamesPlayed}</div>
                    <div><strong>Durum:</strong> {
                      selectedUser.status === 'active' ? 'Aktif' : 
                      selectedUser.status === 'suspended' ? 'Askıya Alındı' : 'Pasif'
                    }</div>
                  </div>
                )}
              </div>

              <div>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '10px'
                }}>
                  Sahip Olduğu Kitaplar ({selectedUser.books.length})
                </h3>
                {isAddingBook ? (
                  <div style={{
                    background: '#f0f9ff',
                    padding: '20px',
                    borderRadius: '8px',
                    border: '2px solid #0ea5e9',
                    marginBottom: '20px'
                  }}>
                    <h4 style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: '#1e40af',
                      marginBottom: '15px'
                    }}>
                      Yeni Kitap Ekle
                    </h4>
                    <div style={{
                      display: 'grid',
                      gap: '15px'
                    }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
                          Kitap Seçin:
                        </label>
                        <select
                          value={newBookForm.bookId}
                          onChange={(e) => handleBookSelection(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '2px solid #e5e7eb',
                            borderRadius: '6px',
                            fontSize: '0.9rem',
                            background: 'white'
                          }}
                        >
                          <option value="">Kitap seçin...</option>
                          {availableBooks
                            .filter(book => !selectedUser?.books.some(userBook => userBook.bookId === book.id))
                            .map(book => (
                              <option key={book.id} value={book.id}>
                                {book.title}
                              </option>
                            ))}
                        </select>
                        {newBookForm.bookTitle && (
                          <div style={{
                            marginTop: '5px',
                            padding: '8px',
                            background: '#f0f9ff',
                            borderRadius: '4px',
                            fontSize: '0.8rem',
                            color: '#1e40af'
                          }}>
                            Seçilen: {newBookForm.bookTitle}
                          </div>
                        )}
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
                          Ekleyen:
                        </label>
                        <select
                          value={newBookForm.addedBy}
                          onChange={(e) => setNewBookForm(prev => ({ ...prev, addedBy: e.target.value as 'admin' | 'publisher' }))}
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '2px solid #e5e7eb',
                            borderRadius: '6px',
                            fontSize: '0.9rem',
                            background: 'white'
                          }}
                        >
                          <option value="admin">Admin</option>
                          <option value="publisher">Yayınevi</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
                          Süre Sınırı:
                        </label>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <select
                            value={newBookForm.expiryType}
                            onChange={(e) => setNewBookForm(prev => ({ ...prev, expiryType: e.target.value as 'permanent' | 'days' | 'weeks' | 'months' }))}
                            style={{
                              padding: '8px 12px',
                              border: '2px solid #e5e7eb',
                              borderRadius: '6px',
                              fontSize: '0.9rem',
                              background: 'white'
                            }}
                          >
                            <option value="permanent">Süresiz</option>
                            <option value="days">Gün</option>
                            <option value="weeks">Hafta</option>
                            <option value="months">Ay</option>
                          </select>
                          {newBookForm.expiryType !== 'permanent' && (
                            <input
                              type="number"
                              value={newBookForm.expiryValue}
                              onChange={(e) => setNewBookForm(prev => ({ ...prev, expiryValue: parseInt(e.target.value) || 0 }))}
                              min="1"
                              style={{
                                width: '80px',
                                padding: '8px 12px',
                                border: '2px solid #e5e7eb',
                                borderRadius: '6px',
                                fontSize: '0.9rem'
                              }}
                            />
                          )}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          onClick={addBookToUser}
                          style={{
                            background: '#059669',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '8px 16px',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                          }}
                        >
                          Kitap Ekle
                        </button>
                        <button
                          onClick={() => setIsAddingBook(false)}
                          style={{
                            background: '#6b7280',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '8px 16px',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                          }}
                        >
                          İptal
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
                {selectedUser.books.length > 0 ? (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    {selectedUser.books.map((book, index) => (
                      <div key={index} style={{
                        background: '#f9fafb',
                        padding: '15px',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb'
                      }}>
                        <div style={{
                          fontWeight: '600',
                          fontSize: '1rem',
                          color: '#1f2937',
                          marginBottom: '8px'
                        }}>
                          {book.bookTitle}
                        </div>
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '8px',
                          fontSize: '0.9rem',
                          color: '#6b7280'
                        }}>
                          <div><strong>Key:</strong> {book.activationKey}</div>
                          <div><strong>Aktivasyon:</strong> {book.activationDate}</div>
                          <div><strong>Son Oyun:</strong> {book.lastPlayed}</div>
                          <div><strong>Oyun Sayısı:</strong> {book.gamesPlayed}</div>
                          <div><strong>Toplam Süre:</strong> {book.totalPlayTime} dakika</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{
                    background: '#fef2f2',
                    padding: '15px',
                    borderRadius: '8px',
                    border: '1px solid #fecaca',
                    color: '#dc2626',
                    textAlign: 'center'
                  }}>
                    Bu kullanıcı henüz hiç kitap satın almamış
                  </div>
                )}
              </div>

              <div>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '10px'
                }}>
                  Favori Kategoriler
                </h3>
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  flexWrap: 'wrap'
                }}>
                  {selectedUser.favoriteGenres.map((genre, index) => (
                    <span key={index} style={{
                      background: 'linear-gradient(135deg, rgb(205, 23, 25), rgb(180, 20, 22))',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: '500'
                    }}>
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}