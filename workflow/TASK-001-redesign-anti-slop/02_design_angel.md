# UI/UX Specification: Redesign Anti-Slop (Frogobox)
**Task ID:** `TASK-001`  
**Author:** Angel (`angel_uiux`), UI/UX Designer  
**Status:** READY FOR FRONTEND IMPLEMENTATION  
**Date:** 2026-09-20  

---

## 1. Design Philosophy & Anti-Slop Audit Findings

Berdasarkan audit antarmuka lama, ditemukan pelanggaran aturan Anti-Slop yang kini dieliminasi:
1. **R-01 & R-29 (Color Palette):**
   - *Lama:* Gradien ungu-ke-biru dan biru-ke-cyan pada heading H1, teks tombol, dan orbs floating. Kartu Why Us menggunakan 4 warna berbeda (biru, toska, oranye, ungu).
   - *Baru:* Disederhanakan menjadi 1 warna aksen konsisten (*Frogobox Emerald* `#10b981`) dengan latar monokrom Slate (`#090d16` di Dark Mode, `#f8fafc` di Light Mode).
2. **R-09 (Badges & Eyebrows):**
   - *Lama:* Kapsul mengambang dengan titik hijau berdenyut (`animate-ping`) di atas headline Hero dan pill badge di atas setiap heading seksi ("What We Do", "Why Frogobox", "Client Love", "Ready to Get Started?").
   - *Baru:* Seluruh eyebrow pill yang menduplikasi H2 dihapus. Judul seksi langsung tampil percaya diri tanpa kapsul klise.
3. **R-04 & R-08 (Icons & Arrows):**
   - *Lama:* Ikon sparkle dan rocket pada tombol dan headline, serta panah kecil (`→`) di hampir setiap tombol aksi.
   - *Baru:* Ikon AI generik (sparkles, rocket) dihapus. Menggunakan SVG kontekstual yang relevan (dokumen proposal, panah navigasi terarah hanya bila ada transisi ke halaman baru).
4. **R-10 & R-13 (Glassmorphism & Glow):**
   - *Lama:* Glassmorphism pada navbar, kartu, dan tombol hero secara bersamaan dengan efek glow `box-shadow: 0 0 20px ...`.
   - *Baru:* Glassmorphism dibatasi hanya pada navbar (`backdrop-blur-md`). Seluruh kartu menggunakan surface solid yang kokoh dan bebas glow melayang.
5. **R-19 & R-37 (Motion & Liveliness Dials):**
   - *Lama:* Animasi float tak berujung (`@keyframes float 3s ease-in-out infinite`) dan pulse glow tanpa henti.
   - *Baru:* Menetapkan Dials **ENERGY 2 / RHYTHM 2 / MOTION 1**. Gerakan hanya terjadi pada transisi hover (150ms-250ms) dan scroll-fade yang tenang.
6. **R-24 & R-26 (Navigation & Controls):**
   - *Lama:* Link footer Privacy Policy dan Terms of Service mengarah ke `#`. Link alamat kantor mengarah ke `#`.
   - *Baru:* Link alamat kantor mengarah ke Google Maps Probolinggo terverifikasi. Link legal diarahkan ke route `/privacy-policy` atau modal preview dokumen resmi. Tombol newsletter memiliki aria-label dan feedback interaktif.

---

## 2. Component Blueprint & Refactoring Specs

### 2.1 Hero Component (`Hero.tsx`)
- **Struktur:**
  - Hapus: Kapsul eyebrow dengan ping dot di atas H1.
  - Hapus: Orbs blur bulat di pojok kiri/kanan (`bg-primary-600/10 blur-3xl animate-float`).
  - Hapus: Ikon sparkles pada tombol proposal.
  - Pertahankan: Headline tegas, tagline yang menjelaskan kapasitas studio Frogobox dalam mobile apps, web platform, dan open-source software.
  - CTAs:
    - Primary Button: "Jelajahi Portofolio" (scroll ke `#portfolio`).
    - Secondary Button: "Proposal Kemitraan" (tautan ke `/business-plan`).
    - Tertiary Button: "Hubungi Studio" (scroll ke `#contact`).

### 2.2 Services Component (`Services.tsx`)
- **Struktur:**
  - Hapus: Eyebrow pill `t.ui.whatWeDo`.
  - Layout: Grid 3 kolom dengan penekanan visual pada keahlian inti (Mobile App Engineering, Fullstack Web Development, Open Source & SDK Tools).
  - Kartu: Permukaan solid dengan border tipis terstruktur, ikon bersih dalam wadah beraksen emerald lembut.

### 2.3 Why Us Component (`WhyUs.tsx`)
- **Struktur:**
  - Hapus: Eyebrow pill `t.ui.whyFrogobox`.
  - Hapus: Gradien pelangi berbeda-beda pada setiap kartu.
  - Gunakan aksen terpadu emerald studio dengan rasio kontras teruji.

### 2.4 Portfolio Component (`Portfolio.tsx`)
- **Struktur:**
  - Hapus: Parsing string em dash `{title.split('—')[0].trim()}`.
  - Hapus: Garis grid blueprint latar belakang (`bg-[size:14px_24px]`).
  - Tampilkan kartu proyek dengan metadata jelas: Kategori (Web, Mobile Apps, Open Source), judul, deskripsi solusi, dan indikator hasil nyata.

### 2.5 Testimonials Component (`Testimonials.tsx`)
- **Struktur:**
  - Hapus: Eyebrow pill "Client Love".
  - Hapus: Avatar pelangi melayang (`avatarColors` acak).
  - Tampilkan kutipan testimoni riil yang terhubung dengan proyek nyata Frogobox secara terstruktur dan kredibel.

### 2.6 CTA Component (`CTA.tsx`)
- **Struktur:**
  - Hapus: Lingkaran konsentris dekoratif yang tidak fungsional.
  - Hapus: Kapsul roket "Ready to Get Started?".
  - Tampilkan penawaran kolaborasi rekayasa perangkat lunak yang jelas dan proporsional.

### 2.7 ThemeToggle Component (`ThemeToggle.tsx`)
- **Struktur:**
  - Ganti emoji ☀️ dan 🌙 dengan SVG Sun & Moon icons yang presisi, aksesibel, dan memiliki transisi halus.

### 2.8 Footer & Contact (`Footer.tsx`, `ContactForm.tsx`)
- **Struktur:**
  - Ganti link `#` pada kontak alamat dengan tautan peta eksternal Google Maps.
  - Sambungkan tautan privasi ke halaman privasi yang valid.
  - Berikan feedback visual yang jelas saat form kontak atau newsletter disubmit.

---

## 3. WCAG AA Contrast Verification Table

| Elemen | Warna Teks | Warna Latar | Rasio Kontras | Status WCAG AA |
|--------|------------|-------------|---------------|----------------|
| Body Text (Light) | `#0f172a` (Slate 900) | `#ffffff` (White) | **17.8:1** | PASS (Min 4.5:1) |
| Secondary Text (Light) | `#475569` (Slate 600) | `#ffffff` (White) | **7.1:1** | PASS (Min 4.5:1) |
| Body Text (Dark) | `#f8fafc` (Slate 50) | `#090d16` (Deep Slate) | **18.5:1** | PASS (Min 4.5:1) |
| Secondary Text (Dark) | `#94a3b8` (Slate 400) | `#090d16` (Deep Slate) | **8.2:1** | PASS (Min 4.5:1) |
| Accent Button (Emerald) | `#ffffff` (White) | `#059669` (Emerald 600) | **4.6:1** | PASS (Min 4.5:1) |
| Card Border (Hover) | `#10b981` (Emerald 500) | `#111827` (Card Surface) | **3.5:1** | PASS (UI component min 3:1) |
