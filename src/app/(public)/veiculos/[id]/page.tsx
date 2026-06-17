import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Star, MapPin, Check } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { VehicleImage } from "@/components/vehicle/VehicleImage";
import { SpecSheet } from "@/components/vehicle/SpecSheet";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { VEHICLE_TYPE_LABEL, brl } from "@/lib/constants";

async function getVehicle(slug: string) {
  return prisma.vehicle.findFirst({ where: { slug, status: "ATIVO" } });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const v = await getVehicle(id);
  return { title: v ? `${v.brand} ${v.model} · E-DriveOn` : "Veículo · E-DriveOn" };
}

export default async function VeiculoDetalhePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vehicle = await getVehicle(id);
  if (!vehicle) notFound();

  const daily = Number(vehicle.dailyPrice);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Link
        href="/veiculos"
        className="label-mono inline-flex items-center gap-2 text-ink/45 hover:text-ink"
      >
        <ArrowLeft size={14} /> Voltar ao catálogo
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Galeria */}
        <div className="overflow-hidden rounded-3xl border border-bone-200">
          <div className="aspect-[16/10]">
            <VehicleImage
              brand={vehicle.brand}
              model={vehicle.model}
              type={vehicle.type}
              photo={vehicle.photos[0]}
            />
          </div>
          {vehicle.photoCredit && (
            <p className="bg-bone px-4 py-2 text-xs text-ink/40">{vehicle.photoCredit}</p>
          )}
        </div>

        {/* Resumo */}
        <div>
          <div className="flex items-center gap-3">
            <span className="label-mono text-ink/50">
              {vehicle.brand} — {vehicle.year}
            </span>
            <Badge tone={vehicle.type === "ELETRICO" ? "volt" : "cyan"}>
              {VEHICLE_TYPE_LABEL[vehicle.type]}
            </Badge>
          </div>
          <h1 className="font-display mt-2 text-5xl text-ink">{vehicle.model}</h1>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-ink/60">
            {vehicle.rating > 0 && (
              <span className="inline-flex items-center gap-1">
                <Star size={14} className="text-volt" fill="currentColor" />
                <strong className="text-ink">{vehicle.rating.toFixed(1)}</strong>
              </span>
            )}
            <span className="inline-flex items-center gap-1">
              <MapPin size={14} />
              {vehicle.neighborhood ? `${vehicle.neighborhood}, ` : ""}
              {vehicle.city}
            </span>
          </div>

          {/* Preço */}
          <div className="mt-6 rounded-3xl bg-ink p-6 text-bone">
            <span className="label-mono text-bone/50">Diária</span>
            <p className="font-display text-5xl text-bone">
              {brl(daily)}
              <span className="ml-2 align-middle text-sm text-bone/50">/dia</span>
            </p>
            <p className="mt-2 text-sm text-bone/60">
              + 10% taxa da plataforma · caução {brl(Number(vehicle.deposit))}
            </p>
            <LinkButton href={`/reserva/${vehicle.slug}`} size="lg" className="mt-5 w-full">
              Reservar agora
            </LinkButton>
            <p className="mt-2 text-center text-xs text-bone/40">Cor: {vehicle.color}</p>
          </div>

          {/* Equipamentos */}
          {vehicle.features.length > 0 && (
            <div className="mt-6">
              <p className="label-mono mb-3 text-ink/45">Equipamentos & destaques</p>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {vehicle.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-ink/75">
                    <Check size={15} className="text-teal" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <SpecSheet vehicle={vehicle} />
      </div>
    </div>
  );
}
