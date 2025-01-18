import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import "/src/css/embla.css";
import { MapPin, Star, Filter } from "lucide-react";

const EmblaCarousel = (props) => {
  const { slides, options } = props;
  const [emblaRef] = useEmblaCarousel(options);

  return (
    <section className="embla">
      <div className="bg-gray-900">
        {/* Featured Properties */}
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">Recommendations</h2>
            <button className="flex items-center text-purple-400 hover:text-purple-300">
              <Filter className="h-5 w-5 mr-2" />
              Filter Results
            </button>
          </div>

          {/* Embla Carousel */}
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="embla__slide rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-10" />
                  <div className="absolute top-4 left-4 z-20 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">
                    <span className="text-white text-sm font-medium">
                      Featured
                    </span>
                  </div>

                  <img
                    src="/src/assets/images/1.jpg"
                    alt="Cozy Downtown Apartment"
                    className="w-full h-52 object-cover"
                  />
                </div>
                <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Cozy Downtown Apartment
                  </h3>
                  <div className="flex items-center mb-4">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="ml-2 text-gray-300">New York, NY</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <span className="text-sm text-gray-400">
                        Monthly Rent
                      </span>
                      <div className="text-2xl font-bold text-white">
                        $4,500
                      </div>
                    </div>
                    <div className="flex items-center bg-white/5 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="ml-1 text-white">4.9</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="embla__slide rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-10" />
                  <div className="absolute top-4 left-4 z-20 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">
                    <span className="text-white text-sm font-medium">
                      Premium
                    </span>
                  </div>
                  <img
                    src="/src/assets/images/2.jpg"
                    alt="Luxury Penthouse"
                    className="w-full h-52 object-cover"
                  />
                </div>
                <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Luxury Penthouse
                  </h3>
                  <div className="flex items-center mb-4">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="ml-2 text-gray-300">Los Angeles, CA</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <span className="text-sm text-gray-400">
                        Monthly Rent
                      </span>
                      <div className="text-2xl font-bold text-white">
                        $10,000
                      </div>
                    </div>
                    <div className="flex items-center bg-white/5 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="ml-1 text-white">5.0</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="embla__slide rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-10" />
                  <div className="absolute top-4 left-4 z-20 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">
                    <span className="text-white text-sm font-medium">New</span>
                  </div>
                  <img
                    src="/src/assets/images/3.jpg"
                    alt="Modern Studio"
                    className="w-full h-52 object-cover"
                  />
                </div>
                <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Modern Studio
                  </h3>
                  <div className="flex items-center mb-4">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="ml-2 text-gray-300">
                      San Francisco, CA
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <span className="text-sm text-gray-400">
                        Monthly Rent
                      </span>
                      <div className="text-2xl font-bold text-white">
                        $2,800
                      </div>
                    </div>
                    <div className="flex items-center bg-white/5 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="ml-1 text-white">4.7</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Card 3 */}
              <div className="embla__slide rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-10" />
                  <div className="absolute top-4 left-4 z-20 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">
                    <span className="text-white text-sm font-medium">New</span>
                  </div>
                  <img
                    src="/src/assets/images/8.jpg"
                    alt="Modern Studio"
                    className="w-full h-52 object-cover"
                  />
                </div>
                <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Modern Studio
                  </h3>
                  <div className="flex items-center mb-4">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="ml-2 text-gray-300">
                      San Francisco, CA
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <span className="text-sm text-gray-400">
                        Monthly Rent
                      </span>
                      <div className="text-2xl font-bold text-white">
                        $2,800
                      </div>
                    </div>
                    <div className="flex items-center bg-white/5 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="ml-1 text-white">4.7</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Card 3 */}
              <div className="embla__slide rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-10" />
                  <div className="absolute top-4 left-4 z-20 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">
                    <span className="text-white text-sm font-medium">New</span>
                  </div>
                  <img
                    src="/src/assets/images/7.jpg"
                    alt="Modern Studio"
                    className="w-full h-52 object-cover"
                  />
                </div>
                <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Modern Studio
                  </h3>
                  <div className="flex items-center mb-4">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="ml-2 text-gray-300">
                      San Francisco, CA
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <span className="text-sm text-gray-400">
                        Monthly Rent
                      </span>
                      <div className="text-2xl font-bold text-white">
                        $2,800
                      </div>
                    </div>
                    <div className="flex items-center bg-white/5 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="ml-1 text-white">4.7</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Card 3 */}
              <div className="embla__slide rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-10" />
                  <div className="absolute top-4 left-4 z-20 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">
                    <span className="text-white text-sm font-medium">New</span>
                  </div>
                  <img
                    src="/src/assets/images/10.jpg"
                    alt="Modern Studio"
                    className="w-full h-52 object-cover"
                  />
                </div>
                <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Modern Studio
                  </h3>
                  <div className="flex items-center mb-4">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="ml-2 text-gray-300">
                      San Francisco, CA
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <span className="text-sm text-gray-400">
                        Monthly Rent
                      </span>
                      <div className="text-2xl font-bold text-white">
                        $2,800
                      </div>
                    </div>
                    <div className="flex items-center bg-white/5 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="ml-1 text-white">4.7</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Card 3 */}
              <div className="embla__slide rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-10" />
                  <div className="absolute top-4 left-4 z-20 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">
                    <span className="text-white text-sm font-medium">New</span>
                  </div>
                  <img
                    src="/src/assets/images/11.jpg"
                    alt="Modern Studio"
                    className="w-full h-52 object-cover"
                  />
                </div>
                <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Modern Studio
                  </h3>
                  <div className="flex items-center mb-4">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="ml-2 text-gray-300">
                      San Francisco, CA
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <span className="text-sm text-gray-400">
                        Monthly Rent
                      </span>
                      <div className="text-2xl font-bold text-white">
                        $2,800
                      </div>
                    </div>
                    <div className="flex items-center bg-white/5 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="ml-1 text-white">4.7</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Card 3 */}
              <div className="embla__slide rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-10" />
                  <div className="absolute top-4 left-4 z-20 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">
                    <span className="text-white text-sm font-medium">New</span>
                  </div>
                  <img
                    src="/src/assets/images/12.jpg"
                    alt="Modern Studio"
                    className="w-full h-52 object-cover"
                  />
                </div>
                <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Modern Studio
                  </h3>
                  <div className="flex items-center mb-4">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="ml-2 text-gray-300">
                      San Francisco, CA
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <span className="text-sm text-gray-400">
                        Monthly Rent
                      </span>
                      <div className="text-2xl font-bold text-white">
                        $2,800
                      </div>
                    </div>
                    <div className="flex items-center bg-white/5 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="ml-1 text-white">4.7</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Card 3 */}
              <div className="embla__slide rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-10" />
                  <div className="absolute top-4 left-4 z-20 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">
                    <span className="text-white text-sm font-medium">New</span>
                  </div>
                  <img
                    src="/src/assets/images/13.jpg"
                    alt="Modern Studio"
                    className="w-full h-52 object-cover"
                  />
                </div>
                <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Modern Studio
                  </h3>
                  <div className="flex items-center mb-4">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="ml-2 text-gray-300">
                      San Francisco, CA
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <span className="text-sm text-gray-400">
                        Monthly Rent
                      </span>
                      <div className="text-2xl font-bold text-white">
                        $2,800
                      </div>
                    </div>
                    <div className="flex items-center bg-white/5 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="ml-1 text-white">4.7</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Card 3 */}
              <div className="embla__slide rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-10" />
                  <div className="absolute top-4 left-4 z-20 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">
                    <span className="text-white text-sm font-medium">New</span>
                  </div>
                  <img
                    src="/src/assets/images/14.jpg"
                    alt="Modern Studio"
                    className="w-full h-52 object-cover"
                  />
                </div>
                <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Modern Studio
                  </h3>
                  <div className="flex items-center mb-4">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="ml-2 text-gray-300">
                      San Francisco, CA
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <span className="text-sm text-gray-400">
                        Monthly Rent
                      </span>
                      <div className="text-2xl font-bold text-white">
                        $2,800
                      </div>
                    </div>
                    <div className="flex items-center bg-white/5 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="ml-1 text-white">4.7</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Card 3 */}
              <div className="embla__slide rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-10" />
                  <div className="absolute top-4 left-4 z-20 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">
                    <span className="text-white text-sm font-medium">New</span>
                  </div>
                  <img
                    src="/src/assets/images/15.jpg"
                    alt="Modern Studio"
                    className="w-full h-52 object-cover"
                  />
                </div>
                <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Modern Studio
                  </h3>
                  <div className="flex items-center mb-4">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="ml-2 text-gray-300">
                      San Francisco, CA
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <span className="text-sm text-gray-400">
                        Monthly Rent
                      </span>
                      <div className="text-2xl font-bold text-white">
                        $2,800
                      </div>
                    </div>
                    <div className="flex items-center bg-white/5 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="ml-1 text-white">4.7</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
