import React, { useState, useEffect, createContext, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { Plus, Users, Search, Loader, Edit, Trash2, Settings } from "lucide-react";
import axios from "axios";
import { backendUrl } from "../App";
import "../pages/community.css";

// Toast Context
const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "info", duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-2 rounded-lg shadow-lg text-white font-medium transition-all duration-300 ${
              toast.type === "success" ? "bg-green-500" :
              toast.type === "error" ? "bg-red-500" :
              toast.type === "warning" ? "bg-yellow-500" :
              "bg-blue-500"
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Community Management Component
const CommunityManagement = ({ community, isCreator, onUpdate, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: community.name || "",
    description: community.description || "",
    topic: community.topic || "Other",
    icon: community.icon || "👥"
  });
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (community) {
      setFormData({
        name: community.name || "",
        description: community.description || "",
        topic: community.topic || "Other",
        icon: community.icon || "👥"
      });
    }
  }, [community]);

  const handleEdit = async () => {
    if (!formData.name.trim()) {
      showToast("Community name is required", "error");
      return;
    }

    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${backendUrl}/api/community/${community._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.success) {
        onUpdate(response.data.community);
        setIsEditing(false);
        showToast("Community updated successfully", "success");
      }
    } catch (error) {
      console.error("Error updating community:", error);
      showToast(error.response?.data?.message || "Failed to update community", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this community? This action cannot be undone.")) {
      return;
    }
    
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${backendUrl}/api/community/${community._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.success) {
        onDelete(community._id);
        showToast("Community deleted successfully", "success");
      }
    } catch (error) {
      console.error("Error deleting community:", error);
      showToast(error.response?.data?.message || "Failed to delete community", "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isCreator) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
        aria-label="Community settings"
      >
        <Settings className="h-5 w-5" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
          <button
            onClick={() => {
              setIsEditing(true);
              setIsOpen(false);
            }}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left transition-colors"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Community
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {isLoading ? "Deleting..." : "Delete Community"}
          </button>
        </div>
      )}
      
      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Edit Community</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Community Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter community name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Describe your community"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Topic
                </label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({...formData, topic: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Technology">Technology</option>
                  <option value="Science">Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Business">Business</option>
                  <option value="Arts">Arts</option>
                  <option value="Humanities">Humanities</option>
                  <option value="Social Sciences">Social Sciences</option>
                  <option value="Education">Education</option>
                  <option value="Health & Medicine">Health & Medicine</option>
                  <option value="Programming">Programming</option>
                  <option value="Design">Design</option>
                  <option value="Music">Music</option>
                  <option value="Sports">Sports</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                disabled={isLoading || !formData.name.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main Community Component
const Community = () => {
  const [search, setSearch] = useState("");
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  // Get user ID from token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserId(payload.id || payload._id);
      } catch (error) {
        console.error("Error parsing token:", error);
      }
    }
  }, []);

  // Fetch communities from server
  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(`${backendUrl}/api/community/list`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        
        if (response.data.success) {
          setCommunities(response.data.communities);
        } else {
          setError("Failed to fetch communities");
        }
      } catch (err) {
        console.error("Error fetching communities:", err);
        setError(err.response?.data?.message || "Failed to load communities");
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  // Handle community updates
  const handleCommunityUpdate = (updatedCommunity) => {
    setCommunities(prev => prev.map(community => 
      community._id === updatedCommunity._id ? updatedCommunity : community
    ));
  };

  // Handle community deletion
  const handleCommunityDelete = (deletedId) => {
    setCommunities(prev => prev.filter(community => community._id !== deletedId));
  };

  // Filter communities based on search
  const filteredCommunities = communities.filter((community) =>
    community.name.toLowerCase().includes(search.toLowerCase()) ||
    (community.description && community.description.toLowerCase().includes(search.toLowerCase())) ||
    community.topic.toLowerCase().includes(search.toLowerCase())
  );

  // Function to format member count
  const formatMemberCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M members`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K members`;
    }
    return `${count} ${count === 1 ? 'member' : 'members'}`;
  };

  // Function to generate online count (for demo purposes)
  const generateOnlineCount = (memberCount) => {
    const online = Math.floor(memberCount * (0.1 + Math.random() * 0.2));
    if (online >= 1000) {
      return `${(online / 1000).toFixed(1)}K online`;
    }
    return `${online} online`;
  };

  // Function to generate tags based on topic
  const generateTags = (topic) => {
    const tagMap = {
      "Technology": ["Tech", "Programming", "Coding"],
      "Science": ["Physics", "Biology", "Research"],
      "Mathematics": ["Math", "Calculus", "Algebra"],
      "Engineering": ["Engineering", "Design", "Build"],
      "Business": ["Business", "Finance", "Marketing"],
      "Arts": ["Art", "Creativity", "Design"],
      "Humanities": ["History", "Philosophy", "Culture"],
      "Social Sciences": ["Psychology", "Sociology", "Economics"],
      "Education": ["Learning", "Teaching", "Knowledge"],
      "Health & Medicine": ["Health", "Medicine", "Wellness"],
      "Programming": ["Coding", "Development", "Software"],
      "Design": ["UI/UX", "Graphics", "Creative"],
      "Music": ["Songs", "Artists", "Concerts"],
      "Sports": ["Fitness", "Games", "Competition"],
      "Gaming": ["Games", "Esports", "Consoles"],
      "Other": ["Community", "Discussion", "General"]
    };
    
    return tagMap[topic] || [topic, "Community", "Discussion"];
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navbar />
        <div className="w-full h-20"></div>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <Loader className="h-12 w-12 animate-spin mx-auto text-blue-600 mb-4" />
            <p className="text-gray-600">Loading communities...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navbar />
        <div className="w-full h-20"></div>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <div className="text-red-500 text-lg mb-4">Error: {error}</div>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <ToastProvider>
      <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navbar />
        <div className="w-full h-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section with Create Button */}
          <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-6">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold text-gray-900 mb-4 animate-fade-in">
                Best of <span className="text-blue-600">VisioDraft</span>
              </h1>
              <h2 className="text-3xl font-semibold text-gray-800 mb-6 animate-fade-in-up delay-100">
                Top Communities
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl animate-fade-in-up delay-200">
                Browse VisioDraft's largest communities and find your tribe
              </p>
            </div>

            {/* Enhanced Create Community Button */}
            <Link 
              to="/community/create"
              className="group relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold 
                hover:from-blue-700 hover:to-indigo-800 transform transition-all duration-300 
                shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-3
                animate-fade-in-up delay-300 min-w-[220px] justify-center"
            >
              <div className="relative z-10 flex items-center gap-2">
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                <span className="text-lg">Create Community</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            </Link>
          </div>

          {/* Search bar */}
          <div className="mt-8 max-w-2xl mx-auto animate-fade-in-up delay-400 mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search communities by name, description, or topic..."
                className="w-full pl-12 pr-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md text-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Communities Counter and Stats */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 px-2 gap-4">
            <div className="flex items-center gap-4 text-gray-700">
              <Users className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-medium">
                {filteredCommunities.length} {filteredCommunities.length === 1 ? 'Community' : 'Communities'} Found
              </span>
            </div>
            
            <div className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
              Total: {communities.length} communities
            </div>
          </div>

          {/* Communities Grid */}
          {filteredCommunities.length === 0 ? (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  {communities.length === 0 ? "No communities yet" : "No communities found"}
                </h3>
                <p className="text-gray-500 mb-6">
                  {communities.length === 0 
                    ? "Be the first to create a community!" 
                    : "Try adjusting your search terms or create a new community"
                  }
                </p>
                <Link 
                  to="/community/create"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                  Create Your Community
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-2">
                {filteredCommunities.map((community, index) => (
                  <CommunityCard
                    key={community._id}
                    community={community}
                    index={index}
                    formatMemberCount={formatMemberCount}
                    generateOnlineCount={generateOnlineCount}
                    generateTags={generateTags}
                    userId={userId}
                    onUpdate={handleCommunityUpdate}
                    onDelete={handleCommunityDelete}
                  />
                ))}
              </div>

              <div className="text-center py-12 mt-8">
                <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium">
                  View All Communities
                </button>
              </div>
            </>
          )}
        </div>

        <Footer />
      </div>
    </ToastProvider>
  );
}; 

const CommunityCard = ({ community, index, formatMemberCount, generateOnlineCount, generateTags, userId, onUpdate, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [memberCount, setMemberCount] = useState(community.joinedUsers?.length || 0);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  // Check if user is already a member
  useEffect(() => {
    const checkMembership = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        
        const response = await axios.get(`${backendUrl}/api/community/check-membership/${community._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data.success) {
          setIsMember(response.data.isMember);
        }
      } catch (error) {
        console.error("Error checking membership:", error);
      }
    };
    
    if (userId) {
      checkMembership();
    }
  }, [community._id, userId]);

  // Handle join/leave community
  const handleJoinToggle = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        showToast("Please login to join communities", "error");
        return;
      }
      
      if (isMember) {
        // Leave community
        const response = await axios.post(`${backendUrl}/api/community/unsubscribe`, 
          { communityId: community._id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        if (response.data.success) {
          setIsMember(false);
          setMemberCount(prev => prev - 1);
          showToast("Left community successfully", "success");
        }
      } else {
        // Join community
        const response = await axios.post(`${backendUrl}/api/community/subscribe`, 
          { communityId: community._id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        if (response.data.success) {
          setIsMember(true);
          setMemberCount(prev => prev + 1);
          showToast("Joined community successfully", "success");
        }
      }
    } catch (error) {
      console.error("Error toggling membership:", error);
      showToast(error.response?.data?.message || "Something went wrong", "error");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to generate gradient color based on community name
  const generateGradient = (name) => {
    const colors = [
      "bg-gradient-to-br from-yellow-400 to-pink-500",
      "bg-gradient-to-br from-blue-400 to-purple-500",
      "bg-gradient-to-br from-green-400 to-blue-500",
      "bg-gradient-to-br from-red-500 to-yellow-500",
      "bg-gradient-to-br from-orange-500 to-red-500",
      "bg-gradient-to-br from-purple-500 to-pink-500",
      "bg-gradient-to-br from-amber-500 to-red-600",
      "bg-gradient-to-br from-indigo-500 to-blue-600",
      "bg-gradient-to-br from-stone-500 to-amber-700",
      "bg-gradient-to-br from-teal-400 to-blue-600"
    ];
    
    // Simple hash function to get consistent color for same community name
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);
    
    return colors[hash % colors.length];
  };

  const gradientClass = generateGradient(community.name);
  const onlineCount = generateOnlineCount(memberCount);
  const tags = generateTags(community.topic);
  const isCreator = userId && community.uploadedBy && community.uploadedBy._id === userId;

  return (
    <div
      className="community-card-container"
      style={{ animationDelay: `${100 + index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`community-card ${isHovered ? "flipped" : ""}`}>
        {/* Front Side */}
        <div className="community-card-front">
          <div
            className={`absolute inset-0 ${gradientClass} opacity-20 rounded-xl`}
          ></div>
          <div className="p-5 relative z-10">
            <div className="flex items-start justify-between mb-4">
              <span className="text-gray-500 font-medium text-lg mr-3">
                {index + 1}
              </span>
              <CommunityManagement 
                community={community} 
                isCreator={isCreator}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            </div>
            <div className="flex items-start">
              <div className="relative">
                <div className="h-14 w-14 rounded-full border-4 border-white shadow-md flex items-center justify-center text-2xl bg-white">
                  {community.icon || "👥"}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-800 ml-3 mt-2 line-clamp-1">
                {community.name}
              </h3>
            </div>
            <p className="text-gray-600 text-sm mb-6 line-clamp-3">
              {community.description || "No description available"}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {formatMemberCount(memberCount)}
              </span>
              <button 
                onClick={handleJoinToggle}
                disabled={isLoading}
                className={`text-xs font-medium px-3 py-1 rounded-full transition-colors duration-300 ${
                  isMember 
                    ? "bg-gray-200 text-gray-700 hover:bg-gray-300" 
                    : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isLoading ? "..." : isMember ? "Joined" : "Join"}
              </button>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className="community-card-back">
          <div
            className={`absolute inset-0 ${gradientClass} rounded-xl`}
          ></div>
          <div className="absolute inset-0 bg-black bg-opacity-20 rounded-xl"></div>
          <div className="p-5 relative z-10 h-full flex flex-col">
            {/* Icon with online indicator */}
            <div className="flex items-center mb-4">
              <div className="relative mr-3">
                <div className="h-12 w-12 rounded-full border-2 border-white flex items-center justify-center text-xl bg-white">
                  {community.icon || "👥"}
                </div>
                <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white line-clamp-1">
                  {community.name}
                </h3>
                <p className="text-white text-opacity-80 text-xs">
                  {onlineCount}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-white text-sm mb-4 flex-grow line-clamp-4">
              {community.description || "No description available"}
            </p>

            {/* Members and Tags */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-white">
                  {formatMemberCount(memberCount)}
                </span>
                <span className="text-xs font-medium text-white">
                  {onlineCount}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium text-white bg-black bg-opacity-30 px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Topic */}
            <div className="mb-4">
              <span className="text-xs font-medium text-white bg-black bg-opacity-40 px-3 py-1 rounded-full">
                Topic: {community.topic || "Other"}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Link 
                to={`/community/${community._id}/chat`} 
                onClick={(e) => {
                  if (!isMember) {
                    e.preventDefault();
                    showToast("Please join the community first to view it", "warning");
                  }
                }}
                className="flex-1 bg-white bg-opacity-90 hover:bg-opacity-100 text-blue-600 text-sm font-medium py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 text-center"
              >
                View Community
              </Link>
              <button 
                onClick={handleJoinToggle}
                disabled={isLoading}
                className={`${
                  isMember ? "bg-gray-600 hover:bg-gray-700" : "bg-blue-600 hover:bg-blue-700"
                } text-white text-sm font-medium py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "..." : isMember ? "Leave" : "Join"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;