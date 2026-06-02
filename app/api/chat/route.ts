import type { ChatRequest, ChatResponse } from "@/lib/types";

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<ChatRequest>;
  const question = body.question?.trim();

  const response: ChatResponse = {
    answer: question
      ? `Scaffold ready. Wire this route to the retrieval graph to answer: "${question}".`
      : "Scaffold ready. Send a question in the request body to test the route.",
    sources: [],
    warnings: ["The chat route is currently a placeholder scaffold."],
  };

  return Response.json(response);
}
