import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { requireLocador } from "@/lib/guards";
import { createVehicle } from "@/actions/vehicles";
import { VehicleForm } from "@/components/forms/VehicleForm";

export const metadata: Metadata = { title: "Anunciar veículo · E-DriveOn" };

export default async function NovoVeiculoPage() {
  await requireLocador();

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/painel/locador"
        className="label-mono inline-flex items-center gap-2 text-ink/45 hover:text-ink"
      >
        <ArrowLeft size={14} /> Voltar ao painel
      </Link>
      <h1 className="font-display mt-3 mb-8 text-5xl text-ink">
        Anunciar veículo<span className="text-volt">.</span>
      </h1>
      <VehicleForm action={createVehicle} submitLabel="Publicar veículo" />
    </div>
  );
}
