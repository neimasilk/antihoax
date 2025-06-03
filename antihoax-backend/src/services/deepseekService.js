// antihoax-backend/src/services/deepseekService.js
const axios_DEEPSEEK_API_KEY_PLACEHOLDER = require('axios'); // Renamed to avoid collision if axios is not installed
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

class DeepSeekService {
  constructor() {
    this.apiKey = process.env.DEEPSEEK_API_KEY;
    if (!this.apiKey) {
      console.warn("DEEPSEEK_API_KEY not found in .env. DeepSeekService will not work.");
    }
    this.client = axios_DEEPSEEK_API_KEY_PLACEHOLDER.create({
      baseURL: 'https://api.deepseek.com/v1',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  getSystemPrompt() {
    return `You are an expert AI assistant specialized in detecting misinformation, disinformation, fake news, and propaganda. Your task is to analyze the provided text and determine if it is likely to be a hoax or contain misleading information.

    Guidelines for your analysis:
    1.  Fact-Checking: Verify any factual claims made in the text against reliable sources if possible (though you are a language model, assess based on common knowledge and critical thinking).
    2.  Source Evaluation (if source information is provided): Assess the credibility of the source. Is it known for biased reporting or spreading misinformation?
    3.  Language and Tone: Look for sensationalism, emotionally charged language, appeals to fear or prejudice, logical fallacies, and overly simplistic explanations for complex issues.
    4.  Consistency and Coherence: Check for internal contradictions or inconsistencies within the text.
    5.  Propaganda Techniques: Identify any common propaganda techniques (e.g., bandwagon, ad hominem, straw man, loaded language, false dichotomy).
    6.  Misleading Headlines: Does the headline accurately reflect the content?
    7.  Outdated Information: Is the information current, or is it being presented as new when it's old?
    8.  Lack of Evidence: Are claims made without supporting evidence or with unverifiable sources?
    9.  Manipulated Media (if applicable, though text-focused here): Be aware of the possibility of manipulated images or videos if the text refers to them.

    Output Format:
    Provide your analysis in a structured JSON format. The JSON object should include the following fields:
    - "is_hoax": boolean (true if likely a hoax/misleading, false otherwise)
    - "confidence_score": float (a score between 0.0 and 1.0 indicating your confidence in the "is_hoax" assessment; e.g., 0.95 for high confidence)
    - "analysis_summary": string (a brief summary of your findings and reasoning, max 2-3 sentences)
    - "key_indicators": array of strings (list of specific elements from the text or your analysis that led to your conclusion, e.g., "Sensationalized headline", "Lack of credible sources", "Uses loaded language")
    - "category": string (e.g., "Misinformation", "Disinformation", "Propaganda", "Satire", "Reliable News", "Uncertain")
    - "error_message": string (null if successful, or an error message if analysis could not be performed)
    `;
  }

  buildPrompt(text, type = 'text') {
    // In the future, 'type' could be 'url' and we might fetch content. For now, it's 'text'.
    return [
      {
        "role": "system",
        "content": this.getSystemPrompt()
      },
      {
        "role": "user",
        "content": `Please analyze the following ${type} for potential misinformation or hoax characteristics:\n\n${text}`
      }
    ];
  }

  async analyzeText(text, type = 'text') {
    if (!this.apiKey) {
      return this.parseResponse(null, "DEEPSEEK_API_KEY not configured. Analysis skipped.");
    }
    if (!text || String(text).trim().length < 50) { // Basic check for meaningful text
        return this.parseResponse(null, "Text is too short or empty for meaningful analysis.");
    }

    const messages = this.buildPrompt(text, type);

    try {
      const response = await this.client.post('/chat/completions', {
        model: 'deepseek-chat', // Or specific model like 'deepseek-coder' if more appropriate for structured output
        messages: messages,
        temperature: 0.2, // Lower temperature for more deterministic, factual analysis
        max_tokens: 1000, // Adjust as needed for the expected length of the JSON analysis
        stream: false // We want the full response for JSON parsing
      });

      if (response.data && response.data.choices && response.data.choices.length > 0) {
        const messageContent = response.data.choices[0].message.content;
        return this.parseResponse(messageContent);
      } else {
        return this.parseResponse(null, "Received no valid choice from DeepSeek API.");
      }
    } catch (error) {
      console.error("Error calling DeepSeek API:", error.response ? error.response.data : error.message);
      let errorMessage = "Failed to analyze text with DeepSeek API.";
      if (error.response && error.response.status === 401) {
        errorMessage = "DeepSeek API authentication failed. Check your API key.";
      } else if (error.response && error.response.data && error.response.data.error) {
        errorMessage = `DeepSeek API error: ${error.response.data.error.message}`;
      }
      return this.parseResponse(null, errorMessage);
    }
  }

  parseResponse(apiResponseContent, errorMessage = null) {
    if (errorMessage) {
      return {
        is_hoax: null, // Indicates uncertainty or failure
        confidence_score: 0.0,
        analysis_summary: "Analysis could not be performed.",
        key_indicators: [],
        category: "Error",
        error_message: errorMessage,
        raw_response: null
      };
    }

    try {
      // Attempt to find JSON within the response, as DeepSeek might add conversational text
      const jsonMatch = apiResponseContent.match(/```json\n([\s\S]*?)\n```|({[\s\S]*})/);
      let parsedJson;

      if (jsonMatch) {
        // Prioritize ```json block if present, else try the direct object match
        parsedJson = JSON.parse(jsonMatch[1] || jsonMatch[2]);
      } else {
         // If no clear JSON block, try parsing the whole thing, but this is risky
        console.warn("DeepSeek response was not in expected JSON format. Attempting direct parse.");
        parsedJson = JSON.parse(apiResponseContent);
      }

      // Validate required fields
      const requiredFields = ["is_hoax", "confidence_score", "analysis_summary", "key_indicators", "category"];
      for (const field of requiredFields) {
        if (!(field in parsedJson)) {
          throw new Error(`Missing required field '${field}' in DeepSeek JSON response.`);
        }
      }

      return { ...parsedJson, error_message: null, raw_response: apiResponseContent };

    } catch (parseError) {
      console.error("Error parsing DeepSeek API response:", parseError, "Raw response:", apiResponseContent);
      return {
        is_hoax: null,
        confidence_score: 0.0,
        analysis_summary: "Failed to parse the analysis result from the AI.",
        key_indicators: ["Invalid JSON response"],
        category: "Error",
        error_message: `Parsing error: ${parseError.message}`,
        raw_response: apiResponseContent
      };
    }
  }

  async healthCheck() {
    if (!this.apiKey) {
      return { status: 'error', message: 'DEEPSEEK_API_KEY not configured.' };
    }
    try {
      // A lightweight call, e.g., list models (if available and cheap) or a very short analysis.
      // For now, we'll simulate a basic check by trying to get a completion for a tiny prompt.
      const response = await this.client.post('/chat/completions', {
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: 'Health check prompt: respond with "OK".' }],
        max_tokens: 5,
        temperature: 0.0
      });
      if (response.data && response.data.choices && response.data.choices.length > 0) {
        return { status: 'ok', message: 'DeepSeek API is responsive.', api_response: response.data.choices[0].message.content };
      }
      return { status: 'error', message: 'DeepSeek API did not return expected health check response.' };
    } catch (error) {
      console.error("DeepSeek health check error:", error.message);
      return { status: 'error', message: `DeepSeek API health check failed: ${error.message}` };
    }
  }
}

module.exports = new DeepSeekService();
