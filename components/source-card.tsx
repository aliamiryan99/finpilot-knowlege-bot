import type { Source } from "@/lib/types";

type SourceCardProps = {
  source: Source;
};

export function SourceCard({ source }: SourceCardProps) {
  return (
    <article className="grid gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-sm font-semibold text-slate-900">{source.source}</h4>
        {typeof source.score === "number" ? (
          <span className="text-xs font-medium text-slate-500">
            {source.score.toFixed(2)}
          </span>
        ) : null}
      </div>
      <p className="text-sm leading-6 text-slate-600">{source.preview}</p>
    </article>
  );
}
