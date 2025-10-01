export default function KitaplarimPage() {
  const purchasedBooks = [
    {
      id: 1,
      title: "Oyunlarla Satranç",
      author: "Ozan ÇAPAN",
      cover: "/img/oyunlarla-satranc-4228-9.webp",
      purchaseDate: "15 Aralık 2024",
      progress: 85,
      link: "/kitaplar/satranc"
    },
    {
      id: 2,
      title: "Hava Olayları",
      author: "Elisabeth de LAMBILLY",
      cover: "/img/hava-4a9c-b724-.jpg",
      purchaseDate: "10 Aralık 2024",
      progress: 60,
      link: "/kitaplar/hava-olaylari"
    },
    {
      id: 3,
      title: "Benim Küçük Deneylerim",
      author: "Melanie PEREZ",
      cover: "/img/benim-kucuk-deneylerim-mekanik...-5-4bcd.jpg",
      purchaseDate: "8 Aralık 2024",
      progress: 40,
      link: "/kitaplar/benim-kucuk-deneylerim"
    },
    {
      id: 4,
      title: "Atalarımızdan Dersler",
      author: "Raksha Dave",
      cover: "/img/atalarımızdan dersler.jpg",
      purchaseDate: "5 Aralık 2024",
      progress: 25,
      link: "/kitaplar/atalarimizdan-dersler"
    },
    {
      id: 5,
      title: "13 Yaşına Gelmeden Tatilde Yaşanacak 50 Macera İçin Kılavuz",
      author: "P.D. BACCALARIO",
      cover: "/img/tatil kitabı.jpg",
      purchaseDate: "1 Aralık 2024",
      progress: 70,
      link: "/kitaplar/tatilde-50-macera"
    }
  ];

  return (
    <>
      <section className="hero">
        <h2>📚 Kitaplarım</h2>
        <p>Satın aldığınız kitaplar ve ilerleme durumunuz</p>
      </section>

      <section className="books-section">
        <div className="section-header">
          <h2>Satın Alınan Kitaplar</h2>
          <p>Toplam {purchasedBooks.length} kitap</p>
        </div>
        
        <div className="books-grid">
          {purchasedBooks.map(book => (
            <div key={book.id} className="book-card purchased">
              <div className="book-cover">
                <img src={book.cover} alt={book.title} />
                <div className="progress-badge">
                  <span className="progress-text">{book.progress}%</span>
                </div>
              </div>
              <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">{book.author}</p>
                <div className="purchase-info">
                  <span className="purchase-date">📅 {book.purchaseDate}</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${book.progress}%` }}
                  ></div>
                </div>
                <a href={book.link} className="continue-btn">
                  {book.progress > 0 ? 'Devam Et' : 'Başla'}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
