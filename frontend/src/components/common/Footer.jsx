import React from 'react'
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin 
} from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 w-full">
      <div className="container mx-auto px-4 py-12 max-w-screen-xl">
        {/* Subscription Section */}
        <div className="rounded-lg p-6 mb-8 max-w-4xl mx-auto">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-4">Stay Updated with DreamHome</h3>
            <p className="text-gray-400 mb-6">Subscribe to our newsletter for the latest property listings and exclusive offers</p>
            <div className="flex max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-2 rounded-l-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button 
                className="bg-purple-600 text-white px-6 py-2 rounded-r-lg hover:bg-purple-700 transition duration-300"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Existing Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Property Types</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-purple-400">Apartments</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">Houses</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">Single Rooms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">All Properties</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Popular Locations</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-purple-400">New York</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">Los Angeles</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">Miami</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">Chicago</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-purple-400">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-screen-xl">
            {/* Existing columns remain the same */}
            {/* ... */}
          </div>

          {/* Social Media and Copyright */}
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <div className="flex justify-center space-x-6 mb-4">
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