import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Veritabanı tabloları için tip tanımları
export interface User {
  id: string
  email: string
  name: string
  created_at: string
  last_active: string
  status: 'active' | 'inactive' | 'suspended'
  favorite_genres: string[]
}

export interface UserBook {
  id: string
  user_id: string
  book_id: string
  book_title: string
  activation_key: string
  activation_date: string
  last_played: string
  games_played: number
  total_play_time: number
  added_by: 'admin' | 'publisher' | 'user'
  expiry_date?: string
  is_active: boolean
}

export interface GameSession {
  id: string
  game_id: string
  book_id: string
  user_id: string
  score: number
  duration: number
  created_at: string
}

export interface PageView {
  id: string
  page_id: string
  user_id: string
  duration: number
  created_at: string
}

export interface BookKey {
  id: string
  book_id: string
  book_title: string
  key_hash: string
  is_active: boolean
  created_at: string
  used_at?: string
  used_by?: string
}

export interface AdminUser {
  id: string
  username: string
  email: string
  created_at: string
  last_login: string
  is_active: boolean
}
