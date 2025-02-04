import React, { useState, useEffect } from "react";


import {
  MapPin,
  Home,
  Square,
  DollarSign,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { apiUrl } from "../common/Http";
import { toast } from "react-toastify";

const PropertyDetails = ({ propertyId }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [property, setProperty] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, property_id: propertyId }),
      });

      if (response.ok) {
        toast.success("Booking successfully created!");
        setFormData({ name: "", email: "", phone: "", date: "", time: "" });
      } else {
        toast.error("Booking failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while booking.");
    }
  };

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      const response = await fetch(`${apiUrl}/properties/${propertyId}`);
      const data = await response.json();
      setProperty(data);
    };
    fetchPropertyDetails();
  }, [propertyId]);

  if (!property) return <div>Loading...</div>;

  const nextImage = () => {
    if (Array.isArray(property.images)) {
      setCurrentImage((prev) => (prev + 1) % property.images.length);
    }
  };

  const prevImage = () => {
    if (Array.isArray(property.images)) {
      setCurrentImage(
        (prev) => (prev - 1 + property.images.length) % property.images.length
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Image Gallery */}
      <div className="relative h-[70vh] bg-gray-800">
        {Array.isArray(property.images) && property.images.length > 0 ? (
          <>
            <img
              src={property.images[currentImage]}
              alt={`Property view ${currentImage + 1}`}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
            <button
              onClick={prevImage}
              className="absolute p-2 text-white transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full left-4 top-1/2 hover:bg-opacity-75"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute p-2 text-white transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full right-4 top-1/2 hover:bg-opacity-75"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="absolute flex space-x-2 transform -translate-x-1/2 bottom-4 left-1/2">
              {property.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`w-2 h-2 rounded-full ${
                    idx === currentImage ? "bg-white" : "bg-white bg-opacity-50"
                  }`}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-white">No images available</div>
        )}
      </div>

      {/* Main Content */}
      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Property Details */}
          <div className="lg:col-span-2">
            <div className="p-6 mb-8 bg-gray-800 rounded-lg">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="mb-2 text-3xl font-bold text-white">
                    {property.name}
                  </h1>
                  <div className="flex items-center mb-2 text-gray-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Home className="w-4 h-4 mr-2" />
                    <span>
                      {property.category} - {property.sub_category}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-400">
                    Rs.{property.monthlyFee}
                  </div>
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

              <div className="pt-6 border-t border-gray-700">
                <h2 className="mb-4 text-xl font-bold text-white">
                  Property Description
                </h2>
                <p className="mb-4 text-gray-300">{property.description}</p>
              </div>
            </div>

            {/* Property Features */}
            <div className="p-6 bg-gray-800 rounded-lg">
              <h2 className="mb-4 text-xl font-bold text-white">Features</h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {Array.isArray(property.features) ? (
                  property.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 text-gray-300"
                    >
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <span>{feature}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-300">No features available</div>
                )}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="sticky p-6 bg-gray-800 rounded-lg top-4">
              <h2 className="mb-4 text-xl font-bold text-white">
                Schedule a Visit
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Input */}
                <div>
                  <label className="block mb-2 text-gray-300">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange} // Add onChange to handle updates
                    className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="block mb-2 text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange} // Add onChange to handle updates
                    className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Phone Input */}
                <div>
                  <label className="block mb-2 text-gray-300">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange} // Add onChange to handle updates
                    className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Date Input */}
                <div>
                  <label className="block mb-2 text-gray-300">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange} // Add onChange to handle updates
                    className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Time Input */}
                <div>
                  <label className="block mb-2 text-gray-300">
                    Preferred Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange} // Add onChange to handle updates
                    className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full px-4 py-2 font-medium text-white transition duration-300 bg-purple-600 rounded-md hover:bg-purple-700"
                >
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
