# Fitur Bulk Import CSV Pendaftaran Layanan

## Deskripsi Fitur
Fitur untuk mengunggah CSV yang berisi daftar kontak/layanan secara massal. Fitur ini dirancang bagi Admin untuk:
- Menggantikan input data secara manual satu per satu.
- Melakukan pendataan massal dari format tabular (Excel/CSV).
- Mencegah data terduplikasi dengan mengecek Nama dan Nomor WhatsApp.
- Jika Kategori tidak ada, sistem akan membuatkan kategori baru secara otomatis.

## Lokasi Spesifik
Fitur ini tertanam di file `app/admin/page.tsx` dan hanya dirender jika tab aktif berada di `services.json`.

## Cara Kerja (CSV Parsing Logic)
1. System membaca baris per baris.
2. System secara tak kentara akan mendeteksi separator antara `,` atau `;` berdasar isian baris *header*.
3. Sistem mendeteksi Quote `"` apabila di dalam teks terdapat karakter koma agar tidak error pemotongan data.
4. Urutan Mapping Wajib:
   `[Kategori, Icon, Deskripsi, Nama, WhatsApp, Alamat]`
5. Hasil mapping secara langsung (*real-time*) di-render ke dalam JSON Editor tab Admin.
6. Admin diberikan otoritas absolut untuk merevisi visualisasi JSON tersebut SEBELUM disimpan / diunggah ke CMS menggunakan endpoint `POST /api/cms`.

## Format Standar CSV
```
Kategori,Icon,Deskripsi,Nama,WhatsApp,Alamat
Tukang Taman,🌿,Jasa merapikan taman dan potong rumput,Pak Joko,08123456789,Jl. Mawar No. 12
Ahli Pijat,💆‍♂️,Pijat tradisional panggilan,Ibu Ayu,08561234123,Jl. Kemerdekaan No. 1
```

## Status
Telah Diimplementasikan pada 12 April 2026. Tombol "Template CSV" juga ditambahkan.
Semua perubahan sukses di-*render* secara sempurna.
