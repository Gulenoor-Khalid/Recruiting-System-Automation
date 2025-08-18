import { createClient } from '@supabase/supabase-js'

// For Lovable's native Supabase integration, these are automatically provided
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      candidates: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          email: string
          experience: string
          skills: string[]
          interests: string[]
          goals: string
          availability: string
          pitch_text: string
          pitch_recording_url: string | null
          is_complete: boolean
          generated_profile: any | null
          profile_generated_at: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          email: string
          experience: string
          skills: string[]
          interests: string[]
          goals: string
          availability: string
          pitch_text: string
          pitch_recording_url?: string | null
          is_complete?: boolean
          generated_profile?: any | null
          profile_generated_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          email?: string
          experience?: string
          skills?: string[]
          interests?: string[]
          goals?: string
          availability?: string
          pitch_text?: string
          pitch_recording_url?: string | null
          is_complete?: boolean
          generated_profile?: any | null
          profile_generated_at?: string | null
        }
      }
    }
  }
}