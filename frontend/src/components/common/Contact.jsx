import React from 'react';
import { MapPin, Mail, Phone, Globe, Send } from 'lucide-react';





const Contact = () => {
  return (
    <div className="min-h-screen px-4 py-20 bg-gradient-to-br from-gray-900 to-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Contact Us
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-300">
            Let's start a conversation! Whether you have questions, suggestions, or just want to connect, 
            we're all ears.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 p-8 bg-gray-900 bg-opacity-50 border border-gray-700 shadow-2xl lg:grid-cols-2 backdrop-blur-lg rounded-3xl">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4 group">
                <div className="p-3 transition-transform transform shadow-lg bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl group-hover:scale-105">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-100">Our Headquarters</h3>
                  <p className="text-gray-400">No. 10/1, Arthur's Place</p>
                  <p className="text-gray-400">Colombo 04, Sri Lanka</p>
                  <p className="mt-2 font-mono text-sm text-gray-500">6°53'39.5"N 79°51'13.1"E</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="p-3 transition-transform transform shadow-lg bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl group-hover:scale-105">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-100">Email Us</h3>
                  <p className="text-gray-400 transition-colors hover:text-blue-400">
                    info@rental.lk
                  </p>
                  <p className="text-gray-400 transition-colors hover:text-blue-400">
                    support@rental.lk
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="p-3 transition-transform transform shadow-lg bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl group-hover:scale-105">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-100">Online Presence</h3>
                  <p className="text-gray-400 transition-colors hover:text-blue-400">
                    www.rental.lk
                  </p>
                  <div className="flex mt-2 space-x-4">
                    <button className="text-gray-400 transition-colors hover:text-blue-400">
                      LinkedIn
                    </button>
                    <button className="text-gray-400 transition-colors hover:text-blue-400">
                      Twitter
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-64 overflow-hidden border border-gray-700 shadow-xl rounded-2xl">
              <img 
                src="/src/assets/images/map.JPG"
                alt="Location Map"
                className="object-cover w-full h-full transition-opacity opacity-80 hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block mb-2 font-medium text-gray-300">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-4 py-3 text-gray-300 placeholder-gray-500 transition-all bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-300">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 text-gray-300 placeholder-gray-500 transition-all bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-300">Message</label>
                  <textarea
                    rows="5"
                    className="w-full px-4 py-3 text-gray-300 placeholder-gray-500 transition-all bg-gray-800 border border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Your message..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-br from-purple-600  text-white font-semibold px-6 py-3 rounded-lg hover:from-purple-700 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>

            <div className="pt-8 border-t border-gray-700">
              <div className="text-center">
                <h3 className="mb-4 text-lg font-semibold text-gray-300">Direct Connect</h3>
                <div className="flex justify-center space-x-6">
                  <button className="p-3 transition-colors bg-gray-800 rounded-full shadow-lg hover:bg-gray-700">
                    <Phone className="w-6 h-6 text-blue-400" />
                  </button>
                  <button className="p-3 transition-colors bg-gray-800 rounded-full shadow-lg hover:bg-gray-700">
                    <Mail className="w-6 h-6 text-purple-400" />
                  </button>
                  <button className="p-3 transition-colors bg-gray-800 rounded-full shadow-lg hover:bg-gray-700">
                    <Globe className="w-6 h-6 text-blue-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;