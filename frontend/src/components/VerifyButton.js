import React from 'react';

function VerifyButton({ onClick }) {
  return (
    <button
      type="button"
      className="w-full mt-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" // Added w-full
      onClick={onClick}
    >
      Verifikasi
    </button>
  );
}

export default VerifyButton;
