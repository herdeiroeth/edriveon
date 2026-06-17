"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requireLocador, assertVehicleOwner } from "@/lib/guards";
import { vehicleSchema, linesToArray, flattenZodErrors } from "@/lib/validations";
import { generateUniqueSlug } from "@/lib/slug";

export type VehicleFormState =
  | {
      errors?: Record<string, string>;
      message?: string;
      values?: Record<string, string>;
    }
  | undefined;

const FIELD_KEYS = [
  "brand", "model", "year", "type", "category", "color", "city", "neighborhood",
  "dailyPrice", "deposit", "rangeKm", "powerCv", "accel0to100", "consumptionKwh",
  "seats", "trunkLiters", "topSpeedKmh", "batteryKwh", "features", "photos",
] as const;

// Strings cruas, para repovoar o form quando há erro de validação.
function rawValues(formData: FormData): Record<string, string> {
  const out: Record<string, string> = {};
  for (const k of FIELD_KEYS) out[k] = String(formData.get(k) ?? "");
  return out;
}

function parseInput(formData: FormData) {
  return vehicleSchema.safeParse({
    ...rawValues(formData),
    features: linesToArray(formData.get("features")),
    photos: linesToArray(formData.get("photos")),
  });
}

function revalidateAll(slug?: string) {
  revalidatePath("/painel/locador");
  revalidatePath("/veiculos");
  if (slug) revalidatePath(`/veiculos/${slug}`);
}

// ─── Criar ───────────────────────────────────────────────────────────────
export async function createVehicle(
  _prev: VehicleFormState,
  formData: FormData,
): Promise<VehicleFormState> {
  const user = await requireLocador();

  const parsed = parseInput(formData);
  if (!parsed.success) {
    return { errors: flattenZodErrors(parsed.error), values: rawValues(formData) };
  }

  const data = parsed.data;
  const slug = await generateUniqueSlug(data.brand, data.model);

  await prisma.vehicle.create({
    data: {
      ...data,
      neighborhood: data.neighborhood || null,
      slug,
      ownerId: user.id,
    },
  });

  revalidateAll(slug);
  redirect("/painel/locador");
}

// ─── Editar ──────────────────────────────────────────────────────────────
export async function updateVehicle(
  id: string,
  _prev: VehicleFormState,
  formData: FormData,
): Promise<VehicleFormState> {
  const { vehicle } = await assertVehicleOwner(id);

  const parsed = parseInput(formData);
  if (!parsed.success) {
    return { errors: flattenZodErrors(parsed.error), values: rawValues(formData) };
  }

  const data = parsed.data;
  await prisma.vehicle.update({
    where: { id },
    data: { ...data, neighborhood: data.neighborhood || null },
  });

  revalidateAll(vehicle.slug); // slug preservado
  redirect("/painel/locador");
}

// ─── Pausar / Ativar ───────────────────────────────────────────────────────
export async function toggleVehicleStatus(id: string) {
  const { vehicle } = await assertVehicleOwner(id);
  await prisma.vehicle.update({
    where: { id },
    data: { status: vehicle.status === "ATIVO" ? "PAUSADO" : "ATIVO" },
  });
  revalidateAll(vehicle.slug);
  redirect("/painel/locador");
}

// ─── Remover ─────────────────────────────────────────────────────────────
export async function deleteVehicle(id: string) {
  const { vehicle } = await assertVehicleOwner(id);
  await prisma.vehicle.delete({ where: { id } });
  revalidateAll(vehicle.slug);
  redirect("/painel/locador");
}
