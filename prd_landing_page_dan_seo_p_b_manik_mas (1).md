<!-- ... existing code ... -->
## 4. Sistem Desain UI/UX (Design System Specification)

* **Konsep Visual:** *Modern Sporty, High-Contrast, Energetic, Clean, Trustworthy*.

* **Framework CSS & Optimasi Lighthouse Performance (PENTING UNTUK ANTIGRAVITY):**
  * **Untuk Lingkungan Multi-File / Proyek Node.js atau Vite di Antigravity:** Gunakan **Tailwind CLI / PostCSS** yang dikompilasi menjadi file CSS statis terkompresi (`output.css` / `styles.css`) atau gunakan **Pure Modern CSS3 Variables & Utility Classes** agar **TIDAK** memunculkan peringatan `cdn.tailwindcss.com should not be used in production` di Console dan memastikan skor **Google Lighthouse Performance ≥ 95/100**.
  * **Untuk Single-File Prototype (`index.html`):** Pastikan pemuatan font dan ikon menggunakan teknik *non-render-blocking* (`media="print" onload="this.media='all'"`) serta menekan (*suppress*) warning pengembangan CDN agar tidak mengurangi skor audit *Best Practices*.

* **Skema Warna (Color Palette):**
<!-- ... existing code ... -->
## 8. Prompt Master untuk Dieksekusi di Antigravity (Gemini Argon)

> **CARA PAKAI:** Salin seluruh isi dokumen PRD ini atau blok instruksi di bawah ini ke dalam **Antigravity (Gemini Argon)** untuk langsung menghasilkan kode lengkapnya.

```
Bertindaklah sebagai Senior Full-Stack Developer, UI/UX Designer, dan Technical SEO Specialist.
Tugas Anda adalah mengimplementasikan seluruh spesifikasi pada dokumen PRD "GOR Bulu Tangkis P. B. Manik Mas" di atas menjadi kode aplikasi web Landing Page yang sangat modern, responsif, interaktif, dan 100% memenuhi standar SEO (Technical SEO, On-Page SEO, Local SEO, dan GEO).

Hasilkan output kode dengan ketentuan berikut:
1. Bangun menggunakan HTML5 semantik, Google Fonts ('Plus Jakarta Sans' & 'Inter'), serta Vanilla JavaScript yang modular.
   - CATATAN KRUSIAL PERFORMA LIGHTHOUSE: Jangan gunakan `<script src="https://cdn.tailwindcss.com"></script>` secara mentah di produksi karena akan memicu warning console dan menurunkan skor Lighthouse Performance. Sebagai gantinya, kompilasikan menjadi file CSS statis (`styles.css` / `output.css`) ATAU tuliskan arsitektur CSS modern yang sudah terkompilasi dan di-minify langsung agar skor Google Lighthouse Performance & SEO mencapai 98-100/100 tanpa warning console sedikit pun.
2. Di dalam `<head>`, wajib sertakan:
   - Meta Title, Meta Description, Meta Keywords, Author, Robots, dan Canonical URL.
   - Open Graph (OG) Tags lengkap dan Twitter Card Tags.
   - Google Site Verification meta tag placeholder & Google Analytics 4 (gtag.js) script.
   - Dua blok JSON-LD Schema.org yang valid: `SportsActivityLocation` dan `FAQPage` sesuai data dummy P. B. Manik Mas.
3. Di dalam `<body>`, bangun seluruh seksi secara berurutan dan kaya visual:
   - Sticky Navbar dengan indikator "Admin CP Online" dan mobile hamburger menu.
   - Hero Section berdampak tinggi dengan gambar background lapangan badminton, H1 kaya kata kunci, Dual CTA, dan 4 statistik kepercayaan.
   - Seksi Keunggulan & Tabel Spesifikasi Teknis GOR (untuk optimasi GEO / AI Search).
   - Seksi Galeri Foto Fasilitas menggunakan 6 foto Unsplash yang ditentukan di PRD, lengkap dengan filter kategori interaktif, modal Lightbox saat gambar diklik, atribut `alt` deskriptif, `width`/`height` eksplisit, dan `loading="lazy"`.
   - Seksi Harga Sewa Per Jam (Reguler Rp35.000, Prime Time Rp50.000, Member Rp340.000) dengan Banner Informasi bahwa pengecekan slot jadwal dilakukan melalui CP, ditambah fitur "Kalkulator Estimasi Sewa & Generator Pesan WhatsApp Otomatis".
   - Seksi 3 Langkah Cara Cek Jadwal & Booking via CP.
   - Seksi Testimoni Komunitas & Tombol Share Lokasi ke Grup WA.
   - Seksi Lokasi (NAP Konsisten), Tabel Jam Operasional, dan Embedded Google Maps.
   - Seksi FAQ Interaktif (Accordion).
   - Floating WhatsApp CP Button di kanan bawah.
   - Panel Interaktif "📊 Demo KPI & SEO Telemetry" (bisa dibuka/tutup untuk keperluan demo tugas akhir mata kuliah Digital Marketing Technology) yang menampilkan penghitung Sesi, Jumlah Klik WA CP, persentase Conversion Rate (CTR), dan log event GA4 secara real-time.
4. Sertakan juga file `robots.txt` dan `sitemap.xml` sebagai kelengkapan artefak Technical SEO.

```