import React from 'react';

const LoadingSpinner = ({ size = 'md', text = 'Menganalisis berita...', color = 'blue' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    blue: 'border-blue-500',
    green: 'border-green-500',
    red: 'border-red-500',
    gray: 'border-gray-500',
    primary: 'border-primary-500'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-6">
      {/* Main spinner */}
      <div className="relative">
        <div
          className={`${sizeClasses[size]} ${colorClasses[color]} border-4 border-t-transparent rounded-full animate-spin`}
        ></div>
        {/* Inner pulse effect */}
        <div
          className={`absolute inset-0 ${sizeClasses[size]} border-2 border-primary-200 rounded-full animate-ping opacity-75`}
        ></div>
      </div>
      
      {/* Loading text with typing animation */}
      {text && (
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-gray-700 animate-pulse">{text}</p>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
          </div>
          <p className="text-sm text-gray-500">AI sedang memproses konten...</p>
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;
