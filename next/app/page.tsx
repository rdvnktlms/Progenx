"use client";
import { useState, useEffect } from 'react';

export default function Page(){
  const [favorites, setFavorites] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('Tümü');

  // localStorage'dan favorileri ve istek listesini yükle
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    const savedWishlist = localStorage.getItem('wishlist');
    
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  const books = [
    {
      id: 1,
      title: "Oyunlarla Satranç",
      author: "Ozan ÇAPAN",
      cover: "/img/oyunlarla-satranc-4228-9.webp",
      originalPrice: "₺450,00",
      currentPrice: "₺360,00",
      discount: "20%",
      link: "/kitaplar/satranc",
      buyLink: "https://www.odtuyayincilik.com.tr/oyunlarla-satranc-233",
      category: "Satranç",
      ageGroup: "7-12 Yaş"
    },
    {
      id: 2,
      title: "Hava Olayları",
      author: "Elisabeth de LAMBILLY",
      cover: "/img/hava-4a9c-b724-.jpg",
      originalPrice: "₺195,00",
      currentPrice: "₺156,00",
      discount: "20%",
      link: "/kitaplar/hava-olaylari",
      buyLink: "https://www.odtuyayincilik.com.tr/hava-307",
      category: "Bilim",
      ageGroup: "7-12 Yaş"
    },
    {
      id: 3,
      title: "Benim Küçük Deneylerim",
      author: "Melanie PEREZ",
      cover: "/img/benim-kucuk-deneylerim-mekanik...-5-4bcd.jpg",
      originalPrice: "₺195,00",
      currentPrice: "₺156,00",
      discount: "20%",
      link: "/kitaplar/benim-kucuk-deneylerim",
      buyLink: "https://www.odtuyayincilik.com.tr/benim-kucuk-deneylerim-mekanik...-317",
      category: "Bilim",
      ageGroup: "7-12 Yaş"
    },
    {
      id: 4,
      title: "Atalarımızdan Dersler",
      author: "Raksha Dave",
      cover: "/img/atalarımızdan dersler.jpg",
      originalPrice: "₺350,00",
      currentPrice: "₺280,00",
      discount: "20%",
      link: "/kitaplar/atalarimizdan-dersler",
      buyLink: "https://www.odtuyayincilik.com.tr/atalarimizdan-dersler",
      category: "Tarih",
      ageGroup: "7-12 Yaş"
    },
    {
      id: 5,
      title: "13 Yaşına Gelmeden Tatilde Yaşanacak 50 Macera İçin Kılavuz",
      author: "P.D. BACCALARIO",
      cover: "/img/tatil kitabı.jpg",
      originalPrice: "₺400,00",
      currentPrice: "₺320,00",
      discount: "20%",
      link: "/kitaplar/tatilde-50-macera",
      buyLink: "https://www.odtuyayincilik.com.tr/13-yasina-gelmeden-tatilde-yasanacak-50-macera-icin-kilavuz",
      category: "Macera",
      ageGroup: "7-12 Yaş"
    },
  ];

  const toggleFavorite = (bookId: number) => {
    const newFavorites = favorites.includes(bookId)
      ? favorites.filter(id => id !== bookId)
      : [...favorites, bookId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const toggleWishlist = (bookId: number) => {
    const newWishlist = wishlist.includes(bookId)
      ? wishlist.filter(id => id !== bookId)
      : [...wishlist, bookId];
    
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
  };

  // Kategorileri ve yaş gruplarını al
  const categories = ['Tümü', ...Array.from(new Set(books.map(book => book.category)))];
  const ageGroups = ['Tümü', ...Array.from(new Set(books.map(book => book.ageGroup)))];

  // Filtrelenmiş kitapları al
  const filteredBooks = books.filter(book => {
    const categoryMatch = selectedCategory === 'Tümü' || book.category === selectedCategory;
    const ageGroupMatch = selectedAgeGroup === 'Tümü' || book.ageGroup === selectedAgeGroup;
    return categoryMatch && ageGroupMatch;
  });

  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <h1>İnteraktif Çocuk Kitapları</h1>
          <p>Eğlenceli oyunlar ve deneylerle öğrenmeyi keşfedin!</p>
        </div>
      </section>

      <section className="books-section">
        <div className="section-header">
          <h2>Popüler Kitaplar</h2>
          <p>Çocuklarınız için özenle seçilmiş eğitici kitaplar</p>
        </div>

        {/* Filtreleme Arayüzü */}
        <div className="filters-section">
          <div className="filter-group">
            <label htmlFor="category-filter">Kategori:</label>
            <select 
              id="category-filter"
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="age-filter">Yaş Grubu:</label>
            <select 
              id="age-filter"
              value={selectedAgeGroup} 
              onChange={(e) => setSelectedAgeGroup(e.target.value)}
              className="filter-select"
            >
              {ageGroups.map(ageGroup => (
                <option key={ageGroup} value={ageGroup}>{ageGroup}</option>
              ))}
            </select>
          </div>
          <div className="filter-results">
            <span>{filteredBooks.length} kitap bulundu</span>
          </div>
        </div>
        
        <div className="books-grid">
          {filteredBooks.map(book => (
            <div key={book.id} className={`book-card ${book.comingSoon ? 'coming-soon' : ''}`}>
              <div className="book-cover">
                <img src={book.cover} alt={book.title} />
                {book.comingSoon ? (
                  <div className="coming-badge">Yakında</div>
                ) : (
                  <div className="discount-badge">{book.discount}</div>
                )}
                <div className="book-actions-overlay">
                  <button 
                    className={`action-btn favorite-btn ${favorites.includes(book.id) ? 'active' : ''}`}
                    onClick={() => toggleFavorite(book.id)}
                    title={favorites.includes(book.id) ? 'Favorilerden çıkar' : 'Favorilere ekle'}
                  >
                    {favorites.includes(book.id) ? '❤️' : '🤍'}
                  </button>
                  <button 
                    className={`action-btn wishlist-btn ${wishlist.includes(book.id) ? 'active' : ''}`}
                    onClick={() => toggleWishlist(book.id)}
                    title={wishlist.includes(book.id) ? 'İstek listesinden çıkar' : 'İstek listesine ekle'}
                  >
                    {wishlist.includes(book.id) ? '💝' : '💌'}
                  </button>
                </div>
              </div>
              <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">{book.author}</p>
                
                {/* Kategori ve Yaş Grubu */}
                <div className="book-meta">
                  <span className="book-category">{book.category}</span>
                  <span className="book-age-group">{book.ageGroup}</span>
                </div>

                {!book.comingSoon && (
                  <div className="price-info">
                    <span className="current-price">{book.currentPrice}</span>
                    <span className="original-price">{book.originalPrice}</span>
                  </div>
                )}
                <button 
                  className={`buy-button ${book.comingSoon ? 'coming-soon-btn' : ''}`}
                  disabled={book.comingSoon}
                  onClick={() => {
                    if (!book.comingSoon && book.buyLink) {
                      window.open(book.buyLink, '_blank', 'noopener,noreferrer');
                    }
                  }}
                >
                  {book.comingSoon ? 'Yakında' : 'Satın Al'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}


