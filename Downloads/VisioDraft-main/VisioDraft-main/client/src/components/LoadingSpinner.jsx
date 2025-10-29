// LoadingSpinner.jsx
import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = ({
  size = 40, // default size in px
  color = "#4f46e5", // default Tailwind Indigo-600
  fullscreen = false,
  message = "Loading..."
}) => {
  const spinner = (
    <motion.div
      className="rounded-full border-4 border-t-transparent animate-spin"
      style={{
        width: size,
        height: size,
        borderColor: `${color} transparent transparent transparent`
      }}
      aria-label="Loading"
    />
  );

  return fullscreen ? (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
      {spinner}
      {message && (
        <p className="mt-3 text-gray-700 font-medium animate-pulse">{message}</p>
      )}
    </div>
  ) : (
    <div className="flex flex-col items-center">
      {spinner}
      {message && (
        <p className="mt-2 text-sm text-gray-500 animate-pulse">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
