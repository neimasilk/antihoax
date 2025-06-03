# Manual Testing Guide: Phase 1 - Backend Setup (Dev2)

This guide provides manual steps to test the completion of Phase 1 (Step 1.1: Initialize Node.js Backend Project and Step 1.2: Create Basic API Structure) from `baby-step-dev2.md`.

**Prerequisites:**
*   Node.js and npm installed.
*   All files from `baby-step-dev2.md` for Phase 1 have been created in the `antihoax-backend` directory.
*   You are in the root of the `antihoax-backend` directory in your terminal.

## Step 1.1: Initialize Node.js Backend Project - Validation

1.  **Install Dependencies:**
    *   Open your terminal in the `antihoax-backend` directory.
    *   Run `npm install` (or `npm install express cors helmet morgan dotenv`).
    *   Run `npm install --save-dev nodemon jest supertest`.
    *   **Expected:** All dependencies should install without errors. A `node_modules` directory will be created.

2.  **Start the Development Server:**
    *   Run `npm run dev`.
    *   **Expected:** The server should start, and you should see console output similar to:
        ```
        🚀 Server running on port 3001
        📍 Environment: development
        ```
        (The port and environment might vary if you changed `.env` settings, but default is 3001 and development).

3.  **Test Health Check Endpoint:**
    *   Open a new terminal or a tool like Postman/curl.
    *   Send a GET request to `http://localhost:3001/api/health`.
    *   Using curl: `curl http://localhost:3001/api/health`
    *   **Expected:** A JSON response similar to:
        ```json
        {
          "status": "OK",
          "timestamp": "YYYY-MM-DDTHH:mm:ss.sssZ",
          "environment": "development"
        }
        ```
        (Timestamp will be current, environment should match).

4.  **Test CORS Configuration (Conceptual - requires a frontend):**
    *   While direct testing is harder without a running frontend from a different origin, the `cors` middleware is configured in `src/app.js`. During frontend integration, requests from `http://localhost:3000` (or the `FRONTEND_URL` in `.env`) should not be blocked by CORS.

5.  **Test Error Handling Middleware (404 Not Found):**
    *   Send a GET request to a non-existent endpoint, e.g., `http://localhost:3001/api/nonexistent`.
    *   Using curl: `curl http://localhost:3001/api/nonexistent`
    *   **Expected:** A JSON response with a 404 status code:
        ```json
        {
          "error": {
            "message": "Endpoint not found",
            "status": 404
          }
        }
        ```

## Step 1.2: Create Basic API Structure - Validation

1.  **Test Validation Middleware (Invalid Input):**
    *   Send a POST request to `http://localhost:3001/api/verify` with an invalid body (e.g., text too short).
    *   Using curl:
        ```bash
        curl -X POST http://localhost:3001/api/verify           -H "Content-Type: application/json"           -d '{"text": "short"}'
        ```
    *   **Expected:** A JSON response with a 400 status code and an error message:
        ```json
        {
          "error": {
            "message": "Text must be at least 10 characters long",
            "status": 400
          }
        }
        ```

2.  **Test Validation Middleware (Missing Text):**
    *   Send a POST request to `http://localhost:3001/api/verify` with a body missing the `text` field.
    *   Using curl:
        ```bash
        curl -X POST http://localhost:3001/api/verify           -H "Content-Type: application/json"           -d '{"type": "text"}'
        ```
    *   **Expected:** A JSON response with a 400 status code and an error message:
        ```json
        {
          "error": {
            "message": "Text field is required and must be a string",
            "status": 400
          }
        }
        ```

3.  **Test Verification Endpoint (Valid Input - Mocked Service):**
    *   Send a POST request to `http://localhost:3001/api/verify` with a valid body.
    *   Using curl:
        ```bash
        curl -X POST http://localhost:3001/api/verify           -H "Content-Type: application/json"           -d '{"text": "This is a valid news article for verification.", "type": "text"}'
        ```
    *   **Expected:** A JSON response with a 200 status code. The `verificationService.analyzeNews` is mocked at this stage (as per `baby-step-dev2.md` Step 1.2, `verificationController.js` calls `verificationService.analyzeNews` which isn't fully implemented until Phase 2). You should see a console log on the server: `📝 Verification request: text - This is a valid news article for verification....` and the response will depend on the mock implementation within `verificationService.analyzeNews` if any was included in the initial file creation, or it might error if the service isn't returning a promise that resolves correctly.
    *   *Self-correction from baby-step-dev2.md*: The `verificationService.js` is not created in Phase 1. The `verificationController.js` in Step 1.2 *requires* `../services/verificationService`. If `src/services/verificationService.js` was not created with a placeholder, the server might crash or the endpoint might return a 500 error.
    *   **Refined Expected for Valid Input (assuming `src/services/verificationService.js` is missing or is a very basic placeholder that might not work):**
        *   The server logs the request: `📝 Verification request: text - This is a valid news article...`
        *   The API might return a 500 error if `verificationService.analyzeNews` is not a function or fails. If `verificationService.js` was created with a simple placeholder like:
            ```javascript
            // src/services/verificationService.js (Placeholder for Phase 1)
            class VerificationService {
              async analyzeNews(text, type) {
                console.log('Mock verificationService.analyzeNews called');
                return { status: 'mocked_ok', text, type };
              }
            }
            module.exports = new VerificationService();
            ```
            Then you would expect a 200 OK response:
            ```json
            {
              "success": true,
              "data": {
                "status": "mocked_ok",
                "text": "This is a valid news article for verification.",
                "type": "text"
              },
              "timestamp": "YYYY-MM-DDTHH:mm:ss.sssZ"
            }
            ```
            *Developer Note:* Ensure `src/services/verificationService.js` has at least a placeholder for `analyzeNews` for this test to pass with 200. If it was missed during initial file creation, create it with the placeholder above.

4.  **Check Request Logging:**
    *   Observe the server console output after making requests.
    *   **Expected:** Morgan logger (`morgan('combined')`) should be producing logs for each request, e.g.:
        `::ffff:127.0.0.1 - - [DD/Mon/YYYY:HH:mm:ss +0000] "GET /api/health HTTP/1.1" 200 95 "-" "curl/7.79.1"`

This concludes the manual testing for Phase 1. If all expected outcomes are met, Phase 1 implementation is considered successful.
