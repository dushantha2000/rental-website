import React, { useState, useEffect } from "react";
import { Home, User } from "lucide-react";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");



  useEffect(() => {
    // Check if user is logged in
    const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
    if (adminInfo && adminInfo.token) {
      setIsLoggedIn(true);
      setUserName(adminInfo.name);// Use the stored name
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminInfo");
    setIsLoggedIn(false);
    window.location.href = "/admin/login"; // Redirect to login page
  };
  const handleAccount=()=>{
    const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
    if (adminInfo.role == 'seller'){
      window.location.href = "/seller/dashboard";
    }else if(adminInfo.role == 'buyer'){
      window.location.href = "/buyer/dashboard";
    }else{
      window.location.href = "/admin/dashboard";
    }
  }
  
  return (
    <>
      {/* Header section */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Home className="h-8 w-8 text-purple-500" />
              <span className="ml-2 text-xl font-bold text-white">
                DreamHome Rentals
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-300 hover:text-purple-400">
                Home
              </a>
              <a href="/listings" className="text-gray-300 hover:text-purple-400">
                Listings
              </a>
              <a href="/about" className="text-gray-300 hover:text-purple-400">
                About
              </a>
              <a href="/contact" className="text-gray-300 hover:text-purple-400">
                Contact
              </a>
            </nav>
            <div className="flex space-x-4">
              {isLoggedIn ? (
                // Account dropdown for logged-in user
                <div className="relative group flex space-x-4">
                  <button onClick={handleAccount} className="flex items-center space-x-2 text-white">
                    <User className="h-6 w-6" />
                    <span className="hidden md:block">Account</span>
                  </button>
                  <button onClick={handleLogout} className="bg-transparent text-white px-4 py-2 border border-white rounded hover:bg-purple-600">
                   Logout
                  </button>
                  
                </div>
              ) : (
                // Login and Register buttons for guests
                <>
                  <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                    <a href="/admin/login">Login</a>
                  </button>
                  <button  className="bg-transparent text-white px-4 py-2 border border-white rounded hover:bg-purple-600">
                    <a href="/register">Register</a>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
