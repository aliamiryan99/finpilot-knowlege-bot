type ExampleQuestionsProps = {
  examples: string[];
  onSelect: (question: string) => void;
};

export function ExampleQuestions({
  examples,
  onSelect,
}: ExampleQuestionsProps) {
  return (
    <div className="grid gap-3">
      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
        Example questions
      </h3>
      <div className="flex flex-wrap gap-3">
        {examples.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => onSelect(example)}
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 transition hover:border-sky-500 hover:text-sky-700"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
}
