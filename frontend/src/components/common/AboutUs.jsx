import React from 'react';
import { Users, Award, Clock, TrendingUp } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src="/src/assets/images/11.jpg"
          alt="About Us Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60">
          <div className="container mx-auto h-full flex items-center px-4">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Your Trusted Rental Partner in Sri Lanka
              </h1>
              <p className="text-xl text-gray-200">
                Providing exceptional rental services since 2010
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <p className="text-gray-300 mb-4">
                Founded in 2010, we began with a simple mission: to revolutionize the rental experience in Sri Lanka. What started as a small local operation has grown into one of the country's most trusted rental service providers.
              </p>
              <p className="text-gray-300">
                We take pride in our commitment to quality, transparency, and customer satisfaction. Our team of dedicated professionals works tirelessly to ensure that every rental experience exceeds expectations.
              </p>
            </div>
            <div className="relative h-72 rounded-lg overflow-hidden">
              <img
                src="/src/assets/images/14.jpg"
                alt="Our Story"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">10K+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">1000+</div>
              <div className="text-gray-300">Items Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">15+</div>
              <div className="text-gray-300">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-gray-300">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <Award className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                Quality Guarantee
              </h3>
              <p className="text-gray-300">
                All our rental items undergo rigorous quality checks to ensure the best experience for our customers.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <Clock className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                Timely Service
              </h3>
              <p className="text-gray-300">
                We value your time and ensure prompt delivery and pickup of all rental items.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <TrendingUp className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                Competitive Rates
              </h3>
              <p className="text-gray-300">
                Get the best value for your money with our transparent and competitive pricing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-gray-800 pd">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Our Team
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((member) => (
              <div key={member} className="text-center">
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-4">
                  <img
                    src="/src/assets/images/man-1.jpg"
                    alt={`Team Member ${member}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Team Member {member}
                </h3>
                <p className="text-gray-300">Position</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;