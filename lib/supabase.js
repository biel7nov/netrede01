import { createClient } from '@supabase/supabase-js'

// Tenta obter as variáveis dependendo do framework (Next.js vs Vite)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error("ERRO: As variáveis de ambiente do Supabase não estão definidas. Verifique o arquivo .env");
}

export const supabase = createClient(supabaseUrl, supabaseKey)