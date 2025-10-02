"use client";
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function HesapPage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });

  const accountInfo = {
    name: user?.name || "Kullanıcı",
    email: user?.email || "user@example.com",
    memberSince: "1 Aralık 2024",
    totalSpent: "₺832,00",
    totalBooks: 5
  };

  const paymentMethods = [
    {
      id: 1,
      type: "Kredi Kartı",
      number: "**** **** **** 1234",
      expiry: "12/26",
      isDefault: true
    },
    {
      id: 2,
      type: "Banka Kartı",
      number: "**** **** **** 5678",
      expiry: "08/27",
      isDefault: false
    }
  ];

  const recentPurchases = [
    {
      id: 1,
      book: "Oyunlarla Satranç",
      date: "15 Aralık 2024",
      amount: "₺160,00",
      status: "Tamamlandı"
    },
    {
      id: 2,
      book: "Hava Olayları",
      date: "10 Aralık 2024",
      amount: "₺156,00",
      status: "Tamamlandı"
    },
    {
      id: 3,
      book: "Benim Küçük Deneylerim",
      date: "8 Aralık 2024",
      amount: "₺156,00",
      status: "Tamamlandı"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = () => {
    // Burada gerçek API çağrısı yapılabilir
    console.log('Kullanıcı bilgileri güncellendi:', formData);
    setIsEditing(false);
    
    // Toast notification göster
    console.log('Toast gösteriliyor...');
    setShowToast(true);
    
    // 3 saniye sonra toast'ı gizle
    setTimeout(() => {
      console.log('Toast gizleniyor...');
      setShowToast(false);
    }, 3000);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      address: '',
      city: '',
      postalCode: ''
    });
    setIsEditing(false);
  };

  return (
    <>
      <section className="hero">
        <h2>💳 Hesap Bilgileri</h2>
        <p>Ödeme yöntemleriniz ve hesap geçmişiniz</p>
      </section>

      <section className="account-section">
        <div className="account-grid">
          <div className="account-card">
            <div className="card-header">
              <h3>👤 Hesap Bilgileri</h3>
              {!isEditing ? (
                <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>
                  ✏️ Düzenle
                </button>
              ) : (
                <div className="form-actions">
                  <button className="save-btn" onClick={handleSave}>💾 Kaydet</button>
                  <button className="cancel-btn" onClick={handleCancel}>❌ İptal</button>
                </div>
              )}
            </div>
            
            {!isEditing ? (
              <div className="account-info">
                <div className="info-item">
                  <span className="label">İsim:</span>
                  <span className="value">{accountInfo.name}</span>
                </div>
                <div className="info-item">
                  <span className="label">E-posta:</span>
                  <span className="value">{accountInfo.email}</span>
                </div>
                <div className="info-item">
                  <span className="label">Üyelik Tarihi:</span>
                  <span className="value">{accountInfo.memberSince}</span>
                </div>
                <div className="info-item">
                  <span className="label">Toplam Harcama:</span>
                  <span className="value">{accountInfo.totalSpent}</span>
                </div>
                <div className="info-item">
                  <span className="label">Satın Alınan Kitap:</span>
                  <span className="value">{accountInfo.totalBooks} kitap</span>
                </div>
              </div>
            ) : (
              <div className="edit-form">
                <div className="form-group">
                  <label htmlFor="name">Ad Soyad</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-posta</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Telefon</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="+90 5XX XXX XX XX"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Adres</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Mahalle, sokak, bina no"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">Şehir</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="postalCode">Posta Kodu</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="34000"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="account-card">
            <h3>💳 Ödeme Yöntemleri</h3>
            <div className="payment-methods">
              {paymentMethods.map(method => (
                <div key={method.id} className={`payment-method ${method.isDefault ? 'default' : ''}`}>
                  <div className="method-info">
                    <span className="method-type">{method.type}</span>
                    <span className="method-number">{method.number}</span>
                    <span className="method-expiry">Son kullanma: {method.expiry}</span>
                  </div>
                  <div className="method-actions">
                    {method.isDefault && <span className="default-badge">Varsayılan</span>}
                    <button className="edit-btn">Düzenle</button>
                  </div>
                </div>
              ))}
              <button className="add-payment-btn">+ Yeni Ödeme Yöntemi Ekle</button>
            </div>
          </div>

          <div className="account-card">
            <h3>📋 Son Satın Alımlar</h3>
            <div className="purchases-list">
              {recentPurchases.map(purchase => (
                <div key={purchase.id} className="purchase-item">
                  <div className="purchase-info">
                    <span className="purchase-book">{purchase.book}</span>
                    <span className="purchase-date">{purchase.date}</span>
                  </div>
                  <div className="purchase-details">
                    <span className="purchase-amount">{purchase.amount}</span>
                    <span className={`purchase-status ${purchase.status === 'Tamamlandı' ? 'completed' : 'pending'}`}>
                      {purchase.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Toast Notification */}
      <div className="toast-container">
        <div className={`toast ${showToast ? 'show' : ''}`}>
          <div className="toast-icon">✅</div>
          <div className="toast-content">
            <h4 className="toast-title">Başarılı!</h4>
            <p className="toast-message">Bilgileriniz başarıyla güncellendi.</p>
          </div>
          <button 
            className="toast-close" 
            onClick={() => setShowToast(false)}
            aria-label="Kapat"
          >
            ×
          </button>
        </div>
      </div>
    </>
  );
}
