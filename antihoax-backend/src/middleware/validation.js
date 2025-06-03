const { body, validationResult } = require('express-validator'); // This line will cause error if express-validator is not installed

// Basic validation for text verification request
const validateVerificationRequest = [
  body('text')
    .trim()
    .notEmpty().withMessage('Text cannot be empty.')
    .isLength({ min: 10 }).withMessage('Text must be at least 10 characters long.'),
  // TODO: Add more validation rules as needed (e.g., URL validation if 'source' is a URL)
  body('source').optional().trim(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateVerificationRequest
};
