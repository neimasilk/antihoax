# Baby Step: Setup Proyek Frontend & Antarmuka Dasar

File ini berisi instruksi detail untuk langkah pertama implementasi MVP Aplikasi AntiHoax AI, yaitu menyiapkan struktur proyek frontend dan antarmuka pengguna dasar.

## Deskripsi Baby Step

Mempersiapkan fondasi proyek React.js dengan Tailwind CSS, membuat komponen UI awal untuk input teks berita, tombol verifikasi, dan area untuk menampilkan hasil. Fokus pada struktur direktori yang baik dan fungsionalitas dasar antarmuka tanpa logika verifikasi.

## Sub-Tugas

### Sub-Tugas 1: Inisialisasi Proyek React.js dengan Create React App & Instalasi Tailwind CSS

*   **Deskripsi:** Membuat proyek React baru menggunakan `create-react-app` dan mengintegrasikan Tailwind CSS ke dalam proyek tersebut.
*   **File yang Dibuat/Dimodifikasi:**
    *   Struktur folder dan file standar `create-react-app` (misalnya, `public/`, `src/`, `package.json`, `tailwind.config.js`, `postcss.config.js`, `src/index.css`).
*   **Kriteria Penerimaan/Tes:**
    1.  Proyek React berhasil dibuat dan dapat dijalankan (`npm start` atau `yarn start`).
    2.  Tailwind CSS terinstal dan dikonfigurasi dengan benar (verifikasi dengan menambahkan kelas utilitas Tailwind ke elemen HTML di `src/App.js` dan melihat perubahan styling di browser).
    3.  File `tailwind.config.js` ada dan dikonfigurasi untuk mem-purge CSS yang tidak terpakai dari file `src/**/*.{js,jsx,ts,tsx}`.
    4.  File `src/index.css` (atau file CSS utama lainnya) berisi direktif `@tailwind base;`, `@tailwind components;`, dan `@tailwind utilities;`.

### Sub-Tugas 2: Membuat Struktur Folder Awal untuk Komponen dan Halaman

*   **Deskripsi:** Membuat struktur direktori dasar di dalam folder `src/` untuk mengorganisir komponen UI dan halaman aplikasi.
*   **File yang Dibuat/Dimodifikasi:**
    *   Membuat folder: `src/components/`, `src/pages/`.
*   **Kriteria Penerimaan/Tes:**
    1.  Folder `src/components/` berhasil dibuat.
    2.  Folder `src/pages/` berhasil dibuat.

### Sub-Tugas 3: Membuat Komponen UI Dasar (Input Area, Tombol, Area Hasil)

*   **Deskripsi:** Membuat tiga komponen React fungsional dasar: area input teks (textarea), tombol "Verifikasi", dan area untuk menampilkan hasil verifikasi. Komponen ini belum memiliki logika bisnis, hanya struktur dan styling awal.
*   **File yang Dibuat/Dimodifikasi:**
    *   `src/components/NewsInput.js` (atau nama serupa untuk area input)
    *   `src/components/VerifyButton.js` (atau nama serupa untuk tombol)
    *   `src/components/ResultDisplay.js` (atau nama serupa untuk area hasil)
    *   `src/App.js` (untuk mengimpor dan merender komponen-komponen ini)
*   **Kriteria Penerimaan/Tes:**
    1.  Komponen `NewsInput.js` merender sebuah `textarea` yang dapat menerima input teks pengguna.
    2.  Komponen `VerifyButton.js` merender sebuah `button` dengan teks "Verifikasi" yang dapat diklik.
    3.  Komponen `ResultDisplay.js` merender sebuah `div` yang siap untuk menampilkan teks hasil (awalnya bisa kosong atau berisi placeholder).
    4.  Ketiga komponen ini berhasil diimpor dan ditampilkan dengan benar di dalam `src/App.js`.
    5.  Styling dasar menggunakan Tailwind CSS diterapkan pada komponen agar terlihat rapi dan fungsional (misalnya, padding, margin, border untuk textarea).

### Sub-Tugas 4: Implementasi State Management Dasar di `App.js`

*   **Deskripsi:** Menggunakan hook `useState` di `App.js` untuk mengelola nilai input teks dari `NewsInput` dan data (dummy/placeholder) untuk `ResultDisplay`.
*   **File yang Dibuat/Dimodifikasi:**
    *   `src/App.js`
*   **Kriteria Penerimaan/Tes:**
    1.  `App.js` memiliki state untuk menyimpan teks dari `NewsInput` (misalnya, `newsText`).
    2.  `App.js` memiliki state untuk menyimpan data hasil yang akan ditampilkan di `ResultDisplay` (misalnya, `verificationResult`, awalnya bisa `null` atau objek placeholder).
    3.  Nilai dari `textarea` di `NewsInput` terhubung ke state `newsText` di `App.js` (two-way binding jika diperlukan, atau callback untuk update state).
    4.  `ResultDisplay` menerima `verificationResult` sebagai prop dan menampilkannya (jika ada).
    5.  Ketika tombol "Verifikasi" di `VerifyButton` diklik, sebuah fungsi handler di `App.js` dipanggil (untuk MVP ini, fungsi tersebut bisa sekadar `console.log` nilai `newsText` atau mengubah `verificationResult` menjadi nilai dummy).

### Sub-Tugas 5: Styling Dasar dan Layout Halaman Utama

*   **Deskripsi:** Menerapkan styling dasar menggunakan Tailwind CSS pada `App.js` atau komponen halaman utama untuk mengatur layout komponen-komponen yang sudah dibuat agar terlihat bersih dan fungsional.
*   **File yang Dibuat/Dimodifikasi:**
    *   `src/App.js` (atau file CSS terkait jika ada pemisahan styling lebih lanjut).
*   **Kriteria Penerimaan/Tes:**
    1.  Komponen `NewsInput`, `VerifyButton`, dan `ResultDisplay` tersusun dengan layout yang logis di halaman (misalnya, input di atas, tombol di bawahnya, hasil di bawah tombol).
    2.  Tampilan responsif minimal pada layar desktop (komponen tidak tumpang tindih dan mudah digunakan).
    3.  Penggunaan kelas Tailwind CSS konsisten dan menghasilkan tampilan yang bersih.