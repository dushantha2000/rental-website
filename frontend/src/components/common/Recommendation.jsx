import React, { useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import '/src/css/embla.css';
import { MapPin, Star, Filter, Search } from "lucide-react";

const EmblaCarousel = (props) => {
  const { slides, options } = props;
  const [emblaRef] = useEmblaCarousel(options);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data for demonstration (this should be replaced with actual data)
  const properties = [
    {
      id: 1,
      title: "Cozy Downtown Apartment",
      location: "New York, NY",
      rent: "$4,500",
      rating: 4.9,
      image: "/src/assets/images/1.jpg"
    },
    {
      id: 2,
      title: "Luxury Penthouse",
      location: "Los Angeles, CA",
      rent: "$10,000",
      rating: 5.0,
      image: "/src/assets/images/2.jpg"
    },
    {
      id: 3,
      title: "Modern Studio",
      location: "San Francisco, CA",
      rent: "$2,800",
      rating: 4.7,
      image: "/src/assets/images/3.jpg"
    },
    // Add more properties as needed
  ];

  const handleSearch = () => {
    // Implement search logic here
  };

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="embla">
      <div className="bg-gray-900">
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Recommendations</h2>
            <div className="flex items-center">
              <Search className="w-5 h-5 ml-2 text-gray-400" />
              <input
                type="text"
                placeholder="Enter location, property type, or keywords..."
                className="w-full px-4 py-2 text-white placeholder-gray-400 bg-gray-900 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={handleSearch} className="px-6 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700">
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
