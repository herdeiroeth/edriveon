// Rótulos PT-BR e opções de UI derivadas dos enums do Prisma.
import type { VehicleType, Category, VehicleStatus, Role, UserStatus } from "@prisma/client";

export const VEHICLE_TYPE_LABEL: Record<VehicleType, string> = {
  ELETRICO: "Elétrico",
  HIBRIDO: "Híbrido",
};

export const CATEGORY_LABEL: Record<Category, string> = {
  SUV: "SUV",
  SEDAN: "Sedan",
  HATCH: "Hatch",
};

export const STATUS_LABEL: Record<VehicleStatus, string> = {
  ATIVO: "Ativo",
  PAUSADO: "Pausado",
};

export const ROLE_LABEL: Record<Role, string> = {
  LOCATARIO: "Locatário",
  LOCADOR: "Locador",
  ADMIN: "Admin",
};

export const USER_STATUS_LABEL: Record<UserStatus, string> = {
  PENDENTE: "Pendente",
  APROVADO: "Aprovado",
  NEGADO: "Negado",
};

export const VEHICLE_TYPES = ["ELETRICO", "HIBRIDO"] as const;
export const CATEGORIES = ["SUV", "SEDAN", "HATCH"] as const;

// Cidades atendidas (do mockup — foco em São Paulo).
export const CITIES = [
  "São Paulo",
  "Rio de Janeiro",
  "Curitiba",
  "Belo Horizonte",
  "Campinas",
] as const;

// Opções de ordenação do catálogo (key usada no searchParam `ordenar`).
export const SORT_OPTIONS = [
  { value: "relevancia", label: "Relevância" },
  { value: "preco_asc", label: "Menor preço" },
  { value: "preco_desc", label: "Maior preço" },
  { value: "autonomia", label: "Autonomia" },
  { value: "avaliacao", label: "Avaliação" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

// Comissão da plataforma (mediadora P2P).
export const PLATFORM_FEE_RATE = 0.1; // 10%

// Formatação de moeda BRL.
export const brl = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
