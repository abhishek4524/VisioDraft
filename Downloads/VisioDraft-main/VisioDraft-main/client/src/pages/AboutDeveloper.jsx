import React, { useEffect, useState, useRef } from "react";
import { Github, Linkedin, Mail, ExternalLink, Code, Palette, Cpu, Zap, Heart, Sparkles, Brain, Rocket, Lightbulb } from "lucide-react";
import { assets } from "../assets/assets";
import Navbar from "../components/Navbar";

const AboutDeveloper = () => {
  const [loaded, setLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const profileRef = useRef(null);
  const skillCardsRef = useRef([]);
  const [activeSkill, setActiveSkill] = useState(null);

  useEffect(() => {
    // Trigger animations after component mounts
    setLoaded(true);
    
    // Mouse move effect for parallax
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Intersection Observer for skill cards
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('skill-card-visible');
        }
      });
    }, { threshold: 0.2 });
    
    skillCardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  // Calculate parallax effect based on mouse position
  const parallaxStyle = {
    transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
  };

  // Skill data
  const skills = [
    { 
      icon: <Code className="text-blue-600" size={32} />, 
      name: "Frontend", 
      tech: "React, Next.js", 
      color: "blue",
      description: "Creating responsive and interactive user interfaces with modern frameworks"
    },
    { 
      icon: <Cpu className="text-purple-600" size={32} />, 
      name: "Backend", 
      tech: "Node.js, Django", 
      color: "purple",
      description: "Building robust server-side applications and RESTful APIs"
    },
    { 
      icon: <Palette className="text-pink-600" size={32} />, 
      name: "UI/UX Design", 
      tech: "Figma, Tailwind", 
      color: "pink",
      description: "Designing intuitive and aesthetically pleasing user experiences"
    },
    { 
      icon: <Zap className="text-yellow-600" size={32} />, 
      name: "DevOps", 
      tech: "AWS, Vercel", 
      color: "yellow",
      description: "Deploying and maintaining applications with modern cloud platforms"
    }
  ];

  // Social links data
  const socialLinks = [
    { 
      href: "https://github.com/abhishek4524", 
      icon: <Github size={20} />, 
      text: "GitHub", 
      color: "gray",
      hoverColor: "gray-800"
    },
    { 
      href: "https://www.linkedin.com/in/abhishek-kumar-502b40324/", 
      icon: <Linkedin size={20} />, 
      text: "LinkedIn", 
      color: "blue",
      hoverColor: "blue-700"
    },
    { 
      href: "https://kumar-pink.vercel.app/", 
      icon: <ExternalLink size={20} />, 
      text: "Portfolio", 
      color: "purple",
      hoverColor: "purple-700"
    },
    { 
      href: "mailto:visiodraft@gmail.com", 
      icon: <Mail size={20} />, 
      text: "Email", 
      color: "red",
      hoverColor: "red-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full opacity-20 animate-float"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${i % 3 === 0 ? 'rgba(59, 130, 246, 0.3)' : i % 3 === 1 ? 'rgba(139, 92, 246, 0.3)' : 'rgba(236, 72, 153, 0.3)'})`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-400 opacity-10"
            style={{
              width: Math.random() * 10 + 2,
              height: Math.random() * 10 + 2,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `floatParticle ${Math.random() * 20 + 10}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <Navbar />
      
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Animated Profile Section */}
          <div 
            ref={profileRef}
            className={`text-center transition-all duration-1000 transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            {/* Profile Image with floating animation and glow effect */}
            <div className="relative mb-8 inline-block">
              <div className="absolute -inset-4 bg-blue-100 rounded-full opacity-75 blur-xl animate-pulse"></div>
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-75 blur-lg animate-tilt"></div>
                <img
                  src={assets.developer}
                  alt="Abhishek Kumar"
                  className="w-40 h-40 rounded-full mx-auto shadow-2xl border-4 border-white relative z-10 hover:scale-105 transition-transform duration-300"
                  style={{ filter: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04))' }}
                />
              </div>
              {/* Floating sparkles around profile image */}
              <Sparkles className="absolute -top-2 -right-2 text-yellow-400 animate-ping" size={20} />
              <Sparkles className="absolute -bottom-2 -left-2 text-purple-400 animate-pulse" size={20} />
            </div>

            {/* Title with gradient text and typing animation */}
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-2 relative inline-block">
              Abhishek Kumar
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></span>
            </h1>
            
            <div className="overflow-hidden">
              <p className="text-xl text-gray-600 mb-6 animate-slideIn">
                Founder & Developer of <span className="font-semibold text-blue-600 relative">
                  VisioDraft
                  <Rocket className="inline-block ml-1 text-purple-500" size={18} />
                </span>
              </p>
            </div>

            {/* Bio with staggered animation */}
            <div className="overflow-hidden">
              <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto mb-10 text-lg animate-typing">
                I'm a B.Tech CSE student and passionate full-stack developer with expertise
                in React, Next.js, Django, Node.js, and more. I created VisioDraft to
                simplify collaboration and idea building for students and creators.
                Coding is not just my skill, it's my passion — and I love building
                projects that make a difference.
              </p>
            </div>
          </div>

          {/* Skills Section with staggered card animations */}
          <div className={`my-16 transition-all duration-1000 delay-200 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 relative inline-block">
              Skills & Expertise
              <Lightbulb className="absolute -right-8 -top-2 text-yellow-500" size={24} />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skill, index) => (
                <div 
                  key={index}
                  ref={el => skillCardsRef.current[index] = el}
                  className={`skill-card bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-2 relative overflow-hidden group cursor-pointer`}
                  onMouseEnter={() => setActiveSkill(index)}
                  onMouseLeave={() => setActiveSkill(null)}
                >
                  {/* Animated background effect on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-${skill.color}-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-center mb-4">
                      <div className={`p-3 rounded-full bg-${skill.color}-50 group-hover:scale-110 transition-transform duration-300 ${activeSkill === index ? 'animate-pulse' : ''}`}>
                        {skill.icon}
                      </div>
                    </div>
                    <h3 className="font-semibold text-center text-gray-800 group-hover:text-gray-900 transition-colors duration-300">{skill.name}</h3>
                    <p className="text-sm text-gray-600 text-center mt-2 group-hover:text-gray-700 transition-colors duration-300">{skill.tech}</p>
                    
                    {/* Expanded description on hover */}
                    <div className={`mt-4 text-xs text-gray-500 text-center transition-all duration-300 ${activeSkill === index ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                      {skill.description}
                    </div>
                  </div>
                  
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 -inset-y-full group-hover:inset-y-0 bg-gradient-to-t from-white via-white/30 to-transparent opacity-50 transition-all duration-1000"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Philosophy with parallax effect */}
          <div 
            style={parallaxStyle}
            className={`my-16 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} relative overflow-hidden`}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGZpbGw9IiM4ODgiIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvc3ZnPg==')]"></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center">
                <Brain className="mr-2 text-purple-600" size={28} />
                About VisioDraft
              </h2>
              <p className="text-gray-700 text-lg text-center leading-relaxed">
                VisioDraft was born from the need for a simple, intuitive tool that helps students and creators 
                visualize their ideas quickly without technical barriers. It combines the power of AI with an 
                easy-to-use interface to make idea mapping accessible to everyone.
              </p>
            </div>
          </div>

          {/* Social Links with hover effects */}
          <div className={`flex flex-wrap justify-center gap-4 mt-12 transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-2 px-6 py-3 bg-${link.color}-600 text-white rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 shadow-md relative overflow-hidden group hover:bg-${link.hoverColor}`}
              >
                <span className="relative z-10 flex items-center">
                  {link.icon}
                  <span className="ml-2">{link.text}</span>
                </span>
                
                {/* Ripple effect on hover */}
                <span className={`absolute inset-0 bg-${link.hoverColor} rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 opacity-50`}></span>
              </a>
            ))}
          </div>

          {/* Passion Statement */}
          <div className={`mt-16 text-center transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center bg-white px-6 py-3 rounded-full shadow-md group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <Heart className="text-red-500 mr-2 animate-heartbeat" size={20} />
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">Passionate about creating solutions that matter</span>
            </div>
          </div>
        </div>
      </section>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-50px) translateX(20px); }
        }
        
        @keyframes tilt {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(2deg); }
          75% { transform: rotate(-2deg); }
        }
        
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
        
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
        
        .animate-tilt {
          animation: tilt 10s ease-in-out infinite;
        }
        
        .animate-heartbeat {
          animation: heartbeat 2s ease-in-out infinite;
        }
        
        .animate-slideIn {
          animation: slideIn 1s ease-out forwards;
        }
        
        .animate-typing {
          overflow: hidden;
          white-space: nowrap;
          animation: typing 3s steps(60, end);
        }
        
        .skill-card {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .skill-card-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Staggered animation for skill cards */
        .skill-card-visible:nth-child(1) { transition-delay: 0.1s; }
        .skill-card-visible:nth-child(2) { transition-delay: 0.2s; }
        .skill-card-visible:nth-child(3) { transition-delay: 0.3s; }
        .skill-card-visible:nth-child(4) { transition-delay: 0.4s; }
      `}</style>
    </div>
  );
};

export default AboutDeveloper;