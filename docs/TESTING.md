# Testing Guide

This document outlines the testing strategy and procedures for the AntiHoax Cerdas application, focusing on the components developed by Dev3 (Fallback System, Dummy Dataset, and Testing Infrastructure).

## Test Categories

### Unit Tests
- **Fallback Service Logic (`src/services/fallbackService.js`)**:
  - Verification of hoax/fact indicator detection.
  - Correctness of `analyzeText` output structure (`status`, `confidence`, `explanation`, `redFlags`, `reasoning`).
  - Behavior with empty text or text with no indicators.
- **Dataset Service Functionality (`src/services/datasetService.js`)**:
  - Successful loading and parsing of `data/sample-news.json`.
  - Error handling for missing or malformed dataset file.
  - Correct functioning of `findSimilarNews` based on keyword matching.
  - `getTestCases` returning the complete and correct dataset structure.
- **Individual Component Testing**:
  - Any helper functions or smaller modules created as part of the services.

### Integration Tests (`tests/integration.test.js`)
- **API Endpoint Testing with Real Data**:
  - Simulates requests to `/api/verify` (once available from Dev2's work on `src/app.js`).
  - Uses test cases from `datasetService.getTestCases()` to validate responses.
  - Checks if the `status` returned by the API for hoax and fact test cases aligns with expectations (e.g., a "hoaks" item might return "hoaks" or "perlu_verifikasi").
- **Service Interaction Testing**:
  - Ensures `verificationService` correctly calls `fallbackService` when primary analysis fails (this is implicitly tested if `/api/verify` uses `verificationService`).
- **Error Handling Validation**:
  - How the API responds to malformed requests or internal errors (though full testing depends on `src/app.js` implementation).

### Performance Tests (`tests/performance.test.js`)
- **Response Time Validation**:
  - Measures the time taken for the `/api/verify` endpoint to respond to typical requests.
  - Aims for response times under 30 seconds as per requirements.
- **Concurrent Request Handling**:
  - Tests the system's ability to handle multiple simultaneous requests to `/api/verify` without failure.
- **Memory Usage Monitoring (Manual/ przyszłościowe)**:
  - While not automated in current scripts, this is a consideration for future profiling if performance issues arise.

### End-to-End Tests (`scripts/e2e-test.js`)
- **Complete Workflow Testing**:
  - Simulates user interaction by sending text to the `/api/verify` endpoint.
  - Uses the `axios` client to make HTTP requests to a running instance of the application (requires `src/app.js` to be running).
- **Real-world Scenario Simulation**:
  - Uses the `sample-news.json` dataset which contains examples of hoaxes, facts, and items needing verification.
- **Cross-Service Validation**:
  - Indirectly tests the chain: API endpoint -> `verificationService` -> `fallbackService` (if triggered) -> response.

## Running Tests

To run the tests, ensure you have Node.js and npm installed. Dependencies should be installed via `npm install`.

```bash
# Run all Jest tests (typically unit and integration tests)
# This command might need to be configured in package.json, e.g., "test": "jest"
npm test

# Run integration tests specifically
npm run test:integration

# Run performance tests specifically
npm run test:performance

# Run End-to-End (E2E) tests
# This requires the server to be running (e.g., node src/app.js or similar)
npm run test:e2e
```
**Note:** `src/app.js` which defines the main application server and the `/api/verify` endpoint is expected to be developed by Dev2. The integration, performance, and E2E tests depend on its existence and functionality.

## Test Data

The primary source of test data is `data/sample-news.json`. This file contains categorized examples:
- **Hoaks**: Text examples that are known to be false or misleading.
  - Example count: Target 2+ (currently as per `baby-step-dev3.md`).
- **Fakta**: Text examples that are known to be factual.
  - Example count: Target 1+ (currently as per `baby-step-dev3.md`).
- **Perlu Verifikasi**: Text examples whose veracity is uncertain without further checks.
  - Example count: Target 1+ (currently as per `baby-step-dev3.md`).

This dataset is used by `datasetService.js` and is crucial for `integration.test.js` and `scripts/e2e-test.js`. The dataset should be expanded over time to cover more diverse scenarios and edge cases.

## Success Criteria

The following criteria define the success of the testing phases:

- **Unit Tests**:
  - Aim for 100% pass rate for all defined unit tests.
  - High code coverage for `fallbackService.js` and `datasetService.js`.
- **Integration Tests**:
  - 100% pass rate for tests against the `/api/verify` endpoint, assuming the endpoint and underlying services function as expected.
  - Failures in these tests would indicate issues with service integration or API endpoint logic.
- **End-to-End Tests**:
  - Target >70% accuracy in correctly classifying items from `sample-news.json` when run against a live server. Accuracy is defined as the API returning the `expectedStatus` or an acceptable alternative (e.g. "perlu_verifikasi" for a "hoaks").
- **Performance Tests**:
  - Average response time for the `/api/verify` endpoint should be <30 seconds.
  - The system should handle a small number of concurrent requests (e.g., 5) without errors or significant degradation in response time.

Meeting these criteria provides confidence in the reliability and correctness of the developed services and their integration into the larger application.
