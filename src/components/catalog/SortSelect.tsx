"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SORT_OPTIONS } from "@/lib/constants";

export function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const onChange = (value: string) => {
    const params = new URLSearchParams(sp.toString());
    if (value && value !== "relevancia") params.set("ordenar", value);
    else params.delete("ordenar");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-2">
      <span className="label-mono text-ink/45">Ordenar</span>
      <select
        value={sp.get("ordenar") ?? "relevancia"}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-full border border-ink/15 bg-bone px-4 py-2 text-sm focus:border-teal focus:outline-none"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
