import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Exige sessão. Em rotas server-side é a defesa real (o proxy é só a 1ª camada).
export async function requireUser() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return session.user;
}

// Exige papel LOCADOR (quem pode anunciar/gerenciar carros).
export async function requireLocador() {
  const user = await requireUser();
  if (user.role !== "LOCADOR") redirect("/painel/locatario");
  return user;
}

// Exige papel ADMIN (equipe interna que aprova cadastros).
export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "ADMIN") redirect("/");
  return user;
}

// Garante que o veículo existe E pertence ao locador logado.
// Não revela a existência de recursos de terceiros (notFound).
export async function assertVehicleOwner(vehicleId: string) {
  const user = await requireLocador();
  const vehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId } });
  if (!vehicle || vehicle.ownerId !== user.id) {
    notFound();
  }
  return { user, vehicle };
}
