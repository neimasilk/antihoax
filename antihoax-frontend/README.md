# AntiHoax Cerdas AI - Frontend

Frontend untuk aplikasi verifikasi berita AntiHoax Cerdas AI. Dibangun dengan React dan Tailwind CSS.

## Struktur Proyek (Fokus pada `src`)

\`\`\`
antihoax-frontend/
├── public/
│   ├── index.html
│   └── ... (aset statis lainnya)
├── src/
│   ├── components/  # Komponen UI Reusable
│   │   ├── common/          # Komponen umum (Spinner, Button, Modal, etc.)
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── index.js
│   │   ├── forms/           # Komponen terkait form (Input, Select, etc.)
│   │   │   ├── NewsInput.jsx
│   │   │   └── index.js
│   │   └── results/         # Komponen untuk menampilkan hasil
│   │       ├── VerificationResult.jsx
│   │       └── index.js
│   ├── constants/     # Konstanta aplikasi (event types, string, etc.)
│   ├── hooks/         # Custom React Hooks
│   │   └── useVerification.js
│   ├── pages/         # Komponen halaman utama (containers)
│   │   └── HomePage.jsx
│   ├── services/      # Modul untuk interaksi API
│   │   └── api.js
│   ├── utils/         # Fungsi utilitas
│   │   └── testData.js # (Untuk data uji coba UI jika diperlukan)
│   ├── App.css        # Styling global atau App-specific
│   ├── App.js         # Komponen root aplikasi
│   ├── index.css      # Setup global CSS (misal Tailwind directives)
│   └── index.js       # Titik masuk utama aplikasi React
├── .env.development # Konfigurasi environment development
├── .env.production  # Konfigurasi environment production
├── .gitignore
├── package.json
├── postcss.config.js  # Konfigurasi PostCSS (untuk Tailwind)
└── tailwind.config.js # Konfigurasi Tailwind CSS
\`\`\`

## Komponen Utama (Contoh dengan JSDoc)

### `NewsInput.jsx`
\`\`\`javascript
/**
 * NewsInput Component
 *
 * Textarea khusus untuk memasukkan teks berita yang akan diverifikasi.
 * Menggunakan styling dari Tailwind CSS untuk tampilan modern dan responsif.
 *
 * @component
 * @param {string} value - Nilai teks saat ini dalam textarea.
 * @param {function} onChange - Fungsi callback yang dipanggil ketika teks berubah.
 * @param {string} [placeholder="Masukkan teks berita di sini..."] - Teks placeholder untuk textarea.
 * @param {boolean} [disabled=false] - Status nonaktif textarea, berguna saat proses loading.
 * @returns {JSX.Element} Element textarea yang telah distyling.
 *
 * @example
 * const [news, setNews] = useState("");
 * return <NewsInput value={news} onChange={(e) => setNews(e.target.value)} />
 */
import React from 'react';
// ... (kode komponen lainnya)
\`\`\`
(Untuk komponen lain seperti `VerificationResult.jsx` dan `LoadingSpinner.jsx` akan ditambahkan JSDoc serupa)

## Setup Environment Variables

Buat file `.env.development` dan `.env.production` di root project untuk konfigurasi API URL:

**`.env.development`**:
\`\`\`
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENV=development
\`\`\`

**`.env.production`**:
\`\`\`
REACT_APP_API_URL=https://your-backend-url.com
REACT_APP_ENV=production
\`\`\`

Pastikan file-file environment yang mengandung nilai sensitif (seperti `.env.*.local`) sudah ditambahkan ke `.gitignore`.

## Skrip NPM Utama

- \`npm start\`: Menjalankan aplikasi dalam mode development.
- \`npm run build\`: Mem-bundle aplikasi untuk production.
- \`npm test\`: Menjalankan test runner.

**(Catatan: Karena kendala environment `npm install` saat ini, skrip di atas belum dapat dijalankan.)**

## Ketergantungan Utama

- React
- React DOM
- React Scripts
- Tailwind CSS
- PostCSS
- Autoprefixer

(Detail versi ada di `package.json`)
