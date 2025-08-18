import React, { useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchBar = ({ onSearch, placeholder = "Search subject or code (e.g. BCS301)", className = "" }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className={`relative ${className} sm:px-20 lg:px-24 px-5`}>
      <form onSubmit={handleSearch}>
        <div className={`bg-white flex items-center border rounded-full transition-all duration-200 ${isFocused ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-300 hover:border-gray-400'}`}>
          <button
            type="submit"
            className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Search"
          >
            <FiSearch className="h-5 w-5" />
          </button>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="py-2 px-1 w-full focus:outline-none"
          />
          
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label="Clear search"
            >
              <FiX className="h-5 w-5" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;