# 🚀 Deployment Rehberi

## Supabase Kurulumu

### 1. Supabase Hesabı Oluşturun
1. [supabase.com](https://supabase.com) adresine gidin
2. "Start your project" butonuna tıklayın
3. GitHub ile giriş yapın
4. Yeni proje oluşturun

### 2. Veritabanını Kurun
1. Supabase Dashboard'da projenizi açın
2. Sol menüden "SQL Editor" seçin
3. "New query" butonuna tıklayın
4. `supabase-schema.sql` dosyasının içeriğini kopyalayın
5. SQL Editor'a yapıştırın ve "Run" butonuna tıklayın

### 3. API Anahtarlarını Alın
1. Sol menüden "Settings" > "API" seçin
2. "Project URL" ve "anon public" key'i kopyalayın
3. Bu bilgileri `.env.local` dosyasına ekleyin

## Vercel Deployment

### 1. Vercel Hesabı Oluşturun
1. [vercel.com](https://vercel.com) adresine gidin
2. GitHub ile giriş yapın
3. "New Project" butonuna tıklayın

### 2. Repository'yi Bağlayın
1. GitHub repository'nizi seçin
2. "Import" butonuna tıklayın
3. Root directory olarak `next` klasörünü seçin

### 3. Environment Variables Ekleyin
Vercel Dashboard'da:
1. Projenizi seçin
2. "Settings" > "Environment Variables" seçin
3. Aşağıdaki değişkenleri ekleyin:

```
NEXT_PUBLIC_SUPABASE_URL = your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY = your_supabase_anon_key
```

### 4. Deploy Edin
1. "Deploy" butonuna tıklayın
2. Build işlemi tamamlanana kadar bekleyin
3. Domain'inizi not edin

## Domain Ayarları

### 1. Custom Domain (Opsiyonel)
1. Vercel Dashboard'da projenizi seçin
2. "Settings" > "Domains" seçin
3. Domain'inizi ekleyin
4. DNS ayarlarını yapın

### 2. SSL Sertifikası
- Vercel otomatik olarak SSL sertifikası sağlar
- HTTPS bağlantısı otomatik olarak aktif olur

## Güvenlik Ayarları

### 1. Admin Panel Güvenliği
- Admin paneli sadece gizli URL ile erişilebilir
- URL: `https://your-domain.com/admin/login?key=odtu-admin-2024-secret`
- Admin kodu değiştirilebilir

### 2. Supabase Güvenliği
- RLS (Row Level Security) aktif
- API anahtarları güvenli
- Veritabanı şifreleme aktif

## Monitoring ve Analytics

### 1. Vercel Analytics
- Vercel Dashboard'da analytics görüntüleyin
- Performans metrikleri takip edin

### 2. Supabase Monitoring
- Supabase Dashboard'da veritabanı performansını izleyin
- API kullanımını takip edin

## Backup ve Recovery

### 1. Veritabanı Backup
1. Supabase Dashboard'da "Settings" > "Database" seçin
2. "Backups" sekmesine gidin
3. Otomatik backup'ları kontrol edin

### 2. Code Backup
- GitHub repository otomatik backup sağlar
- Düzenli olarak commit yapın

## Troubleshooting

### 1. Build Hataları
```bash
npm run build
```
- TypeScript hatalarını kontrol edin
- Dependencies'leri güncelleyin

### 2. Environment Variables
- `.env.local` dosyasının doğru olduğundan emin olun
- Vercel'de environment variables'ları kontrol edin

### 3. Database Bağlantısı
- Supabase URL ve key'lerin doğru olduğundan emin olun
- RLS politikalarını kontrol edin

## Performance Optimization

### 1. Image Optimization
- Next.js Image component kullanın
- WebP formatını tercih edin

### 2. Code Splitting
- Dynamic imports kullanın
- Lazy loading uygulayın

### 3. Caching
- Vercel Edge Network kullanın
- Static assets'leri cache'leyin

## Maintenance

### 1. Düzenli Güncellemeler
- Dependencies'leri güncelleyin
- Security patch'leri uygulayın

### 2. Monitoring
- Error tracking ekleyin
- Performance monitoring yapın

### 3. Backup
- Düzenli veritabanı backup'ları alın
- Code backup'larını kontrol edin
