import { pipeline } from "@huggingface/transformers";

let extractor;

async function getExtractor() {
  if (!extractor) {
    console.log("Loading embedding model...");

    extractor = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2",
    );

    console.log("Embedding model loaded.");
  }

  return extractor;
}

export async function createEmbedding(text) {
  const model = await getExtractor();

  const output = await model(text, {
    pooling: "mean",
    normalize: true,
  });

  return Array.from(output.data);
}