# Proyek AntiHoax Cerdas AI

Proyek ini bertujuan untuk membangun aplikasi AntiHoax Cerdas berbasis AI yang dapat membantu masyarakat Indonesia memverifikasi berita dan meningkatkan literasi digital.

## Deskripsi Singkat

Aplikasi ini akan memungkinkan pengguna untuk memasukkan berita (teks, URL, atau gambar) dan mendapatkan analisis apakah berita tersebut terindikasi hoaks atau fakta. Sistem akan menggunakan teknologi Natural Language Processing (NLP) dan Machine Learning (ML) untuk menganalisis konten, serta terintegrasi dengan database hoaks yang relevan dengan konteks Indonesia. Selain itu, aplikasi akan menyediakan modul pembelajaran interaktif untuk meningkatkan literasi digital pengguna.

## Tujuan Proyek

*   Menyediakan alat verifikasi berita yang mudah diakses dan akurat untuk masyarakat Indonesia.
*   Membantu mengurangi penyebaran hoaks dan disinformasi.
*   Meningkatkan kesadaran dan kemampuan masyarakat dalam mengenali hoaks.

## Fitur Utama (Direncakanan)

*   Verifikasi berita melalui input teks, URL, dan gambar (dengan OCR).
*   Analisis AI untuk deteksi pola hoaks.
*   Integrasi dengan database hoaks lokal dan nasional.
*   Fitur pelaporan hoaks oleh pengguna (crowdsourcing).
*   Tampilan hasil verifikasi yang jelas (Hoaks, Fakta, Meragukan) beserta penjelasan.
*   Modul pembelajaran literasi digital interaktif.

## Tumpukan Teknologi (Direncakanan)

*   **Frontend:** React.js, Tailwind CSS
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB
*   **AI/NLP:** IndoBERT, TensorFlow.js/Python (TensorFlow/PyTorch)
*   **OCR:** Tesseract.js

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
