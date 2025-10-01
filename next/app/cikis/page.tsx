export default function CikisPage() {
  return (
    <>
      <section className="hero">
        <h2>🚪 Çıkış Yap</h2>
        <p>Hesabınızdan güvenli bir şekilde çıkış yapın</p>
      </section>

      <section className="logout-section">
        <div className="logout-card">
          <div className="logout-icon">🚪</div>
          <h3>Çıkış Yapmak İstediğinizden Emin misiniz?</h3>
          <p>Hesabınızdan çıkış yaptığınızda:</p>
          <ul className="logout-info">
            <li>📚 Okuma ilerlemeniz kaydedilecek</li>
            <li>💾 Ayarlarınız korunacak</li>
            <li>🔄 Tekrar giriş yapabilirsiniz</li>
          </ul>
          
          <div className="logout-actions">
            <button className="confirm-logout-btn">
              ✅ Evet, Çıkış Yap
            </button>
            <a href="/" className="cancel-btn">
              ❌ İptal Et
            </a>
          </div>
          
          <div className="logout-alternatives">
            <h4>Alternatif Seçenekler:</h4>
            <div className="alternative-actions">
              <a href="/profil" className="alt-btn">
                ⚙️ Profil Ayarları
              </a>
              <a href="/hesap" className="alt-btn">
                💳 Hesap Bilgileri
              </a>
              <a href="/kitaplarim" className="alt-btn">
                📚 Kitaplarım
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
