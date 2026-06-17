import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

type SeedVehicle = {
  slug: string;
  brand: string;
  model: string;
  year: number;
  type: "ELETRICO" | "HIBRIDO";
  category: "SUV" | "SEDAN" | "HATCH";
  color: string;
  city: string;
  neighborhood: string;
  dailyPrice: number;
  deposit: number;
  rangeKm: number;
  powerCv: number;
  accel0to100: number;
  consumptionKwh: number;
  seats: number;
  trunkLiters: number;
  topSpeedKmh: number;
  batteryKwh: number;
  features: string[];
  rating: number;
  status: "ATIVO" | "PAUSADO";
};

const VEHICLES: SeedVehicle[] = [
  {
    slug: "VOLVO-XC40-RECHARGE-01", brand: "Volvo", model: "XC40 Recharge", year: 2024,
    type: "ELETRICO", category: "SUV", color: "Pebble Grey", city: "São Paulo", neighborhood: "Pinheiros",
    dailyPrice: 289, deposit: 1500, rangeKm: 418, powerCv: 408, accel0to100: 4.9, consumptionKwh: 18.5,
    seats: 5, trunkLiters: 452, topSpeedKmh: 180, batteryKwh: 78,
    features: ["Piloto automático adaptativo", "Câmera 360°", "Carregamento DC 150kW", "Bowers & Wilkins"],
    rating: 4.9, status: "ATIVO",
  },
  {
    slug: "BYD-DOLPHIN-PLUS-02", brand: "BYD", model: "Dolphin Plus", year: 2024,
    type: "ELETRICO", category: "HATCH", color: "Branco Pérola", city: "São Paulo", neighborhood: "Lapa",
    dailyPrice: 169, deposit: 900, rangeKm: 427, powerCv: 204, accel0to100: 7.0, consumptionKwh: 15.9,
    seats: 5, trunkLiters: 345, topSpeedKmh: 160, batteryKwh: 60.5,
    features: ["Teto solar panorâmico", "Carregador veicular", "Apple CarPlay"],
    rating: 4.7, status: "ATIVO",
  },
  {
    slug: "TESLA-MODEL-3-LONG-RANGE-03", brand: "Tesla", model: "Model 3 Long Range", year: 2023,
    type: "ELETRICO", category: "SEDAN", color: "Midnight Silver", city: "São Paulo", neighborhood: "Itaim Bibi",
    dailyPrice: 299, deposit: 2000, rangeKm: 602, powerCv: 498, accel0to100: 4.4, consumptionKwh: 14.9,
    seats: 5, trunkLiters: 594, topSpeedKmh: 233, batteryKwh: 82,
    features: ["Autopilot", "Glass roof", "Supercharger", "Som premium"],
    rating: 4.8, status: "ATIVO",
  },
  {
    slug: "RENAULT-KWID-E-TECH-04", brand: "Renault", model: "Kwid E-Tech", year: 2024,
    type: "ELETRICO", category: "HATCH", color: "Verde Lima", city: "São Paulo", neighborhood: "Vila Mariana",
    dailyPrice: 129, deposit: 600, rangeKm: 298, powerCv: 65, accel0to100: 9.8, consumptionKwh: 13.5,
    seats: 5, trunkLiters: 290, topSpeedKmh: 130, batteryKwh: 26.8,
    features: ["Central multimídia", "Modo eco", "Câmera de ré"],
    rating: 4.5, status: "ATIVO",
  },
  {
    slug: "BMW-I3-EDRIVE40-05", brand: "BMW", model: "iX3 eDrive40", year: 2023,
    type: "ELETRICO", category: "SUV", color: "Phytonic Blue", city: "São Paulo", neighborhood: "Moema",
    dailyPrice: 359, deposit: 2200, rangeKm: 460, powerCv: 286, accel0to100: 6.8, consumptionKwh: 18.9,
    seats: 5, trunkLiters: 510, topSpeedKmh: 180, batteryKwh: 80,
    features: ["Harman Kardon", "Head-up display", "Assistente de direção"],
    rating: 4.8, status: "ATIVO",
  },
  {
    slug: "GWM-ORA-03-06", brand: "GWM", model: "Ora 03", year: 2024,
    type: "ELETRICO", category: "HATCH", color: "Preto Skin", city: "Campinas", neighborhood: "Cambuí",
    dailyPrice: 279, deposit: 1200, rangeKm: 360, powerCv: 171, accel0to100: 8.4, consumptionKwh: 16.2,
    seats: 5, trunkLiters: 228, topSpeedKmh: 160, batteryKwh: 63,
    features: ["Bancos em couro", "Carregamento sem fio", "ADAS"],
    rating: 4.6, status: "ATIVO",
  },
  {
    slug: "FIAT-500E-LA-PRIMA-07", brand: "Fiat", model: "500e La Prima", year: 2024,
    type: "ELETRICO", category: "HATCH", color: "Ocean Green", city: "São Paulo", neighborhood: "Vila Madalena",
    dailyPrice: 249, deposit: 1000, rangeKm: 320, powerCv: 118, accel0to100: 9.0, consumptionKwh: 14.3,
    seats: 4, trunkLiters: 185, topSpeedKmh: 150, batteryKwh: 42,
    features: ["Teto solar", "JBL premium", "Modo Sherpa"],
    rating: 4.6, status: "PAUSADO",
  },
  {
    slug: "GWM-HAVAL-H6-PHEV-08", brand: "GWM", model: "Haval H6 PHEV", year: 2024,
    type: "HIBRIDO", category: "SUV", color: "Branco Hamilton", city: "São Paulo", neighborhood: "Morumbi",
    dailyPrice: 339, deposit: 1800, rangeKm: 180, powerCv: 393, accel0to100: 5.9, consumptionKwh: 21.0,
    seats: 5, trunkLiters: 600, topSpeedKmh: 200, batteryKwh: 34,
    features: ["Tração integral", "Teto panorâmico", "12 alto-falantes"],
    rating: 4.7, status: "ATIVO",
  },
  {
    slug: "TOYOTA-COROLLA-CROSS-HYBRID-09", brand: "Toyota", model: "Corolla Cross Hybrid", year: 2024,
    type: "HIBRIDO", category: "SUV", color: "Cinza Granito", city: "Curitiba", neighborhood: "Batel",
    dailyPrice: 219, deposit: 1100, rangeKm: 1000, powerCv: 122, accel0to100: 9.2, consumptionKwh: 0,
    seats: 5, trunkLiters: 440, topSpeedKmh: 180, batteryKwh: 4,
    features: ["Toyota Safety Sense", "Partida por botão", "Faróis full LED"],
    rating: 4.7, status: "ATIVO",
  },
  {
    slug: "BYD-SEAL-10", brand: "BYD", model: "Seal", year: 2024,
    type: "ELETRICO", category: "SEDAN", color: "Aurora Blue", city: "Rio de Janeiro", neighborhood: "Barra da Tijuca",
    dailyPrice: 329, deposit: 2000, rangeKm: 570, powerCv: 530, accel0to100: 3.8, consumptionKwh: 16.6,
    seats: 5, trunkLiters: 400, topSpeedKmh: 180, batteryKwh: 82.5,
    features: ["Suspensão inteligente", "Painel rotativo", "Carregamento V2L"],
    rating: 4.8, status: "ATIVO",
  },
  {
    slug: "NISSAN-LEAF-11", brand: "Nissan", model: "Leaf", year: 2023,
    type: "ELETRICO", category: "HATCH", color: "Branco Perolizado", city: "Belo Horizonte", neighborhood: "Savassi",
    dailyPrice: 199, deposit: 900, rangeKm: 270, powerCv: 150, accel0to100: 7.9, consumptionKwh: 17.1,
    seats: 5, trunkLiters: 435, topSpeedKmh: 144, batteryKwh: 40,
    features: ["e-Pedal", "ProPILOT", "Câmera 360°"],
    rating: 4.4, status: "ATIVO",
  },
  {
    slug: "JEEP-COMPASS-4XE-12", brand: "Jeep", model: "Compass 4xe", year: 2024,
    type: "HIBRIDO", category: "SUV", color: "Cinza Sting", city: "São Paulo", neighborhood: "Santo Amaro",
    dailyPrice: 309, deposit: 1600, rangeKm: 50, powerCv: 240, accel0to100: 7.3, consumptionKwh: 22.0,
    seats: 5, trunkLiters: 420, topSpeedKmh: 200, batteryKwh: 11.4,
    features: ["Tração 4x4", "Selec-Terrain", "Teto solar"],
    rating: 4.5, status: "PAUSADO",
  },
];

// Fotos reais (Wikimedia Commons) + atribuição CC por veículo.
const PHOTOS: Record<string, { url: string; credit: string }> = {
  "VOLVO-XC40-RECHARGE-01": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/2019_Volvo_XC40_T5_Momentum_in_Bright_Silver_Metallic%2C_front_left%2C_2025-09-22.jpg/1280px-2019_Volvo_XC40_T5_Momentum_in_Bright_Silver_Metallic%2C_front_left%2C_2025-09-22.jpg",
    credit: "Foto: Elise240SX · CC BY-SA 4.0 · Wikimedia Commons",
  },
  "BYD-DOLPHIN-PLUS-02": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/2021_BYD_Dolphin_EV_%28front%29.jpg/1280px-2021_BYD_Dolphin_EV_%28front%29.jpg",
    credit: "Foto: User3204 · CC BY-SA 4.0 · Wikimedia Commons",
  },
  "TESLA-MODEL-3-LONG-RANGE-03": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Tesla_Model_3_%282023%29_Autofr%C3%BChling_Ulm_IMG_9282.jpg/1280px-Tesla_Model_3_%282023%29_Autofr%C3%BChling_Ulm_IMG_9282.jpg",
    credit: "Foto: Alexander-93 · CC BY-SA 4.0 · Wikimedia Commons",
  },
  "RENAULT-KWID-E-TECH-04": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/2023_Renault_Kwid_Iconic_%28Colombia%29_front_view_01.png/1280px-2023_Renault_Kwid_Iconic_%28Colombia%29_front_view_01.png",
    credit: "Foto: Autosdeprimera · CC BY 3.0 · Wikimedia Commons",
  },
  "BMW-I3-EDRIVE40-05": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/BMW_iX3_NA5_IMG_5333.jpg/1280px-BMW_iX3_NA5_IMG_5333.jpg",
    credit: "Foto: Alexander Migl · CC BY-SA 4.0 · Wikimedia Commons",
  },
  "GWM-ORA-03-06": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/GWM_Ora_03_%E2%80%93_f_12102025.jpg/1280px-GWM_Ora_03_%E2%80%93_f_12102025.jpg",
    credit: "Foto: © M 93 · CC BY-SA 3.0 de · Wikimedia Commons",
  },
  "FIAT-500E-LA-PRIMA-07": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Fiat-500-vorne2.jpg/1280px-Fiat-500-vorne2.jpg",
    credit: "Foto: Daniel Przygoda · CC BY-SA 4.0 · Wikimedia Commons",
  },
  "GWM-HAVAL-H6-PHEV-08": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Haval_H6_III_IMG001_%28cropped%29.jpg/1280px-Haval_H6_III_IMG001_%28cropped%29.jpg",
    credit: "Foto: Zotyefan · CC BY-SA 4.0 · Wikimedia Commons",
  },
  "TOYOTA-COROLLA-CROSS-HYBRID-09": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/2023_Toyota_Corolla_Cross_XLE_4WD_in_Wind_Chill_Pearl%2C_front_left.jpg/1280px-2023_Toyota_Corolla_Cross_XLE_4WD_in_Wind_Chill_Pearl%2C_front_left.jpg",
    credit: "Foto: Mr.choppers · CC BY-SA 3.0 · Wikimedia Commons",
  },
  "BYD-SEAL-10": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/2022_BYD_Seal.jpg/1280px-2022_BYD_Seal.jpg",
    credit: "Foto: User3204 · CC BY-SA 4.0 · Wikimedia Commons",
  },
  "NISSAN-LEAF-11": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Nissan_Leaf_%28ZE2%29_autoMOBIL_T%C3%BCbingen_2025_DSC_2752.jpg/1280px-Nissan_Leaf_%28ZE2%29_autoMOBIL_T%C3%BCbingen_2025_DSC_2752.jpg",
    credit: "Foto: Alexander Migl · CC BY-SA 4.0 · Wikimedia Commons",
  },
  "JEEP-COMPASS-4XE-12": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/2019_Jeep_Compass_Limited_2.4L%2C_front_7.6.19.jpg/1280px-2019_Jeep_Compass_Limited_2.4L%2C_front_7.6.19.jpg",
    credit: "Foto: Kevauto · CC BY-SA 4.0 · Wikimedia Commons",
  },
};

async function main() {
  const passwordHash = await bcrypt.hash("demo1234", 12);

  // Admin interno (aprova cadastros).
  await prisma.user.upsert({
    where: { email: "admin@edriveon.com" },
    update: { name: "Equipe E-DriveOn", role: "ADMIN", status: "APROVADO", passwordHash },
    create: {
      name: "Equipe E-DriveOn",
      email: "admin@edriveon.com",
      role: "ADMIN",
      status: "APROVADO",
      passwordHash,
    },
  });

  // Contas demo já aprovadas (para o login funcionar de imediato).
  const locador = await prisma.user.upsert({
    where: { email: "locador@edriveon.com" },
    update: { name: "Marina Castro", role: "LOCADOR", status: "APROVADO", passwordHash },
    create: {
      name: "Marina Castro",
      email: "locador@edriveon.com",
      role: "LOCADOR",
      status: "APROVADO",
      passwordHash,
    },
  });

  await prisma.user.upsert({
    where: { email: "locatario@edriveon.com" },
    update: { name: "Ryan Sousa", role: "LOCATARIO", status: "APROVADO", passwordHash },
    create: {
      name: "Ryan Sousa",
      email: "locatario@edriveon.com",
      role: "LOCATARIO",
      status: "APROVADO",
      passwordHash,
    },
  });

  // Cadastros PENDENTES de exemplo, para o painel de aprovação ter conteúdo.
  const pendentes = [
    { name: "João Pedro Lima", email: "joao.pendente@edriveon.com", role: "LOCADOR" as const },
    { name: "Camila Rocha", email: "camila.pendente@edriveon.com", role: "LOCATARIO" as const },
  ];
  for (const p of pendentes) {
    await prisma.user.upsert({
      where: { email: p.email },
      update: { name: p.name, role: p.role, status: "PENDENTE", passwordHash },
      create: { ...p, status: "PENDENTE", passwordHash },
    });
  }

  // Idempotente: limpa toda a frota e recria a partir do seed.
  await prisma.vehicle.deleteMany({});

  await prisma.vehicle.createMany({
    data: VEHICLES.map((v) => ({
      ...v,
      photos: PHOTOS[v.slug] ? [PHOTOS[v.slug].url] : [],
      photoCredit: PHOTOS[v.slug]?.credit ?? null,
      ownerId: locador.id,
    })),
  });

  const total = await prisma.vehicle.count();
  const ativos = await prisma.vehicle.count({ where: { status: "ATIVO" } });
  console.log(`✓ Seed concluído: ${total} veículos (${ativos} ativos).`);
  console.log("  Admin:     admin@edriveon.com / demo1234");
  console.log("  Locador:   locador@edriveon.com / demo1234");
  console.log("  Locatário: locatario@edriveon.com / demo1234");
  console.log("  + 2 cadastros PENDENTES para aprovar no painel.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
