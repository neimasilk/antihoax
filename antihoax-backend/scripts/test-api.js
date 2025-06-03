// antihoax-backend/scripts/test-api.js
const axios_SCRIPTS_TEST_API_JS_PLACEHOLDER = require('axios'); // Renamed to avoid collision if axios is not installed
const dotenv =require('dotenv');

dotenv.config(); // Load .env variables

const API_BASE_URL = `http://localhost:${process.env.PORT || 3001}/api`;

const logResponse = (message, data) => {
  console.log(`\n--- ${message} ---`);
  console.log(JSON.stringify(data, null, 2));
};

const logError = (message, error) => {
  console.error(`\n--- ${message} ---`);
  if (error.response) {
    console.error('Status:', error.response.status);
    console.error('Data:', JSON.stringify(error.response.data, null, 2));
  } else if (error.request) {
    console.error('No response received:', error.request);
  } else {
    console.error('Error:', error.message);
  }
};

const runTests = async () => {
  try {
    // 1. Health Check
    try {
      const healthResponse = await axios_SCRIPTS_TEST_API_JS_PLACEHOLDER.get(`${API_BASE_URL}/health`);
      logResponse('Health Check (/api/health)', healthResponse.data);
    } catch (e) {
      logError('Health Check Failed', e);
    }

    // 2. Verification Service Status
    try {
      const statusResponse = await axios_SCRIPTS_TEST_API_JS_PLACEHOLDER.get(`${API_BASE_URL}/verify/status`);
      logResponse('Verification Service Status (/api/verify/status)', statusResponse.data);
    } catch (e) {
      logError('Verification Service Status Failed', e);
    }

    // 3. Verify Text - Valid Request
    // This will use DeepSeek if DEEPSEEK_API_KEY is configured and ENABLE_DEEPSEEK_ANALYSIS=true
    const validTextPayload = {
      text: "Pemerintah mengumumkan rencana stimulus ekonomi baru untuk mengatasi inflasi yang meningkat pesat dalam beberapa bulan terakhir. Para ahli ekonomi memberikan pandangan beragam terhadap efektivitas rencana ini.",
      type: "news_article", // Example type
      source: "https://example.com/news/123" // Example source
    };
    try {
      const verifyValidResponse = await axios_SCRIPTS_TEST_API_JS_PLACEHOLDER.post(`${API_BASE_URL}/verify`, validTextPayload);
      logResponse('Verify Text - Valid (Manually check DeepSeek usage in server logs)', verifyValidResponse.data);
    } catch (e) {
      logError('Verify Text - Valid Failed', e);
    }

    // 4. Verify Text - Invalid Request (Short Text)
    const invalidShortTextPayload = { text: "short" };
    try {
      await axios_SCRIPTS_TEST_API_JS_PLACEHOLDER.post(`${API_BASE_URL}/verify`, invalidShortTextPayload);
      // Should not reach here, expecting a 400 error
    } catch (e) {
      if (e.response && e.response.status === 400) {
        logResponse('Verify Text - Invalid (Short Text) - Expected 400', e.response.data);
      } else {
        logError('Verify Text - Invalid (Short Text) - Unexpected Error or Status', e);
      }
    }

    // 5. Verify Text - Invalid Request (Empty Text)
    const invalidEmptyTextPayload = { text: "" };
    try {
      await axios_SCRIPTS_TEST_API_JS_PLACEHOLDER.post(`${API_BASE_URL}/verify`, invalidEmptyTextPayload);
    } catch (e) {
      if (e.response && e.response.status === 400) {
        logResponse('Verify Text - Invalid (Empty Text) - Expected 400', e.response.data);
      } else {
        logError('Verify Text - Invalid (Empty Text) - Unexpected Error or Status', e);
      }
    }

    // 6. Verify Text - Invalid Request (Missing Text field)
    const invalidMissingTextPayload = { source: "a source without text" };
    try {
      await axios_SCRIPTS_TEST_API_JS_PLACEHOLDER.post(`${API_BASE_URL}/verify`, invalidMissingTextPayload);
    } catch (e) {
      if (e.response && e.response.status === 400) {
        logResponse('Verify Text - Invalid (Missing Text) - Expected 400', e.response.data);
      } else {
        logError('Verify Text - Invalid (Missing Text) - Unexpected Error or Status', e);
      }
    }

    // 7. Non-existent endpoint
    try {
      await axios_SCRIPTS_TEST_API_JS_PLACEHOLDER.get(`${API_BASE_URL}/nonexistent`);
    } catch (e) {
      if (e.response && e.response.status === 404) {
        logResponse('Non-existent Endpoint (/api/nonexistent) - Expected 404', e.response.data);
      } else {
        logError('Non-existent Endpoint - Unexpected Error or Status', e);
      }
    }

    console.log("\n--- API Tests Completed ---");
    console.log("Note: For 'Verify Text - Valid', check server logs to confirm if DeepSeek API was called or if it used a fallback.");
    console.log("Ensure your DEEPSEEK_API_KEY is set in .env for full verification test.");

  } catch (error) {
    logError('Global error during script execution', error);
  }
};

runTests();
