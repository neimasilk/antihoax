# Status, To-Do List, dan Saran

File ini akan diisi oleh AI (Gemini) untuk melacak status proyek, daftar pekerjaan, dan saran untuk langkah berikutnya.

## Status Proyek Saat Ini

**Proposal dan Rencana Implementasi MVP telah diperbarui untuk mengintegrasikan DeepSeek API.** File `proposal.md` dan `rencana-implementasi.md` sekarang mencerminkan roadmap 3 minggu yang baru, dengan fokus pada integrasi DeepSeek API, pengembangan fallback, dan pengujian. File `saran.md` telah dihapus karena isinya sudah termuat dalam `proposal.md`.

## To-Do List Prioritas Tinggi (Berdasarkan Roadmap 3 Minggu)

1.  **Week 1: DeepSeek Integration & Core Functionality**
    *   Setup React + Tailwind untuk frontend.
    *   Buat komponen input dan hasil.
    *   Setup integrasi DeepSeek API.
    *   Kembangkan prompt yang optimal untuk deteksi hoaks dalam konteks Indonesia.
    *   Uji berbagai jenis berita Indonesia dengan DeepSeek API.
    *   Bangun backend/API layer dasar menggunakan Node.js dengan Express untuk menghandle request ke DeepSeek.

2.  **Week 2: Enhancement, Fallback & UI Polish**
    *   Implementasi dataset dummy (20-30 hoaks, 20-30 fakta) sebagai cross-reference dan fallback.
    *   Kembangkan sistem rule-based sederhana (deteksi kata kunci, pola) sebagai fallback jika API DeepSeek error atau untuk validasi tambahan.
    *   Perbaikan UI/UX, termasuk loading states saat API call dan visualisasi hasil yang menarik.
    *   Implementasi error handling yang robust untuk API calls dan fallback logic.

3.  **Week 3: Testing, Optimization & Deployment Awal**
    *   A/B testing variasi prompt untuk DeepSeek API.
    *   Optimasi performa, termasuk caching hasil untuk input yang sama jika memungkinkan.
    *   User testing dengan 10-20 orang menggunakan kasus nyata.
    *   Perbaikan berdasarkan feedback.
    *   Deploy prototipe ke Vercel untuk demo dan pengumpulan feedback lebih lanjut.
    *   Dokumentasi penggunaan dasar dan arsitektur.

## Saran "Baby-Step To-Do List" Berikutnya

**Fokus pada Week 1: DeepSeek Integration & Core Functionality.**
*   **Langkah Selanjutnya:** Mulai dengan menyiapkan lingkungan pengembangan frontend dan backend, lalu fokus pada integrasi awal DeepSeek API dan pengembangan prompt. Buat file `progress.md` atau `weekly-log.md` untuk mencatat kemajuan harian/mingguan.