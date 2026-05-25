// ==================== SUPABASE CONFIGURATION ====================
// Ganti URL dengan URL Project Supabase Anda sendiri.
// Anda bisa mendapatkannya di menu: Project Settings -> API di dasbor Supabase.
const SUPABASE_URL = "https://mnhjanujskargmagkjzv.supabase.co"; 

// API Key (Anon Key) yang Anda berikan
const SUPABASE_KEY = "sb_publishable_Ft9_26jB0pvOxQkBs2KDJg_2bgNHVUm";

// Inisialisasi Supabase Client jika SDK dimuat
let supabaseClient = null;
if (typeof window !== 'undefined' && window.supabase) {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}
