import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

import { ingestDocuments } from "../lib/ingest";

async function main() {
  console.log("Starting document ingestion...");
  try {
    await ingestDocuments();
    console.log("Ingestion finished successfully.");
  } catch (error) {
    console.error("Ingestion failed:", error);
    process.exit(1);
  }
}

void main();
