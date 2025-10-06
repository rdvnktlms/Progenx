# İnteraktif Kitap Projesi

ODTÜ Yayıncılık için geliştirilmiş interaktif çocuk kitapları platformu.

## 🚀 Özellikler

- **5 İnteraktif Kitap**: Hava Olayları, Benim Küçük Deneylerim, Oyunlarla Satranç, Tatilde 50 Macera, Atalarımızdan Dersler
- **12+ Eğitici Oyun**: Fizik simülasyonları, strateji oyunları, kelime oyunları
- **Key Sistemi**: Her kitap için benzersiz aktivasyon anahtarları
- **Demo Sistemi**: 1 dakika ücretsiz deneme
- **Admin Paneli**: Kullanıcı yönetimi, key yönetimi, analitik raporlar
- **Gerçek Zamanlı Analytics**: Oyun istatistikleri ve kullanıcı davranış analizi

## 🛠️ Teknolojiler

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Supabase (PostgreSQL)
- **Styling**: CSS3, Responsive Design
- **Deployment**: Vercel

## 📦 Kurulum

### 1. Projeyi Klonlayın
```bash
git clone https://github.com/rdvnktlms/Progenx.git
cd Progenx/next
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Environment Variables Ayarlayın
`.env.local` dosyası oluşturun:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Supabase Veritabanını Kurun
1. [Supabase](https://supabase.com) hesabı oluşturun
2. Yeni proje oluşturun
3. `supabase-schema.sql` dosyasını SQL Editor'da çalıştırın
4. Project URL ve Anon Key'i kopyalayın

### 5. Development Server'ı Başlatın
```bash
npm run dev
```

## 🗄️ Veritabanı Şeması

### Tablolar
- **users**: Kullanıcı bilgileri
- **user_books**: Kullanıcı-kitap ilişkileri
- **game_sessions**: Oyun oturumları
- **page_views**: Sayfa görüntülemeleri
- **book_keys**: Kitap aktivasyon anahtarları
- **admin_users**: Admin kullanıcıları

## 🔐 Güvenlik

- **Admin Paneli**: Gizli URL parametresi (`?key=odtu-admin-2024-secret`)
- **Key Sistemi**: Hash tabanlı doğrulama
- **RLS**: Row Level Security ile veri koruması
- **HTTPS**: Tüm bağlantılar şifrelenmiş

## 📊 Admin Paneli

### Erişim
```
https://your-domain.com/admin/login?key=odtu-admin-2024-secret
```

### Giriş Bilgileri
- **Kullanıcı Adı**: admin
- **Şifre**: odtu2024
- **Admin Kodu**: ODTU2024ADMIN

### Özellikler
- **Dashboard**: Genel istatistikler
- **Kullanıcı Yönetimi**: Kullanıcı ekleme/düzenleme/silme
- **Kitap Yönetimi**: Kitap bilgileri düzenleme
- **Oyun Yönetimi**: Oyun istatistikleri
- **Key Yönetimi**: Aktivasyon anahtarı oluşturma/export
- **Raporlar**: Detaylı analitik raporlar

## 🚀 Deployment

### Vercel ile Deploy
1. [Vercel](https://vercel.com) hesabı oluşturun
2. GitHub repository'yi bağlayın
3. Environment variables'ları ekleyin
4. Deploy edin

### Environment Variables (Vercel)
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📱 Responsive Design

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🎮 Oyunlar

### Benim Küçük Deneylerim
- Kurt vs Koyunlar (Strateji)
- Hırsız Polis (Strateji)
- Fırlayan Balon (Fizik)
- Su Gemisi (Fizik)
- Asma Köprü (Mühendislik)

### Hava Olayları
- Rüzgar Yönü (Bilim)
- Yağmur Bulutu (Bilim)
- Gökkuşağı Renkleri (Bilim)
- Fırtına Simülatörü (Bilim)
- Sıcaklık Termometresi (Bilim)

### Tatilde 50 Macera
- Sırt Çantası Hazırlama (Pratik)
- Tatil Haritası Çizme (Yaratıcılık)

### Atalarımızdan Dersler
- Kelime Eşleştirme (Dil)

## 📈 Analytics

- **Gerçek Zamanlı Veri**: Her oyun ve sayfa ziyaretinde otomatik kayıt
- **Kullanıcı Davranışı**: Hangi oyunlar daha çok oynanıyor
- **Performans Metrikleri**: Ortalama skor, oyun süresi
- **Popülerlik Analizi**: En çok tercih edilen kitaplar

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje ODTÜ Yayıncılık için geliştirilmiştir.

## 📞 İletişim

- **Proje Sahibi**: ODTÜ Yayıncılık
- **Geliştirici**: Progenx
- **Email**: info@odtuyayincilik.com.tr

## 🔄 Güncellemeler

### v1.0.0 (2024-10-06)
- ✅ İlk sürüm yayınlandı
- ✅ 5 kitap ve 12+ oyun eklendi
- ✅ Admin paneli oluşturuldu
- ✅ Key sistemi entegre edildi
- ✅ Analytics sistemi kuruldu
- ✅ Supabase veritabanı entegrasyonu
- ✅ Vercel deployment hazırlığı
