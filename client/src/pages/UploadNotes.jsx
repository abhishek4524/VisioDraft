import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiUpload, FiBook, FiCalendar, FiFileText } from "react-icons/fi";
import { PiSubtitles } from "react-icons/pi";
import Login from "./Login";
import axios from "axios";
import { backendUrl } from "../App";

const branchData = {
  btech: ["CSE", "ECE", "Mechanical", "Civil", "Electrical", "IT"],
  mtech: ["CSE", "AI & ML", "Data Science"],
  bca: ["General"],
  mca: ["General"],
  bsc: ["Physics", "Chemistry", "Biology", "Maths"],
  msc: ["Physics", "Chemistry", "Biology", "Maths"],
};

// ✅ FIXED subjectData closing brackets
const subjectData = {
  btech: {
    1: [
      "Mathematics I",
      "Physics",
      "Chemistry",
      "Basic Electrical Engineering",
    ],
    2: [
      "Mathematics II",
      "Programming in C",
      "Digital Electronics",
      "Mechanical Engineering",
    ],
  },
  mtech: {
    1: ["Advanced Algorithms", "Machine Learning", "Research Methodology"],
    2: ["Deep Learning", "Cloud Computing", "Big Data Analytics"],
  },
  bca: {
    1: ["Programming Fundamentals", "Discrete Mathematics"],
    2: ["OOP in Java", "Database Management Systems"],
  },
  mca: {
    1: ["Advanced Java", "Computer Networks"],
    2: ["Web Technologies", "Mobile App Development"],
  },
  bsc: {
    1: ["Biology Basics", "Environmental Studies"],
    2: ["Advanced Chemistry", "Physics II"],
  },
  msc: {
    1: ["Research Skills", "Advanced Biology"],
    2: ["Thesis Writing", "Data Analysis"],
  },
};

const UploadNotes = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    course: "",
    semester: "",
    branch: "",
    subject: "",
    noteType: "lecture",
    file: null,
  });
  const [subjects, setSubjects] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (formData.course && formData.semester) {
      setSubjects(subjectData[formData.course]?.[formData.semester] || []);
      setFormData((prev) => ({ ...prev, subject: "" }));
    }
  }, [formData.course, formData.semester]);

  const [branches, setBranches] = useState([]); // for dynamic branch options

  // ✅ Reset branch when course changes
  useEffect(() => {
    if (formData.course) {
      setBranches(branchData[formData.course] || []);
      setFormData((prev) => ({ ...prev, branch: "" }));
    }
  }, [formData.course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size should be less than 10MB");
      return;
    }

    setFormData((prev) => ({ ...prev, file }));

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.course ||
      !formData.semester ||
      !formData.branch ||
      !formData.subject ||
      !formData.noteType ||
      !formData.file
    ) {
      toast.error("Please fill all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const formPayload = new FormData();
      formPayload.append("title", formData.title);
      formPayload.append("course", formData.course);
      formPayload.append("semester", formData.semester);
      formPayload.append("branch", formData.branch);
      formPayload.append("subject", formData.subject);
      formPayload.append("noteType", formData.noteType);
      formPayload.append("file", formData.file);

      const response = await axios.post(
        `${backendUrl}/api/note/add`,
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Notes uploaded successfully!");
        setFormData({
          title: "",
          course: "",
          semester: "",
          branch: "",
          subject: "",
          noteType: "lecture",
          file: null,
        });
        setPreview("");
      } else {
        toast.error(response.data.message || "Upload failed");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Upload failed. Please try again."
      );
      console.error("Upload error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 mt-20">
      <ToastContainer position="top-right" autoClose={5000} />
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Share Your Knowledge
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Upload your study notes to help fellow students.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <PiSubtitles className="mr-2 text-blue-600" />
                Title
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Enter title for your notes"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 flex items-center">
                  <FiBook className="mr-2 text-blue-600" />
                  Course
                </label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="" disabled>
                    Select Course
                  </option>
                  <option value="btech">BTECH</option>
                  <option value="mtech">MTECH</option>
                  <option value="bca">BCA</option>
                  <option value="mca">MCA</option>
                  <option value="bsc">BSC</option>
                  <option value="msc">MSC</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 flex items-center">
                  <FiCalendar className="mr-2 text-blue-600" />
                  Semester
                </label>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  required
                  disabled={!formData.course}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:opacity-50"
                >
                  <option value="" disabled>
                    Select Semester
                  </option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      Semester {num}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Branch Dropdown */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <FiBook className="mr-2 text-blue-600" />
                Branch
              </label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                required
                disabled={!formData.course}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:opacity-50"
              >
                <option value="" disabled>
                  Select Branch
                </option>
                {branches.map((branch, index) => (
                  <option key={index} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <FiFileText className="mr-2 text-blue-600" />
                Subject
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                disabled={!formData.semester || subjects.length === 0}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:opacity-50"
              >
                <option value="" disabled>
                  Select Subject
                </option>
                {subjects.map((subject, index) => (
                  <option key={index} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <FiFileText className="mr-2 text-blue-600" />
                Note Type
              </label>
              <select
                name="noteType"
                value={formData.noteType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="" disabled>
                  Select Note Type
                </option>
                <option value="lecture">Lecture Notes</option>
                <option value="summary">Summary / Revision</option>
                <option value="practical">Practical / Lab Work</option>
                <option value="problems">Solved Problems</option>
                <option value="cheatsheet">Formula / Cheat Sheet</option>
                <option value="previous">Previous Year Solutions</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <FiUpload className="mr-2 text-blue-600" />
                Notes File (PDF preferred)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  {preview && (
                    <div className="mb-4">
                      <img
                        src={preview}
                        alt="Preview"
                        className="mx-auto h-32 object-contain"
                      />
                    </div>
                  )}
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PDF, DOC, JPG, PNG up to 10MB
                  </p>
                </div>
              </div>
              {formData.file && (
                <p className="text-sm text-gray-500 mt-1">
                  Selected file: {formData.file.name} (
                  {(formData.file.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  "Upload Notes"
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UploadNotes;
