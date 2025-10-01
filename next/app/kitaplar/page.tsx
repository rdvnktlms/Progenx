export default function Books(){
  return (
    <>
      <div className="hero"><h2>Kitaplar</h2><p>Seç ve içindeki oyunlara geç.</p></div>
      <div className="card-grid">
        <article className="card">
          <h3>Oyunlarla Satranç</h3>
          <p>Kurt vs Koyunlar mini oyunları.</p>
          <a className="cta" href="/kitaplar/satranc">Kitap Detayı</a>
        </article>
        
        <article className="card">
          <h3>Hava Olayları</h3>
          <p>Yağmur, rüzgar, fırtına oyunları ile hava olaylarını keşfet!</p>
          <a className="cta" href="/kitaplar/hava-olaylari">Kitap Detayı</a>
        </article>
        
        <article className="card">
          <img src="/img/benim-kucuk-deneylerim-mekanik...-5-4bcd.jpg" alt="Benim Küçük Deneylerim" style={{width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem'}} />
          <h3>Benim Küçük Deneylerim</h3>
          <p>Mekanik prensipleri eğlenceli deneylerle öğren!</p>
          <a className="cta" href="/kitaplar/benim-kucuk-deneylerim">Kitap Detayı</a>
        </article>
      </div>
    </>
  );
}


