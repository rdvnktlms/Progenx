export default function Page(){
  const books = [
    {
      id: 1,
      title: "Oyunlarla Satranç",
      author: "Ozan ÇAPAN",
      cover: "/img/oyunlarla-satranc-4228-9.webp",
      originalPrice: "₺200,00",
      currentPrice: "₺160,00",
      discount: "20%",
      link: "/kitaplar/satranc"
    },
    {
      id: 2,
      title: "Hava Olayları",
      author: "Doğa Bilimci",
      cover: "/img/hava-4a9c-b724-.jpg",
      originalPrice: "₺195,00",
      currentPrice: "₺156,00",
      discount: "20%",
      link: "/kitaplar/hava-olaylari"
    },
    {
      id: 3,
      title: "Benim Küçük Deneylerim",
      author: "Bilim Öğretmeni",
      cover: "/img/benim-kucuk-deneylerim-mekanik...-5-4bcd.jpg",
      originalPrice: "₺195,00",
      currentPrice: "₺156,00",
      discount: "20%",
      link: "/kitaplar/benim-kucuk-deneylerim"
    },
    {
      id: 4,
      title: "Atalarımızdan Dersler",
      author: "Tarih Uzmanı",
      cover: "/img/atalarımızdan dersler.jpg",
      originalPrice: "₺195,00",
      currentPrice: "₺156,00",
      discount: "20%",
      link: "/kitaplar/atalarimizdan-dersler"
    },
    {
      id: 5,
      title: "Tatilde 50 Macera",
      author: "Macera Uzmanı",
      cover: "/img/tatil kitabı.jpg",
      originalPrice: "₺195,00",
      currentPrice: "₺156,00",
      discount: "20%",
      link: "/kitaplar/tatilde-50-macera"
    },
    {
      id: 6,
      title: "Renklerle Matematik",
      author: "Matematik Öğretmeni",
      cover: "/img/benim-kucuk-deneylerim-mekanik...-5-4bcd.jpg",
      originalPrice: "₺195,00",
      currentPrice: "₺156,00",
      discount: "20%",
      link: "/kitaplar/renklerle-matematik",
      comingSoon: true
    },
    {
      id: 7,
      title: "Masal Labirenti",
      author: "Masal Uzmanı",
      cover: "/img/benim-kucuk-deneylerim-mekanik...-5-4bcd.jpg",
      originalPrice: "₺195,00",
      currentPrice: "₺156,00",
      discount: "20%",
      link: "/kitaplar/masal-labirenti",
      comingSoon: true
    },
    {
      id: 8,
      title: "Bilim Maceraları",
      author: "Bilim Uzmanı",
      cover: "/img/benim-kucuk-deneylerim-mekanik...-5-4bcd.jpg",
      originalPrice: "₺195,00",
      currentPrice: "₺156,00",
      discount: "20%",
      link: "/kitaplar/bilim-maceralari",
      comingSoon: true
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
            <div key={book.id} className={`book-card ${book.comingSoon ? 'coming-soon' : ''}`}>
              <div className="book-cover">
                <img src={book.cover} alt={book.title} />
                {book.comingSoon ? (
                  <div className="coming-badge">Yakında</div>
                ) : (
                  <div className="discount-badge">{book.discount}</div>
                )}
              </div>
              <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">{book.author}</p>
                {!book.comingSoon && (
                  <div className="price-info">
                    <span className="current-price">{book.currentPrice}</span>
                    <span className="original-price">{book.originalPrice}</span>
                  </div>
                )}
                <button 
                  className={`buy-button ${book.comingSoon ? 'coming-soon-btn' : ''}`}
                  disabled={book.comingSoon}
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


