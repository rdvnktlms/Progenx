// Analytics ve veri toplama sistemi
export interface AnalyticsData {
  totalUsers: number;
  totalGamesPlayed: number;
  totalViews: number;
  averageScore: number;
  mostPopularBooks: Array<{
    bookId: string;
    title: string;
    views: number;
    gamesPlayed: number;
  }>;
  mostPlayedGames: Array<{
    gameId: string;
    name: string;
    plays: number;
    avgScore: number;
  }>;
  userGrowth: Array<{
    month: string;
    users: number;
  }>;
  categoryStats: Array<{
    category: string;
    users: number;
    percentage: number;
  }>;
}

export interface GameSession {
  gameId: string;
  bookId: string;
  userId: string;
  score: number;
  duration: number; // dakika
  timestamp: string;
}

export interface PageView {
  pageId: string;
  userId: string;
  timestamp: string;
  duration: number; // saniye
}

// Analytics verilerini localStorage'dan yükle
export const getAnalyticsData = (): AnalyticsData => {
  if (typeof window === 'undefined') {
    return getDefaultAnalytics();
  }

  try {
    const stored = localStorage.getItem('analyticsData');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Analytics veri yükleme hatası:', error);
  }

  return getDefaultAnalytics();
};

// Analytics verilerini localStorage'a kaydet
export const saveAnalyticsData = (data: AnalyticsData): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem('analyticsData', JSON.stringify(data));
  } catch (error) {
    console.error('Analytics veri kaydetme hatası:', error);
  }
};

// Oyun oturumu kaydet
export const recordGameSession = (session: Omit<GameSession, 'timestamp'>): void => {
  if (typeof window === 'undefined') return;

  try {
    const sessions = getGameSessions();
    const newSession: GameSession = {
      ...session,
      timestamp: new Date().toISOString()
    };
    
    sessions.push(newSession);
    localStorage.setItem('gameSessions', JSON.stringify(sessions));
    
    // Analytics verilerini güncelle
    updateAnalyticsFromSessions();
  } catch (error) {
    console.error('Oyun oturumu kaydetme hatası:', error);
  }
};

// Sayfa görüntüleme kaydet
export const recordPageView = (pageId: string, userId: string, duration: number = 0): void => {
  if (typeof window === 'undefined') return;

  try {
    const views = getPageViews();
    const newView: PageView = {
      pageId,
      userId,
      timestamp: new Date().toISOString(),
      duration
    };
    
    views.push(newView);
    localStorage.setItem('pageViews', JSON.stringify(views));
    
    // Analytics verilerini güncelle
    updateAnalyticsFromViews();
  } catch (error) {
    console.error('Sayfa görüntüleme kaydetme hatası:', error);
  }
};

// Oyun oturumlarını al
export const getGameSessions = (): GameSession[] => {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem('gameSessions');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Oyun oturumları yükleme hatası:', error);
    return [];
  }
};

// Sayfa görüntülemelerini al
export const getPageViews = (): PageView[] => {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem('pageViews');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Sayfa görüntülemeleri yükleme hatası:', error);
    return [];
  }
};

// Kullanıcı sayısını al
export const getTotalUsers = (): number => {
  if (typeof window === 'undefined') return 0;

  try {
    const users = localStorage.getItem('users');
    if (users) {
      return JSON.parse(users).length;
    }
  } catch (error) {
    console.error('Kullanıcı sayısı alma hatası:', error);
  }

  return 0;
};

// Oyun oturumlarından analytics güncelle
const updateAnalyticsFromSessions = (): void => {
  const sessions = getGameSessions();
  const users = getTotalUsers();
  const views = getPageViews();
  
  // Toplam oyun sayısı
  const totalGamesPlayed = sessions.length;
  
  // Ortalama skor
  const averageScore = sessions.length > 0 
    ? Math.round(sessions.reduce((sum, session) => sum + session.score, 0) / sessions.length)
    : 0;
  
  // En çok oynanan oyunlar
  const gameStats = sessions.reduce((acc, session) => {
    const existing = acc.find(g => g.gameId === session.gameId);
    if (existing) {
      existing.plays++;
      existing.totalScore += session.score;
      existing.avgScore = Math.round(existing.totalScore / existing.plays);
    } else {
      acc.push({
        gameId: session.gameId,
        name: getGameName(session.gameId),
        plays: 1,
        totalScore: session.score,
        avgScore: session.score
      });
    }
    return acc;
  }, [] as Array<{gameId: string; name: string; plays: number; totalScore: number; avgScore: number}>);
  
  const mostPlayedGames = gameStats
    .sort((a, b) => b.plays - a.plays)
    .slice(0, 5)
    .map(g => ({
      gameId: g.gameId,
      name: g.name,
      plays: g.plays,
      avgScore: g.avgScore
    }));
  
  // Kitap istatistikleri
  const bookStats = sessions.reduce((acc, session) => {
    const existing = acc.find(b => b.bookId === session.bookId);
    if (existing) {
      existing.gamesPlayed++;
    } else {
      acc.push({
        bookId: session.bookId,
        title: getBookTitle(session.bookId),
        views: 0,
        gamesPlayed: 1
      });
    }
    return acc;
  }, [] as Array<{bookId: string; title: string; views: number; gamesPlayed: number}>);
  
  // Sayfa görüntülemelerini kitap istatistiklerine ekle
  views.forEach(view => {
    const bookId = getBookIdFromPageId(view.pageId);
    if (bookId) {
      const bookStat = bookStats.find(b => b.bookId === bookId);
      if (bookStat) {
        bookStat.views++;
      } else {
        bookStats.push({
          bookId,
          title: getBookTitle(bookId),
          views: 1,
          gamesPlayed: 0
        });
      }
    }
  });
  
  const mostPopularBooks = bookStats
    .sort((a, b) => (b.views + b.gamesPlayed) - (a.views + a.gamesPlayed))
    .slice(0, 5);
  
  // Kullanıcı büyümesi (son 6 ay)
  const userGrowth = generateUserGrowth();
  
  // Kategori istatistikleri
  const categoryStats = generateCategoryStats();
  
  const analyticsData: AnalyticsData = {
    totalUsers: users,
    totalGamesPlayed,
    totalViews: views.length,
    averageScore,
    mostPopularBooks,
    mostPlayedGames,
    userGrowth,
    categoryStats
  };
  
  saveAnalyticsData(analyticsData);
};

// Sayfa görüntülemelerinden analytics güncelle
const updateAnalyticsFromViews = (): void => {
  updateAnalyticsFromSessions(); // Aynı fonksiyonu kullan
};

// Varsayılan analytics verileri
const getDefaultAnalytics = (): AnalyticsData => ({
  totalUsers: 0,
  totalGamesPlayed: 0,
  totalViews: 0,
  averageScore: 0,
  mostPopularBooks: [],
  mostPlayedGames: [],
  userGrowth: [],
  categoryStats: []
});

// Yardımcı fonksiyonlar
const getGameName = (gameId: string): string => {
  const gameNames: { [key: string]: string } = {
    'kurt-vs-koyunlar': 'Kurt vs Koyunlar',
    'hirsiz-polis': 'Hırsız Polis',
    'ruzgar-yonu': 'Rüzgar Yönü',
    'firlayan-balon': 'Fırlayan Balon',
    'su-gemisi': 'Su Gemisi',
    'asma-kopru': 'Asma Köprü',
    'sirt-cantasi': 'Sırt Çantası',
    'tatil-haritasi': 'Tatil Haritası',
    'kelime-eslestirme': 'Kelime Eşleştirme'
  };
  return gameNames[gameId] || gameId;
};

const getBookTitle = (bookId: string): string => {
  const bookTitles: { [key: string]: string } = {
    'hava-olaylari': 'Hava Olayları',
    'benim-kucuk-deneylerim': 'Benim Küçük Deneylerim',
    'oyunlarla-satranc': 'Oyunlarla Satranç',
    'tatilde-50-macera': 'Tatilde 50 Macera',
    'atalarimizdan-dersler': 'Atalarımızdan Dersler'
  };
  return bookTitles[bookId] || bookId;
};

const getBookIdFromPageId = (pageId: string): string | null => {
  if (pageId.startsWith('/kitaplar/')) {
    return pageId.replace('/kitaplar/', '');
  }
  if (pageId.startsWith('/oyunlar/')) {
    const gameId = pageId.replace('/oyunlar/', '');
    const gameToBookMap: { [key: string]: string } = {
      'kurt-vs-koyunlar': 'benim-kucuk-deneylerim',
      'hirsiz-polis': 'benim-kucuk-deneylerim',
      'ruzgar-yonu': 'hava-olaylari',
      'firlayan-balon': 'benim-kucuk-deneylerim',
      'su-gemisi': 'benim-kucuk-deneylerim',
      'asma-kopru': 'benim-kucuk-deneylerim',
      'sirt-cantasi': 'tatilde-50-macera',
      'tatil-haritasi': 'tatilde-50-macera',
      'kelime-eslestirme': 'atalarimizdan-dersler'
    };
    return gameToBookMap[gameId] || null;
  }
  return null;
};

const generateUserGrowth = () => {
  const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'];
  return months.map(month => ({
    month,
    users: Math.floor(Math.random() * 50) + 20
  }));
};

const generateCategoryStats = () => {
  const categories = [
    { category: 'Bilim', users: 0, percentage: 0 },
    { category: 'Eğitim', users: 0, percentage: 0 },
    { category: 'Macera', users: 0, percentage: 0 },
    { category: 'Satranç', users: 0, percentage: 0 },
    { category: 'Tarih', users: 0, percentage: 0 },
    { category: 'Fizik', users: 0, percentage: 0 }
  ];
  
  const total = categories.reduce((sum, cat) => sum + cat.users, 0);
  return categories.map(cat => ({
    ...cat,
    percentage: total > 0 ? Math.round((cat.users / total) * 100) : 0
  }));
};
