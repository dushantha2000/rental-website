import React from 'react'
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin 
} from 'lucide-react'

function Footer() {
  return (
    <footer className="w-full bg-gray-900 border-t border-gray-800">
      <div className="container max-w-screen-xl px-4 py-12 mx-auto">
        {/* Subscription Section */}
        <div className="max-w-4xl p-6 mx-auto mb-8 rounded-lg">
          <div className="text-center">
            <h3 className="mb-4 text-xl font-bold text-white">Stay Updated with DreamHome</h3>
            <p className="mb-6 text-gray-400">Subscribe to our newsletter for the latest property listings and exclusive offers</p>
            <div className="flex max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-2 text-white bg-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button 
                className="w-full bg-gradient-to-br from-purple-600  text-white font-semibold  py-3  hover:from-purple-700 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Existing Footer Grid */}
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">Property Types</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-purple-400">Apartments</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">Houses</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">Single Rooms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">All Properties</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">Popular Locations</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-purple-400">New York</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">Los Angeles</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">Miami</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">Chicago</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-purple-400">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-purple-400">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">Fair Housing</a></li>
              </ul>
            </div>
          </div>
        </div>

        

        {/* Footer Grid */}
        <div className="max-w-screen-xl mx-auto">
          <div className="grid max-w-screen-xl grid-cols-1 gap-8 md:grid-cols-4">
            {/* Existing columns remain the same */}
            {/* ... */}
          </div>

          {/* Social Media and Copyright */}
          <div className="pt-8 mt-8 text-center border-t border-gray-800">
            <div className="flex justify-center mb-4 space-x-6">
              <a href="#" className="text-gray-400 hover:text-purple-400">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400">
                <Linkedin size={24} />
              </a>
            </div>
            <div className="text-center text-gray-400">
              <p>&copy; 2025 DreamHome Rentals. All rights reserved.</p>
            </div>
          </div>
        </div>
      
    </footer>
  )
}

export default Footer