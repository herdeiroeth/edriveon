import { z } from "zod";

// ─── Auth ────────────────────────────────────────────────────────────────

export const roleSchema = z.enum(["LOCATARIO", "LOCADOR"]);

export const loginSchema = z.object({
  email: z.email({ error: "Informe um e-mail válido." }).trim().toLowerCase(),
  password: z.string().min(1, { error: "Informe a senha." }),
  // O toggle de papel é apenas para o redirecionamento; não restringe o login.
  role: roleSchema.optional(),
});

export const registerSchema = z.object({
  name: z.string().min(2, { error: "Nome muito curto." }).max(80).trim(),
  email: z.email({ error: "Informe um e-mail válido." }).trim().toLowerCase(),
  password: z
    .string()
    .min(8, { error: "A senha deve ter ao menos 8 caracteres." })
    .max(72, { error: "A senha é longa demais." }),
  role: roleSchema,
});

export type RegisterInput = z.infer<typeof registerSchema>;

// ─── Veículo (cadastro/edição) ─────────────────────────────────────────────

export const vehicleSchema = z.object({
  brand: z.string().min(1, { error: "Informe a marca." }).max(40).trim(),
  model: z.string().min(1, { error: "Informe o modelo." }).max(60).trim(),
  year: z.coerce
    .number()
    .int()
    .min(2010, { error: "Ano mínimo 2010." })
    .max(2027, { error: "Ano máximo 2027." }),
  type: z.enum(["ELETRICO", "HIBRIDO"]),
  category: z.enum(["SUV", "SEDAN", "HATCH"]),
  color: z.string().min(1, { error: "Informe a cor." }).max(30).trim(),
  city: z.string().min(1, { error: "Informe a cidade." }).max(60).trim(),
  neighborhood: z.string().max(60).trim().optional().or(z.literal("")),
  dailyPrice: z.coerce
    .number()
    .positive({ error: "Diária deve ser maior que zero." })
    .max(99999),
  deposit: z.coerce.number().nonnegative().max(999999),
  rangeKm: z.coerce.number().int().positive({ error: "Autonomia inválida." }).max(2000),
  powerCv: z.coerce.number().int().positive({ error: "Potência inválida." }).max(2000),
  accel0to100: z.coerce.number().positive().max(30),
  consumptionKwh: z.coerce.number().positive().max(100),
  seats: z.coerce.number().int().min(1).max(9),
  trunkLiters: z.coerce.number().int().nonnegative().max(3000),
  topSpeedKmh: z.coerce.number().int().positive().max(400),
  batteryKwh: z.coerce.number().positive().max(300),
  features: z.array(z.string().min(1).max(60)).max(20),
  photos: z.array(z.url({ error: "Foto deve ser uma URL válida." })).max(8),
});

export type VehicleInput = z.infer<typeof vehicleSchema>;

// Converte uma textarea (linhas ou vírgulas) em array limpo.
export function linesToArray(raw: FormDataEntryValue | null): string[] {
  if (typeof raw !== "string") return [];
  return raw
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

// Achata erros do Zod em { campo: "primeira mensagem" } para exibição no form.
export function flattenZodErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "_";
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
