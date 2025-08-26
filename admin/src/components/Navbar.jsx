import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = ({ setToken, sidebarOpen, setSidebarOpen }) => {
  return (
    <nav className="flex items-center justify-between py-3 px-4 md:px-8 lg:px-16 bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center">
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 mr-2 text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        
        <Link to="/">
          <img
            src={assets.logo}
            className="w-auto h-10 md:h-12"
            alt="Company Logo"
          />
        </Link>
      </div>
      
      <button
        onClick={() => {
          localStorage.removeItem("token");
          setToken("");
        }}
        className="bg-gradient-to-br from-red-500 to-red-600 px-5 py-2.5 rounded-full text-white font-medium shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 flex items-center justify-center space-x-2"
      >
        <span>Logout</span>
      </button>
    </nav>
  );
};

export default Navbar;