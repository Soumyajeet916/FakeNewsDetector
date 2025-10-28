import React from 'react';
import { Github } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full flex items-center justify-between p-6 md:p-8 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-800">
      {/* Left / Centered Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
        Fake News Detector
      </h1>

      {/* Right GitHub Icon */}
      <a
        href="https://github.com/Soumyajeet916/FakeNewsDetector"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-white transition-colors"
        aria-label="View on GitHub"
      >
        <Github className="h-7 w-7" />
      </a>
    </header>
  );
};

export default Header;
