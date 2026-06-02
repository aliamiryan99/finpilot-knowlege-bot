"use client";

import { useState } from "react";

import { EXAMPLE_QUESTIONS } from "@/lib/prompts";
import type { ChatResponse, Source } from "@/lib/types";

import { ExampleQuestions } from "./example-questions";
import { Message } from "./message";
import { SourceCard } from "./source-card";

const INITIAL_RESPONSE: ChatResponse = {
  answer:
    "The scaffold is in place. Ask a question to exercise the placeholder `/api/chat` route.",
  sources: [],
  warnings: ["No retrieval pipeline is connected yet."],
};

export function Chat() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<ChatResponse>(INITIAL_RESPONSE);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(submittedQuestion?: string) {
    const nextQuestion = (submittedQuestion ?? question).trim();

    if (!nextQuestion) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: nextQuestion }),
      });

      const payload = (await result.json()) as ChatResponse;
      setResponse(payload);
      setQuestion(nextQuestion);
    } catch {
      setResponse({
        answer: "The placeholder chat route could not be reached.",
        sources: [],
        warnings: ["Check that the local Next.js server is running."],
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="grid gap-6 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.10)] backdrop-blur">
      <div className="grid gap-2">
        <h2 className="text-2xl font-semibold text-slate-950">Chat UI scaffold</h2>
        <p className="text-sm leading-6 text-slate-600">
          This is a thin placeholder UI that exercises the new repository
          structure without assuming the final RAG implementation.
        </p>
      </div>

      <ExampleQuestions
        examples={EXAMPLE_QUESTIONS}
        onSelect={(example) => {
          setQuestion(example);
          void handleSubmit(example);
        }}
      />

      <form
        className="grid gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit();
        }}
      >
        <label className="text-sm font-medium text-slate-700" htmlFor="question">
          Ask a question
        </label>
        <div className="flex flex-col gap-3 md:flex-row">
          <input
            id="question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="What does the support policy say about response times?"
            className="min-h-12 flex-1 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-sky-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="min-h-12 rounded-2xl bg-slate-950 px-5 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isLoading ? "Thinking..." : "Send"}
          </button>
        </div>
      </form>

      <div className="grid gap-4 lg:grid-cols-[1.7fr_1fr]">
        <Message role="assistant" content={response.answer} warnings={response.warnings} />
        <div className="grid gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Sources
          </h3>
          {response.sources.length > 0 ? (
            response.sources.map((source: Source) => (
              <SourceCard key={`${source.source}-${source.preview}`} source={source} />
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-4 text-sm text-slate-500">
              No retrieved sources yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
