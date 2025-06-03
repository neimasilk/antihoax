# AntiHoax API Documentation

This document provides details about the API endpoints available in the AntiHoax Backend service.

**Base URL:** `/api` (e.g., `http://localhost:3001/api`)

## Authentication

Currently, the API does not require authentication for most endpoints. Rate limiting is applied to protect against abuse. Future versions may introduce API key requirements for higher usage tiers or specific sensitive operations.

## Common Response Object

Successful responses (200 OK) are generally structured as follows:

```json
{
  "success": true,
  "data": {
    // Endpoint-specific data payload
  },
  "timestamp": "YYYY-MM-DDTHH:mm:ss.sssZ"
}
```

Error responses (4xx, 5xx) are structured as:

```json
{
  "success": false,
  "error": {
    "message": "A descriptive error message",
    "status": HTTP_STATUS_CODE,
    "details": "Optional: Further details or validation errors array"
  },
  "timestamp": "YYYY-MM-DDTHH:mm:ss.sssZ"
}
```
*Note: The exact error structure for validation (400) from `express-validator` might be slightly different, containing an `errors` array.*

## Endpoints

### 1. Health Check

*   **Endpoint:** `GET /health`
*   **Description:** Checks the operational status of the API.
*   **Request Body:** None
*   **Successful Response (200 OK):**
    ```json
    {
      "status": "UP",
      "GREETINGS": "Hello from anit-hoax API an its /api/health route",
      "timestamp": "2023-10-27T10:00:00.000Z"
    }
    ```
    *(Self-correction: The `baby-step-dev2.md` Phase 1 `src/app.js` defines `status: 'UP'`, but `src/routes/index.js` defines the greeting. The Jest test `tests/api.test.js` also expects `status: 'UP'` and the greeting. The manual test guide also reflects this combined expectation. The original `app.get('/api/health')` was commented out in `app.js` when `apiRoutes` were added.)*

### 2. Verification Service Status

*   **Endpoint:** `GET /verify/status`
*   **Description:** Retrieves the status of the verification service and its dependencies (e.g., DeepSeek API).
*   **Request Body:** None
*   **Successful Response (200 OK):**
    ```json
    {
        "overall_status": "operational", // or "issues_detected"
        "timestamp": "2023-10-27T12:00:00.000Z",
        "dependencies": [
            {
                "name": "DeepSeek API",
                "configured": true,
                "enabled": true,
                "status": "ok", // or "error"
                "message": "DeepSeek API is responsive" // or an error message
            }
            // Potentially other dependencies in the future
        ]
    }
    ```

### 3. Submit Text for Verification

*   **Endpoint:** `POST /verify`
*   **Description:** Submits text content for hoax analysis. The analysis is performed by the configured AI provider (e.g., DeepSeek).
*   **Request Headers:**
    *   `Content-Type: application/json`
*   **Request Body:**
    ```json
    {
      "text": "The content of the news article or text to be analyzed. Must be at least 10 characters.",
      "type": "text", // Optional, defaults to "text". Could be "url" in future.
      "source": "Optional URL or identifier for the source of the text."
    }
    ```
*   **Successful Response (200 OK):**
    ```json
    // Example when DeepSeek analysis is successful
    {
      "success": true,
      "data": {
        "provider": "deepseek",
        "is_hoax": false, // boolean: true if likely a hoax, false otherwise, null if error
        "confidence": 0.95, // float: confidence score (0.0 to 1.0)
        "summary": "The text appears to be factual based on current analysis.",
        "indicators": ["Credible source mentioned (if applicable)", "Neutral language"], // array of strings
        "category": "Reliable News", // e.g., "Misinformation", "Disinformation", "Satire", "Reliable News"
        "error_message": null, // string: error message if any during AI processing
        "raw_ai_response": null // (Optional, only in development NODE_ENV for debugging) The raw JSON string from AI provider
      },
      "timestamp": "2023-10-27T12:05:00.000Z"
    }
    ```
    ```json
    // Example when DeepSeek analysis is disabled or fails, and fallback is used
    {
      "success": true, // The API call itself succeeded
      "data": {
        "provider": "fallback",
        "is_hoax": null, // Fallback cannot determine hoax status
        "confidence": 0.0,
        "summary": "AI analysis is currently disabled by configuration.", // Or error message if AI failed
        "indicators": ["AI analysis not performed"],
        "category": "Service Info", // Or "Error" if AI failed
        "error_message": null // Or the actual error message from AI service
      },
      "timestamp": "2023-10-27T12:06:00.000Z"
    }
    ```
*   **Error Response (400 Bad Request - Validation Error):**
    ```json
    {
        "errors": [ // Array of validation errors from express-validator
            {
                "type": "field",
                "value": "short",
                "msg": "Text must be at least 10 characters long.",
                "path": "text",
                "location": "body"
            }
        ]
    }
    ```
*   **Error Response (429 Too Many Requests):**
    If rate limits are exceeded.
    ```json
    {
      "status": 429, // This might be nested under an "error" object depending on actual implementation
      "error": "Too many verification requests from this IP, please try again after 10 minutes."
    }
    ```
    *(Self-correction: The `rateLimiter.js` defines the message as `{"status": 429, "error": "..."}`. The main error middleware in `app.js` might wrap this further if not handled directly by the rate limiter's response handler.)*


## Rate Limiting

*   **Verification Endpoint (`POST /verify`):** Limited to 20 requests per 10 minutes per IP.
*   Other limits may apply globally. Check `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset` response headers.

## Future Enhancements (Not Yet Implemented)

*   URL analysis (passing a URL instead of text).
*   User authentication and API keys.
*   More sophisticated caching strategies.
*   Webhook support for asynchronous analysis of large texts or URLs.
*   Support for more AI analysis providers.

---
*This documentation is based on the features implemented up to Phase 4 of `baby-step-dev2.md`.*
