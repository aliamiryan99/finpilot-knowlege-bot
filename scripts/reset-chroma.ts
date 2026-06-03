import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

import fs from "fs/promises";
import path from "path";

async function main() {
  console.log("Resetting local vector store...");
  const vectorStorePath = path.join(process.cwd(), "chroma", "vector_store.json");
  try {
    await fs.unlink(vectorStorePath);
    console.log("Vector store reset successfully.");
  } catch (error: any) {
    if (error.code === "ENOENT") {
      console.log("Vector store does not exist, nothing to reset.");
    } else {
      console.error("Failed to reset vector store:", error);
      process.exit(1);
    }
  }
}

void main();
