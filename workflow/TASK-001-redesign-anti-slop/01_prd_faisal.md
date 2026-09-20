# PRD: Redesign UI Frontend Anti-Slop (Frogobox)
**Task ID:** `TASK-001`  
**Product Manager:** Faisal (`faisal_pm`)  
**Team:** Tim FE (Faisal, Angel, Fiqry, Sandra)  
**Status:** APPROVED / IN DEVELOPMENT  
**Date:** 2026-09-20  

---

## 1. Product Overview & User Stories

### Context & Problem Statement
Website resmi Frogobox (`frogobox.github.io`) saat ini mengadopsi sejumlah pola visual dan kode yang tergolong generic AI slop:
1. Penggunaan gradien biru-ke-ungu/teal di seluruh elemen teks dan background tanpa hierarki fungsional (R-01).
2. Badge capsule berbentuk kapsul mengambang dengan titik hijau berkedip (`animate-ping`) di atas headline (eyebrow pill) dan orbs blur radial mengambang di hero (R-09, R-13, R-19).
3. Ikon AI generik (sparkle, rocket) yang ditempelkan di CTA dan teks (R-04).
4. Grid kartu fitur dan layanan yang seragam (copy-paste feature cards) tanpa variasi ritme editorial (R-05, R-14).
5. Elemen kontrol atau tautan yang belum fungsional atau mengarah ke anchor kosong (`href="#"` pada footer dan kontak) (R-24, R-26).
6. Penggunaan karakter em dash (`—`) pada parsing judul di portfolio dan komentar kode (R-02).
7. Emoji di antarmuka tombol (seperti tombol toggle tema dengan ☀️ dan 🌙) (R-04 / emoji as decoration).

### Objective
Melakukan redesign menyeluruh pada antarmuka web Frogobox dengan menerapkan standar Anti-Slop (Mode: DURING), menghasilkan desain web studio rekayasa teknologi yang berkarakter, matang (*crafted by a designer*), autentik, aksesibel (WCAG AA), dan 100% fungsional tanpa gimmick AI.

### User Stories
- **Sebagai pengunjung potensial / calon mitra:** Saya ingin melihat kapabilitas rekayasa perangkat lunak Frogobox secara lugas, kredibel, dan profesional tanpa visual generik AI, sehingga timbul rasa percaya terhadap portofolio dan kualitas teknis studio.
- **Sebagai pengembang / klien:** Saya ingin menavigasi portofolio, proposal kemitraan, dan layanan Frogobox dengan navigasi yang responsif, cepat, mudah dibaca, serta semua tombol dan link berfungsi nyata.
- **Sebagai pengguna dengan preferensi aksesibilitas:** Saya ingin kontras teks memenuhi standar WCAG AA, navigasi keyboard berjalan mulus dengan indikator fokus yang jelas, serta dukungan mode gelap/terang yang teruji di seluruh komponen.

---

## 2. Acceptance Criteria (AC)

- **AC-01 (Anti-Slop Hard Gate: Copywriting & Content Integrity):**
  - Bebas dari em dash (`—`) di seluruh teks UI dan kode (R-02).
  - Tidak ada data/statistik atau testimoni palsu. Testimoni menampilkan kutipan riil dari proyek Frogobox yang sebenarnya (Inspeksi Palembang, Aqiqah Alyssa, Frogo SDK, dll.) (R-17, R-18, R-36).
  - Teks CTA spesifik dan kontekstual ("Konsultasi Proyek", "Lihat Studi Kasus", "Pelajari Proposal Kemitraan") tanpa buzzword klise seperti "Get Started", "Revolutionary", "AI Powered" (R-15, R-16).
- **AC-02 (Anti-Slop Visual & Color System):**
  - Dokumen `DESIGN.md` hadir di root workspace dan menjadi acuan utama (R-37).
  - Palet warna dibatasi maksimal 2-3 warna inti netral/slate + 1 warna aksen terarah (Frogobox Emerald `#10b981`), membuang gradien pelangi/ungu-biru acak (R-01, R-29).
  - Tidak ada background orbs blur mengambang, blueprint grid lines, atau gradien background halaman penuh (R-01, R-07, R-13).
  - Dosis glassmorphism maksimal 1-2 elemen (hanya sticky navbar), kartu dan modal berlatar solid dengan border berhierarki (R-10).
- **AC-03 (Anti-Slop Layout & Rhythm Dials):**
  - Menetapkan Dials Liveliness: **ENERGY 2 / RHYTHM 2 / MOTION 1** (R-05, R-37, Part 3 Liveliness Toolkit).
  - Layout Hero bersih tanpa pill badge berulang dan tanpa titik ping palsu.
  - Komposisi seksi bervariasi mengikuti ritme editorial (Services, Why Us, Portfolio showcase dengan studi kasus unggulan) (R-05, R-14).
- **AC-04 (Anti-Slop Decorative & Icon Hygiene):**
  - Membuang generic AI icons (sparkles, generic rockets). Menggunakan ikon SVG kontekstual yang relevan (R-04).
  - Membuang emoji di UI text dan toggle tema, digantikan oleh clean SVG icons untuk Sun & Moon (R-04).
  - Menghapus panah kecil (`→`) yang terpasang di semua tombol secara dekoratif (R-08).
- **AC-05 (Functional Completeness & Navigation):**
  - Tidak ada dead links (`href="#"`). Link alamat di kontak mengarah ke Google Maps Probolinggo yang valid, link Privacy Policy dan Terms of Service terhubung ke rute atau dokumen nyata (R-24, R-26).
  - Form kontak dan newsletter memiliki handling status yang jelas (loading, success, error) (R-26, R-27).
- **AC-06 (Accessibility & Mobile Resilience):**
  - Semua teks memenuhi standar kontras WCAG AA (minimal 4.5:1 untuk normal text, 3:1 untuk teks besar) (R-25).
  - Navigasi keyboard penuh (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`) dengan visible focus ring (`focus-visible:ring-2`) (R-32).
  - Layout mobile adaptif, bebas dari horizontal overflow di semua viewport (320px hingga 1920px), target sentuh minimal 44px (R-03).
- **AC-07 (Delivery Gate & Build Quality):**
  - Build `npm run build` lulus tanpa error dan tanpa warning.
  - Laporan verifikasi Delivery Gate (Block 1 - 4) terdokumentasi lengkap dan lolos 100% (R-35).
  - Kebijakan NO SUPPRESSION ditaati tanpa `@ts-ignore` atau `eslint-disable`.

---

## 3. Cross-Role Alignment Meeting Log

### Sandra (QA):
- **Question:** *"Di halaman Hero dan Portfolio sebelumnya ada partisi video YouTube latar belakang, teks gradien tebal, dan parsing judul dengan em dash `{title.split('—')[0].trim()}`. Apakah video background YouTube tetap dipertahankan atau berisiko menyebabkan layout shift dan performa mobile buruk? Dan bagaimana dengan tautan `href='#'` pada footer dan alamat kantor?"*
  - **Faisal (PM Decision):** Video YouTube dapat menjadi fallback showcase jika tersedia koneksi, tetapi Hero tidak boleh bergantung padanya untuk keterbacaan teks. Teks utama harus terbaca sempurna di atas latar solid slate/canvas dengan kontras tinggi tanpa mengandalkan teks gradien neon. Parsing string em dash HARUS dihilangkan dan diganti dengan pembersihan data json yang bersih tanpa em dash. Semua link `href='#'` dilarang keras: tautkan ke URL Google Maps Probolinggo nyata, dan buat halaman modal/halaman khusus untuk Kebijakan Privasi dari `PRIVACY-POLICY.md`.
  - **Fiqry (Frontend):** Siap. Saya akan refactor komponen Hero agar memiliki fondasi kontras independen dari video, menghapus em dash di `Portfolio.tsx`, serta mengarahkan link alamat ke `https://maps.google.com/?q=Probolinggo,+East+Java,+Indonesia` dan menghubungkan rute modal/popover kebijakan privasi.
  - **Sandra (QA):** *"Bagaimana dengan pengujian kontras warna WCAG AA pada teks sekunder abu-abu (`var(--text-secondary)`) di mode gelap dan terang?"*
  - **Faisal (PM Decision):** Angel wajib menetapkan rasio kontras warna minimal 4.5:1 di `DESIGN.md` untuk semua teks bodi di kedua tema (light & dark mode). Sandra berhak memblokir release jika ada teks abu-abu yang tidak memenuhi WCAG AA.

### Angel (UI/UX):
- **Question:** *"Mengapa website sebelumnya terasa sangat generic AI slop? Dan bagaimana tokens serta visual language baru akan menstrukturkannya?"*
  - **Angel's Explanation:** Desain sebelumnya menggabungkan hampir seluruh tell AI: teks gradien biru-ke-cyan pada heading, kapsul eyebrow dengan dot ping hijau berkedip di atas H1, floating blur orbs di latar belakang, ikon bintang/sparkle di CTA, tombol toggle tema menggunakan emoji ☀️/🌙, serta kartu layanan yang seragam tanpa variasi hirarki. Ini membuat situs terasa seperti template boilerplate AI instan.
  - **Fix:** Menghapus seluruh orbs blur dan teks gradien klise. Menetapkan satu palet studio terarah: Neutral Canvas (Off-white `#fafaf9` / Slate Deep `#090d16`), Slate Text (`#0f172a` / `#f8fafc`), dan aksen tunggal Frog Green / Emerald (`#10b981`). Radius dibakukan pada 10px-14px untuk kartu, 8px untuk tombol. Bayangan diganti dengan batas garis tegas bergradasi halus (*subtle border hierarchy*) dan elevasi fungsional.
  - **Angel's Specification:**
    - Typography: Font Sans Inter / Clean system geometry, hirarki ketat: H1 (40px-56px font-extrabold), H2 (28px-36px font-bold), Body (15px-16px leading-relaxed).
    - Color: Core 1: Dark Slate `#0b101b`, Core 2: Card Surface `#111827` (dark) & `#ffffff` (light), Accent: Emerald Studio `#10b981`.
    - Dials: ENERGY: 2 (Balanced), RHYTHM: 2 (Varied editorial showcase), MOTION: 1 (Calm interactive transitions).
  - **Angel's Rule:** Aksesori visual hanya boleh digunakan jika membawa makna fungsional. Dilarang menempatkan badge kapsul kosong di atas headline. Dilarang menggunakan ikon sparkle pada tombol aksi.

### Fiqry (Frontend):
- **Question:** *"Saya telah mengaudit file yang perlu dimigrasikan untuk membersihkan seluruh slop dan memastikan ketaatan Tailwind v4 & Next.js. Bagaimana rencana refactor-nya?"*
  - **Fiqry's Proposal:** Saya mengusulkan inventarisasi refactor lengkap pada:
    1. `src/app/globals.css`: Hapus keyframes `pulse-glow`, `float`, teks gradien biru-cyan, dan ganti dengan tema solid, token kontras tinggi WCAG AA, dan focus ring aksesibel.
    2. `src/components/Hero.tsx`: Hapus badge kapsul dengan ping dot, hapus blur orbs mengambang, hapus ikon sparkles, perbaiki hierarki CTA.
    3. `src/components/Services.tsx`: Variasikan komposisi kartu, hilangkan badge pill `whatWeDo` yang menduplikasi H2, berikan visual anchor yang tegas.
    4. `src/components/WhyUs.tsx`: Hilangkan pewarnaan pelangi 4-warna sembarangan, satukan dengan palet aksen studio terpadu.
    5. `src/components/Portfolio.tsx`: Hapus regex/string splitting em dash, hapus mockup bento bergaris grid dekoratif, ganti dengan preview kartu studi kasus yang elegan dan berbobot.
    6. `src/components/Testimonials.tsx`: Hapus badge pill, susun testimoni autentik klien/proyek Frogobox dengan tipografi bersih tanpa gradien avatar lingkaran pelangi acak.
    7. `src/components/CTA.tsx`: Hapus lingkaran konsentris dekoratif dan ikon roket klise, ganti dengan penawaran konsultasi proyek rekayasa yang lugas.
    8. `src/components/ContactForm.tsx`: Ganti link anchor mati alamat kantor dengan tautan Google Maps Probolinggo riil, bersihkan komentar em dash, lengkapi feedback validasi form.
    9. `src/components/Footer.tsx`: Ganti link `#` Privacy & Terms dengan tautan riil, perbaiki aksesibilitas tombol newsletter dengan label eksplisit.
    10. `src/components/ThemeToggle.tsx`: Ganti emoji dengan ikon SVG Sun dan Moon yang presisi dan aksesibel.
    11. `src/components/Icon.tsx`: Pastikan ikon SVG bersih, terstandardisasi, dan tanpa glyph generik AI.
  - **Faisal (PM Decision):** Disetujui sepenuhnya. Fiqry dapat segera mengeksekusi setelah Angel menyelesaikan `DESIGN.md` dan `02_design_angel.md`. Pastikan build lokal Next.js lulus 100% tanpa warning dan tanpa penekanan tipe (`@ts-ignore`).
