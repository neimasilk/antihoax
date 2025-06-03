import React from 'react';

function ResultDisplay({ result }) {
  return (
    <div className="mt-4 p-4 min-h-[100px] border border-gray-200 rounded-md bg-gray-50 shadow-sm">
      {result ? (
        <p className="text-sm text-gray-700">{result}</p>
      ) : (
        <p className="text-sm text-gray-400">Hasil verifikasi akan muncul di sini.</p>
      )}
    </div>
  );
}

export default ResultDisplay;
