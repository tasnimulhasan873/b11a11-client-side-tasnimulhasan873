
import React from 'react';

const PulsingDotLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-transparent">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-green-600 rounded-full animate-pulse-delay-1"></div>
        <div className="w-4 h-4 bg-green-600 rounded-full animate-pulse-delay-2"></div>
        <div className="w-4 h-4 bg-green-600 rounded-full animate-pulse-delay-3"></div>
      </div>
      <p className="mt-4 text-lg font-medium text-gray-700">Loading your food content...</p>
    </div>
  );
};

export default PulsingDotLoader;