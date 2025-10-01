"use client";
import { useState, useEffect } from 'react';

export default function FavorilerPage() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);

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

  const allBooks = [
    {
      id: 1,
      title: "Oyunlarla Satranç",
      author: "Ozan ÇAPAN",
      cover: "/img/oyunlarla-satranc-4228-9.webp",
      price: "₺160,00",
      link: "/kitaplar/satranc",
      isPurchased: true
    },
    {
      id: 2,
      title: "Hava Olayları",
      author: "Elisabeth de LAMBILLY",
      cover: "/img/hava-4a9c-b724-.jpg",
      price: "₺156,00",
      link: "/kitaplar/hava-olaylari",
      isPurchased: true
    },
    {
      id: 3,
      title: "Benim Küçük Deneylerim",
      author: "Melanie PEREZ",
      cover: "/img/benim-kucuk-deneylerim-mekanik...-5-4bcd.jpg",
      price: "₺156,00",
      link: "/kitaplar/benim-kucuk-deneylerim",
      isPurchased: true
    },
    {
      id: 4,
      title: "Atalarımızdan Dersler",
      author: "Raksha Dave",
      cover: "/img/atalarımızdan dersler.jpg",
      price: "₺156,00",
      link: "/kitaplar/atalarimizdan-dersler",
      isPurchased: true
    },
    {
      id: 5,
      title: "13 Yaşına Gelmeden Tatilde Yaşanacak 50 Macera İçin Kılavuz",
      author: "P.D. BACCALARIO",
      cover: "/img/tatil kitabı.jpg",
      price: "₺156,00",
      link: "/kitaplar/tatilde-50-macera",
      isPurchased: true
    }
  ];

  const favoriteBooks = allBooks.filter(book => favorites.includes(book.id));
  const wishlistBooks = allBooks.filter(book => wishlist.includes(book.id));

  const removeFromFavorites = (bookId: number) => {
    const newFavorites = favorites.filter(id => id !== bookId);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const removeFromWishlist = (bookId: number) => {
    const newWishlist = wishlist.filter(id => id !== bookId);
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
  };

  return (
    <>
      <section className="hero">
        <h2>❤️ Favorilerim</h2>
        <p>Beğendiğiniz kitaplar ve istek listeniz</p>
      </section>

      <section className="favorites-section">
        <div className="favorites-grid">
          <div className="favorites-card">
            <h3>📚 Satın Alınan Favoriler</h3>
            <p className="section-description">Zaten sahip olduğunuz favori kitaplar</p>
            <div className="books-list">
              {favoriteBooks.map(book => (
                <div key={book.id} className="book-item purchased">
                  <div className="book-cover-small">
                    <img src={book.cover} alt={book.title} />
                    <div className="purchased-badge">✓</div>
                  </div>
                  <div className="book-details">
                    <h4 className="book-title">{book.title}</h4>
                    <p className="book-author">{book.author}</p>
                  </div>
                  <div className="book-actions">
                    <a href={book.link} className="read-btn">Oku</a>
                    <button 
                      className="remove-btn"
                      onClick={() => removeFromFavorites(book.id)}
                    >
                      ❤️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="favorites-card">
            <h3>🛒 İstek Listesi</h3>
            <p className="section-description">Satın almayı planladığınız kitaplar</p>
            <div className="books-list">
              {wishlistBooks.map(book => (
                <div key={book.id} className="book-item wishlist">
                  <div className="book-cover-small">
                    <img src={book.cover} alt={book.title} />
                    <div className="wishlist-badge">💝</div>
                  </div>
                  <div className="book-details">
                    <h4 className="book-title">{book.title}</h4>
                    <p className="book-author">{book.author}</p>
                    <span className="book-price">{book.price}</span>
                  </div>
                  <div className="book-actions">
                    <button className="buy-btn">Satın Al</button>
                    <button 
                      className="remove-btn"
                      onClick={() => removeFromWishlist(book.id)}
                    >
                      💝
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
