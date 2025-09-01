import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { backendUrl } from "../App";
import { FiUser, FiMail, FiLock, FiBook, FiArrowRight } from "react-icons/fi";
import Navbar from "../components/Navbar";

const Signup = ({ setToken }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isStudent: false,
    university: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Please enter a valid email";
    if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (formData.isStudent && !formData.university.trim())
      newErrors.university = "University is required";
    if (!formData.agree) newErrors.agree = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${backendUrl}/api/user/register`,
        formData
      );

      if (response.data.success) {
        toast.success("Registration successful!");
        localStorage.setItem("token", response.data.token);
        setToken?.(response.data.token);
        navigate("/");
      } else {
        toast.error(response.data.message || "Registration failed");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Registration failed"
      );
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mt-6">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="text-center text-sm text-gray-600">
            Join our community of learners and professionals
          </p>
        </div>

        <div className="mt-8 bg-white py-8 px-6 shadow-lg rounded-xl border border-gray-100 sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-md placeholder-gray-400 sm:text-sm`}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md placeholder-gray-400 sm:text-sm`}
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md placeholder-gray-400 sm:text-sm`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="isStudent"
                  name="isStudent"
                  type="checkbox"
                  checked={formData.isStudent}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="isStudent"
                  className="font-medium text-gray-700"
                >
                  I am a student
                </label>
              </div>
            </div>

            {formData.isStudent && (
              <div>
                <label
                  htmlFor="university"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  University / College
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiBook className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="university"
                    name="university"
                    type="text"
                    value={formData.university}
                    onChange={handleChange}
                    className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 border ${
                      errors.university ? "border-red-500" : "border-gray-300"
                    } rounded-md placeholder-gray-400 sm:text-sm`}
                    placeholder="Stanford University"
                  />
                </div>
                {errors.university && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.university}
                  </p>
                )}
              </div>
            )}

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agree"
                  name="agree"
                  type="checkbox"
                  required
                  checked={formData.agree}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agree" className="font-medium text-gray-700">
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-indigo-600 hover:text-indigo-500"
                  >
                    Terms & Conditions
                  </Link>
                </label>
                {errors.agree && (
                  <p className="mt-1 text-sm text-red-600">{errors.agree}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Create Account
                    <FiArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-4">
              <Link
                to="/login"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
