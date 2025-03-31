import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import ResumeUpload from "./ResumeUpload";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  const handleMatchResult = (score) => {
    alert(`Match Score: ${score}`);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Dashboard
      </h1>
      
      {/* Resume Upload & Match Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Upload Resume &amp; Get Match Score
        </h2>
        <ResumeUpload onMatch={handleMatchResult} />
      </section>
      
      {/* Job Listings Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Job Listings
        </h2>
        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No jobs available at the moment.</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
