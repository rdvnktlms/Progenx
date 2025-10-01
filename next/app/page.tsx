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
      author: "Elisabeth de LAMBILLY",
      cover: "/img/hava-4a9c-b724-.jpg",
      originalPrice: "₺195,00",
      currentPrice: "₺156,00",
      discount: "20%",
      link: "/kitaplar/hava-olaylari"
    },
    {
      id: 3,
      title: "Benim Küçük Deneylerim",
      author: "Melanie PEREZ",
      cover: "/img/benim-kucuk-deneylerim-mekanik...-5-4bcd.jpg",
      originalPrice: "₺195,00",
      currentPrice: "₺156,00",
      discount: "20%",
      link: "/kitaplar/benim-kucuk-deneylerim"
    },
    {
      id: 4,
      title: "Atalarımızdan Dersler",
      author: "Raksha Dave",
      cover: "/img/atalarımızdan dersler.jpg",
      originalPrice: "₺195,00",
      currentPrice: "₺156,00",
      discount: "20%",
      link: "/kitaplar/atalarimizdan-dersler"
    },
    {
      id: 5,
      title: "13 Yaşına Gelmeden Tatilde Yaşanacak 50 Macera İçin Kılavuz",
      author: "P.D. BACCALARIO",
      cover: "/img/tatil kitabı.jpg",
      originalPrice: "₺195,00",
      currentPrice: "₺156,00",
      discount: "20%",
      link: "/kitaplar/tatilde-50-macera"
    },
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


