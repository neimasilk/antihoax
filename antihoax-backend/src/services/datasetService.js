const fs = require('fs');
const path = require('path');

class DatasetService {
  constructor() {
    this.dataPath = path.join(__dirname, '../../data/sample-news.json');
    this.dataset = null;
    this.loadDataset();
  }

  loadDataset() {
    try {
      const data = fs.readFileSync(this.dataPath, 'utf8');
      this.dataset = JSON.parse(data);
      console.log('📊 Dataset loaded successfully');
    } catch (error) {
      console.error('❌ Failed to load dataset:', error.message);
      // Initialize with empty dataset structure on error to prevent crashes
      this.dataset = { hoaks: [], fakta: [], perlu_verifikasi: [] };
    }
  }

  findSimilarNews(inputText) {
    if (!this.dataset || (!this.dataset.hoaks && !this.dataset.fakta && !this.dataset.perlu_verifikasi)) {
        console.warn('Dataset not loaded or empty when trying to find similar news.');
        return null;
    }

    const allNews = [
      ...(this.dataset.hoaks || []),
      ...(this.dataset.fakta || []),
      ...(this.dataset.perlu_verifikasi || [])
    ];

    if (allNews.length === 0) {
        console.warn('No news items in the dataset to compare against.');
        return null;
    }

    // Simple similarity check (can be improved)
    const inputWords = inputText.toLowerCase().split(' ').filter(word => word.length > 0);

    for (const news of allNews) {
      if (!news.text || typeof news.text !== 'string') {
        console.warn(`Skipping news item with invalid text: ${JSON.stringify(news)}`);
        continue;
      }
      const newsWords = news.text.toLowerCase().split(' ').filter(word => word.length > 0);
      const commonWords = inputWords.filter(word =>
        newsWords.includes(word) && word.length > 3 // Only consider common words longer than 3 chars
      );

      // Require a certain number of common words to consider it similar
      // and also a certain ratio of common words to the length of the shorter text
      const minCommonWords = 3;
      const similarityThresholdRatio = 0.2; // e.g., 20% of words in shorter text must match

      if (commonWords.length >= minCommonWords) {
        const shorterLength = Math.min(inputWords.length, newsWords.length);
        if (shorterLength > 0 && (commonWords.length / shorterLength) >= similarityThresholdRatio) {
            return {
            ...news,
            similarityScore: commonWords.length / shorterLength, // More intuitive score
            matchedWords: commonWords
            };
        }
      }
    }

    return null;
  }

  getTestCases() {
    // Ensure that even if the dataset is empty, it returns the correct structure
    if (!this.dataset) {
        return { hoaks: [], fakta: [], perlu_verifikasi: [] };
    }
    return {
        hoaks: this.dataset.hoaks || [],
        fakta: this.dataset.fakta || [],
        perlu_verifikasi: this.dataset.perlu_verifikasi || []
    };
  }
}

module.exports = new DatasetService();
