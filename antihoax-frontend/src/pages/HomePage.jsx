// src/pages/HomePage.jsx
import React, { useState } from 'react'; // Keep useState for newsText
import { NewsInput } from '../components/forms';
import { VerificationResult } from '../components/results';
import { LoadingSpinner } from '../components/common';
import useVerification from '../hooks/useVerification'; // Import the hook

const HomePage = () => {
  const [newsText, setNewsText] = useState('');
  // Use the hook for verification logic and state
  const { isLoading, error, verificationResult, verifyNews } = useVerification();

  const handleNewsInputChange = (event) => {
    setNewsText(event.target.value);
  };

  // This function is now simplified as the core logic is in the hook
  const handleVerifyClick = () => {
    verifyNews(newsText); // Call the function from the hook
  };

  // The JSX structure remains largely the same as Step 3.1
  // It will now use isLoading and verificationResult from the hook
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6 sm:py-12">
      <div className="w-full max-w-2xl px-4 space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">
            AntiHoax<span className="text-blue-600">Cerdas</span> AI
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Verifikasi kebenaran berita dengan dukungan Kecerdasan Buatan.
          </p>
        </header>

        <main className="bg-white shadow-xl rounded-lg p-6 sm:p-8 space-y-6">
          <div>
            <label htmlFor="news-input" className="block text-sm font-semibold text-gray-700 mb-1">
              Masukkan Teks Berita untuk Diverifikasi:
            </label>
            <NewsInput
              value={newsText}
              onChange={handleNewsInputChange}
              disabled={isLoading} // Use isLoading from the hook
              placeholder="Ketik atau tempel artikel berita lengkap di sini..."
            />
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={handleVerifyClick} // Updated handler
              disabled={isLoading} // Use isLoading from the hook
              className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <LoadingSpinner size="sm" text="Memverifikasi..." color="text-white" />
              ) : (
                'Verifikasi Sekarang'
              )}
            </button>
          </div>

          {/* Display error message from the hook if it exists */}
          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 mt-4 rounded-md">
              <p className="font-bold">Oops! Terjadi Kesalahan:</p>
              <p>{error}</p>
            </div>
          )}

          {/* Show result area if loading or a result (including error structure) exists */}
          {/* The VerificationResult component is designed to handle various states of verificationResult */}
          {(verificationResult || isLoading) && !error && ( // Don't show this if there's a primary error message shown above
            <div className="pt-6 border-t border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Hasil Verifikasi:</h2>
              <VerificationResult result={verificationResult} isLoading={isLoading} />
            </div>
          )}
        </main>

        <footer className="text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} AntiHoax Cerdas AI. Didukung oleh model AI terkini.</p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
