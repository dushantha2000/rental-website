import React, { useState } from 'react';
import { Search, Home, MapPin, Star, Filter, Building, Building2, BedDouble, Check } from 'lucide-react';

function PropertyFilter() {
    const [selectedType, setSelectedType] = useState('all');

    const propertyTypes = [
        { 
          id: 'apartment', 
          icon: Building, 
          label: 'Apartments', 
          count: 245,
          description: 'Modern urban living spaces'
        },
        { 
          id: 'house', 
          icon: Home, 
          label: 'Houses', 
          count: 189,
          description: 'Family homes with private spaces'
        },
        { 
          id: 'room', 
          icon: BedDouble, 
          label: 'Commercial Property', 
          count: 167,
          description: 'Affordable individual rooms'
        }
      ];
    
      const featuredProperties = [
        {
          id: 1,
          title: "Modern Villa with Pool",
          location: "Miami, FL",
          price: 2500,
          rating: 4.8,
          type: "house",
          image: "/src/assets/images/7.jpg"
        },
        {
          id: 2,
          title: "Cozy Downtown Apartment",
          location: "New York, NY",
          price: 3200,
          rating: 4.6,
          type: "apartment",
          image: "/src/assets/images/8.jpg"
        },
        {
          id: 3,
          title: "Beachfront Cottage",
          location: "Malibu, CA",
          price: 4500,
          rating: 4.9,
          type: "house",
          image: "/src/assets/images/1.jpg"
        }
      ];
    
      const filteredProperties = selectedType === 'all' 
        ? featuredProperties 
        : featuredProperties.filter(prop => prop.type === selectedType);
  return (
    <>
    <div className="min-h-screen bg-gray-900">
    {/* Property Type Filter */}
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white mb-6">Choose Property Type</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {propertyTypes.map(({ id, icon: Icon, label, count, description }) => (
            <button
              key={id}
              onClick={() => setSelectedType(id)}
              className={`group relative overflow-hidden rounded-xl transition-all duration-300 ${
                selectedType === id 
                  ? 'bg-purple-600' 
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30"></div>
              <div className="relative p-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${
                    selectedType === id 
                      ? 'bg-purple-500' 
                      : 'bg-gray-700 group-hover:bg-gray-600'
                  }`}>
                    <Icon className={`h-8 w-8 ${
                      selectedType === id 
                        ? 'text-white' 
                        : 'text-purple-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-lg font-semibold ${
                        selectedType === id 
                          ? 'text-white' 
                          : 'text-gray-200'
                      }`}>{label}</h3>
                      {selectedType === id && (
                        <Check className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <p className={`mt-1 text-sm ${
                      selectedType === id 
                        ? 'text-purple-200' 
                        : 'text-gray-400'
                    }`}>{description}</p>
                    <div className={`mt-3 inline-flex px-3 py-1 rounded-full text-sm ${
                      selectedType === id 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-gray-700 text-gray-300'
                    }`}>
                      {count} listings
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Properties */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Featured Properties</h2>
          <button className="flex items-center text-purple-400 hover:text-purple-300">
            <Filter className="h-5 w-5 mr-2" />
            Filter Results
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <div key={property.id} className="bg-gray-800 rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow border border-gray-700">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white">{property.title}</h3>
                <div className="flex items-center mt-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="ml-2 text-gray-300">{property.location}</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold text-purple-400">${property.price}/mo</span>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="ml-1 text-gray-300">{property.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </>
  );
}

export default PropertyFilter;

