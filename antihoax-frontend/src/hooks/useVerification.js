// src/hooks/useVerification.js
import { useState } from 'react';
import { verifyNewsText } from '../services/api';

const useVerification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);

  const verifyNews = async (newsText) => {
    if (!newsText || newsText.trim() === '') {
      setVerificationResult({ summary: 'Teks berita tidak boleh kosong.', isHoax: null, isUncertain: true, isEmpty: true });
      setError(null); // Clear previous errors
      setIsLoading(false); // Ensure loading is false
      return;
    }

    setIsLoading(true);
    setError(null);
    setVerificationResult(null); // Clear previous results on new submission

    try {
      const result = await verifyNewsText(newsText);
      // Adapt the result from the API to the structure expected by VerificationResult component
      // The dummy API already returns `isHoax` and `summary`.
      // If `status` is "uncertain", we can set `isUncertain` for the component.
      setVerificationResult({
        ...result,
        isUncertain: result.status === 'uncertain',
      });
    } catch (err) {
      console.error("useVerification Hook Error:", err);
      setError(err.message || 'Terjadi kesalahan saat verifikasi.');
      // Provide a result structure that VerificationResult can understand for errors
      setVerificationResult({ summary: err.message || 'Terjadi kesalahan saat verifikasi.', isHoax: null, isUncertain: true, isError: true });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    result: verificationResult,
    verifyNews,
    setError,
  };
};

export default useVerification;
