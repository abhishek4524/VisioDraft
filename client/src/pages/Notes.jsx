import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import {
  FiBook,
  FiDownload,
  FiStar,
  FiClock,
  FiUser,
  FiFilter,
  FiX,
} from "react-icons/fi";
import Footer from "../components/Footer";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";

const Notes = () => {
  const [allNotes, setAllNotes] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [filters, setFilters] = useState({
    course: null,
    branch: null,
    semester: null,
    noteType: null,
  }); // Available filter options

  const courses = ["BTECH", "MBA", "MCA", "MTECH"];
  const branches = ["CSE", "ECE", "Mechanical", "Civil", "Electrical", "IT"];
  const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const noteTypes = [
    "Lecture Notes",
    "Summary / Revision",
    "Practical / Lab Work",
    "Solved Problems",
    "Formula / Cheat Sheet",
    "Previous Year Solutions",
  ];

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/note/list`);
      if (response.data.success) {
        setAllNotes(response.data.notes || []);
        setNotes(response.data.notes || []);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      toast.error(error.response?.data?.message || "Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []); // Apply filters whenever filters or searchQuery changes

  useEffect(() => {
    if (allNotes.length > 0) {
      const filtered = allNotes.filter((note) => {
        const matchesFilters =
          (!filters.course ||
            (note.course &&
              note.course.toUpperCase() === filters.course.toUpperCase())) &&
          (!filters.branch ||
            (note.branch &&
              note.branch.toUpperCase() === filters.branch.toUpperCase())) &&
          (!filters.semester ||
            (note.semester &&
              note.semester.toString() === filters.semester.toString())) &&
          (!filters.noteType ||
            (note.noteType &&
              note.noteType.toUpperCase() === filters.noteType.toUpperCase()));

        const matchesSearch =
          !searchQuery ||
          (note.title && note.title.toLowerCase().includes(searchQuery)) ||
          (note.subject && note.subject.toLowerCase().includes(searchQuery)) ||
          (note.author && note.author.toLowerCase().includes(searchQuery));

        return matchesFilters && matchesSearch;
      });

      setNotes(filtered);
    }
  }, [filters, searchQuery, allNotes]);

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
      branch: null,
      semester: null,
      noteType: null,
    });
    setSearchQuery("");
  }; // Count active filters

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100">
            <Navbar />     {" "}
      <div className="pt-24 pb-8 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Hero Section */}       {" "}
        <div className="mb-12 text-center">
                   {" "}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                        Study Notes & Materials          {" "}
          </h1>
                   {" "}
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Access comprehensive study materials shared by students
            and faculty          {" "}
          </p>
                 {" "}
        </div>
                {/* Search with animated background */}       {" "}
        <div className="relative mb-10">
                   {" "}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg transform -skew-y-1 -rotate-1"></div>
                   {" "}
          <div className="relative bg-white rounded-xl shadow-xl p-1">
                       {" "}
            <Search
              placeholder="Search notes by subject, topic or author..."
              onSearch={handleSearch}
            />
                     {" "}
          </div>
                 {" "}
        </div>
                {/* Filter Sections */}       {" "}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
                   {" "}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                       {" "}
            <div>
                           {" "}
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                               {" "}
                <FiFilter className="h-6 w-6 mr-2 text-indigo-600" />           
                    Filter Notes              {" "}
              </h2>
                           {" "}
              <p className="text-sm text-gray-500 mt-1">
                                Narrow down by course, branch, semester or type
                             {" "}
              </p>
                         {" "}
            </div>
                       {" "}
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-600 px-4 py-2 rounded-lg shadow hover:shadow-md transition-all"
              >
                                <FiX className="h-4 w-4 mr-1" />               
                Clear all ({activeFilterCount})              {" "}
              </button>
            )}
                     {" "}
          </div>
                   {" "}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                       {" "}
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
                           {" "}
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                 {" "}
                </svg>
              }
              color="blue"
            />
                       {" "}
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
                                   {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                                 {" "}
                </svg>
              }
              color="green"
            />
                       {" "}
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
                                   {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                                 {" "}
                </svg>
              }
              color="purple"
            />
                       {" "}
            <FilterSection
              title="Note Type"
              items={noteTypes}
              activeItem={filters.noteType}
              onClick={(item) => handleFilter("noteType", item)}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                                   {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                                 {" "}
                </svg>
              }
              color="amber"
            />
                     {" "}
          </div>
                 {" "}
        </div>
                {/* Results Section */}       {" "}
        <div className="mt-6">
                   {" "}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                       {" "}
            <div>
                           {" "}
              <h2 className="text-2xl font-bold text-gray-900">
                               {" "}
                {loading
                  ? "Loading..."
                  : `${notes.length} ${
                      notes.length === 1 ? "Note" : "Notes"
                    } Found`}
                               {" "}
                {activeFilterCount > 0 && !loading && (
                  <span className="text-sm font-normal text-gray-500 ml-2">
                                        (filtered)                  {" "}
                  </span>
                )}
                             {" "}
              </h2>
                           {" "}
              {!loading && (
                <p className="text-sm text-gray-500 mt-1">
                                   {" "}
                  {notes.length > 0
                    ? "Browse and download the notes you need"
                    : "No notes match your current filters"}
                                 {" "}
                </p>
              )}
                         {" "}
            </div>
                       {" "}
            {!loading && notes.length > 0 && (
              <div className="flex items-center space-x-3">
                               {" "}
                <span className="text-sm text-gray-500">Sort by:</span>         
                     {" "}
                <select
                  className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                  onChange={(e) => {
                    const sorted = [...notes];
                    if (e.target.value === "recent") {
                      sorted.sort(
                        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
                      );
                    } else if (e.target.value === "downloads") {
                      sorted.sort(
                        (a, b) => (b.downloads || 0) - (a.downloads || 0)
                      );
                    } else if (e.target.value === "rating") {
                      sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                    } else if (e.target.value === "title") {
                      sorted.sort((a, b) => a.title.localeCompare(b.title));
                    }
                    setNotes(sorted);
                  }}
                >
                                    <option value="recent">Most Recent</option> 
                                 {" "}
                  <option value="downloads">Most Downloads</option>             
                      <option value="rating">Highest Rating</option>           
                        <option value="title">Alphabetical</option>             
                   {" "}
                </select>
                             {" "}
              </div>
            )}
                     {" "}
          </div>
                   {" "}
          {loading ? (
            <div className="flex justify-center py-12">
                            <LoadingSpinner />           {" "}
            </div>
          ) : notes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                           {" "}
              {notes.map((note) => (
                <NoteCard key={note._id} data={note} />
              ))}
                         {" "}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                           {" "}
              <div className="mx-auto h-24 w-24 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-100 to-purple-100 mb-6">
                                <FiBook className="h-12 w-12 text-pink-600" /> 
                           {" "}
              </div>
                           {" "}
              <h3 className="mt-4 text-xl font-bold text-gray-900">
                                No Notes found              {" "}
              </h3>
                           {" "}
              <p className="mt-2 text-gray-500 max-w-md mx-auto">
                               {" "}
                {activeFilterCount > 0 || searchQuery
                  ? "No notes match your current filters. Try adjusting your search or filters."
                  : "No notes available at the moment. Please check back later."}
                             {" "}
              </p>
                           {" "}
              {(activeFilterCount > 0 || searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="mt-6 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-md transition-all flex items-center mx-auto font-medium"
                >
                                   {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                                       {" "}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                                     {" "}
                  </svg>
                                    Reset All Filters                {" "}
                </button>
              )}
                         {" "}
            </div>
          )}
                 {" "}
        </div>
             {" "}
      </div>
            <Footer />   {" "}
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
           {" "}
      <div className="flex items-center mb-3">
                <div className={`mr-2 ${colorClasses[color].icon}`}>{icon}</div>
                <h3 className="text-md font-semibold text-gray-700">{title}</h3>
             {" "}
      </div>
           {" "}
      <div className="flex flex-wrap gap-2">
               {" "}
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
                        {item}           {" "}
            {activeItem === item && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                               {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
                             {" "}
              </svg>
            )}
                     {" "}
          </button>
        ))}
             {" "}
      </div>
         {" "}
    </div>
  );
};

const NoteCard = ({ data }) => {
  const [isViewing, setIsViewing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleView = async () => {
    try {
      setIsViewing(true);
      const response = await axios.get(
        `${backendUrl}/api/note/${data._id}/view`
      );

      if (response.data.success) {
        // Open the view URL in a new tab
        window.open(response.data.viewUrl, "_blank");

        // Show success message
        toast.success("Opening note in new tab...");
      }
    } catch (error) {
      console.error("View error:", error);
      toast.error(error.response?.data?.message || "Failed to open note");
    } finally {
      setIsViewing(false);
    }
  };

  // Determine color based on note type
  const getNoteColor = () => {
    if (data.noteType?.includes("Lecture")) return "from-blue-500 to-blue-600";
    if (data.noteType?.includes("Summary"))
      return "from-green-500 to-green-600";
    if (data.noteType?.includes("Practical"))
      return "from-purple-500 to-purple-600";
    if (data.noteType?.includes("Solved")) return "from-amber-500 to-amber-600";
    if (data.noteType?.includes("Formula")) return "from-rose-500 to-rose-600";
    return "from-gray-500 to-gray-600";
  };

  const noteColor = getNoteColor();

  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group transform hover:-translate-y-1.5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient accent bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${noteColor}`}></div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="w-full">
            {/* Note type badge with subtle animation */}
            <div className="flex justify-between items-start mb-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  data.noteType?.includes("Lecture")
                    ? "bg-blue-100 text-blue-800 group-hover:bg-blue-200"
                    : data.noteType?.includes("Summary")
                    ? "bg-green-100 text-green-800 group-hover:bg-green-200"
                    : data.noteType?.includes("Practical")
                    ? "bg-purple-100 text-purple-800 group-hover:bg-purple-200"
                    : data.noteType?.includes("Solved")
                    ? "bg-amber-100 text-amber-800 group-hover:bg-amber-200"
                    : data.noteType?.includes("Formula")
                    ? "bg-rose-100 text-rose-800 group-hover:bg-rose-200"
                    : "bg-gray-100 text-gray-800 group-hover:bg-gray-200"
                }`}
              >
                {data.noteType || "Note"}
              </span>

              {/* Download count with animation */}
              <div className="flex items-center text-xs text-gray-500 transition-all duration-300 group-hover:text-gray-700">
                <FiDownload className="mr-1" />
                <span>{(data.downloadCount || 0).toLocaleString()}</span>
              </div>
            </div>

            {/* Title with gradient effect on hover */}
            <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
              {data.title}
            </h3>

            {/* Subject with subtle background */}
            {data.subject && (
              <span className="inline-block text-xs text-gray-600 font-medium bg-gray-50 px-2 py-1 rounded-md border border-gray-100 transition-all duration-300 group-hover:bg-gray-100 group-hover:border-gray-200">
                {data.subject}
              </span>
            )}
          </div>
        </div>

        {/* Author section */}
        {data.uploadedBy && (
          <div className="flex items-center mt-4 mb-4 p-2 bg-gray-50 rounded-lg transition-all duration-300 group-hover:bg-blue-50">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 mr-2 transition-all duration-300 group-hover:bg-blue-200 group-hover:text-blue-700">
              <FiUser className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-gray-500 transition-all duration-300 group-hover:text-blue-600">
                Uploaded by
              </p>
              <p className="text-sm font-medium text-gray-700 transition-all duration-300 group-hover:text-blue-800">
                {data.uploadedBy.name || data.uploadedBy.email}
              </p>
            </div>
          </div>
        )}

        {/* Tags with hover effects */}
        <div className="flex flex-wrap gap-2 mb-4">
          {data.course && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 transition-all duration-300 hover:bg-blue-100 hover:border-blue-200">
              {data.course}
            </span>
          )}
          {data.branch && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100 transition-all duration-300 hover:bg-green-100 hover:border-green-200">
              {data.branch}
            </span>
          )}
          {data.semester && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100 transition-all duration-300 hover:bg-purple-100 hover:border-purple-200">
              Sem {data.semester}
            </span>
          )}
        </div>

        {/* Footer with date and action button */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="flex flex-col text-xs text-gray-500">
            <div className="flex items-center">
              <FiClock className="mr-1.5" />
              <span>
                {data.createdAt
                  ? new Date(data.createdAt).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
            <span className="text-xs mt-0.5">
              {data.createdAt
                ? new Date(data.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : ""}
            </span>
          </div>

          <button
            onClick={handleView}
            disabled={isViewing}
            className={`relative inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-gradient-to-r ${noteColor} hover:shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 disabled:opacity-50 overflow-hidden`}
          >
            {/* Animated ring on hover */}
            {isHovered && !isViewing && (
              <span className="absolute inset-0 rounded-full bg-white opacity-0 animate-ping-slow"></span>
            )}

            <span className="relative flex items-center">
              {isViewing ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Opening...
                </>
              ) : (
                <>
                  View Note
                  <FiBook className="h-4 w-4 ml-2" />
                </>
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notes;
