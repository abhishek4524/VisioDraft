import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiBook, FiUpload, FiMessageSquare } from 'react-icons/fi';
import { RiUserCommunityLine } from 'react-icons/ri';

const quickLinks = [
  { label: 'PYQs', path: '/pyqs', icon: <FiBook className="mr-2" /> },
  { label: 'Notes', path: '/notes', icon: <FiBook className="mr-2" /> },
  { label: 'Upload', path: '/upload-notes', icon: <FiUpload className="mr-2" /> },
  { label: 'Ask AI', path: '/ask-ai', icon: <FiMessageSquare className="mr-2" /> },
  { label: 'Community', path: '/community', icon: <RiUserCommunityLine className="mr-2" /> },
];

const QuickLinksBar = () => {
  const location = useLocation();

  return (
    <div className="w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto py-4 hide-scrollbar">
          <div className="flex space-x-3 mx-auto">
            {quickLinks.map((link, index) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={index}
                  to={link.path}
                  className={`flex items-center px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 border border-blue-200 shadow-inner'
                      : 'text-gray-600 hover:bg-gray-50 border border-transparent hover:border-gray-200'
                  }`}
                >
                  {React.cloneElement(link.icon, {
                    className: `${
                      isActive ? 'text-blue-500' : 'text-gray-400'
                    } ${link.icon.props.className}`
                  })}
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickLinksBar;