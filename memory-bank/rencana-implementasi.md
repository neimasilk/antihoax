# Rencana Implementasi Awal (MVP): Aplikasi AntiHoax Cerdas AI

Dokumen ini menguraikan rencana implementasi untuk Minimum Viable Product (MVP) dari Aplikasi AntiHoax Cerdas AI. Fokus MVP adalah menyediakan fungsionalitas inti verifikasi berita berbasis teks dan database hoaks internal.

## Tujuan MVP

1.  Memvalidasi konsep dasar aplikasi verifikasi hoaks.
2.  Menyediakan alat fungsional minimal bagi pengguna untuk mengecek berita berbasis teks.
3.  Mengumpulkan feedback awal untuk pengembangan selanjutnya.

## Fitur Utama MVP

1.  **Input Berita Teks untuk Verifikasi:**
    *   Pengguna dapat memasukkan (copy-paste) teks berita ke dalam aplikasi.
    *   Tidak ada dukungan URL atau gambar untuk MVP.
2.  **Analisis AI dengan DeepSeek API & Database Hoaks Internal:**
    *   Analisis teks utama menggunakan DeepSeek API (`deepseek-chat` V3) dengan prompt engineering untuk deteksi hoaks.
    *   Fallback menggunakan sistem rule-based sederhana (deteksi kata kunci, pola) dan cross-reference dengan dataset dummy lokal (file JSON).
    *   Menggunakan database hoaks internal (file JSON sederhana) untuk mencocokkan berita dan sebagai data dummy.
3.  **Tampilan Hasil Verifikasi Dasar:**
    *   Menampilkan status: "Terindikasi Hoaks", "Potensi Fakta", atau "Belum Diketahui".
    *   Memberikan penjelasan singkat berdasarkan pencocokan database atau analisis pola.

## Tahapan Implementasi MVP

### Tahap 1: Setup Proyek & Antarmuka Dasar (Frontend)

*   **Deskripsi:** Menyiapkan struktur proyek, repository, dan membuat antarmuka pengguna dasar untuk input teks dan tampilan hasil.
*   **Detail Tugas:**
    1.  Inisialisasi proyek React.js dengan Tailwind CSS.
    2.  Buat komponen UI utama:
        *   Area input teks (textarea).
        *   Tombol "Verifikasi".
        *   Area untuk menampilkan hasil verifikasi.
    3.  Implementasikan state management dasar di React untuk menangani input pengguna dan data hasil.
    4.  Styling dasar menggunakan Tailwind CSS agar antarmuka bersih dan fungsional.
*   **Kriteria Keberhasilan/Validasi:**
    *   Pengguna dapat mengetik atau menempelkan teks ke dalam area input.
    *   Tombol "Verifikasi" dapat diklik.
    *   Area hasil siap menampilkan informasi (meskipun belum ada logika verifikasi).
    *   Tampilan responsif minimal pada layar desktop.

### Tahap 2: Integrasi DeepSeek API & Backend

*   **Deskripsi:** Mengintegrasikan DeepSeek API ke backend dan membangun API endpoint untuk verifikasi berita.
*   **Detail Tugas:**
    1.  Inisialisasi proyek Node.js dengan Express.js untuk backend.
    2.  Buat API endpoint (`POST /api/verify`) yang menerima teks berita.
    3.  Implementasikan logika untuk memanggil DeepSeek API dengan prompt yang optimal untuk deteksi hoaks.
    4.  Tangani respons dari DeepSeek API dan format hasilnya.
    5.  Pastikan CORS dikonfigurasi agar frontend dapat mengakses API.
*   **Kriteria Keberhasilan/Validasi:**
    *   Frontend dapat mengirim permintaan ke endpoint `/api/verify` dengan teks berita.
    *   Backend berhasil memanggil DeepSeek API dan mengembalikan respons yang relevan.
    *   Frontend dapat menampilkan hasil verifikasi dari DeepSeek API.

### Tahap 3: Implementasi Fallback & Dataset Dummy

*   **Deskripsi:** Mengembangkan sistem fallback berbasis aturan dan mengintegrasikan dataset dummy untuk cross-reference.
*   **Detail Tugas:**
    1.  Buat dataset dummy hoaks dan fakta dalam format JSON (20-30 entri masing-masing).
    2.  Implementasikan fungsi `fallbackAnalysis(text)` di backend yang menggunakan rule-based detection (kata kunci, pola) dan mencocokkan dengan dataset dummy.
    3.  Modifikasi endpoint `/api/verify` untuk menggunakan `fallbackAnalysis` jika DeepSeek API gagal atau sebagai validasi tambahan.
    4.  Integrasikan logika cross-reference antara output DeepSeek API dan dataset dummy.
*   **Kriteria Keberhasilan/Validasi:**
    *   Sistem fallback berfungsi saat DeepSeek API tidak tersedia atau untuk validasi.
    *   Dataset dummy dapat diakses dan digunakan untuk cross-reference.
    *   Hasil verifikasi mencerminkan kombinasi analisis DeepSeek dan fallback.

### Tahap 4: Pengujian & Refinement Awal

*   **Deskripsi:** Melakukan pengujian internal terhadap fungsionalitas MVP dan melakukan perbaikan kecil.
*   **Detail Tugas:**
    1.  Uji semua alur pengguna utama (input teks, klik verifikasi, lihat hasil).
    2.  Identifikasi dan perbaiki bug minor.
    3.  Pastikan pesan error dasar ditangani dengan baik (misalnya, jika API tidak dapat dijangkau).
    4.  Kumpulkan feedback dari tim internal.
*   **Kriteria Keberhasilan/Validasi:**
    *   MVP berfungsi sesuai dengan fitur yang didefinisikan.
    *   Tidak ada bug kritikal yang menghalangi penggunaan dasar.
    *   Aplikasi siap untuk demo internal atau rilis ke kelompok pengguna terbatas (jika ada).

## Teknologi yang Digunakan (MVP)

*   **Frontend:** React.js, Tailwind CSS
*   **Backend:** Node.js, Express.js
*   **Database (Internal MVP):** File JSON sederhana di backend untuk dataset dummy.
*   **Version Control:** Git, GitHub

## Rencana Selanjutnya (Pasca-MVP)

Setelah MVP berhasil dan feedback terkumpul, pengembangan akan dilanjutkan dengan:

1.  Eksplorasi model NLP lain (misalnya, IndoBERT) dan dukungan bahasa daerah.
2.  Pengembangan database hoaks yang lebih robust (MongoDB).
3.  Implementasi fitur input URL dan OCR untuk gambar.
4.  Fitur pelaporan hoaks oleh pengguna (crowdsourcing).
5.  Modul pembelajaran literasi digital.