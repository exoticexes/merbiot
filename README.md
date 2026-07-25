# merbiot — minimal Next.js scaffold

Bu repo merbiot için temel MVP iskeletini içerir: public profil sayfası (slug), API stubları ve sade stil.

Bu repoyi yerel çalıştırmak için:

1. Node.js 18+ yükleyin
2. npm install
3. .env.local oluşturun (opsiyonel) ve NEXT_PUBLIC_BASE_URL ayarlayın (ör: http://localhost:3000)
4. npm run dev

Notlar
- Auth (e-posta magic link) ve veritabanı bağlaması henüz uygulanmadı. pages/api/profiles/[slug].js örnek veriyi döner. Bunu Postgres/Supabase gibi bir DB ile bağlamalıyız.
- Dosya yükleme (storage) için S3 veya Supabase Storage entegre edilecek.
- Bu proje ücretsiz kalacak ve her profil sayfasında küçük "creator by merbiot" yazısı yer alacaktır.

Geliştirme önerisi
- Supabase kullanarak Auth + Postgres + Storage hızlıca entegre edilebilir.
- NextAuth (email magic link) da kolay bir alternatiftir.

Deploy
- Vercel'e deploy etmek en kolay yöntemdir: repo'yu Vercel ile bağlayın ve env değişkenlerini ayarlayın. NEXT_PUBLIC_BASE_URL üretimde otomatik ayarlanabilir.
