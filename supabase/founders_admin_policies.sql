-- Jalankan jika tabel founders sudah dibuat dengan policy lama (authenticated only)
-- Supabase SQL Editor → Run

DROP POLICY IF EXISTS "founders_insert_authenticated" ON public.founders;
DROP POLICY IF EXISTS "founders_update_authenticated" ON public.founders;
DROP POLICY IF EXISTS "founders_delete_authenticated" ON public.founders;

CREATE POLICY "founders_insert_anon"
  ON public.founders FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "founders_update_anon"
  ON public.founders FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "founders_delete_anon"
  ON public.founders FOR DELETE TO anon, authenticated USING (true);

CREATE POLICY "founders_select_admin"
  ON public.founders FOR SELECT TO anon, authenticated USING (true);
