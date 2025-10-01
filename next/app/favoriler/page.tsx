export default function FavorilerPage() {
  const favoriteBooks = [
    {
      id: 1,
      title: "Oyunlarla Satranç",
      author: "Ozan ÇAPAN",
      cover: "/img/oyunlarla-satranc-4228-9.webp",
      addedDate: "15 Aralık 2024",
      price: "₺160,00",
      link: "/kitaplar/satranc",
      isPurchased: true
    },
    {
      id: 2,
      title: "Hava Olayları",
      author: "Elisabeth de LAMBILLY",
      cover: "/img/hava-4a9c-b724-.jpg",
      addedDate: "12 Aralık 2024",
      price: "₺156,00",
      link: "/kitaplar/hava-olaylari",
      isPurchased: true
    },
    {
      id: 3,
      title: "Benim Küçük Deneylerim",
      author: "Melanie PEREZ",
      cover: "/img/benim-kucuk-deneylerim-mekanik...-5-4bcd.jpg",
      addedDate: "10 Aralık 2024",
      price: "₺156,00",
      link: "/kitaplar/benim-kucuk-deneylerim",
      isPurchased: true
    }
  ];

  const wishlistBooks = [
    {
      id: 4,
      title: "Renklerle Matematik",
      author: "Matematik Öğretmeni",
      cover: "/img/benim-kucuk-deneylerim-mekanik...-5-4bcd.jpg",
      addedDate: "8 Aralık 2024",
      price: "₺156,00",
      link: "/kitaplar/renklerle-matematik",
      isPurchased: false
    },
    {
      id: 5,
      title: "Masal Labirenti",
      author: "Masal Uzmanı",
      cover: "/img/benim-kucuk-deneylerim-mekanik...-5-4bcd.jpg",
      addedDate: "5 Aralık 2024",
      price: "₺156,00",
      link: "/kitaplar/masal-labirenti",
      isPurchased: false
    }
  ];

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
                    <span className="added-date">📅 {book.addedDate}</span>
                  </div>
                  <div className="book-actions">
                    <a href={book.link} className="read-btn">Oku</a>
                    <button className="remove-btn">❤️</button>
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
                    <span className="added-date">📅 {book.addedDate}</span>
                    <span className="book-price">{book.price}</span>
                  </div>
                  <div className="book-actions">
                    <button className="buy-btn">Satın Al</button>
                    <button className="remove-btn">❤️</button>
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
