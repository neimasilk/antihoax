// src/pages/HomePage.jsx
import React, { useState } from 'react';
import Header from '../components/common/Header';
import NewsInput from '../components/forms/NewsInput';
import VerificationResult from '../components/results/VerificationResult';
import LoadingSpinner from '../components/common/LoadingSpinner';
import useVerification from '../hooks/useVerification';

const HomePage = () => {
  const [newsText, setNewsText] = useState('');
  // Use the hook for verification logic and state
  const { isLoading, error, result, verifyNews, setError } = useVerification();

  const handleNewsInputChange = (e) => {
    setNewsText(e.target.value);
  };

  // This function is now simplified as the core logic is in the hook
  const handleVerifyClick = async () => {
    if (!newsText.trim()) return;
    await verifyNews(newsText); // Call the function from the hook
  };

  // The JSX structure remains largely the same as Step 3.1
  // It will now use isLoading and verificationResult from the hook
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-blue-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Verifikasi Berita dengan <span className="text-primary-600">AI</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Lindungi diri dari hoax dan misinformasi dengan teknologi AI terdepan. 
              Dapatkan analisis kredibilitas berita secara real-time.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Analisis Real-time
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
                AI-Powered
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Terpercaya
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="max-w-4xl mx-auto px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Input Section */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center mb-6">
              <svg className="w-6 h-6 text-primary-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-900">Masukkan Berita untuk Diverifikasi</h2>
            </div>
            
            <NewsInput
              value={newsText}
              onChange={handleNewsInputChange}
              placeholder="Paste atau ketik berita yang ingin Anda verifikasi di sini..."
              disabled={isLoading}
            />
            
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-500">
                {newsText.length}/5000 karakter
              </div>
              <button
                onClick={handleVerifyClick}
                disabled={!newsText.trim() || isLoading}
                className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg shadow-lg hover:from-primary-700 hover:to-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Menganalisis...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Verifikasi Sekarang
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="p-8">
            {isLoading && (
              <div className="text-center py-12">
                <LoadingSpinner size="lg" text="Menganalisis berita dengan AI..." />
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-semibold text-red-800">Terjadi Kesalahan</h3>
                    <p className="text-red-700 mt-1">{error}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleVerifyClick()}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Coba Lagi
                </button>
              </div>
            )}

            {result && !isLoading && (
              <VerificationResult result={result} />
            )}

            {!result && !isLoading && !error && (
              <div className="text-center py-12 text-gray-500">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-lg">Masukkan teks berita di atas untuk memulai verifikasi</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Anti-Hoax AI</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Platform AI terdepan untuk verifikasi kebenaran berita dan melawan misinformasi. 
              Dikembangkan dengan teknologi kecerdasan buatan terkini.
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-500 mb-6">
              <a href="#" className="hover:text-primary-600 transition-colors">Tentang</a>
              <a href="#" className="hover:text-primary-600 transition-colors">Kebijakan Privasi</a>
              <a href="#" className="hover:text-primary-600 transition-colors">Syarat Layanan</a>
              <a href="#" className="hover:text-primary-600 transition-colors">Kontak</a>
            </div>
            <p className="text-xs text-gray-400">
              © 2024 Anti-Hoax AI. Semua hak dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
