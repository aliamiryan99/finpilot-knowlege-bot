import type { DocumentChunk } from "./types";

export function chunkDocument(source: string, content: string): DocumentChunk[] {
  return [
    {
      id: `${source}-0`,
      content,
      source,
      chunkIndex: 0,
    },
  ];
}
