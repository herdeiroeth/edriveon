import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Car } from "lucide-react";

import { requireLocador } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import { LinkButton } from "@/components/ui/Button";
import { FleetCard } from "@/components/fleet/FleetCard";
import { brl } from "@/lib/constants";

export const metadata: Metadata = { title: "Painel do locador · E-DriveOn" };

function Indicator({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-3xl border border-bone-200 bg-white/50 p-5">
      <p className="label-mono text-ink/45">{label}</p>
      <p className="font-display mt-1 text-4xl text-ink">{value}</p>
      <p className="mt-1 text-xs text-ink/45">{hint}</p>
    </div>
  );
}

export default async function PainelLocadorPage() {
  const user = await requireLocador();

  const vehicles = await prisma.vehicle.findMany({
    where: { ownerId: user.id },
    orderBy: { createdAt: "desc" },
  });

  const total = vehicles.length;
  const ativos = vehicles.filter((v) => v.status === "ATIVO").length;
  const avgDaily = total
    ? Math.round(vehicles.reduce((s, v) => s + Number(v.dailyPrice), 0) / total)
    : 0;
  const avgRating = total
    ? (vehicles.reduce((s, v) => s + v.rating, 0) / total).toFixed(2)
    : "—";

  return (
    <div>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="label-mono text-ink/45">Painel do locador — {user.name}</p>
          <h1 className="font-display mt-2 text-5xl text-ink">
            Seus carros, trabalhando<span className="text-volt">.</span>
          </h1>
        </div>
        <LinkButton href="/painel/locador/veiculos/novo" size="lg">
          <Plus size={18} /> Anunciar novo veículo
        </LinkButton>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Indicator label="Veículos" value={String(total)} hint="na sua frota" />
        <Indicator label="Ativos" value={String(ativos)} hint="visíveis no catálogo" />
        <Indicator label="Diária média" value={total ? brl(avgDaily) : "—"} hint="da sua frota" />
        <Indicator label="Avaliação" value={String(avgRating)} hint="média dos veículos" />
      </div>

      <div className="mt-10">
        <h2 className="label-mono mb-4 text-ink/45">Minha frota ({total})</h2>

        {total === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-bone-200 bg-white/40 px-6 py-20 text-center">
            <span className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-ink/5 text-teal">
              <Car size={24} />
            </span>
            <h3 className="font-display text-2xl text-ink">Sua frota está vazia</h3>
            <p className="mt-2 max-w-sm text-sm text-ink/60">
              Anuncie seu primeiro veículo elétrico ou híbrido e ele aparecerá no catálogo na hora.
            </p>
            <LinkButton href="/painel/locador/veiculos/novo" className="mt-6">
              <Plus size={18} /> Anunciar veículo
            </LinkButton>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {vehicles.map((vehicle) => (
              <FleetCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
