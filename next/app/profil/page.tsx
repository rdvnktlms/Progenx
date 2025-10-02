export default function ProfilPage() {
  const userProfile = {
    name: "Kullanıcı",
    email: "user@example.com",
    avatar: "👤",
    joinDate: "1 Aralık 2024",
    readingLevel: "Orta",
    favoriteGenres: ["Bilim", "Macera", "Eğitim"],
    readingGoal: 10,
    booksRead: 5
  };

  const settings = [
    {
      id: 1,
      title: "E-posta Bildirimleri",
      description: "Yeni kitap önerileri ve güncellemeler",
      enabled: true
    },
    {
      id: 2,
      title: "Push Bildirimleri",
      description: "Tarayıcı bildirimleri",
      enabled: false
    },
    {
      id: 3,
      title: "Okuma Hatırlatıcıları",
      description: "Günlük okuma hatırlatmaları",
      enabled: true
    },
    {
      id: 4,
      title: "İndirim Bildirimleri",
      description: "Kitap indirimleri ve kampanyalar",
      enabled: true
    },
    {
      id: 5,
      title: "Sosyal Özellikler",
      description: "Arkadaş aktiviteleri ve paylaşımlar",
      enabled: false
    },
    {
      id: 6,
      title: "Haftalık Rapor",
      description: "Okuma istatistikleri özeti",
      enabled: true
    }
  ];

  return (
    <>
      <section className="hero">
        <h2>⚙️ Profil Ayarları</h2>
        <p>Hesap bilgilerinizi ve tercihlerinizi yönetin</p>
      </section>

      <section className="profile-section">
        <div className="profile-grid">
          <div className="profile-card">
            <h3>👤 Profil Bilgileri</h3>
            <div className="profile-header">
              <div className="profile-avatar-large">
                {userProfile.avatar}
              </div>
              <div className="profile-info">
                <h4>{userProfile.name}</h4>
                <p>{userProfile.email}</p>
                <span className="member-since">Üye olma tarihi: {userProfile.joinDate}</span>
              </div>
            </div>
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-label">Okuma Seviyesi:</span>
                <span className="stat-value">{userProfile.readingLevel}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Hedef:</span>
                <span className="stat-value">{userProfile.readingGoal} kitap</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Okunan:</span>
                <span className="stat-value">{userProfile.booksRead} kitap</span>
              </div>
            </div>
            <div className="favorite-genres">
              <span className="genres-label">Favori Kategoriler:</span>
              <div className="genres-list">
                {userProfile.favoriteGenres.map((genre, index) => (
                  <span key={index} className="genre-tag">{genre}</span>
                ))}
              </div>
            </div>
            <button className="edit-profile-btn">Profili Düzenle</button>
          </div>

          <div className="profile-card">
            <h3>🔔 Bildirim Ayarları</h3>
            <div className="settings-list">
              {settings.map(setting => (
                <div key={setting.id} className="setting-item">
                  <div className="setting-info">
                    <span className="setting-title">{setting.title}</span>
                    <span className="setting-description">{setting.description}</span>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked={setting.enabled} />
                    <span className="slider"></span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="profile-card">
            <h3>🔒 Hesap Güvenliği</h3>
            <div className="security-actions">
              <button className="security-btn">
                🔑 Şifre Değiştir
              </button>
              <button className="security-btn">
                📧 E-posta Değiştir
              </button>
              <button className="security-btn">
                📱 Telefon Numarası Ekle
              </button>
              <button className="security-btn danger">
                🗑️ Hesabı Sil
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
