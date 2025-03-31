// routes/adminRoutes.js
import express from "express";
import Job from "../models/Job.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// GET: Fetch all jobs (admin view)
router.get("/jobs", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "name email");
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE: Remove a specific job posting by ID (admin only)
router.delete("/jobs/:jobId", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { jobId } = req.params;
    await Job.findByIdAndDelete(jobId);
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
