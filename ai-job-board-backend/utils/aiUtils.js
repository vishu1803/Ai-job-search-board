// utils/aiUtils.js
import { HfInference } from "@huggingface/inference";

const client = new HfInference(); // Optionally, pass your API key here if needed, e.g., new HfInference("YOUR_API_KEY");

function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
  const normB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
  return dotProduct / (normA * normB);
}

export async function getMatchScore(jobDescription, resumeText) {
  try {
    // Get embeddings for job description
    const jobEmbedding = await client.featureExtraction({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      inputs: jobDescription,
    });
    
    // Get embeddings for resume text
    const resumeEmbedding = await client.featureExtraction({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      inputs: resumeText,
    });

    // Calculate cosine similarity using the first set of embeddings from each
    const score = cosineSimilarity(jobEmbedding[0], resumeEmbedding[0]);
    return score;
  } catch (error) {
    console.error("AI Matching Error:", error);
    return 0;
  }
}
