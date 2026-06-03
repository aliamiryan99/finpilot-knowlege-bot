import type { ChatRequest, ChatResponse } from "@/lib/types";
import { runKnowledgeGraph } from "@/lib/graph";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ChatRequest>;
    const question = body.question?.trim();
    const history = body.history || [];

    if (!question) {
      return Response.json(
        {
          answer: "No question provided.",
          sources: [],
          warnings: ["Empty question received."],
        } as ChatResponse,
        { status: 400 }
      );
    }

    const response = await runKnowledgeGraph(question, history);
    return Response.json(response);
  } catch (error: any) {
    console.error("API error in chat route:", error);
    return Response.json(
      {
        answer: "An error occurred on the server.",
        sources: [],
        warnings: [error.message || "Internal Server Error"],
      } as ChatResponse,
      { status: 500 }
    );
  }
}
