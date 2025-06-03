/**
 * NewsInput Component
 *
 * Textarea khusus untuk memasukkan teks berita yang akan diverifikasi.
 * Menggunakan styling dari Tailwind CSS untuk tampilan modern dan responsif.
 *
 * @component
 * @param {string} value - Nilai teks saat ini dalam textarea.
 * @param {function} onChange - Fungsi callback yang dipanggil ketika teks berubah.
 * @param {string} [placeholder="Masukkan teks berita di sini..."] - Teks placeholder untuk textarea.
 * @param {boolean} [disabled=false] - Status nonaktif textarea, berguna saat proses loading.
 * @returns {JSX.Element} Element textarea yang telah distyling.
 *
 * @example
 * const [news, setNews] = useState("");
 * return <NewsInput value={news} onChange={(e) => setNews(e.target.value)} />
 */
import React from 'react';
import PropTypes from 'prop-types';

const NewsInput = ({ value, onChange, placeholder = "Masukkan teks berita di sini...", disabled = false }) => {
  return (
    <div className="relative">
      <textarea
        className="w-full p-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-500 resize-none bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-400 hover:border-gray-300 min-h-[200px]"
        rows="8"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        aria-label="News article input"
        style={{ lineHeight: '1.6' }}
      />
      {/* Character count indicator */}
      <div className="absolute top-3 right-3">
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          value.length > 0 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
        }`}>
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          {value.length > 0 ? 'Mengetik...' : 'Siap'}
        </div>
      </div>
      {/* Bottom border accent */}
      <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-xl transition-all duration-300 ${
        value.length > 0 ? 'w-full opacity-100' : 'w-0 opacity-0'
      }`}></div>
    </div>
  );
};

NewsInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

export default NewsInput;
