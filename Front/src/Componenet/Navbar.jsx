import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ userData }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Get initials for profile icon
  const getInitials = (firstname, lastname) => {
    if (!firstname && !lastname) return "U"; // default
    return (
      (firstname ? firstname.charAt(0).toUpperCase() : "") +
      (lastname ? lastname.charAt(0).toUpperCase() : "")
    );
  };

  // Logout
  const handleLogout = () => {
    sessionStorage.removeItem("LoginData");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 shadow-lg">
      <div className="flex items-center justify-between">
      
        <Link
          to="/"
          className="text-2xl font-bold hover:text-gray-200 transition-colors"
        >
          🧺 Fresh Wash
        </Link>

        <div className="flex items-center space-x-4">
          <Link className="hover:text-gray-200 font-medium transition-colors" to="/">
            Home
          </Link>
          <Link className="hover:text-gray-200 font-medium transition-colors" to="/Services">
            Services
          </Link>
          <Link className="hover:text-gray-200 font-medium transition-colors" to="/Aboutus">
            About Us
          </Link>
          <Link className="hover:text-gray-200 font-medium transition-colors" to="/ContactUS">
            Contact Us
          </Link>

          {userData && userData.firstname ? (
            <div className="relative">
    
              <div
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-10 h-10 bg-white text-purple-700 rounded-full flex items-center justify-center font-bold cursor-pointer select-none"
              >
                {getInitials(userData.firstname, userData.lastname)}
              </div>


              {menuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white text-purple-700 rounded-lg shadow-lg overflow-hidden z-10">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-purple-100 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => (window.location.href = "/login")}
              className="ml-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-full px-5 py-2 transition-all duration-200"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
