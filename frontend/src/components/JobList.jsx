import React, { useEffect, useState } from "react";
import axios from "axios";

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await axios.get("http://localhost:5000/api/jobs");
      setJobs(response.data);
    };
    fetchJobs();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">Job Listings</h2>
      {jobs.length === 0 ? <p>No jobs found</p> : (
        jobs.map((job) => (
          <div key={job._id} className="p-4 border-b">
            <h3 className="font-bold">{job.title}</h3>
            <p>{job.company} - {job.location}</p>
            <p>Salary: ${job.salary}</p>
            <p>{job.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default JobList;
