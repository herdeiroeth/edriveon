import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { assertVehicleOwner } from "@/lib/guards";
import { updateVehicle } from "@/actions/vehicles";
import { VehicleForm } from "@/components/forms/VehicleForm";

export const metadata: Metadata = { title: "Editar veículo · E-DriveOn" };

export default async function EditarVeiculoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { vehicle } = await assertVehicleOwner(id);

  const defaults: Record<string, string> = {
    brand: vehicle.brand,
    model: vehicle.model,
    year: String(vehicle.year),
    type: vehicle.type,
    category: vehicle.category,
    color: vehicle.color,
    city: vehicle.city,
    neighborhood: vehicle.neighborhood ?? "",
    dailyPrice: String(Number(vehicle.dailyPrice)),
    deposit: String(Number(vehicle.deposit)),
    rangeKm: String(vehicle.rangeKm),
    powerCv: String(vehicle.powerCv),
    accel0to100: String(vehicle.accel0to100),
    consumptionKwh: String(vehicle.consumptionKwh),
    seats: String(vehicle.seats),
    trunkLiters: String(vehicle.trunkLiters),
    topSpeedKmh: String(vehicle.topSpeedKmh),
    batteryKwh: String(vehicle.batteryKwh),
    features: vehicle.features.join("\n"),
    photos: vehicle.photos.join("\n"),
  };

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/painel/locador"
        className="label-mono inline-flex items-center gap-2 text-ink/45 hover:text-ink"
      >
        <ArrowLeft size={14} /> Voltar ao painel
      </Link>
      <h1 className="font-display mt-3 mb-8 text-5xl text-ink">
        Editar veículo<span className="text-volt">.</span>
      </h1>
      <VehicleForm
        action={updateVehicle.bind(null, id)}
        defaults={defaults}
        submitLabel="Salvar alterações"
      />
    </div>
  );
}
