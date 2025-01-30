import React, { useState } from 'react';
import { Search } from 'lucide-react';

function Hero() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Logic to handle search without API call can be added here
  };

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative bg-gradient-to-r from-purple-900 to-blue-900 h-96"
        style={{
          backgroundImage: "url('/src/assets/images/hero-1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Find Your Perfect Rental Home
            </h1>
            <p className="mt-3 text-xl text-gray-300">
              Thousands of quality rental properties waiting for you
            </p>

            <div className="mt-8 max-w-3xl mx-auto">
              <div className="flex items-center bg-gray-900 rounded-lg shadow-lg p-2 border border-gray-700">
                <Search className="h-5 w-5 text-gray-400 ml-2" />
                <input
                  type="text"
                  placeholder="Enter location, property type, or keywords..."
                  className="w-full px-4 py-2 bg-gray-900 text-white placeholder-gray-400 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch} className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
