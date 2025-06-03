# AntiHoax Backend Service

This service provides an API for analyzing text content to detect potential hoaxes, misinformation, or disinformation using AI-powered analysis.

## Project Overview

The AntiHoax Backend is a Node.js application built with Express.js. It integrates with external AI services (like DeepSeek API) to perform text analysis and provides a simple REST API for clients to submit text and receive analysis results.

This project was developed following the steps in `memory-bank/baby-step-dev2.md`.

## Features (up to Phase 4)

*   **Text Analysis:** Submit text to check for potential hoax characteristics.
*   **AI Integration:** Uses DeepSeek API (configurable) for primary analysis.
*   **Fallback Mechanism:** Provides a basic response if AI analysis fails or is disabled.
*   **API Endpoints:**
    *   `GET /api/health`: Checks the health of the application.
    *   `GET /api/verify/status`: Checks the status of downstream services like DeepSeek.
    *   `POST /api/verify`: Submits text for analysis.
*   **Input Validation:** Validates requests for the `/api/verify` endpoint.
*   **Rate Limiting:** Basic protection against abuse on the `/api/verify` endpoint.
*   **Structured Logging:** (Morgan configured, custom `requestLogger.js` available)
*   **Caching Utility:** (Simple in-memory `cache.js` available for future integration)
*   **Testing:**
    *   Unit/Integration tests for API endpoints using Jest and Supertest (`npm test`).
    *   Manual API test script (`npm run test:manual`).
*   **Deployment:**
    *   Dockerfile and `docker-compose.yml` for containerized deployment.
    *   Basic deployment script (`scripts/deploy.sh`).
*   **API Documentation:** See `docs/API.md`.

## Prerequisites

*   Node.js (version specified in `.nvmrc` if present, or latest LTS recommended e.g., 18.x or 20.x)
*   npm (usually comes with Node.js)
*   Docker and Docker Compose (for containerized deployment)
*   A DeepSeek API Key (if you intend to use the DeepSeek analysis feature)

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd antihoax-backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    *(Note: In some controlled environments, `npm install` might face issues. The manual testing guides provide workarounds or point out where this is a blocker.)*

3.  **Set up environment variables:**
    *   Copy `.env.example` to a new file named `.env`:
        ```bash
        cp .env.example .env
        ```
    *   Edit the `.env` file and provide the necessary configurations:
        *   `PORT`: The port on which the server will run (default: 3001).
        *   `NODE_ENV`: Set to `development`, `production`, or `test`.
        *   `DEEPSEEK_API_KEY`: Your API key for the DeepSeek service.
        *   `ENABLE_DEEPSEEK_ANALYSIS`: Set to `true` to enable DeepSeek, `false` to use fallback.
        *   (Add any other variables introduced, like `CACHE_DEFAULT_TTL_SECONDS`)

## Running the Application

*   **Development Mode (with Nodemon for auto-restarts):**
    ```bash
    npm run dev
    ```
    The server will typically start on `http://localhost:3001`.

*   **Production Mode:**
    ```bash
    npm start
    ```

## Running Tests

*   **Automated Tests (Jest):**
    ```bash
    npm test
    ```
    This will run tests defined in the `tests/` directory (e.g., `api.test.js`).

*   **Manual API Test Script:**
    This script sends predefined requests to your running local server.
    ```bash
    npm run test:manual
    ```

## API Documentation

Detailed API endpoint information can be found in [docs/API.md](docs/API.md).

## Deployment (Docker)

A `Dockerfile` and `docker-compose.yml` are provided for containerized deployment.

1.  **Build the Docker image:**
    ```bash
    docker-compose build
    # OR
    # docker build -t antihoax-backend .
    ```

2.  **Run using Docker Compose:**
    (Ensure your `.env` file is configured, as Docker Compose will use it by default)
    ```bash
    docker-compose up -d
    ```
    The service will be available on the port mapped in `docker-compose.yml` (e.g., `http://localhost:3001`).

3.  **Deployment Script:**
    A basic `scripts/deploy.sh` script is provided as an example for pulling latest changes and restarting a Docker Compose setup. Customize it to your needs.
    ```bash
    chmod +x scripts/deploy.sh
    ./scripts/deploy.sh
    ```

## Project Structure

```
antihoax-backend/
├── docs/                     # API Documentation
│   └── API.md
├── logs/                     # Log files (if file logging is enabled)
├── scripts/                  # Utility and deployment scripts
│   ├── deploy.sh
│   └── test-api.js
├── src/                      # Source code
│   ├── controllers/          # Request handlers
│   ├── middleware/           # Express middleware (validation, rate limiting, logging)
│   ├── routes/               # API route definitions
│   ├── services/             # Business logic (AI integration, etc.)
│   ├── utils/                # Utility functions (e.g., cache)
│   └── app.js                # Express application setup
├── tests/                    # Automated tests
│   └── api.test.js
├── .env                      # Local environment variables (ignored by Git)
├── .env.example              # Example environment variables
├── .gitignore                # Files and directories to ignore in Git
├── Dockerfile                # For building Docker image
├── docker-compose.yml        # For Docker Compose orchestration
├── package.json              # Project metadata and dependencies
├── package-lock.json         # Exact versions of dependencies
└── README.md                 # This file
```

## Contributing

Contributions are welcome! Please refer to contribution guidelines if available, or open an issue to discuss proposed changes.

## License

This project is licensed under the ISC License (default for `npm init`). See the `LICENSE` file if one was created (or assume ISC if not).
