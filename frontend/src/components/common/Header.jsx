import React, { useState, useEffect } from "react";
import { Home, User, Menu, X, Bell, Globe, Plus } from "lucide-react";

function CreativeHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
    if (adminInfo?.token) {
      setIsLoggedIn(true);
      setUserName(adminInfo.name);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminInfo");
    setIsLoggedIn(false);
    window.location.href = "/admin/login";
  };

  const handleAccount = () => {
    const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
    if (adminInfo.role === 'seller') {
      window.location.href = "/seller/dashboard";
    } else if (adminInfo.role === 'buyer') {
      window.location.href = "/buyer/dashboard";
    } else {
      window.location.href = "/admin/dashboard";
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Listings", href: "/listings" },
    { name: "Contact", href: "/contact" },
    { name: "About Us", href: "/about" },
    { name: "FAQ", href: "/faq" }
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Animated Logo */}
          <div className="flex items-center space-x-2 group">
            <div className="relative">
              <Home className="text-purple-600 transition-transform duration-300 h-9 w-9 group-hover:rotate-12" />
              <div className="absolute inset-0 border-2 border-purple-500 rounded-full animate-ping-slow opacity-20" />
            </div>
            <span className={`text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              DreamHome
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="items-center hidden space-x-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`font-medium transition-colors duration-200 ${
                  isScrolled 
                    ? 'text-gray-600 hover:text-purple-600' 
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <button className={`p-2 rounded-full ${isScrolled ? 'hover:bg-gray-100 text-gray-600' : 'text-white hover:bg-white/10'}`}>
              <Globe className="w-5 h-5" />
            </button>
            
            {isLoggedIn ? (
              <>
                <button className={`relative p-2 rounded-full ${isScrolled ? 'hover:bg-gray-100 text-gray-600' : 'text-white hover:bg-white/10'}`}>
                  <Bell className="w-5 h-5" />
                  <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
                </button>

                <div className="relative group">
                  <button className={`flex items-center space-x-2 ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                    <div className="flex items-center justify-center w-10 h-10 font-medium text-white rounded-full bg-gradient-to-r from-purple-500 to-blue-400">
                      {userName.charAt(0)}
                    </div>
                  </button>
                  
                  <div className="absolute right-0 invisible w-48 py-2 mt-2 transition-all duration-300 origin-top-right bg-white shadow-xl opacity-0 rounded-xl group-hover:visible group-hover:opacity-100">
                    <button 
                      onClick={handleAccount}
                      className="flex items-center w-full px-4 py-3 space-x-2 text-left text-gray-700 hover:bg-gray-50"
                    >
                      <User className="w-5 h-5 text-gray-400" />
                      <span>{userName || 'Account'}</span>
                    </button>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 space-x-2 text-left text-gray-700 hover:bg-gray-50"
                    >
                      <X className="w-5 h-5 text-gray-400" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="hidden space-x-3 lg:flex">
                <a
                  href="/admin/login"
                  className={`px-5 py-2.5 rounded-xl font-medium transition-all ${isScrolled ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'}`}
                >
                  Login
                </a>
                <a
                  href="/register"
                  className={`px-5 py-2.5 rounded-xl font-medium transition-all ${isScrolled ? 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50' : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'}`}
                >
                  Register
                </a>
              </div>
            )}

            <button
              className="p-2 rounded-full lg:hidden hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className={`h-6 w-6 ${isScrolled ? 'text-gray-600' : 'text-white'}`} />
              ) : (
                <Menu className={`h-6 w-6 ${isScrolled ? 'text-gray-600' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="py-4 space-y-4 border-t border-gray-100 lg:hidden">
            <nav className="grid gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {isLoggedIn ? (
              <div className="px-4 space-y-4">
                <button
                  onClick={handleAccount}
                  className="flex items-center w-full space-x-2 text-gray-300 hover:text-purple-400"
                >
                  <User className="w-5 h-5" />
                  <span>{userName || 'Account'}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-gray-300 hover:text-purple-400"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-4 space-y-3">
                <a
                  href="/admin/login"
                  className="block w-full py-2 text-center text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="block w-full py-2 text-center text-purple-400 border border-purple-600 rounded-lg hover:bg-purple-900"
                >
                  Register
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default CreativeHeader;