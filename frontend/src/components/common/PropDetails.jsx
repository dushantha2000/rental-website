import React, { useState } from 'react';
import { 
  MapPin, 
  Home,
  Square,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Phone
} from 'lucide-react';

const PropertyDetails = () => {
  const [currentImage, setCurrentImage] = useState(0);
  
  const property = {
    name: "Luxurious Beachfront Villa",
    location: "Palm Beach Drive, Miami",
    squareFeet: 3200,
    monthlyFee: 4500,
    description: "Modern beachfront villa with panoramic ocean views, featuring premium finishes and smart home technology throughout. The property includes a private pool, outdoor entertainment area, and direct beach access.",
    category: "Residential",
    sub_category: "Villa",
    status: "Available",
    features: [
      "4 Bedrooms",
      "3.5 Bathrooms",
      "Private Pool",
      "Smart Home System",
      "2-Car Garage",
      "Ocean View"
    ]
  };

  const images = [
    "/src/assets/images/11.jpg",
    "/api/placeholder/1200/800",
    "/api/placeholder/1200/800",
    "/api/placeholder/1200/800"
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Image Gallery */}
      <div className="relative h-[70vh] bg-gray-800">
        <img
          src={images[currentImage]}
          alt={`Property view ${currentImage + 1}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`w-2 h-2 rounded-full ${
                idx === currentImage ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {property.name}
                  </h1>
                  <div className="flex items-center text-gray-400 mb-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Home className="w-4 h-4 mr-2" />
                    <span>{property.category} - {property.sub_category}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-400">${property.monthlyFee}</div>
                  <div className="text-gray-400">per month</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-300">
                  <Square className="w-5 h-5 mr-2 text-blue-400" />
                  <span>{property.squareFeet} sq ft</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <DollarSign className="w-5 h-5 mr-2 text-blue-400" />
                  <span>Status: {property.status}</span>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <h2 className="text-xl font-bold text-white mb-4">Property Description</h2>
                <p className="text-gray-300 mb-4">{property.description}</p>
              </div>
            </div>

            {/* Property Features */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-gray-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold text-white mb-4">Schedule a Visit</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Your Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Preferred Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Preferred Time</label>
                  <input
                    type="time"
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="w-full bg-purple-600 text-white font-medium px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300">
                  Schedule Visit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;