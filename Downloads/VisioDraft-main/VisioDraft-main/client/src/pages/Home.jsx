import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Hero2 from '../components/Hero2'
import Why from '../components/Why'
import { assets } from '../assets/assets'
import Review from '../components/Review'
import Footer from '../components/Footer'
import QuickLinksBar from '../components/QuickLinksBar'
import { Link } from 'react-router-dom'

const Home = () => {
  const [activeStep, setActiveStep] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleCardClick = (index) => {
    if (window.innerWidth < 1024) {
      setActiveStep(activeStep === index ? null : index);
    }
  };

  const handleCardClickFor = (index) => {
    if (window.innerWidth < 1024) {
      setActiveCard(activeCard === index ? null : index);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const steps = [
    {
      title: "Create",
      text: "Design your project with our intuitive tools",
      icon: "https://cdn-icons-png.flaticon.com/512/3281/3281349.png",
      detail: "Our creation tools allow you to bring your ideas to life with drag-and-drop simplicity and professional templates."
    },
    {
      title: "Organize",
      text: "Structure your content with layers",
      icon: "https://cdn-icons-png.flaticon.com/512/3142/3142734.png",
      detail: "Keep everything organized with our layer system that helps you manage complex projects with ease."
    },
    {
      title: "Innovate",
      text: "Get smart suggestions powered by AI",
      icon: "https://cdn-icons-png.flaticon.com/512/4727/4727338.png",
      detail: "Our AI engine analyzes your work and provides intelligent suggestions to enhance your project."
    },
    {
      title: "Share",
      text: "Collaborate and publish your work",
      icon: "https://cdn-icons-png.flaticon.com/512/2996/2996791.png",
      detail: "Share your projects with team members for collaboration or publish directly to various platforms."
    }
  ];

  return (
    <div>
      <Navbar />
      <Hero2 />
      <QuickLinksBar />
      <Why />

      {/* How It Works Section */}
      <section className="px-4 md:px-20 py-20 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-400 blur-xl"></div>
          <div className="absolute bottom-10 right-20 w-40 h-40 rounded-full bg-blue-300 blur-xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
            How <span className="text-blue-600 relative">
              It Works
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-100 rounded-full"></span>
            </span>?
          </h2>
          <p className="text-lg text-center text-gray-600 max-w-2xl mx-auto mb-16">
            Simple steps to get started with our platform and achieve your goals
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(index)}
                className="group relative bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer lg:cursor-auto"
              >
                {/* Step number */}
                <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg transition-all duration-300 group-hover:bg-blue-700 group-hover:scale-110">
                  {index + 1}
                </div>
                
                {/* Card content */}
                <div className="p-6 pt-10 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 p-4 bg-blue-50 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-blue-100 group-hover:scale-110">
                    <img src={step.icon} alt={step.title} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 mb-6">{step.text}</p>
                  
                  {/* Detailed description - shown on hover (desktop) or click (mobile) */}
                  <div className={`overflow-hidden transition-all duration-500 ${
                    activeStep === index 
                      ? "max-h-40 opacity-100" 
                      : "max-h-0 opacity-0 lg:group-hover:max-h-40 lg:group-hover:opacity-100"
                  }`}>
                    <div className="pt-4 border-t border-gray-100 mt-4">
                      <p className="text-sm text-gray-500">{step.detail}</p>
                    </div>
                  </div>
                </div>
                
                {/* Arrow connector (for desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center absolute -right-6 top-1/2 -translate-y-1/2">
                    <svg className="w-8 h-8 text-gray-300 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
                
                {/* Mobile expand indicator */}
                <div className="lg:hidden absolute bottom-4 right-4 transition-transform duration-300">
                  <svg 
                    className={`w-5 h-5 text-gray-400 transform ${activeStep === index ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile progress indicator */}
          <div className="lg:hidden flex justify-center mt-8">
            <div className="flex space-x-2">
              {steps.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${activeStep === i ? 'bg-blue-600 scale-125' : 'bg-gray-300'}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Review />

      <section className="px-6 md:px-20 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 text-center">
            Who's It For?
          </h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Designed for everyone who thinks, creates, and collaborates. See how our solution transforms workflows.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Student Card */}
            <div 
              className={`group relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 
                ${activeCard === 0 ? 'md:hover:-translate-y-4 -translate-y-2 shadow-xl' : 'md:hover:-translate-y-4 md:hover:shadow-xl'}
                ${activeCard === 0 ? 'border-blue-300' : 'md:group-hover:border-blue-100'}`}
              onClick={() => handleCardClickFor(0)}
            >
              <div className="p-8 flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-300 
                  ${activeCard === 0 ? 'bg-blue-100 scale-110' : 'bg-blue-50 md:group-hover:bg-blue-100 md:group-hover:scale-110'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">For Students</h3>
                <p className="text-gray-600 mb-4">Organize class notes and study visually with interactive mind maps.</p>
                
                {/* Expanded content - visible on hover (desktop) or when clicked (mobile) */}
                <div className={`overflow-hidden transition-all duration-500 
                  ${activeCard === 0 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 md:group-hover:max-h-40 md:group-hover:opacity-100'}`}>
                  <ul className="text-left text-sm text-gray-500 space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✓</span>
                      <span>Create study guides with visual connections</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✓</span>
                      <span>Share notes with classmates</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✓</span>
                      <span>Track learning progress</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300
                ${activeCard === 0 ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}></div>
            </div>

            {/* Creator Card */}
            <div 
              className={`group relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 
                ${activeCard === 1 ? 'md:hover:-translate-y-4 -translate-y-2 shadow-xl' : 'md:hover:-translate-y-4 md:hover:shadow-xl'}
                ${activeCard === 1 ? 'border-purple-300' : 'md:group-hover:border-purple-100'}`}
              onClick={() => handleCardClickFor(1)}
            >
              <div className="p-8 flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-300 
                  ${activeCard === 1 ? 'bg-purple-100 scale-110' : 'bg-purple-50 md:group-hover:bg-purple-100 md:group-hover:scale-110'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v4" />
                    <path d="m18.4 5.6-2.8 2.8" />
                    <path d="M22 12h-4" />
                    <path d="m18.4 18.4-2.8-2.8" />
                    <path d="M12 22v-4" />
                    <path d="m5.6 18.4 2.8-2.8" />
                    <path d="M2 12h4" />
                    <path d="m5.6 5.6 2.8 2.8" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">For Creators</h3>
                <p className="text-gray-600 mb-4">Brainstorm and develop new projects with creative freedom.</p>
                
                {/* Expanded content */}
                <div className={`overflow-hidden transition-all duration-500 
                  ${activeCard === 1 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 md:group-hover:max-h-40 md:group-hover:opacity-100'}`}>
                  <ul className="text-left text-sm text-gray-500 space-y-2">
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">✓</span>
                      <span>Visualize complex ideas and concepts</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">✓</span>
                      <span>Connect related thoughts and inspiration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">✓</span>
                      <span>Export creations in multiple formats</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-300
                ${activeCard === 1 ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}></div>
            </div>

            {/* Team Card */}
            <div 
              className={`group relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 
                ${activeCard === 2 ? 'md:hover:-translate-y-4 -translate-y-2 shadow-xl' : 'md:hover:-translate-y-4 md:hover:shadow-xl'}
                ${activeCard === 2 ? 'border-green-300' : 'md:group-hover:border-green-100'}`}
              onClick={() => handleCardClickFor(2)}
            >
              <div className="p-8 flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-300 
                  ${activeCard === 2 ? 'bg-green-100 scale-110' : 'bg-green-50 md:group-hover:bg-green-100 md:group-hover:scale-110'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">For Teams</h3>
                <p className="text-gray-600 mb-4">Collaborate on plans and strategies in real-time.</p>
                
                {/* Expanded content */}
                <div className={`overflow-hidden transition-all duration-500 
                  ${activeCard === 2 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 md:group-hover:max-h-40 md:group-hover:opacity-100'}`}>
                  <ul className="text-left text-sm text-gray-500 space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Real-time collaborative editing</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Comment and feedback system</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Integration with project management tools</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300
                ${activeCard === 2 ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}></div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full h-[50vh] min-h-[400px] bg-gradient-to-br from-white via-slate-50 to-slate-100 flex items-center justify-center relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-100 rounded-full opacity-50 animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-purple-100 rounded-full opacity-40 animate-float-delayed"></div>
          <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-cyan-100 rounded-full opacity-40 animate-float"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Transform <span className="text-blue-600 relative inline-block">
              ideas into structure
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 500 12">
                <path d="M0,8 Q250,0 500,8" className="stroke-blue-500 fill-none stroke-[3]" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          
          <p className={`text-lg text-gray-700 mb-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            The visual way to plan, organize, and bring your concepts to life
          </p>

          <div className={`flex flex-col sm:flex-row justify-center items-center gap-4 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Link 
              to="/community" 
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-blue-700 hover:scale-105 transition-all shadow-md cursor-pointer group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              Get Started Free
            </Link>
          </div>
          
          <div className={`mt-8 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center justify-center text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              No credit card required • Free forever plan
            </div>
          </div>
        </div>
        
        <style jsx>{`
          @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(5deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
          @keyframes float-delayed {
            0% { transform: translateY(-10px) rotate(5deg); }
            50% { transform: translateY(0px) rotate(0deg); }
            100% { transform: translateY(-10px) rotate(5deg); }
          }
          .animate-float {
            animation: float 8s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: float-delayed 8s ease-in-out infinite;
          }
        `}</style>
      </section>
      <Footer />
    </div>
  )
}

export default Home