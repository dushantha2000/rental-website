import React, { useState, useEffect } from "react";
import { MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from '../common/Http';

function PropertyList() {
  const [sellerProperties, setSellerProperties] = useState([]); // Changed variable name
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const itemsPerPage = 8;
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchSellerProperties = async () => {
      setLoading(true);
      try {
        const userData = JSON.parse(localStorage.getItem("adminInfo"));
        const userId = userData?.id;

        if (!userId) {
          throw new Error("User ID not found in localStorage.");
        }

        const response = await fetch(`${apiUrl}/propertySeller/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setSellerProperties(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerProperties();
  }, []);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = sellerProperties.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sellerProperties.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h2 className="mb-6 text-2xl font-bold text-white">Properties</h2>

        {loading ? (
          <p className="text-white">Loading properties...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <>
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
                      <span className="text-2xl font-bold text-purple-400">
                        Rs.{property.monthlyFee}/mo
                      </span>
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <span className="ml-1 text-gray-300">{property.rating || "N/A"}</span>
                      </div>
                    </div>

                    <button
                      className="w-full bg-gray-600 text-white font-medium px-4 py-2 rounded-md hover:bg-red-400 transition duration-300"
                    >
                      Delete
                    </button>
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
          </>
        )}
      </div>
    </div>
  );
}

export default PropertyList;
