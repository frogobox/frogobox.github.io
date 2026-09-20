import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | Frogobox",
  description: "Kebijakan Privasi dan Perlindungan Data Pengguna Frogobox Media Indonesia.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <header className="border-b border-[var(--border-color)] bg-[var(--bg-primary)] sticky top-0 z-10 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-bold text-lg text-[var(--text-primary)] hover:text-emerald-500 transition-colors"
          >
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
            Frogobox
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors px-3 py-1.5 rounded-lg border border-[var(--border-color)]"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="prose dark:prose-invert max-w-none space-y-8">
          <header className="border-b border-[var(--border-color)] pb-6 mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Kebijakan Privasi
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              Terakhir diperbarui: 20 September 2026. Berlaku untuk seluruh aplikasi dan layanan web Frogobox.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">1. Ringkasan Layanan</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Frogobox ID menyediakan aplikasi dan layanan perangkat lunak untuk pengguna umum dan klien bisnis. Seluruh layanan disediakan apa adanya (as is) dengan komitmen penuh terhadap privasi serta keamanan data pengguna.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">2. Pengumpulan dan Penggunaan Informasi</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Aplikasi kami dapat menggunakan layanan pihak ketiga terpercaya yang mengumpulkan informasi teknis untuk keperluan analitik crash dan performa:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[var(--text-secondary)]">
              <li>
                <a
                  href="https://www.google.com/policies/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 dark:text-emerald-400 underline underline-offset-2"
                >
                  Google Play Services
                </a>
              </li>
              <li>
                <a
                  href="https://unity3d.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 dark:text-emerald-400 underline underline-offset-2"
                >
                  Unity Legal Privacy
                </a>
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">3. Data Log dan Diagnostik</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Kami ingin menegaskan bahwa ketika terjadi error pada aplikasi, kami tidak pernah mengumpulkan data pribadi sensitif Anda tanpa izin eksplisit. Laporan diagnostik anonim hanya digunakan untuk perbaikan bug dan stabilitas sistem.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">4. Keamanan dan Perlindungan Data</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Kami menghargai kepercayaan Anda dan menerapkan standar rekayasa perangkat lunak modern untuk menjaga integritas data Anda. Tidak ada transmisi data internet yang 100% tanpa risiko, namun kami terus mengaudit implementasi kami secara berkala.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">5. Kontak Studio</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Jika ada pertanyaan seputar kebijakan privasi ini, silakan hubungi tim kami melalui email resmi di:{" "}
              <a
                href="mailto:frogobox.official@gmail.com"
                className="font-medium text-emerald-600 dark:text-emerald-400 underline underline-offset-2"
              >
                frogobox.official@gmail.com
              </a>
            </p>
          </section>
        </article>
      </main>
    </div>
  );
}
