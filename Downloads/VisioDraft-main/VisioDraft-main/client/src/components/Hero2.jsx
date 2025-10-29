import React from 'react';
import SplineScene from './SplineScene';
import { History, Hourglass, ArrowRight, Sparkles, Users, Zap } from 'lucide-react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Hero2 = () => {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#FF7E5F] via-[#FF8E6E] to-[#FEB47B] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/always-grey.png')] opacity-10 mix-blend-overlay"></div>
        
        {/* Animated gradient blobs */}
        <div className="absolute -bottom-20 -right-20 w-64 h-64 md:w-80 md:h-80 rounded-full bg-[#FF9A8B] opacity-20 blur-3xl animate-float-slow"></div>
        <div className="absolute -top-20 -left-20 w-72 h-72 md:w-96 md:h-96 rounded-full bg-[#FF6B6B] opacity-20 blur-3xl animate-float-slower"></div>
        
        {/* Additional floating elements for depth */}
        <div className="absolute top-1/4 right-1/4 w-40 h-40 rounded-full bg-[#FFD700] opacity-10 blur-2xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 left-1/3 w-32 h-32 rounded-full bg-white opacity-15 blur-xl animate-pulse-medium"></div>
      </div>

      {/* Content container */}
      <div className="relative min-h-screen w-full flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pt-16 sm:pt-20 md:pt-24 pb-10 md:pb-16 gap-6 md:gap-8 lg:gap-12 z-10">
        
        {/* Left Side - Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center order-2 lg:order-1 mt-8 lg:mt-0">
          <div className="max-w-xl mx-auto lg:mx-0 space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 animate-fade-in">
              <Sparkles className="w-4 h-4 text-[#FFD700]" />
              <span className="text-sm font-medium text-white">Next Generation Platform</span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold text-white leading-tight sm:leading-tight md:leading-tight lg:leading-tight drop-shadow-lg">
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white to-[#FFD700] hover:scale-105 transition-transform duration-300">
                Collaborate.
              </span>{' '}
              <br className="hidden xs:block" />
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#2C3E50] to-[#34495E] hover:scale-105 transition-transform duration-300 mt-2">
                Create.{' '}
              </span>
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#2C3E50] to-[#34495E] hover:scale-105 transition-transform duration-300">
                Elevate.
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-lg leading-relaxed md:leading-loose animate-fade-in-up">
              Turn ideas into reality with powerful collaboration tools and seamless workflows designed for modern teams.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4 animate-fade-in-up">
              <Link to="/upload-notes" className="group relative bg-[#2C3E50] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-sm sm:text-base font-semibold 
                hover:bg-[#34495E] transform transition-all duration-300 
                shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50
                overflow-hidden hover:scale-105 active:scale-95 flex items-center gap-2">
                <span className="relative z-10 flex items-center gap-2">
                  Start Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#FF7E5F] to-[#FEB47B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"></span>
              </Link>

              <Link to="/community" className="group relative bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-sm sm:text-base font-semibold 
                hover:bg-white/30 transform transition-all duration-300 
                shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50
                overflow-hidden hover:scale-105 active:scale-95">
                <span className="relative z-10 flex items-center gap-2">
                  <Users className="w-4 h-4" /> Explore Features
                </span>
                <span className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all duration-300"></span>
              </Link>
            </div>
          
          </div>
        </div>

        {/* Right Side - Spline Scene */}
        <div className="w-full lg:w-1/2 h-[45vh] xs:h-[320px] sm:h-[380px] md:h-[450px] lg:h-[520px] xl:h-[600px] relative order-1 lg:order-2 animate-float-soft">
          <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 rounded-2xl sm:rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl"></div>
          <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-3 md:p-4">
            <img src={assets.hero} alt="Hero Illustration" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>

      {/* Scroll indicator for desktop */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 flex-col items-center animate-bounce-slow">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-scroll"></div>
        </div>
        <span className="text-white/60 text-xs mt-2">Scroll to explore</span>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, 30px);
          }
        }
        @keyframes floatSlow {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-30px, -40px);
          }
        }
        @keyframes floatSoft {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes pulseSlow {
          0%, 100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.15;
            transform: scale(1.05);
          }
        }
        @keyframes pulseMedium {
          0%, 100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.2;
            transform: scale(1.1);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounceSlow {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          40% {
            transform: translateY(-10px) translateX(-50%);
          }
          60% {
            transform: translateY(-5px) translateX(-50%);
          }
        }
        @keyframes scroll {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(15px);
            opacity: 0;
          }
        }
        .animate-float-slow {
          animation: float 15s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: floatSlow 20s ease-in-out infinite;
        }
        .animate-float-soft {
          animation: floatSoft 6s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulseSlow 8s ease-in-out infinite;
        }
        .animate-pulse-medium {
          animation: pulseMedium 5s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out 0.2s forwards;
          opacity: 0;
        }
        .animate-bounce-slow {
          animation: bounceSlow 2s infinite;
        }
        .animate-scroll {
          animation: scroll 2s infinite;
        }

        /* Responsive text sizing */
        @media (max-width: 380px) {
          .text-4xl {
            font-size: 2.25rem;
            line-height: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Hero2;