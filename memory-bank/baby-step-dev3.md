# Baby-Step Development Guide: Data & Testing Developer (Dev3)

**Role:** Data & Testing Developer - Fallback Systems, Dummy Dataset, and Testing
**Timeline:** Week 1-3 (Parallel with Frontend and Backend teams)
**Prerequisites:** Basic knowledge of data structures, testing frameworks, and JSON

## CRITICAL RULE: DO NOT PROCEED TO NEXT STEP UNTIL ALL TESTS PASS

## Phase 1: Fallback System Implementation (Day 1-2)

### Step 1.1: Create Rule-Based Fallback Service

**Objective:** Implement simple rule-based hoax detection as backup for DeepSeek API

**Tasks:**
1. Create `src/services/fallbackService.js`:
   ```javascript
   class FallbackService {
     constructor() {
       this.hoaxIndicators = [
         'BREAKING!!!', 'SHARE SEBELUM DIHAPUS', 'JANGAN PERCAYA PEMERINTAH',
         'RAHASIA YANG DISEMBUNYIKAN', 'DOKTER TIDAK MAU ANDA TAHU',
         'VAKSIN BERBAHAYA', 'CHIP 5G', 'KONSPIRASI GLOBAL'
       ];
       
       this.factIndicators = [
         'menurut penelitian', 'berdasarkan data', 'sumber resmi',
         'kementerian', 'universitas', 'jurnal ilmiah'
       ];
     }
   
     analyzeText(text) {
       const lowerText = text.toLowerCase();
       let hoaxScore = 0;
       let factScore = 0;
       const foundIndicators = [];
   
       // Check hoax indicators
       this.hoaxIndicators.forEach(indicator => {
         if (lowerText.includes(indicator.toLowerCase())) {
           hoaxScore += 2;
           foundIndicators.push(`Hoax indicator: ${indicator}`);
         }
       });
   
       // Check fact indicators
       this.factIndicators.forEach(indicator => {
         if (lowerText.includes(indicator.toLowerCase())) {
           factScore += 1;
           foundIndicators.push(`Fact indicator: ${indicator}`);
         }
       });
   
       // Determine status
       let status, confidence;
       if (hoaxScore > factScore && hoaxScore > 0) {
         status = 'hoaks';
         confidence = Math.min(0.8, 0.5 + (hoaxScore * 0.1));
       } else if (factScore > hoaxScore && factScore > 0) {
         status = 'fakta';
         confidence = Math.min(0.7, 0.5 + (factScore * 0.1));
       } else {
         status = 'perlu_verifikasi';
         confidence = 0.3;
       }
   
       return {
         status,
         confidence,
         explanation: this.generateExplanation(status, foundIndicators),
         redFlags: foundIndicators,
         reasoning: `Rule-based analysis: hoax score ${hoaxScore}, fact score ${factScore}`
       };
     }
   
     generateExplanation(status, indicators) {
       const explanations = {
         hoaks: 'Konten ini menunjukkan karakteristik hoaks berdasarkan indikator bahasa sensasional dan klaim tanpa bukti.',
         fakta: 'Konten ini menunjukkan karakteristik faktual berdasarkan referensi ke sumber kredibel.',
         perlu_verifikasi: 'Konten ini memerlukan verifikasi lebih lanjut. Silakan cek dengan sumber terpercaya.'
       };
       
       let explanation = explanations[status];
       if (indicators.length > 0) {
         explanation += ` Indikator yang ditemukan: ${indicators.slice(0, 3).join(', ')}.`;
       }
       
       return explanation;
     }
   }
   
   module.exports = new FallbackService();
   ```

**Validation:**
- [ ] Fallback service detects basic hoax indicators
- [ ] Returns consistent response format
- [ ] Handles edge cases (empty text, special characters)

### Step 1.2: Integrate Fallback with Main Service

**Tasks:**
1. Update `src/services/verificationService.js`:
   ```javascript
   // Add at top
   const fallbackService = require('./fallbackService');
   
   // Replace createFallbackResponse method
   createFallbackResponse(text, type, errorMessage) {
     console.log('🔄 Using fallback analysis');
     
     try {
       const fallbackResult = fallbackService.analyzeText(text);
       return {
         ...fallbackResult,
         analysisMethod: 'fallback',
         timestamp: new Date().toISOString(),
         inputType: type,
         inputLength: text.length,
         fallbackReason: errorMessage
       };
     } catch (fallbackError) {
       return {
         status: 'perlu_verifikasi',
         confidence: 0.1,
         explanation: 'Sistem tidak dapat menganalisis konten ini. Silakan verifikasi manual.',
         redFlags: ['Analisis gagal'],
         reasoning: `Both primary and fallback failed: ${errorMessage}`,
         analysisMethod: 'error',
         timestamp: new Date().toISOString(),
         inputType: type,
         inputLength: text.length
       };
     }
   }
   ```

**Validation:**
- [ ] Fallback activates when DeepSeek fails
- [ ] Response format remains consistent
- [ ] Error handling works properly

## Phase 2: Dummy Dataset Implementation (Day 3-4)

### Step 2.1: Create Sample Dataset

**Objective:** Create realistic dummy data for testing and demonstration

**Tasks:**
1. Create `data/sample-news.json`:
   ```json
   {
     "hoaks": [
       {
         "id": "h001",
         "text": "BREAKING!!! Vaksin COVID-19 mengandung chip 5G yang dapat mengontrol pikiran manusia!!! Jangan percaya pemerintah!!! SHARE SEBELUM DIHAPUS!!!",
         "expectedStatus": "hoaks",
         "category": "kesehatan",
         "indicators": ["sensational language", "conspiracy theory", "urgent sharing"]
       },
       {
         "id": "h002",
         "text": "Air putih yang diminum pagi hari dapat menyembuhkan kanker dalam 3 hari! Rahasia yang disembunyikan dokter!",
         "expectedStatus": "hoaks",
         "category": "kesehatan",
         "indicators": ["miracle cure", "hidden secret", "unrealistic claims"]
       }
     ],
     "fakta": [
       {
         "id": "f001",
         "text": "Menurut penelitian dari Universitas Indonesia, tingkat literasi digital di Indonesia meningkat 15% pada tahun 2023 berdasarkan survei terhadap 10,000 responden.",
         "expectedStatus": "fakta",
         "category": "pendidikan",
         "indicators": ["research reference", "credible source", "specific data"]
       }
     ],
     "perlu_verifikasi": [
       {
         "id": "v001",
         "text": "Pemerintah akan menaikkan harga BBM bulan depan menurut sumber internal.",
         "expectedStatus": "perlu_verifikasi",
         "category": "ekonomi",
         "indicators": ["unverified source", "future prediction", "lacks official confirmation"]
       }
     ]
   }
   ```

2. Create `src/services/datasetService.js`:
   ```javascript
   const fs = require('fs');
   const path = require('path');
   
   class DatasetService {
     constructor() {
       this.dataPath = path.join(__dirname, '../../data/sample-news.json');
       this.dataset = null;
       this.loadDataset();
     }
   
     loadDataset() {
       try {
         const data = fs.readFileSync(this.dataPath, 'utf8');
         this.dataset = JSON.parse(data);
         console.log('📊 Dataset loaded successfully');
       } catch (error) {
         console.error('❌ Failed to load dataset:', error.message);
         this.dataset = { hoaks: [], fakta: [], perlu_verifikasi: [] };
       }
     }
   
     findSimilarNews(inputText) {
       if (!this.dataset) return null;
   
       const allNews = [
         ...this.dataset.hoaks,
         ...this.dataset.fakta,
         ...this.dataset.perlu_verifikasi
       ];
   
       // Simple similarity check (can be improved)
       const inputWords = inputText.toLowerCase().split(' ');
       
       for (const news of allNews) {
         const newsWords = news.text.toLowerCase().split(' ');
         const commonWords = inputWords.filter(word => 
           newsWords.includes(word) && word.length > 3
         );
         
         if (commonWords.length >= 3) {
           return {
             ...news,
             similarity: commonWords.length / Math.max(inputWords.length, newsWords.length),
             matchedWords: commonWords
           };
         }
       }
   
       return null;
     }
   
     getTestCases() {
       return this.dataset;
     }
   }
   
   module.exports = new DatasetService();
   ```

**Validation:**
- [ ] Dataset loads correctly
- [ ] Similar news detection works
- [ ] Test cases are accessible

## Phase 3: Comprehensive Testing (Day 5-6)

### Step 3.1: API Integration Tests

**Tasks:**
1. Create `tests/integration.test.js`:
   ```javascript
   const request = require('supertest');
   const app = require('../src/app');
   const datasetService = require('../src/services/datasetService');
   
   describe('Integration Tests', () => {
     const testCases = datasetService.getTestCases();
   
     describe('Hoax Detection', () => {
       testCases.hoaks.forEach(testCase => {
         test(`should detect hoax: ${testCase.id}`, async () => {
           const response = await request(app)
             .post('/api/verify')
             .send({ text: testCase.text, type: 'text' })
             .expect(200);
   
           expect(response.body.success).toBe(true);
           expect(['hoaks', 'perlu_verifikasi']).toContain(response.body.data.status);
         });
       });
     });
   
     describe('Fact Verification', () => {
       testCases.fakta.forEach(testCase => {
         test(`should verify fact: ${testCase.id}`, async () => {
           const response = await request(app)
             .post('/api/verify')
             .send({ text: testCase.text, type: 'text' })
             .expect(200);
   
           expect(response.body.success).toBe(true);
           expect(['fakta', 'perlu_verifikasi']).toContain(response.body.data.status);
         });
       });
     });
   });
   ```

2. Create `tests/performance.test.js`:
   ```javascript
   const request = require('supertest');
   const app = require('../src/app');
   
   describe('Performance Tests', () => {
     test('should respond within 30 seconds', async () => {
       const startTime = Date.now();
       
       await request(app)
         .post('/api/verify')
         .send({ 
           text: 'Test news content for performance testing',
           type: 'text' 
         })
         .expect(200);
       
       const duration = Date.now() - startTime;
       expect(duration).toBeLessThan(30000); // 30 seconds
     }, 35000);
   
     test('should handle concurrent requests', async () => {
       const requests = Array(5).fill().map(() => 
         request(app)
           .post('/api/verify')
           .send({ text: 'Concurrent test', type: 'text' })
       );
       
       const responses = await Promise.all(requests);
       responses.forEach(response => {
         expect(response.status).toBe(200);
       });
     });
   });
   ```

**Validation:**
- [ ] All integration tests pass
- [ ] Performance meets requirements
- [ ] Concurrent requests handled properly

### Step 3.2: End-to-End Testing Script

**Tasks:**
1. Create `scripts/e2e-test.js`:
   ```javascript
   const axios = require('axios');
   const datasetService = require('../src/services/datasetService');
   
   async function runE2ETests() {
     console.log('🧪 Starting E2E tests...');
     
     const baseURL = process.env.API_URL || 'http://localhost:3001';
     const testCases = datasetService.getTestCases();
     let passed = 0;
     let failed = 0;
   
     // Test all categories
     for (const [category, cases] of Object.entries(testCases)) {
       console.log(`\n📋 Testing ${category} cases...`);
       
       for (const testCase of cases) {
         try {
           const response = await axios.post(`${baseURL}/api/verify`, {
             text: testCase.text,
             type: 'text'
           });
           
           const result = response.data.data;
           const isCorrect = result.status === testCase.expectedStatus || 
                           (testCase.expectedStatus === 'hoaks' && result.status === 'perlu_verifikasi');
           
           if (isCorrect) {
             console.log(`✅ ${testCase.id}: ${result.status} (confidence: ${result.confidence})`);
             passed++;
           } else {
             console.log(`❌ ${testCase.id}: Expected ${testCase.expectedStatus}, got ${result.status}`);
             failed++;
           }
         } catch (error) {
           console.log(`❌ ${testCase.id}: Error - ${error.message}`);
           failed++;
         }
       }
     }
     
     console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);
     console.log(`Success rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
     
     return failed === 0;
   }
   
   if (require.main === module) {
     runE2ETests().then(success => {
       process.exit(success ? 0 : 1);
     });
   }
   
   module.exports = { runE2ETests };
   ```

**Validation:**
- [ ] E2E tests run successfully
- [ ] Success rate > 70%
- [ ] All test categories covered

## Phase 4: Documentation and Monitoring (Day 7)

### Step 4.1: Testing Documentation

**Tasks:**
1. Create `docs/TESTING.md`:
   ```markdown
   # Testing Guide
   
   ## Test Categories
   
   ### Unit Tests
   - Fallback service logic
   - Dataset service functionality
   - Individual component testing
   
   ### Integration Tests
   - API endpoint testing with real data
   - Service interaction testing
   - Error handling validation
   
   ### Performance Tests
   - Response time validation (< 30s)
   - Concurrent request handling
   - Memory usage monitoring
   
   ### End-to-End Tests
   - Complete workflow testing
   - Real-world scenario simulation
   - Cross-service validation
   
   ## Running Tests
   
   ```bash
   # All tests
   npm test
   
   # Integration tests only
   npm run test:integration
   
   # E2E tests
   npm run test:e2e
   
   # Performance tests
   npm run test:performance
   ```
   
   ## Test Data
   
   Sample dataset includes:
   - 10+ hoax examples
   - 5+ fact examples  
   - 5+ verification-needed examples
   
   ## Success Criteria
   
   - Unit tests: 100% pass rate
   - Integration tests: 100% pass rate
   - E2E tests: >70% accuracy
   - Performance: <30s response time
   ```

2. Update `package.json` scripts:
   ```json
   {
     "scripts": {
       "test:integration": "jest tests/integration.test.js",
       "test:performance": "jest tests/performance.test.js",
       "test:e2e": "node scripts/e2e-test.js"
     }
   }
   ```

**Validation:**
- [ ] Documentation is complete
- [ ] All test scripts work
- [ ] Success criteria are met

## Final Validation Checklist

### Core Functionality
- [ ] Fallback system works when DeepSeek fails
- [ ] Dataset service loads and functions correctly
- [ ] Similar news detection works
- [ ] All services integrate properly

### Testing Coverage
- [ ] Unit tests cover all services
- [ ] Integration tests validate API endpoints
- [ ] Performance tests meet requirements
- [ ] E2E tests achieve >70% accuracy

### Data Quality
- [ ] Sample dataset is realistic and diverse
- [ ] Test cases cover edge cases
- [ ] Data format is consistent
- [ ] Categories are well-represented

### Documentation
- [ ] Testing procedures are documented
- [ ] Setup instructions are clear
- [ ] Success criteria are defined
- [ ] Troubleshooting guide exists

## Next Steps

1. **Integration**: Coordinate with Dev1 and Dev2 for full system testing
2. **Data Expansion**: Add more diverse test cases
3. **Performance Optimization**: Monitor and improve response times
4. **Production Monitoring**: Set up logging and alerting

## Notes for Junior Developers

- **Test early and often** - Don't wait until the end
- **Use realistic data** - Test with actual news content
- **Monitor performance** - Keep response times under 30 seconds
- **Document everything** - Future developers will thank you
- **Automate testing** - Manual testing doesn't scale

---

**Remember: DO NOT PROCEED TO NEXT STEP UNTIL ALL TESTS PASS**