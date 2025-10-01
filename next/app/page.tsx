export default function Page(){
  const books = [
    {
      id: 1,
      title: "Benim Küçük Deneylerim, Nasıl Ya...",
      author: "Melanie PEREZ",
      cover: "/img/benim-kucuk-deneylerim-mekanik...-5-4bcd.jpg",
      originalPrice: "₺200,00",
      currentPrice: "₺160,00",
      discount: "20%",
      link: "/kitaplar/benim-kucuk-deneylerim"
    },
    {
      id: 2,
      title: "Benim Küçük Deneylerim, Mutfak",
      author: "Francesca MASSA",
      cover: "/img/benim-kucuk-deneylerim-mekanik...-5-4bcd.jpg",
      originalPrice: "₺195,00",
      currentPrice: "₺156,00",
      discount: "20%",
      link: "/kitaplar/benim-kucuk-deneylerim"
    },
    {
      id: 3,
      title: "Benim Küçük Deneylerim, Yaratıcı ...",
      author: "Vincent HUBERT",
      cover: "/img/benim-kucuk-deneylerim-mekanik...-5-4bcd.jpg",
      originalPrice: "₺195,00",
      currentPrice: "₺156,00",
      discount: "20%",
      link: "/kitaplar/benim-kucuk-deneylerim"
    },
    {
      id: 4,
      title: "Benim Küçük Deneylerim, Sürdür...",
      author: "Melanie PEREZ",
      cover: "/img/benim-kucuk-deneylerim-mekanik...-5-4bcd.jpg",
      originalPrice: "₺195,00",
      currentPrice: "₺156,00",
      discount: "20%",
      link: "/kitaplar/benim-kucuk-deneylerim"
    },
    {
      id: 5,
      title: "Benim Küçük Deneylerim, Su ve Işık",
      author: "Melanie PEREZ",
      cover: "/img/benim-kucuk-deneylerim-mekanik...-5-4bcd.jpg",
      originalPrice: "₺195,00",
      currentPrice: "₺156,00",
      discount: "20%",
      link: "/kitaplar/benim-kucuk-deneylerim"
    },
    {
      id: 6,
      title: "Benim Küçük Deneylerim, PLASTİK SANATLAR",
      author: "Vincent HUBERT",
      cover: "/img/benim-kucuk-deneylerim-mekanik...-5-4bcd.jpg",
      originalPrice: "₺195,00",
      currentPrice: "₺156,00",
      discount: "20%",
      link: "/kitaplar/benim-kucuk-deneylerim"
    },
    {
      id: 7,
      title: "Benim Küçük Deneylerim, Mekanik",
      author: "Melanie PEREZ",
      cover: "/img/benim-kucuk-deneylerim-mekanik...-5-4bcd.jpg",
      originalPrice: "₺195,00",
      currentPrice: "₺156,00",
      discount: "20%",
      link: "/kitaplar/benim-kucuk-deneylerim"
    },
    {
      id: 8,
      title: "Benim Küçük Deneylerim, Bahçıvanlık",
      author: "Francesca MASSA",
      cover: "/img/benim-kucuk-deneylerim-mekanik...-5-4bcd.jpg",
      originalPrice: "₺195,00",
      currentPrice: "₺156,00",
      discount: "20%",
      link: "/kitaplar/benim-kucuk-deneylerim"
    }
  ];

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
        
        <div className="books-grid">
          {books.map(book => (
            <div key={book.id} className="book-card">
              <div className="book-cover">
                <img src={book.cover} alt={book.title} />
                <div className="discount-badge">{book.discount}</div>
              </div>
              <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">{book.author}</p>
                <div className="price-info">
                  <span className="current-price">{book.currentPrice}</span>
                  <span className="original-price">{book.originalPrice}</span>
                </div>
                <button className="buy-button">
                  Satın Al
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}


