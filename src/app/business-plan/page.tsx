"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Play,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Printer,
  Handshake,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Check,
  Sparkles,
  Layers,
  ZoomIn,
  BarChart3,
  Smartphone,
  Award,
  ShieldAlert,
  Key,
  RefreshCw,
  TrendingUp,
  Wallet,
  HelpCircle,
  Rocket,
  ExternalLink,
  X,
} from "lucide-react";

interface ModalImageState {
  src: string;
  title: string;
}

const slideTitles = [
  "1. Cover & Highlight Kerjasama",
  "2. Konsep Bisnis Pihak 1 & 2",
  "3. Proyeksi & Potensi Penghasilan",
  "4. Bukti Nyata (AdMob & Play Store)",
  "5. SOP & 6 Tahapan Alur Kerja",
  "6. Garansi Keamanan 200% ($50)",
  "7. Simulator Profit Sharing 50:50",
  "8. FAQ & Tanya Jawab Mitra",
  "9. Call to Action & Cara Mulai",
];

export default function BusinessPlanPage() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 9;
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [modalImage, setModalImage] = useState<ModalImageState | null>(null);

  // Simulator State
  const [downloads, setDownloads] = useState<number>(50000);
  const [apps, setApps] = useState<number>(8);

  const goToSlide = useCallback(
    (slideNum: number) => {
      if (slideNum >= 1 && slideNum <= totalSlides) {
        setCurrentSlide(slideNum);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [totalSlides]
  );

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides) {
      setCurrentSlide((prev) => prev + 1);
    }
  }, [currentSlide, totalSlides]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 1) {
      setCurrentSlide((prev) => prev - 1);
    }
  }, [currentSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        if (e.target instanceof HTMLInputElement) return;
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        if (e.target instanceof HTMLInputElement) return;
        e.preventDefault();
        prevSlide();
      } else if (e.key === "Escape") {
        setIsOverviewOpen(false);
        setModalImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Simulator calculations
  let dailyPerApp = 0;
  if (downloads <= 1000) {
    dailyPerApp = 300;
  } else if (downloads <= 5000) {
    dailyPerApp = 750;
  } else if (downloads <= 10000) {
    dailyPerApp = 3000;
  } else if (downloads <= 50000) {
    dailyPerApp = 27500;
  } else if (downloads <= 100000) {
    dailyPerApp = 125000;
  } else {
    dailyPerApp = 125000 + ((downloads - 100000) / 100000) * 150000;
  }

  const totalDaily = Math.round(dailyPerApp * (1 + (apps - 1) * 0.45));
  const totalMonthly = totalDaily * 30;
  const shareP1 = Math.round(totalMonthly * 0.5);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col justify-between selection:bg-blue-600 selection:text-white overflow-x-hidden font-sans">
      <style jsx global>{`
        @media print {
          body {
            background: #0f172a !important;
            color: white !important;
            -webkit-print-color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
          .slide-container {
            display: flex !important;
            opacity: 1 !important;
            page-break-after: always;
            min-height: 100vh !important;
            width: 100vw !important;
          }
        }
      `}</style>

      {/* TOP NAVIGATION / HEADER */}
      <header className="no-print border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Play className="w-5 h-5 text-white fill-current" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
              PLAY STORE & ADMOB PARTNERSHIP
              <span className="text-[10px] uppercase font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                Profit Share 50:50
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Proposal Kemitraan Pengelolaan Akun & Aplikasi Android
            </p>
          </div>
        </div>

        {/* Slide Control & Quick Actions */}
        <div className="flex items-center gap-2 lg:gap-4">
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-800/90 rounded-lg px-3 py-1.5 border border-slate-700/60 text-xs text-slate-300">
            <span className="text-slate-400">Slide:</span>
            <span className="font-bold text-blue-400">{currentSlide}</span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-400">{totalSlides}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 1}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 hover:text-white transition border border-slate-700"
              title="Slide Sebelumnya (Panah Kiri)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides}
              className="p-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition shadow-md shadow-blue-600/30"
              title="Slide Selanjutnya (Panah Kanan / Spasi)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 border-l border-slate-700 pl-4">
            <button
              onClick={() => setIsOverviewOpen(true)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Daftar Slide
            </button>
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              Cetak / PDF
            </button>
          </div>
        </div>
      </header>

      {/* MAIN SLIDES CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
        {/* ==================== SLIDE 1: COVER ==================== */}
        <section
          className={`slide-container flex-col justify-between min-h-[580px] lg:min-h-[620px] rounded-3xl p-8 lg:p-12 bg-slate-900/70 backdrop-blur-xl relative overflow-hidden shadow-2xl border border-slate-700/60 transition-opacity duration-300 ${
            currentSlide === 1 ? "flex opacity-100" : "hidden opacity-0"
          }`}
        >
          {/* Glow background */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              Peluang Kemitraan Digital 2026
            </div>

            <div className="space-y-3 max-w-3xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Bisnis Aplikasi{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400">
                  Google Play Store
                </span>{" "}
                & AdMob
              </h2>
              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                Membangun mesin <i>passive income</i> digital berkelanjutan dengan model sinergi{" "}
                <b>Profit Sharing 50% : 50%</b> dan{" "}
                <b>Proteksi Garansi Keamanan 200%</b>.
              </p>
            </div>
          </div>

          {/* Feature highlight cards */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mt-8">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700/80 space-y-2 hover:border-blue-500/50 transition">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Handshake className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Bagi Hasil Adil 50:50</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Hasil monetisasi iklan AdMob dibagi rata 50% untuk Anda & 50% untuk teknis operasional.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700/80 space-y-2 hover:border-emerald-500/50 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">100% Dikelola Pihak Kedua</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Riset pasar, pembuatan, upload 4 aplikasi/bulan, dan ASO dikerjakan sepenuhnya tanpa merepotkan Anda.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700/80 space-y-2 hover:border-amber-500/50 transition">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Garansi 200% ($50 USD)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Jika dalam 3 bulan tidak ada pencairan, Pihak Kedua wajib mengganti rugi 2x biaya daftar ($50 USD).
              </p>
            </div>
          </div>

          {/* Footer slide info */}
          <div className="relative z-10 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Legal & Terverifikasi Google
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Pencairan Rutin Tanggal 25
              </span>
            </div>
            <div className="text-slate-500 font-mono">Gunakan tombol panah ➔ atau Spasi untuk lanjut</div>
          </div>
        </section>

        {/* ==================== SLIDE 2: KONSEP BISNIS ==================== */}
        <section
          className={`slide-container flex-col justify-between min-h-[580px] lg:min-h-[620px] rounded-3xl p-8 lg:p-12 bg-slate-900/70 backdrop-blur-xl relative overflow-hidden shadow-2xl border border-slate-700/60 transition-opacity duration-300 ${
            currentSlide === 2 ? "flex opacity-100" : "hidden opacity-0"
          }`}
        >
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Pilar Kerjasama</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Sinergi Pemilik Akun (Pihak 1) & Operator Teknis (Pihak 2)
            </h2>
            <p className="text-sm text-slate-300">
              Konsep bisnis transparan di mana kedua belah pihak saling melengkapi untuk membangun aset digital bersama.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            {/* PIHAK PERTAMA */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-950/40 to-slate-900/90 border border-blue-500/40 space-y-4 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                    01
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Pihak Pertama</h3>
                    <p className="text-xs text-blue-300">Investor / Pemilik Akun Play Store</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2.5 py-1 rounded-full">
                  Modal $25 (Sekali)
                </span>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    Mendaftar akun Developer di <b>play.google.com/console/signup</b> (biaya $25 USD sekali seumur hidup).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Memegang penuh kepemilikan dan akses keamanan akun (aset milik Pihak 1).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    Menerima bagi hasil bersih <b>50%</b> setiap tanggal 25 langsung ke rekening bank.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Mendapatkan pengembalian $25 USD pada pencairan profit perdana.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    Terproteksi <b>Garansi Ganti Rugi $50 USD (200%)</b> bila 3 bulan tidak ada hasil.
                  </span>
                </li>
              </ul>
            </div>

            {/* PIHAK KEDUA */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-emerald-950/40 to-slate-900/90 border border-emerald-500/40 space-y-4 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    02
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Pihak Kedua</h3>
                    <p className="text-xs text-emerald-300">Developer & Tech Manager</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-1 rounded-full">
                  100% Technical Work
                </span>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Melakukan riset tren pasar & kata kunci pencarian (App Store Optimization).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <b>Wajib membuat & upload minimal 4 aplikasi potensial baru</b> setiap bulannya.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Mengintegrasikan SDK iklan Google AdMob (Banner, Interstitial, Reward Ads).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Monitoring performa: <i>Unpublish</i> aplikasi macet dan mengganti dengan ide baru.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Mengirim rekap laporan bulanan resmi setiap <b>tanggal 1</b>.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> Tidak diperlukan keahlian teknis dari Pihak Pertama — murni sistem pasif.
            </span>
            <span className="font-semibold text-slate-300">Skema: 50% Pihak 1 | 50% Pihak 2</span>
          </div>
        </section>

        {/* ==================== SLIDE 3: POTENSI PENGHASILAN ==================== */}
        <section
          className={`slide-container flex-col justify-between min-h-[580px] lg:min-h-[620px] rounded-3xl p-8 lg:p-12 bg-slate-900/70 backdrop-blur-xl relative overflow-hidden shadow-2xl border border-slate-700/60 transition-opacity duration-300 ${
            currentSlide === 3 ? "flex opacity-100" : "hidden opacity-0"
          }`}
        >
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Proyeksi Finansial</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Estimasi Penghasilan Berdasarkan Unduhan (AdMob)
            </h2>
            <p className="text-sm text-slate-300">
              Penghasilan dihitung dari impresi & klik iklan yang tampil pada aplikasi aktif.
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto my-4 rounded-2xl border border-slate-700 bg-slate-900/90 shadow-lg">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-800/80 text-slate-200 uppercase font-bold text-[11px] tracking-wider border-b border-slate-700">
                <tr>
                  <th className="px-5 py-3.5">Total Download</th>
                  <th className="px-5 py-3.5">Estimasi Pendapatan / Hari</th>
                  <th className="px-5 py-3.5">Estimasi / Bulan (30 Hari)</th>
                  <th className="px-5 py-3.5 text-emerald-400 font-extrabold">Bagi Hasil Pihak 1 (50%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-800/50 transition">
                  <td className="px-5 py-3 font-semibold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-500"></span> 1.000 (1K)
                  </td>
                  <td className="px-5 py-3">Rp 100 - Rp 500</td>
                  <td className="px-5 py-3">Rp 3.000 - Rp 15.000</td>
                  <td className="px-5 py-3 font-bold text-emerald-400">Rp 1.500 - Rp 7.500</td>
                </tr>
                <tr className="hover:bg-slate-800/50 transition">
                  <td className="px-5 py-3 font-semibold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span> 5.000 (5K)
                  </td>
                  <td className="px-5 py-3">Rp 500 - Rp 1.000</td>
                  <td className="px-5 py-3">Rp 15.000 - Rp 30.000</td>
                  <td className="px-5 py-3 font-bold text-emerald-400">Rp 7.500 - Rp 15.000</td>
                </tr>
                <tr className="hover:bg-slate-800/50 transition">
                  <td className="px-5 py-3 font-semibold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span> 10.000 (10K)
                  </td>
                  <td className="px-5 py-3">Rp 1.000 - Rp 5.000</td>
                  <td className="px-5 py-3">Rp 30.000 - Rp 150.000</td>
                  <td className="px-5 py-3 font-bold text-emerald-400">Rp 15.000 - Rp 75.000</td>
                </tr>
                <tr className="hover:bg-slate-800/50 transition">
                  <td className="px-5 py-3 font-semibold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span> 50.000 (50K)
                  </td>
                  <td className="px-5 py-3">Rp 5.000 - Rp 50.000</td>
                  <td className="px-5 py-3">Rp 150.000 - Rp 1.500.000</td>
                  <td className="px-5 py-3 font-bold text-emerald-400">Rp 75.000 - Rp 750.000</td>
                </tr>
                <tr className="bg-emerald-950/20 hover:bg-emerald-950/30 transition border-l-4 border-l-emerald-500">
                  <td className="px-5 py-3.5 font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> 100.000 (100K)+
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-emerald-300">Rp 100.000 - Rp 150.000</td>
                  <td className="px-5 py-3.5 font-semibold text-emerald-300">Rp 3.000.000 - Rp 4.500.000</td>
                  <td className="px-5 py-3.5 font-extrabold text-emerald-400 text-base">
                    Rp 1.500.000 - Rp 2.250.000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Compound Effect Callout */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs sm:text-sm text-slate-200">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-amber-300">
                Efek Akumulasi Multi-Aplikasi (Portfolio Compound Effect)
              </h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                Karena setiap bulan ditambahkan <b>4 aplikasi baru</b>, dalam 6 bulan akun akan memiliki{" "}
                <b>24 aplikasi</b>. Penghasilan di atas adalah per aplikasi — bila memiliki beberapa aplikasi dengan
                10k–50k download, akumulasi harian akan mencapai ratusan ribu rupiah per hari secara stabil.
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>*Syarat pencairan AdMob: Minimal saldo akumulasi $100 USD / ± Rp 1.300.000</span>
            <span className="text-emerald-400 font-semibold">Bagi hasil 50% dicairkan setiap tanggal 25</span>
          </div>
        </section>

        {/* ==================== SLIDE 4: PROOF / BUKTI NYATA ==================== */}
        <section
          className={`slide-container flex-col justify-between min-h-[580px] lg:min-h-[620px] rounded-3xl p-8 lg:p-12 bg-slate-900/70 backdrop-blur-xl relative overflow-hidden shadow-2xl border border-slate-700/60 transition-opacity duration-300 ${
            currentSlide === 4 ? "flex opacity-100" : "hidden opacity-0"
          }`}
        >
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Track Record & Validasi</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Bukti Nyata Performa: Google AdMob & Play Store
            </h2>
            <p className="text-sm text-slate-300">
              Bukan sekadar teori. Berikut adalah data riil performa aplikasi yang telah dikembangkan dan menghasilkan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            {/* AdMob Screenshot Box */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700 flex flex-col justify-between space-y-3 group">
              <div
                className="overflow-hidden rounded-xl border border-slate-800 cursor-pointer relative"
                onClick={() =>
                  setModalImage({
                    src: "/images/admob_proof.png",
                    title: "Google AdMob Real Earnings Dashboard",
                  })
                }
              >
                <div className="w-full h-48 sm:h-52 relative overflow-hidden">
                  <Image
                    src="/images/admob_proof.png"
                    alt="Google AdMob Dashboard"
                    fill
                    className="object-cover object-top group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition text-white text-xs font-bold gap-1.5">
                  <ZoomIn className="w-4 h-4" /> Klik untuk Perbesar
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4 text-blue-400" /> Dashboard AdMob Aktif
                  </h3>
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    Rp 3,59 Juta / Bulan
                  </span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1">
                  <li>• Penghasilan bulan lalu: <b>Rp 3,44 Juta</b></li>
                  <li>• Penghasilan bulan berjalan: <b>Rp 3,59 Juta</b></li>
                  <li>• Penghasilan harian stabil: <b>Rp 62.500 - Rp 129.000 / hari</b></li>
                </ul>
              </div>
            </div>

            {/* Playstore Screenshot Box */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700 flex flex-col justify-between space-y-3 group">
              <div
                className="overflow-hidden rounded-xl border border-slate-800 cursor-pointer relative"
                onClick={() =>
                  setModalImage({
                    src: "/images/playstore_proof.png",
                    title: "Google Play Store 100K+ Downloads Live",
                  })
                }
              >
                <div className="w-full h-48 sm:h-52 relative overflow-hidden">
                  <Image
                    src="/images/playstore_proof.png"
                    alt="Google Play Store Listing"
                    fill
                    className="object-cover object-top group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition text-white text-xs font-bold gap-1.5">
                  <ZoomIn className="w-4 h-4" /> Klik untuk Perbesar
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-emerald-400" /> Aplikasi Live 100K+ Download
                  </h3>
                  <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                    100K+ Downloads
                  </span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1">
                  <li>• Judul: <b>Kpop Demon : Piano Game</b> (Live di Play Store)</li>
                  <li>• Menghasilkan <b>Rp 803.000</b> hanya dalam 7 hari terakhir</li>
                  <li>• Rating 3.8★ dari ratusan ulasan organik</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/20 text-xs text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-400" /> Sistem pembuatan game/aplikasi dan monetisasi sudah matang & terbukti menghasilkan.
            </span>
            <span className="text-blue-300 font-semibold">Proven System</span>
          </div>
        </section>

        {/* ==================== SLIDE 5: ALUR KERJA ==================== */}
        <section
          className={`slide-container flex-col justify-between min-h-[580px] lg:min-h-[620px] rounded-3xl p-8 lg:p-12 bg-slate-900/70 backdrop-blur-xl relative overflow-hidden shadow-2xl border border-slate-700/60 transition-opacity duration-300 ${
            currentSlide === 5 ? "flex opacity-100" : "hidden opacity-0"
          }`}
        >
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Standard Operating Procedure
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">6 Tahapan Alur Kerja Kerjasama</h2>
            <p className="text-sm text-slate-300">
              Langkah terstruktur dari pembukaan akun hingga penerimaan bagi hasil rutin.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
            {/* Step 1 */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-2 hover:border-blue-500/50 transition">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-xs">
                  01
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Pihak Pertama</span>
              </div>
              <h3 className="font-bold text-white text-sm">Pendaftaran Akun Play Console</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pihak 1 mendaftar di <b>play.google.com/console/signup</b> dengan biaya resmi Google $25 USD (sekali seumur hidup).
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-2 hover:border-blue-500/50 transition">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-xs">
                  02
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Pihak Kedua</span>
              </div>
              <h3 className="font-bold text-white text-sm">Riset & Upload 4 Apps / Bulan</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pihak 2 meriset tren, membuat aplikasi/game, menyematkan iklan AdMob, dan mengupload minimal 4 aplikasi setiap bulan.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-2 hover:border-blue-500/50 transition">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-xs">
                  03
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Pihak Kedua</span>
              </div>
              <h3 className="font-bold text-white text-sm">Optimasi & Pergantian Cepat</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Jika ada aplikasi yang macet / trafik rendah, Pihak 2 langsung meng-<i>unpublish</i> dan menggantinya dengan aplikasi baru yang potensial.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-2 hover:border-amber-500/50 transition">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">
                  04
                </span>
                <span className="text-[10px] font-bold text-amber-400 uppercase">Tiap Tanggal 1</span>
              </div>
              <h3 className="font-bold text-white text-sm">Laporan Bulanan Transparan</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pihak 2 mengirimkan rekap performa aplikasi, total download, dan estimasi saldo AdMob secara terbuka setiap tanggal 1.
              </p>
            </div>

            {/* Step 5 */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-2 hover:border-emerald-500/50 transition">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">
                  05
                </span>
                <span className="text-[10px] font-bold text-emerald-400 uppercase">Tiap Tanggal 25</span>
              </div>
              <h3 className="font-bold text-white text-sm">Pencairan Bagi Hasil (50:50)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Google mencairkan dana tiap tgl 21–25 (min. $100 / Rp 1,3jt). Hasil dibagi 50% & ditransfer ke rekening Pihak 1.
              </p>
            </div>

            {/* Step 6 */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-2 hover:border-emerald-500/50 transition">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">
                  06
                </span>
                <span className="text-[10px] font-bold text-emerald-400 uppercase">Payout Perdana</span>
              </div>
              <h3 className="font-bold text-white text-sm">Penggantian Biaya Awal $25</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Biaya $25 pendaftaran pertama akan diganti 100% oleh Pihak 2 saat memperoleh pencairan profit pertama kali.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Siklus berjalan otomatis setiap bulan tanpa menyita waktu harian Pihak Pertama.</span>
            <span className="text-emerald-400 font-semibold">100% Hands-Free Investment</span>
          </div>
        </section>

        {/* ==================== SLIDE 6: GARANSI KEAMANAN ==================== */}
        <section
          className={`slide-container flex-col justify-between min-h-[580px] lg:min-h-[620px] rounded-3xl p-8 lg:p-12 bg-slate-900/70 backdrop-blur-xl relative overflow-hidden shadow-2xl border border-slate-700/60 transition-opacity duration-300 ${
            currentSlide === 6 ? "flex opacity-100" : "hidden opacity-0"
          }`}
        >
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Proteksi & Jaminan Investor
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Garansi Keamanan 200% ($50 USD) — Zero Financial Risk
            </h2>
            <p className="text-sm text-slate-300">
              Komitmen penuh dari Pihak Kedua untuk memastikan investasi awal Anda 100% aman dan bebas risiko.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-4">
            {/* Main Guarantee Hero Box (7 cols) */}
            <div className="md:col-span-7 p-6 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border-2 border-amber-500/50 flex flex-col justify-between space-y-4 shadow-xl">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
                  <ShieldAlert className="w-4 h-4" /> KLAUSUL GARANSI GANTI RUGI 2X LIPAT
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  Jika dalam 3 Bulan Tidak Ada Hasil, Pihak Kedua Wajib Membayar{" "}
                  <span className="text-amber-400">$50 USD</span> (2x Lipat Biaya Daftar)!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Apabila project mengalami kegagalan atau selama <b>3 bulan berturut-turut</b> tidak ada perkembangan dan
                  tidak pernah mencapai pencairan dari AdMob, maka{" "}
                  <b>Pihak Kedua wajib mengganti kerugian sebesar 2x lipat biaya pendaftaran Play Store ($50 USD / ± Rp 800.000)</b>{" "}
                  kepada Pihak Pertama.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/30 text-xs text-amber-200/90 font-medium">
                ✨ Plus: Akun Google Play Console yang sudah dibeli tetap 100% menjadi aset milik Pihak Pertama selamanya.
              </div>
            </div>

            {/* Protection Highlights (5 cols) */}
            <div className="md:col-span-5 flex flex-col justify-between gap-3">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-1 hover:border-blue-500/40 transition">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs">
                  <Key className="w-4 h-4" /> Kontrol Aset Mutlak
                </div>
                <p className="text-xs text-slate-300">
                  Email dan kredensial utama dipegang penuh oleh Pihak Pertama. Tidak ada pengalihan kepemilikan aset.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-1 hover:border-emerald-500/40 transition">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <RefreshCw className="w-4 h-4" /> 100% Reimburse Modal $25
                </div>
                <p className="text-xs text-slate-300">
                  Begitu saldo AdMob cair perdana, biaya pendaftaran $25 dikembalikan penuh oleh Pihak Kedua.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-1 hover:border-purple-500/40 transition">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
                  <TrendingUp className="w-4 h-4" /> Potensi Profit Tanpa Batas
                </div>
                <p className="text-xs text-slate-300">
                  Risiko modal Rp 0 (karena digaransi), namun potensi passive income bisa mencapai jutaan rupiah per bulan.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 text-center font-medium">
            Kombinasi sempurna: <span className="text-amber-400 font-bold">Zero Financial Risk</span> +{" "}
            <span className="text-emerald-400 font-bold">High Return Passive Income</span>.
          </div>
        </section>

        {/* ==================== SLIDE 7: SIMULATOR INTERAKTIF ==================== */}
        <section
          className={`slide-container flex-col justify-between min-h-[580px] lg:min-h-[620px] rounded-3xl p-8 lg:p-12 bg-slate-900/70 backdrop-blur-xl relative overflow-hidden shadow-2xl border border-slate-700/60 transition-opacity duration-300 ${
            currentSlide === 7 ? "flex opacity-100" : "hidden opacity-0"
          }`}
        >
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Tools Interaktif</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Simulasi Interaktif Profit Sharing 50:50
            </h2>
            <p className="text-sm text-slate-300">
              Geser slider di bawah untuk melihat simulasi pendapatan harian, bulanan, dan bagian bersih Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-4 items-center">
            {/* Controls (5 cols) */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/90 border border-slate-700 space-y-5">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-300 uppercase">Total Download Portofolio</label>
                  <span className="text-sm font-extrabold text-blue-400">
                    {Number(downloads).toLocaleString("id-ID")} Unduhan
                  </span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={200000}
                  step={1000}
                  value={downloads}
                  onChange={(e) => setDownloads(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>1k</span>
                  <span>25k</span>
                  <span>50k</span>
                  <span>100k</span>
                  <span>200k+</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-300 uppercase">Jumlah Aplikasi Aktif</label>
                  <span className="text-sm font-extrabold text-emerald-400">{apps} Aplikasi</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={24}
                  step={1}
                  value={apps}
                  onChange={(e) => setApps(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>1 App (Bulan 1)</span>
                  <span>8 Apps (Bulan 2)</span>
                  <span>24 Apps (Bulan 6)</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>Model Bagi Hasil:</span>
                  <span className="font-bold text-white">50% P1 : 50% P2</span>
                </div>
                <div className="flex justify-between">
                  <span>Jadwal Payout:</span>
                  <span className="font-bold text-emerald-400">Tiap Tanggal 25</span>
                </div>
              </div>
            </div>

            {/* Result Cards (7 cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Total Harian */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-1">
                <span className="text-xs text-slate-400 font-medium">Estimasi Omset Harian Akun</span>
                <div className="text-xl sm:text-2xl font-black text-white">
                  Rp {Number(totalDaily).toLocaleString("id-ID")}
                </div>
                <p className="text-[11px] text-slate-500">Total akumulasi dari seluruh aplikasi</p>
              </div>

              {/* Total Bulanan */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-1">
                <span className="text-xs text-slate-400 font-medium">Estimasi Omset Bulanan (30 Hari)</span>
                <div className="text-xl sm:text-2xl font-black text-blue-400">
                  Rp {Number(totalMonthly).toLocaleString("id-ID")}
                </div>
                <p className="text-[11px] text-slate-500">Saldo AdMob sebelum bagi hasil</p>
              </div>

              {/* Jatah Pihak 1 (Highlight) */}
              <div className="sm:col-span-2 p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-emerald-950/40 border-2 border-emerald-500/60 space-y-2 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
                    <Wallet className="w-4 h-4" /> Bagian Bersih Pihak Pertama (50%)
                  </span>
                  <span className="text-[11px] bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full">
                    Transfer Tgl 25
                  </span>
                </div>
                <div className="text-2xl sm:text-4xl font-black text-emerald-400">
                  Rp {Number(shareP1).toLocaleString("id-ID")} / Bulan
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Penghasilan pasif murni tanpa perlu mengurus coding, perbaikan bug, atau upload aplikasi.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>*Simulasi di atas adalah estimasi moderat berdasarkan historical rate AdMob Indonesia.</span>
            <span className="text-blue-400 font-semibold">Tersedia kalkulasi dinamis</span>
          </div>
        </section>

        {/* ==================== SLIDE 8: FAQ ==================== */}
        <section
          className={`slide-container flex-col justify-between min-h-[580px] lg:min-h-[620px] rounded-3xl p-8 lg:p-12 bg-slate-900/70 backdrop-blur-xl relative overflow-hidden shadow-2xl border border-slate-700/60 transition-opacity duration-300 ${
            currentSlide === 8 ? "flex opacity-100" : "hidden opacity-0"
          }`}
        >
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Tanya Jawab Kemitraan</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Pertanyaan yang Sering Diajukan (FAQ)</h2>
            <p className="text-sm text-slate-300">Jawaban transparan untuk semua pertanyaan calon mitra investor.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-1.5 hover:border-blue-500/40 transition">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-400 shrink-0" /> Kenapa butuh akun dari Pihak Pertama?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Google menerapkan pembatasan jumlah akun per identitas. Kemitraan ini membuka peluang diversifikasi portofolio
                aplikasi secara resmi, aman, dan saling menguntungkan (sinergi modal akun & keahlian teknis).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-1.5 hover:border-emerald-500/40 transition">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" /> Bagaimana transparansi penghasilan AdMob?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pihak Pertama mendapatkan laporan bulanan resmi setiap tanggal 1. Selain itu, Pihak Pertama memiliki hak untuk melihat
                langsung dashboard penghasilan AdMob untuk verifikasi saldo kapan pun.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-1.5 hover:border-amber-500/40 transition">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" /> Apakah ada biaya tambahan lain?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                <b>TIDAK ADA.</b> Biaya pendaftaran $25 USD langsung ke Google adalah satu-satunya biaya. Bahkan biaya tersebut akan diganti 100%
                oleh Pihak Kedua saat pencairan pertama.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-1.5 hover:border-purple-500/40 transition">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-purple-400 shrink-0" /> Bagaimana menjaga kesehatan akun dari suspend?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pihak Kedua mengikuti <i>Google Play Developer Policy</i> secara ketat: menggunakan aset bebas royalti/original, source code bersih,
                dan tidak melanggar hak cipta untuk memastikan akun awet bertahun-tahun.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Masih ada pertanyaan lain? Hubungi langsung untuk diskusi dan konsultasi terbuka.</span>
            <span className="text-blue-400 font-semibold">100% Transparan</span>
          </div>
        </section>

        {/* ==================== SLIDE 9: CALL TO ACTION ==================== */}
        <section
          className={`slide-container flex-col justify-between min-h-[580px] lg:min-h-[620px] rounded-3xl p-8 lg:p-12 bg-slate-900/70 backdrop-blur-xl relative overflow-hidden shadow-2xl border border-slate-700/60 text-center transition-opacity duration-300 ${
            currentSlide === 9 ? "flex opacity-100" : "hidden opacity-0"
          }`}
        >
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide uppercase">
              <Rocket className="w-4 h-4" /> Langkah Mudah Memulai
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Siap Membangun Mesin Passive Income Anda?</h2>
            <p className="text-sm text-slate-300">
              Hanya perlu 3 langkah mudah untuk mengaktifkan kemitraan bisnis ini hari ini juga.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto my-6 text-left">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-2">
              <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-xs">
                01
              </span>
              <h3 className="font-bold text-white text-base">Konfirmasi Minat</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sepakati terms & kondisi kemitraan Profit Sharing 50:50 serta garansi ganti rugi 200%.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">
                02
              </span>
              <h3 className="font-bold text-white text-base">Daftar Play Console</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Buka akun resmi di <b>play.google.com/console/signup</b> ($25 USD). Biaya akan diganti saat cair pertama.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-2">
              <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">
                03
              </span>
              <h3 className="font-bold text-white text-base">Pihak 2 Mulai Bekerja</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pihak 2 langsung memproduksi & upload 4 aplikasi batch pertama. Santai & terima laporan tgl 1!
              </p>
            </div>
          </div>

          {/* Action Box */}
          <div className="max-w-xl mx-auto p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <p className="text-xs text-slate-400">Hubungi sekarang untuk mengamankan slot kemitraan:</p>
              <p className="text-sm font-bold text-white">Mari Bergabung & Sukses Bersama!</p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://play.google.com/console/signup"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Link Play Console
              </a>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 text-xs text-slate-500 flex items-center justify-between">
            <span>Proposal Kerjasama Kemitraan Akun Google Play Store & AdMob</span>
            <span className="text-amber-400 font-semibold">Protected by 200% Guarantee</span>
          </div>
        </section>
      </main>

      {/* BOTTOM SLIDE CONTROLS BAR */}
      <footer className="no-print border-t border-slate-800/80 bg-slate-900/80 backdrop-blur-md px-4 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="hidden sm:inline">Navigasi:</span>
          <kbd className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300 font-mono text-[10px]">
            ◀ Panah Kiri
          </kbd>
          <kbd className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300 font-mono text-[10px]">
            Panah Kanan / Spasi ▶
          </kbd>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalSlides }, (_, i) => i + 1).map((slideNum) => (
            <button
              key={slideNum}
              onClick={() => goToSlide(slideNum)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                slideNum === currentSlide
                  ? "bg-blue-500 w-6"
                  : "bg-slate-700 hover:bg-slate-500"
              }`}
              title={`Ke Slide ${slideNum}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 1}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 text-xs font-semibold border border-slate-700 transition flex items-center gap-1"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Back
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold transition flex items-center gap-1 shadow-md shadow-blue-600/30"
          >
            Next <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>

      {/* OVERVIEW / DRAWER MODAL */}
      {isOverviewOpen && (
        <div
          className="no-print fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsOverviewOpen(false)}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full p-6 space-y-4 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-lg flex items-center gap-2">
                <LayoutGrid className="w-5 h-5 text-blue-400" />
                Daftar Slide Presentasi
              </h3>
              <button
                onClick={() => setIsOverviewOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              {slideTitles.map((title, idx) => {
                const slideNum = idx + 1;
                const isActive = slideNum === currentSlide;
                return (
                  <div
                    key={slideNum}
                    onClick={() => {
                      goToSlide(slideNum);
                      setIsOverviewOpen(false);
                    }}
                    className={`p-3 rounded-xl border cursor-pointer transition ${
                      isActive
                        ? "bg-blue-600/20 border-blue-500 text-blue-300 font-bold"
                        : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    <div className="text-[10px] text-slate-400">Slide {slideNum}</div>
                    <div>{title}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* IMAGE LIGHTBOX MODAL */}
      {modalImage && (
        <div
          className="no-print fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setModalImage(null)}
        >
          <div
            className="relative max-w-5xl w-full p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 text-white">
              <h4 className="font-bold text-sm">{modalImage.title}</h4>
              <button
                onClick={() => setModalImage(null)}
                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative w-full h-[70vh] rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
              <Image
                src={modalImage.src}
                alt={modalImage.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
