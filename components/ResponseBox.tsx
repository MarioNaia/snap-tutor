"use client";

type Props = {
  answer: string;
  loading: boolean;
};

function formatAnswer(text: string) {
  return text.split("\n").filter((line) => line.trim() !== "");
}

export default function ResponseBox({ answer, loading }: Props) {
  const lines = formatAnswer(answer);

  return (
    <section className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Tutor response</h2>
          <p className="mt-1 text-sm text-slate-500">
            Step-by-step explanation generated from your image and question.
          </p>
        </div>

        {loading ? (
          <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
            Analyzing...
          </span>
        ) : null}
      </div>

      <div className="min-h-[300px] flex-1 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-5">
        {answer ? (
          <div className="space-y-3 leading-7 text-slate-800">
            {lines.map((line, index) => {
              const cleaned = line.replace(/\*\*/g, "");

              const isHeading =
                cleaned.startsWith("###") ||
                cleaned.startsWith("##") ||
                cleaned.startsWith("#");

              if (isHeading) {
                return (
                  <h3
                    key={index}
                    className="pt-2 text-base font-semibold text-slate-900"
                  >
                    {cleaned.replace(/^#+\s*/, "")}
                  </h3>
                );
              }

              return (
                <p key={index} className="whitespace-pre-wrap">
                  {cleaned}
                </p>
              );
            })}
          </div>
        ) : (
          <div className="flex h-full min-h-[240px] items-center justify-center text-center text-slate-500">
            Your explanation will appear here after you ask a question.
          </div>
        )}
      </div>
    </section>
  );
}