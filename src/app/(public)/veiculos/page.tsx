import type { Metadata } from "next";
import { Suspense } from "react";

import { prisma } from "@/lib/prisma";
import { buildVehicleQuery, type CatalogSearchParams } from "@/lib/catalog-query";
import { VehicleCard } from "@/components/catalog/VehicleCard";
import { CatalogFilters } from "@/components/catalog/CatalogFilters";
import { SortSelect } from "@/components/catalog/SortSelect";

export const metadata: Metadata = { title: "Veículos disponíveis · E-DriveOn" };

export default async function VeiculosPage({
  searchParams,
}: {
  searchParams: Promise<CatalogSearchParams>;
}) {
  const sp = await searchParams;
  const { where, orderBy } = buildVehicleQuery(sp);
  const vehicles = await prisma.vehicle.findMany({ where, orderBy });

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-col gap-3 border-b border-bone-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-5xl text-ink">
            <span className="text-teal">{vehicles.length}</span> veículos disponíveis
            <span className="text-volt">.</span>
          </h1>
          <p className="mt-2 text-ink/55">Elétricos e híbridos prontos pra rodar. Sem balcão.</p>
        </div>
        <Suspense>
          <SortSelect />
        </Suspense>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr]">
        <Suspense>
          <CatalogFilters />
        </Suspense>

        {vehicles.length === 0 ? (
          <div className="flex items-center justify-center rounded-3xl border border-dashed border-bone-200 py-24 text-center text-ink/55">
            Nenhum veículo encontrado com esses filtros.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
