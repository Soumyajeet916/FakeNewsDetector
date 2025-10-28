import React from 'react';

const Header = () => {
  return (
    <header className="w-full text-center p-6 md:p-8 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
        Fake News Detector
      </h1>
      <p className="text-gray-400 mt-2">Shining a light on modern misinformation.</p>
    </header>
  );
};

export default Header;