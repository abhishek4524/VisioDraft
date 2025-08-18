import React from 'react';
import SplineScene from './SplineScene';

const Hero = () => {
  return (
    <div className="min-h-screen w-full bg-[#F4B8AF] flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-24 pt-20 md:pt-32 pb-10">
      {/* Left Side - Text Content */}
      <div className="w-full md:w-1/2 mb-10 md:mb-0">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          Design. Plan. <br className="hidden md:block" />
          Draft. Faster.
        </h1>
        <p className="text-gray-800 text-lg md:text-xl mb-8 max-w-md">
          All-in-one tool for visual note-taking and idea management.
        </p>
        <div className="flex flex-wrap gap-4">
<button className="bg-black text-white px-6 py-3 rounded-lg text-base font-medium 
hover:bg-gray-800 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg">
  Join Our Creative Circle
</button>
<button className="border border-black px-6 py-3 rounded-lg text-base font-medium 
hover:bg-black hover:text-white hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg">
  Explore Live Drafts
</button>
        </div>
      </div>

      {/* Right Side - Spline Scene */}
      <div className="w-full md:w-1/2 h-[400px] md:h-[500px]">
        <SplineScene />
      </div>
    </div>
  );
};

export default Hero;