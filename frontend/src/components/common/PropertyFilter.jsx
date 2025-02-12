import React, { useState, useEffect } from "react";
import { Home, MapPin, Star, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../common/Http";

function PropertyFilter() {
  const [selectedType, setSelectedType] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [imageIndices, setImageIndices] = useState({});
  const [slideDirection, setSlideDirection] = useState({});
  const itemsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await fetch(`${apiUrl}/properties`);
      const data = await response.json();
      setProperties(data);
      
     
      const indices = {};
      const directions = {};
      data.forEach(property => {
        indices[property.id] = 0;
        directions[property.id] = 'next';
      });
      setImageIndices(indices);
      setSlideDirection(directions);
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndices(prevIndices => {
        const newIndices = { ...prevIndices };
        properties.forEach(property => {
          if (property.images && property.images.length > 0) {
            newIndices[property.id] = (prevIndices[property.id] + 1) % property.images.length;
          }
        });
        return newIndices;
      });
      setSlideDirection(prev => {
        const newDirections = { ...prev };
        properties.forEach(property => {
          newDirections[property.id] = 'next';
        });
        return newDirections;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [properties]);

  const filteredProperties = properties.filter((property) => {
    const matchesType =
      selectedType === "all" || property.type === selectedType;
    const matchesPrice =
      (!minPrice || property.monthlyFee >= minPrice) &&
      (!maxPrice || property.monthlyFee <= maxPrice);
    const matchesSearch =
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesPrice && matchesSearch;
  });

  const handleImageNav = (propertyId, direction) => {
    setSlideDirection(prev => ({
      ...prev,
      [propertyId]: direction
    }));
    setImageIndices(prev => {
      const currentIndex = prev[propertyId];
      const imagesLength = properties.find(p => p.id === propertyId).images.length;
      let newIndex;
      if (direction === 'prev') {
        newIndex = currentIndex === 0 ? imagesLength - 1 : currentIndex - 1;
      } else {
        newIndex = (currentIndex + 1) % imagesLength;
      }
      return {
        ...prev,
        [propertyId]: newIndex
      };
    });
  };

  const PropertyCard = ({ property }) => {
    const currentImageIndex = imageIndices[property.id] || 0;
    const direction = slideDirection[property.id];
    
    const getSlideAnimation = (index) => {
      if (index === currentImageIndex) {
        return direction === 'next' ? 'slide-in-right' : 'slide-in-left';
      }
      return direction === 'next' ? 'slide-out-left' : 'slide-out-right';
    };

    return (
      <div
        className="overflow-hidden transition-transform transform bg-gray-800 border border-gray-600 rounded-lg shadow-lg cursor-pointer hover:shadow-2xl hover:scale-105"
        onClick={() => navigate(`/details/${property.id}`)}
      >
        <div className="relative w-full h-48 group">
          <style>
            {`
              @keyframes slide-in-right {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
              }
              @keyframes slide-in-left {
                from { transform: translateX(-100%); }
                to { transform: translateX(0); }
              }
              @keyframes slide-out-left {
                from { transform: translateX(0); }
                to { transform: translateX(-100%); }
              }
              @keyframes slide-out-right {
                from { transform: translateX(0); }
                to { transform: translateX(100%); }
              }
              .slide-in-right {
                animation: slide-in-right 0.5s forwards;
              }
              .slide-in-left {
                animation: slide-in-left 0.5s forwards;
              }
              .slide-out-left {
                animation: slide-out-left 0.5s forwards;
              }
              .slide-out-right {
                animation: slide-out-right 0.5s forwards;
              }
            `}
          </style>
          
          {property.images && property.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${property.name} - View ${index + 1}`}
              className={`absolute inset-0 object-cover w-full h-full ${
                index === currentImageIndex ? 'z-10' : 'z-0'
              } ${getSlideAnimation(index)}`}
            />
          ))}

          

          {/* Image Indicators */}
          <div className="absolute left-0 right-0 z-20 flex justify-center space-x-2 bottom-2">
            {property.images && property.images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-semibold text-white">
            {property.name}
          </h3>
          <div className="flex items-center mt-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="ml-2 text-gray-300">
              {property.location}
            </span>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-2xl font-bold text-purple-400">
              Rs.{property.monthlyFee}/mo
            </span>
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="ml-1 text-gray-300">
                {property.rating}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = filteredProperties.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h2 className="mb-6 text-2xl font-bold text-white">Properties</h2>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <input
            type="number"
            placeholder="Min Price"
            className="w-24 px-2 py-2 text-white bg-gray-800 rounded-md focus:outline-none"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max Price"
            className="w-24 px-2 py-2 text-white bg-gray-800 rounded-md focus:outline-none"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <div className="relative w-full max-w-md">
            <Search className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
            <input
              type="text"
              placeholder="Search by location, type, or name..."
              className="w-full py-2 pl-10 pr-4 text-white bg-gray-800 rounded-md focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Property List */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {currentProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`mx-2 px-4 py-2 rounded-md transition-all duration-300 ${
                currentPage === index + 1
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PropertyFilter;