import React, { useState, useEffect } from "react";
import { Home, MapPin, Star, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from '../common/Http';

function PropertyFilter() {
  const [selectedType, setSelectedType] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchProperties = async () => {
      const response = await fetch(`${apiUrl}/properties`);
      const data = await response.json();
      setProperties(data);
    };
    fetchProperties();
  }, []);

  const filteredProperties = properties.filter((property) => {
    const matchesType = selectedType === "all" || property.type === selectedType;
    const matchesPrice = (!minPrice || property.monthlyFee >= minPrice) && (!maxPrice || property.monthlyFee <= maxPrice);
    const matchesSearch = property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          property.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesPrice && matchesSearch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h2 className="mb-6 text-2xl font-bold text-white">Properties</h2>
        
        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <select
            className="px-4 py-2 text-white bg-gray-800 rounded-md focus:outline-none"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
          </select>
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
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by location, type, or name..."
              className="w-full pl-10 pr-4 py-2 text-white bg-gray-800 rounded-md focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Property List */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {currentProperties.map((property) => (
            <div
              key={property.id}
              className="overflow-hidden transition-transform transform bg-gray-800 border border-gray-600 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105"
              onClick={() => navigate(`/details/${property.id}`)}
            >
              <img
                src={property.images[0]}
                alt={property.name}
                className="object-cover w-full h-48"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white">{property.name}</h3>
                <div className="flex items-center mt-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="ml-2 text-gray-300">{property.location}</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold text-purple-400">Rs.{property.monthlyFee}/mo</span>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="ml-1 text-gray-300">{property.rating}</span>
                  </div>
                </div>
              </div>
            </div>
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
