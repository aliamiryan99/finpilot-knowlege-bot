# AGENT_CONTEXT.md

## 1. Project Overview & Goal
**FinPilot Knowledge Bot** is a lightweight, inspectable Retrieval-Augmented Generation (RAG) assistant built for a fictional financial analytics firm, **FinPilot Analytics**. It allows internal users to ask questions regarding compliance, product features, support policies, company overview, and leave structures, returning grounded answers with source citations.

---

## 2. Core Tech Stack
- **Frontend Framework:** Next.js 16 (App Router), React 19, TypeScript.
- **Styling:** Vanilla CSS & TailwindCSS (built on PostCSS).
- **Animation:** Framer Motion (for smooth height, opacity, and scale layout animations).
- **LLM / Embeddings API:** OpenAI API (`text-embedding-3-small` for embeddings, completions via model configured in `.env`).
- **Vector DB / Storage:** Simple, zero-dependency, local file-based JSON vector store (`chroma/vector_store.json`) representing calculated vector embeddings.

---

## 3. RAG Pipeline & Architecture

### Ingestion Flow (`lib/chunk.ts`, `lib/ingest.ts`, `scripts/ingest-docs.ts`)
1. Reads local markdown files from the `/docs` directory.
2. Splits documents into structured chunks using document headings to compile a breadcrumb path (e.g., `Context: Overview > Section 1`).
3. Fetches vector embeddings for each chunk using the `text-embedding-3-small` OpenAI model.
4. Persists the embeddings, chunk metadata, and source names into `chroma/vector_store.json`.

### Query Flow (`lib/graph.ts`, `app/api/chat/route.ts`)
1. **POST Request:** Client POSTs the user's question along with the last 10 messages of conversation history to `/api/chat`.
2. **Query Condensing (Query Rewriting):** If history is present, the API uses the LLM to rewrite the user's question into a standalone, self-contained question that incorporates previous context.
3. **Retrieval (`lib/retrieval.ts`):** Fetches the embedding of the condensed question, calculates cosine similarity (dot product) against the local JSON vector store, and returns the top 15 matches.
4. **Contextual Completion:** Compiles the messages list by feeding the system prompt (containing RAG context, formatting instructions, and rules), followed by the historical chat messages, and finally the user's latest question.
5. **Answer Grounding & Guardrails:** If the retrieved documents do not contain the answer, the LLM returns `[NOT_FOUND]`, which the API maps to a clean uncertainty refusal message.

---

## 4. Key Features Implemented

### Collapsible Chat Blocks
- **Message Accordion:** Individual Analyst and FinPilot message cards can be collapsed or expanded dynamically. When collapsed, the padding reduces, and a truncated one-line text preview is shown in the header.
- **Sources Accordion:** Reference sources panel can be toggled collapsed/expanded independently, showing the citation count.
- **Animations:** Fully animated height and opacity transitions using Framer Motion.

### Viewport-Centered Source Preview Modal
- **Interactive Cards:** Hovering over a source card highlights it and shows an expand icon.
- **React Portal Overlay:** Clicking a source card opens an overlay modal rendered directly inside `document.body` via a React Portal, guaranteeing perfect viewport centering and resolving backdrop layout offsets.
- **Context Breadcrumbs:** The modal extracts and highlights the hierarchical headings path of the source block at the top.
- **UX Qualities:** Standard keyboard listener (`Escape` key to close), click outside backdrop to close, and body scroll-locking are supported.

### Short-Term Memory
- **Stateless History:** Conversation history is persisted on the client side (`localStorage`) and sent to `/api/chat` only when active.
- **Self-Contained Retrieval:** Pronouns (like *"it"*, *"they"*, *"that policy"*) are resolved during query condensing to ensure semantic retrieval doesn't degrade on follow-up questions.

### Markdown Formatting
- **Bold Parser:** A custom, regex-based bold markdown formatter renders `**text**` correctly inside chat bubbles and the source preview modal, resolving raw asterisks without external heavy markdown libraries.

---

## 5. Directory Structure & Key Files
- `docs/` - Markdown files representing the knowledge base.
- `app/api/chat/route.ts` - Chat endpoint routing that forwards client payloads to the graph engine.
- `components/chat.tsx` - Core chat page component, state managers, collapsability layout, and portal modal.
- `lib/types.ts` - Shared typescript definitions.
- `lib/graph.ts` - Contains query condensing logic, completions assembly, and system prompts.
- `lib/retrieval.ts` - Cosine similarity calculation and JSON vector database lookup.
- `lib/chunk.ts` - Markdown splitting and context path compilation.
- `lib/ingest.ts` - Script interface to calculate embeddings and populate vector store.

---

## 6. Future Roadmap & Potential Tasks
- **Reranking:** Implement a secondary lightweight scoring or LLM reranking step on retrieved chunks to improve RAG precision.
- **Data Enrichment**: enrich the data in the existing docs. Consider using AI to help generate this data based on the existing markdown files.
- **Knowledge Graph**: Build a knowledge graph to represent the relationships between concepts in the knowledge base. This can be used to improve the RAG precision.
- **Admin Document Upload UI:** Build a frontend page to upload new markdown documents, parse them on-the-fly, calculate embeddings, and append them directly to the JSON store.
- **LangSmith Tracing:** Add tracing capabilities to monitor latency and outputs for both the query condensation step and the final response generation.
- **Streaming Responses:** Add server-sent events (SSE) support to stream responses token-by-token.
- **Database Integration:** Switch to docker-hosted Chroma or another scalable vector store if indexing larger document directories.
- **Email Integration:** Implement a system to automatically answer emails based on the knowledge base. The system should be able to read emails, understand the content, and generate a response based on the knowledge base. 
- **Authentication**: Implement a secure authentication system to restrict access to the chatbot. It should be using the company's authentication system.
