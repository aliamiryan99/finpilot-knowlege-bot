type MessageProps = {
  role: "assistant" | "user";
  content: string;
  warnings?: string[];
};

export function Message({ role, content, warnings = [] }: MessageProps) {
  return (
    <article className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          {role}
        </span>
        <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-800">
          Placeholder response
        </span>
      </div>
      <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">{content}</p>
      {warnings.length > 0 ? (
        <div className="grid gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          {warnings.map((warning) => (
            <p key={warning}>{warning}</p>
          ))}
        </div>
      ) : null}
    </article>
  );
}
