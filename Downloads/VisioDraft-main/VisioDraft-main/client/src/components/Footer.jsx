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

          {/* Quick Links (Only working pages) */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-blue-800 w-max">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "PYQs", path: "/pyqs" },
                { name: "Notes", path: "/notes" },
                { name: "Upload Notes", path: "/upload-notes" },
                { name: "Ask AI", path: "/ask-ai" },
                { name: "Community", path: "/community" },
                { name: "About Developer", path: "/about-developer" },
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

          {/* Resources (agar chhodo to remove kar do, warna Terms/Privacy rakho) */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-blue-800 w-max">
              Resources
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Terms of Use", path: "/terms" },
                { name: "Privacy Policy", path: "/privacy" },
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
                { icon: <Facebook size={20} />, url: "https://www.facebook.com/profile.php?id=61555703581430" },
                { icon: <Twitter size={20} />, url: "https://x.com/AKCNMOTIVETION" },
                { icon: <Linkedin size={20} />, url: "https://www.linkedin.com/in/abhishek-kumar-502b40324/" },
                { icon: <Instagram size={20} />, url: "http://instagram.com/a_7ck_" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="p-2 bg-blue-900 rounded-full hover:bg-blue-700 transition-all duration-300 hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="pt-2">
              <p className="text-gray-300 text-sm flex items-center">
                visiofraft@gmail.com
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
              href="/about-developer"
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
