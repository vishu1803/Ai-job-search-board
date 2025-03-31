import React from "react";

const JobCard = ({ job }) => {
  return (
    <div className="card">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{job.title}</h3>
      <p className="text-gray-600 mb-1">
        <strong>Company:</strong> {job.company}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Location:</strong> {job.location}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Salary:</strong> ${job.salary}
      </p>
      <p className="text-gray-700 mt-2">{job.description}</p>
    </div>
  );
};

export default JobCard;
