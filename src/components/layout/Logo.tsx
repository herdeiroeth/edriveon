import Link from "next/link";
import { Zap } from "lucide-react";

export function Logo({ tone = "ink" }: { tone?: "ink" | "bone" }) {
  const text = tone === "bone" ? "text-bone" : "text-ink";
  const sub = tone === "bone" ? "text-bone/50" : "text-ink/45";
  return (
    <Link href="/" className="inline-flex items-center gap-2.5">
      <span className="flex size-8 items-center justify-center rounded-lg bg-volt text-ink">
        <Zap size={18} strokeWidth={2.5} />
      </span>
      <span className="leading-none">
        <span className={`font-display text-xl ${text}`}>E-DriveOn</span>
        <span className={`label-mono block ${sub}`}>Mediadora P2P</span>
      </span>
    </Link>
  );
}
