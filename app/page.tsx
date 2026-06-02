import { Chat } from "@/components/chat";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 py-10 lg:px-10">
      <section className="grid gap-4">
        <span className="w-fit rounded-full border border-slate-300/80 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
          FinPilot Knowledge Bot
        </span>
        <div className="grid gap-3">
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Internal knowledge retrieval scaffold for FinPilot Analytics
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            This repository now includes the requested app, component, lib,
            docs, scripts, and agent workspace structure for a small RAG
            assistant.
          </p>
        </div>
      </section>

      <Chat />
    </main>
  );
}
