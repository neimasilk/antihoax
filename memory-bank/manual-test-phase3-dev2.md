# Manual Testing Guide: Phase 3 - API Testing and Refinement (Dev2)

This guide provides manual steps to test the completion of Phase 3 (Step 3.1: Comprehensive API Testing and Step 3.2: Performance and Security Improvements) from `baby-step-dev2.md`.

**Prerequisites:**
*   All steps from Phase 1 and Phase 2 Manual Testing Guides are completed and validated.
*   Node.js and npm installed.
*   All files from `baby-step-dev2.md` for Phases 1, 2, and 3 have been created/updated in the `antihoax-backend` directory.
*   You are in the root of the `antihoax-backend` directory in your terminal.
*   **Crucially, install necessary packages:**
    *   Run `npm install supertest --save-dev` (for `api.test.js`).
    *   Run `npm install axios` (for `scripts/test-api.js`).
    *   Run `npm install express-rate-limit` (for `rateLimiter.js`).
    *   Run `npm install rotating-file-stream` (if you intend to use `requestLogger.js` as a replacement or addition to morgan, and integrate it into `app.js`).
*   **Correct Implemented Placeholders:**
    *   In `antihoax-backend/scripts/test-api.js`, ensure axios is imported correctly: `const axios = require('axios');` (replace any placeholder).
    *   In `antihoax-backend/src/middleware/rateLimiter.js`, ensure express-rate-limit is imported correctly: `const rateLimit = require('express-rate-limit');` (replace any placeholder).
*   A valid `DEEPSEEK_API_KEY` is set in your `.env` file.
*   The server can be started with `npm run dev`.

## Step 3.1: Comprehensive API Testing - Validation

1.  **Run Automated API Tests (Jest & Supertest):**
    *   Ensure `supertest` is installed (`npm install supertest --save-dev`).
    *   In your terminal (from `antihoax-backend` directory), run `npm test`.
    *   **Expected Outcome:**
        *   The test suite defined in `tests/api.test.js` should execute.
        *   All tests should pass. This includes:
            *   `GET /api/health` should return 200 and correct body.
            *   `POST /api/verify` validation for required fields (400 error).
            *   `POST /api/verify` validation for text length (400 error).
            *   `POST /api/verify` with valid input (200 and specific data structure, assuming DeepSeek API is responsive or fallback works).
            *   `GET /api/verify/status` (200 and specific data structure).
        *   *Note:* The test for valid input to `/api/verify` might be slow as it could make a live call to DeepSeek. For more robust unit/integration tests, `deepseekService` would typically be mocked.

2.  **Run Manual Testing Script:**
    *   Ensure `axios` is installed (`npm install axios`).
    *   Correct the `axios` import in `antihoax-backend/scripts/test-api.js` if a placeholder was used.
    *   In your terminal, run `npm run test:manual`.
    *   **Expected Outcome:**
        *   The script will execute, making calls to `/api/health`, `/api/verify` (with multiple test cases), and `/api/verify/status`.
        *   Console output will show results for each test case.
        *   `✅ Health check:` should show status OK.
        *   `🔍 Testing: [Test Case Name]` followed by `✅ Result:` with status, confidence, and method for each verification.
        *   `📊 Service status:` should show the status of DeepSeek and fallback.
        *   All tests should ideally pass or return expected structures. The actual content from DeepSeek will vary.

## Step 3.2: Performance and Security Improvements - Validation

1.  **Test Rate Limiting (`verificationLimiter`):**
    *   Ensure `express-rate-limit` is installed and correctly imported in `src/middleware/rateLimiter.js`.
    *   Ensure `verificationLimiter` is applied to the `POST /api/verify` route in `src/routes/verification.js`.
    *   Restart the server (`npm run dev`).
    *   Using curl or Postman, send more than 10 POST requests to `http://localhost:3001/api/verify` within a 15-minute window from the same IP address.
        ```bash
        # Example using bash loop with curl (send 12 requests)
        for i in {1..12}; do           curl -X POST http://localhost:3001/api/verify             -H "Content-Type: application/json"             -d '{"text": "rate limit test content '$i'"}'             -w "\nResponse Code: %{http_code}\n\n" && sleep 1;         done
        ```
    *   **Expected Outcome:**
        *   The first 10 requests (default `max` for `verificationLimiter`) should receive a 200 OK response (or whatever the API normally returns).
        *   Subsequent requests (11th onwards within the 15-min window) should receive a 429 Too Many Requests status code and a JSON body like:
            ```json
            {
              "error": {
                "message": "Too many verification requests, please try again later",
                "status": 429
              }
            }
            ```

2.  **Verify Custom Request Logging (`requestLogger.js` - if integrated):**
    *   The `baby-step-dev2.md` specifies creating `src/middleware/requestLogger.js` but doesn't show its integration into `app.js`.
    *   If you choose to integrate it (e.g., `app.use(requestLogger);` in `src/app.js`):
        *   Make some requests to various endpoints.
        *   **Expected Outcome:** The console should show JSON formatted logs as defined in `requestLogger.js`, including method, URL, status, duration, IP, User-Agent, timestamp, and inputLength/inputType for verify requests. This would be in *addition* to Morgan's logs if Morgan is also kept.
    *   If not integrated, this logger is available for future use.

3.  **Verify Caching (`cache.js` - if integrated):**
    *   The `baby-step-dev2.md` specifies creating `src/utils/cache.js` but doesn't show its integration into `verificationService.js`.
    *   If you choose to integrate it:
        *   You would modify `verificationService.analyzeNews` to first check the cache for the given input (text and type). If found and not expired, return cached data. Otherwise, call the actual analysis and store the result in the cache.
        *   **Manual Test:**
            1.  Send a POST request to `/api/verify` with a unique text. Observe the response time (and server logs indicating an actual DeepSeek call).
            2.  Send the *exact same* POST request again shortly after.
            3.  **Expected Outcome:** The second request should return significantly faster. Server logs might show a "Cache hit" message (if you added such logging to the cache utility or service) and should *not* show logs related to a new DeepSeek API call for that identical input.
    *   If not integrated, this cache utility is available for future use.

**Important Notes:**
*   The effectiveness of DeepSeek-dependent tests relies on a valid API key and network connectivity.
*   For `tests/api.test.js`, it's common practice to mock external services like DeepSeek to make tests faster, more reliable, and avoid API usage costs. The current `api.test.js` from `baby-step-dev2.md` does not appear to include such mocks, so it would perform live calls.

This concludes the manual testing for Phase 3.
