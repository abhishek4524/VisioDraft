import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Hero2 from '../components/Hero2'
import Why from '../components/Why'
import { assets } from '../assets/assets'
import Review from '../components/Review'
import Footer from '../components/Footer'
import QuickLinksBar from '../components/QuickLinksBar'
import { Link } from 'react-router-dom'

const steps = [
  { title: 'Step 1', text: 'Create Your Draft', icon: assets.draft },
  { title: 'Step 2', text: 'Add Visual Notes', icon: assets.visualization },
  { title: 'Step 3', text: 'Ask AI for Suggestions', icon: assets.chatbot },
  { title: 'Step 4', text: 'Save & Share', icon: assets.save },
]

const Home = () => {
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
          className="group relative bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
        >
          {/* Step number */}
          <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            {index + 1}
          </div>
          
          {/* Card content */}
          <div className="p-6 pt-10 text-center">
            <div className="w-20 h-20 mx-auto mb-6 p-4 bg-blue-50 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-blue-100 group-hover:scale-110">
              <img src={step.icon} alt={step.title} className="w-full h-full object-contain" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
            <p className="text-gray-600 mb-6">{step.text}</p>
          </div>
          
          {/* Arrow connector (for desktop) */}
          {index < steps.length - 1 && (
            <div className="hidden lg:flex items-center justify-center absolute -right-6 top-1/2 -translate-y-1/2">
              <svg className="w-8 h-8 text-gray-300 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
    
    {/* Mobile progress indicator */}
    <div className="lg:hidden flex justify-center mt-8">
      <div className="flex space-x-2">
        {steps.map((_, i) => (
          <div key={i} className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
        ))}
      </div>
    </div>
  </div>
</section>

{/* <Hero2 /> */}


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
      <div className="group relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
        <div className="p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-blue-100 group-hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">For Students</h3>
          <p className="text-gray-600">Organize class notes and study visually with interactive mind maps.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Creator Card */}
      <div className="group relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
        <div className="p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-purple-100 group-hover:scale-110">
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
          <p className="text-gray-600">Brainstorm and develop new projects with creative freedom.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Team Card */}
      <div className="group relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
        <div className="p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-green-100 group-hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">For Teams</h3>
          <p className="text-gray-600">Collaborate on plans and strategies in real-time.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
  </div>
</section>

<section className="w-full py-20 bg-gradient-to-br from-white via-slate-50 to-slate-100">
  <div className="max-w-4xl mx-auto px-4 text-center">
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
      Start turning <span className="text-blue-600">ideas into structure</span>.<br />
      <span className="font-normal text-gray-700">The visual way.</span>
    </h1>

    <p className="text-lg text-gray-600 mb-10">
      Plan, organize, and visualize your concepts effortlessly. Bring your thoughts to life with our intuitive platform.
    </p>

    <div className="flex justify-center">
      <Link to="/login" className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-700 hover:scale-105 transition-all shadow-md cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
        Get Started Free
      </Link>
    </div>
  </div>
</section>
<Footer />
    </div>
  )
}

export default Home