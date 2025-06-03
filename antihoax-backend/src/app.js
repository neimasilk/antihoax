const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
const apiRoutes = require('./routes'); // Import the main router
app.use('/api', apiRoutes); // Mount all API routes under /api

// Basic Health Check Route (can be removed if /api/health from index.js is preferred)
// app.get('/api/health', (req, res) => {
//   res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
// });

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
