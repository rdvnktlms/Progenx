export default function HesapPage() {
  const accountInfo = {
    name: "Kullanıcı",
    email: "user@example.com",
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

  return (
    <>
      <section className="hero">
        <h2>💳 Hesap Bilgileri</h2>
        <p>Ödeme yöntemleriniz ve hesap geçmişiniz</p>
      </section>

      <section className="account-section">
        <div className="account-grid">
          <div className="account-card">
            <h3>👤 Hesap Özeti</h3>
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
    </>
  );
}
