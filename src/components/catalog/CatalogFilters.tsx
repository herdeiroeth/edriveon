"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { X } from "lucide-react";

import { VEHICLE_TYPES, CATEGORIES, CITIES, VEHICLE_TYPE_LABEL, CATEGORY_LABEL } from "@/lib/constants";

export function CatalogFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const get = (k: string) => sp.get(k) ?? "";

  const setParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(sp.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, sp],
  );

  // Toggle: clicar no já-selecionado limpa o filtro.
  const toggle = (key: string, value: string) => setParam(key, get(key) === value ? "" : value);

  const hasFilters = ["tipo", "categoria", "cidade", "diariaMax", "autonomiaMin", "q"].some((k) =>
    sp.get(k),
  );

  const chip = (active: boolean) =>
    `rounded-full px-3.5 py-1.5 text-sm transition-colors ${
      active ? "bg-ink text-bone" : "border border-ink/15 text-ink/70 hover:border-ink/40"
    }`;

  return (
    <aside className="flex flex-col gap-7">
      <div>
        <p className="label-mono mb-2 text-ink/50">Busca</p>
        <input
          type="search"
          defaultValue={get("q")}
          onChange={(e) => setParam("q", e.target.value)}
          placeholder="Marca, modelo, cidade…"
          className="w-full rounded-xl border border-ink/15 bg-bone px-4 py-2.5 text-sm focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30"
        />
      </div>

      <div>
        <p className="label-mono mb-2 text-ink/50">Tipo</p>
        <div className="flex flex-wrap gap-2">
          {VEHICLE_TYPES.map((t) => (
            <button key={t} onClick={() => toggle("tipo", t)} className={chip(get("tipo") === t)}>
              {VEHICLE_TYPE_LABEL[t]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="label-mono mb-2 text-ink/50">Categoria</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => toggle("categoria", c)}
              className={chip(get("categoria") === c)}
            >
              {CATEGORY_LABEL[c]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="label-mono mb-2 text-ink/50">Cidade</p>
        <select
          value={get("cidade")}
          onChange={(e) => setParam("cidade", e.target.value)}
          className="w-full rounded-xl border border-ink/15 bg-bone px-4 py-2.5 text-sm focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30"
        >
          <option value="">Todas as cidades</option>
          {CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="mb-2 flex justify-between">
          <span className="label-mono text-ink/50">Diária máxima</span>
          <span className="text-sm text-ink/70">{get("diariaMax") ? `R$ ${get("diariaMax")}` : "—"}</span>
        </div>
        <input
          type="range"
          min={100}
          max={700}
          step={10}
          defaultValue={get("diariaMax") || 700}
          onChange={(e) => setParam("diariaMax", e.target.value === "700" ? "" : e.target.value)}
          className="w-full accent-teal"
        />
      </div>

      <div>
        <div className="mb-2 flex justify-between">
          <span className="label-mono text-ink/50">Autonomia mín</span>
          <span className="text-sm text-ink/70">
            {get("autonomiaMin") ? `${get("autonomiaMin")} km` : "—"}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={600}
          step={20}
          defaultValue={get("autonomiaMin") || 0}
          onChange={(e) => setParam("autonomiaMin", e.target.value === "0" ? "" : e.target.value)}
          className="w-full accent-teal"
        />
      </div>

      {hasFilters && (
        <button
          onClick={() => router.push(pathname, { scroll: false })}
          className="inline-flex items-center gap-2 self-start text-sm text-ink/60 hover:text-ink"
        >
          <X size={14} /> Limpar filtros
        </button>
      )}
    </aside>
  );
}
