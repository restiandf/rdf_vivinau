-- Policy agar admin panel (anon key) bisa UPDATE urutan portfolio
-- Jalankan di Supabase → SQL Editor jika tombol ▲▼ tidak menyimpan ke database

ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "portfolio_update_anon" ON public.portfolio;
CREATE POLICY "portfolio_update_anon"
  ON public.portfolio
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Opsional: pastikan insert/delete juga untuk anon (jika belum ada)
DROP POLICY IF EXISTS "portfolio_insert_anon" ON public.portfolio;
CREATE POLICY "portfolio_insert_anon"
  ON public.portfolio
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "portfolio_delete_anon" ON public.portfolio;
CREATE POLICY "portfolio_delete_anon"
  ON public.portfolio
  FOR DELETE
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "portfolio_select_anon" ON public.portfolio;
CREATE POLICY "portfolio_select_anon"
  ON public.portfolio
  FOR SELECT
  TO anon, authenticated
  USING (true);
