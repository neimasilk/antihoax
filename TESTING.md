# Testing Strategy - AntiHoax Cerdas AI

## Overview

Dokumen ini menjelaskan strategi testing komprehensif untuk aplikasi AntiHoax yang mencakup semua komponen yang dikembangkan oleh tim development.

## Test Architecture

### Test Pyramid
```
    /\     E2E Tests (10%)
   /  \    Integration Tests (20%)
  /____\   Unit Tests (70%)
```

### Coverage Goals
- **Unit Tests**: >80% code coverage
- **Integration Tests**: All API endpoints
- **Performance Tests**: <30s response time
- **E2E Tests**: >70% accuracy rate

## Test Categories

### 1. Unit Tests

#### Backend Services

**Location**: `antihoax-backend/tests/`

**Coverage**:
- `verificationService.js` - Core business logic
- `fallbackService.js` - Rule-based analysis
- `datasetService.js` - Dataset operations
- `deepseekService.js` - AI integration
- Controllers and middleware

**Example Test Structure**:
```javascript
// tests/services/fallbackService.test.js
describe('FallbackService', () => {
  test('should detect hoax indicators', () => {
    const text = 'BREAKING: Sensational claim without source!';
    const result = fallbackService.analyzeText(text);
    
    expect(result.result).toBe('hoaks');
    expect(result.confidence).toBeGreaterThan(0.5);
    expect(result.detected_indicators.hoax_indicators).toContain('kata sensasional');
  });
});
```

#### Frontend Components

**Location**: `antihoax-frontend/src/__tests__/`

**Coverage**:
- React components rendering
- User interaction handlers
- API integration hooks
- Utility functions

### 2. Integration Tests

**Location**: `tests/integration.test.js`

**Purpose**: Test API endpoints dengan real backend services

**Test Cases**:
```javascript
describe('API Integration Tests', () => {
  test('POST /api/verify - should analyze hoax text', async () => {
    const response = await request(app)
      .post('/api/verify')
      .send({
        text: 'Pemerintah akan memberikan uang 10 juta untuk semua warga tanpa syarat',
        type: 'text',
        source: 'test'
      });
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(['hoaks', 'fakta', 'perlu_verifikasi']).toContain(response.body.data.result);
  });
});
```

**Scenarios Tested**:
- ✅ Valid text analysis
- ✅ Invalid input handling
- ✅ Rate limiting behavior
- ✅ Error responses
- ✅ Fallback system activation

### 3. Performance Tests

**Location**: `tests/performance.test.js`

**Metrics**:
- Response time < 30 seconds
- Concurrent request handling
- Memory usage monitoring
- CPU utilization

**Test Implementation**:
```javascript
describe('Performance Tests', () => {
  test('should respond within 30 seconds', async () => {
    const startTime = Date.now();
    
    const response = await request(app)
      .post('/api/verify')
      .send({ text: 'Sample news text for performance testing...' })
      .timeout(35000);
    
    const responseTime = Date.now() - startTime;
    expect(responseTime).toBeLessThan(30000);
    expect(response.status).toBe(200);
  }, 35000);
});
```

### 4. End-to-End Tests

**Location**: `tests/e2e/`

**Tools**: Playwright atau Cypress

**User Workflows**:
1. User opens application
2. User inputs news text
3. User clicks verify button
4. System displays analysis result
5. User views detailed explanation

## Test Data

### Sample Dataset

**Location**: `data/sample-news.json`

**Structure**:
```json
{
  "hoaks": [
    {
      "text": "Pemerintah akan memberikan uang 10 juta...",
      "label": "hoaks",
      "confidence": 0.9
    }
  ],
  "fakta": [
    {
      "text": "Menteri Kesehatan mengumumkan program vaksinasi...",
      "label": "fakta",
      "confidence": 0.85
    }
  ],
  "perlu_verifikasi": [
    {
      "text": "Laporan menunjukkan peningkatan kasus...",
      "label": "perlu_verifikasi",
      "confidence": 0.6
    }
  ]
}
```

### Test Categories
- **Hoax Indicators**: Kata sensasional, klaim tanpa sumber, urgency words
- **Fact Indicators**: Sumber resmi, data statistik, referensi kredibel
- **Edge Cases**: Teks pendek, teks panjang, karakter khusus

## Running Tests

### Prerequisites
```bash
# Install dependencies
npm install
cd antihoax-backend && npm install
cd ../antihoax-frontend && npm install
```

### All Tests
```bash
# Run all tests from root directory
npm test
```

### Specific Test Suites
```bash
# Integration tests
npm run test:integration

# Performance tests
npm run test:performance

# E2E tests
npm run test:e2e

# Backend unit tests
cd antihoax-backend
npm test

# Frontend tests
cd antihoax-frontend
npm test
```

### Test with Coverage
```bash
# Backend coverage
cd antihoax-backend
npm run test:coverage

# Frontend coverage
cd antihoax-frontend
npm test -- --coverage
```

## Test Configuration

### Jest Configuration

**Backend** (`antihoax-backend/jest.config.js`):
```javascript
module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/app.js',
    '!src/server.js'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

**Frontend** (`antihoax-frontend/src/setupTests.js`):
```javascript
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

configure({ testIdAttribute: 'data-testid' });
```

### Environment Variables for Testing
```env
# Test environment
NODE_ENV=test
ENABLE_DEEPSEEK_ANALYSIS=false
TEST_TIMEOUT=35000
```

## Continuous Integration

### GitHub Actions Workflow
```yaml
name: Test Suite
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: |
          npm install
          cd antihoax-backend && npm install
          cd ../antihoax-frontend && npm install
      
      - name: Run tests
        run: |
          npm test
          npm run test:integration
          npm run test:performance
```

## Test Results Interpretation

### Success Criteria

**Unit Tests**:
- All tests pass
- Coverage >80%
- No memory leaks

**Integration Tests**:
- All API endpoints respond correctly
- Error handling works as expected
- Fallback system activates when needed

**Performance Tests**:
- Response time <30 seconds
- No timeout errors
- Stable memory usage

**E2E Tests**:
- User workflows complete successfully
- UI responds correctly to API results
- Error states display properly

### Common Issues & Solutions

**Timeout Errors**:
```javascript
// Increase timeout for AI-dependent tests
jest.setTimeout(35000);
```

**API Connection Issues**:
```javascript
// Mock external services in unit tests
jest.mock('../services/deepseekService');
```

**Rate Limiting in Tests**:
```javascript
// Use different test data to avoid rate limits
beforeEach(() => {
  // Reset rate limiter or use test-specific endpoints
});
```

## Quality Metrics

### Automated Checks
- Code coverage reports
- Performance benchmarks
- Security vulnerability scans
- Dependency audit

### Manual Testing Checklist
- [ ] UI responsiveness on different devices
- [ ] Accessibility compliance
- [ ] Cross-browser compatibility
- [ ] Error message clarity
- [ ] Loading states and feedback

## Test Maintenance

### Regular Tasks
1. Update test data monthly
2. Review and update performance benchmarks
3. Add tests for new features
4. Remove obsolete tests
5. Update documentation

### Test Data Refresh
```bash
# Update sample dataset
node scripts/update-test-data.js

# Validate test data integrity
npm run validate:test-data
```

## Debugging Tests

### Debug Mode
```bash
# Run tests in debug mode
npm test -- --verbose

# Run specific test file
npm test -- tests/integration.test.js

# Run with debugging output
DEBUG=antihoax:* npm test
```

### Common Debug Commands
```bash
# Check test coverage
npm run test:coverage

# Run tests with detailed output
npm test -- --detectOpenHandles --forceExit

# Profile test performance
npm test -- --logHeapUsage
```

---

**Last Updated**: 2025-01-27
**Test Suite Version**: 1.0.0
**Maintained by**: AntiHoax Development Team