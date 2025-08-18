import React from 'react';
import SplineScene from './SplineScene';

const Hero2 = () => {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#FF7E5F] to-[#FEB47B] overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/always-grey.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#FF9A8B] opacity-20 blur-3xl"></div>
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[#FF6B6B] opacity-20 blur-3xl"></div>
      </div>

      <div className="relative min-h-screen w-full flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-12 lg:px-24 pt-20 md:pt-24 pb-10 md:pb-16 gap-8 z-10">
        {/* Left Side - Text Content */}
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-md">
            Collaborate. <br className="hidden lg:block" />
            Create. <span className="text-[#2C3E50]">Elevate.</span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-lg leading-relaxed">
            Transform your ideas into reality with our powerful collaboration tools and seamless workflow integration.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-[#2C3E50] text-white px-8 py-3 rounded-xl text-base font-semibold 
              hover:bg-[#34495E] hover:scale-[1.03] transform transition-all duration-300 
              shadow-lg hover:shadow-xl active:scale-95">
              Start Free Trial
            </button>
            <button className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-3 rounded-xl text-base font-semibold 
              hover:bg-white/30 hover:scale-[1.03] transform transition-all duration-300 
              shadow-lg hover:shadow-xl active:scale-95">
              Watch Demo
            </button>
          </div>
          
          {/* Stats/Features row */}
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#2C3E50]"></div>
              <span className="text-white font-medium">Real-time collaboration</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#2C3E50]"></div>
              <span className="text-white font-medium">Version history</span>
            </div>
          </div>
        </div>

        {/* Right Side - Spline Scene */}
        <div className="w-full lg:w-1/2 h-[350px] sm:h-[450px] md:h-[500px] lg:h-[600px] relative">
          <div className="absolute -inset-4 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20"></div>
          <div className="relative w-full h-full">
            <SplineScene />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero2;