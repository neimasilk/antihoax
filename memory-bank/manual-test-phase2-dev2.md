# Manual Testing Guide: Phase 2 - DeepSeek API Integration (Dev2)

This guide provides manual steps to test the completion of Phase 2 (Step 2.1: Create DeepSeek API Service and Step 2.2: Create Main Verification Service) from `baby-step-dev2.md`.

**Prerequisites:**
*   All steps from Phase 1 Manual Testing Guide are completed and validated.
*   Node.js and npm installed.
*   All files from `baby-step-dev2.md` for Phase 1 and Phase 2 have been created/updated in the `antihoax-backend` directory.
*   You are in the root of the `antihoax-backend` directory in your terminal.
*   **Crucially, `axios` must be installed:** Run `npm install axios` in the `antihoax-backend` directory.
*   The file `antihoax-backend/src/services/deepseekService.js` should correctly import axios using `const axios = require('axios');`. If a placeholder was used during file creation, it must be corrected.
*   A valid `DEEPSEEK_API_KEY` must be set in your `.env` file (copied from `.env.example` and filled). Example: `DEEPSEEK_API_KEY=your_actual_api_key`
*   The `DEEPSEEK_API_URL` in `.env` should be correct (default is `https://api.deepseek.com/v1`).

## Step 2.1: Create DeepSeek API Service - Validation (Indirect)

Direct unit testing for `deepseekService.js` is specified in `baby-step-dev2.md` (e.g., `tests/deepseekService.test.js`). For manual testing, its functionality will be validated primarily through the `verificationService` in Step 2.2.

**Conceptual Checks for `deepseekService.js`:**
1.  **API Key Configuration:**
    *   Ensure `DEEPSEEK_API_KEY` is loaded correctly from `.env`. If not, the service will throw an error or log a warning.
2.  **Prompt Construction:**
    *   Review `getSystemPrompt()` and `buildPrompt()` methods in `src/services/deepseekService.js`. Ensure they construct prompts as described in `baby-step-dev2.md`. The system prompt is crucial for the AI's behavior.
3.  **Response Parsing:**
    *   Review `parseResponse()`. It should correctly extract JSON from the DeepSeek API's response and normalize fields like `status` and `confidence`.
4.  **Error Handling:**
    *   The service includes try-catch blocks for API calls and parsing. Errors should be logged and re-thrown or handled.

## Step 2.2: Create Main Verification Service - Validation

1.  **Start/Restart the Development Server:**
    *   If the server is running, stop it (Ctrl+C) and restart it using `npm run dev` to load all changes.
    *   **Expected:** Server starts without errors.

2.  **Test the `/api/verify/status` Endpoint:**
    *   Send a GET request to `http://localhost:3001/api/verify/status`.
    *   Using curl: `curl http://localhost:3001/api/verify/status`
    *   **Expected Outcome (with valid API Key):** A JSON response indicating the status of services.
        ```json
        {
          "success": true,
          "data": {
            "deepseek": {
              "status": "ok", // or "error" if API key is invalid/unreachable
              "message": "DeepSeek API is accessible" // or an error message
            },
            "fallback": {
              "status": "ok",
              "message": "Fallback system ready"
            },
            "overall": "operational" // or "degraded"
          },
          "timestamp": "YYYY-MM-DDTHH:mm:ss.sssZ"
        }
        ```
    *   **Expected Outcome (DeepSeek API Key NOT configured or invalid):**
        The `deepseek.status` would likely be `"error"` and `deepseek.message` would indicate an API key issue or connection problem. The server should still respond gracefully.

3.  **Test the `/api/verify` Endpoint (Now with DeepSeek Integration):**
    *   **Prerequisite:** Ensure `DEEPSEEK_API_KEY` in `.env` is valid and your machine has internet access.
    *   Send a POST request to `http://localhost:3001/api/verify` with valid news text.
    *   Using curl:
        ```bash
        curl -X POST http://localhost:3001/api/verify           -H "Content-Type: application/json"           -d '{"text": "Presiden Indonesia baru saja mengumumkan kebijakan ekonomi terbaru untuk tahun depan.", "type": "text"}'
        ```
    *   **Expected Outcome (Successful DeepSeek Analysis):**
        *   The server logs will show:
            *   `📝 Verification request: text - Presiden Indonesia baru saja...`
            *   `🔍 Starting analysis for text: Presiden Indonesia baru saja...`
            *   `⏱️ DeepSeek analysis completed in XXXXms`
            *   `✅ Analysis completed: [status_from_deepseek] (confidence: [confidence_from_deepseek])`
        *   A JSON response with a 200 status code:
            ```json
            {
              "success": true,
              "data": {
                "status": "...", // e.g., "fakta", "hoaks", "perlu_verifikasi" (determined by DeepSeek)
                "confidence": 0.0, // confidence score from DeepSeek
                "explanation": "...", // explanation from DeepSeek
                "redFlags": [], // red flags from DeepSeek
                "reasoning": "...", // reasoning from DeepSeek
                "analysisMethod": "deepseek",
                "timestamp": "...",
                "inputType": "text",
                "inputLength": N
              },
              "timestamp": "..."
            }
            ```
        *   The actual content of `status`, `confidence`, `explanation`, `redFlags`, and `reasoning` will depend on the DeepSeek API's live analysis of the input text.

4.  **Test the `/api/verify` Endpoint (DeepSeek API Failure/Error):**
    *   To simulate this, you could temporarily invalidate your `DEEPSEEK_API_KEY` in `.env` and restart the server.
    *   Send the same POST request as in step 3.
    *   **Expected Outcome (Fallback Response):**
        *   The server logs will show:
            *   `📝 Verification request: ...`
            *   `🔍 Starting analysis for ...`
            *   An error message related to DeepSeek API call (e.g., `DeepSeek API Error: ...` or `DeepSeek analysis failed: ...`)
            *   `❌ Primary analysis failed: Failed to analyze text with DeepSeek API` (or similar)
        *   A JSON response with a 200 status code, but data reflects the fallback:
            ```json
            {
              "success": true,
              "data": {
                "status": "perlu_verifikasi",
                "confidence": 0.3,
                "explanation": "Sistem tidak dapat menganalisis konten ini secara otomatis. Silakan verifikasi manual dengan sumber terpercaya.",
                "redFlags": ["Analisis otomatis gagal"],
                "reasoning": "Fallback response due to: Failed to analyze text with DeepSeek API", // or similar error
                "analysisMethod": "fallback",
                "timestamp": "...",
                "inputType": "text",
                "inputLength": N
              },
              "timestamp": "..."
            }
            ```

**Important Notes for Testing `deepseekService.js` directly (Unit Tests):**
*   The `baby-step-dev2.md` mentions creating `tests/deepseekService.test.js`.
*   These unit tests would typically mock `axios` to avoid making actual API calls during tests.
*   They would verify:
    *   `buildPrompt` correctness.
    *   `parseResponse` logic for various valid and invalid API responses.
    *   Error handling when API key is missing.
    *   Correct formation of API request headers and body.

This concludes the manual testing for Phase 2. Successful completion of these tests (especially with a valid API key and connection) indicates that the DeepSeek API integration and the main verification service are functioning as intended.
