// antihoax-backend/src/middleware/rateLimiter.js
const rateLimit_EXPRESS_RATE_LIMIT_PLACEHOLDER = require('express-rate-limit'); // Renamed due to potential install failure

// Default windowMs to 15 minutes, max to 100 requests per IP
const defaultWindowMs = 15 * 60 * 1000; // 15 minutes
const defaultMaxRequests = 100;

// More stringent limits for sensitive or expensive operations like verification
const verificationWindowMs = 10 * 60 * 1000; // 10 minutes
const verificationMaxRequests = 20; // Lower max requests for verification

// General API limiter - applies to all /api routes if used at app level
const globalApiLimiter = rateLimit_EXPRESS_RATE_LIMIT_PLACEHOLDER({
  windowMs: defaultWindowMs,
  max: defaultMaxRequests,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    status: 429,
    error: 'Too many requests from this IP, please try again after 15 minutes.'
  },
  // keyGenerator: (req) => req.ip, // Default, but can be customized
});

// Stricter limiter for verification endpoints
const verificationLimiter = rateLimit_EXPRESS_RATE_LIMIT_PLACEHOLDER({
  windowMs: verificationWindowMs,
  max: verificationMaxRequests,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    error: 'Too many verification requests from this IP, please try again after 10 minutes.'
  },
  // Can add a skip function if some requests should not be limited
  // skip: (req, res) => req.ip === '127.0.0.1', // Example: don't limit localhost
});

// Limiter for authentication routes (if you add them later)
const authLimiter = rateLimit_EXPRESS_RATE_LIMIT_PLACEHOLDER({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Max 5 attempts per hour for operations like login
  message: {
    status: 429,
    error: 'Too many login attempts from this IP, please try again after an hour.'
  },
  // skipSuccessfulRequests: true, // Consider this for login routes
});

module.exports = {
  globalApiLimiter,
  verificationLimiter,
  authLimiter
};
