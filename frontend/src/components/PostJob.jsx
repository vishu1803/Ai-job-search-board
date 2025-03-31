import React, { useState } from "react";
import axios from "axios";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    salary: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Ensure user is logged in
      await axios.post("http://localhost:5000/api/jobs/add", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Job posted successfully!");
      setFormData({ title: "", company: "", location: "", description: "", salary: "" });
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Post a Job</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} required className="border p-2 w-full"/>
        <input type="text" name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} required className="border p-2 w-full"/>
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required className="border p-2 w-full"/>
        <textarea name="description" placeholder="Job Description" value={formData.description} onChange={handleChange} required className="border p-2 w-full"/>
        <input type="number" name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} required className="border p-2 w-full"/>
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Post Job</button>
      </form>
    </div>
  );
};

export default PostJob;
