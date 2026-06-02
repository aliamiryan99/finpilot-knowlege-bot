# PROJECT_BRIEF.md

# FinPilot Knowledge Bot — Project Brief

## 1. Project Summary

FinPilot Knowledge Bot is a mini company knowledge assistant built for a fictional financial analytics company called **FinPilot Analytics**.

The goal of the project is to demonstrate a small but realistic Retrieval-Augmented Generation system that can answer user questions based on internal company documents. The system uses a local document knowledge base, retrieves relevant context from those documents, and generates grounded answers using an LLM.

This project was built as a practical AI/RAG test to show ability in:

- RAG architecture
- Agent workflow design
- AI-assisted coding
- Git-based project management
- Context and memory management
- Evaluation-driven development
- Clear technical documentation

---

## 2. MVP Goal

The MVP is a simple web-based company knowledge bot where a user can ask questions about FinPilot Analytics and receive answers grounded in the files inside the `/docs` folder.

The bot should be able to:

1. Read company documents from `/docs`.
2. Split documents into retrievable chunks.
3. Generate embeddings for each chunk.
4. Store document chunks in Chroma.
5. Retrieve the most relevant chunks for a user question.
6. Generate an answer using OpenAI based only on retrieved context.
7. Return the answer with source references.
8. Refuse or clearly express uncertainty when the answer is not available in the documents.

---

## 3. Chosen Stack

### Frontend

- **Next.js**
- **TypeScript**
- Simple chat interface
- Source cards for retrieved documents

### Backend

- **Next.js API Route**
- Server-side RAG execution
- OpenAI API integration
- Chroma vector database integration

### LLM and Embeddings

- **OpenAI API**
- Used for:
  - Text embeddings
  - Final grounded answer generation

### Agent / Workflow Layer

- **LangGraph**
- Used to structure the RAG pipeline as an explicit workflow instead of a single hidden function.

### Vector Database

- **Chroma**
- Used as the local vector store for document chunks and metadata.
- Chosen because it is easy to run locally, simple to reproduce, and suitable for a small 2-day RAG sample project.

---

## 4. Why Chroma Was Chosen

Chroma was selected instead of Pinecone to make the sample project more self-contained and easier for reviewers to run locally.

The main reasons are:

- No external vector database account is required.
- The project can run locally with Docker.
- The ingestion process is easy to reproduce.
- It reduces setup friction for a small practical test.
- It keeps the focus on RAG quality, agent flow, evaluation, and documentation rather than cloud infrastructure.

This choice fits the scope of the assignment because the goal is to demonstrate a working knowledge bot, not to build a production-scale managed vector search system.

---

## 5. Knowledge Base

The project includes a `/docs` folder containing short internal documents for the fictional company.

Planned documents:

- `company-overview.md`
- `product-guide.md`
- `support-policy.md`
- `compliance-faq.md`
- `leave-policy.md`

These documents cover company background, products, support rules, compliance policies, and internal leave policy.

The documents are intentionally small but varied so that retrieval quality can be tested across different types of company knowledge.

---

## 6. Core User Flow

1. User opens the web app.
2. User asks a question in the chat interface.
3. The frontend sends the question to `/api/chat`.
4. The API route passes the question into the LangGraph RAG workflow.
5. The workflow embeds the question using OpenAI.
6. The workflow queries Chroma for the most relevant document chunks.
7. Retrieved chunks are formatted as context.
8. OpenAI generates a grounded answer using the retrieved context.
9. The API returns:
   - answer
   - source documents
   - retrieved previews
   - warnings if applicable

10. The frontend displays the answer and source cards.

---

## 7. RAG Workflow

The RAG workflow is intentionally simple and inspectable.

Planned LangGraph nodes:

1. **Retrieve Context**
   - Takes the user question.
   - Embeds the question.
   - Searches Chroma.
   - Returns relevant document chunks and metadata.

2. **Generate Answer**
   - Takes the retrieved chunks.
   - Uses a grounded prompt.
   - Generates an answer based only on the provided context.

3. **Validate Grounding**
   - Checks whether enough context was retrieved.
   - Ensures the response includes source references.
   - Returns an uncertainty message if the documents do not contain the answer.

This structure keeps the project easy to understand while still showing agentic workflow design.

---

## 8. Grounding Rules

The assistant must follow these rules:

- Answer only from retrieved document context.
- Do not invent company facts.
- If the answer is missing from the documents, say that the information is not available in the current knowledge base.
- Include source filenames when answering.
- Prefer concise, useful answers over long generic explanations.
- Keep compliance-related answers conservative.

---

## 9. Expected API Response Shape

The `/api/chat` route should return a response similar to:

```json
{
  "answer": "FinPilot Analytics provides financial analytics tools for client audit, risk scoring, and trading operations support.",
  "sources": [
    {
      "source": "company-overview.md",
      "preview": "FinPilot Analytics is a fictional financial analytics company...",
      "score": 0.82
    }
  ],
  "warnings": []
}
```

---

## 10. Out of Scope

The following features are intentionally not part of the MVP:

- User authentication
- Admin dashboard
- File upload UI
- Multi-tenant document storage
- Production deployment
- Role-based access control
- Advanced reranking
- Long-term chat memory
- Streaming responses

These can be added later, but they are not necessary for the current practical test.

---

## 11. Evaluation Plan

The project will be evaluated using at least five test questions documented in `agentic-brain/EVALS.md`.

Evaluation will check whether the bot can:

- Answer factual questions from the documents.
- Retrieve the correct source file.
- Avoid hallucination.
- Say “not available” when the answer is outside the documents.
- Provide useful source references.

Example evaluation categories:

- Company overview
- Product information
- Support policy
- Compliance restrictions
- Leave policy
- Out-of-scope question

---

## 12. Success Criteria

The project is successful if:

- The app runs locally.
- The ingestion script successfully indexes the `/docs` folder into Chroma.
- The user can ask questions through the web UI.
- Answers are grounded in retrieved documents.
- Source references are displayed.
- Out-of-scope questions are handled safely.
- The repository has clear Git history.
- The `agentic-brain` folder explains context, memory, tasks, and evaluations.
- README explains setup and execution clearly.

---

## 13. Future Improvements

Possible future improvements:

- Add automated evaluation script.
- Add streaming responses.
- Add reranking for better retrieval quality.
- Add document upload from the UI.
- Add conversation memory.
- Add LangSmith tracing.
- Add authentication.
- Deploy the app to Vercel.
- Add Docker Compose for Next.js and Chroma together.
- Add a finance-specific opportunity scoring workflow.
