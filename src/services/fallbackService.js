class FallbackService {
  constructor() {
    this.hoaxIndicators = [
      'BREAKING!!!', 'SHARE SEBELUM DIHAPUS', 'JANGAN PERCAYA PEMERINTAH',
      'RAHASIA YANG DISEMBUNYIKAN', 'DOKTER TIDAK MAU ANDA TAHU',
      'VAKSIN BERBAHAYA', 'CHIP 5G', 'KONSPIRASI GLOBAL'
    ];
    this.factIndicators = [
      'menurut penelitian', 'berdasarkan data', 'sumber resmi',
      'kementerian', 'universitas', 'jurnal ilmiah'
    ];
  }

  analyzeText(text) {
    const lowerText = text.toLowerCase();
    let hoaxScore = 0;
    let factScore = 0;
    const redFlags = [];

    this.hoaxIndicators.forEach(indicator => {
      if (lowerText.includes(indicator.toLowerCase())) { // Ensure case-insensitive matching for indicators
        hoaxScore++;
        redFlags.push({ type: 'hoax_indicator', indicator, position: lowerText.indexOf(indicator.toLowerCase()) });
      }
    });

    this.factIndicators.forEach(indicator => {
      if (lowerText.includes(indicator.toLowerCase())) { // Ensure case-insensitive matching for indicators
        factScore++;
      }
    });

    let status, confidence, explanation, reasoning;

    if (hoaxScore > factScore) {
      status = 'hoax';
      confidence = Math.min(0.5 + (hoaxScore - factScore) * 0.1, 0.9); // Confidence increases with score diff, capped at 0.9
      reasoning = `Detected ${hoaxScore} hoax indicator(s) and ${factScore} fact indicator(s).`;
      explanation = this.generateExplanation(status, redFlags, reasoning);
    } else if (factScore > hoaxScore) {
      status = 'fact';
      confidence = Math.min(0.5 + (factScore - hoaxScore) * 0.1, 0.9);
      reasoning = `Detected ${factScore} fact indicator(s) and ${hoaxScore} hoax indicator(s).`;
      explanation = this.generateExplanation(status, redFlags, reasoning);
    } else {
      status = 'uncertain';
      confidence = 0.5;
      reasoning = `Detected an equal number of hoax and fact indicators (${hoaxScore}).`;
      explanation = this.generateExplanation(status, redFlags, reasoning);
    }

    // Ensure confidence is never more than 1.0, even with many indicators.
    confidence = Math.min(confidence, 1.0);


    return { status, confidence, explanation, redFlags, reasoning };
  }

  generateExplanation(status, redFlags, reasoning) {
    let explanation = `Based on keyword analysis, this text is preliminarily classified as ${status}. ${reasoning}`;
    if (redFlags.length > 0) {
      explanation += " Potential red flags include: " + redFlags.map(rf => rf.indicator).join(", ") + ".";
    }
    if (status === 'hoax') {
      explanation += " This suggests the text may contain misleading or false information. Further verification is recommended.";
    } else if (status === 'fact') {
      explanation += " This suggests the text is likely based on factual information, but cross-referencing sources is always a good practice.";
    } else { // uncertain
      explanation += " The nature of this text is unclear based on keyword analysis alone. Proceed with caution and seek further verification from reliable sources.";
    }
    return explanation;
  }
}

module.exports = new FallbackService();
