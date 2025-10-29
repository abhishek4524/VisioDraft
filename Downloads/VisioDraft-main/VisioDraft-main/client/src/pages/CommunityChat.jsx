import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CommunityChatComponent from "../components/CommunityChat";

const CommunityChat = () => {
  const { id } = useParams();
  const [community, setCommunity] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        // Fetch user data
        const userRes = await axios.get(`${backendUrl}/api/user/user-profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCurrentUser(userRes.data.user);

        // Fetch community data
        const communityRes = await axios.get(
          `${backendUrl}/api/community/view/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setCommunity(communityRes.data.community);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError(err.response?.data?.message || "Failed to load data");

        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
        <p className="text-gray-600 font-medium">Loading community...</p>
      </div>
    );
  }

  return (
    <div className="flex w-full h-screen bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      {/* Mobile Navbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <Navbar />
      </div>

      {/* Sidebar Overlay for Mobile */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`w-72 min-h-screen border-r border-gray-200 bg-gradient-to-b from-white to-blue-50/30 shadow-lg lg:relative transition-all duration-300 ease-in-out lg:translate-x-0 lg:fixed lg:static z-40
          ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          ${mobileSidebarOpen ? "block" : "hidden"} lg:block`}
      >
        <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-white">
          <div className="flex items-center gap-3">
            <img
              src={assets.logo}
              alt="VisioDraft Logo"
              className="h-10 transition-transform hover:scale-105 duration-300"
            />
          </div>
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-1 p-4 overflow-y-auto h-[calc(100vh-180px)]">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-100/50 border-l-4 border-blue-400"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-700 hover:translate-x-1 hover:shadow-md"
              }`
            }
            onClick={() => setMobileSidebarOpen(false)}
          >
            <svg
              className="w-5 h-5 group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              ></path>
            </svg>
            <span className="font-medium">Dashboard</span>
          </NavLink>

          <NavLink
            to="/pyqs"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-100/50 border-l-4 border-blue-400"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-700 hover:translate-x-1 hover:shadow-md"
              }`
            }
            onClick={() => setMobileSidebarOpen(false)}
          >
            <svg
              className="w-5 h-5 group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            <span className="font-medium">PYQs</span>
          </NavLink>

          <NavLink
            to="/notes"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-100/50 border-l-4 border-blue-400"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-700 hover:translate-x-1 hover:shadow-md"
              }`
            }
            onClick={() => setMobileSidebarOpen(false)}
          >
            <svg
              className="w-5 h-5 group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              ></path>
            </svg>
            <span className="font-medium">Notes</span>
          </NavLink>

          <NavLink
            to="/upload-notes"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-100/50 border-l-4 border-blue-400"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-700 hover:translate-x-1 hover:shadow-md"
              }`
            }
            onClick={() => setMobileSidebarOpen(false)}
          >
            <svg
              className="w-5 h-5 group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <span className="font-medium">Upload Notes</span>
          </NavLink>

          <NavLink
            to="/ask-ai"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-100/50 border-l-4 border-blue-400"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-700 hover:translate-x-1 hover:shadow-md"
              }`
            }
            onClick={() => setMobileSidebarOpen(false)}
          >
            <svg
              className="w-5 h-5 group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              ></path>
            </svg>
            <span className="font-medium">Ask AI</span>
          </NavLink>

          <NavLink
            to="/community"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-100/50 border-l-4 border-blue-400"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-700 hover:translate-x-1 hover:shadow-md"
              }`
            }
            onClick={() => setMobileSidebarOpen(false)}
          >
            <svg
              className="w-5 h-5 group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
            <span className="font-medium">Community</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-100/50 border-l-4 border-blue-400"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-700 hover:translate-x-1 hover:shadow-md"
              }`
            }
            onClick={() => setMobileSidebarOpen(false)}
          >
            <svg
              className="w-5 h-5 group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
            <span className="font-medium">Profile</span>
          </NavLink>
        </div>

        {/* Bottom User Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          {currentUser ? (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                <span className="text-white font-medium">
                  {currentUser.name?.[0]?.toUpperCase() || "U"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {currentUser.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {currentUser.email}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Content */}
      <div className="flex-1 p-4 lg:p-6 py-16 lg:py-6 overflow-scroll lg:overflow-hidden">
        {error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-5 rounded-xl relative max-w-4xl mx-auto my-4 shadow-sm">
            <div className="flex items-start">
              <svg
                className="w-6 h-6 mr-3 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <div>
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            </div>
            <button
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        ) : community ? (
          <div className="bg-white h-screen rounded-2xl shadow-sm p-4 sm:p-6 md:p-8 lg:p-8 w-full max-w-6xl mx-auto flex flex-col">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-md">
                {community.icon || community.name?.[0]?.toUpperCase()}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {community.name}
                </h1>
                <p className="text-gray-600 mt-1 text-sm md:text-base">
                  {community.description || "Community discussion"}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {community.topic && (
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1.5 rounded-full">
                      {community.topic}
                    </span>
                  )}
                  {community.uploadedBy && community.uploadedBy.name && (
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1.5 rounded-full">
                      Created by: {community.uploadedBy.name}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Chat Component */}
            <CommunityChatComponent
              communityId={id}
              serverUrl={backendUrl}
              user={currentUser}
            />
          </div>
        ) : (
          <div className="text-center py-12 max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-6 mt-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              Community not found
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              The community you're looking for doesn't exist or you don't have
              access to it.
            </p>
            <button
              onClick={() => navigate("/community")}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-5 py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg font-medium"
            >
              Back to Communities
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityChat;
