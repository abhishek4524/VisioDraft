import React, { useState } from "react";
import "./review.css";
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
    text: "From scribbles to strategy — it's all in one place now!",
    image: assets.arun,
  },
];

const Review = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleCardClick = (index) => {
    if (window.innerWidth < 1024) { // Only for tablet and mobile
      setExpandedCard(expandedCard === index ? null : index);
    }
  };

  return (
    <div className="w-full px-5 py-16 bg-[#f9f9f9]">
      <h2 className="text-4xl font-bold text-center mb-12">What People Say</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {reviews.map((review, index) => (
          <div
            key={index}
            className={`review-card bg-white p-6 rounded-xl text-left shadow-md transition-all duration-300 ${
              expandedCard === index ? 'expanded' : ''
            }`}
            onClick={() => handleCardClick(index)}
            style={{ 
              cursor: window.innerWidth < 1024 ? 'pointer' : 'default',
              transform: expandedCard === index ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
              <div className="flex items-center gap-1">
                <img src={assets.star_icon} alt="" className="w-5" />
                <img src={assets.star_icon} alt="" className="w-5" />
                <img src={assets.star_icon} alt="" className="w-5" />
                <img src={assets.star_icon} alt="" className="w-5" />
                <img src={assets.dull_star} alt="" className="w-5" />
              </div>
            </div>
            
            <p className="text-base text-gray-700 italic my-4 transition-all duration-300">
              "{review.text}"
            </p>
            
            <h4 className="text-lg font-semibold text-gray-900">
              — {review.name}
            </h4>
            
            {window.innerWidth < 1024 && (
              <div className="mt-3 text-sm text-blue-600 font-medium">
                {expandedCard === index ? 'Tap to collapse' : 'Tap to read more'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;