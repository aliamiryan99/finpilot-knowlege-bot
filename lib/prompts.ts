export const EXAMPLE_QUESTIONS = [
  "What does FinPilot Analytics do?",
  "Which products are described in the product guide?",
  "What is the current support response target?",
  "What does the leave policy say about annual leave?",
];

export const GROUNDED_SYSTEM_PROMPT = `
You are the FinPilot Knowledge Bot.
Answer only from retrieved company documents.
If the documents do not contain the answer, say so clearly.
Always include source references in the final response.
`.trim();
