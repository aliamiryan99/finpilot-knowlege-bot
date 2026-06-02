export type Source = {
  source: string;
  preview: string;
  score?: number;
};

export type ChatResponse = {
  answer: string;
  sources: Source[];
  warnings: string[];
};

export type ChatRequest = {
  question: string;
};

export type DocumentChunk = {
  id: string;
  content: string;
  source: string;
  chunkIndex: number;
};
