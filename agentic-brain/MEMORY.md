# Major Decisions

- I decided to use this main stack for the project at first: Next.js for the front-end, LangChain for the orchestration, Pinecone for the vector database, and OpenAI for the LLM.

- I changed the vector database from Pinecone to Chroma to reduce setup complexity.

- For the UI, I decided to use Tailwind CSS, shadcn/ui and framer-motion.

- I decided not to run a Chroma server or Docker container because it was adding too much setup friction. Instead, I saved the vector embeddings in a simple JSON file under the `chroma` folder and queried it with custom TypeScript dot-product code.

- I chose to write simple TypeScript functions for the retrieval, answer generation, and grounding validation, rather than installing the full LangGraph JS library, which kept the project fast and lightweight.

- I chose to handle the chat session history entirely on the client side using the browser's local storage. This avoided having to build a database server or custom writing API.


# Mistakes

- I set the retrieval count `K` to 4 at first. This was a mistake because the support policy SLA response targets were listed under individual priority sections (like Priority 1), which didn't rank high enough in the similarity search. As a result, the chatbot couldn't find the numbers and refused to answer.

- My grounding system prompt was too strict. When the user asked generic questions with terms like "current support response target", the LLM would output `[NOT_FOUND]` because the document had multiple conditional rates (for different tiers and priorities) and no single "current" target, so it refused to answer.


# Corrections

- I increased the retrieval count `K` to 15 in `lib/retrieval.ts`. Since the internal company documents are very small, pulling 15 chunks (~3000 words) guarantees we catch all details without overloading the LLM or spending too much on OpenAI credits.

- I refined the system prompt. I added an instruction that tells the LLM to explain conditional options (like tiers and priorities) if the query matches the topic, and to treat words like "current", "standard", or "our" as referring to the documents, rather than expecting a specific session state. This made the recommended UI prompts work perfectly.


# Architecture changes

## Initial Architecture
```
finpilot-knowledge-bot/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── chat.tsx
│   ├── message.tsx
│   └── source-card.tsx
│
├── lib/
│   ├── openai.ts
│   ├── pinecone.ts
│   ├── chunk.ts
│   ├── ingest.ts
│   ├── retrieval.ts
│   ├── graph.ts
│   └── prompts.ts
│
├── scripts/
│   └── ingest-docs.ts
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

## Current Architecture
```
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
│   └── vector_store.json       <-- [NEW] Local JSON Vector Database
│
├── components/
│   ├── chat.tsx                <-- [MODIFIED] Added LocalStorage state, session selector/deleter, "New Chat" button
│   ├── message.tsx
│   └── source-card.tsx
│
├── lib/
│   ├── chroma.ts               <-- [MODIFIED] Changed from pinecone.ts
│   ├── openai.ts               <-- [MODIFIED] Wired OpenAI client singleton
│   ├── chunk.ts                <-- [MODIFIED] Header-based markdown parser
│   ├── ingest.ts               <-- [MODIFIED] Document embedding script
│   ├── retrieval.ts            <-- [MODIFIED] Cosine similarity search (K=15)
│   ├── graph.ts                <-- [MODIFIED] System prompt grounding workflow
│   └── prompts.ts
│
├── scripts/
│   ├── ingest-docs.ts          <-- [MODIFIED] Programmatically loads env variables and executes ingestion
│   └── reset-chroma.ts         <-- [MODIFIED] Clears vector_store.json
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
│   ├── MEMORY.md               <-- [MODIFIED] Logged design decisions and notes
│   ├── TASKS.md                <-- [MODIFIED] Logged task status
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

- I had to manually configure the project to use browser LocalStorage for chat sessions and write custom local JSON file embedding matching because Docker and Chroma were not running on port 8000.
- I chose to use custom TypeScript RAG functions in `lib/graph.ts` instead of installing LangGraph JS.
- I selected markdown header-based splitting to make sure headings are carried in each chunk's context.
- I implemented grounding inside the system prompt instead of a two-step LLM validator.


# AI-generated output that you manually fixed

- I ran a test retrieval script inside the temporary AppData directory (`C:\Users\Ali\...`), but it failed to import `@next/env` and `openai` because it was outside the project's folder. I fixed this by copying the debug script into the project's `scripts/` folder so it could resolve the local node modules.


# Future improvements

- I want to add streaming responses to make the chat feel much faster.
- I want to add a cross-encoder reranking step to increase accuracy on semantic boundary questions before querying the LLM.
- I want to set up an automated file watcher that runs document ingestion automatically whenever markdown files in the `/docs` folder are updated.
- I want to build a file upload UI so users can upload new documents directly from the browser chat interface.