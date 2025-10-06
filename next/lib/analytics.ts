// Veritabanı tabanlı analytics sistemi
import { gameSessionService, pageViewService } from './database'

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

// Oyun oturumu kaydet
export const recordGameSession = async (session: {
  gameId: string;
  bookId: string;
  userId: string;
  score: number;
  duration: number;
}): Promise<void> => {
  try {
    await gameSessionService.createSession({
      game_id: session.gameId,
      book_id: session.bookId,
      user_id: session.userId,
      score: session.score,
      duration: session.duration
    });
  } catch (error) {
    console.error('Oyun oturumu kaydetme hatası:', error);
  }
};

// Sayfa görüntüleme kaydet
export const recordPageView = async (pageId: string, userId: string, duration: number = 0): Promise<void> => {
  try {
    await pageViewService.createView({
      page_id: pageId,
      user_id: userId,
      duration
    });
  } catch (error) {
    console.error('Sayfa görüntüleme kaydetme hatası:', error);
  }
};

// Analytics verilerini getir
export const getAnalyticsData = async (): Promise<AnalyticsData> => {
  try {
    const [analytics, totalViews] = await Promise.all([
      gameSessionService.getAnalytics(),
      pageViewService.getTotalViews()
    ]);

    return {
      totalUsers: 0, // Bu veri kullanıcı tablosundan gelecek
      totalGamesPlayed: analytics.totalSessions,
      totalViews,
      averageScore: analytics.averageScore,
      mostPopularBooks: analytics.mostPopularBooks,
      mostPlayedGames: analytics.mostPlayedGames,
      userGrowth: generateUserGrowth(),
      categoryStats: generateCategoryStats()
    };
  } catch (error) {
    console.error('Analytics veri alma hatası:', error);
    return getDefaultAnalytics();
  }
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

// Kullanıcı büyümesi (örnek veri)
const generateUserGrowth = () => {
  const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'];
  return months.map(month => ({
    month,
    users: Math.floor(Math.random() * 50) + 20
  }));
};

// Kategori istatistikleri (örnek veri)
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
