import type { ReactNode } from "react";

type Tone = "volt" | "teal" | "cyan" | "muted" | "ink";

const tones: Record<Tone, string> = {
  volt: "bg-volt/20 text-ink ring-1 ring-volt/40",
  teal: "bg-teal/15 text-teal ring-1 ring-teal/30",
  cyan: "bg-cyan/15 text-cyan ring-1 ring-cyan/30",
  muted: "bg-ink/5 text-ink/60 ring-1 ring-ink/10",
  ink: "bg-ink text-bone",
};

export function Badge({ tone = "muted", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={`label-mono inline-flex items-center rounded-full px-2.5 py-1 ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
