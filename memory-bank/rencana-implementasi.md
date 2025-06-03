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
2.  **Analisis AI Sederhana & Database Hoaks Internal:**
    *   Analisis teks dasar menggunakan pencocokan kata kunci atau pola sederhana yang sering ditemukan dalam hoaks.
    *   Menggunakan database hoaks internal (statis atau diisi manual pada tahap awal) untuk mencocokkan berita.
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

### Tahap 2: Backend Dasar & API Endpoint Verifikasi

*   **Deskripsi:** Membangun server backend sederhana dengan satu endpoint API untuk menerima teks berita dan mengembalikan hasil verifikasi dummy/statis.
*   **Detail Tugas:**
    1.  Inisialisasi proyek Node.js dengan Express.js.
    2.  Buat satu API endpoint (misalnya, `POST /api/verify`).
    3.  Endpoint menerima payload JSON berisi teks berita.
    4.  Untuk MVP, endpoint ini akan mengembalikan respons statis/dummy (misalnya, selalu mengembalikan "Belum Diketahui" atau hasil acak sederhana).
    5.  Pastikan CORS dikonfigurasi agar frontend dapat mengakses API.
*   **Kriteria Keberhasilan/Validasi:**
    *   Frontend dapat mengirim permintaan ke endpoint `/api/verify` dengan teks berita.
    *   Backend menerima permintaan dan mengembalikan respons JSON yang valid (statis).
    *   Frontend dapat menampilkan respons dari backend di area hasil.

### Tahap 3: Implementasi Logika Verifikasi Sederhana & Database Internal

*   **Deskripsi:** Mengimplementasikan logika verifikasi dasar di backend dan menghubungkannya dengan database hoaks internal (bisa berupa array objek JavaScript atau file JSON sederhana pada tahap ini).
*   **Detail Tugas:**
    1.  Buat struktur data sederhana untuk database hoaks internal (misalnya, array objek JavaScript yang berisi `keyword` dan `status`).
        *   Contoh: `[{ keyword: "undian berhadiah bank X", status: "Terindikasi Hoaks", explanation: "Bank X tidak mengadakan undian ini." }]`
    2.  Modifikasi endpoint `/api/verify` di backend:
        *   Menerima teks berita dari request.
        *   Melakukan pencocokan sederhana teks berita dengan `keyword` di database internal.
        *   Jika ada kecocokan, kembalikan `status` dan `explanation` yang sesuai.
        *   Jika tidak ada kecocokan, kembalikan status "Belum Diketahui" atau "Potensi Fakta" (dengan logika sederhana, misal berdasarkan panjang teks atau tidak adanya kata kunci negatif).
    3.  Integrasikan logika ini sehingga frontend menampilkan hasil verifikasi yang lebih dinamis berdasarkan database internal.
*   **Kriteria Keberhasilan/Validasi:**
    *   Jika teks input mengandung keyword dari database hoaks internal, hasil verifikasi yang sesuai ditampilkan.
    *   Jika teks input tidak cocok, status default (misalnya, "Belum Diketahui") ditampilkan.
    *   Aplikasi dapat menangani beberapa contoh kasus hoaks sederhana yang ada di database internal.

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
*   **Database (Internal MVP):** Array JavaScript / File JSON sederhana di backend.
*   **Version Control:** Git, GitHub

## Rencana Selanjutnya (Pasca-MVP)

Setelah MVP berhasil dan feedback terkumpul, pengembangan akan dilanjutkan dengan:

1.  Integrasi model NLP yang lebih canggih (IndoBERT).
2.  Pengembangan database hoaks yang lebih robust (MongoDB).
3.  Implementasi fitur input URL dan OCR untuk gambar.
4.  Fitur pelaporan hoaks oleh pengguna (crowdsourcing).
5.  Modul pembelajaran literasi digital.