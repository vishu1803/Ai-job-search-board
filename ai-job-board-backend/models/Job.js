// models/Job.js
import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  skillsRequired: [String],
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  datePosted: { type: Date, default: Date.now }
});

export default mongoose.model("Job", JobSchema);
