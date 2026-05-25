-- ============================================================
-- Tabel founders — Card Founder di halaman utama
-- Jalankan di Supabase: SQL Editor → New query → Run
-- ============================================================

CREATE TABLE IF NOT EXISTS public.founders (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  description   TEXT,
  image_url     TEXT,
  facebook_url  TEXT,
  instagram_url TEXT,
  twitter_url   TEXT,
  linkedin_url  TEXT,
  is_active     BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index: ambil founder aktif dengan cepat
CREATE INDEX IF NOT EXISTS founders_is_active_idx ON public.founders (is_active);

-- Row Level Security
ALTER TABLE public.founders ENABLE ROW LEVEL SECURITY;

-- Semua orang boleh baca founder yang aktif (halaman publik)
CREATE POLICY "founders_select_public"
  ON public.founders
  FOR SELECT
  USING (is_active = true);

-- Admin panel pakai anon key (passcode lokal), sama seperti tabel portfolio
CREATE POLICY "founders_insert_anon"
  ON public.founders
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "founders_update_anon"
  ON public.founders
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "founders_delete_anon"
  ON public.founders
  FOR DELETE
  TO anon, authenticated
  USING (true);

-- Admin perlu baca semua baris saat edit (bukan hanya is_active)
CREATE POLICY "founders_select_admin"
  ON public.founders
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Trigger: perbarui updated_at otomatis
CREATE OR REPLACE FUNCTION public.set_founders_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS founders_updated_at ON public.founders;
CREATE TRIGGER founders_updated_at
  BEFORE UPDATE ON public.founders
  FOR EACH ROW
  EXECUTE FUNCTION public.set_founders_updated_at();

-- ============================================================
-- Data contoh (sesuaikan URL gambar & link sosmed Anda)
-- ============================================================
INSERT INTO public.founders (
  name,
  description,
  image_url,
  facebook_url,
  instagram_url,
  twitter_url,
  linkedin_url,
  is_active
) VALUES (
  'Vivi Nau',
  'Professional makeup artist dengan pengalaman di wedding, wisuda, dan sesi foto. Passion saya adalah membantu setiap klien tampil percaya diri di hari spesialnya.',
  'assets/images/logo.png',
  'https://facebook.com/',
  'https://instagram.com/',
  'https://twitter.com/',
  'https://linkedin.com/',
  true
);

-- ============================================================
-- Query yang dipakai di website (script.js)
-- ============================================================
-- SELECT *
-- FROM public.founders
-- WHERE is_active = true
-- ORDER BY created_at DESC
-- LIMIT 1;
