import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  // Note: in server runtime you may want to throw, but for client shared helper we'll not crash.
  console.warn('Supabase keys are not set. Fill .env.local from .env.example')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
