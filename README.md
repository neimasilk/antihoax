# AntiHoax Cerdas AI - Aplikasi Verifikasi Berita Berbasis AI

## Gambaran Umum

AntiHoax Cerdas AI adalah aplikasi web yang membantu masyarakat Indonesia memverifikasi berita dan meningkatkan literasi digital. Aplikasi ini menggunakan teknologi AI untuk menganalisis konten berita dan mendeteksi potensi hoax atau misinformasi.

## Arsitektur Sistem

### Komponen Utama

1. **Frontend (React.js + Tailwind CSS)**
   - Antarmuka pengguna yang responsif dan modern
   - Komponen UI yang dapat digunakan kembali
   - Integrasi dengan API backend

2. **Backend API (Node.js + Express.js)**
   - RESTful API untuk analisis teks
   - Integrasi dengan DeepSeek AI API
   - Sistem fallback untuk analisis offline
   - Rate limiting dan validasi input

3. **Sistem Analisis AI**
   - **Primary**: DeepSeek API untuk analisis AI canggih
   - **Fallback**: Rule-based detection dengan indikator hoax/fakta
   - Dataset sampel untuk testing dan validasi

4. **Testing & Quality Assurance**
   - Unit tests untuk semua komponen
   - Integration tests untuk API endpoints
   - Performance tests untuk response time
   - End-to-end testing

## Struktur Proyek

```
antihoax/
├── antihoax-frontend/          # Frontend React Application
│   ├── src/
│   │   ├── components/         # UI Components
│   │   ├── pages/             # Page Components
│   │   ├── hooks/             # Custom React Hooks
│   │   ├── services/          # API Integration
│   │   └── utils/             # Utility Functions
│   ├── public/
│   └── package.json
├── antihoax-backend/           # Backend API Service
│   ├── src/
│   │   ├── controllers/       # Request Handlers
│   │   ├── routes/           # API Routes
│   │   ├── services/         # Business Logic
│   │   ├── middleware/       # Custom Middleware
│   │   └── utils/            # Utility Functions
│   ├── docs/                 # API Documentation
│   ├── tests/               # Backend Tests
│   └── package.json
├── data/                     # Sample Dataset
│   └── sample-news.json
├── tests/                    # Integration Tests
├── docs/                     # Project Documentation
├── scripts/                  # Utility Scripts
└── memory-bank/             # Development Documentation
```

## Fitur Utama

### ✅ Analisis Real-time
- Analisis teks berita menggunakan AI
- Response time < 30 detik
- Confidence score untuk setiap analisis

### ✅ Sistem Fallback
- Rule-based detection ketika AI tidak tersedia
- Indikator hoax dan fakta dalam Bahasa Indonesia
- Analisis berbasis kata kunci

### ✅ API yang Robust
- Rate limiting untuk mencegah abuse
- Input validation dan sanitization
- Error handling yang komprehensif
- Structured logging

### ✅ Testing Komprehensif
- Unit tests untuk semua komponen
- Integration tests dengan real data
- Performance testing
- E2E testing workflow

## Quick Start

### Prerequisites
- Node.js (v18+ recommended)
- npm atau yarn
- DeepSeek API Key (opsional)

### Installation

1. **Clone repository:**
   ```bash
   git clone <repository-url>
   cd antihoax
   ```

2. **Install dependencies:**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd antihoax-frontend
   npm install
   
   # Install backend dependencies
   cd ../antihoax-backend
   npm install
   ```

3. **Setup environment variables:**
   ```bash
   # Backend configuration
   cd antihoax-backend
   cp .env.example .env
   # Edit .env file dengan API keys dan konfigurasi
   
   # Frontend configuration
   cd ../antihoax-frontend
   cp .env.example .env.development
   # Edit .env.development dengan URL backend
   ```

4. **Start development servers:**
   ```bash
   # Terminal 1: Start backend
   cd antihoax-backend
   npm run dev
   
   # Terminal 2: Start frontend
   cd antihoax-frontend
   npm start
   ```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:integration
npm run test:performance
npm run test:e2e

# Backend tests
cd antihoax-backend
npm test

# Frontend tests
cd antihoax-frontend
npm test
```

## API Endpoints

### Health Check
```
GET /api/health
```

### Verify News
```
POST /api/verify
Content-Type: application/json

{
  "text": "Teks berita yang akan diverifikasi",
  "type": "text",
  "source": "web-interface"
}
```

### Service Status
```
GET /api/verify/status
```

## Development Team Contributions

### Dev1 - Frontend Developer
- ✅ React application setup dengan Tailwind CSS
- ✅ Responsive UI components
- ✅ API integration hooks
- ✅ User experience optimization

### Dev2 - Backend Developer
- ✅ Express.js API server
- ✅ DeepSeek AI integration
- ✅ Middleware dan validation
- ✅ Rate limiting dan security

### Dev3 - Data & Testing Developer
- ✅ Fallback analysis system
- ✅ Sample dataset creation
- ✅ Comprehensive testing suite
- ✅ Performance monitoring

## Configuration

### Backend Environment Variables
```env
# API Configuration
PORT=3000
NODE_ENV=development

# DeepSeek AI
DEEPSEEK_API_KEY=your_api_key_here
ENABLE_DEEPSEEK_ANALYSIS=true

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend Environment Variables
```env
# API Configuration
REACT_APP_API_URL=http://localhost:3000
REACT_APP_ENVIRONMENT=development
```

## Deployment

### Docker Deployment
```bash
# Build dan run dengan Docker Compose
docker-compose up --build
```

### Manual Deployment
```bash
# Build frontend
cd antihoax-frontend
npm run build

# Start backend in production
cd ../antihoax-backend
npm start
```

## Testing Strategy

### Coverage Goals
- Unit Tests: >80% code coverage
- Integration Tests: All API endpoints
- Performance Tests: <30s response time
- E2E Tests: >70% accuracy

### Test Data
Menggunakan dataset sampel di `data/sample-news.json` yang berisi:
- Contoh berita hoax
- Contoh berita fakta
- Contoh berita yang perlu verifikasi

## Contributing

1. Fork repository
2. Create feature branch
3. Commit changes dengan pesan yang jelas
4. Run tests dan pastikan semua pass
5. Submit pull request

## License

MIT License - lihat file LICENSE untuk detail.

## Support

Untuk pertanyaan atau dukungan:
- Buka issue di GitHub repository
- Hubungi tim development

---

**Status Proyek**: ✅ MVP Complete - Ready for Testing & Integration

**Last Updated**: 2025-01-27
