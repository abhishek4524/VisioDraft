import React from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <div className="w-full flex items-end">
      <footer className="bg-gradient-to-br from-blue-900 to-blue-950 text-white w-full px-6 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* VisioDraft Logo + Tagline */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white bg-clip-text bg-gradient-to-r from-blue-300 to-blue-100">
              VisioDraft
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Simplify your idea building with visual drafts and collaborative tools.
            </p>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-xs text-gray-400">Online now</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-blue-800 w-max">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['Home', 'Features', 'Pricing', 'Blog'].map((item) => (
                <li key={item}>
                  <a 
                    href={`/${item.toLowerCase()}`} 
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-2 group-hover:w-2 transition-all duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-blue-800 w-max">
              Resources
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Help Center', path: '/help' },
                { name: 'User Guides', path: '/guides' },
                { name: 'Terms of Use', path: '/terms' },
                { name: 'Privacy Policy', path: '/privacy' }
              ].map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.path} 
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-2 group-hover:w-2 transition-all duration-300"></span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-blue-800 w-max">
              Connect With Us
            </h3>
            <div className="flex space-x-4">
              {[
                { icon: <Facebook size={20} />, url: "#" },
                { icon: <Twitter size={20} />, url: "#" },
                { icon: <Linkedin size={20} />, url: "https://www.linkedin.com/in/abhishek-kumar-502b40324/" },
                { icon: <Instagram size={20} />, url: "#" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="p-2 bg-blue-900 rounded-full hover:bg-blue-700 transition-all duration-300 hover:scale-110"
                  aria-label={`${social.icon.type.displayName} icon`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="pt-2">
              <p className="text-gray-300 text-sm flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                support@visiodraft.com
              </p>
              <p className="text-gray-300 text-sm mt-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                +1 (555) 123-4567
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-blue-800 mt-12 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} VisioDraft. All rights reserved.
          </p>
          <p className="mt-2 text-gray-500 text-xs">
            Built with <span className="text-red-400">❤️</span> by{" "}
            <a
              href="https://github.com/745590"
              className="text-blue-300 hover:text-blue-200 underline transition-colors duration-300"
            >
              Abhishek Kumar
            </a>{" "}
            | Powered by React & Next.js
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;