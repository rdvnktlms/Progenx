// Veritabanı tabanlı key sistemi
import { keyService } from './database'

export interface BookKey {
  id: string;
  bookId: string;
  bookTitle: string;
  keyHash: string;
  isActive: boolean;
  createdAt: string;
  usedAt?: string;
  usedBy?: string;
}

// Key oluştur
export const createKeys = async (bookId: string, bookTitle: string, count: number): Promise<BookKey[]> => {
  try {
    const keys = await keyService.createKeys(bookId, bookTitle, count);
    return keys.map(key => ({
      id: key.id,
      bookId: key.book_id,
      bookTitle: key.book_title,
      keyHash: key.key_hash,
      isActive: key.is_active,
      createdAt: key.created_at,
      usedAt: key.used_at,
      usedBy: key.used_by
    }));
  } catch (error) {
    console.error('Key oluşturma hatası:', error);
    return [];
  }
};

// Key doğrula
export const verifyKey = async (keyHash: string): Promise<{ valid: boolean; bookId?: string; bookTitle?: string }> => {
  try {
    return await keyService.verifyKey(keyHash);
  } catch (error) {
    console.error('Key doğrulama hatası:', error);
    return { valid: false };
  }
};

// Key kullan
export const useKey = async (keyHash: string, userId: string): Promise<boolean> => {
  try {
    return await keyService.useKey(keyHash, userId);
  } catch (error) {
    console.error('Key kullanma hatası:', error);
    return false;
  }
};

// Tüm keyleri getir
export const getAllKeys = async (): Promise<BookKey[]> => {
  try {
    const keys = await keyService.getAllKeys();
    return keys.map(key => ({
      id: key.id,
      bookId: key.book_id,
      bookTitle: key.book_title,
      keyHash: key.key_hash,
      isActive: key.is_active,
      createdAt: key.created_at,
      usedAt: key.used_at,
      usedBy: key.used_by
    }));
  } catch (error) {
    console.error('Key listesi alma hatası:', error);
    return [];
  }
};

// Kitap başlığını getir
export const getBookTitle = (bookId: string): string => {
  const bookTitles: { [key: string]: string } = {
    'hava-olaylari': 'Hava Olayları',
    'benim-kucuk-deneylerim': 'Benim Küçük Deneylerim',
    'oyunlarla-satranc': 'Oyunlarla Satranç',
    'tatilde-50-macera': 'Tatilde 50 Macera',
    'atalarimizdan-dersler': 'Atalarımızdan Dersler'
  };
  return bookTitles[bookId] || bookId;
};

// Key formatını doğrula
export const isValidKeyFormat = (key: string): boolean => {
  const keyPattern = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
  return keyPattern.test(key);
};

// Excel export
export const exportKeysToExcel = (keys: BookKey[]): void => {
  const data = [
    ['Kitap', 'Key', 'Durum', 'Oluşturulma Tarihi', 'Kullanılma Tarihi', 'Kullanan'],
    ...keys.map(key => [
      key.bookTitle,
      key.keyHash,
      key.usedAt ? 'Kullanıldı' : 'Aktif',
      new Date(key.createdAt).toLocaleDateString('tr-TR'),
      key.usedAt ? new Date(key.usedAt).toLocaleDateString('tr-TR') : '-',
      key.usedBy || '-'
    ])
  ];

  const csvContent = data.map(row => row.join(',')).join('\n');
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
