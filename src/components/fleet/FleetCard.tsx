import Link from "next/link";
import { Pencil, Pause, Play, Trash2, Star } from "lucide-react";
import type { Vehicle } from "@prisma/client";

import { toggleVehicleStatus, deleteVehicle } from "@/actions/vehicles";
import { Badge } from "@/components/ui/Badge";
import { ConfirmSubmit } from "@/components/fleet/ConfirmSubmit";
import { VEHICLE_TYPE_LABEL, CATEGORY_LABEL, brl } from "@/lib/constants";

const actionBtn =
  "inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 text-xs text-ink/70 transition-colors hover:border-ink/40 hover:text-ink";

export function FleetCard({ vehicle }: { vehicle: Vehicle }) {
  const isActive = vehicle.status === "ATIVO";

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-bone-200 bg-white/50 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="mb-2 flex items-center gap-2">
          <Badge tone={isActive ? "teal" : "muted"}>{isActive ? "Ativo" : "Pausado"}</Badge>
          <span className="label-mono text-ink/40">{vehicle.slug}</span>
        </div>
        <h3 className="font-display text-2xl text-ink">
          {vehicle.brand} {vehicle.model}
        </h3>
        <p className="mt-1 text-sm text-ink/55">
          {vehicle.year} · {vehicle.color} · {VEHICLE_TYPE_LABEL[vehicle.type]} ·{" "}
          {CATEGORY_LABEL[vehicle.category]} · {vehicle.neighborhood ? `${vehicle.neighborhood}, ` : ""}
          {vehicle.city}
        </p>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm">
          <span>
            <span className="label-mono text-ink/40">Diária</span>{" "}
            <strong className="text-ink">{brl(Number(vehicle.dailyPrice))}</strong>
          </span>
          <span>
            <span className="label-mono text-ink/40">Caução</span>{" "}
            <strong className="text-ink">{brl(Number(vehicle.deposit))}</strong>
          </span>
          <span className="inline-flex items-center gap-1">
            <Star size={13} className="text-volt" fill="currentColor" />
            <strong className="text-ink">{vehicle.rating.toFixed(1)}</strong>
          </span>
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap gap-2">
        <Link href={`/painel/locador/veiculos/${vehicle.id}/editar`} className={actionBtn}>
          <Pencil size={13} /> Editar
        </Link>
        <form action={toggleVehicleStatus.bind(null, vehicle.id)}>
          <button type="submit" className={actionBtn}>
            {isActive ? <Pause size={13} /> : <Play size={13} />}
            {isActive ? "Pausar" : "Ativar"}
          </button>
        </form>
        <form action={deleteVehicle.bind(null, vehicle.id)}>
          <ConfirmSubmit
            message={`Remover ${vehicle.brand} ${vehicle.model}? Esta ação não pode ser desfeita.`}
            className={`${actionBtn} hover:border-red-400 hover:text-red-600`}
          >
            <Trash2 size={13} /> Remover
          </ConfirmSubmit>
        </form>
      </div>
    </div>
  );
}
