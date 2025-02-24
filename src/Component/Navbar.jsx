import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";


const Navbar = () => {
  const { user, logout, setUser } = useContext(AuthContext); // User context with user details
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null); // Clear user data from context
      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-sky-50 to-indigo-50 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Task
        </Link>

        {/* Hamburger Icon */}
        <button
          className="block lg:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } lg:flex flex-col lg:flex-row gap-4 absolute lg:static top-14 right-4  rounded-md p-4 z-50 justify-center items-center`}
        >
      
          {/* Authentication Buttons */}
          <div className="mt-2 flex flex-col gap-2 lg:flex-row lg:mt-0">
            {!user ? (
              <>
                <button
                  onClick={() => navigate("/auth/login")}
                  className="px-3 py-1 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/auth/register")}
                  className="px-3 py-1 border border-green-500 text-green-500 hover:bg-green-500 hover:text-white rounded"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                <div className="relative group">
                  <img
                    src={user.photoURL || "https://via.placeholder.com/40"}
                    alt="User"
                    className="w-10 h-10 rounded-full cursor-pointer"
                  />
                  <div className="absolute left-0 mt-2 bg-white border border-gray-300 shadow-md rounded px-2 py-1 text-sm text-gray-600 hidden group-hover:block">
                    <p>{user.displayName || "No Name"}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
