// Test verileri oluşturma sistemi
import { recordGameSession, recordPageView, saveAnalyticsData } from './analytics';

export const createTestData = () => {
  if (typeof window === 'undefined') return;

  // Test oyun oturumları
  const testGameSessions = [
    {
      gameId: 'kurt-vs-koyunlar',
      bookId: 'benim-kucuk-deneylerim',
      userId: 'ahmet@example.com',
      score: 85,
      duration: 5
    },
    {
      gameId: 'kurt-vs-koyunlar',
      bookId: 'benim-kucuk-deneylerim',
      userId: 'elif@example.com',
      score: 92,
      duration: 7
    },
    {
      gameId: 'hirsiz-polis',
      bookId: 'benim-kucuk-deneylerim',
      userId: 'ahmet@example.com',
      score: 78,
      duration: 6
    },
    {
      gameId: 'ruzgar-yonu',
      bookId: 'hava-olaylari',
      userId: 'zeynep@example.com',
      score: 95,
      duration: 4
    },
    {
      gameId: 'firlayan-balon',
      bookId: 'benim-kucuk-deneylerim',
      userId: 'ahmet@example.com',
      score: 88,
      duration: 8
    },
    {
      gameId: 'sirt-cantasi',
      bookId: 'tatilde-50-macera',
      userId: 'elif@example.com',
      score: 90,
      duration: 10
    },
    {
      gameId: 'tatil-haritasi',
      bookId: 'tatilde-50-macera',
      userId: 'zeynep@example.com',
      score: 82,
      duration: 12
    },
    {
      gameId: 'kelime-eslestirme',
      bookId: 'atalarimizdan-dersler',
      userId: 'ahmet@example.com',
      score: 76,
      duration: 6
    }
  ];

  // Test sayfa görüntülemeleri
  const testPageViews = [
    { pageId: '/', userId: 'ahmet@example.com', duration: 30 },
    { pageId: '/', userId: 'elif@example.com', duration: 45 },
    { pageId: '/', userId: 'zeynep@example.com', duration: 25 },
    { pageId: '/kitaplar/benim-kucuk-deneylerim', userId: 'ahmet@example.com', duration: 60 },
    { pageId: '/kitaplar/hava-olaylari', userId: 'elif@example.com', duration: 40 },
    { pageId: '/kitaplar/tatilde-50-macera', userId: 'zeynep@example.com', duration: 35 },
    { pageId: '/kitaplar/atalarimizdan-dersler', userId: 'ahmet@example.com', duration: 50 },
    { pageId: '/oyunlar/kurt-vs-koyunlar', userId: 'ahmet@example.com', duration: 300 },
    { pageId: '/oyunlar/hirsiz-polis', userId: 'elif@example.com', duration: 250 },
    { pageId: '/oyunlar/ruzgar-yonu', userId: 'zeynep@example.com', duration: 200 }
  ];

  // Test verilerini kaydet
  testGameSessions.forEach(session => {
    recordGameSession(session);
  });

  testPageViews.forEach(view => {
    recordPageView(view.pageId, view.userId, view.duration);
  });

  console.log('Test verileri oluşturuldu!');
};

// Test verilerini temizle
export const clearTestData = () => {
  if (typeof window === 'undefined') return;

  localStorage.removeItem('gameSessions');
  localStorage.removeItem('pageViews');
  localStorage.removeItem('analyticsData');
  
  console.log('Test verileri temizlendi!');
};

// Test verilerini admin panelinde göster
export const showTestDataInfo = () => {
  if (typeof window === 'undefined') return;

  const gameSessions = JSON.parse(localStorage.getItem('gameSessions') || '[]');
  const pageViews = JSON.parse(localStorage.getItem('pageViews') || '[]');
  const analyticsData = JSON.parse(localStorage.getItem('analyticsData') || '{}');

  console.log('=== TEST VERİLERİ ===');
  console.log('Oyun Oturumları:', gameSessions.length);
  console.log('Sayfa Görüntülemeleri:', pageViews.length);
  console.log('Analytics Verileri:', analyticsData);
  console.log('===================');

  return {
    gameSessions: gameSessions.length,
    pageViews: pageViews.length,
    analyticsData
  };
};
