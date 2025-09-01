import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Menu, X, UserRound } from "lucide-react";
import { Link, useLocation ,useNavigate } from "react-router-dom";

import axios from "axios";
import { backendUrl } from "../App";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get(`${backendUrl}/api/user/user-profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
        setError(err.response?.data?.message || "Failed to load profile");

        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["PYQs", "Notes", "Upload Notes", "Ask AI", "Community"];

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-transparent backdrop-blur-none"
      }`}
      style={{ transform: "translateY(0)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu button and logo */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none active:scale-90"
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            <Link to="/" className="ml-4">
              <img src={assets.logo} alt="Logo" className="h-8 w-auto" />
            </Link>
          </div>

          {/* Desktop logo */}
          <div className="hidden md:flex items-center">
            <Link to="/">
              <img
                src={assets.logo}
                alt="Logo"
                className="h-10 w-auto hover:scale-105 transition-transform"
              />
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => {
                const path = `/${item.toLowerCase().replace(/\s+/g, "-")}`;
                const isActive = location.pathname === path;

                return (
                  <div
                    key={index}
                    className="hover:-translate-y-0.5 transition-transform"
                  >
                    <Link
                      to={path}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-blue-100 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      {item}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center space-x-3 ml-4">
            {token ? (
              <>
                <div className="hover:scale-105 active:scale-95 transition-transform">
                  <Link
                    to="/profile"
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-sm overflow-hidden"
                  >
                    {user?.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <UserRound className="h-5 w-5 text-white" />
                    )}
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="hover:scale-105 active:scale-95 transition-transform">
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all duration-200"
                  >
                    Log in
                  </Link>
                </div>

                <div className="hover:scale-105 active:scale-95 transition-transform">
                  <Link
                    to="/signup"
                    className="px-4 py-2 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    Sign up
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Mobile auth button */}
          {token && (
            <div className="md:hidden flex items-center">
              <div className="hover:scale-110 active:scale-90 transition-transform">
                <Link
                  to="/profile"
                  className="flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-sm"
                >
                  <UserRound className="h-4 w-4 text-white" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-white shadow-lg overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item, index) => {
            const path = `/${item.toLowerCase().replace(/\s+/g, "-")}`;
            const isActive = location.pathname === path;

            return (
              <div
                key={index}
                style={{
                  transitionDelay: `${index * 50}ms`,
                  transform: "translateX(0)",
                  opacity: 1,
                }}
              >
                <Link
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item}
                </Link>
              </div>
            );
          })}

          <div className="pt-4 border-t border-gray-200">
            {!token && (
              <>
                <div className="space-y-3" style={{ opacity: 1 }}>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block w-full px-4 py-3 rounded-full text-center text-base font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="block w-full px-4 py-3 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-base font-medium shadow-sm hover:shadow-md"
                  >
                    Sign up
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
