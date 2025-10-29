import React, { useState } from 'react';
import { Pencil, Layers, Lightbulb, Share2, X } from 'lucide-react';

const Why = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const features = [
    {
      id: 1,
      icon: Pencil,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      title: "Visual Note-Taking",
      description: "Organize your thoughts with clarity and creativity.",
      detailedDescription: "Transform your ideas into visual masterpieces with our intuitive drawing tools. Sketch, annotate, and visualize concepts exactly how you imagine them."
    },
    {
      id: 2,
      icon: Layers,
      color: "text-green-500",
      bgColor: "bg-green-50",
      title: "Layered Organization",
      description: "Keep your ideas clean and easily accessible with layers.",
      detailedDescription: "Manage complex projects with our advanced layer system. Toggle visibility, rearrange elements, and maintain organization in even the most detailed visual notes."
    },
    {
      id: 3,
      icon: Lightbulb,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      title: "Creative Mind-Mapping",
      description: "Build your ideas like a mind map, visually and intuitively.",
      detailedDescription: "Connect concepts and explore relationships with our mind-mapping tools. Visually trace how ideas relate to each other and spark new creative connections."
    },
    {
      id: 4,
      icon: Share2,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      title: "Easy Sharing",
      description: "Share your notes and visuals instantly with your team.",
      detailedDescription: "Collaborate seamlessly with real-time sharing options. Export in multiple formats or invite team members to edit directly in your visual workspace."
    }
  ];

  const handleCardClick = (id) => {
    if (window.innerWidth < 768) {
      setExpandedCard(expandedCard === id ? null : id);
    }
  };

  return (
    <div className="w-full py-16 bg-white" id="why">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-10">
        Why <span className="text-blue-600">VisioDraft</span>?
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-20">
        {features.map((feature) => {
          const IconComponent = feature.icon;
          return (
            <div 
              key={feature.id}
              className={`${feature.bgColor} p-6 rounded-2xl transition-all duration-300 text-center cursor-default
                transform hover:scale-105 hover:shadow-xl
                md:[transform-style:preserve-3d] md:hover:[transform:rotateY(10deg)_rotateX(5deg)]
                ${expandedCard === feature.id ? 'scale-105 shadow-xl' : ''}
                relative overflow-hidden`}
              onClick={() => handleCardClick(feature.id)}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute w-full h-full pattern-grid-lg"></div>
              </div>
              
              <div className="flex justify-center mb-4 relative z-10">
                <div className={`p-3 rounded-full ${feature.bgColor} bg-opacity-50`}>
                  <IconComponent size={40} className={feature.color} />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 relative z-10">{feature.title}</h3>
              <p className="text-gray-600 relative z-10">{feature.description}</p>
              
              {/* Mobile expanded view */}
              {expandedCard === feature.id && (
                <div className="mt-4 p-4 bg-white bg-opacity-80 rounded-lg relative z-10">
                  <button 
                    className="absolute top-2 right-2 text-gray-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedCard(null);
                    }}
                  >
                    <X size={20} />
                  </button>
                  <p className="text-gray-700 text-sm">{feature.detailedDescription}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add some CSS for the grid pattern and 3D effects */}
      <style jsx>{`
        .pattern-grid-lg {
          background-image: 
            linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
};

export default Why;