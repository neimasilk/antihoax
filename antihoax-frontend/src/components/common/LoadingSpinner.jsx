/**
 * LoadingSpinner Component
 *
 * Displays a loading indicator.
 *
 * @param {string} [text=null] - Message to display below the spinner.
 * @param {string} [size="md"] - Size of the spinner (sm, md, lg).
 * @param {string} [color="text-blue-600"] - Tailwind CSS color class for the spinner.
 */
import React from 'react';
import PropTypes from 'prop-types';

const LoadingSpinner = ({ size = 'md', text = null, color = 'text-blue-600' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-4',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center" aria-live="polite" aria-busy="true">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size] || sizeClasses['md']} ${color} border-t-transparent`}
        role="status" // Explicitly define as a status role for accessibility
      >
        <span className="sr-only">Loading...</span>
      </div>
      {text && <p className={`mt-3 text-sm font-medium ${color === 'text-blue-600' ? 'text-gray-700' : color}`}>{text}</p>}
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  text: PropTypes.string,
  color: PropTypes.string, // e.g., 'text-red-500'
};

export default LoadingSpinner;
