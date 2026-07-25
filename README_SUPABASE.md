## Supabase + Vercel kurulum rehberi

Aşağıdaki adımları takip ederek projeyi Supabase + Vercel üzerinde çalışır hale getirebilirsin.

1) Supabase projesi oluştur
- https://app.supabase.com adresine git ve ücretsiz bir proje oluştur.
- Project URL ve anon/public anahtarını kopyala.
- SQL Editor -> Yeni sorgu, repo kökünde bulunan `schema.sql` dosyasındaki tabloları çalıştır ve tabelaları oluştur.

2) Storage bucket oluştur
- Supabase panelinde Storage -> Create new bucket. Örnek isim: `merbiot-bucket`.
- Bucket'ı public olarak işaretle (veya erişim politikasını daha ileri seviyede yapılandır).

3) SMTP / E-posta ayarları
- Supabase Auth e-posta gönderimi için SMTP ayarlarını doldurmalısın (Settings -> Email). Alternatif olarak Supabase'in önerdiği e-posta sağlayıcılarını kullan.

4) Vercel'e deploy
- Vercel hesabı oluştur veya giriş yap.
- Yeni proje -> GitHub'dan `exoticexes/merbiot` repo'sunu bağla.
- Aşağıdaki Environment Variables ekle (project settings -> Environment Variables):
  - NEXT_PUBLIC_SUPABASE_URL = <supabase project url>
  - NEXT_PUBLIC_SUPABASE_ANON_KEY = <supabase anon key>
  - NEXT_PUBLIC_BASE_URL = https://<your-vercel-domain>.vercel.app
  - NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET = merbiot-bucket

- Deploy başlat. Deploy tamamlandığında site canlı olacaktır.

5) Test akışı
- Siteyi aç -> /auth/signin adresine git -> e-postanı gir -> Supabase tarafından gönderilen magic link ile giriş yap.
- Yönetim paneline gidin: /dashboard -> yeni profil oluşturun -> public profil: /p/<slug>

Notlar
- Bu repo temel MVP içindir. Daha fazla doğrulama, stil, XSS sanitizasyonu ve güvenlik politikaları eklenmelidir.
- Eğer Supabase SMTP ayarlarını yapılandırmazsan e-posta gönderimi çalışmayabilir; Supabase dashboardunda "Test email" göndermeyi deneyin.
