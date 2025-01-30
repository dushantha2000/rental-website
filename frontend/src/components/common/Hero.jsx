import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { apiUrl } from '../common/Http'; // Import the API URL

function Hero({ setSearchResults }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    try {
      const response = await fetch(`${apiUrl}/properties/search?query=${searchQuery}`);
      const data = await response.json();
      setSearchResults(data); 
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <>
      <div
        className="relative bg-gradient-to-r from-purple-900 to-blue-900 h-96"
        style={{
          backgroundImage: "url('/src/assets/images/hero-1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Find Your Perfect Rental Home
            </h1>
            <p className="mt-3 text-xl text-gray-300">
              Thousands of quality rental properties waiting for you
            </p>

            
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
