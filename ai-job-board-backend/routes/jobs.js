// routes/jobs.js
import express from "express";
import Job from "../models/Job.js";
import authMiddleware from "../middleware/authMiddleware.js"; // Ensure user is logged in
const router = express.Router();

// Get all jobs
router.get("/", async (req, res) => {
    try {
        const jobs = await Job.find().populate("postedBy", "name email");
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch jobs" });
    }
});

// POST - Add a new job
router.post("/add", authMiddleware, async (req, res) => {
    try {
      const { title, company, location, description, salary } = req.body;
      const newJob = new Job({
        title,
        company,
        location,
        description,
        salary,
        postedBy: req.userId // Extracted from authMiddleware
      });
  
      await newJob.save();
      res.status(201).json({ message: "Job posted successfully", job: newJob });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
  
  export default router;
