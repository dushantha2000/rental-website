import React, { useState } from "react";
import { Home, MapPin, Star, Building, BedDouble, Check } from "lucide-react";

function PropertyFilter() {
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const propertyTypes = [
    {
      id: "apartment",
      icon: Building,
      label: "Apartments",
      count: 245,
      description: "Modern urban living spaces",
    },
    {
      id: "house",
      icon: Home,
      label: "Houses",
      count: 189,
      description: "Family homes with private spaces",
    },
    {
      id: "room",
      icon: BedDouble,
      label: "Commercial Property",
      count: 167,
      description: "Affordable individual rooms",
    },
  ];

  // Sample data for properties
  const sampleProperties = [
    {
      id: 1,
      title: "Modern Villa with Pool",
      location: "Miami, FL",
      price: 2500,
      rating: 4.8,
      type: "house",
      image: "/src/assets/images/7.jpg",
    },
    {
      id: 2,
      title: "Cozy Downtown Apartment",
      location: "New York, NY",
      price: 3200,
      rating: 4.6,
      type: "apartment",
      image: "/src/assets/images/8.jpg",
    },
    {
      id: 3,
      title: "Beachfront Cottage",
      location: "Malibu, CA",
      price: 4500,
      rating: 4.9,
      type: "house",
      image: "/src/assets/images/1.jpg",
    },
    {
      id: 4,
      title: "Luxury Condo",
      location: "Los Angeles, CA",
      price: 5000,
      rating: 4.7,
      type: "apartment",
      image: "/src/assets/images/2.jpg",
    },
    {
      id: 5,
      title: "Charming Bungalow",
      location: "Austin, TX",
      price: 2800,
      rating: 4.5,
      type: "house",
      image: "/src/assets/images/3.jpg",
    },
    {
      id: 6,
      title: "Stylish Studio",
      location: "San Francisco, CA",
      price: 3500,
      rating: 4.6,
      type: "room",
      image: "/src/assets/images/4.jpg",
    },
    {
      id: 7,
      title: "Modern Loft",
      location: "Chicago, IL",
      price: 4000,
      rating: 4.8,
      type: "apartment",
      image: "/src/assets/images/5.jpg",
    },
    {
      id: 8,
      title: "Cozy Cabin",
      location: "Denver, CO",
      price: 2200,
      rating: 4.4,
      type: "house",
      image: "/src/assets/images/6.jpg",
    },
  ];

  // Calculate the properties to display based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = sampleProperties.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(sampleProperties.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sample Properties Display */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          Sample Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProperties.map((property) => (
            <div
              key={property.id}
              className="bg-gray-800 rounded-lg shadow-xl overflow-hidden hover:shadow-2xl border border-gray-700 transform hover:scale-105 transition-transform"
            >
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white">
                  {property.title}
                </h3>
                <div className="flex items-center mt-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="ml-2 text-gray-300">
                    {property.location}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold text-purple-400">
                    ${property.price}/mo
                  </span>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="ml-1 text-gray-300">
                      {property.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination Buttons */}
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
