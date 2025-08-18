import React from "react";
import PropTypes from "prop-types";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Navbar = ({ setToken }) => {
  return (
    <nav className="flex items-center justify-between py-2 px-4 md:px-8 lg:px-16 bg-white shadow-sm">
      <Link to="/">
        <img
          src={assets.logo}
          className="w-auto h-12 md:h-14"
          alt="Company Logo"
          aria-label="Company Logo"
        />
      </Link>
      <button
        onClick={() => setToken("")}
        className="
    bg-gradient-to-br from-red-500 to-red-600
    px-5 py-2.5
    rounded-full
    text-white font-medium
    shadow-md hover:shadow-lg
    transform hover:scale-105 active:scale-95
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75
    flex items-center justify-center
    space-x-2
  "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        <span>Logout</span>
      </button>
    </nav>
  );
};

Navbar.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Navbar;
