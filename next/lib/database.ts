import { supabase, User, UserBook, GameSession, PageView, BookKey, AdminUser } from './supabase'

// Kullanıcı işlemleri
export const userService = {
  // Tüm kullanıcıları getir
  async getAllUsers(): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Kullanıcı oluştur
  async createUser(user: Omit<User, 'id' | 'created_at'>): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .insert([{ ...user, created_at: new Date().toISOString() }])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Kullanıcı güncelle
  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Kullanıcı sil
  async deleteUser(id: string): Promise<void> {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Kullanıcı kitap işlemleri
export const userBookService = {
  // Kullanıcının kitaplarını getir
  async getUserBooks(userId: string): Promise<UserBook[]> {
    const { data, error } = await supabase
      .from('user_books')
      .select('*')
      .eq('user_id', userId)
      .order('activation_date', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Kullanıcıya kitap ekle
  async addUserBook(userBook: Omit<UserBook, 'id'>): Promise<UserBook> {
    const { data, error } = await supabase
      .from('user_books')
      .insert([userBook])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Kullanıcıdan kitap kaldır
  async removeUserBook(id: string): Promise<void> {
    const { error } = await supabase
      .from('user_books')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Kullanıcı kitap güncelle
  async updateUserBook(id: string, updates: Partial<UserBook>): Promise<UserBook> {
    const { data, error } = await supabase
      .from('user_books')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

// Oyun oturumu işlemleri
export const gameSessionService = {
  // Oyun oturumu kaydet
  async createSession(session: Omit<GameSession, 'id' | 'created_at'>): Promise<GameSession> {
    const { data, error } = await supabase
      .from('game_sessions')
      .insert([{ ...session, created_at: new Date().toISOString() }])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Oyun oturumlarını getir
  async getSessions(filters?: {
    userId?: string
    gameId?: string
    bookId?: string
    limit?: number
  }): Promise<GameSession[]> {
    let query = supabase
      .from('game_sessions')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (filters?.userId) query = query.eq('user_id', filters.userId)
    if (filters?.gameId) query = query.eq('game_id', filters.gameId)
    if (filters?.bookId) query = query.eq('book_id', filters.bookId)
    if (filters?.limit) query = query.limit(filters.limit)
    
    const { data, error } = await query
    
    if (error) throw error
    return data || []
  },

  // Analytics verileri
  async getAnalytics(): Promise<{
    totalSessions: number
    averageScore: number
    mostPlayedGames: Array<{ gameId: string; name: string; plays: number; avgScore: number }>
    mostPopularBooks: Array<{ bookId: string; title: string; views: number; gamesPlayed: number }>
  }> {
    const { data: sessions, error } = await supabase
      .from('game_sessions')
      .select('*')
    
    if (error) throw error
    
    const totalSessions = sessions?.length || 0
    const averageScore = totalSessions > 0 
      ? Math.round(sessions!.reduce((sum, s) => sum + s.score, 0) / totalSessions)
      : 0
    
    // En çok oynanan oyunlar
    const gameStats = sessions?.reduce((acc, session) => {
      const existing = acc.find(g => g.gameId === session.game_id)
      if (existing) {
        existing.plays++
        existing.totalScore += session.score
        existing.avgScore = Math.round(existing.totalScore / existing.plays)
      } else {
        acc.push({
          gameId: session.game_id,
          name: getGameName(session.game_id),
          plays: 1,
          totalScore: session.score,
          avgScore: session.score
        })
      }
      return acc
    }, [] as Array<{gameId: string; name: string; plays: number; totalScore: number; avgScore: number}>) || []
    
    const mostPlayedGames = gameStats
      .sort((a, b) => b.plays - a.plays)
      .slice(0, 5)
      .map(g => ({
        gameId: g.gameId,
        name: g.name,
        plays: g.plays,
        avgScore: g.avgScore
      }))
    
    // En popüler kitaplar
    const bookStats = sessions?.reduce((acc, session) => {
      const existing = acc.find(b => b.bookId === session.book_id)
      if (existing) {
        existing.gamesPlayed++
      } else {
        acc.push({
          bookId: session.book_id,
          title: getBookTitle(session.book_id),
          views: 0,
          gamesPlayed: 1
        })
      }
      return acc
    }, [] as Array<{bookId: string; title: string; views: number; gamesPlayed: number}>) || []
    
    const mostPopularBooks = bookStats
      .sort((a, b) => (b.views + b.gamesPlayed) - (a.views + a.gamesPlayed))
      .slice(0, 5)
    
    return {
      totalSessions,
      averageScore,
      mostPlayedGames,
      mostPopularBooks
    }
  }
}

// Sayfa görüntüleme işlemleri
export const pageViewService = {
  // Sayfa görüntüleme kaydet
  async createView(view: Omit<PageView, 'id' | 'created_at'>): Promise<PageView> {
    const { data, error } = await supabase
      .from('page_views')
      .insert([{ ...view, created_at: new Date().toISOString() }])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Sayfa görüntülemelerini getir
  async getViews(filters?: {
    userId?: string
    pageId?: string
    limit?: number
  }): Promise<PageView[]> {
    let query = supabase
      .from('page_views')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (filters?.userId) query = query.eq('user_id', filters.userId)
    if (filters?.pageId) query = query.eq('page_id', filters.pageId)
    if (filters?.limit) query = query.limit(filters.limit)
    
    const { data, error } = await query
    
    if (error) throw error
    return data || []
  },

  // Toplam görüntüleme sayısı
  async getTotalViews(): Promise<number> {
    const { count, error } = await supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true })
    
    if (error) throw error
    return count || 0
  }
}

// Key işlemleri
export const keyService = {
  // Key oluştur
  async createKeys(bookId: string, bookTitle: string, count: number): Promise<BookKey[]> {
    const keys: Omit<BookKey, 'id' | 'created_at'>[] = []
    
    for (let i = 0; i < count; i++) {
      const keyHash = generateKeyHash()
      keys.push({
        book_id: bookId,
        book_title: bookTitle,
        key_hash: keyHash,
        is_active: true
      })
    }
    
    const { data, error } = await supabase
      .from('book_keys')
      .insert(keys.map(key => ({ ...key, created_at: new Date().toISOString() })))
      .select()
    
    if (error) throw error
    return data || []
  },

  // Key doğrula
  async verifyKey(keyHash: string): Promise<{ valid: boolean; bookId?: string; bookTitle?: string }> {
    const { data, error } = await supabase
      .from('book_keys')
      .select('*')
      .eq('key_hash', keyHash)
      .eq('is_active', true)
      .is('used_at', null)
      .single()
    
    if (error || !data) {
      return { valid: false }
    }
    
    return {
      valid: true,
      bookId: data.book_id,
      bookTitle: data.book_title
    }
  },

  // Key kullan
  async useKey(keyHash: string, userId: string): Promise<boolean> {
    const { error } = await supabase
      .from('book_keys')
      .update({
        used_at: new Date().toISOString(),
        used_by: userId
      })
      .eq('key_hash', keyHash)
      .is('used_at', null)
    
    return !error
  },

  // Tüm keyleri getir
  async getAllKeys(): Promise<BookKey[]> {
    const { data, error } = await supabase
      .from('book_keys')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  }
}

// Admin işlemleri
export const adminService = {
  // Admin giriş
  async login(username: string, password: string, adminCode: string): Promise<{ success: boolean; token?: string }> {
    // Bu gerçek uygulamada hash'lenmiş şifrelerle çalışmalı
    if (username === 'admin' && password === 'odtu2024' && adminCode === 'ODTU2024ADMIN') {
      const token = btoa(`${username}:${Date.now()}`)
      return { success: true, token }
    }
    return { success: false }
  },

  // Admin doğrula
  async verifyAdmin(token: string): Promise<boolean> {
    try {
      const [username, timestamp] = atob(token).split(':')
      const tokenTime = new Date(parseInt(timestamp)).getTime()
      const hoursDiff = (Date.now() - tokenTime) / (1000 * 60 * 60)
      
      return username === 'admin' && hoursDiff < 24
    } catch {
      return false
    }
  }
}

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
  }
  return gameNames[gameId] || gameId
}

const getBookTitle = (bookId: string): string => {
  const bookTitles: { [key: string]: string } = {
    'hava-olaylari': 'Hava Olayları',
    'benim-kucuk-deneylerim': 'Benim Küçük Deneylerim',
    'oyunlarla-satranc': 'Oyunlarla Satranç',
    'tatilde-50-macera': 'Tatilde 50 Macera',
    'atalarimizdan-dersler': 'Atalarımızdan Dersler'
  }
  return bookTitles[bookId] || bookId
}

const generateKeyHash = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 16; i++) {
    if (i > 0 && i % 4 === 0) {
      result += '-'
    }
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
