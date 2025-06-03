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
      <div className="p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-700">
        <p className="font-bold">Loading...</p>
        <p>Sedang memproses permintaan Anda. Mohon tunggu sebentar.</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="p-4 bg-gray-50 border-l-4 border-gray-500 text-gray-700">
        <p>Belum ada hasil. Masukkan teks berita dan klik tombol verifikasi.</p>
      </div>
    );
  }

  // Determine display properties based on a simplified result structure
  // This will need to be adapted based on the actual API response structure
  let bgColor = 'bg-gray-50';
  let borderColor = 'border-gray-500';
  let textColor = 'text-gray-700';
  let title = 'Hasil Verifikasi';
  let message = result.summary || 'Tidak ada ringkasan.'; // Assuming result is an object with a summary

  if (result.isHoax === true) {
    bgColor = 'bg-hoax-red/10'; // Lighter red
    borderColor = 'border-hoax-red';
    textColor = 'text-hoax-red';
    title = 'Indikasi Hoaks Terdeteksi';
  } else if (result.isHoax === false) {
    bgColor = 'bg-fact-green/10'; // Lighter green
    borderColor = 'border-fact-green';
    textColor = 'text-fact-green';
    title = 'Indikasi Fakta Terdeteksi';
  } else if (result.isUncertain) { // Example for uncertain cases
    bgColor = 'bg-neutral-yellow/10'; // Lighter yellow
    borderColor = 'border-neutral-yellow';
    textColor = 'text-neutral-yellow';
    title = 'Hasil Belum Dapat Dipastikan';
  }


  return (
    <div className={`p-4 ${bgColor} border-l-4 ${borderColor} ${textColor} shadow-md rounded-r-lg`}>
      <p className="font-bold text-lg mb-2">{title}</p>
      <p className="text-sm">{message}</p>
      {/* TODO: Add more detailed display of reasons or evidence if available in result */}
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
