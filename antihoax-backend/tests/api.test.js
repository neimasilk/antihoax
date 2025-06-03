// antihoax-backend/tests/api.test.js
const request = require('supertest');
const app = require('../src/app'); // Assuming your Express app is exported from src/app.js
const dotenv = require('dotenv');

dotenv.config({ path: '.env.test' }); // Load test-specific environment variables if any

// Helper function to log test details, makes debugging easier
const logTest = (testName, response) => {
  if (process.env.DEBUG_TESTS === 'true') {
    console.log(`\n🧪 Running Test: ${testName}`);
    if (response) {
      console.log(`Status: ${response.status}`);
      console.log('Body:', JSON.stringify(response.body, null, 2));
    }
  }
};

describe('API Endpoints', () => {
  let server;

  beforeAll((done) => {
    // It's good practice to start and stop the server for tests,
    // especially if your app setup involves async operations or DB connections.
    // For a simple app, directly using 'app' might be fine.
    // For this example, we'll assume 'app' is directly usable.
    // If app.listen is needed:
    // server = app.listen(process.env.PORT || 3002, done);
    // For supertest, you often don't need to manually listen if app is the express app itself.
    done();
  });

  afterAll((done) => {
    // if (server) {
    //   server.close(done);
    // } else {
    //   done();
    // }
    done();
  });

  // Test for Health Check Endpoint (from Phase 1)
  describe('GET /api/health', () => {
    it('should return 200 OK with application status', async () => {
      const testName = 'GET /api/health';
      const response = await request(app).get('/api/health');
      logTest(testName, response);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('status', 'UP'); // From initial app.js
      // expect(response.body).toHaveProperty('environment', process.env.NODE_ENV || 'development'); // from updated /api/health in routes/index.js
      expect(response.body).toHaveProperty('GREETINGS'); // from updated /api/health in routes/index.js
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  // Test for Verification Service Status (from Phase 2)
  describe('GET /api/verify/status', () => {
    it('should return 200 OK with service status', async () => {
      const testName = 'GET /api/verify/status';
      const response = await request(app).get('/api/verify/status');
      logTest(testName, response);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('overall_status');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('dependencies');
      expect(Array.isArray(response.body.dependencies)).toBe(true);
      // Further checks can be added if DeepSeek API key is expected to be configured for tests
    });
  });

  // Tests for Text Verification Endpoint (from Phase 1 & 2)
  describe('POST /api/verify', () => {
    it('should return 400 for empty text', async () => {
      const testName = 'POST /api/verify - Empty Text';
      const response = await request(app)
        .post('/api/verify')
        .send({ text: '' });
      logTest(testName, response);
      expect(response.statusCode).toBe(400);
      expect(response.body.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ msg: 'Text cannot be empty.' })
        ])
      );
    });

    it('should return 400 for text less than 10 characters', async () => {
      const testName = 'POST /api/verify - Short Text';
      const response = await request(app)
        .post('/api/verify')
        .send({ text: 'short' });
      logTest(testName, response);
      expect(response.statusCode).toBe(400);
       expect(response.body.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ msg: 'Text must be at least 10 characters long.' })
        ])
      );
    });

    // This test will make a real API call if DEEPSEEK_API_KEY is set and ENABLE_DEEPSEEK_ANALYSIS is true
    // For CI/CD or automated tests, consider mocking the DeepSeek service or having a dedicated test API key.
    it('should return 200 OK for valid text (mocked or live API call)', async () => {
      const testName = 'POST /api/verify - Valid Text';
      const validText = "This is a valid piece of text that is long enough for analysis by the API.";
      const response = await request(app)
        .post('/api/verify')
        .send({ text: validText, type: 'text' });
      logTest(testName, response);

      expect(response.statusCode).toBe(200); // Or the status code from the service if error
      expect(response.body).toHaveProperty('success');
      expect(response.body).toHaveProperty('data');

      if (response.body.success) {
        expect(response.body.data).toHaveProperty('provider');
        if (response.body.data.provider === 'deepseek') {
            // If DeepSeek was actually called (requires API key and ENABLE_DEEPSEEK_ANALYSIS=true)
            expect(response.body.data).toHaveProperty('is_hoax'); // boolean or null
            expect(response.body.data).toHaveProperty('confidence'); // number
            expect(response.body.data).toHaveProperty('summary'); // string
        } else if (response.body.data.provider === 'fallback') {
            // If DeepSeek was disabled or failed, and fallback was used
            expect(response.body.data.summary).toBeDefined();
        }
      } else {
        // If !result.success, there might be an error message from the service
        expect(response.body.data.error_message).toBeDefined();
      }
    }, 15000); // Increased timeout for potential API call

    it('should handle missing text field gracefully', async () => {
        const testName = 'POST /api/verify - Missing Text Field';
        const response = await request(app)
            .post('/api/verify')
            .send({ source: 'some source' }); // No 'text' field
        logTest(testName, response);
        expect(response.statusCode).toBe(400);
        expect(response.body.errors).toEqual(
            expect.arrayContaining([
              expect.objectContaining({ msg: 'Text cannot be empty.' }) // Or specific message for missing field
            ])
        );
    });
  });

  // Test for Non-Existent Route (from Phase 1)
  describe('GET /api/nonexistentroute', () => {
    it('should return 404 Not Found', async () => {
      const testName = 'GET /api/nonexistentroute';
      const response = await request(app).get('/api/nonexistentroute');
      logTest(testName, response);
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('error', 'Not Found'); // As per app.js 404 handler
    });
  });
});
