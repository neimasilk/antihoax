const axios = require('axios');
// Corrected path for datasetService assuming scripts directory is at root
const datasetService = require('../src/services/datasetService');

async function runE2ETests() {
  console.log('🧪 Starting E2E tests...');

  const baseURL = process.env.API_URL || 'http://localhost:3001';
  const testCases = datasetService.getTestCases();
  let passed = 0;
  let failed = 0;
  let totalTests = 0;

  // Check if test cases are loaded
  if (!testCases || (!testCases.hoaks && !testCases.fakta && !testCases.perlu_verifikasi)) {
    console.error('❌ No test cases loaded from datasetService. E2E tests cannot run.');
    process.exit(1); // Exit with failure if no test cases
  }

  // Test all categories
  for (const [category, cases] of Object.entries(testCases)) {
    if (!cases || cases.length === 0) {
      console.log(`\n📋 No test cases for ${category} category. Skipping.`);
      continue;
    }
    console.log(`\n📋 Testing ${category} cases...`);
    totalTests += cases.length;

    for (const testCase of cases) {
      if (!testCase || !testCase.id || !testCase.text || !testCase.expectedStatus) {
        console.warn(`Skipping invalid test case: ${JSON.stringify(testCase)}`);
        failed++; // Count malformed test cases as failed
        continue;
      }
      try {
        const response = await axios.post(`${baseURL}/api/verify`, {
          text: testCase.text,
          type: 'text' // Assuming 'text' type for these tests
        });

        if (response.data && response.data.data) {
          const result = response.data.data;
          // As per baby-step-dev3.md, for hoaks, 'perlu_verifikasi' is also acceptable.
          const isCorrect = result.status === testCase.expectedStatus ||
                          (testCase.expectedStatus === 'hoaks' && result.status === 'perlu_verifikasi');

          if (isCorrect) {
            console.log(`✅ PASSED: ${testCase.id} (${category}) - Expected: ${testCase.expectedStatus}, Got: ${result.status} (Confidence: ${result.confidence !== undefined ? result.confidence.toFixed(2) : 'N/A'})`);
            passed++;
          } else {
            console.log(`❌ FAILED: ${testCase.id} (${category}) - Expected: ${testCase.expectedStatus}, Got: ${result.status} (Confidence: ${result.confidence !== undefined ? result.confidence.toFixed(2) : 'N/A'})`);
            failed++;
          }
        } else {
          console.log(`❌ ERROR (Malformed Response): ${testCase.id} (${category}) - Response data or response.data.data is missing.`);
          console.log('Raw response:', response.data);
          failed++;
        }
      } catch (error) {
        // Handle network errors or if the server isn't running
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(`❌ ERROR (API Call Failed): ${testCase.id} (${category}) - Status: ${error.response.status}, Data: ${JSON.stringify(error.response.data)}`);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(`❌ ERROR (No Response): ${testCase.id} (${category}) - The server might be down or unreachable at ${baseURL}.`);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log(`❌ ERROR (Request Setup): ${testCase.id} (${category}) - ${error.message}`);
        }
        failed++;
      }
    }
  }

  if (totalTests === 0) {
      console.log('\nNo test cases were found to run.');
      // Decide if this is a success or failure; for now, let's say it's not a failure if no tests.
      // Or, if tests are expected, this could be process.exit(1)
      console.log('\n📊 Results: 0 tests run.');
      process.exit(0);
  }

  const successRate = totalTests > 0 ? (passed / totalTests) * 100 : 0;
  console.log(`\n📊 Results: ${passed} passed, ${failed} failed out of ${totalTests} total tests.`);
  console.log(`Success rate: ${successRate.toFixed(1)}%`);

  // The script exits with 0 if the success rate is > 70%, as per baby-step-dev3.md Phase 3.2 Validation
  // "E2E tests: >70% accuracy"
  if (successRate >= 70.0) {
    console.log("✅ E2E tests passed (met >70% success rate).");
    process.exit(0);
  } else {
    console.log("❌ E2E tests failed (did not meet >70% success rate).");
    process.exit(1);
  }
}

// Ensure the script is executable and calls the main function
if (require.main === module) {
  runE2ETests().catch(error => {
    console.error('Unhandled error during E2E test execution:', error);
    process.exit(1);
  });
}

module.exports = { runE2ETests }; // Export for potential programmatic use
