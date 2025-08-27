import React, { useState } from "react";
import {
  FiUsers,
  FiType,
  FiFileText,
  FiTag,
  FiCheck,
  FiX,
  FiPlus,
  FiAward,
} from "react-icons/fi";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CreateCommunity = ({ onCommunityCreated, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    topic: "",
    icon: "👥",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [characterCount, setCharacterCount] = useState({
    name: 0,
    description: 0,
  });
  const [activeSection, setActiveSection] = useState("basic");

  // Available community topics
  const communityTopics = [
    "Technology",
    "Science",
    "Mathematics",
    "Engineering",
    "Business",
    "Arts",
    "Humanities",
    "Social Sciences",
    "Education",
    "Health & Medicine",
    "Programming",
    "Design",
    "Music",
    "Sports",
    "Gaming",
    "Other",
  ];

  // Popular icons for communities
  const communityIcons = [
    "👥",
    "🚀",
    "💻",
    "📚",
    "🔬",
    "🧠",
    "🎨",
    "🎵",
    "🏆",
    "🌍",
    "💰",
    "🏫",
    "❤️",
    "📊",
    "🔍",
    "🤝",
    "💡",
    "📱",
    "🎮",
    "⚡",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Update character count
    if (name === "name" || name === "description") {
      setCharacterCount((prev) => ({
        ...prev,
        [name]: value.length,
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Community name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    } else if (formData.name.length > 50) {
      newErrors.name = "Name must be less than 50 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    } else if (formData.description.length > 500) {
      newErrors.description = "Description must be less than 500 characters";
    }

    if (!formData.topic) {
      newErrors.topic = "Please select a topic";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${backendUrl}/api/community/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success("Community created successfully!");
        if (onCommunityCreated) {
          onCommunityCreated(response.data.community);
        }
        // Reset form
        setFormData({
          name: "",
          description: "",
          topic: "",
          icon: "👥",
        });
      }
    } catch (error) {
      console.error("Create community error:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to create community";
      toast.error(errorMessage);

      // Handle specific errors
      if (error.response?.data?.message?.includes("already exists")) {
        setErrors((prev) => ({
          ...prev,
          name: "Community name already exists",
        }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleIconSelect = (icon) => {
    setFormData((prev) => ({ ...prev, icon }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      <div className="h-20 w-full"></div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-100">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-white/20 p-3 rounded-full mr-4">
                  <FiUsers className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    Create New Community
                  </h2>
                  <p className="text-indigo-100 mt-1 text-sm md:text-base">
                    Bring people together around shared interests and topics
                  </p>
                </div>
              </div>
              {onCancel && (
                <button
                  onClick={onCancel}
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
                >
                  <FiX className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          {/* Progress Steps */}
          <div className="px-8 py-4 bg-white border-b border-gray-100">
            <div className="flex items-center justify-center">
              <button
                onClick={() => setActiveSection("basic")}
                className={`flex items-center px-4 py-2 rounded-full mr-2 transition-all ${
                  activeSection === "basic"
                    ? "bg-indigo-100 text-indigo-700 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span
                  className={`flex items-center justify-center h-6 w-6 rounded-full mr-2 ${
                    activeSection === "basic"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  1
                </span>
                Basic Info
              </button>
              <div className="h-0.5 w-8 bg-gray-200 mx-1"></div>
              <button
                onClick={() => setActiveSection("details")}
                className={`flex items-center px-4 py-2 rounded-full mr-2 transition-all ${
                  activeSection === "details"
                    ? "bg-indigo-100 text-indigo-700 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span
                  className={`flex items-center justify-center h-6 w-6 rounded-full mr-2 ${
                    activeSection === "details"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  2
                </span>
                Details
              </button>
              <div className="h-0.5 w-8 bg-gray-200 mx-1"></div>
              <button
                onClick={() => setActiveSection("customize")}
                className={`flex items-center px-4 py-2 rounded-full transition-all ${
                  activeSection === "customize"
                    ? "bg-indigo-100 text-indigo-700 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span
                  className={`flex items-center justify-center h-6 w-6 rounded-full mr-2 ${
                    activeSection === "customize"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  3
                </span>
                Customize
              </button>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Community Name */}
            <div
              className={`transition-all duration-300 ${
                activeSection !== "basic" ? "opacity-70" : "opacity-100"
              }`}
            >
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
              >
                <span className="bg-indigo-100 text-indigo-700 p-1 rounded mr-2">
                  <FiType className="h-4 w-4" />
                </span>
                Community Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Web Developers Hub"
                  className={`pl-4 pr-12 py-3 w-full border rounded-lg focus:ring-2 focus:outline-none transition-all ${
                    errors.name
                      ? "border-red-400 focus:ring-red-400 bg-red-50"
                      : "border-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
                  }`}
                  maxLength={50}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <span className="text-gray-400 text-sm">
                    {characterCount.name}/50
                  </span>
                </div>
              </div>
              <div className="mt-1">
                {errors.name ? (
                  <p className="text-red-500 text-xs flex items-center">
                    <FiX className="h-3 w-3 mr-1" /> {errors.name}
                  </p>
                ) : (
                  <p className="text-gray-500 text-xs">
                    Choose a clear, descriptive name for your community
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div
              className={`transition-all duration-300 ${
                activeSection !== "basic" ? "opacity-70" : "opacity-100"
              }`}
            >
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
              >
                <span className="bg-indigo-100 text-indigo-700 p-1 rounded mr-2">
                  <FiFileText className="h-4 w-4" />
                </span>
                Description *
              </label>
              <div className="relative">
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the purpose and topics of your community. What will members discuss and share?"
                  rows={4}
                  className={`pl-4 pr-12 py-3 w-full border rounded-lg focus:ring-2 focus:outline-none transition-all ${
                    errors.description
                      ? "border-red-400 focus:ring-red-400 bg-red-50"
                      : "border-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
                  }`}
                  maxLength={500}
                />
                <div className="absolute bottom-2 right-2 pr-1 flex items-center">
                  <span className="text-gray-400 text-sm bg-white px-2 py-1 rounded">
                    {characterCount.description}/500
                  </span>
                </div>
              </div>
              <div className="mt-1">
                {errors.description ? (
                  <p className="text-red-500 text-xs flex items-center">
                    <FiX className="h-3 w-3 mr-1" /> {errors.description}
                  </p>
                ) : (
                  <p className="text-gray-500 text-xs">
                    Help people understand what this community is about
                  </p>
                )}
              </div>
            </div>

            {/* Topic Selection */}
            <div
              className={`transition-all duration-300 ${
                activeSection !== "details" ? "opacity-70" : "opacity-100"
              }`}
            >
              <label
                htmlFor="topic"
                className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
              >
                <span className="bg-indigo-100 text-indigo-700 p-1 rounded mr-2">
                  <FiTag className="h-4 w-4" />
                </span>
                Topic *
              </label>
              <div className="relative">
                <select
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  className={`pl-4 pr-10 py-3 w-full border rounded-lg focus:ring-2 focus:outline-none appearance-none transition-all ${
                    errors.topic
                      ? "border-red-400 focus:ring-red-400 bg-red-50"
                      : "border-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
                  }`}
                >
                  <option value="">
                    Select a topic that best describes your community
                  </option>
                  {communityTopics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              {errors.topic && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <FiX className="h-3 w-3 mr-1" /> {errors.topic}
                </p>
              )}
            </div>

            {/* Icon Selection */}
            <div
              className={`transition-all duration-300 ${
                activeSection !== "customize" ? "opacity-70" : "opacity-100"
              }`}
            >
              <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                <span className="bg-indigo-100 text-indigo-700 p-1 rounded mr-2">
                  <FiAward className="h-4 w-4" />
                </span>
                Community Icon
              </label>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
                {communityIcons.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => handleIconSelect(icon)}
                    className={`p-3 text-2xl rounded-xl border-2 transition-all transform hover:scale-105 ${
                      formData.icon === icon
                        ? "border-indigo-500 bg-indigo-50 shadow-md scale-105"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
              <p className="text-gray-500 text-xs mt-2">
                Choose an icon that represents your community (currently
                selected: {formData.icon})
              </p>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col-reverse sm:flex-row space-y-reverse space-y-4 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-100">
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50 font-medium"
                >
                  Cancel
                </button>
              )}
              <div className="flex space-x-3">
                {activeSection !== "basic" && (
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSection(
                        activeSection === "details" ? "basic" : "details"
                      )
                    }
                    className="px-4 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-all font-medium"
                  >
                    Back
                  </button>
                )}
                {activeSection !== "customize" ? (
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSection(
                        activeSection === "basic" ? "details" : "customize"
                      )
                    }
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-lg hover:from-indigo-600 hover:to-indigo-800 transition-all font-medium flex items-center justify-center"
                  >
                    Continue
                    <svg
                      className="ml-2 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 font-medium flex items-center justify-center shadow-md hover:shadow-lg"
                  >
                    {isSubmitting ? (
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
                        Creating...
                      </>
                    ) : (
                      <>
                        <FiPlus className="mr-2" />
                        Create Community
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Tips Card */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mt-8 border border-indigo-100">
          <h3 className="font-medium text-indigo-800 mb-3 flex items-center">
            <FiAward className="h-5 w-5 mr-2" />
            Community Creation Tips
          </h3>
          <ul className="text-sm text-indigo-700 space-y-2">
            <li className="flex items-start">
              <span className="bg-indigo-200 text-indigo-800 rounded-full h-5 w-5 flex items-center justify-center mr-2 flex-shrink-0 text-xs">
                1
              </span>
              Choose a clear, descriptive name that reflects your community's
              purpose
            </li>
            <li className="flex items-start">
              <span className="bg-indigo-200 text-indigo-800 rounded-full h-5 w-5 flex items-center justify-center mr-2 flex-shrink-0 text-xs">
                2
              </span>
              Write a detailed description to help people understand what your
              community is about
            </li>
            <li className="flex items-start">
              <span className="bg-indigo-200 text-indigo-800 rounded-full h-5 w-5 flex items-center justify-center mr-2 flex-shrink-0 text-xs">
                3
              </span>
              Select the most relevant topic to help others discover your
              community
            </li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateCommunity;
