# Proyek AntiHoax Cerdas AI

Proyek ini bertujuan untuk membangun aplikasi AntiHoax Cerdas berbasis AI yang dapat membantu masyarakat Indonesia memverifikasi berita dan meningkatkan literasi digital.

## Deskripsi Singkat

Aplikasi ini akan memungkinkan pengguna untuk memasukkan berita dalam format teks dan mendapatkan analisis apakah berita tersebut terindikasi hoaks atau fakta. Sistem akan menggunakan **DeepSeek API** sebagai teknologi Natural Language Processing (NLP) utama, didukung oleh mekanisme fallback berbasis aturan dan cross-referencing dengan dataset dummy lokal. Fitur input URL dan gambar, serta modul pembelajaran interaktif, direncanakan untuk pengembangan setelah MVP awal.

## Tujuan Proyek

*   Menyediakan alat verifikasi berita berbasis teks yang mudah diakses dan akurat untuk masyarakat Indonesia sebagai MVP.
*   Membantu mengurangi penyebaran hoaks dan disinformasi.
*   Meningkatkan kesadaran dan kemampuan masyarakat dalam mengenali hoaks (fitur edukasi akan dikembangkan pasca-MVP).

## Fitur Utama (MVP & Rencana Pengembangan)

**MVP (Fokus 3 Minggu Awal):**
*   Verifikasi berita melalui input **teks**.
*   Analisis AI menggunakan **DeepSeek API (`deepseek-chat` V3)** dengan prompt yang dioptimalkan.
*   Implementasi **sistem fallback berbasis aturan** (`fallbackAnalysis(text)`).
*   **Cross-reference dengan dataset dummy lokal** (JSON) berisi contoh hoaks dan fakta.
*   Tampilan hasil verifikasi yang jelas (misalnya, Terindikasi Hoaks, Terindikasi Fakta, Perlu Analisis Lebih Lanjut) beserta penjelasan dari API atau sistem fallback.

**Rencana Pengembangan Selanjutnya (Setelah MVP):**
*   Input berita melalui URL (dengan web scraping).
*   Input berita melalui gambar (dengan OCR).
*   Integrasi dengan database hoaks eksternal (jika tersedia API).
*   Fitur pelaporan hoaks oleh pengguna (crowdsourcing).
*   Modul pembelajaran literasi digital interaktif.
*   Dukungan bahasa daerah (jangka panjang).

## Tumpukan Teknologi (MVP & Rencana Pengembangan)

*   **Frontend:** React.js, Tailwind CSS
*   **Backend API Layer:** Node.js, Express.js (untuk mengelola request ke DeepSeek API dan logika fallback)
*   **Database (MVP):** Dataset dummy lokal dalam format JSON.
*   **Database (Masa Depan):** MongoDB (untuk data pengguna, laporan, dll.)
*   **AI/NLP (MVP):**
    *   **Utama:** DeepSeek API (Model `deepseek-chat` V3, dengan pertimbangan `deepseek-reasoner` R1 di masa depan).
    *   **Fallback:** Sistem berbasis aturan dan cross-reference dataset dummy.
*   **OCR (Ditunda):** Tesseract.js atau layanan cloud (akan diimplementasikan setelah MVP).

## Struktur Proyek (Awal)

```
antihoax/
├── memory-bank/                # Berisi semua dokumen perencanaan & konteks AI
│   ├── proposal.md             # Proposal awal proyek
│   ├── vibe-coding.md          # Panduan metodologi Vibe Coding
│   ├── dokumen-desain-produk.md # PDD/GDD
│   ├── tumpukan-teknologi.md   # Detail tech stack
│   ├── rencana-implementasi.md # Rencana implementasi MVP
│   ├── status-todolist-saran.md # Status, to-do, dan saran dari AI perencana
│   ├── baby-step.md            # Instruksi detail untuk AI koding per iterasi
│   ├── architecture.md         # Dokumentasi arsitektur sistem
│   └── progress.md             # Laporan progres implementasi
├── README.md                   # File ini
└── (folder kode sumber akan dibuat di sini, misal: src/, client/, server/)
```

## Cara Menjalankan Proyek (Akan Diperbarui)

Instruksi untuk menjalankan proyek secara lokal akan ditambahkan di sini setelah implementasi awal selesai.

Umumnya akan melibatkan langkah-langkah seperti:

1.  Clone repositori.
2.  Install dependensi untuk frontend dan backend (misalnya, menggunakan `npm install`).
3.  Konfigurasi environment variables (jika ada).
4.  Jalankan server backend.
5.  Jalankan aplikasi frontend.

## Panduan Vibe Coding

Proyek ini dikembangkan menggunakan metodologi "Vibe Coding" yang menekankan perencanaan terstruktur, kolaborasi manusia-AI yang jelas, dan iterasi cepat. Detail panduan dapat ditemukan di <mcfile path="c:\Users\neima\Documents\antihoax\memory-bank\vibe-coding.md" name="vibe-coding.md"></mcfile>.

## Kontribusi

Informasi mengenai cara berkontribusi akan ditambahkan di masa mendatang.
