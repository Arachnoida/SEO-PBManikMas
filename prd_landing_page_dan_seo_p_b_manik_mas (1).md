# PRD — Landing Page & SEO GOR Bulu Tangkis P. B. Manik Mas

Versi: 2.0 (disesuaikan dengan kondisi situs per 22 November 2026)
Hosting: GitHub Pages — https://kinkareem.github.io/SEO-PBManikMas/

## 1. Tujuan

1. Membuat satu landing page statis yang membantu calon pemain menemukan GOR, melihat tarif dan fasilitas, lalu menghubungi admin lewat WhatsApp.
2. Membuat GOR muncul di pencarian lokal dengan kata kunci seperti "sewa lapangan badminton Denpasar".
3. Menjadi bahan demonstrasi Digital Marketing Technology: pengukuran KPI (sesi, klik WhatsApp, conversion rate).

Konversi utama: klik tombol WhatsApp (event `click_whatsapp_cp`).

## 2. Data Bisnis (sumber kebenaran)

| Item | Nilai |
|---|---|
| Nama | GOR Bulu Tangkis P. B. Manik Mas (di Google Maps: PB. Manik Mas — Lapangan Tulip) |
| Alamat | Jl. Tulip Gg. III No. 2, Sumerta Kaja, Kec. Denpasar Timur, Kota Denpasar, Bali 80236 |
| Google Maps | https://maps.app.goo.gl/f3XtGzDtJFnp3AXQ9 |
| Jumlah lapangan | 2 (Court 1 dan Court 2), karpet vinyl |
| Tarif | Flat Rp30.000 per jam per lapangan, semua hari dan jam |
| Jam buka | Setiap hari 07.00–23.00 WITA |
| Kontak | WhatsApp admin +62 895-7016-09699 (perlu diverifikasi) |
| Fasilitas | Ruang ganti, loker bernomor, kamar mandi, mushola, Wi-Fi, parkir, sewa raket dan jual kok, kantin snack dan minuman |
| Tidak tersedia | Komunitas/mabar terjadwal, paket member |

Aturan: semua teks di situs, schema, dan kalkulator harus mengikuti tabel ini.

## 3. Pengguna dan Kebutuhan

- Pemain atau kelompok yang ingin tahu tarif, lokasi, dan ketersediaan lapangan.
- Kebutuhan utama: informasi cepat di ponsel, rute ke lokasi, dan jalur booking tanpa aplikasi tambahan.

## 4. Fitur

| Fitur | Keterangan | Status |
|---|---|---|
| Navbar sticky + menu mobile | Navigasi ke tiap seksi | Selesai |
| Hero | H1, 3 tombol aksi, kartu tarif, 4 statistik | Selesai (statistik parkir dan rating masih dummy) |
| Galeri | 5 foto, filter Lapangan/Fasilitas, lightbox | Selesai (foto masih stok Unsplash) |
| Fasilitas dan spesifikasi | 4 kartu keunggulan, 6 tile spesifikasi | Selesai (angka spesifikasi perlu dicocokkan dengan kondisi asli) |
| Tarif dan kalkulator | Pilih 1 atau 2 lapangan, durasi 1–8 jam, tanggal, jam mulai; hitung total; buat pesan WhatsApp otomatis; salin pesan | Selesai |
| Cara booking | 3 langkah | Selesai |
| Testimoni dan share lokasi | Masih menyebut komunitas/mabar | Perlu dirapikan |
| Lokasi | NAP, tabel jam, Google Maps embed, tombol rute | Selesai |
| FAQ | Accordion, 6 pertanyaan, sinkron dengan JSON-LD | Selesai |
| Tombol WhatsApp mengambang | Kanan bawah | Selesai |
| Panel demo KPI | Sesi, klik WA, CTR, log event (lokal) | Selesai |
| Halaman 404 | `404.html`, noindex | Selesai |

## 5. Spesifikasi SEO

### Technical
- Satu halaman HTML5 semantik, bahasa `id`, viewport dan theme-color.
- Canonical: https://kinkareem.github.io/SEO-PBManikMas/
- `sitemap.xml` (dengan image sitemap) dan `robots.txt` (mengizinkan crawler mesin pencari dan AI).
- Catatan: project site GitHub Pages berada di subfolder, jadi `robots.txt` tidak dibaca crawler. Tanpa robots.txt, semua halaman boleh di-crawl. Sitemap dikirim manual lewat Search Console.
- Favicon: `favicon.ico`, `favicon.svg`, `apple-touch-icon.png`.
- Gambar OG: `image/og-image.jpg` (1200×630).

### On-page
- Title, description, keywords, robots, author.
- Satu H1, hierarki H2/H3 berurutan, alt text deskriptif, `width`/`height` eksplisit, `loading="lazy"` kecuali gambar hero.

### Local SEO
- NAP konsisten di seksi lokasi, footer, dan JSON-LD.
- JSON-LD `SportsActivityLocation` (alamat, jam buka, fasilitas, harga) dan `FAQPage`.
- Koordinat `geo` belum dimasukkan (menunggu koordinat resmi dari Google Maps).
- Google Business Profile: dibuat di luar kode, wajib untuk muncul di peta.

### Sosial
- Open Graph dan Twitter Card lengkap.

### GEO (mesin pencari AI)
- Jawaban singkat dan faktual di FAQ dan tabel spesifikasi.

## 6. Analitik

- GA4 dimuat hanya jika `GA_MEASUREMENT_ID` di `index.html` diisi ID asli. Selama masih `G-XXXXXXXXXX`, GA tidak aktif.
- `page_view` dikirim otomatis oleh `gtag('config')`.
- Event kustom: `click_whatsapp_cp` (dengan `cta_source`), `calculate_booking`, `copy_wa_draft`, `copy_location_invite`, `filter_gallery`, `open_lightbox`, `toggle_faq`, `view_pricing`.
- Event simulasi panel demo (`page_view`, `demo_reset`) tidak dikirim ke GA4.
- Tandai `click_whatsapp_cp` sebagai key event di GA4.

## 7. Desain

- Konsep: modern, sporty, kontras tinggi, bersih.
- Font: Plus Jakarta Sans (judul), Inter (isi).
- Warna: gelap #06130f, hijau utama #047857, aksen #a3e635, WhatsApp #15803d.
- CSS murni (tanpa CDN Tailwind), dikirim sebagai `styles.min.css`. `styles.css` adalah sumber, jadi setiap perubahan harus di-minify ulang.

## 8. Target Kinerja

- Lighthouse Performance ≥ 95, SEO 100, Best Practices dan Accessibility ≥ 95 (belum diukur).
- Font non-render-blocking, gambar hero di-preload.

## 9. Checklist yang Harus Dilakukan Pemilik

1. Pastikan file gambar OG tersimpan di `image/og-image.jpg` (atau sesuaikan nama di `index.html` dan `sitemap.xml`).
2. Buat akun Google Search Console (properti URL prefix), ganti kode di meta `google-site-verification`, lalu kirim sitemap.
3. Buat akun GA4, ambil Measurement ID, isi `GA_MEASUREMENT_ID`.
4. Buat Google Business Profile GOR.
5. Verifikasi nomor WhatsApp, koordinat, dan angka spesifikasi.
6. Ganti foto Unsplash dengan foto GOR asli.
7. Hapus data dummy: rating 4.9 dari 148 ulasan dan nama testimoni, atau ganti dengan data asli.

## 10. Rencana Lanjutan

- Rapikan testimoni dan seksi mabar agar tidak menyebut komunitas.
- Pecah menjadi beberapa halaman (tarif, fasilitas, lokasi) dan tambah artikel lokal.
- Pertimbangkan repositori `kinkareem.github.io` atau domain sendiri agar `robots.txt` dan sitemap berada di akar domain.
- Ukur Lighthouse dan optimalkan gambar (WebP/AVIF).