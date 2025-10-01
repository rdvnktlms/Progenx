export default function AtalarimizdanDerslerPage() {
  return (
    <div className="book-page">
      <div className="book-header">
        <div className="book-cover-large">
          <img src="/img/atalarımızdan dersler.jpg" alt="Atalarımızdan Dersler" />
        </div>
        <div className="book-details">
          <h1>Atalarımızdan Dersler</h1>
          <p className="author">Raksha Dave</p>
          <div className="book-description">
            <p>Arkeolojik kalıntılarla geçmişin sırlarını keşfetmeye hazır mısın? Bu sayfada kitabımızdaki maceraları interaktif deneyimlerle yaşayacaksın!</p>
          </div>
        </div>
      </div>

      <section className="interactive-section">
        <h2>🏛️ Çatalhöyük Sanal Müzesi</h2>
        <p>
          Çatalhöyük, MÖ 7400-6500 yıllarına tarihlenen, Neolitik Dönem'e ait çok büyük bir yerleşim yeridir.
          Anadolu'nun ilk şehirlerinden biri olarak kabul edilen bu antik kent, evlerin birbirine bitişik inşa edildiği,
          çatılardan girilip çıkıldığı ve toplumsal cinsiyet eşitliğinin hüküm sürdüğü eşsiz bir yaşam biçimine ev sahipliği yapmıştır.
          Atalarımızın nasıl yaşadığını, ne yiyip içtiğini ve neye inandığını keşfetmek için sanal müzeyi ziyaret et!
        </p>
        <a 
          href="https://sanalmuze.gov.tr/muzeler/KONYA-CATALHOYUK-ORENYERI/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="cta-button"
        >
          🏛️ Çatalhöyük Sanal Müzesi'ni Keşfet
        </a>
      </section>

      <section className="interactive-section">
        <h2>📚 Kitabın Sözlüğü ve Kelime Eşleştirme Oyunu</h2>
        <p>
          Kitabımızda geçen bazı özel kelimelerin anlamlarını öğren ve eğlenceli bir oyunla bilgilerini pekiştir!
        </p>
        
        <div className="glossary-section">
          <h3>🔍 Önemli Kelimeler</h3>
          <div className="glossary-items">
            <div className="glossary-item">
              <h4>Gunyah</h4>
              <p>Avustralya Aborjinleri tarafından kullanılan, genellikle ağaç dalları ve kabuklarından yapılan basit barınak veya kulübe.</p>
            </div>
            
            <div className="glossary-item">
              <h4>Mungo Gölü</h4>
              <p>Avustralya'da, insanlık tarihinin en eski ve önemli arkeolojik buluntularının (Mungo Adamı ve Mungo Kadını gibi) yapıldığı antik bir göl yatağı.</p>
            </div>
            
            <div className="glossary-item">
              <h4>Çatalhöyük</h4>
              <p>Türkiye'de bulunan, MÖ 7400-6500 yıllarına tarihlenen, dünyanın en eski ve en büyük Neolitik yerleşim yerlerinden biri.</p>
            </div>
            
            <div className="glossary-item">
              <h4>Neolitik</h4>
              <p>Yeni Taş Devri olarak da bilinen, insanların yerleşik hayata geçip tarım ve hayvancılık yapmaya başladığı tarih öncesi dönem.</p>
            </div>
            
            <div className="glossary-item">
              <h4>Arkeolog</h4>
              <p>Geçmiş uygarlıkları ve insan yaşamını, kazılar yaparak bulduğu kalıntılar (eserler, yapılar, iskeletler) aracılığıyla inceleyen bilim insanı.</p>
            </div>
          </div>
        </div>

        <div className="matching-game-section">
          <h3>🎮 Kelime Eşleştirme Oyunu</h3>
          <p>Kitabımızdaki önemli kelimeleri anlamlarıyla eşleştirerek bilgilerini test et! Ne kadar hızlı ve doğru yapabileceğini gör!</p>
          <a 
            href="/oyunlar/atalarimizdan-dersler-eslestirme" 
            className="cta-button"
            style={{ marginTop: '1rem' }}
          >
            🎯 Eşleştirme Oyununu Oyna!
          </a>
        </div>
      </section>

      <div className="book-actions">
        <a href="/" className="cta primary">Ana Sayfaya Dön</a>
        <a href="/kitaplar" className="cta secondary">Diğer Kitaplar</a>
      </div>
    </div>
  );
}
