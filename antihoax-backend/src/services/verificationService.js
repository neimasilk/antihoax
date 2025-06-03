// antihoax-backend/src/services/verificationService.js
const deepseekService = require('./deepseekService');
const dotenv = require('dotenv');

dotenv.config();

class VerificationService {
  constructor() {
    this.enableDeepSeek = process.env.ENABLE_DEEPSEEK_ANALYSIS === 'true';
  }

  async analyzeNews(text, type = 'text', source = null) {
    if (!text || String(text).trim() === '') {
      return this.createFallbackResponse("Input text cannot be empty.", 400, "Validation Error");
    }
    // Basic length check, align with validation.js if possible, though this is service-level
    if (String(text).trim().length < 10) {
         return this.createFallbackResponse("Text is too short for meaningful analysis.", 400, "Validation Error");
    }

    let analysisResult;

    if (this.enableDeepSeek) {
      try {
        console.log(`Attempting analysis with DeepSeek for text: "${text.substring(0, 50)}..."`);
        analysisResult = await this.analyzeWithDeepSeek(text, type, source);
      } catch (error) {
        console.error('Error during DeepSeek analysis:', error);
        analysisResult = this.createFallbackResponse(
          `DeepSeek analysis failed: ${error.message}`,
          500,
          "AI Provider Error"
        );
      }
    } else {
      console.log("DeepSeek analysis is disabled. Returning fallback response.");
      analysisResult = this.createFallbackResponse(
        "AI analysis is currently disabled by configuration.",
        200, // Not an error, but a state
        "Service Info",
        false // is_hoax: false, as no analysis performed
      );
    }

    return {
        success: !analysisResult.error_message || analysisResult.category !== "Error",
        data: analysisResult,
        timestamp: new Date().toISOString()
    };
  }

  async analyzeWithDeepSeek(text, type, source) {
    // The 'source' parameter can be passed to DeepSeek if the prompt is adjusted to use it.
    // For now, deepseekService.analyzeText primarily focuses on 'text'.
    const deepseekResult = await deepseekService.analyzeText(text, type);

    // Standardize the response a bit more if needed, or directly return
    return {
      provider: 'deepseek',
      is_hoax: deepseekResult.is_hoax,
      confidence: deepseekResult.confidence_score,
      summary: deepseekResult.analysis_summary,
      indicators: deepseekResult.key_indicators,
      category: deepseekResult.category,
      error_message: deepseekResult.error_message, // Ensure this is part of deepseekResult
      raw_ai_response: process.env.NODE_ENV === 'development' ? deepseekResult.raw_response : undefined
    };
  }

  createFallbackResponse(message, statusCode = 500, category = "Error", isHoax = null) {
    // if isHoax is null, it means analysis could not determine.
    // if false, it means analysis was skipped but implies not a hoax by default.
    return {
      provider: 'fallback',
      is_hoax: isHoax,
      confidence: 0.0,
      summary: message,
      indicators: [message],
      category: category,
      error_message: category === "Error" ? message : null,
      statusCode: statusCode // For internal use or logging, not typically part of final API response structure for data
    };
  }

  async getServiceStatus() {
    const deepseekApiKeyConfigured = !!process.env.DEEPSEEK_API_KEY;
    let deepseekStatus = {
      name: 'DeepSeek API',
      configured: deepseekApiKeyConfigured,
      enabled: this.enableDeepSeek,
      status: 'N/A',
      message: deepseekApiKeyConfigured ? (this.enableDeepSeek ? 'Enabled' : 'Disabled via ENABLE_DEEPSEEK_ANALYSIS') : 'API Key not configured'
    };

    if (deepseekApiKeyConfigured && this.enableDeepSeek) {
      const health = await deepseekService.healthCheck();
      deepseekStatus.status = health.status;
      deepseekStatus.message = health.message;
    }

    return {
      overall_status: this.enableDeepSeek && deepseekStatus.status === 'ok' ? 'operational' : 'issues_detected',
      timestamp: new Date().toISOString(),
      dependencies: [deepseekStatus]
    };
  }
}

module.exports = new VerificationService();
