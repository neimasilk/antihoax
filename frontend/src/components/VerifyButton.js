import React from 'react';

function VerifyButton({ onClick, disabled }) {
  return (
    <button
      type="button"
      className={`w-full mt-2 px-4 py-2 font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white'}`}
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? 'Memverifikasi...' : 'Verifikasi'}
    </button>
  );
}

export default VerifyButton;
