// routes/match.js
import express from "express";
import { getMatchScore } from "../utils/aiUtils.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { jobDescription, resumeText } = req.body;
    try {
        const score = await getMatchScore(jobDescription, resumeText);
        res.json({ matchScore: score });
    } catch (error) {
        res.status(500).json({ error: "Matching failed" });
    }
});

export default router;
