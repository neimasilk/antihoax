import React from 'react';

function NewsInput({ value, onChange }) {
  return (
    <textarea
      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      rows="5"
      placeholder="Masukkan teks berita di sini..."
      value={value}
      onChange={onChange}
    />
  );
}

export default NewsInput;
