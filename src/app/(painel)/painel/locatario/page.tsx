import type { Metadata } from "next";
import { Clock } from "lucide-react";

import { requireUser } from "@/lib/guards";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Minhas reservas · E-DriveOn" };

export default async function PainelLocatarioPage() {
  const user = await requireUser();

  return (
    <div>
      <p className="label-mono text-ink/45">
        Painel do locatário — Olá, {(user.name ?? "").split(" ")[0]}
      </p>
      <h1 className="font-display mt-2 text-5xl text-ink">
        Suas reservas<span className="text-volt">.</span>
      </h1>

      <div className="mt-10 flex flex-col items-center justify-center rounded-3xl border border-dashed border-bone-200 bg-white/40 px-6 py-20 text-center">
        <span className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-ink/5 text-teal">
          <Clock size={24} />
        </span>
        <h2 className="font-display text-2xl text-ink">Reservas chegam na fase 2</h2>
        <p className="mt-2 max-w-sm text-sm text-ink/60">
          O fluxo de reserva e checkout em 4 etapas está em desenvolvimento. Por enquanto, explore o
          catálogo de veículos disponíveis.
        </p>
        <LinkButton href="/veiculos" variant="ink" className="mt-6">
          Ver catálogo
        </LinkButton>
      </div>
    </div>
  );
}
