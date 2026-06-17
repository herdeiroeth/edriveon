import { prisma } from "@/lib/prisma";

// Normaliza para UPPER-KEBAB sem acentos. Ex.: "BYD Dolphin Plus" -> "BYD-DOLPHIN-PLUS".
function baseSlug(brand: string, model: string): string {
  return `${brand} ${model}`
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // remove diacríticos combinantes (acentos)
    .replace(/[^a-zA-Z0-9\s-]/g, "") // remove símbolos
    .trim()
    .replace(/\s+/g, "-")
    .toUpperCase()
    .replace(/-+/g, "-");
}

// Gera um slug legível e único (ex.: "BYD-DOLPHIN-PLUS-02"), checando colisão no banco.
// `ignoreId` permite reservar o próprio slug ao editar.
export async function generateUniqueSlug(
  brand: string,
  model: string,
  ignoreId?: string,
): Promise<string> {
  const base = baseSlug(brand, model) || "VEICULO";
  let suffix = 1;

  // tenta BASE-01, BASE-02, ... até achar um livre
  for (;;) {
    const candidate = `${base}-${String(suffix).padStart(2, "0")}`;
    const existing = await prisma.vehicle.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });
    if (!existing || existing.id === ignoreId) return candidate;
    suffix++;
  }
}
