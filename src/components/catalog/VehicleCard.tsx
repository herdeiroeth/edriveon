import Link from "next/link";
import { Star, Zap, Gauge, MapPin } from "lucide-react";
import type { Vehicle } from "@prisma/client";

import { VehicleImage } from "@/components/vehicle/VehicleImage";
import { Badge } from "@/components/ui/Badge";
import { VEHICLE_TYPE_LABEL, brl } from "@/lib/constants";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link
      href={`/veiculos/${vehicle.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-bone-200 bg-white/50 transition-all hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-lg hover:shadow-ink/5"
    >
      <div className="relative aspect-[16/10]">
        <VehicleImage
          brand={vehicle.brand}
          model={vehicle.model}
          type={vehicle.type}
          photo={vehicle.photos[0]}
        />
        <div className="absolute left-3 top-3">
          <Badge tone={vehicle.type === "ELETRICO" ? "volt" : "cyan"}>
            {VEHICLE_TYPE_LABEL[vehicle.type]}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-2xl text-ink">
            {vehicle.brand} {vehicle.model}
          </h3>
          {vehicle.rating > 0 && (
            <span className="mt-1 inline-flex items-center gap-1 text-sm text-ink/70">
              <Star size={13} className="text-volt" fill="currentColor" />
              {vehicle.rating.toFixed(1)}
            </span>
          )}
        </div>

        <p className="mt-1 flex items-center gap-1 text-sm text-ink/50">
          <MapPin size={13} />
          {vehicle.neighborhood ? `${vehicle.neighborhood}, ` : ""}
          {vehicle.city}
        </p>

        <div className="mt-4 flex gap-5 border-t border-bone-200 pt-4 text-sm">
          <span className="flex items-center gap-1.5 text-ink/70">
            <Zap size={14} className="text-teal" /> {vehicle.rangeKm} km
          </span>
          <span className="flex items-center gap-1.5 text-ink/70">
            <Gauge size={14} className="text-teal" /> {vehicle.powerCv} cv
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <span>
            <span className="font-display text-2xl text-ink">{brl(Number(vehicle.dailyPrice))}</span>
            <span className="text-sm text-ink/50"> /dia</span>
          </span>
          <span className="label-mono text-teal group-hover:underline">Ver mais →</span>
        </div>
      </div>
    </Link>
  );
}
