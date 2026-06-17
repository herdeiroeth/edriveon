"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { UserStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/guards";

async function setStatus(id: string, status: UserStatus) {
  await requireAdmin();
  const target = await prisma.user.findUnique({ where: { id } });
  // Nunca altera contas de admin nem inexistentes.
  if (target && target.role !== "ADMIN") {
    await prisma.user.update({
      where: { id },
      data: { status, reviewedAt: new Date() },
    });
    revalidatePath("/painel/admin");
  }
  // Redireciona (303) p/ recarregar o painel — resposta que atravessa o proxy
  // sem o erro "unexpected response" das actions que retornam void.
  redirect("/painel/admin");
}

export async function approveUser(id: string) {
  await setStatus(id, "APROVADO");
}

export async function denyUser(id: string) {
  await setStatus(id, "NEGADO");
}
