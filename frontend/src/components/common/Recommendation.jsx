import React, { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "/src/css/embla.css";
import { MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../common/Http";

const EmblaCarousel = (props) => {
  const { slides, options } = props;
  const [emblaRef] = useEmblaCarousel(options);
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${apiUrl}/properties`);
        if (!response.ok) throw new Error("Failed to fetch properties");
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, []);

  return (
    <section className="embla">
      <div className="bg-gray-900">
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8">Explore Properties</h2>

          <div className="embla__viewport" ref={emblaRef}>
            <div className="grid grid-cols-1 gap-8 embla__container md:grid-cols-2 lg:grid-cols-3">
              {properties.length > 0 ? (
                properties.map((property) => (
                  <div
                    key={property.id}
                    className="overflow-hidden transition-shadow shadow-xl embla__slide rounded-2xl hover:shadow-2xl"
                    onClick={() => navigate(`/details/${property.id}`)}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 to-transparent" />
                      <div className="absolute z-20 px-3 py-1 rounded-full top-4 left-4 bg-lime-300 backdrop-blur-md">
                        <span className="text-sm font-medium text-black">Rated</span>
                      </div>
                      <img
                        src="/src/assets/images/13.jpg"
                        alt={property.title}
                        className="object-cover w-full h-52 "
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
                          <div className="text-2xl font-bold text-white">Rs.{property.monthlyFee}</div>
                        </div>
                        <div className="flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="ml-1 text-white">4.8</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-white">No properties found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
