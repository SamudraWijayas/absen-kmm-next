import React from "react";

const LandingPageFooter = () => {
  return (
    <footer className=" dark:from-gray-900 dark:to-black text-gray-800 dark:text-gray-200 border-t border-gray-200 dark:border-gray-700 px-6 py-6 mt-8">
      
      {/* Versi Aplikasi */}
      <div className="text-center mb-3 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">v1.0.0</span>
      </div>

      {/* Copyright & Developer */}
      <div className="text-center text-sm">
        &copy; 2025 <span className="font-semibold">Generusbdl</span>. Developed by{" "}
        <a
          href="https://samudrawjya.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-600 hover:text-blue-500 hover:underline transition-colors"
        >
          Sam
        </a>
      </div>
    </footer>
  );
};

export default LandingPageFooter;