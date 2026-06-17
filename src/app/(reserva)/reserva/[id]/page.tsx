import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Circle } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guards";
import { VehicleImage } from "@/components/vehicle/VehicleImage";
import { LinkButton } from "@/components/ui/Button";
import { brl } from "@/lib/constants";

export const metadata: Metadata = { title: "Reserva · E-DriveOn" };

const STEPS = ["Resumo", "Encontro", "Pagamento", "Contrato"];

export default async function ReservaPage({ params }: { params: Promise<{ id: string }> }) {
  await requireUser(); // rota protegida (proxy + guarda)
  const { id } = await params;
  const vehicle = await prisma.vehicle.findFirst({ where: { slug: id, status: "ATIVO" } });
  if (!vehicle) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href={`/veiculos/${vehicle.slug}`}
        className="label-mono inline-flex items-center gap-2 text-ink/45 hover:text-ink"
      >
        <ArrowLeft size={14} /> Voltar ao veículo
      </Link>
      <p className="label-mono mt-4 text-ink/45">Reserva em 4 passos</p>
      <h1 className="font-display mt-1 text-5xl text-ink">
        {vehicle.brand} {vehicle.model}
      </h1>

      <ol className="mt-6 flex flex-wrap gap-4">
        {STEPS.map((s, i) => (
          <li key={s} className="flex items-center gap-2 text-sm text-ink/55">
            {i === 0 ? (
              <CheckCircle2 size={16} className="text-teal" />
            ) : (
              <Circle size={16} className="text-ink/25" />
            )}
            {s}
          </li>
        ))}
      </ol>

      <div className="mt-8 overflow-hidden rounded-3xl border border-bone-200">
        <div className="aspect-[16/9]">
          <VehicleImage
            brand={vehicle.brand}
            model={vehicle.model}
            type={vehicle.type}
            photo={vehicle.photos[0]}
          />
        </div>
        <div className="flex items-center justify-between p-6">
          <div>
            <p className="label-mono text-ink/45">Diária</p>
            <p className="font-display text-3xl text-ink">{brl(Number(vehicle.dailyPrice))}</p>
          </div>
          <p className="text-sm text-ink/50">+ 10% taxa · caução {brl(Number(vehicle.deposit))}</p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-teal/10 px-5 py-4 text-sm text-teal ring-1 ring-teal/20">
        O checkout completo (encontro, pagamento e contrato digital) chega na{" "}
        <strong>fase 2</strong>. Esta tela já está protegida por autenticação.
      </div>

      <LinkButton href="/veiculos" variant="ink" className="mt-6">
        Continuar explorando
      </LinkButton>
    </div>
  );
}
