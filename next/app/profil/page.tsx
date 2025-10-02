"use client";
import { useState, useEffect } from 'react';

export default function ProfilPage() {
  const [userProfile, setUserProfile] = useState({
    name: "Kullanıcı",
    email: "user@example.com",
    phone: "",
    avatar: "👤",
    joinDate: "1 Aralık 2024",
    readingLevel: "Orta",
    favoriteGenres: ["Bilim", "Macera", "Eğitim"],
    readingGoal: 10,
    booksRead: 5
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const [editForm, setEditForm] = useState({
    name: userProfile.name,
    readingLevel: userProfile.readingLevel,
    readingGoal: userProfile.readingGoal,
    favoriteGenres: userProfile.favoriteGenres
  });

  const [phoneForm, setPhoneForm] = useState({
    phone: ""
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [emailForm, setEmailForm] = useState({
    newEmail: ""
  });

  const [settings, setSettings] = useState([
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
  ]);

  const availableGenres = ["Bilim", "Macera", "Eğitim", "Tarih", "Sanat", "Spor", "Müzik", "Doğa", "Teknoloji", "Felsefe"];

  const handleEditProfile = () => {
    setUserProfile(prev => ({
      ...prev,
      name: editForm.name,
      readingLevel: editForm.readingLevel,
      readingGoal: editForm.readingGoal,
      favoriteGenres: editForm.favoriteGenres
    }));
    setShowEditModal(false);
  };

  const handleAddPhone = () => {
    setUserProfile(prev => ({
      ...prev,
      phone: phoneForm.phone
    }));
    setShowPhoneModal(false);
    setPhoneForm({ phone: "" });
  };

  const handleChangePassword = () => {
    if (passwordForm.newPassword === passwordForm.confirmPassword) {
      alert("Şifre başarıyla değiştirildi!");
      setShowPasswordModal(false);
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } else {
      alert("Yeni şifreler eşleşmiyor!");
    }
  };

  const handleChangeEmail = () => {
    setUserProfile(prev => ({
      ...prev,
      email: emailForm.newEmail
    }));
    alert("E-posta adresi başarıyla değiştirildi!");
    setShowEmailModal(false);
    setEmailForm({ newEmail: "" });
  };

  const handleDeleteAccount = () => {
    alert("Hesabınız silindi! (Demo amaçlı)");
    setShowDeleteModal(false);
  };

  const toggleSetting = (id: number) => {
    setSettings(prev => prev.map(setting => 
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    ));
  };

  const toggleGenre = (genre: string) => {
    setEditForm(prev => ({
      ...prev,
      favoriteGenres: prev.favoriteGenres.includes(genre)
        ? prev.favoriteGenres.filter(g => g !== genre)
        : [...prev.favoriteGenres, genre]
    }));
  };

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
                {userProfile.phone && <p>📱 {userProfile.phone}</p>}
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
            <button 
              className="edit-profile-btn"
              onClick={() => {
                setEditForm({
                  name: userProfile.name,
                  readingLevel: userProfile.readingLevel,
                  readingGoal: userProfile.readingGoal,
                  favoriteGenres: userProfile.favoriteGenres
                });
                setShowEditModal(true);
              }}
            >
              Profili Düzenle
            </button>
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
                    <input 
                      type="checkbox" 
                      checked={setting.enabled}
                      onChange={() => toggleSetting(setting.id)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="profile-card">
            <h3>🔒 Hesap Güvenliği</h3>
            <div className="security-actions">
              <button 
                className="security-btn"
                onClick={() => setShowPasswordModal(true)}
              >
                🔑 Şifre Değiştir
              </button>
              <button 
                className="security-btn"
                onClick={() => setShowEmailModal(true)}
              >
                📧 E-posta Değiştir
              </button>
              <button 
                className="security-btn"
                onClick={() => setShowPhoneModal(true)}
              >
                📱 Telefon Numarası {userProfile.phone ? 'Değiştir' : 'Ekle'}
              </button>
              <button 
                className="security-btn danger"
                onClick={() => setShowDeleteModal(true)}
              >
                🗑️ Hesabı Sil
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Profil Düzenleme Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Profili Düzenle</h3>
              <button className="close-btn" onClick={() => setShowEditModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>İsim:</label>
                <input 
                  type="text" 
                  value={editForm.name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Okuma Seviyesi:</label>
                <select 
                  value={editForm.readingLevel}
                  onChange={(e) => setEditForm(prev => ({ ...prev, readingLevel: e.target.value }))}
                >
                  <option value="Başlangıç">Başlangıç</option>
                  <option value="Orta">Orta</option>
                  <option value="İleri">İleri</option>
                </select>
              </div>
              <div className="form-group">
                <label>Yıllık Okuma Hedefi:</label>
                <input 
                  type="number" 
                  value={editForm.readingGoal}
                  onChange={(e) => setEditForm(prev => ({ ...prev, readingGoal: parseInt(e.target.value) }))}
                />
              </div>
              <div className="form-group">
                <label>Favori Kategoriler:</label>
                <div className="genres-selection">
                  {availableGenres.map(genre => (
                    <label key={genre} className="genre-checkbox">
                      <input 
                        type="checkbox"
                        checked={editForm.favoriteGenres.includes(genre)}
                        onChange={() => toggleGenre(genre)}
                      />
                      <span>{genre}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowEditModal(false)}>İptal</button>
              <button className="btn-primary" onClick={handleEditProfile}>Kaydet</button>
            </div>
          </div>
        </div>
      )}

      {/* Telefon Numarası Modal */}
      {showPhoneModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Telefon Numarası {userProfile.phone ? 'Değiştir' : 'Ekle'}</h3>
              <button className="close-btn" onClick={() => setShowPhoneModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Telefon Numarası:</label>
                <input 
                  type="tel" 
                  placeholder="+90 5XX XXX XX XX"
                  value={phoneForm.phone}
                  onChange={(e) => setPhoneForm(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowPhoneModal(false)}>İptal</button>
              <button className="btn-primary" onClick={handleAddPhone}>Kaydet</button>
            </div>
          </div>
        </div>
      )}

      {/* Şifre Değiştirme Modal */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Şifre Değiştir</h3>
              <button className="close-btn" onClick={() => setShowPasswordModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Mevcut Şifre:</label>
                <input 
                  type="password" 
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Yeni Şifre:</label>
                <input 
                  type="password" 
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Yeni Şifre Tekrar:</label>
                <input 
                  type="password" 
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowPasswordModal(false)}>İptal</button>
              <button className="btn-primary" onClick={handleChangePassword}>Değiştir</button>
            </div>
          </div>
        </div>
      )}

      {/* E-posta Değiştirme Modal */}
      {showEmailModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>E-posta Değiştir</h3>
              <button className="close-btn" onClick={() => setShowEmailModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Mevcut E-posta:</label>
                <input type="email" value={userProfile.email} disabled />
              </div>
              <div className="form-group">
                <label>Yeni E-posta:</label>
                <input 
                  type="email" 
                  value={emailForm.newEmail}
                  onChange={(e) => setEmailForm(prev => ({ ...prev, newEmail: e.target.value }))}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowEmailModal(false)}>İptal</button>
              <button className="btn-primary" onClick={handleChangeEmail}>Değiştir</button>
            </div>
          </div>
        </div>
      )}

      {/* Hesap Silme Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Hesabı Sil</h3>
              <button className="close-btn" onClick={() => setShowDeleteModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <p>⚠️ Bu işlem geri alınamaz! Hesabınız ve tüm verileriniz kalıcı olarak silinecek.</p>
              <p>Emin misiniz?</p>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowDeleteModal(false)}>İptal</button>
              <button className="btn-danger" onClick={handleDeleteAccount}>Hesabı Sil</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}