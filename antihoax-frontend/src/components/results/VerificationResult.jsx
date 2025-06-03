/**
 * VerificationResult Component
 *
 * Displays verification results clearly.
 *
 * @param {Object} result - The verification result object.
 * @param {boolean} isLoading - Indicates if the verification is in progress.
 */
import React from 'react';
import PropTypes from 'prop-types';

const VerificationResult = ({ result, isLoading }) => {
  if (isLoading) {
    return (
      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-lg card-enter">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <div>
            <p className="font-bold text-blue-800 text-lg">Menganalisis Berita...</p>
            <p className="text-blue-600 text-sm">AI sedang memproses dan memverifikasi konten. Mohon tunggu sebentar.</p>
          </div>
        </div>
        <div className="mt-4 bg-blue-100 rounded-lg p-3">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-sm">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-600">Belum ada hasil verifikasi. Masukkan teks berita dan klik tombol verifikasi untuk memulai analisis.</p>
        </div>
      </div>
    );
  }

  // Determine display properties based on result
  let containerClass = 'p-6 border rounded-xl shadow-lg card-enter';
  let iconClass = '';
  let icon = '';
  let title = 'Hasil Verifikasi';
  let message = result.summary || 'Tidak ada ringkasan.';
  let confidenceLevel = result.confidence ? Math.round(result.confidence * 100) : null;

  if (result.isHoax === true) {
    containerClass += ' bg-gradient-to-r from-red-50 to-pink-50 border-red-200';
    iconClass = 'text-red-600';
    icon = '⚠️';
    title = '🚨 Indikasi Hoaks Terdeteksi';
  } else if (result.isHoax === false) {
    containerClass += ' bg-gradient-to-r from-green-50 to-emerald-50 border-green-200';
    iconClass = 'text-green-600';
    icon = '✅';
    title = '✓ Indikasi Fakta Terdeteksi';
  } else if (result.isUncertain) {
    containerClass += ' bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200';
    iconClass = 'text-yellow-600';
    icon = '❓';
    title = '⚡ Hasil Belum Dapat Dipastikan';
  }

  return (
    <div className={containerClass}>
      <div className="flex items-start space-x-4">
        <div className={`text-3xl ${iconClass} flex-shrink-0`}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className={`font-bold text-xl mb-3 ${iconClass}`}>{title}</h3>
          <div className="bg-white/70 rounded-lg p-4 mb-4">
            <p className="text-gray-800 leading-relaxed">{message}</p>
          </div>
          
          {confidenceLevel && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Tingkat Keyakinan AI</span>
                <span className={`text-sm font-bold ${iconClass}`}>{confidenceLevel}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    result.isHoax === true ? 'bg-red-500' : 
                    result.isHoax === false ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                  style={{ width: `${confidenceLevel}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {result.timestamp && (
            <div className="text-xs text-gray-500 mt-3">
              Dianalisis pada: {new Date(result.timestamp).toLocaleString('id-ID')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

VerificationResult.propTypes = {
  result: PropTypes.shape({
    summary: PropTypes.string,
    isHoax: PropTypes.bool, // true for hoax, false for fact, null/undefined if not determined
    isUncertain: PropTypes.bool, // Optional flag for uncertain states
    // Add other expected properties from the API response here
    // e.g., details: PropTypes.string, evidence: PropTypes.array
  }),
  isLoading: PropTypes.bool,
};

VerificationResult.defaultProps = {
  result: null,
  isLoading: false,
};

export default VerificationResult;
