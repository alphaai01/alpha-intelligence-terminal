import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Client for browser/server-side queries
export const supabase: SupabaseClient<Database> | null =
  supabaseUrl && supabaseAnonKey
    ? createClient<Database>(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      })
    : null

// Admin client for server-side operations (only use in server components/routes)
export const supabaseAdmin: SupabaseClient<Database> | null =
  supabaseUrl && (supabaseServiceRoleKey || supabaseAnonKey)
    ? createClient<Database>(
        supabaseUrl,
        supabaseServiceRoleKey || supabaseAnonKey,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false,
          },
        }
      )
    : null

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          role: 'admin' | 'user' | 'viewer'
          plan: 'free' | 'pro' | 'enterprise'
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          role?: 'admin' | 'user' | 'viewer'
          plan?: 'free' | 'pro' | 'enterprise'
        }
        Update: {
          email?: string
          name?: string | null
          role?: 'admin' | 'user' | 'viewer'
          plan?: 'free' | 'pro' | 'enterprise'
        }
      }
      signals: {
        Row: {
          id: string
          ticker: string
          name: string
          direction: 'BUY' | 'SELL' | 'HOLD'
          confidence: number
          asset_class: string
          current_price: number
          change_percent: number
          entry: number
          stop_loss: number
          target: number
          risk_reward: number
          triggering_event: string
          tags: string[]
          is_active: boolean
          created_at: string
        }
        Insert: {
          ticker: string
          name: string
          direction: 'BUY' | 'SELL' | 'HOLD'
          confidence: number
          asset_class: string
          current_price: number
          entry: number
          stop_loss: number
          target: number
          triggering_event: string
        }
        Update: {
          ticker?: string
          direction?: 'BUY' | 'SELL' | 'HOLD'
          confidence?: number
          is_active?: boolean
        }
      }
      leads: {
        Row: {
          id: string
          email: string
          name: string | null
          phone: string | null
          source: string
          status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
          created_at: string
        }
        Insert: {
          email: string
          name?: string | null
          source: string
        }
        Update: {
          status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
        }
      }
      contacts: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          message: string
          created_at: string
        }
        Insert: {
          name: string
          email: string
          message: string
        }
        Update: Record<string, never>
      }
      faqs: {
        Row: {
          id: string
          question: string
          answer: string
          order_num: number
          created_at: string
        }
        Insert: {
          question: string
          answer: string
          order_num: number
        }
        Update: {
          question?: string
          answer?: string
          order_num?: number
        }
      }
      testimonials: {
        Row: {
          id: string
          quote: string
          name: string
          title: string
          company: string
          rating: number
          created_at: string
        }
        Insert: {
          quote: string
          name: string
          title: string
          company: string
          rating: number
        }
        Update: {
          quote?: string
          name?: string
          rating?: number
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
