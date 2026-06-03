# Major Decisions

- I decided to use this main stack for the project at first: Next.js for the front-end, LangChain for the orchestration, Pinecone for the vector database, and OpenAI for the LLM.

- I changed the vector database from Pinecone to Chroma to reduce setup complexity.

- For the UI, I decided to use Tailwind CSS, shadcn/ui and framer-motion.

- I decided not to run a Chroma server or Docker container because it was adding too much setup friction. Instead, I saved the vector embeddings in a simple JSON file under the `chroma` folder and queried it with custom TypeScript dot-product code.

- I chose to write simple TypeScript functions for the retrieval, answer generation, and grounding validation, rather than installing the full LangGraph JS library, which kept the project fast and lightweight.

- I chose to handle the chat session history entirely on the client side using the browser's local storage. This avoided having to build a database server or custom writing API.

- I decided to make individual message cards (Analyst and FinPilot responses) and the assistant reference Sources panels collapsible. This helps declutter the chat interface and allows a more compact view. I used Framer Motion's `AnimatePresence` and `motion.div` to animate height changes smoothly.

- I chose to implement short-term memory using a stateless history pipeline. The client passes the last 10 messages of chat history in the `/api/chat` request body. The server then uses a "Query Condensing" LLM completion node in `lib/graph.ts` to rewrite the user's latest follow-up into a standalone query. This standalone query is used for semantic search, and the history is also passed to the final answer completions step.


# Mistakes

- I set the retrieval count `K` to 4 at first. This was a mistake because the support policy SLA response targets were listed under individual priority sections (like Priority 1), which didn't rank high enough in the similarity search. As a result, the chatbot couldn't find the numbers and refused to answer.

- My grounding system prompt was too strict. When the user asked generic questions with terms like "current support response target", the LLM would output `[NOT_FOUND]` because the document had multiple conditional rates (for different tiers and priorities) and no single "current" target, so it refused to answer.

# Corrections

- I increased the retrieval count `K` to 15 in `lib/retrieval.ts`. Since the internal company documents are very small, pulling 15 chunks (~3000 words) guarantees we catch all details without overloading the LLM or spending too much on OpenAI credits.

- I refined the system prompt. I added an instruction that tells the LLM to explain conditional options (like tiers and priorities) if the query matches the topic, and to treat words like "current", "standard", or "our" as referring to the documents, rather than expecting a specific session state. This made the recommended UI prompts work perfectly.

- **[NEW] Modal Viewport Centering:** Wrapped the Source Preview Modal elements in `createPortal(..., document.body)`. Since `document.body` has no transforms or filters, the modal centers perfectly relative to the browser viewport.

- **[NEW] Portal and AnimatePresence integration:** Refactored the portal structure so the Portal wrapper is rendered persistently, and `AnimatePresence` evaluates its conditional checks inside the portal tree (e.g. `mounted && createPortal(<AnimatePresence>{activePreviewSource && ...}</AnimatePresence>, document.body)`). This solved the React tracking crash and restored smooth fade-out animations.

- **[NEW] Bold Headings Parser:** Added the `renderMarkdown` function to parse `**bold**` text and render it as `<strong>` nodes, ensuring professional layout presentation.


# Architecture changes

finpilot-knowledge-bot/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts        
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── chroma/
│   └── vector_store.json
│
├── components/
│   ├── chat.tsx                
│   ├── message.tsx
│   └── source-card.tsx
│
├── lib/
│   ├── chroma.ts
│   ├── openai.ts
│   ├── chunk.ts
│   ├── ingest.ts
│   ├── retrieval.ts
│   ├── graph.ts                
│   └── prompts.ts
│
├── scripts/
│   ├── ingest-docs.ts
│   └── reset-chroma.ts
│
├── docs/
│   ├── company-overview.md
│   ├── product-guide.md
│   ├── support-policy.md
│   ├── compliance-faq.md
│   └── leave-policy.md
│
├── agentic-brain/
│   ├── PROJECT_BRIEF.md
│   ├── AGENT_CONTEXT.md        
│   ├── MEMORY.md               
│   ├── TASKS.md                
│   └── EVALS.md                
│
├── public/
│   └── screenshots/
│
├── .env.example
├── README.md
├── package.json
├── tsconfig.json
└── next.config.ts
```

# Human interventions

- I implemented grounding inside the system prompt instead of a two-step LLM validator.


# AI-generated output that you manually fixed


# Future improvements

- I want to add authentication so users can have their own chat sessions.
- I want to set up a persistent session store
- I want to implement knowledge graph in memory to handle more complex queries and maintain context throughout longer conversations, to make it more like a real agent.
- I want to add a cross-encoder reranking step to increase accuracy on semantic boundary questions before querying the LLM.
- I want to set up an automated file watcher that runs document ingestion automatically whenever markdown files in the `/docs` folder are updated.
- I want to build a file upload UI so users can upload new documents directly from the browser chat interface.