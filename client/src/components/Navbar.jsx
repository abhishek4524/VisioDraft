import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Menu, X, UserRound } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setMenuOpen(false);
    window.location.href = "/";
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token") || "");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-10 py-4 relative">
        {/* Mobile Hamburger - Moved to left side */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="mr-2">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          
          {/* Logo - Moved next to hamburger on mobile */}
          <Link to="/" className="w-1/2 md:w-auto">
            <img src={assets.logo} alt="Logo" className="w-32 md:w-40" />
          </Link>
        </div>

        {/* Desktop Logo - Hidden on mobile */}
        <Link to="/" className="hidden md:block w-1/2 md:w-auto">
          <img src={assets.logo} alt="Logo" className="w-32 md:w-40" />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-12 text-base md:text-lg">
          {["PYQs", "Notes", "Upload Notes", "Ask AI", "Community"].map((text, index) => {
            const path = `/${text.toLowerCase().replace(/\s+/g, "-")}`;
            const isActive = location.pathname === path;

            return (
              <li
                key={index}
                className={`hover:scale-105 hover:font-semibold hover:text-blue-600 transition duration-200 ease-in-out ${
                  isActive ? "text-blue-500 font-semibold" : ""
                }`}
              >
                <Link to={path}>{text}</Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {token ? (
            <>
              {/* User Profile Icon - Desktop */}
              <Link to="/profile" className="
                h-12 w-12 
                rounded-full 
                bg-gradient-to-br from-gray-800 to-black
                shadow-lg
                border-2 border-white/20
                flex items-center justify-center
                cursor-pointer
                hover:scale-105
                hover:shadow-xl
                hover:border-white/30
                active:scale-95
                transition-all duration-200 ease-in-out
                group
              ">
                <UserRound className="
                  h-6 w-6 
                  text-gray-300 
                  group-hover:text-white
                  transition-colors duration-200
                " />
              </Link>
              
              <button
                onClick={handleLogout}
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
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-gray-300 px-4 py-2 rounded-full text-sm hover:scale-105 transition"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 px-4 py-2 text-white rounded-full text-sm hover:scale-105 transition"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile User Profile Icon - Only shown when logged in */}
        {token && (
          <div className="md:hidden
            h-10 w-10 
            rounded-full 
            bg-gradient-to-br from-gray-800 to-black
            shadow-md
            border border-white/20
            flex items-center justify-center
            cursor-pointer
            hover:scale-105
            active:scale-95
            transition-all duration-200 ease-in-out
          ">
            <Link to="/profile"><UserRound className="h-5 w-5 text-gray-300" /></Link>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-inner">
          <ul className="flex flex-col items-center gap-4 py-4 text-base">
            {["PYQs", "Notes", "Upload Notes", "Ask AI", "Community"].map((text, index) => (
              <li key={index} className="hover:text-blue-600 transition">
                <Link
                  to={`/${text.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-center gap-4 pb-4">
            {token ? (
              <button
                onClick={handleLogout}
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
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-gray-300 px-4 py-2 rounded-full text-sm hover:scale-105 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 px-4 py-2 text-white rounded-full text-sm hover:scale-105 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;