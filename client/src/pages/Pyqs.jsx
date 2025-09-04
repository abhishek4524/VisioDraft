import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import Footer from "../components/Footer";
import { backendUrl } from "../App";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";
import ComingSoonBanner from "../components/ComingSoonBanner";

const Pyqs = () => {
  const [allPyqs, setAllPyqs] = useState([]);
  const [pyqs, setPyqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    course: null,
    semester: null,
    year: null,
    branch: null,
  });

  const courses = ["BTECH", "MBA", "MCA", "MTECH"];
  const branches = ["CSE", "IT", "ME", "EC", "EE", "CE"];
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  const years = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() - i
  );

  const fetchPyqs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/pyqs`);
      if (response.data.success) {
        setAllPyqs(response.data.data || []);
        setPyqs(response.data.data || []);
      } else {
        toast.error(response.data.message || "Failed to fetch PYQs");
      }
    } catch (error) {
      console.error("Error fetching PYQs:", error);
      toast.error(error.response?.data?.message || "Failed to fetch PYQs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPyqs();
  }, []);

  useEffect(() => {
    if (allPyqs.length > 0) {
      const filtered = allPyqs.filter((pyq) => {
        const matchesFilters =
          (!filters.course ||
            (pyq.course &&
              pyq.course.toUpperCase() === filters.course.toUpperCase())) &&
          (!filters.branch ||
            (pyq.branch &&
              pyq.branch.toUpperCase() === filters.branch.toUpperCase())) &&
          (!filters.semester ||
            (pyq.semester &&
              pyq.semester.toString() === filters.semester.toString())) &&
          (!filters.year ||
            (pyq.year && pyq.year.toString() === filters.year.toString()));

        const matchesSearch =
          !searchQuery ||
          (pyq.title && pyq.title.toLowerCase().includes(searchQuery)) ||
          (pyq.subjectCode &&
            pyq.subjectCode.toLowerCase().includes(searchQuery));

        return matchesFilters && matchesSearch;
      });

      setPyqs(filtered);
    }
  }, [filters, searchQuery, allPyqs]);

  const handleFilter = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? null : value,
    }));
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const clearFilters = () => {
    setFilters({
      course: null,
      semester: null,
      year: null,
      branch: null,
    });
    setSearchQuery("");
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <div className="pt-24 pb-8 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Previous Year Questions
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Access a comprehensive collection of past exam papers to supercharge
            your preparation
          </p>
        </div>

        {/* Search with animated background */}
        <div className="relative mb-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg transform -skew-y-1 -rotate-1"></div>
          <div className="relative bg-white rounded-xl shadow-xl p-1">
            <Search
              placeholder="Search PYQs by subject, code, or year..."
              onSearch={handleSearch}
            />
          </div>
        </div>

        {/* Filter Sections */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filter PYQs
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Narrow down by course, branch, semester or year
              </p>
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-600 px-4 py-2 rounded-lg shadow hover:shadow-md transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Clear all ({activeFilterCount})
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FilterSection
              title="Course"
              items={courses}
              activeItem={filters.course}
              onClick={(item) => handleFilter("course", item)}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              }
              color="blue"
            />

            <FilterSection
              title="Branch"
              items={branches}
              activeItem={filters.branch}
              onClick={(item) => handleFilter("branch", item)}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              }
              color="green"
            />

            <FilterSection
              title="Semester"
              items={semesters}
              activeItem={filters.semester}
              onClick={(item) => handleFilter("semester", item)}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-purple-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              }
              color="purple"
            />

            <FilterSection
              title="Year"
              items={years}
              activeItem={filters.year}
              onClick={(item) => handleFilter("year", item)}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              }
              color="amber"
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="mt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {loading
                  ? "Loading..."
                  : `${pyqs.length} ${
                      pyqs.length === 1 ? "Paper" : "Papers"
                    } Found`}
                {activeFilterCount > 0 && !loading && (
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    (filtered)
                  </span>
                )}
              </h2>
              {!loading && (
                <p className="text-sm text-gray-500 mt-1">
                  {pyqs.length > 0
                    ? "Browse and download the papers you need"
                    : "No papers match your current filters"}
                </p>
              )}
            </div>

            {!loading && pyqs.length > 0 && (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select
                  className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                  onChange={(e) => {
                    const sorted = [...pyqs];
                    if (e.target.value === "recent") {
                      sorted.sort(
                        (a, b) => new Date(b.year) - new Date(a.year)
                      );
                    } else if (e.target.value === "downloads") {
                      sorted.sort(
                        (a, b) =>
                          (b.downloadCount || 0) - (a.downloadCount || 0)
                      );
                    } else if (e.target.value === "title") {
                      sorted.sort((a, b) => a.title.localeCompare(b.title));
                    }
                    setPyqs(sorted);
                  }}
                >
                  <option value="recent">Most Recent</option>
                  <option value="downloads">Most Downloads</option>
                  <option value="title">Alphabetical</option>
                </select>
              </div>
            )}
          </div>

          {/* <ComingSoonBanner /> */}
          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : pyqs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pyqs.map((pyq) => (
                <PyqCard key={pyq._id || pyq.id} data={pyq} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="mx-auto h-24 w-24 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-100 to-purple-100 mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-pink-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900">
                No PYQs found
              </h3>
              <p className="mt-2 text-gray-500 max-w-md mx-auto">
                {activeFilterCount > 0 || searchQuery
                  ? "No papers match your current filters. Try adjusting your search or filters."
                  : "No papers available at the moment. Please check back later."}
              </p>
              {(activeFilterCount > 0 || searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="mt-6 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-md transition-all flex items-center mx-auto font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Reset All Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const FilterSection = ({
  title,
  items,
  activeItem,
  onClick,
  icon,
  color = "blue",
}) => {
  const colorClasses = {
    blue: {
      active: "bg-blue-600 text-white",
      inactive: "bg-blue-50 text-blue-700 hover:bg-blue-100",
      icon: "text-blue-500",
    },
    green: {
      active: "bg-green-600 text-white",
      inactive: "bg-green-50 text-green-700 hover:bg-green-100",
      icon: "text-green-500",
    },
    purple: {
      active: "bg-purple-600 text-white",
      inactive: "bg-purple-50 text-purple-700 hover:bg-purple-100",
      icon: "text-purple-500",
    },
    amber: {
      active: "bg-amber-600 text-white",
      inactive: "bg-amber-50 text-amber-700 hover:bg-amber-100",
      icon: "text-amber-500",
    },
  };

  return (
    <div>
      <div className="flex items-center mb-3">
        <div className={`mr-2 ${colorClasses[color].icon}`}>{icon}</div>
        <h3 className="text-md font-semibold text-gray-700">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => onClick(item)}
            className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 flex items-center ${
              activeItem === item
                ? `${colorClasses[color].active} shadow-md`
                : colorClasses[color].inactive
            }`}
          >
            {item}
            {activeItem === item && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};



const PyqCard = ({ data }) => {
  const handleClick = () => {
    // Direct backend download route
    window.location.href = `${backendUrl}/api/pyqs/download/${data._id}`;
  };
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100 group transform hover:-translate-y-1 transition-transform duration-200">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-blue-600 transition uppercase">
              {data.title.replace(/-/g, " ")}
            </h3>
            {data.subjectCode && (
              <span className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
                {data.subjectCode}
              </span>
            )}
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800">
            {data.year}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {data.course}
          </span>
          {data.branch && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {data.branch}
            </span>
          )}
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            Sem {data.semester}
          </span>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
              />
            </svg>
            {(data.downloadCount || 0).toLocaleString()} downloads
          </div>
          <Link
            onClick={handleClick}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
          >
            Download
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pyqs;
