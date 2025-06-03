# Dokumentasi Arsitektur: Aplikasi AntiHoax Cerdas AI

File ini akan digunakan untuk mendokumentasikan keputusan arsitektur, komponen utama, dan bagaimana mereka berinteraksi seiring berjalannya proyek.

## Gambaran Umum Arsitektur

(Akan diisi seiring pengembangan proyek, menjelaskan arsitektur tingkat tinggi, misalnya Monolith, Microservices, Layered, dll.)

## Komponen Utama

(Akan diisi dengan deskripsi komponen-komponen utama sistem, misalnya Frontend, Backend API, Database, Mesin AI, dll.)

### 1. Frontend
*   **Teknologi:** React.js, Tailwind CSS
*   **Peran:** Menyediakan antarmuka pengguna untuk interaksi dengan aplikasi.
*   **Struktur Folder Utama (Contoh):**
    ```
    src/
    ├── components/      # Komponen UI reusable
    ├── pages/           # Komponen untuk setiap halaman/tampilan
    ├── services/        # Logika untuk berinteraksi dengan API backend
    ├── App.js
    └── index.js
    ```

### 2. Backend API
*   **Teknologi:** Node.js, Express.js
*   **Peran:** Menyediakan endpoint API untuk logika bisnis, interaksi database, dan integrasi dengan layanan AI.
*   **Struktur Folder Utama (Contoh):**
    ```
    src/
    ├── controllers/     # Logika request/response
    ├── routes/          # Definisi endpoint API
    ├── services/        # Logika bisnis inti
    ├── models/          # Skema data (jika menggunakan ORM/ODM)
    ├── middleware/      # Middleware kustom
    └── server.js
    ```

### 3. Database
*   **Teknologi:** MongoDB
*   **Peran:** Menyimpan data hoaks, laporan pengguna, data pengguna (jika ada), dll.

### 4. Modul AI/NLP
*   **Teknologi Utama:** DeepSeek API (`deepseek-chat` V3, dengan pertimbangan `deepseek-reasoner` R1 untuk masa depan).
*   **Teknologi Fallback/Pelengkap:** Rule-based detection dan database hoaks statis (JSON).
*   **Potensi Masa Depan:** Eksplorasi model open-source seperti IndoBERT.
*   **Peran:** Melakukan analisis teks, klasifikasi hoaks, dan tugas NLP lainnya. Akan diintegrasikan melalui Backend API.
*   **(Catatan:** Interaksi dengan DeepSeek API akan dikelola oleh Backend API. Fallback logic juga akan berada di Backend API).

## Diagram Arsitektur

(Akan ditambahkan diagram arsitektur jika diperlukan, bisa berupa gambar atau deskripsi teks)

## Alur Data Utama

(Akan diisi dengan penjelasan alur data penting, misalnya alur verifikasi berita dari input pengguna hingga hasil ditampilkan)

## Keputusan Arsitektural Penting

(Akan dicatat keputusan-keputusan arsitektural signifikan yang dibuat selama proyek beserta alasannya)