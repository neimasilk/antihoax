// antihoax-backend/src/middleware/requestLogger.js
const morgan = require('morgan'); // Assuming morgan is installed as a dependency
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream'); // To be installed: npm install rotating-file-stream

// Ensure logs directory exists
const logDirectory = path.join(__dirname, '../../logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// Create a rotating write stream
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory,
  compress: 'gzip' // compress rotated files
});

// Morgan format options:
// 'combined' - Standard Apache combined log output
// 'common' - Standard Apache common log output
// 'dev' - Concise output colored by TTY, good for development
// 'short' - Shorter than default, also good for TTY
// 'tiny' - The minimal output

// Custom token for Morgan to log request body (be cautious with sensitive data)
morgan.token('body', (req) => {
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    // Avoid logging sensitive data like passwords.
    // Customize this based on your request bodies.
    const sensitiveKeys = ['password', 'token', 'apiKey', 'secret'];
    const bodyToLog = { ...req.body };
    for (const key of sensitiveKeys) {
      if (bodyToLog[key]) {
        bodyToLog[key] = '[REDACTED]';
      }
    }
    return JSON.stringify(bodyToLog);
  }
  return ''; // Return empty string for GET, DELETE, etc. or if no body
});

// Custom Morgan format string
// Example: :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms - Body: :body
const customLogFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms Body: :body';

// Setup the logger middleware
// For development, log to console with 'dev' format
const consoleLogger = morgan('dev');

// For production, log to file with 'combined' or custom format
const fileLogger = morgan(customLogFormat, { stream: accessLogStream });


// Function to choose logger based on environment
const getRequestLogger = () => {
  if (process.env.NODE_ENV === 'production') {
    return fileLogger;
  } else if (process.env.NODE_ENV === 'test') {
    // Don't log during tests, or use a very minimal logger if needed
    return (req, res, next) => next();
  }
  // Default to console logger for development or undefined NODE_ENV
  return consoleLogger;
};

module.exports = getRequestLogger;

/*
How to use in app.js:
const getRequestLogger = require('./middleware/requestLogger');
// ...
app.use(getRequestLogger()); // Place it early in your middleware stack
// ...
*/
