import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { Plus, Users, Search } from "lucide-react";
import "../pages/community.css";

const communityData = [
  {
    id: 1,
    name: "d/funny",
    description: "VisioDraft's largest humor depository",
    members: "67K members",
    online: "2.3K online",
    avatar: "avatar1",
    color: "bg-gradient-to-br from-yellow-400 to-pink-500",
    tags: ["Humor", "Memes", "Jokes"],
  },
  {
    id: 2,
    name: "d/tech",
    description: "Technology and programming discussions",
    members: "45K members",
    online: "1.1K online",
    avatar: "avatar2",
    color: "bg-gradient-to-br from-blue-400 to-purple-500",
    tags: ["Tech", "Programming", "Coding"],
  },
  {
    id: 3,
    name: "d/gaming",
    description: "Everything about video games and esports",
    members: "89K members",
    online: "5.7K online",
    avatar: "avatar3",
    color: "bg-gradient-to-br from-green-400 to-blue-500",
    tags: ["Games", "Esports", "Consoles"],
  },
  {
    id: 4,
    name: "d/movies",
    description: "Film discussions, reviews and recommendations",
    members: "52K members",
    online: "1.8K online",
    avatar: "avatar4",
    color: "bg-gradient-to-br from-red-500 to-yellow-500",
    tags: ["Movies", "Cinema", "Actors"],
  },
  {
    id: 5,
    name: "d/fitness",
    description: "Get fit and stay healthy together",
    members: "38K members",
    online: "950 online",
    avatar: "avatar5",
    color: "bg-gradient-to-br from-orange-500 to-red-500",
    tags: ["Workout", "Nutrition", "Gym"],
  },
  {
    id: 6,
    name: "d/music",
    description: "Share and discover new music",
    members: "61K members",
    online: "2.1K online",
    avatar: "avatar6",
    color: "bg-gradient-to-br from-purple-500 to-pink-500",
    tags: ["Songs", "Artists", "Concerts"],
  },
  {
    id: 7,
    name: "d/food",
    description: "Recipes, cooking tips and food porn",
    members: "43K members",
    online: "1.2K online",
    avatar: "avatar7",
    color: "bg-gradient-to-br from-amber-500 to-red-600",
    tags: ["Cooking", "Recipes", "Restaurants"],
  },
  {
    id: 8,
    name: "d/science",
    description: "Discussions about all fields of science",
    members: "47K members",
    online: "890 online",
    avatar: "avatar8",
    color: "bg-gradient-to-br from-indigo-500 to-blue-600",
    tags: ["Physics", "Biology", "Research"],
  },
  {
    id: 9,
    name: "d/books",
    description: "Book lovers' paradise",
    members: "34K members",
    online: "720 online",
    avatar: "avatar9",
    color: "bg-gradient-to-br from-brown-500 to-amber-700",
    tags: ["Literature", "Reading", "Authors"],
  },
  {
    id: 10,
    name: "d/travel",
    description: "Share your travel experiences and tips",
    members: "39K members",
    online: "1.1K online",
    avatar: "avatar10",
    color: "bg-gradient-to-br from-teal-400 to-blue-600",
    tags: ["Adventure", "Destinations", "Tips"],
  }
];

const Community = () => {
  const [search, setSearch] = useState("");

  // Simple filter logic
  const filteredCommunities = communityData.filter((community) =>
    community.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
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
              placeholder="Search communities by name..."
              className="w-full pl-12 pr-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md text-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Communities Counter and Stats */}
        <div className="flex justify-between items-center mb-8 px-2">
          <div className="flex items-center gap-4 text-gray-700">
            <Users className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-medium">
              {filteredCommunities.length} {filteredCommunities.length === 1 ? 'Community' : 'Communities'} Found
            </span>
          </div>
          
          <div className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
            Total: {communityData.length} communities
          </div>
        </div>

        {/* Communities Grid */}
        {filteredCommunities.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">No communities found</h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search terms or create a new community
              </p>
              <Link 
                to="/create-community"
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
                  key={community.id}
                  community={community}
                  index={index}
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
  );
};

const CommunityCard = ({ community, index }) => {
  const [isHovered, setIsHovered] = useState(false);

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
            className={`absolute inset-0 ${community.color} opacity-20 rounded-xl`}
          ></div>
          <div className="p-5 relative z-10">
            <div className="flex items-start mb-4">
              <span className="text-gray-500 font-medium text-lg mr-3">
                {community.id}
              </span>
              <div className="relative">
                <img
                  src={assets[community.avatar]}
                  alt={`${community.name} avatar`}
                  className="h-14 w-14 rounded-full border-4 border-white shadow-md"
                />
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
              <h3 className="text-lg font-bold text-gray-800 ml-3 mt-2">
                {community.name}
              </h3>
            </div>
            <p className="text-gray-600 text-sm mb-6 line-clamp-3">
              {community.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {community.members}
              </span>
              <button className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors duration-300">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className="community-card-back">
          <div
            className={`absolute inset-0 ${community.color} rounded-xl`}
          ></div>
          <div className="absolute inset-0 bg-black bg-opacity-20 rounded-xl"></div>
          <div className="p-5 relative z-10 h-full flex flex-col">
            {/* Avatar with online indicator */}
            <div className="flex items-center mb-4">
              <div className="relative mr-3">
                <img
                  src={assets[community.avatar]}
                  alt={`${community.name} avatar`}
                  className="h-12 w-12 rounded-full border-2 border-white"
                />
                <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {community.name}
                </h3>
                <p className="text-white text-opacity-80 text-xs">
                  {community.online}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-white text-sm mb-4 flex-grow">
              {community.description}
            </p>

            {/* Members and Tags */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-white">
                  {community.members}
                </span>
                <span className="text-xs font-medium text-white">
                  {community.online}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {community.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium text-white bg-black bg-opacity-30 px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button className="flex-1 bg-white bg-opacity-90 hover:bg-opacity-100 text-blue-600 text-sm font-medium py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105">
                View Community
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;