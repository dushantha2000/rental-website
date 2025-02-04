import React, { useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import '/src/css/embla.css';
import { MapPin, Star, Filter, Search } from "lucide-react";

const EmblaCarousel = (props) => {
  const { slides, options } = props;
  const [emblaRef] = useEmblaCarousel(options);
  
  const properties = [
    {
      id: 1,
      title: "Spacious 4-Bedroom Villa for Rent in Galle",
      location: "Galle",
      rent: "50,000",
      rating: 4.9,
      type: "Villa",
      image: ""
    },
    {
      id: 2,
      title: "10 Perch Residential Land for Rent in Nuwara Eliya",
      location: "Nuwara Eliya",
      rent: "25,000",
      rating: 5.0,
      type: "Land",
      image: ""
    },
    {
      id: 3,
      title: "Modern Studio",
      location: "Kurunagala",
      rent: "2,800",
      rating: 4.7,
      type: "Studio",
      image: ""
    },
    {
      id: 4,
      title: "High-Rise 3-Bedroom Apartment for Rent in Rajagiriya",
      location: "Colombo",
      rent: "15,000",
      rating: 4.7,
      type: "Apartment",
      image: ""
    },
    {
      id: 5,
      title: "Small Office Space for Rent in Nugegoda",
      location: "Nugegoda",
      rent: "60,000",
      rating: 4.7,
      type: "Office",
      image: ""
    }
  ];

  // Enhanced filtering states
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Get unique property types
  const propertyTypes = ['', ...new Set(properties.map(p => p.type))];

  // Advanced filtering function
  const filteredProperties = properties.filter(property => {
    const propertyRent = parseFloat(property.rent.replace(/,/g, ''));
    const matchesSearch = 
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = 
      !propertyType || property.type === propertyType;
    
    const matchesMinPrice = 
      !minPrice || propertyRent >= parseFloat(minPrice);
    
    const matchesMaxPrice = 
      !maxPrice || propertyRent <= parseFloat(maxPrice);

    return matchesSearch && matchesType && matchesMinPrice && matchesMaxPrice;
  });

  return (
    <section className="embla">
      <div className="bg-gray-900">
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white"></h2>
            <div className="flex items-center space-x-2">
              {/* Type Filter */}
              <select
                className="px-4 py-2 text-white bg-gray-800 rounded-md focus:outline-none"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                {propertyTypes.map(type => (
                  <option key={type} value={type}>
                    {type ? type : 'All Types'}
                  </option>
                ))}
              </select>

              {/* Price Range Filters */}
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

              {/* Search Input */}
              <Search className="w-5 h-5 ml-2 text-gray-400" />
              <input
                type="text"
                placeholder="Enter location, property type, or keywords..."
                className="w-full px-4 py-2 text-white placeholder-gray-400 bg-gray-900 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="px-6 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700">
                Search
              </button>
            </div>
          </div>

          <div className="embla__viewport" ref={emblaRef}>
            <div className="grid grid-cols-1 gap-8 embla__container md:grid-cols-2 lg:grid-cols-3">
              {filteredProperties.map(property => (
                <div key={property.id} className="overflow-hidden transition-shadow shadow-xl embla__slide rounded-2xl hover:shadow-2xl">
                  <div className="relative">
                    <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 to-transparent"/>
                    <div className="absolute z-20 px-3 py-1 rounded-full top-4 left-4 bg-white/10 backdrop-blur-md">
                      <span className="text-sm font-medium text-white">Featured</span>
                    </div>
                    <img
                      src={property.image}
                      alt={property.title}
                      className="object-cover w-full h-52"
                    />
                  </div>
                  <div className="p-6 bg-gradient-to-b from-gray-800 to-gray-900">
                    <h3 className="mb-2 text-lg font-semibold text-white">{property.title}</h3>
                    <div className="flex items-center mb-4">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="ml-2 text-gray-300">{property.location}</span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div>
                        <span className="text-sm text-gray-400">Monthly Rent</span>
                        <div className="text-2xl font-bold text-white">{property.rent}</div>
                      </div>
                      <div className="flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="ml-1 text-white">{property.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;