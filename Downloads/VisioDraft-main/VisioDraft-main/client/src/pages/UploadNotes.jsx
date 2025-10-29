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
  btech: [
    "Computer Science and Engineering (CSE)",
    "Electronics and Communication Engineering (ECE)",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Information Technology (IT)",
    "Artificial Intelligence and Machine Learning (AI & ML)",
    "Data Science and Engineering",
    "Robotics and Automation",
    "Aerospace Engineering",
    "Chemical Engineering",
    "Biotechnology",
    "Agricultural Engineering",
    "Mining Engineering",
    "Metallurgical Engineering",
    "Petroleum Engineering",
    "Marine Engineering",
    "Automobile Engineering",
    "Industrial Engineering",
    "Production Engineering",
    "Textile Engineering",
    "Food Technology",
    "Environmental Engineering",
    "Power Engineering",
    "Instrumentation Engineering",
    "Telecommunication Engineering",
    "Cyber Security",
    "Cloud Technology",
    "Internet of Things (IoT)",
    "Blockchain Technology",
  ],
  mtech: [
    "Computer Science and Engineering (CSE)",
    "Artificial Intelligence and Machine Learning (AI & ML)",
    "Data Science",
    "Robotics and Automation",
    "VLSI Design",
    "Embedded Systems",
    "Power Systems Engineering",
    "Thermal Engineering",
    "Structural Engineering",
    "Environmental Engineering",
    "Geotechnical Engineering",
    "Transportation Engineering",
    "Communication Systems",
    "Signal Processing",
    "Cyber Security",
    "Cloud Computing",
    "Internet of Things (IoT)",
    "Renewable Energy",
    "Nanotechnology",
    "Biotechnology",
    "Chemical Engineering",
    "Aerospace Engineering",
    "Nuclear Engineering",
    "Mechatronics",
    "Construction Technology",
    "Remote Sensing",
    "Big Data Analytics",
    "Computer Networks",
    "Software Engineering",
    "Materials Science",
  ],
  bca: [
    "General",
    "Cloud Technology",
    "Data Science",
    "Cyber Security",
    "Artificial Intelligence",
    "Game Development",
    "Mobile Application Development",
    "Web Technologies",
    "Internet of Things (IoT)",
    "Digital Marketing",
    "E-Commerce",
    "Cloud Computing",
    "Database Management",
    "Network Administration",
    "Software Development",
  ],
  mca: [
    "General",
    "Advanced Software Development",
    "Cloud Computing",
    "Data Science",
    "Artificial Intelligence",
    "Cyber Security",
    "Mobile Computing",
    "Web Technologies",
    "Internet of Things (IoT)",
    "Big Data Analytics",
    "Business Analytics",
    "Network Security",
    "Database Administration",
    "Software Engineering",
    "Machine Learning",
  ],
  bsc: [
    "Physics",
    "Chemistry",
    "Biology",
    "Mathematics",
    "Computer Science",
    "Electronics",
    "Statistics",
    "Microbiology",
    "Biotechnology",
    "Biochemistry",
    "Environmental Science",
    "Geology",
    "Zoology",
    "Botany",
    "Agriculture",
    "Food Science",
    "Forensic Science",
    "Psychology",
    "Anthropology",
    "Home Science",
    "Nutrition and Dietetics",
    "Fisheries Science",
    "Horticulture",
    "Forestry",
    "Medical Laboratory Technology",
    "Radiology",
    "Animation and Multimedia",
    "Geography",
    "Economics",
    "Aviation",
  ],
  msc: [
    "Physics",
    "Chemistry",
    "Biology",
    "Mathematics",
    "Computer Science",
    "Electronics",
    "Statistics",
    "Microbiology",
    "Biotechnology",
    "Biochemistry",
    "Environmental Science",
    "Geology",
    "Zoology",
    "Botany",
    "Agriculture",
    "Food Science",
    "Forensic Science",
    "Psychology",
    "Applied Mathematics",
    "Analytical Chemistry",
    "Organic Chemistry",
    "Nuclear Physics",
    "Astrophysics",
    "Molecular Biology",
    "Genetics",
    "Bioinformatics",
    "Nanotechnology",
    "Remote Sensing",
    "Geoinformatics",
    "Medical Physics",
  ],
  bcom: [
    "General",
    "Accounting and Finance",
    "Banking and Insurance",
    "Taxation",
    "Computer Applications",
    "E-Commerce",
    "Business Analytics",
    "Digital Marketing",
    "International Business",
    "Human Resource Management",
    "Marketing",
    "Financial Markets",
    "Investment Management",
    "Supply Chain Management",
    "Corporate Secretaryship",
  ],
  mcom: [
    "General",
    "Accounting and Finance",
    "Banking and Insurance",
    "Taxation",
    "Business Analytics",
    "International Business",
    "Human Resource Management",
    "Marketing",
    "Financial Management",
    "E-Commerce",
    "Investment Management",
    "Supply Chain Management",
    "Corporate Governance",
    "Business Economics",
    "Actuarial Science",
  ],
  ba: [
    "English",
    "History",
    "Political Science",
    "Sociology",
    "Economics",
    "Psychology",
    "Geography",
    "Philosophy",
    "Journalism and Mass Communication",
    "Social Work",
    "Public Administration",
    "Anthropology",
    "Archaeology",
    "Linguistics",
    "Fine Arts",
    "Music",
    "Dance",
    "Theatre Arts",
    "Foreign Languages",
    "Religious Studies",
    "Gender Studies",
    "Development Studies",
    "International Relations",
    "Criminology",
    "Library Science",
  ],
  ma: [
    "English",
    "History",
    "Political Science",
    "Sociology",
    "Economics",
    "Psychology",
    "Geography",
    "Philosophy",
    "Journalism and Mass Communication",
    "Social Work",
    "Public Administration",
    "Anthropology",
    "Archaeology",
    "Linguistics",
    "Fine Arts",
    "Music",
    "Dance",
    "Theatre Arts",
    "Foreign Languages",
    "Religious Studies",
    "Gender Studies",
    "Development Studies",
    "International Relations",
    "Criminology",
    "Library Science",
  ],
  bba: [
    "General",
    "Finance",
    "Marketing",
    "Human Resource Management",
    "International Business",
    "Entrepreneurship",
    "Digital Marketing",
    "Business Analytics",
    "Hospitality Management",
    "Tourism Management",
    "Healthcare Management",
    "Retail Management",
    "Sports Management",
    "Event Management",
    "Logistics and Supply Chain Management",
  ],
  mba: [
    "Finance",
    "Marketing",
    "Human Resource Management",
    "International Business",
    "Operations Management",
    "Information Technology",
    "Healthcare Management",
    "Hospitality Management",
    "Tourism Management",
    "Digital Marketing",
    "Business Analytics",
    "Entrepreneurship",
    "Supply Chain Management",
    "Retail Management",
    "Energy Management",
    "Aviation Management",
    "Rural Management",
    "Agribusiness Management",
    "Pharmaceutical Management",
    "Real Estate Management",
  ],
  barch: [
    "General Architecture",
    "Landscape Architecture",
    "Interior Architecture",
    "Urban Design",
    "Sustainable Architecture",
    "Industrial Design",
    "Naval Architecture",
    "Conservation Architecture",
    "Digital Architecture",
    "Parametric Design",
  ],
  march: [
    "Urban Design",
    "Landscape Architecture",
    "Interior Design",
    "Sustainable Architecture",
    "Conservation Architecture",
    "Digital Architecture",
    "Industrial Design",
    "Housing",
    "Transportation Planning",
    "Environmental Planning",
  ],
  bpharm: [
    "General Pharmacy",
    "Pharmaceutical Chemistry",
    "Pharmaceutics",
    "Pharmacology",
    "Pharmacognosy",
    "Clinical Pharmacy",
    "Industrial Pharmacy",
    "Hospital Pharmacy",
    "Community Pharmacy",
    "Pharmaceutical Analysis",
  ],
  mpharm: [
    "Pharmaceutics",
    "Pharmacology",
    "Pharmaceutical Chemistry",
    "Pharmacognosy",
    "Pharmaceutical Analysis",
    "Clinical Pharmacy",
    "Industrial Pharmacy",
    "Quality Assurance",
    "Regulatory Affairs",
    "Hospital Pharmacy",
  ],
  bds: [
    "General Dentistry",
    "Oral Surgery",
    "Periodontics",
    "Orthodontics",
    "Prosthodontics",
    "Oral Medicine",
    "Pedodontics",
    "Oral Pathology",
    "Public Health Dentistry",
    "Conservative Dentistry",
  ],
  mbbs: [
    "General Medicine",
    "Surgery",
    "Pediatrics",
    "Obstetrics and Gynecology",
    "Psychiatry",
    "Dermatology",
    "Ophthalmology",
    "Orthopedics",
    "Anesthesiology",
    "Radiology",
    "Pathology",
    "Community Medicine",
    "Forensic Medicine",
    "Emergency Medicine",
    "Physical Medicine",
  ],
  bams: [
    "General Ayurvedic Medicine",
    "Kayachikitsa",
    "Panchakarma",
    "Shalya Tantra",
    "Shalakya Tantra",
    "Prasuti Tantra",
    "Kaumarbhritya",
    "Agada Tantra",
    "Rasayana",
    "Vajikarana",
  ],
  bhms: [
    "General Homeopathic Medicine",
    "Organon of Medicine",
    "Materia Medica",
    "Homeopathic Pharmacy",
    "Repertory",
    "Practice of Medicine",
    "Surgery",
    "Obstetrics and Gynecology",
    "Community Medicine",
    "Case Taking",
  ],
  bpt: [
    "General Physiotherapy",
    "Orthopedic Physiotherapy",
    "Cardiovascular Physiotherapy",
    "Neurological Physiotherapy",
    "Pediatric Physiotherapy",
    "Sports Physiotherapy",
    "Community Physiotherapy",
    "Geriatric Physiotherapy",
    "Women's Health Physiotherapy",
    "Ergonomics",
  ],
  mpt: [
    "Orthopedic Physiotherapy",
    "Cardiovascular Physiotherapy",
    "Neurological Physiotherapy",
    "Pediatric Physiotherapy",
    "Sports Physiotherapy",
    "Community Physiotherapy",
    "Geriatric Physiotherapy",
    "Women's Health Physiotherapy",
    "Ergonomics",
    "Hand Rehabilitation",
  ],
  bscnursing: [
    "General Nursing",
    "Medical-Surgical Nursing",
    "Psychiatric Nursing",
    "Pediatric Nursing",
    "Obstetric Nursing",
    "Community Health Nursing",
    "Critical Care Nursing",
    "Oncology Nursing",
    "Emergency Nursing",
    "Geriatric Nursing",
  ],
  mscnursing: [
    "Medical-Surgical Nursing",
    "Psychiatric Nursing",
    "Pediatric Nursing",
    "Obstetric Nursing",
    "Community Health Nursing",
    "Nursing Education",
    "Nursing Administration",
    "Critical Care Nursing",
    "Oncology Nursing",
    "Emergency Nursing",
  ],
  bed: [
    "General Education",
    "Elementary Education",
    "Special Education",
    "Physical Education",
    "Early Childhood Education",
    "Educational Technology",
    "Guidance and Counseling",
    "Adult Education",
    "Language Education",
    "Mathematics Education",
    "Science Education",
    "Social Studies Education",
    "Educational Administration",
    "Curriculum and Instruction",
    "Distance Education",
  ],
  med: [
    "Educational Administration",
    "Educational Technology",
    "Guidance and Counseling",
    "Special Education",
    "Curriculum and Instruction",
    "Elementary Education",
    "Secondary Education",
    "Higher Education",
    "Adult Education",
    "Language Education",
    "Mathematics Education",
    "Science Education",
    "Social Studies Education",
    "Physical Education",
    "Early Childhood Education",
  ],
  llb: [
    "General Law",
    "Constitutional Law",
    "Criminal Law",
    "Corporate Law",
    "Tax Law",
    "International Law",
    "Labor Law",
    "Intellectual Property Law",
    "Environmental Law",
    "Human Rights Law",
    "Cyber Law",
    "Family Law",
    "Property Law",
    "Administrative Law",
    "Banking Law",
  ],
  llm: [
    "Constitutional Law",
    "Criminal Law",
    "Corporate Law",
    "Tax Law",
    "International Law",
    "Labor Law",
    "Intellectual Property Law",
    "Environmental Law",
    "Human Rights Law",
    "Cyber Law",
    "Family Law",
    "Property Law",
    "Administrative Law",
    "Banking Law",
    "Alternative Dispute Resolution",
  ],
  bfa: [
    "Painting",
    "Sculpture",
    "Applied Arts",
    "Art History",
    "Printmaking",
    "Photography",
    "Digital Arts",
    "Ceramics",
    "Textile Design",
    "Graphic Design",
    "Animation",
    "Illustration",
    "Art Conservation",
    "Art Education",
    "Visual Communication",
  ],
  mfa: [
    "Painting",
    "Sculpture",
    "Applied Arts",
    "Art History",
    "Printmaking",
    "Photography",
    "Digital Arts",
    "Ceramics",
    "Textile Design",
    "Graphic Design",
    "Animation",
    "Illustration",
    "Art Conservation",
    "Art Education",
    "Visual Communication",
  ],
  bhm: [
    "Hotel Management",
    "Culinary Arts",
    "Hospitality Management",
    "Tourism Management",
    "Event Management",
    "Restaurant Management",
    "Resort Management",
    "Catering Technology",
    "Food Production",
    "Food and Beverage Service",
    "Housekeeping Management",
    "Front Office Management",
    "Hospitality Marketing",
    "Hospitality Finance",
    "Hospitality Law",
  ],
  mhm: [
    "Hotel Management",
    "Culinary Arts",
    "Hospitality Management",
    "Tourism Management",
    "Event Management",
    "Restaurant Management",
    "Resort Management",
    "Catering Technology",
    "Food Production",
    "Food and Beverage Service",
    "Housekeeping Management",
    "Front Office Management",
    "Hospitality Marketing",
    "Hospitality Finance",
    "Hospitality Law",
  ],
  bdes: [
    "Industrial Design",
    "Fashion Design",
    "Textile Design",
    "Interior Design",
    "Graphic Design",
    "Communication Design",
    "Product Design",
    "Automotive Design",
    "Jewelry Design",
    "Footwear Design",
    "Accessory Design",
    "UI/UX Design",
    "Game Design",
    "Animation Design",
    "Film and Video Design",
  ],
  mdes: [
    "Industrial Design",
    "Fashion Design",
    "Textile Design",
    "Interior Design",
    "Graphic Design",
    "Communication Design",
    "Product Design",
    "Automotive Design",
    "Jewelry Design",
    "Footwear Design",
    "Accessory Design",
    "UI/UX Design",
    "Game Design",
    "Animation Design",
    "Film and Video Design",
  ],
  bped: [
    "General Physical Education",
    "Sports Coaching",
    "Sports Management",
    "Sports Psychology",
    "Sports Nutrition",
    "Sports Medicine",
    "Exercise Physiology",
    "Yoga Education",
    "Adapted Physical Education",
    "Outdoor Education",
    "Sports Technology",
    "Sports Journalism",
    "Sports Marketing",
    "Athletic Training",
    "Fitness Management",
  ],
  mped: [
    "Sports Coaching",
    "Sports Management",
    "Sports Psychology",
    "Sports Nutrition",
    "Sports Medicine",
    "Exercise Physiology",
    "Yoga Education",
    "Adapted Physical Education",
    "Outdoor Education",
    "Sports Technology",
    "Sports Journalism",
    "Sports Marketing",
    "Athletic Training",
    "Fitness Management",
    "Biomechanics",
  ],
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
      setFormData((prev) => ({ ...prev, subject: "" }));
    }
  }, [formData.course, formData.semester]);

  const [branches, setBranches] = useState([]);

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50 py-10">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Share Your <span className="text-blue-600">Knowledge</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your study notes and help thousands of students learn better.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6 md:p-8 border border-gray-100">
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <FiUpload className="text-blue-600 text-2xl" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Upload New Notes
            </h2>
          </div>

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
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-50 hover:bg-white"
                placeholder="Enter a descriptive title for your notes"
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-50 hover:bg-white"
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
                  <option value="bcom">BCOM</option>
                  <option value="mcom">MCOM</option>
                  <option value="ba">BA</option>
                  <option value="ma">MA</option>
                  <option value="bba">BBA</option>
                  <option value="mba">MBA</option>
                  <option value="barch">BARCH</option>
                  <option value="march">MARCH</option>
                  <option value="bpharm">BPHARM</option>
                  <option value="mpharm">MPHARM</option>
                  <option value="bds">BDS</option>
                  <option value="mbbs">MBBS</option>
                  <option value="bams">BAMS</option>
                  <option value="bhms">BHMS</option>
                  <option value="bpt">BPT</option>
                  <option value="mpt">MPT</option>
                  <option value="bscnursing">BSC NURSING</option>
                  <option value="mscnursing">MSC NURSING</option>
                  <option value="bed">BED</option>
                  <option value="med">MED</option>
                  <option value="llb">LLB</option>
                  <option value="llm">LLM</option>
                  <option value="bfa">BFA</option>
                  <option value="mfa">MFA</option>
                  <option value="bhm">BHM</option>
                  <option value="mhm">MHM</option>
                  <option value="bdes">BDES</option>
                  <option value="mdes">MDES</option>
                  <option value="bped">BPED</option>
                  <option value="mped">MPED</option>
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-50 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-50 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
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
              <input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-50 hover:bg-white"
                placeholder="Enter subject name"
              />
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
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-50 hover:bg-white"
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
              <div className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-gray-200 border-dashed rounded-xl bg-gray-50 hover:bg-white transition cursor-pointer relative group">
                <div className="space-y-2 text-center">
                  {preview ? (
                    <div className="mb-4">
                      <img
                        src={preview}
                        alt="Preview"
                        className="mx-auto h-32 object-contain rounded-lg shadow-sm"
                      />
                    </div>
                  ) : (
                    <div className="mx-auto h-16 w-16 text-gray-400 group-hover:text-blue-500 transition">
                      <FiUpload className="w-full h-full" />
                    </div>
                  )}
                  <div className="flex flex-col items-center justify-center text-sm text-gray-600">
                    <label className="relative cursor-pointer font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                      <span>Click to upload</span>
                      <input
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        required
                      />
                    </label>
                    <p className="mt-1 text-xs text-gray-500">
                      or drag and drop files here
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    JPG, PNG up to 10MB
                  </p>
                </div>
              </div>
              {formData.file && (
                <p className="text-sm text-gray-500 mt-2 px-2 py-1 bg-blue-50 rounded-md inline-block">
                  <span className="font-medium">Selected file:</span>{" "}
                  {formData.file.name} (
                  {(formData.file.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ${
                  isSubmitting ? "opacity-80 cursor-not-allowed" : ""
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
                        className="opacity-25"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  <>
                    <FiUpload className="mr-2" />
                    Upload Notes
                  </>
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
