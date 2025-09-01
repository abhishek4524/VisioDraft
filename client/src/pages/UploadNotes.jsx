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

const subjectData = {
  btech: {
    1: [
      "Mathematics I",
      "Physics",
      "Chemistry",
      "Basic Electrical Engineering",
      "Engineering Drawing",
      "Communication Skills",
      "Environmental Studies",
      "Workshop Practice",
    ],
    2: [
      "Mathematics II",
      "Programming in C",
      "Digital Electronics",
      "Mechanical Engineering",
      "Engineering Mechanics",
      "Data Structures",
      "Economics for Engineers",
      "Human Values and Ethics",
    ],
    3: [
      "Mathematics III",
      "Object Oriented Programming with C++",
      "Analog Electronics",
      "Signals and Systems",
      "Theory of Computation",
      "Discrete Mathematics",
      "Electrical Machines",
      "Database Management Systems",
    ],
    4: [
      "Computer Organization and Architecture",
      "Operating Systems",
      "Microprocessors and Microcontrollers",
      "Probability and Statistics",
      "Design and Analysis of Algorithms",
      "Software Engineering",
      "Control Systems",
      "Digital Signal Processing",
    ],
    5: [
      "Database Management System",
      "Web Technologies",
      "Design and Analysis of Algorithms",
      "Soft Computing",
      "Indian Constitution",
      "Object Oriented System Design with C++",
    ],
    6: [
      "Data Science",
      "Internet of Things",
      "Computer Graphics",
      "Big Data Analytics",
      "Wireless Communication",
      "Natural Language Processing",
      "Distributed Systems",
      "Project Management",
    ],
    7: [
      "Deep Learning",
      "Blockchain Technology",
      "Cyber Security",
      "Robotics",
      "Quantum Computing",
      "Image Processing",
      "Software Testing and Quality Assurance",
      "Entrepreneurship Development",
    ],
    8: [
      "Project Work",
      "Industrial Training",
      "Research Methodology",
      "Technical Seminar",
      "Comprehensive Viva",
      "Professional Ethics",
      "Advanced Topics in Computer Science",
      "Startup Incubation",
    ],
  },
  mtech: {
    1: [
      "Advanced Algorithms",
      "Machine Learning",
      "Research Methodology",
      "Advanced Database Systems",
      "Computer Vision",
      "High Performance Computing",
      "Soft Computing",
      "Pattern Recognition",
    ],
    2: [
      "Deep Learning",
      "Cloud Computing",
      "Big Data Analytics",
      "Natural Language Processing",
      "Internet of Things",
      "Information Security",
      "Distributed Systems",
      "Reinforcement Learning",
    ],
    3: [
      "Advanced Computer Architecture",
      "Quantum Machine Learning",
      "Bioinformatics",
      "Edge Computing",
      "Autonomous Systems",
      "Digital Forensics",
      "Human Computer Interaction",
      "Wireless Sensor Networks",
    ],
    4: [
      "Thesis/Dissertation",
      "Research Seminar",
      "Advanced Topics in AI",
      "Industry Internship",
      "Patent Filing Process",
      "Technical Writing",
      "Innovation Management",
      "Academic Publishing",
    ],
  },
  bca: {
    1: [
      "Programming Fundamentals",
      "Discrete Mathematics",
      "Computer Fundamentals",
      "Digital Logic",
      "Business Communication",
      "Principles of Management",
      "Financial Accounting",
      "Office Automation Tools",
    ],
    2: [
      "OOP in Java",
      "Database Management Systems",
      "Data Structures",
      "Web Designing",
      "Organizational Behavior",
      "Business Mathematics",
      "Software Engineering",
      "Computer Organization",
    ],
    3: [
      "Operating Systems",
      "Computer Networks",
      "Python Programming",
      "Web Development with PHP",
      "Management Information Systems",
      "E-Commerce",
      "Visual Programming",
      "Statistics for Computing",
    ],
    4: [
      "Dot Net Technologies",
      "Mobile Application Development",
      "Cloud Computing",
      "Software Testing",
      "Cyber Security",
      "Enterprise Resource Planning",
      "Project Management",
      "Human Resource Management",
    ],
    5: [
      "Artificial Intelligence",
      "Internet of Things",
      "Data Mining",
      "Big Data Analytics",
      "Multimedia Systems",
      "Linux Administration",
      "Digital Marketing",
      "Entrepreneurship",
    ],
    6: [
      "Project Work",
      "Industrial Training",
      "Advanced Web Technologies",
      "Machine Learning",
      "Cyber Laws",
      "IT Service Management",
      "Business Intelligence",
      "Startup Management",
    ],
  },
  mca: {
    1: [
      "Advanced Java",
      "Computer Networks",
      "Advanced Database Systems",
      "Software Engineering",
      "Object Oriented Analysis and Design",
      "Discrete Mathematical Structures",
      "Operating Systems",
      "Web Technologies",
    ],
    2: [
      "Web Technologies",
      "Mobile App Development",
      "Data Warehousing and Mining",
      "Cloud Computing",
      "Artificial Intelligence",
      "Computer Graphics",
      "Network Security",
      "Algorithm Analysis and Design",
    ],
    3: [
      "Machine Learning",
      "Big Data Analytics",
      "Internet of Things",
      "Software Project Management",
      "Enterprise Computing",
      "Digital Image Processing",
      "Natural Language Processing",
      "Cyber Forensics",
    ],
    4: [
      "Project Work",
      "Industrial Training",
      "Research Methodology",
      "Advanced Topics in Computing",
      "Business Analytics",
      "Information Security Management",
      "Cloud Native Development",
      "Blockchain Technology",
    ],
  },
  bsc: {
    1: [
      "Biology Basics",
      "Environmental Studies",
      "Mathematics I",
      "Physics I",
      "Chemistry I",
      "Communication Skills",
      "Computer Fundamentals",
      "Statistics I",
    ],
    2: [
      "Advanced Chemistry",
      "Physics II",
      "Mathematics II",
      "Botany",
      "Zoology",
      "Genetics",
      "Biochemistry",
      "Microbiology",
    ],
    3: [
      "Cell Biology",
      "Molecular Biology",
      "Immunology",
      "Ecology",
      "Biostatistics",
      "Plant Physiology",
      "Animal Physiology",
      "Research Methodology",
    ],
    4: [
      "Evolutionary Biology",
      "Developmental Biology",
      "Bioinformatics",
      "Enzymology",
      "Parasitology",
      "Environmental Biology",
      "Biotechnology",
      "Genetic Engineering",
    ],
    5: [
      "Medical Diagnostics",
      "Cancer Biology",
      "Neuroscience",
      "Pharmacology",
      "Virology",
      "Agricultural Biotechnology",
      "Marine Biology",
      "Industrial Microbiology",
    ],
    6: [
      "Project Work",
      "Industrial Visit Report",
      "Advanced Genetics",
      "Stem Cell Biology",
      "Bioethics",
      "Scientific Writing",
      "Entrepreneurship in Biosciences",
      "Comprehensive Viva",
    ],
  },
  msc: {
    1: [
      "Research Skills",
      "Advanced Biology",
      "Biostatistics",
      "Molecular Biology Techniques",
      "Genomics and Proteomics",
      "Bioinstrumentation",
      "Scientific Communication",
      "Laboratory Management",
    ],
    2: [
      "Thesis Writing",
      "Data Analysis",
      "Advanced Immunology",
      "Cancer Biology",
      "Stem Cell Technology",
      "Drug Discovery and Development",
      "Bioentrepreneurship",
      "Intellectual Property Rights",
    ],
    3: [
      "Specialization Elective I",
      "Specialization Elective II",
      "Research Project Phase I",
      "Advanced Microscopy Techniques",
      "Bioinformatics Tools",
      "Environmental Biotechnology",
      "Medical Biotechnology",
      "Industrial Training",
    ],
    4: [
      "Dissertation",
      "Research Publication",
      "Seminar Presentation",
      "Grant Writing",
      "Science Policy",
      "Technology Transfer",
      "Regulatory Affairs",
      "Career Development",
    ],
  },
  bcom: {
    1: [
      "Financial Accounting",
      "Business Economics",
      "Business Mathematics",
      "Business Organization",
      "Principles of Management",
      "Business Communication",
      "Environmental Studies",
      "Computer Applications in Business",
    ],
    2: [
      "Corporate Accounting",
      "Business Statistics",
      "Company Law",
      "Cost Accounting",
      "Marketing Management",
      "Human Resource Management",
      "Financial Management",
      "Business Law",
    ],
    3: [
      "Income Tax Law and Practice",
      "Auditing",
      "Management Accounting",
      "Banking and Insurance",
      "Goods and Services Tax",
      "Entrepreneurship Development",
      "E-Commerce",
      "Organizational Behavior",
    ],
    4: [
      "Advanced Accounting",
      "Investment Management",
      "International Business",
      "Strategic Management",
      "Business Research Methods",
      "Indirect Taxes",
      "Project Management",
      "Consumer Protection Act",
    ],
    5: [
      "Financial Markets and Services",
      "Security Analysis and Portfolio Management",
      "Risk Management",
      "Derivatives and Financial Engineering",
      "Wealth Management",
      "Business Ethics",
      "Digital Marketing",
      "Supply Chain Management",
    ],
    6: [
      "Project Work",
      "Internship",
      "Comprehensive Viva",
      "Case Study Analysis",
      "Business Analytics",
      "International Finance",
      "Mergers and Acquisitions",
      "Startup Finance",
    ],
  },
  mcom: {
    1: [
      "Advanced Financial Accounting",
      "Research Methodology",
      "Corporate Governance",
      "Strategic Financial Management",
      "Business Analytics",
      "Economic Analysis",
      "Advanced Business Law",
      "International Business Environment",
    ],
    2: [
      "Advanced Cost and Management Accounting",
      "Security Analysis and Portfolio Management",
      "International Financial Management",
      "Tax Planning and Management",
      "Financial Derivatives",
      "Organizational Theory and Behavior",
      "Marketing Research",
      "Human Capital Management",
    ],
    3: [
      "Business Valuation",
      "Risk Management and Insurance",
      "Banking and Financial Services",
      "E-Commerce and Digital Business",
      "Project Appraisal and Finance",
      "Corporate Restructuring",
      "Commodity Markets",
      "Wealth Management",
    ],
    4: [
      "Dissertation",
      "Seminar",
      "Advanced Business Strategy",
      "Entrepreneurial Finance",
      "Behavioral Finance",
      "Financial Modeling",
      "Sustainable Business Practices",
      "Professional Certification Preparation",
    ],
  },
  ba: {
    1: [
      "English Literature",
      "Indian History",
      "Political Science",
      "Sociology",
      "Economics",
      "Psychology",
      "Philosophy",
      "Environmental Studies",
    ],
    2: [
      "American Literature",
      "World History",
      "International Relations",
      "Social Anthropology",
      "Microeconomics",
      "Cognitive Psychology",
      "Western Philosophy",
      "Media Studies",
    ],
    3: [
      "Shakespeare Studies",
      "History of Modern India",
      "Public Administration",
      "Social Psychology",
      "Macroeconomics",
      "Indian Philosophy",
      "Gender Studies",
      "Research Methods",
    ],
    4: [
      "Literary Theory",
      "Historiography",
      "Comparative Politics",
      "Development Economics",
      "Clinical Psychology",
      "Contemporary Philosophy",
      "Cultural Studies",
      "Academic Writing",
    ],
    5: [
      "Postcolonial Literature",
      "History of Science",
      "Political Theory",
      "Economic Policy",
      "Organizational Psychology",
      "Ethics",
      "Film Studies",
      "Translation Studies",
    ],
    6: [
      "Research Project",
      "Comprehensive Viva",
      "Specialization Elective I",
      "Specialization Elective II",
      "Internship Report",
      "Dissertation",
      "Seminar Presentation",
      "Career Development",
    ],
  },
  ma: {
    1: [
      "Literary Criticism",
      "Advanced Research Methodology",
      "Contemporary Political Thought",
      "Advanced Sociological Theories",
      "Advanced Economic Theory",
      "Cognitive Neuroscience",
      "Contemporary Philosophy",
      "Cultural Anthropology",
    ],
    2: [
      "Comparative Literature",
      "Historical Research Methods",
      "International Political Economy",
      "Social Stratification",
      "Development Economics",
      "Advanced Psychological Testing",
      "Philosophy of Mind",
      "Visual Anthropology",
    ],
    3: [
      "Specialization Paper I",
      "Specialization Paper II",
      "Research Proposal Development",
      "Academic Publishing",
      "Digital Humanities",
      "Policy Analysis",
      "Clinical Assessment",
      "Ethical Theories",
    ],
    4: [
      "Thesis/Dissertation",
      "Research Seminar",
      "Teaching Practicum",
      "Professional Development",
      "Conference Presentation",
      "Grant Writing",
      "Public Intellectualism",
      "Career Planning",
    ],
  },
  bba: {
    1: [
      "Principles of Management",
      "Business Economics",
      "Financial Accounting",
      "Business Mathematics",
      "Business Communication",
      "Computer Applications",
      "Organizational Behavior",
      "Environmental Management",
    ],
    2: [
      "Marketing Management",
      "Cost Accounting",
      "Business Statistics",
      "Human Resource Management",
      "Business Law",
      "Management Information Systems",
      "Financial Management",
      "Business Ethics",
    ],
    3: [
      "Operations Management",
      "Research Methodology",
      "Direct Taxes",
      "Consumer Behavior",
      "Training and Development",
      "Banking and Insurance",
      "E-Commerce",
      "Entrepreneurship",
    ],
    4: [
      "Strategic Management",
      "Indirect Taxes",
      "International Business",
      "Project Management",
      "Leadership Skills",
      "Supply Chain Management",
      "Digital Marketing",
      "Business Analytics",
    ],
    5: [
      "Investment Management",
      "Services Marketing",
      "Performance Management",
      "Risk Management",
      "Corporate Governance",
      "Business Policy",
      "Startup Management",
      "Innovation Management",
    ],
    6: [
      "Internship",
      "Project Work",
      "Comprehensive Viva",
      "Case Study Analysis",
      "Management Game",
      "Industry Analysis",
      "Business Plan Development",
      "Professional Certification",
    ],
  },
  mba: {
    1: [
      "Management Concepts",
      "Managerial Economics",
      "Accounting for Managers",
      "Organizational Behavior",
      "Business Statistics",
      "Marketing Management",
      "Financial Management",
      "Business Communication",
    ],
    2: [
      "Human Resource Management",
      "Operations Management",
      "Research Methodology",
      "Business Environment",
      "Management Information Systems",
      "Legal Aspects of Business",
      "Quantitative Techniques",
      "Business Analytics",
    ],
    3: [
      "Strategic Management",
      "International Business",
      "Entrepreneurship Development",
      "Project Management",
      "Supply Chain Management",
      "Digital Business",
      "Leadership Skills",
      "Specialization Elective I",
    ],
    4: [
      "Corporate Governance",
      "Business Ethics",
      "Risk Management",
      "Innovation Management",
      "Mergers and Acquisitions",
      "Industry Internship",
      "Project Work",
      "Specialization Elective II",
    ],
  },
  barch: {
    1: [
      "Architectural Design I",
      "Building Construction I",
      "Architectural Drawing I",
      "History of Architecture I",
      "Building Materials",
      "Structures I",
      "Environmental Studies",
      "Visual Arts and Basic Design",
    ],
    2: [
      "Architectural Design II",
      "Building Construction II",
      "Architectural Drawing II",
      "History of Architecture II",
      "Climatology",
      "Structures II",
      "Surveying and Leveling",
      "Computer Applications I",
    ],
    3: [
      "Architectural Design III",
      "Building Construction III",
      "History of Architecture III",
      "Structures III",
      "Water Supply and Sanitation",
      "Electrical and Mechanical Services",
      "Specification Estimation",
      "Computer Applications II",
    ],
    4: [
      "Architectural Design IV",
      "Building Construction IV",
      "Theory of Architecture",
      "Structures IV",
      "Working Drawing",
      "Landscape Architecture",
      "Housing",
      "Interior Design",
    ],
    5: [
      "Architectural Design V",
      "Building Construction V",
      "Town Planning",
      "Structures V",
      "Professional Practice",
      "Project Management",
      "Elective I",
      "Research Methodology",
    ],
    6: [
      "Architectural Design VI",
      "Building Construction VI",
      "Urban Design",
      "Disaster Mitigation",
      "Construction Management",
      "Elective II",
      "Seminar",
      "Site Planning",
    ],
    7: [
      "Thesis Project I",
      "Advanced Building Services",
      "Sustainable Architecture",
      "Building Automation",
      "Real Estate Valuation",
      "Elective III",
      "Professional Training",
      "Portfolio Development",
    ],
    8: [
      "Thesis Project II",
      "Comprehensive Viva",
      "Professional Practice II",
      "Law and Architecture",
      "Critical Thinking",
      "Entrepreneurship",
      "Digital Fabrication",
      "International Architecture",
    ],
  },
  llb: {
    1: [
      "Jurisprudence",
      "Law of Contract",
      "Constitutional Law I",
      "Legal Method",
      "Law of Torts",
      "Family Law I",
      "Criminal Law I",
      "Legal English",
    ],
    2: [
      "Administrative Law",
      "Constitutional Law II",
      "Property Law",
      "Family Law II",
      "Criminal Law II",
      "Public International Law",
      "Law of Evidence",
      "Moot Court Exercise",
    ],
    3: [
      "Company Law",
      "Environmental Law",
      "Labour Law I",
      "Human Rights Law",
      "Intellectual Property Law",
      "Civil Procedure Code",
      "Criminal Procedure Code",
      "Drafting, Pleading and Conveyance",
    ],
    4: [
      "Labour Law II",
      "Taxation Law",
      "Cyber Law",
      "Alternative Dispute Resolution",
      "International Trade Law",
      "Banking Law",
      "Insurance Law",
      "Professional Ethics",
    ],
    5: [
      "Law of Equity and Trust",
      "Competition Law",
      "Air and Space Law",
      "Media Law",
      "Healthcare Law",
      "International Humanitarian Law",
      "Research Methodology",
      "Seminar Course",
    ],
    6: [
      "Internship",
      "Dissertation",
      "Clinical Legal Education",
      "Law and Technology",
      "Maritime Law",
      "Refugee Law",
      "Sports Law",
      "Moot Court and Trial Advocacy",
    ],
  },
  bpharm: {
    1: [
      "Pharmaceutical Inorganic Chemistry",
      "Human Anatomy and Physiology",
      "Pharmaceutics I",
      "Pharmaceutical Analysis I",
      "Remedial Biology",
      "Remedial Mathematics",
      "Communication Skills",
      "Computer Applications",
    ],
    2: [
      "Pharmaceutical Organic Chemistry I",
      "Biochemistry",
      "Pathophysiology",
      "Pharmaceutics II",
      "Pharmaceutical Microbiology",
      "Pharmacognosy I",
      "Environmental Sciences",
      "Health Education",
    ],
    3: [
      "Pharmaceutical Organic Chemistry II",
      "Physical Pharmaceutics I",
      "Pharmaceutical Engineering",
      "Pharmaceutical Technology",
      "Pharmacology I",
      "Pharmaceutical Jurisprudence",
      "Medicinal Chemistry I",
      "Instrumental Methods of Analysis",
    ],
    4: [
      "Medicinal Chemistry II",
      "Physical Pharmaceutics II",
      "Pharmacology II",
      "Pharmacognosy II",
      "Pharmaceutical Biotechnology",
      "Herbal Drug Technology",
      "Biopharmaceutics",
      "Pharmaceutical Quality Assurance",
    ],
    5: [
      "Medicinal Chemistry III",
      "Pharmacology III",
      "Herbal Technology",
      "Pharmaceutical Formulations",
      "Pharmacotherapeutics I",
      "Hospital Pharmacy",
      "Clinical Pharmacy",
      "Cell Biology",
    ],
    6: [
      "Medicinal Chemistry IV",
      "Pharmacology IV",
      "Pharmacotherapeutics II",
      "Pharmaceutical Marketing",
      "Quality Control",
      "Drug Design",
      "Molecular Biology",
      "Project Work",
    ],
    7: [
      "Instrumental Analysis",
      "Novel Drug Delivery Systems",
      "Biostatistics",
      "Social Pharmacy",
      "Pharmacy Practice",
      "Clinical Research",
      "Pharmacogenomics",
      "Industrial Training",
    ],
    8: [
      "Biotechnology",
      "Cosmetic Technology",
      "Advanced Drug Delivery",
      "Dietary Supplements",
      "Pharmaceutical Regulatory Affairs",
      "Pharmacovigilance",
      "Comprehensive Viva",
      "Research Project",
    ],
  },
  dpharm: {
    1: [
      "Pharmaceutics I",
      "Pharmaceutical Chemistry I",
      "Pharmacognosy",
      "Biochemistry and Clinical Pathology",
      "Human Anatomy and Physiology",
      "Health Education",
      "Community Pharmacy",
      "First Aid",
    ],
    2: [
      "Pharmaceutics II",
      "Pharmaceutical Chemistry II",
      "Pharmacology",
      "Pharmaceutical Jurisprudence",
      "Drug Store and Business Management",
      "Hospital Pharmacy",
      "Clinical Pharmacy",
      "Project Work",
    ],
  },
  bscnursing: {
    1: [
      "Anatomy",
      "Physiology",
      "Nutrition",
      "Biochemistry",
      "Nursing Foundations",
      "Psychology",
      "Microbiology",
      "English",
    ],
    2: [
      "Sociology",
      "Pharmacology",
      "Pathology",
      "Genetics",
      "Medical-Surgical Nursing I",
      "Community Health Nursing I",
      "Communication skills",
      "Introduction to Nursing Research",
    ],
    3: [
      "Medical-Surgical Nursing II",
      "Child Health Nursing",
      "Mental Health Nursing",
      "Nursing Research",
      "Nursing Management",
      "Community Health Nursing II",
      "Educational Technology",
      "Professional Trends",
    ],
    4: [
      "Midwifery and Obstetrical Nursing",
      "Community Health Nursing III",
      "Nursing Education",
      "Nursing Administration",
      "Internship",
      "Research Project",
      "Comprehensive Exam",
      "Nursing Seminar",
    ],
  },
  bped: {
    1: [
      "Foundations of Physical Education",
      "Anatomy and Physiology",
      "Health Education",
      "Track and Field",
      "Gymnastics",
      "Swimming",
      "First Aid and CPR",
      "History of Physical Education",
    ],
    2: [
      "Sports Psychology",
      "Kinesiology and Biomechanics",
      "Sports Nutrition",
      "Team Games",
      "Individual Games",
      "Yoga Education",
      "Measurement and Evaluation",
      "Officiating and Coaching",
    ],
    3: [
      "Sports Sociology",
      "Exercise Physiology",
      "Sports Management",
      "Adapted Physical Education",
      "Sports Training",
      "Research Methods",
      "Sports Medicine",
      "Curriculum Design",
    ],
    4: [
      "Organization and Administration",
      "Sports Technology",
      "Fitness Management",
      "Internship",
      "Project Work",
      "Sports Journalism",
      "Event Management",
      "Career Opportunities",
    ],
  },
  bed: {
    1: [
      "Childhood and Growing Up",
      "Contemporary India and Education",
      "Learning and Teaching",
      "Language across Curriculum",
      "Pedagogy of School Subject I",
      "Pedagogy of School Subject II",
      "Understanding ICT",
      "School Attachment",
    ],
    2: [
      "Knowledge and Curriculum",
      "Assessment for Learning",
      "Creating an Inclusive School",
      "Gender, School and Society",
      "Health and Physical Education",
      "Art Education",
      "Reading and Reflecting on Texts",
      "Community Living Camp",
    ],
    3: [
      "Learning Resource Project",
      "Critical Understanding of ICT",
      "Pre-Internship",
      "Pedagogy of School Subject III",
      "Pedagogy of School Subject IV",
      "Environmental Education",
      "Understanding the Self",
      "Youth Leadership",
    ],
    4: [
      "Internship",
      "Reflective Journal",
      "Action Research",
      "Philosophy of Education",
      "Sociology of Education",
      "Guidance and Counseling",
      "Teacher Education",
      "Current Affairs",
    ],
  },
  law: {
    1: [
      "Legal Methods",
      "Law of Contract",
      "Constitutional Law I",
      "Law of Torts",
      "Family Law I",
      "Criminal Law I",
      "English Legal System",
      "Legal Research",
    ],
    2: [
      "Constitutional Law II",
      "Property Law",
      "Administrative Law",
      "Family Law II",
      "Criminal Law II",
      "Public International Law",
      "Law of Evidence",
      "Moot Court",
    ],
    3: [
      "Company Law",
      "Environmental Law",
      "Labour Law I",
      "Human Rights Law",
      "Intellectual Property Law",
      "Civil Procedure Code",
      "Criminal Procedure Code",
      "Drafting and Pleading",
    ],
    4: [
      "Labour Law II",
      "Taxation Law",
      "Cyber Law",
      "Alternative Dispute Resolution",
      "International Trade Law",
      "Banking Law",
      "Insurance Law",
      "Professional Ethics",
    ],
    5: [
      "Law of Equity and Trust",
      "Competition Law",
      "Air and Space Law",
      "Media Law",
      "Healthcare Law",
      "International Humanitarian Law",
      "Research Methodology",
      "Seminar",
    ],
    6: [
      "Internship",
      "Dissertation",
      "Clinical Legal Education",
      "Law and Technology",
      "Maritime Law",
      "Refugee Law",
      "Sports Law",
      "Trial Advocacy",
    ],
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
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                disabled={!formData.semester || subjects.length === 0}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-50 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
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
