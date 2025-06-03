# Baby-Step Development Guide: Backend Developer (Dev2)

**Role:** Backend Developer - API, DeepSeek Integration, and Server Logic
**Timeline:** Week 1-2 (Parallel with Frontend and Data teams)
**Prerequisites:** Basic knowledge of Node.js, Express.js, REST APIs, and API integration

## CRITICAL RULE: DO NOT PROCEED TO NEXT STEP UNTIL ALL TESTS PASS

Each step must be completed and tested thoroughly before moving to the next step. This ensures API reliability and prevents integration issues.

## Phase 1: Project Setup and Basic API Structure (Day 1)

### Step 1.1: Initialize Node.js Backend Project

**Objective:** Set up a clean Node.js project with Express.js and essential middleware

**Tasks:**
1. Create backend project structure:
   ```bash
   mkdir antihoax-backend
   cd antihoax-backend
   npm init -y
   ```

2. Install required dependencies:
   ```bash
   npm install express cors helmet morgan dotenv
   npm install --save-dev nodemon jest supertest
   ```

3. Create project structure:
   ```
   antihoax-backend/
   ├── src/
   │   ├── controllers/
   │   ├── services/
   │   ├── middleware/
   │   ├── routes/
   │   ├── utils/
   │   └── app.js
   ├── tests/
   ├── .env.example
   ├── .gitignore
   └── server.js
   ```

4. Create `server.js`:
   ```javascript
   require('dotenv').config();
   const app = require('./src/app');
   
   const PORT = process.env.PORT || 3001;
   
   app.listen(PORT, () => {
     console.log(`🚀 Server running on port ${PORT}`);
     console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
   });
   ```

5. Create `src/app.js`:
   ```javascript
   const express = require('express');
   const cors = require('cors');
   const helmet = require('helmet');
   const morgan = require('morgan');
   
   const app = express();
   
   // Security middleware
   app.use(helmet());
   
   // CORS configuration
   app.use(cors({
     origin: process.env.FRONTEND_URL || 'http://localhost:3000',
     credentials: true
   }));
   
   // Logging
   app.use(morgan('combined'));
   
   // Body parsing
   app.use(express.json({ limit: '10mb' }));
   app.use(express.urlencoded({ extended: true }));
   
   // Health check endpoint
   app.get('/api/health', (req, res) => {
     res.json({ 
       status: 'OK', 
       timestamp: new Date().toISOString(),
       environment: process.env.NODE_ENV || 'development'
     });
   });
   
   // API routes will be added here
   
   // Error handling middleware
   app.use((err, req, res, next) => {
     console.error('Error:', err);
     res.status(err.status || 500).json({
       error: {
         message: err.message || 'Internal Server Error',
         status: err.status || 500
       }
     });
   });
   
   // 404 handler
   app.use('*', (req, res) => {
     res.status(404).json({
       error: {
         message: 'Endpoint not found',
         status: 404
       }
     });
   });
   
   module.exports = app;
   ```

6. Create `.env.example`:
   ```
   NODE_ENV=development
   PORT=3001
   FRONTEND_URL=http://localhost:3000
   DEEPSEEK_API_KEY=your_deepseek_api_key_here
   DEEPSEEK_API_URL=https://api.deepseek.com/v1
   ```

7. Update `package.json` scripts:
   ```json
   {
     "scripts": {
       "start": "node server.js",
       "dev": "nodemon server.js",
       "test": "jest",
       "test:watch": "jest --watch"
     }
   }
   ```

**Validation Criteria:**
- [ ] Server starts successfully with `npm run dev`
- [ ] Health check endpoint `/api/health` returns correct response
- [ ] CORS is configured correctly (test with frontend)
- [ ] Error handling middleware works (test with invalid endpoint)
- [ ] No security vulnerabilities in dependencies

**Testing:**
```bash
# Test health endpoint
curl http://localhost:3001/api/health

# Expected response:
# {"status":"OK","timestamp":"...","environment":"development"}
```

### Step 1.2: Create Basic API Structure

**Objective:** Set up routing structure and basic middleware

**Tasks:**
1. Create `src/routes/index.js`:
   ```javascript
   const express = require('express');
   const verificationRoutes = require('./verification');
   
   const router = express.Router();
   
   // Mount route modules
   router.use('/verify', verificationRoutes);
   
   module.exports = router;
   ```

2. Create `src/routes/verification.js`:
   ```javascript
   const express = require('express');
   const verificationController = require('../controllers/verificationController');
   const { validateVerificationInput } = require('../middleware/validation');
   
   const router = express.Router();
   
   // POST /api/verify - Main verification endpoint
   router.post('/', validateVerificationInput, verificationController.verifyNews);
   
   module.exports = router;
   ```

3. Create `src/middleware/validation.js`:
   ```javascript
   const validateVerificationInput = (req, res, next) => {
     const { text, type } = req.body;
   
     // Validate required fields
     if (!text || typeof text !== 'string') {
       return res.status(400).json({
         error: {
           message: 'Text field is required and must be a string',
           status: 400
         }
       });
     }
   
     // Validate text length
     if (text.trim().length < 10) {
       return res.status(400).json({
         error: {
           message: 'Text must be at least 10 characters long',
           status: 400
         }
       });
     }
   
     if (text.length > 10000) {
       return res.status(400).json({
         error: {
           message: 'Text must be less than 10,000 characters',
           status: 400
         }
       });
     }
   
     // Validate type if provided
     if (type && !['text', 'url'].includes(type)) {
       return res.status(400).json({
         error: {
           message: 'Type must be either "text" or "url"',
           status: 400
         }
       });
     }
   
     // Sanitize input
     req.body.text = text.trim();
     req.body.type = type || 'text';
   
     next();
   };
   
   module.exports = {
     validateVerificationInput
   };
   ```

4. Create `src/controllers/verificationController.js` (basic structure):
   ```javascript
   const verificationService = require('../services/verificationService');
   
   const verifyNews = async (req, res, next) => {
     try {
       const { text, type } = req.body;
       
       console.log(`📝 Verification request: ${type} - ${text.substring(0, 100)}...`);
       
       const result = await verificationService.analyzeNews(text, type);
       
       res.json({
         success: true,
         data: result,
         timestamp: new Date().toISOString()
       });
     } catch (error) {
       next(error);
     }
   };
   
   module.exports = {
     verifyNews
   };
   ```

5. Update `src/app.js` to use routes:
   ```javascript
   // Add this after body parsing middleware
   const apiRoutes = require('./routes');
   app.use('/api', apiRoutes);
   ```

**Validation Criteria:**
- [ ] API routes are properly structured
- [ ] Validation middleware works correctly
- [ ] Error responses follow consistent format
- [ ] Request logging shows proper information
- [ ] Route mounting works without errors

**Testing:**
```bash
# Test validation with invalid input
curl -X POST http://localhost:3001/api/verify \
  -H "Content-Type: application/json" \
  -d '{"text": "short"}'

# Expected: 400 error with validation message
```

## Phase 2: DeepSeek API Integration (Day 2-3)

### Step 2.1: Create DeepSeek API Service

**Objective:** Implement service to interact with DeepSeek API

**Tasks:**
1. Install additional dependencies:
   ```bash
   npm install axios
   ```

2. Create `src/services/deepseekService.js`:
   ```javascript
   const axios = require('axios');
   
   class DeepSeekService {
     constructor() {
       this.apiKey = process.env.DEEPSEEK_API_KEY;
       this.apiUrl = process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com/v1';
       this.model = 'deepseek-chat';
       
       if (!this.apiKey) {
         console.warn('⚠️  DEEPSEEK_API_KEY not found in environment variables');
       }
     }
   
     async analyzeText(text, type = 'text') {
       if (!this.apiKey) {
         throw new Error('DeepSeek API key not configured');
       }
   
       try {
         const prompt = this.buildPrompt(text, type);
         
         const response = await axios.post(
           `${this.apiUrl}/chat/completions`,
           {
             model: this.model,
             messages: [
               {
                 role: 'system',
                 content: this.getSystemPrompt()
               },
               {
                 role: 'user',
                 content: prompt
               }
             ],
             temperature: 0.3,
             max_tokens: 1000
           },
           {
             headers: {
               'Authorization': `Bearer ${this.apiKey}`,
               'Content-Type': 'application/json'
             },
             timeout: 30000 // 30 seconds timeout
           }
         );
   
         return this.parseResponse(response.data);
       } catch (error) {
         console.error('DeepSeek API Error:', error.response?.data || error.message);
         throw new Error('Failed to analyze text with DeepSeek API');
       }
     }
   
     getSystemPrompt() {
       return `Anda adalah sistem AI yang ahli dalam mendeteksi hoaks dan disinformasi dalam konteks Indonesia. 
       
       Tugas Anda:
       1. Analisis konten berita/informasi yang diberikan
       2. Tentukan status: HOAKS, FAKTA, atau PERLU_VERIFIKASI
       3. Berikan penjelasan yang jelas dalam Bahasa Indonesia
       4. Identifikasi red flags atau indikator yang ditemukan
       5. Berikan tingkat keyakinan (0.0 - 1.0)
       
       Kriteria Hoaks:
       - Klaim tanpa sumber kredibel
       - Bahasa sensasional atau clickbait
       - Informasi yang bertentangan dengan fakta terverifikasi
       - Manipulasi data atau konteks
       - Penyebaran teori konspirasi
       
       Respons harus dalam format JSON yang valid dengan struktur:
       {
         "status": "HOAKS|FAKTA|PERLU_VERIFIKASI",
         "confidence": 0.85,
         "explanation": "Penjelasan detail...",
         "redFlags": ["Indikator 1", "Indikator 2"],
         "reasoning": "Alasan analisis..."
       }`;
     }
   
     buildPrompt(text, type) {
       const typeText = type === 'url' ? 'URL berita' : 'teks berita';
       
       return `Analisis ${typeText} berikut untuk mendeteksi potensi hoaks:
   
   ${text}
   
   Berikan analisis lengkap dalam format JSON yang diminta.`;
     }
   
     parseResponse(apiResponse) {
       try {
         const content = apiResponse.choices[0]?.message?.content;
         if (!content) {
           throw new Error('No content in API response');
         }
   
         // Try to extract JSON from response
         const jsonMatch = content.match(/\{[\s\S]*\}/);
         if (!jsonMatch) {
           throw new Error('No JSON found in response');
         }
   
         const parsed = JSON.parse(jsonMatch[0]);
         
         // Validate required fields
         if (!parsed.status || !parsed.explanation) {
           throw new Error('Invalid response format');
         }
   
         // Normalize status
         parsed.status = parsed.status.toLowerCase();
         
         // Ensure confidence is a number between 0 and 1
         if (typeof parsed.confidence !== 'number') {
           parsed.confidence = 0.5; // Default confidence
         }
         parsed.confidence = Math.max(0, Math.min(1, parsed.confidence));
   
         // Ensure arrays exist
         parsed.redFlags = parsed.redFlags || [];
         
         return parsed;
       } catch (error) {
         console.error('Error parsing DeepSeek response:', error);
         throw new Error('Failed to parse API response');
       }
     }
   
     async healthCheck() {
       if (!this.apiKey) {
         return { status: 'error', message: 'API key not configured' };
       }
   
       try {
         // Simple test request
         await axios.post(
           `${this.apiUrl}/chat/completions`,
           {
             model: this.model,
             messages: [{ role: 'user', content: 'Test' }],
             max_tokens: 1
           },
           {
             headers: {
               'Authorization': `Bearer ${this.apiKey}`,
               'Content-Type': 'application/json'
             },
             timeout: 10000
           }
         );
         
         return { status: 'ok', message: 'DeepSeek API is accessible' };
       } catch (error) {
         return { 
           status: 'error', 
           message: `DeepSeek API error: ${error.response?.status || error.message}` 
         };
       }
     }
   }
   
   module.exports = new DeepSeekService();
   ```

**Validation Criteria:**
- [ ] DeepSeek service can be instantiated without errors
- [ ] API key validation works correctly
- [ ] Prompt building generates appropriate content
- [ ] Response parsing handles various response formats
- [ ] Error handling works for API failures
- [ ] Health check method works

**Testing:**
```javascript
// Create test file: tests/deepseekService.test.js
const deepseekService = require('../src/services/deepseekService');

test('should build prompt correctly', () => {
  const prompt = deepseekService.buildPrompt('Test news', 'text');
  expect(prompt).toContain('Test news');
  expect(prompt).toContain('teks berita');
});
```

### Step 2.2: Create Main Verification Service

**Objective:** Implement the main service that orchestrates news analysis

**Tasks:**
1. Create `src/services/verificationService.js`:
   ```javascript
   const deepseekService = require('./deepseekService');
   
   class VerificationService {
     async analyzeNews(text, type = 'text') {
       console.log(`🔍 Starting analysis for ${type}: ${text.substring(0, 50)}...`);
       
       try {
         // Primary analysis with DeepSeek
         const deepseekResult = await this.analyzeWithDeepSeek(text, type);
         
         // Add metadata
         const result = {
           ...deepseekResult,
           analysisMethod: 'deepseek',
           timestamp: new Date().toISOString(),
           inputType: type,
           inputLength: text.length
         };
         
         console.log(`✅ Analysis completed: ${result.status} (confidence: ${result.confidence})`);
         return result;
         
       } catch (error) {
         console.error('❌ Primary analysis failed:', error.message);
         
         // Fallback will be implemented by Dev3
         // For now, return a basic response
         return this.createFallbackResponse(text, type, error.message);
       }
     }
   
     async analyzeWithDeepSeek(text, type) {
       const startTime = Date.now();
       
       try {
         const result = await deepseekService.analyzeText(text, type);
         
         const duration = Date.now() - startTime;
         console.log(`⏱️  DeepSeek analysis completed in ${duration}ms`);
         
         return result;
       } catch (error) {
         console.error('DeepSeek analysis failed:', error.message);
         throw error;
       }
     }
   
     createFallbackResponse(text, type, errorMessage) {
       return {
         status: 'perlu_verifikasi',
         confidence: 0.3,
         explanation: 'Sistem tidak dapat menganalisis konten ini secara otomatis. Silakan verifikasi manual dengan sumber terpercaya.',
         redFlags: ['Analisis otomatis gagal'],
         reasoning: `Fallback response due to: ${errorMessage}`,
         analysisMethod: 'fallback',
         timestamp: new Date().toISOString(),
         inputType: type,
         inputLength: text.length
       };
     }
   
     async getServiceStatus() {
       const deepseekStatus = await deepseekService.healthCheck();
       
       return {
         deepseek: deepseekStatus,
         fallback: { status: 'ok', message: 'Fallback system ready' },
         overall: deepseekStatus.status === 'ok' ? 'operational' : 'degraded'
       };
     }
   }
   
   module.exports = new VerificationService();
   ```

2. Update `src/controllers/verificationController.js`:
   ```javascript
   const verificationService = require('../services/verificationService');
   
   const verifyNews = async (req, res, next) => {
     try {
       const { text, type } = req.body;
       
       console.log(`📝 Verification request: ${type} - ${text.substring(0, 100)}...`);
       
       const result = await verificationService.analyzeNews(text, type);
       
       res.json({
         success: true,
         data: result,
         timestamp: new Date().toISOString()
       });
     } catch (error) {
       console.error('Controller error:', error);
       next(error);
     }
   };
   
   const getStatus = async (req, res, next) => {
     try {
       const status = await verificationService.getServiceStatus();
       res.json({
         success: true,
         data: status,
         timestamp: new Date().toISOString()
       });
     } catch (error) {
       next(error);
     }
   };
   
   module.exports = {
     verifyNews,
     getStatus
   };
   ```

3. Add status route to `src/routes/verification.js`:
   ```javascript
   // Add this route
   router.get('/status', verificationController.getStatus);
   ```

**Validation Criteria:**
- [ ] Verification service orchestrates analysis correctly
- [ ] Error handling provides appropriate fallback responses
- [ ] Logging provides useful debugging information
- [ ] Service status endpoint works
- [ ] Response format is consistent

## Phase 3: API Testing and Refinement (Day 4)

### Step 3.1: Comprehensive API Testing

**Objective:** Test all API endpoints thoroughly

**Tasks:**
1. Create `tests/api.test.js`:
   ```javascript
   const request = require('supertest');
   const app = require('../src/app');
   
   describe('API Endpoints', () => {
     describe('GET /api/health', () => {
       test('should return health status', async () => {
         const response = await request(app)
           .get('/api/health')
           .expect(200);
         
         expect(response.body.status).toBe('OK');
         expect(response.body.timestamp).toBeDefined();
       });
     });
   
     describe('POST /api/verify', () => {
       test('should validate required fields', async () => {
         const response = await request(app)
           .post('/api/verify')
           .send({})
           .expect(400);
         
         expect(response.body.error.message).toContain('Text field is required');
       });
   
       test('should validate text length', async () => {
         const response = await request(app)
           .post('/api/verify')
           .send({ text: 'short' })
           .expect(400);
         
         expect(response.body.error.message).toContain('at least 10 characters');
       });
   
       test('should accept valid input', async () => {
         const response = await request(app)
           .post('/api/verify')
           .send({ 
             text: 'This is a test news article that is long enough for validation.',
             type: 'text'
           })
           .expect(200);
         
         expect(response.body.success).toBe(true);
         expect(response.body.data).toBeDefined();
         expect(response.body.data.status).toBeDefined();
       });
     });
   
     describe('GET /api/verify/status', () => {
       test('should return service status', async () => {
         const response = await request(app)
           .get('/api/verify/status')
           .expect(200);
         
         expect(response.body.success).toBe(true);
         expect(response.body.data.deepseek).toBeDefined();
         expect(response.body.data.overall).toBeDefined();
       });
     });
   });
   ```

2. Create manual testing script `scripts/test-api.js`:
   ```javascript
   const axios = require('axios');
   
   const BASE_URL = 'http://localhost:3001';
   
   const testCases = [
     {
       name: 'Valid news text',
       data: {
         text: 'Presiden Indonesia mengumumkan kebijakan baru untuk meningkatkan ekonomi digital. Kebijakan ini akan diluncurkan tahun depan setelah melalui proses konsultasi dengan berbagai stakeholder.',
         type: 'text'
       }
     },
     {
       name: 'Suspicious content',
       data: {
         text: 'BREAKING!!! Vaksin COVID-19 mengandung chip 5G yang dapat mengontrol pikiran manusia!!! Jangan percaya pemerintah!!! SHARE SEBELUM DIHAPUS!!!',
         type: 'text'
       }
     },
     {
       name: 'URL input',
       data: {
         text: 'https://www.kompas.com/example-news-article',
         type: 'url'
       }
     }
   ];
   
   async function runTests() {
     console.log('🧪 Starting API tests...');
     
     // Test health endpoint
     try {
       const healthResponse = await axios.get(`${BASE_URL}/api/health`);
       console.log('✅ Health check:', healthResponse.data);
     } catch (error) {
       console.error('❌ Health check failed:', error.message);
       return;
     }
     
     // Test verification endpoint
     for (const testCase of testCases) {
       try {
         console.log(`\n🔍 Testing: ${testCase.name}`);
         const response = await axios.post(`${BASE_URL}/api/verify`, testCase.data);
         console.log('✅ Result:', {
           status: response.data.data.status,
           confidence: response.data.data.confidence,
           method: response.data.data.analysisMethod
         });
       } catch (error) {
         console.error('❌ Test failed:', error.response?.data || error.message);
       }
     }
     
     // Test status endpoint
     try {
       const statusResponse = await axios.get(`${BASE_URL}/api/verify/status`);
       console.log('\n📊 Service status:', statusResponse.data.data);
     } catch (error) {
       console.error('❌ Status check failed:', error.message);
     }
   }
   
   if (require.main === module) {
     runTests();
   }
   
   module.exports = { runTests };
   ```

3. Add test script to `package.json`:
   ```json
   {
     "scripts": {
       "test:manual": "node scripts/test-api.js"
     }
   }
   ```

**Validation Criteria:**
- [ ] All automated tests pass
- [ ] Manual testing script works correctly
- [ ] API handles various input types properly
- [ ] Error responses are consistent and helpful
- [ ] Performance is acceptable (< 30 seconds for analysis)

### Step 3.2: Performance and Security Improvements

**Objective:** Optimize API performance and add security measures

**Tasks:**
1. Add rate limiting middleware `src/middleware/rateLimiter.js`:
   ```javascript
   const rateLimit = require('express-rate-limit');
   
   const createRateLimiter = (windowMs, max, message) => {
     return rateLimit({
       windowMs,
       max,
       message: {
         error: {
           message,
           status: 429
         }
       },
       standardHeaders: true,
       legacyHeaders: false
     });
   };
   
   // Different limits for different endpoints
   const verificationLimiter = createRateLimiter(
     15 * 60 * 1000, // 15 minutes
     10, // limit each IP to 10 requests per windowMs
     'Too many verification requests, please try again later'
   );
   
   const generalLimiter = createRateLimiter(
     15 * 60 * 1000, // 15 minutes
     100, // limit each IP to 100 requests per windowMs
     'Too many requests, please try again later'
   );
   
   module.exports = {
     verificationLimiter,
     generalLimiter
   };
   ```

2. Install rate limiting:
   ```bash
   npm install express-rate-limit
   ```

3. Update routes to use rate limiting:
   ```javascript
   // In src/routes/verification.js
   const { verificationLimiter } = require('../middleware/rateLimiter');
   
   // Apply to verification endpoint
   router.post('/', verificationLimiter, validateVerificationInput, verificationController.verifyNews);
   ```

4. Add request logging middleware `src/middleware/requestLogger.js`:
   ```javascript
   const requestLogger = (req, res, next) => {
     const start = Date.now();
     
     res.on('finish', () => {
       const duration = Date.now() - start;
       const logData = {
         method: req.method,
         url: req.url,
         status: res.statusCode,
         duration: `${duration}ms`,
         ip: req.ip,
         userAgent: req.get('User-Agent'),
         timestamp: new Date().toISOString()
       };
       
       if (req.url.includes('/verify') && req.body) {
         logData.inputLength = req.body.text?.length || 0;
         logData.inputType = req.body.type || 'unknown';
       }
       
       console.log('📊 Request:', JSON.stringify(logData));
     });
     
     next();
   };
   
   module.exports = { requestLogger };
   ```

5. Add caching for repeated requests `src/utils/cache.js`:
   ```javascript
   const crypto = require('crypto');
   
   class SimpleCache {
     constructor(ttlMinutes = 60) {
       this.cache = new Map();
       this.ttl = ttlMinutes * 60 * 1000; // Convert to milliseconds
     }
     
     generateKey(text, type) {
       const content = `${type}:${text}`;
       return crypto.createHash('sha256').update(content).digest('hex');
     }
     
     get(text, type) {
       const key = this.generateKey(text, type);
       const item = this.cache.get(key);
       
       if (!item) return null;
       
       // Check if expired
       if (Date.now() > item.expiry) {
         this.cache.delete(key);
         return null;
       }
       
       console.log('💾 Cache hit for key:', key.substring(0, 8));
       return item.data;
     }
     
     set(text, type, data) {
       const key = this.generateKey(text, type);
       const expiry = Date.now() + this.ttl;
       
       this.cache.set(key, { data, expiry });
       console.log('💾 Cache set for key:', key.substring(0, 8));
     }
     
     clear() {
       this.cache.clear();
       console.log('💾 Cache cleared');
     }
     
     size() {
       return this.cache.size;
     }
   }
   
   module.exports = new SimpleCache(60); // 60 minutes TTL
   ```

**Validation Criteria:**
- [ ] Rate limiting works correctly
- [ ] Request logging provides useful information
- [ ] Caching improves response time for repeated requests
- [ ] Security headers are properly set
- [ ] No sensitive information is logged

## Phase 4: Documentation and Deployment Preparation (Day 5)

### Step 4.1: API Documentation

**Objective:** Create comprehensive API documentation

**Tasks:**
1. Create `docs/API.md`:
   ```markdown
   # AntiHoax Backend API Documentation
   
   ## Base URL
   - Development: `http://localhost:3001`
   - Production: `https://your-backend-url.com`
   
   ## Authentication
   Currently no authentication required for public endpoints.
   
   ## Rate Limiting
   - Verification endpoint: 10 requests per 15 minutes per IP
   - Other endpoints: 100 requests per 15 minutes per IP
   
   ## Endpoints
   
   ### Health Check
   ```
   GET /api/health
   ```
   
   **Response:**
   ```json
   {
     "status": "OK",
     "timestamp": "2024-01-01T00:00:00.000Z",
     "environment": "development"
   }
   ```
   
   ### News Verification
   ```
   POST /api/verify
   ```
   
   **Request Body:**
   ```json
   {
     "text": "News content to verify (10-10000 characters)",
     "type": "text" // or "url"
   }
   ```
   
   **Response:**
   ```json
   {
     "success": true,
     "data": {
       "status": "hoaks|fakta|perlu_verifikasi",
       "confidence": 0.85,
       "explanation": "Detailed explanation in Indonesian",
       "redFlags": ["List of indicators found"],
       "reasoning": "Analysis reasoning",
       "analysisMethod": "deepseek|fallback",
       "timestamp": "2024-01-01T00:00:00.000Z",
       "inputType": "text",
       "inputLength": 150
     },
     "timestamp": "2024-01-01T00:00:00.000Z"
   }
   ```
   
   **Error Response:**
   ```json
   {
     "error": {
       "message": "Error description",
       "status": 400
     }
   }
   ```
   
   ### Service Status
   ```
   GET /api/verify/status
   ```
   
   **Response:**
   ```json
   {
     "success": true,
     "data": {
       "deepseek": {
         "status": "ok|error",
         "message": "Status message"
       },
       "fallback": {
         "status": "ok",
         "message": "Fallback system ready"
       },
       "overall": "operational|degraded"
     }
   }
   ```
   
   ## Error Codes
   - `400`: Bad Request - Invalid input
   - `429`: Too Many Requests - Rate limit exceeded
   - `500`: Internal Server Error - Server error
   
   ## Integration Examples
   
   ### JavaScript (Frontend)
   ```javascript
   const response = await fetch('/api/verify', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       text: 'News content here',
       type: 'text'
     })
   });
   
   const result = await response.json();
   ```
   
   ### cURL
   ```bash
   curl -X POST http://localhost:3001/api/verify \
     -H "Content-Type: application/json" \
     -d '{"text":"News content","type":"text"}'
   ```
   ```

2. Create `README.md` for backend:
   ```markdown
   # AntiHoax Backend
   
   Node.js backend for the AntiHoax AI application with DeepSeek integration.
   
   ## Features
   - News verification using DeepSeek AI
   - Fallback analysis system
   - Rate limiting and security
   - Comprehensive error handling
   - Request caching
   
   ## Setup
   
   1. Install dependencies:
      ```bash
      npm install
      ```
   
   2. Copy environment variables:
      ```bash
      cp .env.example .env
      ```
   
   3. Configure environment variables in `.env`:
      ```
      DEEPSEEK_API_KEY=your_api_key_here
      ```
   
   4. Start development server:
      ```bash
      npm run dev
      ```
   
   ## Testing
   
   ```bash
   # Run automated tests
   npm test
   
   # Run manual API tests
   npm run test:manual
   ```
   
   ## Deployment
   
   ### Environment Variables
   - `NODE_ENV`: Environment (development/production)
   - `PORT`: Server port (default: 3001)
   - `FRONTEND_URL`: Frontend URL for CORS
   - `DEEPSEEK_API_KEY`: DeepSeek API key
   - `DEEPSEEK_API_URL`: DeepSeek API URL
   
   ### Production Build
   ```bash
   npm start
   ```
   
   ## API Documentation
   See [docs/API.md](docs/API.md) for detailed API documentation.
   ```

**Validation Criteria:**
- [ ] API documentation is complete and accurate
- [ ] Examples work correctly
- [ ] Setup instructions are clear
- [ ] All endpoints are documented
- [ ] Error responses are documented

### Step 4.2: Deployment Configuration

**Objective:** Prepare backend for deployment

**Tasks:**
1. Create `Dockerfile`:
   ```dockerfile
   FROM node:18-alpine
   
   WORKDIR /app
   
   # Copy package files
   COPY package*.json ./
   
   # Install dependencies
   RUN npm ci --only=production
   
   # Copy source code
   COPY . .
   
   # Create non-root user
   RUN addgroup -g 1001 -S nodejs
   RUN adduser -S nodejs -u 1001
   
   # Change ownership
   RUN chown -R nodejs:nodejs /app
   USER nodejs
   
   # Expose port
   EXPOSE 3001
   
   # Health check
   HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
     CMD node -e "require('http').get('http://localhost:3001/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"
   
   # Start application
   CMD ["npm", "start"]
   ```

2. Create `docker-compose.yml` for development:
   ```yaml
   version: '3.8'
   
   services:
     backend:
       build: .
       ports:
         - "3001:3001"
       environment:
         - NODE_ENV=development
         - PORT=3001
         - FRONTEND_URL=http://localhost:3000
       env_file:
         - .env
       volumes:
         - .:/app
         - /app/node_modules
       command: npm run dev
   ```

3. Create deployment script `scripts/deploy.sh`:
   ```bash
   #!/bin/bash
   
   echo "🚀 Starting deployment..."
   
   # Build Docker image
   echo "📦 Building Docker image..."
   docker build -t antihoax-backend .
   
   # Run tests
   echo "🧪 Running tests..."
   npm test
   
   if [ $? -eq 0 ]; then
     echo "✅ Tests passed"
   else
     echo "❌ Tests failed, aborting deployment"
     exit 1
   fi
   
   # Deploy (customize based on your deployment platform)
   echo "🌐 Deploying to production..."
   # Add your deployment commands here
   
   echo "✅ Deployment completed"
   ```

4. Update `.gitignore`:
   ```
   node_modules/
   .env
   .env.local
   .env.production
   npm-debug.log*
   yarn-debug.log*
   yarn-error.log*
   .DS_Store
   coverage/
   dist/
   build/
   ```

**Validation Criteria:**
- [ ] Docker image builds successfully
- [ ] Docker container runs without errors
- [ ] Health check works in container
- [ ] Environment variables are properly configured
- [ ] Deployment script is functional

## Final Validation Checklist

**Before marking this phase complete, ensure ALL of the following:**

### Core Functionality
- [ ] Server starts without errors
- [ ] All API endpoints work correctly
- [ ] DeepSeek integration functions properly
- [ ] Validation middleware works as expected
- [ ] Error handling provides appropriate responses
- [ ] Logging provides useful debugging information

### Performance & Security
- [ ] Rate limiting is implemented and working
- [ ] Request caching improves performance
- [ ] Security headers are properly set
- [ ] Input validation prevents malicious input
- [ ] No sensitive data is logged or exposed

### Testing
- [ ] All automated tests pass
- [ ] Manual testing script works correctly
- [ ] API handles edge cases properly
- [ ] Error scenarios are tested
- [ ] Performance is acceptable (< 30 seconds)

### Documentation & Deployment
- [ ] API documentation is complete
- [ ] Setup instructions work for new developers
- [ ] Docker configuration is functional
- [ ] Environment variables are documented
- [ ] Deployment process is defined

### Integration Readiness
- [ ] CORS is configured for frontend
- [ ] API contract matches frontend expectations
- [ ] Response format is consistent
- [ ] Error responses are helpful for frontend
- [ ] Status endpoint provides useful information

## Next Steps (Coordination with Other Teams)

1. **Frontend Integration**: Work with Dev1 to test API integration
2. **Fallback System**: Coordinate with Dev3 for fallback implementation
3. **Dataset Integration**: Work with Dev3 to integrate dummy dataset
4. **Performance Testing**: Test with realistic data volumes
5. **Production Deployment**: Deploy to staging environment

## Notes for Junior Developers

- **Always test each step before proceeding**
- **Use Postman or similar tools to test API endpoints**
- **Monitor server logs for debugging information**
- **Keep API responses consistent and well-structured**
- **Handle errors gracefully and provide helpful messages**
- **Document any changes to the API contract**
- **Use environment variables for all configuration**
- **Never commit API keys or sensitive data**

---

**Remember: DO NOT PROCEED TO NEXT STEP UNTIL ALL TESTS PASS**

This ensures API reliability and prevents integration issues that could affect the entire team's progress.