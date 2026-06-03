import { retrieveRelevantChunks } from "./retrieval";
import { getOpenAIClient } from "./openai";

async function condenseQuestion(
  question: string,
  history: { role: "user" | "assistant"; content: string }[]
): Promise<string> {
  if (history.length === 0) {
    return question;
  }

  try {
    const openai = getOpenAIClient();
    const modelName = process.env.OPENAI_MODEL || "gpt-4o-mini";

    const formattedHistory = history
      .map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
      .join("\n");

    const systemPrompt = `You are an AI assistant. Given a conversation history and a follow-up question, your task is to rewrite the follow-up question into a standalone, fully self-contained question that captures all necessary context from the history.
If the follow-up question does not need any context from the history and is already self-contained, return it EXACTLY as is.
Do not answer the question; only return the rewritten standalone question.

Conversation History:
${formattedHistory}`;

    const response = await openai.chat.completions.create({
      model: modelName,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Follow-up Question: ${question}` },
      ],
      temperature: 0.0,
    });

    return response.choices[0].message.content?.trim() || question;
  } catch (error) {
    console.error("Failed to condense question:", error);
    return question;
  }
}

export async function runKnowledgeGraph(
  question: string,
  history: { role: "user" | "assistant"; content: string }[] = []
) {
  // 1. Condense the question based on the history
  const condensedQuestion = await condenseQuestion(question, history);

  // 2. Retrieve document chunks using the condensed question
  const sources = await retrieveRelevantChunks(condensedQuestion);
  
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
    
    // Assemble the messages queue including system context, preceding history, and current question
    const completionMessages: any[] = [
      { role: "system", content: systemPrompt }
    ];

    // Add history messages
    history.forEach((msg) => {
      completionMessages.push({ role: msg.role, content: msg.content });
    });

    // Add current user question
    completionMessages.push({ role: "user", content: question });

    const response = await openai.chat.completions.create({
      model: modelName,
      messages: completionMessages,
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
