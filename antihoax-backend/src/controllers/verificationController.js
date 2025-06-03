// antihoax-backend/src/controllers/verificationController.js
const verificationService = require('../services/verificationService');

const verifyNews = async (req, res, next) => {
  try {
    const { text, type = 'text', source } = req.body; // type defaults to 'text'

    // Basic logging of the request
    console.log(`📝 Verification request: text - "${String(text).substring(0,100)}...", type - ${type}, source - ${source || 'N/A'}`);

    const result = await verificationService.analyzeNews(text, type, source);

    // Determine appropriate status code based on result
    // If there was an error processing (e.g. AI provider issue), result.data might contain statusCode
    let httpStatusCode = 200;
    if (!result.success && result.data && result.data.statusCode) {
        httpStatusCode = result.data.statusCode >= 400 ? result.data.statusCode : 500;
    } else if (!result.success) {
        httpStatusCode = 500; // Generic server error if no specific code
    }

    // Remove internal statusCode from client response if it exists
    if (result.data && result.data.statusCode) {
        delete result.data.statusCode;
    }

    res.status(httpStatusCode).json(result);

  } catch (error) {
    // Catch unexpected errors in the controller logic itself
    console.error("💥 Unexpected error in verificationController.verifyNews:", error);
    next(error); // Pass to the global error handler in app.js
  }
};

const getStatus = async (req, res, next) => {
  try {
    console.log("📡 Status request received");
    const statusReport = await verificationService.getServiceStatus();
    res.status(200).json(statusReport);
  } catch (error) {
    console.error("💥 Unexpected error in verificationController.getStatus:", error);
    next(error); // Pass to the global error handler
  }
};

module.exports = {
  verifyNews, // Renamed from verifyText to be more generic if handling URLs later
  getStatus
};
