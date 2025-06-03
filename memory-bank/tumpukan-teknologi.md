# Tumpukan Teknologi: Aplikasi AntiHoax Cerdas AI

Berdasarkan proposal proyek, berikut adalah rekomendasi tumpukan teknologi yang akan digunakan untuk pengembangan Aplikasi AntiHoax Cerdas AI:

## 1. Frontend (Antarmuka Pengguna)

*   **Framework/Library:** React.js
    *   **Alasan:** Populer, ekosistem yang besar, komponen reusable, performa baik untuk aplikasi web dinamis. Memungkinkan pengembangan antarmuka yang interaktif dan responsif.
*   **Styling:** Tailwind CSS
    *   **Alasan:** Utility-first CSS framework yang mempercepat proses styling, konsisten, dan mudah dikustomisasi. Menghasilkan desain yang modern dan bersih dengan cepat.

## 2. Backend (Logika Sisi Server & API)

*   **Runtime Environment:** Node.js
    *   **Alasan:** Berbasis JavaScript, memungkinkan penggunaan bahasa yang sama untuk frontend dan backend (jika diinginkan). Non-blocking I/O, cocok untuk aplikasi real-time dan berbasis API.
*   **Framework:** Express.js
    *   **Alasan:** Framework minimalis dan fleksibel untuk Node.js, memudahkan pembuatan API RESTful. Banyak digunakan dan memiliki komunitas yang kuat.

## 3. Database

*   **Jenis Database:** NoSQL Document Database
*   **Pilihan:** MongoDB
    *   **Alasan:** Skema fleksibel, cocok untuk menyimpan data hoaks yang mungkin memiliki struktur beragam, serta data pengguna dan laporan. Skalabilitas baik.

## 4. Kecerdasan Buatan (AI) & Pemrosesan Bahasa Alami (NLP)

*   **Model NLP Utama:** DeepSeek API (Model `deepseek-chat` V3)
    *   **Alasan:** Menyediakan kemampuan analisis teks yang canggih dan diharapkan dapat memberikan hasil yang baik untuk deteksi hoaks dalam Bahasa Indonesia setelah pengembangan prompt yang optimal. Model `deepseek-reasoner` (R1) akan dipertimbangkan untuk penggunaan di masa depan.
    *   **Integrasi:** Melalui Backend API (Node.js/Express.js).
*   **Mekanisme Fallback & Validasi Tambahan:**
    *   **Sistem Berbasis Aturan (Rule-Based):** Fungsi `fallbackAnalysis(text)` akan dikembangkan untuk mendeteksi pola, kata kunci, atau karakteristik umum hoaks sebagai lapisan verifikasi tambahan atau jika DeepSeek API tidak tersedia/memberikan respons yang kurang memuaskan.
    *   **Cross-Reference dengan Dataset Dummy Lokal:** Sebuah dataset JSON manual berisi contoh hoaks dan fakta akan digunakan untuk perbandingan cepat dan sebagai bagian dari mekanisme fallback.
*   **Pengembangan Prompt:** Fokus pada pembuatan dan pengujian prompt yang efektif untuk DeepSeek API agar dapat secara akurat mengidentifikasi dan menganalisis potensi hoaks dalam konteks berita berbahasa Indonesia.

## 5. Optical Character Recognition (OCR) - *Ditunda*

*   **Status:** Fitur input gambar dan analisis OCR akan diimplementasikan setelah MVP awal (setelah 3 minggu pertama).
*   **Rencana Awal (jika diimplementasikan):** Tesseract.js atau layanan OCR cloud.

## 6. Penyimpanan & Database

*   **Dataset Dummy Lokal:** File JSON statis yang berisi contoh hoaks dan fakta, dikelola secara manual pada tahap awal.
    *   **Struktur:** Setiap entri akan memiliki atribut seperti `id`, `text`, `type` (hoax/fact), `source` (jika ada), `explanation`.
*   **Database Utama (untuk data pengguna, laporan, dll. di masa depan):** MongoDB
    *   **Alasan:** Skema fleksibel, cocok untuk menyimpan data yang mungkin memiliki struktur beragam. Akan dipertimbangkan setelah MVP.
*   **Integrasi Database Hoaks Eksternal:** Kemampuan untuk terhubung dengan API dari database hoaks eksternal (misalnya, Mafindo API, Kominfo API jika tersedia) akan dipertimbangkan sebagai pengembangan di masa depan untuk memperkaya data verifikasi.

## 7. Hosting & Deployment

*   **Frontend & Backend (Full-stack):**
    *   **Pilihan:** Vercel, Netlify (untuk kemudahan deployment aplikasi React/Node.js).
    *   **Alternatif:** AWS (EC2, Lambda, S3), Google Cloud Platform (App Engine, Cloud Functions) untuk skalabilitas dan kontrol lebih besar.
*   **Database Hosting:** MongoDB Atlas (layanan cloud MongoDB) atau self-hosted.

## 8. Version Control

*   **Sistem:** Git
*   **Platform:** GitHub (atau GitLab, Bitbucket)
    *   **Alasan:** Standar industri untuk manajemen kode sumber, kolaborasi tim, dan pelacakan perubahan.

## Pertimbangan Tambahan

*   **Keamanan:** Implementasi praktik keamanan standar untuk API (HTTPS, otentikasi, otorisasi), validasi input, dan perlindungan data pengguna.
*   **Skalabilitas:** Desain arsitektur yang memungkinkan penskalaan komponen secara independen (misalnya, memisahkan layanan AI jika beban kerja tinggi).
*   **Monitoring & Logging:** Penggunaan alat untuk memantau performa aplikasi dan mencatat log untuk debugging dan analisis.