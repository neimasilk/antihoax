# Dokumen Desain Produk: Aplikasi AntiHoax Cerdas AI

## 1. Pendahuluan

### 1.1. Latar Belakang
Aplikasi ini bertujuan untuk memerangi penyebaran hoaks di Indonesia dengan menyediakan alat verifikasi berita yang mudah diakses, berbasis AI, dan relevan dengan konteks lokal. Hoaks sering kali menyebar melalui media sosial, grup WhatsApp, atau situs berita yang tidak terverifikasi, terutama dalam bahasa Indonesia dan dialek lokal.

### 1.2. Rumusan Masalah
- Penyebaran hoaks yang masif dan cepat di Indonesia.
- Kurangnya alat verifikasi berita yang fokus pada konteks lokal (bahasa, budaya, platform).
- Rendahnya literasi digital masyarakat dalam mengenali dan menanggapi hoaks.

### 1.3. Tujuan Aplikasi
- Menyediakan platform verifikasi berita yang mudah digunakan dan akurat.
- Membantu pengguna mengidentifikasi hoaks dengan cepat.
- Meningkatkan literasi digital masyarakat terkait hoaks.
- Mengurangi dampak negatif penyebaran hoaks.

## 2. Target Pengguna
- Masyarakat umum (terutama usia 18-45 tahun yang aktif di media sosial).
- Institusi pendidikan.
- Jurnalis.
- Organisasi anti-disinformasi.

## 3. Fitur Utama

### 3.1. Input Berita untuk Verifikasi
- **Deskripsi:** Pengguna dapat memasukkan berita dalam bentuk teks, URL, atau gambar (misalnya, tangkapan layar dari WhatsApp atau media sosial).
- **Detail Teknis:**
    - Input teks langsung.
    - Input URL dan gambar dengan fitur OCR (Optical Character Recognition) akan ditunda setelah MVP 3 minggu awal.
    - Dukungan multibahasa (Bahasa Indonesia, Jawa, Sunda, dll.) dengan deteksi bahasa otomatis akan dieksplorasi di tahap selanjutnya.

### 3.2. Mesin Analisis AI dan Integrasi Database Hoaks
- **Deskripsi:** Sistem menggunakan AI untuk menganalisis konten berita dan mencocokkannya dengan database hoaks yang ada.
- **Detail Teknis:**
    - DeepSeek API (`deepseek-chat` V3) akan menjadi model NLP utama untuk menganalisis teks dan mendeteksi pola hoaks. Model `deepseek-reasoner` (R1) akan dipertimbangkan untuk tugas yang lebih kompleks di masa depan.
    - Fallback akan menggunakan sistem rule-based sederhana (deteksi kata kunci, pola) dan cross-reference dengan dataset dummy lokal.
    - Integrasi dengan database hoaks terverifikasi (misalnya, data dari Mafindo, Kominfo, atau database internal) akan dilakukan di tahap selanjutnya setelah MVP awal.

### 3.3. Pelaporan Hoaks oleh Pengguna (Crowdsourcing)
- **Deskripsi:** Pengguna dapat melaporkan berita yang dicurigai sebagai hoaks untuk diverifikasi lebih lanjut.
- **Detail Teknis:**
    - Fitur pelaporan dengan formulir sederhana.
    - Laporan akan diverifikasi oleh tim moderator atau sistem AI lanjutan.
    - Sistem poin atau gamifikasi untuk mendorong partisipasi (opsional).
    - Validasi laporan crowdsourcing melalui voting komunitas atau analisis AI tambahan.

### 3.4. Tampilan Hasil Verifikasi yang Jelas
- **Deskripsi:** Hasil verifikasi disajikan secara jelas dan mudah dipahami.
- **Detail Teknis:**
    - Status verifikasi: "Hoaks", "Fakta", "Meragukan", "Perlu Penelitian Lebih Lanjut".
    - Penjelasan singkat mengenai hasil verifikasi.
    - Sumber referensi atau tautan ke klarifikasi resmi (jika ada).
    - Visualisasi skor kepercayaan (misalnya, persentase kemungkinan fakta/hoaks).
    - Antarmuka ramah pengguna dengan indikator warna (misalnya, merah untuk hoaks, hijau untuk fakta).

### 3.5. Modul Pembelajaran Literasi Digital Interaktif
- **Deskripsi:** Fitur edukasi untuk meningkatkan pemahaman pengguna tentang hoaks dan cara menangkalnya.
- **Detail Teknis:**
    - Kuis interaktif tentang cara mengenali hoaks (misalnya, memeriksa sumber, mendeteksi clickbait, analisis gambar/video).
    - Artikel, infografis, atau video pendek tentang literasi digital.
    - Contoh kasus hoaks lokal dan pembahasannya.
    - Pelacakan progres pengguna dan sertifikat digital (opsional).

## 4. Alur Pengguna (User Flow) - Contoh Sederhana

1.  **Pengguna membuka aplikasi.**
2.  **Pengguna memilih opsi "Verifikasi Berita".**
3.  **Pengguna memasukkan teks/URL/gambar berita.**
4.  **Pengguna menekan tombol "Verifikasi".**
5.  **Sistem memproses input:**
    *   Jika gambar, lakukan OCR.
    *   Analisis teks menggunakan AI.
    *   Pencocokan dengan database hoaks.
6.  **Sistem menampilkan hasil verifikasi:** Status, penjelasan, skor kepercayaan, sumber.
7.  **(Opsional) Pengguna dapat melaporkan berita jika merasa hasil tidak akurat atau berita belum ada di database.**
8.  **(Opsional) Pengguna mengakses modul literasi digital.**

## 5. Desain Antarmuka (Gambaran Umum)
- **Tampilan Utama:** Bersih, modern, dan intuitif.
- **Palet Warna:** Menggunakan warna yang menenangkan dan kontras yang baik untuk keterbacaan. Warna spesifik untuk indikator status (merah, kuning, hijau).
- **Navigasi:** Mudah diakses, dengan menu utama untuk fitur-fitur kunci.
- **Responsif:** Desain yang beradaptasi dengan baik di berbagai ukuran layar (desktop dan mobile).

## 6. Metrik Keberhasilan (Contoh)
- Jumlah pengguna aktif harian/bulanan.
- Jumlah verifikasi berita yang dilakukan.
- Akurasi sistem verifikasi (berdasarkan feedback pengguna atau audit manual).
- Jumlah laporan hoaks yang valid dari pengguna.
- Tingkat penyelesaian modul literasi digital.
- Penurunan waktu rata-rata untuk verifikasi berita.

## 7. Pertimbangan Masa Depan (Potensi Pengembangan)
- Dukungan verifikasi video dan audio.
- Fitur plugin browser untuk verifikasi langsung di laman web.
- Integrasi chatbot untuk verifikasi cepat melalui platform messaging.
- Analisis sentimen publik terhadap suatu isu berdasarkan data media sosial.
- Personalisasi konten literasi digital berdasarkan riwayat pengguna.