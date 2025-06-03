const express = require('express');
const verificationController = require('../controllers/verificationController');
const { validateVerificationRequest } = require('../middleware/validation');
const { verificationLimiter } = require('../middleware/rateLimiter'); // Import the limiter

const router = express.Router();

// Route to get the status of the verification services
router.get('/status', verificationController.getStatus);

// Route to submit text for verification, now with rate limiting
router.post('/', verificationLimiter, validateVerificationRequest, verificationController.verifyNews);

module.exports = router;
