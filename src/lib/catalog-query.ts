import type { Prisma } from "@prisma/client";

export type CatalogSearchParams = Record<string, string | string[] | undefined>;

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

const ORDER_BY: Record<string, Prisma.VehicleOrderByWithRelationInput> = {
  preco_asc: { dailyPrice: "asc" },
  preco_desc: { dailyPrice: "desc" },
  autonomia: { rangeKm: "desc" },
  avaliacao: { rating: "desc" },
  relevancia: { createdAt: "desc" },
};

// Traduz os searchParams da URL em where/orderBy do Prisma. Sempre restrito a ATIVO.
export function buildVehicleQuery(sp: CatalogSearchParams): {
  where: Prisma.VehicleWhereInput;
  orderBy: Prisma.VehicleOrderByWithRelationInput;
} {
  const where: Prisma.VehicleWhereInput = { status: "ATIVO" };

  const tipo = one(sp.tipo);
  if (tipo === "ELETRICO" || tipo === "HIBRIDO") where.type = tipo;

  const categoria = one(sp.categoria);
  if (categoria === "SUV" || categoria === "SEDAN" || categoria === "HATCH") {
    where.category = categoria;
  }

  const cidade = one(sp.cidade);
  if (cidade) where.city = { contains: cidade, mode: "insensitive" };

  const diariaMax = Number(one(sp.diariaMax));
  if (Number.isFinite(diariaMax) && diariaMax > 0) where.dailyPrice = { lte: diariaMax };

  const autonomiaMin = Number(one(sp.autonomiaMin));
  if (Number.isFinite(autonomiaMin) && autonomiaMin > 0) where.rangeKm = { gte: autonomiaMin };

  const q = one(sp.q)?.trim();
  if (q) {
    where.OR = [
      { brand: { contains: q, mode: "insensitive" } },
      { model: { contains: q, mode: "insensitive" } },
      { city: { contains: q, mode: "insensitive" } },
    ];
  }

  const orderBy = ORDER_BY[one(sp.ordenar) ?? "relevancia"] ?? ORDER_BY.relevancia;
  return { where, orderBy };
}
