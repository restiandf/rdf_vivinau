-- Normalisasi order_index per kategori (jalankan sekali jika data lama semua 0)
-- Celebrity dan portfolio masing-masing: 10, 20, 30, ...

WITH ranked AS (
  SELECT
    id,
    ROW_NUMBER() OVER (
      PARTITION BY category
      ORDER BY COALESCE(order_index, 0) ASC, created_at ASC
    ) AS rn
  FROM public.portfolio
)
UPDATE public.portfolio p
SET order_index = ranked.rn * 10
FROM ranked
WHERE p.id = ranked.id;
