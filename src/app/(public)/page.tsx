import Link from "next/link";
import { ArrowRight, Megaphone } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { LinkButton } from "@/components/ui/Button";
import { VehicleCard } from "@/components/catalog/VehicleCard";
import { Ticker } from "@/components/layout/Ticker";
import { brl } from "@/lib/constants";

export default async function LandingPage() {
  const [count, featured, agg] = await Promise.all([
    prisma.vehicle.count({ where: { status: "ATIVO" } }),
    prisma.vehicle.findMany({
      where: { status: "ATIVO" },
      orderBy: [{ rating: "desc" }, { createdAt: "desc" }],
      take: 4,
    }),
    prisma.vehicle.aggregate({
      where: { status: "ATIVO" },
      _min: { dailyPrice: true },
      _max: { rangeKm: true },
    }),
  ]);

  const minDaily = agg._min.dailyPrice ? Number(agg._min.dailyPrice) : 129;
  const maxRange = agg._max.rangeKm ?? 629;

  const stats = [
    { value: "10%", label: "Comissão da plataforma", hint: "Sem mensalidade, sem taxa escondida" },
    { value: `${maxRange}`, unit: "km", label: "Autonomia máxima", hint: "Disponível no catálogo" },
    { value: brl(minDaily), label: "Diária a partir de", hint: "Modelo de entrada" },
    { value: `${count}`, label: "Modelos no catálogo", hint: "Elétricos e híbridos" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-12 pt-16">
        <p className="label-mono text-teal">№ 001 — Edição inaugural · 2026</p>
        <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h1 className="font-display text-7xl leading-[0.95] text-ink sm:text-8xl">
              A locadora
              <br />
              que <em className="text-teal">não é</em>
              <br />
              locadora<span className="text-volt">.</span>
            </h1>
            <p className="mt-8 max-w-md text-lg text-ink/65">
              Conectamos quem tem um carro elétrico parado a quem precisa de um por uns dias. Sem
              balcão, sem letrinha miúda, sem combustão. Você economiza.{" "}
              <strong className="text-ink">O planeta agradece.</strong>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/veiculos" size="lg">
                Ver veículos disponíveis <ArrowRight size={18} />
              </LinkButton>
              <LinkButton href="/painel/locador" variant="outline" size="lg">
                <Megaphone size={18} /> Anunciar meu carro
              </LinkButton>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-col justify-center gap-5">
            {stats.map((s) => (
              <div key={s.label} className="border-b border-bone-200 pb-4">
                <p className="font-display text-5xl text-ink">
                  {s.value}
                  {s.unit && <span className="ml-1 text-xl text-ink/50">{s.unit}</span>}
                </p>
                <p className="label-mono mt-1 text-ink/55">{s.label}</p>
                <p className="text-sm text-ink/40">{s.hint}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Ticker />

      {/* Destaques */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-4xl text-ink">
            Os mais alugados <em className="text-teal">desta semana</em>
          </h2>
          <Link href="/veiculos" className="label-mono hidden text-teal hover:underline sm:block">
            Ver todos →
          </Link>
        </div>

        {featured.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-bone-200 py-20 text-center text-ink/55">
            Catálogo em preparação. Seja o primeiro a{" "}
            <Link href="/painel/locador" className="text-teal underline">
              anunciar um veículo
            </Link>
            .
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {featured.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
