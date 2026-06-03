import fs from "fs/promises";
import path from "path";
import { getOpenAIClient } from "./openai";
import type { Source } from "./types";
import type { EmbeddedChunk } from "./ingest";

function dotProduct(a: number[], b: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * b[i];
  }
  return sum;
}

export async function retrieveRelevantChunks(question: string): Promise<Source[]> {
  const vectorStorePath = path.join(process.cwd(), "chroma", "vector_store.json");

  try {
    const fileContent = await fs.readFile(vectorStorePath, "utf-8");
    const embeddedChunks = JSON.parse(fileContent) as EmbeddedChunk[];

    if (embeddedChunks.length === 0) {
      return [];
    }

    const openai = getOpenAIClient();
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: question,
    });

    const queryEmbedding = response.data[0].embedding;

    const scoredChunks = embeddedChunks.map((chunk) => {
      const score = dotProduct(queryEmbedding, chunk.embedding);
      return {
        source: chunk.source,
        preview: chunk.content,
        score,
      };
    });

    // Sort by similarity score descending
    scoredChunks.sort((a, b) => b.score - a.score);

    // Return the top 15 matches
    return scoredChunks.slice(0, 15);
  } catch (error: any) {
    console.error("Retrieval failed:", error);
    return [];
  }
}
