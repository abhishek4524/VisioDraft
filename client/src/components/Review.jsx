import React from "react";
import "../review.css";
import { assets } from "../assets/assets";

const reviews = [
  {
    name: "Anjali Singh",
    text: "VisioDraft transformed how I take notes! The visual flow helps me think clearly.",
    image: assets.anjali,
  },
  {
    name: "Raj Mehta",
    text: "Sleek, smart, and AI-powered — this is the future of brainstorming!",
    image: assets.raj,
  },
  {
    name: "Priya Das",
    text: "I love how simple and effective it is. Saved me tons of time during project planning.",
    image: assets.priya,
  },
  {
    name: "Arun Verma",
    text: "From scribbles to strategy — it’s all in one place now!",
    image: assets.arun,
  },
];

const Review = () => {
  return (
    <div className="w-full px-5 py-16 bg-[#f9f9f9]">
      <h2 className="text-4xl font-bold text-center mb-12">What People Say</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl text-left shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center">
            <img
              src={review.image}
              alt={review.name}
              className="w-16 h-16 rounded-full object-cover mb-4 "
              />
            <div className="flex items-center gap-1 ml-5">
              <img src={assets.star_icon} alt="" className="w-5 7" />
              <img src={assets.star_icon} alt="" className="w-5 7" />
              <img src={assets.star_icon} alt="" className="w-5 7" />
              <img src={assets.star_icon} alt="" className="w-5 7" />
              <img src={assets.dull_star} alt="" className="w-5 7" />
            </div>
              </div>
            <p className="text-base text-gray-700 italic mb-3">
              “{review.text}”
            </p>
            <h4 className="text-lg font-semibold text-gray-900">
              — {review.name}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
