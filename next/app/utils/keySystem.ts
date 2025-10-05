// Güvenli Key sistemi - Hash tabanlı doğrulama
export interface BookKey {
  bookId: string;
  keyHash: string;
  title: string;
  isActive: boolean;
  createdAt: string;
}

// Aktif key'ler - Sadece oluşturulan key'ler
const ACTIVE_KEYS: BookKey[] = [
  {
    bookId: 'oyunlarla-satranc',
    keyHash: '77290e2277290e2277290e2277290e2277290e2277290e2277290e2277290e22',
    title: 'Oyunlarla Satranç',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    bookId: 'hava-olaylari',
    keyHash: '41c866f141c866f141c866f141c866f141c866f141c866f141c866f141c866f1',
    title: 'Hava Olayları',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    bookId: 'benim-kucuk-deneylerim',
    keyHash: '4c64cae24c64cae24c64cae24c64cae24c64cae24c64cae24c64cae24c64cae2',
    title: 'Benim Küçük Deneylerim',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z'
  }
  // Diğer kitaplar için henüz key oluşturulmamış
];

// Key hash fonksiyonu (basit hash - gerçek uygulamada crypto kullanılmalı)
const hashKey = (key: string): string => {
  let hash = 0;
  const str = key.toUpperCase().trim();
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 32bit integer'a çevir
  }
  
  // 64 karakterlik hash oluştur
  const hashStr = Math.abs(hash).toString(16).padStart(8, '0');
  return (hashStr + hashStr + hashStr + hashStr + hashStr + hashStr + hashStr + hashStr).substring(0, 64);
};

// Key formatını kontrol et (XXXX-XXXX-XXXX-XXXX)
export const isValidKeyFormat = (key: string): boolean => {
  if (!key) return false;
  
  // Key formatı: XXXX-XXXX-XXXX-XXXX (büyük harf, tire ile ayrılmış, 16 karakter)
  const keyPattern = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
  return keyPattern.test(key.trim().toUpperCase());
};

export const verifyKey = (inputKey: string, bookId: string): boolean => {
  if (!inputKey || !bookId) {
    console.log('Key verification failed: Missing parameters', { inputKey, bookId });
    return false;
  }
  
  // Key formatını kontrol et
  if (!isValidKeyFormat(inputKey)) {
    console.log('Key verification failed: Invalid format', { inputKey });
    return false;
  }
  
  // Key'i temizle ve büyük harfe çevir
  const cleanKey = inputKey.trim().toUpperCase();
  
  // Bu kitap için aktif key'i bul
  const activeKey = ACTIVE_KEYS.find(k => k.bookId === bookId && k.isActive);
  
  if (!activeKey) {
    console.log('Key verification failed: No active key for book', { bookId });
    return false;
  }
  
  // Key hash'ini hesapla ve karşılaştır
  const inputHash = hashKey(cleanKey);
  const isValid = inputHash === activeKey.keyHash;
  
  console.log('Key verification:', { 
    inputKey: cleanKey, 
    inputHash: inputHash.substring(0, 16) + '...',
    expectedHash: activeKey.keyHash.substring(0, 16) + '...',
    bookId, 
    isValid 
  });
  
  return isValid;
};

export const getBookTitle = (bookId: string): string => {
  const book = ACTIVE_KEYS.find(k => k.bookId === bookId);
  return book ? book.title : bookId;
};

export const getAllActiveKeys = (): BookKey[] => {
  return [...ACTIVE_KEYS];
};

// Key oluşturma fonksiyonu (admin paneli için)
export const generateKey = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  
  for (let i = 0; i < 16; i++) {
    if (i > 0 && i % 4 === 0) {
      result += '-';
    }
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
};

// Key'in hangi kitap için geçerli olduğunu kontrol et
export const getKeyBookId = (key: string): string | null => {
  if (!isValidKeyFormat(key)) return null;
  
  const cleanKey = key.trim().toUpperCase();
  const inputHash = hashKey(cleanKey);
  
  const matchingBook = ACTIVE_KEYS.find(k => k.keyHash === inputHash && k.isActive);
  return matchingBook ? matchingBook.bookId : null;
};

// Admin paneli için key oluşturma
export const createKeys = (bookId: string, count: number): BookKey[] => {
  const keys = [];
  const book = ACTIVE_KEYS.find(k => k.bookId === bookId);
  const bookTitle = book ? book.title : bookId;
  
  for (let i = 0; i < count; i++) {
    const key = generateKey();
    const keyHash = hashKey(key);
    keys.push({
      bookId,
      keyHash,
      title: bookTitle,
      isActive: true,
      createdAt: new Date().toISOString()
    });
  }
  return keys;
};

// Excel export için key'leri hazırla
export const exportKeysToExcel = (keys: BookKey[]): void => {
  // CSV formatında export
  const csvContent = [
    ['Key Hash', 'Kitap ID', 'Kitap Adı', 'Aktif', 'Oluşturulma Tarihi'],
    ...keys.map(k => [k.keyHash, k.bookId, k.title, k.isActive ? 'Evet' : 'Hayır', k.createdAt])
  ].map(row => row.join(',')).join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `keys_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
