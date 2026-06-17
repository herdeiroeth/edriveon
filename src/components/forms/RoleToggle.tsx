"use client";

import { useState } from "react";

// Toggle LOCATÁRIO/LOCADOR que grava em um input hidden `role`.
export function RoleToggle({ initial = "LOCATARIO" }: { initial?: string }) {
  const [role, setRole] = useState(initial === "LOCADOR" ? "LOCADOR" : "LOCATARIO");

  const opt = (value: string, label: string) => {
    const active = role === value;
    return (
      <button
        type="button"
        onClick={() => setRole(value)}
        aria-pressed={active}
        className={`h-10 rounded-full px-5 text-sm font-medium transition-colors ${
          active ? "bg-ink text-bone" : "text-ink/60 hover:text-ink"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div>
      <p className="label-mono mb-2 text-ink/60">Sou</p>
      <input type="hidden" name="role" value={role} />
      <div className="inline-flex gap-1 rounded-full border border-ink/15 p-1">
        {opt("LOCATARIO", "Locatário")}
        {opt("LOCADOR", "Locador")}
      </div>
    </div>
  );
}
