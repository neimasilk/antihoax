const express = require('express');
const verificationRoutes = require('./verification');

const router = express.Router();

// Health check (already in app.js, but good to have a root /api health if needed)
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', GREETINGS: "Hello from anit-hoax API an its /api/health route", timestamp: new Date().toISOString() });
});

// Mount verification routes
router.use('/verify', verificationRoutes);

module.exports = router;
