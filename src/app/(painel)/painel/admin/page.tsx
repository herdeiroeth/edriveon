import type { Metadata } from "next";
import { ShieldCheck, Inbox } from "lucide-react";

import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import { UserRow, type AdminUser } from "@/components/admin/UserRow";

export const metadata: Metadata = { title: "Aprovações · E-DriveOn" };

function Indicator({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-3xl border border-bone-200 bg-white/50 p-5">
      <p className="label-mono text-ink/45">{label}</p>
      <p className="font-display mt-1 text-4xl text-ink">{value}</p>
    </div>
  );
}

export default async function PainelAdminPage() {
  const admin = await requireAdmin();

  const users: AdminUser[] = await prisma.user.findMany({
    where: { role: { not: "ADMIN" } },
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, email: true, role: true, status: true, createdAt: true },
  });

  const pendentes = users.filter((u) => u.status === "PENDENTE");
  const decididos = users.filter((u) => u.status !== "PENDENTE");
  const aprovados = users.filter((u) => u.status === "APROVADO").length;
  const negados = users.filter((u) => u.status === "NEGADO").length;

  return (
    <div>
      <p className="label-mono text-ink/45">
        <ShieldCheck size={13} className="mr-1 inline text-teal" />
        Painel interno — {admin.name}
      </p>
      <h1 className="font-display mt-2 text-5xl text-ink">
        Aprovações<span className="text-volt">.</span>
      </h1>
      <p className="mt-2 text-ink/60">
        Nenhum cadastro entra automaticamente. Aprove ou negue cada solicitação.
      </p>

      <div className="mt-8 grid grid-cols-3 gap-4">
        <Indicator label="Pendentes" value={pendentes.length} />
        <Indicator label="Aprovados" value={aprovados} />
        <Indicator label="Negados" value={negados} />
      </div>

      <section className="mt-10">
        <h2 className="label-mono mb-4 text-ink/45">Aguardando aprovação ({pendentes.length})</h2>
        {pendentes.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-bone-200 bg-white/40 px-6 py-16 text-center">
            <Inbox size={28} className="mb-3 text-ink/30" />
            <p className="text-ink/55">Nenhum cadastro pendente no momento.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {pendentes.map((u) => (
              <UserRow key={u.id} user={u} />
            ))}
          </div>
        )}
      </section>

      {decididos.length > 0 && (
        <section className="mt-10">
          <h2 className="label-mono mb-4 text-ink/45">Histórico ({decididos.length})</h2>
          <div className="flex flex-col gap-3">
            {decididos.map((u) => (
              <UserRow key={u.id} user={u} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
