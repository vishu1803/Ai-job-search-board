import React, { useState } from "react";

const ResumeUpload = ({ onMatch }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const resumeText = e.target.result;
        // Use a dynamic job description if needed
        const jobDescription = "Looking for a React Developer with 3+ years experience";
        const response = await fetch("http://localhost:5000/api/match", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobDescription, resumeText }),
        });
        const result = await response.json();
        onMatch(result.matchScore);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Upload Resume</h3>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <input 
          type="file" 
          accept=".txt" 
          onChange={handleFileChange} 
          className="border p-2 rounded w-full md:w-auto"
        />
        <button 
          onClick={handleUpload} 
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
        >
          Upload &amp; Match
        </button>
      </div>
    </div>
  );
};

export default ResumeUpload;
