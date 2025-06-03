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
    <textarea
      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out disabled:bg-gray-100 disabled:cursor-not-allowed"
      rows="10"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      aria-label="News article input"
    />
  );
};

NewsInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

export default NewsInput;
