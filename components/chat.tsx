"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useMemo, useState, useEffect } from "react";

import { EXAMPLE_QUESTIONS } from "@/lib/prompts";
import type { ChatResponse, Source } from "@/lib/types";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
  sources?: Source[];
  warnings?: string[];
};

type ChatSession = {
  id: string;
  title: string;
  detail: string;
  meta: string;
  tone: "emerald" | "amber" | "slate";
  messages: ChatMessage[];
};

const INITIAL_RESPONSE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "FinPilot is ready to review internal knowledge. Ask about policies, compliance guidance, product notes, or support expectations and I will return a grounded answer with references.",
  warnings: [],
  sources: [],
};

const SUGGESTED_METRICS = [
  { label: "Grounding", value: "Source-first" },
  { label: "Domain", value: "Finance ops" },
  { label: "Mode", value: "Internal QA" },
];

function makeMessageId(role: ChatMessage["role"]) {
  return `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function toneClasses(tone: ChatSession["tone"]) {
  if (tone === "emerald") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (tone === "amber") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  return "border-slate-200 bg-slate-50 text-slate-500";
}

export function Chat() {
  const [question, setQuestion] = useState("");
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load chat sessions from localStorage on client mount
  useEffect(() => {
    const saved = localStorage.getItem("finpilot_chat_sessions");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as ChatSession[];
        setSessions(parsed);
        if (parsed.length > 0) {
          setActiveSessionId(parsed[0].id);
        }
      } catch (e) {
        console.error("Failed to parse chat sessions from localStorage", e);
      }
    }
  }, []);

  const activeSession = useMemo(() => {
    return sessions.find((s) => s.id === activeSessionId) || null;
  }, [sessions, activeSessionId]);

  const messages = useMemo(() => {
    return activeSession ? activeSession.messages : [INITIAL_RESPONSE];
  }, [activeSession]);

  const latestAssistantMessage = useMemo(
    () => [...messages].reverse().find((message) => message.role === "assistant"),
    [messages],
  );

  async function handleSubmit(submittedQuestion?: string) {
    const nextQuestion = (submittedQuestion ?? question).trim();

    if (!nextQuestion || isLoading) {
      return;
    }

    const userMessage: ChatMessage = {
      id: makeMessageId("user"),
      role: "user",
      content: nextQuestion,
    };

    let currentSessionId = activeSessionId;
    let updatedSessions = [...sessions];

    if (!currentSessionId) {
      // Create new session
      currentSessionId = `session-${Date.now()}`;
      
      const tones: ChatSession["tone"][] = ["emerald", "amber", "slate"];
      const tone = tones[sessions.length % tones.length];

      const newSession: ChatSession = {
        id: currentSessionId,
        title: nextQuestion.length > 35 ? nextQuestion.slice(0, 35) + "..." : nextQuestion,
        detail: "Starting conversation...",
        meta: "Today",
        tone,
        messages: [userMessage],
      };
      
      updatedSessions = [newSession, ...updatedSessions];
      setSessions(updatedSessions);
      setActiveSessionId(currentSessionId);
    } else {
      // Append user message to active session
      updatedSessions = sessions.map((s) => {
        if (s.id === currentSessionId) {
          return {
            ...s,
            messages: [...s.messages, userMessage],
          };
        }
        return s;
      });
      setSessions(updatedSessions);
    }

    localStorage.setItem("finpilot_chat_sessions", JSON.stringify(updatedSessions));
    setQuestion("");
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
      const assistantMessage: ChatMessage = {
        id: makeMessageId("assistant"),
        role: "assistant",
        content: payload.answer,
        sources: payload.sources,
        warnings: payload.warnings,
      };

      const finalSessions = updatedSessions.map((s) => {
        if (s.id === currentSessionId) {
          const detail =
            payload.answer.length > 60
              ? payload.answer.slice(0, 60) + "..."
              : payload.answer;
          return {
            ...s,
            detail,
            messages: [...s.messages, assistantMessage],
          };
        }
        return s;
      });

      setSessions(finalSessions);
      localStorage.setItem("finpilot_chat_sessions", JSON.stringify(finalSessions));
    } catch {
      const errorMessage: ChatMessage = {
        id: makeMessageId("assistant"),
        role: "assistant",
        content: "The chat server could not be reached.",
        sources: [],
        warnings: ["Check that the local Next.js server is running."],
      };

      const finalSessions = updatedSessions.map((s) => {
        if (s.id === currentSessionId) {
          return {
            ...s,
            messages: [...s.messages, errorMessage],
          };
        }
        return s;
      });

      setSessions(finalSessions);
      localStorage.setItem("finpilot_chat_sessions", JSON.stringify(finalSessions));
    } finally {
      setIsLoading(false);
    }
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void handleSubmit();
  }

  function handleNewChat() {
    setActiveSessionId(null);
  }

  function handleDeleteSession(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    const updated = sessions.filter((s) => s.id !== id);
    setSessions(updated);
    localStorage.setItem("finpilot_chat_sessions", JSON.stringify(updated));
    if (activeSessionId === id) {
      if (updated.length > 0) {
        setActiveSessionId(updated[0].id);
      } else {
        setActiveSessionId(null);
      }
    }
  }

  return (
    <section className="mx-auto grid min-h-[calc(100vh-1.5rem)] w-full min-w-0 max-w-[1500px] grid-cols-1 overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/80 shadow-[0_30px_100px_rgba(15,23,42,0.14)] backdrop-blur xl:min-h-[calc(100vh-2.5rem)] xl:grid-cols-[320px_minmax(0,1fr)]">
      <aside className="min-w-0 max-w-[calc(100vw-1.5rem)] overflow-hidden border-b border-slate-200/80 bg-slate-950 px-4 py-4 text-white sm:max-w-[calc(100vw-2.5rem)] sm:px-5 xl:max-w-none xl:border-b-0 xl:border-r">
        <div className="flex h-full flex-col gap-5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase text-emerald-300">
                FinPilot
              </p>
              <h1 className="truncate text-lg font-semibold text-white">
                Knowledge Bot
              </h1>
            </div>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-emerald-300/30 bg-emerald-300/10 text-sm font-semibold text-emerald-200">
              FP
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 min-[520px]:grid-cols-[repeat(3,minmax(0,1fr))]">
            {SUGGESTED_METRICS.map((metric) => (
              <div
                key={metric.label}
                className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.06] p-3"
              >
                <p className="text-[0.68rem] font-medium uppercase text-slate-400">
                  {metric.label}
                </p>
                <p className="mt-1 truncate text-xs font-semibold text-slate-100">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-3">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-slate-100">History</h2>
              <button
                type="button"
                onClick={handleNewChat}
                className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-500/20 active:scale-95 cursor-pointer"
              >
                + New Chat
              </button>
            </div>

            <div className="flex w-full min-w-0 gap-3 overflow-x-auto pb-1 xl:grid xl:overflow-visible xl:pb-0">
              {sessions.length === 0 ? (
                <p className="text-xs text-slate-400 py-3">No chat history yet.</p>
              ) : (
                sessions.map((item, index) => (
                  <motion.article
                    key={item.id}
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.35 }}
                    onClick={() => setActiveSessionId(item.id)}
                    className={`min-w-[16rem] cursor-pointer rounded-2xl border p-4 transition xl:min-w-0 relative group ${
                      item.id === activeSessionId
                        ? "border-emerald-300/40 bg-white/[0.12] hover:bg-white/[0.14]"
                        : "border-white/10 bg-white/[0.06] hover:border-emerald-300/30 hover:bg-white/[0.09]"
                    }`}
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold ${toneClasses(
                          item.tone,
                        )}`}
                      >
                        {item.meta}
                      </span>
                      <div className="flex items-center gap-2">
                        {item.id === activeSessionId && (
                          <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.8)]" />
                        )}
                        <button
                          type="button"
                          onClick={(e) => handleDeleteSession(item.id, e)}
                          title="Delete Chat"
                          className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-400 p-0.5 rounded transition active:scale-90 cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <h3 className="line-clamp-1 text-sm font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">
                      {item.detail}
                    </p>
                  </motion.article>
                ))
              )}
            </div>
          </div>

          <div className="mt-auto hidden rounded-2xl border border-amber-300/20 bg-amber-200/10 p-4 xl:block">
            <p className="text-xs font-semibold uppercase text-amber-200">
              Workspace scope
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              UI-only shell. Retrieval, memory, and persisted conversation
              history remain outside this iteration.
            </p>
          </div>
        </div>
      </aside>

      <div className="grid min-h-0 min-w-0 max-w-[calc(100vw-1.5rem)] grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden bg-[linear-gradient(135deg,#f8fafc_0%,#eef6f3_46%,#f8fafc_100%)] sm:max-w-[calc(100vw-2.5rem)] xl:max-w-none">
        <header className="border-b border-slate-200/80 bg-white/75 px-4 py-4 backdrop-blur sm:px-6">
          <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0 max-w-full">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Finance knowledge assistant
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500">
                  Sources enabled
                </span>
              </div>
              <h2 className="max-w-full text-xl font-semibold leading-tight text-slate-950 sm:text-3xl">
                Ask FinPilot internal knowledge
              </h2>
              <p className="mt-1 max-w-full text-sm leading-6 text-slate-600 lg:max-w-2xl">
                Review company documents, support expectations, product notes,
                and compliance guidance from one focused chat stream.
              </p>
            </div>

            <div className="grid w-full min-w-0 grid-cols-1 gap-2 text-center min-[520px]:grid-cols-[repeat(3,minmax(0,1fr))] sm:min-w-80">
              <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-3">
                <p className="text-xs text-slate-500">Status</p>
                <p className="mt-1 text-sm font-semibold text-emerald-700">Ready</p>
              </div>
              <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-3">
                <p className="text-xs text-slate-500">Corpus</p>
                <p className="mt-1 text-sm font-semibold text-slate-950">Docs</p>
              </div>
              <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-3">
                <p className="text-xs text-slate-500">Risk</p>
                <p className="mt-1 text-sm font-semibold text-amber-700">Guarded</p>
              </div>
            </div>
          </div>
        </header>

        <div className="min-h-0 overflow-y-auto px-4 py-5 sm:px-6">
          <div className="mx-auto grid max-w-5xl gap-5">
            <div className="grid gap-3 rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm sm:p-5">
              <p className="text-xs font-semibold uppercase text-slate-500">
                Suggested prompts
              </p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_QUESTIONS.map((example) => (
                  <motion.button
                    key={example}
                    type="button"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => void handleSubmit(example)}
                    disabled={isLoading}
                    className="w-full max-w-full whitespace-normal break-words rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-left text-xs font-medium text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:rounded-full"
                  >
                    {example}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <motion.article
                    key={message.id}
                    initial={{ opacity: 0, y: 14, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`grid max-w-[860px] gap-3 rounded-3xl border p-4 shadow-sm sm:p-5 ${
                        message.role === "user"
                          ? "border-slate-900 bg-slate-950 text-white"
                          : "border-slate-200 bg-white text-slate-950"
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-2.5 w-2.5 rounded-full ${
                              message.role === "user"
                                ? "bg-amber-300"
                                : "bg-emerald-400"
                            }`}
                          />
                          <span
                            className={`text-xs font-semibold uppercase ${
                              message.role === "user"
                                ? "text-slate-300"
                                : "text-slate-500"
                            }`}
                          >
                            {message.role === "user" ? "Analyst" : "FinPilot"}
                          </span>
                        </div>
                        {message.role === "assistant" ? (
                          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                            Grounded answer
                          </span>
                        ) : null}
                      </div>

                      <p
                        className={`whitespace-pre-wrap text-sm leading-7 ${
                          message.role === "user"
                            ? "text-slate-100"
                            : "text-slate-700"
                        }`}
                      >
                        {message.content}
                      </p>

                      {message.warnings?.length ? (
                        <div className="grid gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                          {message.warnings.map((warning) => (
                            <p key={warning}>{warning}</p>
                          ))}
                        </div>
                      ) : null}

                      {message.role === "assistant" ? (
                        <SourcePanel sources={message.sources ?? []} />
                      ) : null}
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>

              {isLoading ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-600 shadow-sm">
                    <span>Analyzing internal knowledge</span>
                    <span className="flex gap-1">
                      {[0, 1, 2].map((dot) => (
                        <motion.span
                          key={dot}
                          animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
                          transition={{
                            duration: 0.9,
                            repeat: Infinity,
                            delay: dot * 0.12,
                          }}
                          className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                        />
                      ))}
                    </span>
                  </div>
                </motion.div>
              ) : null}
            </div>
          </div>
        </div>

        <footer className="border-t border-slate-200/80 bg-white/80 px-4 py-4 backdrop-blur sm:px-6">
          <form
            className="mx-auto grid max-w-5xl gap-3"
            onSubmit={handleFormSubmit}
          >
            <label className="sr-only" htmlFor="question">
              Ask a question
            </label>
            <div className="flex min-w-0 flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-2 shadow-sm sm:flex-row sm:items-end">
              <textarea
                id="question"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Ask about compliance rules, support response times, product capabilities, or internal policies..."
                rows={1}
                className="min-h-14 min-w-0 flex-1 resize-none rounded-2xl border border-transparent bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white"
              />
              <motion.button
                type="submit"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading || !question.trim()}
                className="min-h-14 rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
              >
                {isLoading ? "Thinking" : "Send"}
              </motion.button>
            </div>
            <p className="text-xs text-slate-500">
              Conversation history is saved locally in this browser.
            </p>
          </form>
        </footer>
      </div>
    </section>
  );
}

function SourcePanel({ sources }: { sources: Source[] }) {
  if (sources.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 p-3 text-sm text-slate-500">
        Source cards will appear here when retrieval returns document matches.
      </div>
    );
  }

  return (
    <div className="grid gap-2">
      <p className="text-xs font-semibold uppercase text-slate-500">Sources</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {sources.map((source) => (
          <article
            key={`${source.source}-${source.preview}`}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-3"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="min-w-0 truncate text-sm font-semibold text-slate-900">
                {source.source}
              </h3>
              {typeof source.score === "number" ? (
                <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                  {source.score.toFixed(2)}
                </span>
              ) : null}
            </div>
            <p className="mt-2 line-clamp-3 text-xs leading-5 text-slate-600">
              {source.preview}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
