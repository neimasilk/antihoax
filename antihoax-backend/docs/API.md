# AntiHoax API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
Tidak ada autentikasi yang diperlukan untuk MVP ini.

## Rate Limiting
- **Window**: 15 menit (900000 ms)
- **Max Requests**: 100 requests per window per IP
- **Headers**: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

## Endpoints

### Health Check

#### GET /health
Memeriksa status kesehatan API server.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-01-27T10:30:00.000Z",
  "uptime": 3600.123,
  "environment": "development"
}
```

**Status Codes:**
- `200 OK`: Server berjalan normal
- `500 Internal Server Error`: Server mengalami masalah

---

### News Verification

#### POST /verify
Menganalisis teks berita untuk mendeteksi potensi hoax atau misinformasi.

**Request Body:**
```json
{
  "text": "Teks berita yang akan diverifikasi",
  "type": "text",
  "source": "web-interface"
}
```

**Parameters:**
- `text` (string, required): Teks berita yang akan dianalisis (min: 10 karakter, max: 10000 karakter)
- `type` (string, optional): Jenis input, default "text"
- `source` (string, optional): Sumber request, default "unknown"

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "result": "hoaks",
    "confidence": 0.85,
    "explanation": "Teks mengandung beberapa indikator hoax seperti...",
    "analysis_method": "deepseek_ai",
    "similar_news": [
      {
        "title": "Berita serupa yang ditemukan",
        "similarity": 0.75,
        "label": "hoaks"
      }
    ]
  },
  "timestamp": "2025-01-27T10:30:00.000Z",
  "processing_time_ms": 1250
}
```

**Response (Fallback):**
```json
{
  "success": true,
  "data": {
    "result": "perlu_verifikasi",
    "confidence": 0.60,
    "explanation": "Analisis berbasis aturan mendeteksi beberapa indikator...",
    "analysis_method": "fallback_rules",
    "detected_indicators": {
      "hoax_indicators": ["kata sensasional", "klaim tanpa sumber"],
      "fact_indicators": ["sumber resmi"]
    }
  },
  "timestamp": "2025-01-27T10:30:00.000Z",
  "processing_time_ms": 150
}
```

**Possible Results:**
- `hoaks`: Terindikasi sebagai hoax/misinformasi
- `fakta`: Terindikasi sebagai berita faktual
- `perlu_verifikasi`: Memerlukan verifikasi lebih lanjut

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Teks terlalu pendek. Minimal 10 karakter.",
    "details": {
      "field": "text",
      "received_length": 5,
      "min_length": 10
    }
  },
  "timestamp": "2025-01-27T10:30:00.000Z"
}
```

**Status Codes:**
- `200 OK`: Analisis berhasil
- `400 Bad Request`: Input tidak valid
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error
- `503 Service Unavailable`: AI service tidak tersedia

---

### Service Status

#### GET /verify/status
Memeriksa status layanan verifikasi dan komponen-komponennya.

**Response:**
```json
{
  "success": true,
  "data": {
    "service_status": "operational",
    "components": {
      "deepseek_ai": {
        "status": "operational",
        "enabled": true,
        "last_check": "2025-01-27T10:29:00.000Z"
      },
      "fallback_system": {
        "status": "operational",
        "enabled": true
      },
      "dataset_service": {
        "status": "operational",
        "loaded_entries": 150
      }
    },
    "statistics": {
      "total_requests_today": 1250,
      "success_rate": 0.98,
      "average_response_time_ms": 1800
    }
  },
  "timestamp": "2025-01-27T10:30:00.000Z"
}
```

**Status Codes:**
- `200 OK`: Status berhasil diambil
- `500 Internal Server Error`: Server error

---

## Error Codes

| Code | Description |
|------|-------------|
| `VALIDATION_ERROR` | Input tidak memenuhi validasi |
| `TEXT_TOO_SHORT` | Teks terlalu pendek (< 10 karakter) |
| `TEXT_TOO_LONG` | Teks terlalu panjang (> 10000 karakter) |
| `INVALID_TYPE` | Tipe input tidak valid |
| `AI_SERVICE_ERROR` | Error dari layanan AI |
| `FALLBACK_ERROR` | Error dari sistem fallback |
| `RATE_LIMIT_EXCEEDED` | Melebihi batas rate limiting |
| `INTERNAL_ERROR` | Error internal server |

## Request Examples

### cURL Examples

**Health Check:**
```bash
curl -X GET http://localhost:3000/api/health
```

**Verify News:**
```bash
curl -X POST http://localhost:3000/api/verify \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Pemerintah akan memberikan bantuan tunai langsung kepada seluruh rakyat Indonesia sebesar 10 juta rupiah per orang tanpa syarat apapun.",
    "type": "text",
    "source": "web-interface"
  }'
```

**Service Status:**
```bash
curl -X GET http://localhost:3000/api/verify/status
```

### JavaScript Examples

**Using Fetch API:**
```javascript
// Verify news
const response = await fetch('http://localhost:3000/api/verify', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    text: 'Teks berita yang akan diverifikasi...',
    type: 'text',
    source: 'web-interface'
  })
});

const result = await response.json();
console.log(result);
```

**Using Axios:**
```javascript
const axios = require('axios');

try {
  const response = await axios.post('http://localhost:3000/api/verify', {
    text: 'Teks berita yang akan diverifikasi...',
    type: 'text',
    source: 'web-interface'
  });
  
  console.log(response.data);
} catch (error) {
  console.error('Error:', error.response.data);
}
```

## Response Time Guidelines

- **Target Response Time**: < 30 detik
- **DeepSeek AI**: 15-25 detik (tergantung kompleksitas)
- **Fallback System**: 100-500 ms
- **Health Check**: < 100 ms
- **Status Check**: < 200 ms

## Best Practices

1. **Input Validation**: Selalu validasi input di sisi client sebelum mengirim request
2. **Error Handling**: Implementasikan proper error handling untuk semua kemungkinan response
3. **Rate Limiting**: Respect rate limits dan implementasikan retry logic dengan exponential backoff
4. **Timeout**: Set timeout yang reasonable (minimal 35 detik untuk /verify)
5. **Caching**: Cache hasil untuk teks yang sama untuk mengurangi load server

## Changelog

### v1.0.0 (2025-01-27)
- Initial API release
- Basic news verification endpoint
- Health check dan status endpoints
- Rate limiting implementation
- DeepSeek AI integration
- Fallback system integration
