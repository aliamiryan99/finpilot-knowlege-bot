import fs from "fs/promises";
import path from "path";
import { getOpenAIClient } from "./openai";
import { chunkDocument } from "./chunk";
import type { DocumentChunk } from "./types";

export interface EmbeddedChunk extends DocumentChunk {
  embedding: number[];
}

export async function ingestDocuments() {
  const docsDir = path.join(process.cwd(), "docs");
  const chromaDir = path.join(process.cwd(), "chroma");
  const vectorStorePath = path.join(chromaDir, "vector_store.json");

  console.log(`Scanning directory: ${docsDir}...`);
  const files = await fs.readdir(docsDir);
  const markdownFiles = files.filter((f) => f.endsWith(".md"));

  console.log(`Found ${markdownFiles.length} markdown files to ingest.`);

  const allChunks: DocumentChunk[] = [];
  for (const filename of markdownFiles) {
    const filePath = path.join(docsDir, filename);
    const content = await fs.readFile(filePath, "utf-8");
    const fileChunks = chunkDocument(filename, content);
    console.log(`Split ${filename} into ${fileChunks.length} chunks.`);
    allChunks.push(...fileChunks);
  }

  if (allChunks.length === 0) {
    console.log("No chunks found to ingest.");
    return;
  }

  console.log(`Generating embeddings for ${allChunks.length} chunks using OpenAI...`);
  const openai = getOpenAIClient();
  
  const batchSize = 100;
  const embeddedChunks: EmbeddedChunk[] = [];

  for (let i = 0; i < allChunks.length; i += batchSize) {
    const batch = allChunks.slice(i, i + batchSize);
    console.log(`Embedding batch ${Math.floor(i / batchSize) + 1}...`);
    
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: batch.map((c) => c.content),
    });

    for (let j = 0; j < batch.length; j++) {
      embeddedChunks.push({
        ...batch[j],
        embedding: response.data[j].embedding,
      });
    }
  }

  // Ensure target folder exists
  await fs.mkdir(chromaDir, { recursive: true });
  
  // Write to vector_store.json
  await fs.writeFile(vectorStorePath, JSON.stringify(embeddedChunks, null, 2), "utf-8");
  console.log(`Successfully stored ${embeddedChunks.length} embedded chunks to ${vectorStorePath}`);
}
