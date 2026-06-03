# TASKS.md

- [x] Intilize the Next project
- [x] Prepare the environment variables
- [x] Develop the ui components
- [x] Develop the API endpoints
- [x] Integrate the components with the API
- [x] Agent Setup 
    - [x] Set up the OpenAI client singleton in `lib/openai.ts`.
    - [x] Implement the markdown chunker in `lib/chunk.ts` to split files by heading levels and save section hierarchy.
    - [x] Build document ingestion in `lib/ingest.ts` to fetch embeddings and write to `chroma/vector_store.json`.
    - [x] Wire `ingest-docs.ts` and `reset-chroma.ts` scripts to load environment variables automatically.
    - [x] Run the ingestion script to generate local embeddings for all docs.
    - [x] Implement cosine similarity search in `lib/retrieval.ts` with `K = 15` matches.
    - [x] Write the grounding LLM system prompt and workflow in `lib/graph.ts` (handling `[NOT_FOUND]` refusals).
    - [x] Connect the api endpoint in `app/api/chat/route.ts`.
    - [x] Add localStorage chat sessions, "+ New Chat" button, title auto-generation, and deletion to `components/chat.tsx`.
    - [x] Perform final manual and browser verification to test correct grounding, out-of-scope query refusal, and sidebar controls.

