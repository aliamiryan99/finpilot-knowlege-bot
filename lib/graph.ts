import { retrieveRelevantChunks } from "./retrieval";
import { getOpenAIClient } from "./openai";

export async function runKnowledgeGraph(question: string) {
  const sources = await retrieveRelevantChunks(question);
  
  if (sources.length === 0) {
    return {
      answer: "I am sorry, but I couldn't find any information about that in the internal company documents.",
      sources: [],
      warnings: ["No matching document chunks were retrieved from the knowledge base."],
    };
  }

  const contextText = sources
    .map((s, idx) => `[Source ${idx + 1}: ${s.source}]\n${s.preview}`)
    .join("\n\n");

  const systemPrompt = `You are FinPilot, a helpful internal company knowledge assistant for FinPilot Analytics.
Your task is to answer the user's question using ONLY the provided document context below.

CRITICAL RULES:
1. Base your answer strictly on the provided context. If the context does not mention the topic of the query at all, or if there is no relevant information in the context to answer it, you MUST reply with exactly "[NOT_FOUND]". Do not write anything else.
2. If the context mentions the topic but the answer depends on conditions (such as customer tier, priority levels, or product types), explain the options and details clearly using the context. Do not invent any details or use external knowledge.
3. Treat general or phrasing terms like "current", "standard", "our", or "company policy" as referring to the policies and specifications described in the context, rather than requiring a specific active customer session state.
4. You must reference the source file name (e.g. "[support-policy.md]") where relevant in your response. Do not cite sources that are not in the context.
5. Keep your answer clear, concise, and professional.

Provided Document Context:
=========================
${contextText}
=========================`;

  try {
    const openai = getOpenAIClient();
    const modelName = process.env.OPENAI_MODEL || "gpt-4o-mini";
    
    const response = await openai.chat.completions.create({
      model: modelName,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question },
      ],
      temperature: 0.0,
    });

    const answer = response.choices[0].message.content?.trim() || "";

    if (answer.includes("[NOT_FOUND]")) {
      return {
        answer: "I am sorry, but I couldn't find any information about that in the internal company documents.",
        sources: [],
        warnings: ["The requested information is not available in the internal knowledge base."],
      };
    }

    return {
      answer,
      sources,
      warnings: [],
    };
  } catch (error: any) {
    console.error("RAG completion failed:", error);
    return {
      answer: "An error occurred while generating the response.",
      sources: [],
      warnings: [`API Error: ${error.message || error}`],
    };
  }
}
