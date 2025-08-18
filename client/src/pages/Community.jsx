import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { assets } from "../assets/assets";

const communityData = [
  {
    id: 1,
    name: "d/funny",
    description: "VisioDraft's largest humor depository",
    members: "67M members",
    avatar: "avatar1",
  },
  {
    id: 2,
    name: "d/AskVisioDraft",
    description: "d/AskVisioDraft is the place to ask and answer thought-provoking questions.",
    members: "57M members",
    avatar: "avatar2",
  },
  {
    id: 3,
    name: "d/gaming",
    description: "The Number One Gaming forum on the Internet.",
    members: "47M members",
    avatar: "avatar3",
  },
  {
    id: 4,
    name: "d/worldnews",
    description: "A place for major news from around the world, excluding US-internal news.",
    members: "47M members",
    avatar: "avatar4",
  },
  {
    id: 5,
    name: "d/todayilearned",
    description: "You learn something new every day; what did you learn today? Submit interesting and specific facts about something that you just found out here.",
    members: "41M members",
    avatar: "avatar5",
  },
  {
    id: 6,
    name: "d/Music",
    description: "VisioDraft's #1 Music Community",
    members: "38M members",
    avatar: "avatar6",
  },
  {
    id: 7,
    name: "d/aww",
    description: "Things that make you go AWW! -- like puppies, bunnies, babies, and so on... Feel free to post original pictures and videos of cute things.",
    members: "38M members",
    avatar: "avatar7",
  },
  {
    id: 8,
    name: "d/movies",
    description: "The goal of d/Movies is to provide an inclusive place for discussions and news about films with major releases.",
    members: "37M members",
    avatar: "avatar8",
  },
  {
    id: 9,
    name: "d/memes",
    description: "Memes! A way of describing cultural information being shared.",
    members: "35M members",
    avatar: "avatar9",
  },
  {
    id: 10,
    name: "d/science",
    description: "This community is a place to share and discuss new scientific research.",
    members: "34M members",
    avatar: "avatar10",
  },
];

const Community = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar />
      <div className="w-full h-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Best of VisioDraft
          </h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Top Communities
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto md:mx-0">
            Browse VisioDraft's largest communities
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {communityData.map((community) => (
            <div 
              key={community.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-gray-500 font-medium text-lg mr-3">
                    {community.id}
                  </span>
                  <img
                    src={assets[community.avatar]}
                    alt={`${community.name} avatar`}
                    className="h-12 w-12 rounded-full border-2 border-blue-500"
                  />
                </div>
                <h3 className="text-xl font-bold text-blue-600 mb-2">
                  {community.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {community.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {community.members}
                  </span>
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                    Join
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-colors duration-300">
            View All Communities
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Community;