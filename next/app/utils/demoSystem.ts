export interface DemoSession {
  bookId: string;
  startTime: number;
  duration: number; // milliseconds
  used: boolean;
  userId: string;
}

export const DEMO_DURATION = 60 * 1000; // 1 dakika

export const startDemoSession = (bookId: string, userId?: string): boolean => {
  if (typeof window === 'undefined') return false;
  
  const demoKey = `demo_${bookId}_${userId || 'anonymous'}`;
  const existing = localStorage.getItem(demoKey);
  
  if (existing) {
    const session: DemoSession = JSON.parse(existing);
    if (session.used) {
      console.log('Demo already used for this book by this user');
      return false; // Bu kullanıcı bu kitap için zaten demo kullanmış
    }
  }
  
  const session: DemoSession = {
    bookId,
    startTime: Date.now(),
    duration: DEMO_DURATION,
    used: false,
    userId: userId || 'anonymous'
  };
  
  localStorage.setItem(demoKey, JSON.stringify(session));
  console.log('Demo session started for book:', session);
  return true;
};

export const checkDemoSession = (bookId: string, userId?: string): { canPlay: boolean; timeLeft: number } => {
  if (typeof window === 'undefined') return { canPlay: false, timeLeft: 0 };
  
  const demoKey = `demo_${bookId}_${userId || 'anonymous'}`;
  const existing = localStorage.getItem(demoKey);
  
  if (!existing) {
    console.log('No demo session found for this book');
    return { canPlay: false, timeLeft: 0 };
  }
  
  const session: DemoSession = JSON.parse(existing);
  
  // Kullanıcı kontrolü
  if (userId && session.userId !== userId) {
    console.log('Demo session belongs to different user');
    return { canPlay: false, timeLeft: 0 };
  }
  
  if (session.used) {
    console.log('Demo session already used');
    return { canPlay: false, timeLeft: 0 };
  }
  
  const elapsed = Date.now() - session.startTime;
  const timeLeft = Math.max(0, session.duration - elapsed);
  
  if (timeLeft <= 0) {
    // Süre doldu, session'ı kullanılmış olarak işaretle
    session.used = true;
    localStorage.setItem(demoKey, JSON.stringify(session));
    console.log('Demo session expired');
    return { canPlay: false, timeLeft: 0 };
  }
  
  console.log('Demo session active for book, time left:', timeLeft);
  return { canPlay: true, timeLeft };
};

export const endDemoSession = (bookId: string, userId?: string): void => {
  if (typeof window === 'undefined') return;
  
  const demoKey = `demo_${bookId}_${userId || 'anonymous'}`;
  const existing = localStorage.getItem(demoKey);
  
  if (existing) {
    const session: DemoSession = JSON.parse(existing);
    session.used = true;
    localStorage.setItem(demoKey, JSON.stringify(session));
    console.log('Demo session ended for book');
  }
};

export const hasUsedDemo = (bookId: string, userId?: string): boolean => {
  if (typeof window === 'undefined') return false;
  
  const demoKey = `demo_${bookId}_${userId || 'anonymous'}`;
  const existing = localStorage.getItem(demoKey);
  
  if (!existing) return false;
  
  const session: DemoSession = JSON.parse(existing);
  return session.used;
};

export const clearAllDemoSessions = (): void => {
  if (typeof window === 'undefined') return;
  
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('demo_')) {
      localStorage.removeItem(key);
    }
  });
  console.log('All demo sessions cleared');
};

// Game access kontrolü
export interface GameAccess {
  canPlay: boolean;
  reason?: string;
  timeLeft?: number;
}

// Kitap demo kullanım durumu
export interface BookDemoUsage {
  used: boolean;
  timeLeft: number;
  bookId?: string;
  userId?: string;
}

export const checkGameAccess = (bookId: string, userId?: string): GameAccess => {
  if (typeof window === 'undefined') return { canPlay: false, reason: 'Client-side only' };
  
  // Kullanıcı giriş yapmamışsa
  if (!userId) {
    return { canPlay: false, reason: 'Giriş yapmalısınız' };
  }
  
  // Demo kontrolü
  const demoCheck = checkDemoSession(bookId, userId);
  if (demoCheck.canPlay) {
    return { canPlay: true, timeLeft: demoCheck.timeLeft };
  }
  
  // Demo kullanılmış mı kontrol et
  if (hasUsedDemo(bookId, userId)) {
    return { canPlay: false, reason: 'Demo hakkınız kullanılmış' };
  }
  
  return { canPlay: false, reason: 'Demo hakkınız yok' };
};

// Kitap demo durumu
export const getBookDemoStatus = (bookId: string, userId?: string): BookDemoUsage => {
  if (typeof window === 'undefined') return { used: false, timeLeft: 0, bookId, userId };
  
  const demoCheck = checkDemoSession(bookId, userId);
  const used = hasUsedDemo(bookId, userId);
  
  return {
    used,
    timeLeft: demoCheck.timeLeft,
    bookId,
    userId
  };
};

// Demo kullanımını kaydet
export const saveDemoUsage = (bookId: string, userId?: string): void => {
  if (typeof window === 'undefined') return;
  
  const demoKey = `demo_${bookId}_${userId || 'anonymous'}`;
  const existing = localStorage.getItem(demoKey);
  
  if (existing) {
    const session: DemoSession = JSON.parse(existing);
    session.used = true;
    localStorage.setItem(demoKey, JSON.stringify(session));
  }
};