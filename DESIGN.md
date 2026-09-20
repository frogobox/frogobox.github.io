# DESIGN.md - Frogobox Design Direction & Style System

> **Brand Identity:** Frogobox — Independent Software Engineering Studio & Creative Technology Lab  
> **Author:** Angel (`angel_uiux`), UI/UX Designer  
> **Dial:** ENERGY 2 / RHYTHM 2 / MOTION 1  
> **Anti-Slop Standard:** Craft-First, No Buzzwords, No AI Tell Patterns, Purposeful Techniques Only  

---

## 1. Brand Soul & Personality

Frogobox dibangun dengan etos rekayasa perangkat lunak mandiri, presisi teknis, dan keterbukaan open-source (terbukti dari jutaan unduhan aplikasi Android, Frogo SDK, dan template pengembangan). Desain tidak boleh terlihat seperti template landing page AI yang generik dengan gradien ungu neon dan kapsul berkedip. Sebaliknya, identitas visualnya harus memancarkan:
- **Teknis & Terpercaya:** Lugas, terstruktur, menampilkan kode dan hasil karya riil.
- **Modern & Berbobot:** Menggunakan kontras tajam, garis grid mikro halus, tipografi proporsional, dan ruang kosong terencana.
- **Karakter Alami Studio:** Mengadopsi aksen hijau katak (*Frogobox Emerald*) yang hidup namun matang, dipadukan dengan dasar monokrom slate.

---

## 2. Liveliness Dials (Anti-Slop Part 3)

| Dial | Nilai | Definisi & Justifikasi |
|------|-------|------------------------|
| **ENERGY** | **2 (Balanced)** | Tampilan percaya diri dan profesional seperti studio engineering terkemuka. Tidak membosankan/steril, namun tidak heboh dengan partikel atau glow norak. |
| **RHYTHM** | **2 (Balanced)** | Tata letak ritmis dengan variasi komposisi yang disengaja. Showcase studi kasus memiliki visual tersendiri, fitur teknis disusun dalam kartu berpola struktural, bukan bento grid acak. |
| **MOTION** | **1 (Calm)** | Animasi interaktif yang tenang dan fungsional. Transisi hover halus (150ms-250ms), tanpa loop berulang, tanpa floating orbs tak berujung, patuh pada reduced motion. |

---

## 3. Color System & Palette (R-01, R-29)

Membatasi palet aktif pada **2 warna inti netral + 1 warna aksen terarah**:

### Core Neutral (Light & Dark)
- **Canvas Dark:** `#090d16` (Deep Midnight Slate) | **Canvas Light:** `#f8fafc` (Clean Crisp Slate)
- **Surface Dark:** `#111827` (Card Surface) | **Surface Light:** `#ffffff` (Pure White Card)
- **Border Dark:** `#1f293d` (Subtle boundary) | **Border Light:** `#e2e8f0` (Crisp light line)
- **Text Primary Dark:** `#f8fafc` (96% contrast) | **Text Primary Light:** `#0f172a` (94% contrast)
- **Text Secondary Dark:** `#94a3b8` (WCAG AA 4.8:1) | **Text Secondary Light:** `#475569` (WCAG AA 5.2:1)

### Studio Accent (Single Deliberate Accent)
- **Frog Green / Emerald:** `#10b981` (Primary Accent)
- **Emerald Hover / Darker:** `#059669`
- **Emerald Subtle Tint:** `rgba(16, 185, 129, 0.08)` (Background tag atau badge status aktif)

### Aturan Penggunaan Warna:
- **DILARANG:** Gradien biru-ke-ungu neon di seluruh teks atau background.
- **DILARANG:** Mewarnai 4 kartu berbeda dengan 4 warna pelangi acak (misal: kartu 1 biru, kartu 2 hijau, kartu 3 oranye, kartu 4 ungu). Semua ikon kartu menggunakan palet aksen studio yang kohesif.
- **DIPERBOLEHKAN:** Aksen emerald dipakai secara selektif pada elemen interaktif kunci (tombol aksi utama, tautan aktif, indikator status).

---

## 4. Typography Hierarchy (R-06)

Menggunakan tipe sans modern yang bersih dan memiliki karakter geometri netral: `Inter`, dipadukan dengan system fonts fallback.

- **Display / H1:** 40px - 56px (Font-Extrabold, tracking-tight, line-height 1.15)
- **H2 (Section Heading):** 28px - 36px (Font-Bold, tracking-tight, line-height 1.25)
- **H3 (Card Title):** 18px - 20px (Font-SemiBold, line-height 1.35)
- **Body Regular:** 15px - 16px (Font-Normal, line-height 1.6, tekstual nyaman dibaca)
- **Caption / Meta:** 12px - 13px (Font-Medium, uppercase tracking-wide jika untuk label kategori teknis)

### Aturan Tipografi:
- **DILARANG:** Monospace ukuran besar hanya untuk gaya "terminal palsu".
- **DILARANG:** Penggunaan karakter em dash (`—`). Gunakan tanda koma, titik dua, atau kurung.

---

## 5. Spacing, Elevation & Component Shapes (R-10, R-11, R-12)

- **Radius Scale:**
  - Tombol & input: `8px` (rounded-lg)
  - Kartu & kontainer: `12px` - `16px` (rounded-xl)
  - Badge & tag: `6px` (rounded-md, bukan pill ekstrem)
  - **DILARANG:** Menjadikan seluruh elemen berbentuk pil (`rounded-full`) untuk kartu, input, atau modal.
- **Elevation / Shadow:**
  - Kartu menggunakan elevasi minimal yang bertumpu pada batas garis halus (`border border-slate-200 dark:border-slate-800`).
  - Efek hover menaikkan kontras border (`border-emerald-500/40`) dengan elevasi halus `0 4px 20px -2px rgba(0, 0, 0, 0.08)`.
- **Glassmorphism Dose Cap:**
  - Dibatasi **hanya 1 elemen**: sticky navigation bar atas (`backdrop-blur-md bg-white/80 dark:bg-slate-900/80`).
  - Seluruh kartu konten, dropdown, dan formulir menggunakan latar solid agar kontras dan keterbacaan sempurna.

---

## 6. One-Line Rationale for Every Major Decision (R-31)

- **Mengapa memilih Slate & Emerald sebagai palet?**  
  *Memberikan identitas studio teknologi yang matang, presisi, dan terhubung dengan warisan brand Frogobox tanpa bergantung pada gradien AI.*
- **Mengapa tata letak Hero dibersihkan dari badge mengambang dan video overlay berat?**  
  *Fokus langsung ke proposisi nilai utama Frogobox sebagai studio rekayasa aplikasi dan web tanpa distraksi elemen orbs palsu.*
- **Mengapa kartu portofolio disusun dengan badge kategori fungsional?**  
  *Memudahkan pengunjung mengidentifikasi jenis proyek (Mobile App, Web Platform, Open Source) secara nyata dan cepat.*
- **Mengapa efek bayangan dan glow dikurangi?**  
  *Agar hirarki visual ditentukan oleh konten dan kontras batas elemen, bukan oleh ilusi kartu melayang yang kabur.*
- **Mengapa emoji di antarmuka dihapus dan diganti SVG?**  
  *Menghilangkan kesan visual informal/AI template dan meningkatkan kejelasan simbolik serta konsistensi rendering lintas perangkat.*
