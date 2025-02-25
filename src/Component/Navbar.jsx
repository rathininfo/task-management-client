import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { IoMdAdd } from "react-icons/io";


const Navbar = () => {
  const { user, logout, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-sky-50 to-indigo-50 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
<div>
<Link to="/" className="text-2xl font-bold text-blue-600">
        Task Management 
        </Link>
</div>

        {/* Desktop Navigation & User Profile */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex gap-4">
            <Link to="/task" className="text-gray-700 hover:text-blue-500">
           <div className="flex justify-center items-center gap-2 font-bold border-2 px-3 py-2 rounded-md">
           <IoMdAdd/> Create Task  
           </div>
            </Link>
          </div>

          {/* User Profile & Logout */}
          {user ? (
            <div className="flex items-center gap-4">
              <div className="relative group flex items-center gap-2">
                <img
                  src={user.photoURL || "https://via.placeholder.com/40"}
                  alt="User"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                <p className="text-gray-700 hidden lg:block">
                  {user.displayName || "No Name"}
                </p>
              </div>
              {/* Logout Button (Always Visible) */}
              <button
                onClick={handleLogout}
                className="px-3 py-1 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded"
              >
                Logout
              </button>
            </div>
          ) : (
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
          )}

          {/* Mobile Menu Button */}
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
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 right-4 bg-white shadow-md rounded-md p-4 flex flex-col gap-4">
          <Link to="/" className="text-gray-700 hover:text-blue-500">
            Home
          </Link>
          <Link to="/tasks" className="text-gray-700 hover:text-blue-500">
            Tasks
          </Link>
          {user ? (
            <>
              <p className="text-gray-700">{user.displayName || "No Name"}</p>
              <button
                onClick={handleLogout}
                className="px-3 py-1 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded"
              >
                Logout
              </button>
            </>
          ) : (
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
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
