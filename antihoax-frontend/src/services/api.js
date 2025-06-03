// src/services/api.js

/**
 * Simulates an API call to the backend for news verification.
 * @param {string} newsText The text of the news article to verify.
 * @returns {Promise<object>} A promise that resolves to the verification result.
 */
export const verifyNewsText = async (newsText) => {
  console.log("API Call: Verifying news text:", newsText.substring(0, 100) + "...");

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

  // TODO: Replace with actual fetch call to the backend API in Phase 2
  // Example:
  // const response = await fetch('/api/verify', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ text: newsText }),
  // });
  // if (!response.ok) {
  //   const errorData = await response.json();
  //   throw new Error(errorData.message || 'Network response was not ok');
  // }
  // return response.json();

  // Dummy response logic for Phase 1 (Dev1)
  return new Promise((resolve, reject) => {
    const randomFactor = Math.random();
    if (randomFactor < 0.1) { // Simulate a rare server error
      reject(new Error("Gagal menghubungi server AI. Silakan coba lagi nanti."));
    } else if (randomFactor < 0.5) {
      resolve({
        id: `dummy-${Date.now()}`,
        status: "verified",
        isHoax: true,
        confidence: Math.random() * 0.3 + 0.7, // High confidence for hoaxes
        summary: "AI menganalisis berita ini sebagai HOAKS. Beberapa klaim tidak didukung oleh sumber terpercaya dan terdapat indikasi manipulasi.",
        details_url: null, // No details URL for dummy data
        timestamp: new Date().toISOString(),
      });
    } else if (randomFactor < 0.9) {
      resolve({
        id: `dummy-${Date.now()}`,
        status: "verified",
        isHoax: false,
        confidence: Math.random() * 0.3 + 0.7, // High confidence for facts
        summary: "AI menganalisis berita ini sebagai FAKTA. Informasi didukung oleh beberapa sumber berita kredibel.",
        details_url: null,
        timestamp: new Date().toISOString(),
      });
    } else {
      resolve({
        id: `dummy-${Date.now()}`,
        status: "uncertain",
        isHoax: null, // Undetermined
        confidence: Math.random() * 0.4 + 0.3, // Lower confidence for uncertain cases
        summary: "AI tidak dapat sepenuhnya memastikan status berita ini. Beberapa aspek memerlukan tinjauan lebih lanjut oleh pakar.",
        details_url: null,
        timestamp: new Date().toISOString(),
      });
    }
  });
};
