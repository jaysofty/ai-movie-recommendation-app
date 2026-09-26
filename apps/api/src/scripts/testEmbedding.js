import { createEmbedding } from "../services/embedding.service.js";

console.log("Testing embedding model...");

const embedding = await createEmbedding(
  "An astronaut stranded on Mars must survive and find a way home."
);

console.log("Embedding generated.");
console.log("Dimensions:", embedding.length);
console.log("First 5 values:", embedding.slice(0, 5));