-- Supabase Veritabanı Şeması
-- Bu dosyayı Supabase SQL Editor'da çalıştırın

-- Kullanıcılar tablosu
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  favorite_genres TEXT[] DEFAULT '{}'
);

-- Kullanıcı kitapları tablosu
CREATE TABLE user_books (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  book_id VARCHAR(100) NOT NULL,
  book_title VARCHAR(255) NOT NULL,
  activation_key VARCHAR(100) NOT NULL,
  activation_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_played TIMESTAMP WITH TIME ZONE,
  games_played INTEGER DEFAULT 0,
  total_play_time INTEGER DEFAULT 0, -- dakika
  added_by VARCHAR(20) DEFAULT 'user' CHECK (added_by IN ('admin', 'publisher', 'user')),
  expiry_date DATE,
  is_active BOOLEAN DEFAULT true
);

-- Oyun oturumları tablosu
CREATE TABLE game_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  game_id VARCHAR(100) NOT NULL,
  book_id VARCHAR(100) NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  score INTEGER NOT NULL,
  duration INTEGER NOT NULL, -- dakika
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sayfa görüntülemeleri tablosu
CREATE TABLE page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id VARCHAR(255) NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  duration INTEGER DEFAULT 0, -- saniye
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Kitap keyleri tablosu
CREATE TABLE book_keys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  book_id VARCHAR(100) NOT NULL,
  book_title VARCHAR(255) NOT NULL,
  key_hash VARCHAR(100) UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  used_at TIMESTAMP WITH TIME ZONE,
  used_by VARCHAR(255)
);

-- Admin kullanıcıları tablosu
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true
);

-- İndeksler
CREATE INDEX idx_user_books_user_id ON user_books(user_id);
CREATE INDEX idx_user_books_book_id ON user_books(book_id);
CREATE INDEX idx_game_sessions_user_id ON game_sessions(user_id);
CREATE INDEX idx_game_sessions_game_id ON game_sessions(game_id);
CREATE INDEX idx_game_sessions_book_id ON game_sessions(book_id);
CREATE INDEX idx_game_sessions_created_at ON game_sessions(created_at);
CREATE INDEX idx_page_views_user_id ON page_views(user_id);
CREATE INDEX idx_page_views_page_id ON page_views(page_id);
CREATE INDEX idx_page_views_created_at ON page_views(created_at);
CREATE INDEX idx_book_keys_key_hash ON book_keys(key_hash);
CREATE INDEX idx_book_keys_book_id ON book_keys(book_id);

-- RLS (Row Level Security) politikaları
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_books ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Kullanıcılar için politikalar
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Kullanıcı kitapları için politikalar
CREATE POLICY "Users can view their own books" ON user_books
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert their own books" ON user_books
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Oyun oturumları için politikalar
CREATE POLICY "Anyone can insert game sessions" ON game_sessions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view game sessions" ON game_sessions
  FOR SELECT USING (true);

-- Sayfa görüntülemeleri için politikalar
CREATE POLICY "Anyone can insert page views" ON page_views
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view page views" ON page_views
  FOR SELECT USING (true);

-- Kitap keyleri için politikalar
CREATE POLICY "Anyone can view book keys" ON book_keys
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert book keys" ON book_keys
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update book keys" ON book_keys
  FOR UPDATE USING (true);

-- Admin kullanıcıları için politikalar
CREATE POLICY "Admin users can view all data" ON admin_users
  FOR SELECT USING (true);

-- Örnek veriler
INSERT INTO users (email, name, status, favorite_genres) VALUES
  ('ahmet@example.com', 'Ahmet Yılmaz', 'active', ARRAY['Bilim', 'Eğitim', 'Satranç']),
  ('elif@example.com', 'Elif Kaya', 'active', ARRAY['Macera', 'Eğitim']),
  ('mehmet@example.com', 'Mehmet Demir', 'inactive', ARRAY['Tarih']),
  ('zeynep@example.com', 'Zeynep Can', 'active', ARRAY['Tarih', 'Eğitim']);

-- Örnek admin kullanıcısı
INSERT INTO admin_users (username, email, password_hash) VALUES
  ('admin', 'admin@odtu.edu.tr', '$2a$10$rQZ8K9L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J6K7L8M9N0O1P2Q3R4S5T6U7V8W9X0Y1Z2');

-- Örnek kitap keyleri
INSERT INTO book_keys (book_id, book_title, key_hash) VALUES
  ('hava-olaylari', 'Hava Olayları', 'HAVA-1234-5678-9012'),
  ('hava-olaylari', 'Hava Olayları', 'HAVA-2345-6789-0123'),
  ('benim-kucuk-deneylerim', 'Benim Küçük Deneylerim', 'DENEY-3456-7890-1234'),
  ('benim-kucuk-deneylerim', 'Benim Küçük Deneylerim', 'DENEY-4567-8901-2345'),
  ('oyunlarla-satranc', 'Oyunlarla Satranç', 'SATRANC-5678-9012-3456'),
  ('tatilde-50-macera', 'Tatilde 50 Macera', 'MACERA-6789-0123-4567'),
  ('atalarimizdan-dersler', 'Atalarımızdan Dersler', 'ATALAR-7890-1234-5678');
