"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BookManagement() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
    originalPrice: '',
    currentPrice: '',
    category: '',
    ageGroup: '',
    buyLink: '',
    cover: ''
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

  const handleAddBook = () => {
    const book = {
      id: books.length + 1,
      ...newBook,
      discount: "20%",
      status: "active",
      views: 0,
      sales: 0
    };
    setBooks([...books, book]);
    setShowAddModal(false);
    setNewBook({
      title: '',
      author: '',
      originalPrice: '',
      currentPrice: '',
      category: '',
      ageGroup: '',
      buyLink: '',
      cover: ''
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

  if (!isAuthenticated) {
    return <div className="loading">Yükleniyor...</div>;
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="header-left">
          <img src="/img/icon.png" alt="ODTÜ Yayıncılık" className="header-logo" />
          <h1>Kitap Yönetimi</h1>
        </div>
        <div className="header-right">
          <span className="admin-welcome">Hoş geldiniz, Admin</span>
          <button onClick={() => router.push('/admin/login')} className="logout-btn">Çıkış Yap</button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="admin-nav">
        <a href="/admin/dashboard" className="nav-item">📊 Dashboard</a>
        <a href="/admin/books" className="nav-item active">📚 Kitaplar</a>
        <a href="/admin/users" className="nav-item">👥 Kullanıcılar</a>
        <a href="/admin/games" className="nav-item">🎮 Oyunlar</a>
        <a href="/admin/reports" className="nav-item">📈 Raporlar</a>
      </nav>

      {/* Main Content */}
      <main className="admin-content">
        <div className="page-header">
          <h2>Kitap Yönetimi</h2>
          <button 
            className="add-btn"
            onClick={() => setShowAddModal(true)}
          >
            ➕ Yeni Kitap Ekle
          </button>
        </div>

        {/* Books Table */}
        <div className="books-table-container">
          <table className="books-table">
            <thead>
              <tr>
                <th>Kapak</th>
                <th>Kitap Adı</th>
                <th>Yazar</th>
                <th>Kategori</th>
                <th>Fiyat</th>
                <th>İstatistikler</th>
                <th>Durum</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book.id}>
                  <td>
                    <img src={book.cover} alt={book.title} className="book-thumbnail" />
                  </td>
                  <td>
                    <div className="book-title-cell">
                      <strong>{book.title}</strong>
                      <span className="age-group">{book.ageGroup}</span>
                    </div>
                  </td>
                  <td>{book.author}</td>
                  <td>
                    <span className="category-badge">{book.category}</span>
                  </td>
                  <td>
                    <div className="price-cell">
                      <span className="current-price">{book.currentPrice}</span>
                      <span className="original-price">{book.originalPrice}</span>
                    </div>
                  </td>
                  <td>
                    <div className="stats-cell">
                      <span>👁️ {book.views}</span>
                      <span>💰 {book.sales}</span>
                    </div>
                  </td>
                  <td>
                    <button 
                      className={`status-btn ${book.status}`}
                      onClick={() => toggleBookStatus(book.id)}
                    >
                      {book.status === 'active' ? 'Aktif' : 'Pasif'}
                    </button>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="edit-btn"
                        onClick={() => handleEditBook(book)}
                      >
                        ✏️
                      </button>
                      <button 
                        className="delete-btn"
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
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>Yeni Kitap Ekle</h3>
                <button className="close-btn" onClick={() => setShowAddModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Kitap Adı:</label>
                  <input 
                    type="text" 
                    value={newBook.title}
                    onChange={(e) => setNewBook(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Yazar:</label>
                  <input 
                    type="text" 
                    value={newBook.author}
                    onChange={(e) => setNewBook(prev => ({ ...prev, author: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Kategori:</label>
                  <select 
                    value={newBook.category}
                    onChange={(e) => setNewBook(prev => ({ ...prev, category: e.target.value }))}
                  >
                    <option value="">Seçiniz</option>
                    <option value="Bilim">Bilim</option>
                    <option value="Satranç">Satranç</option>
                    <option value="Tarih">Tarih</option>
                    <option value="Macera">Macera</option>
                    <option value="Eğitim">Eğitim</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Yaş Grubu:</label>
                  <select 
                    value={newBook.ageGroup}
                    onChange={(e) => setNewBook(prev => ({ ...prev, ageGroup: e.target.value }))}
                  >
                    <option value="">Seçiniz</option>
                    <option value="3-7 Yaş">3-7 Yaş</option>
                    <option value="7-12 Yaş">7-12 Yaş</option>
                    <option value="12+ Yaş">12+ Yaş</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Orijinal Fiyat:</label>
                  <input 
                    type="text" 
                    value={newBook.originalPrice}
                    onChange={(e) => setNewBook(prev => ({ ...prev, originalPrice: e.target.value }))}
                    placeholder="₺195,00"
                  />
                </div>
                <div className="form-group">
                  <label>İndirimli Fiyat:</label>
                  <input 
                    type="text" 
                    value={newBook.currentPrice}
                    onChange={(e) => setNewBook(prev => ({ ...prev, currentPrice: e.target.value }))}
                    placeholder="₺156,00"
                  />
                </div>
                <div className="form-group">
                  <label>Satış Linki:</label>
                  <input 
                    type="url" 
                    value={newBook.buyLink}
                    onChange={(e) => setNewBook(prev => ({ ...prev, buyLink: e.target.value }))}
                    placeholder="https://www.odtuyayincilik.com.tr/..."
                  />
                </div>
                <div className="form-group">
                  <label>Kapak Resmi URL:</label>
                  <input 
                    type="url" 
                    value={newBook.cover}
                    onChange={(e) => setNewBook(prev => ({ ...prev, cover: e.target.value }))}
                    placeholder="/img/kitap-adi.jpg"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setShowAddModal(false)}>İptal</button>
                <button className="btn-primary" onClick={handleAddBook}>Kitap Ekle</button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Book Modal */}
        {editingBook && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>Kitap Düzenle</h3>
                <button className="close-btn" onClick={() => setEditingBook(null)}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Kitap Adı:</label>
                  <input 
                    type="text" 
                    value={editingBook.title}
                    onChange={(e) => setEditingBook(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Yazar:</label>
                  <input 
                    type="text" 
                    value={editingBook.author}
                    onChange={(e) => setEditingBook(prev => ({ ...prev, author: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Kategori:</label>
                  <select 
                    value={editingBook.category}
                    onChange={(e) => setEditingBook(prev => ({ ...prev, category: e.target.value }))}
                  >
                    <option value="Bilim">Bilim</option>
                    <option value="Satranç">Satranç</option>
                    <option value="Tarih">Tarih</option>
                    <option value="Macera">Macera</option>
                    <option value="Eğitim">Eğitim</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Orijinal Fiyat:</label>
                  <input 
                    type="text" 
                    value={editingBook.originalPrice}
                    onChange={(e) => setEditingBook(prev => ({ ...prev, originalPrice: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>İndirimli Fiyat:</label>
                  <input 
                    type="text" 
                    value={editingBook.currentPrice}
                    onChange={(e) => setEditingBook(prev => ({ ...prev, currentPrice: e.target.value }))}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setEditingBook(null)}>İptal</button>
                <button className="btn-primary" onClick={handleUpdateBook}>Güncelle</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
