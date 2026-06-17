import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, ShieldCheck, Zap } from "lucide-react";

import { auth } from "@/lib/auth";
import { Logo } from "@/components/layout/Logo";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (session?.user) {
    redirect(session.user.role === "LOCADOR" ? "/painel/locador" : "/painel/locatario");
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Painel editorial (escuro) */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-ink p-12 lg:flex">
        <div className="absolute -right-24 top-1/3 size-96 rounded-full bg-teal/30 blur-2xl" />
        <Logo tone="bone" />
        <div className="relative">
          <p className="label-mono mb-4 text-volt">Ed. 001 · Acesso</p>
          <h1 className="font-display text-6xl text-bone">
            Sua próxima
            <br />
            viagem é <em className="text-volt">elétrica.</em>
          </h1>
          <p className="mt-6 max-w-md text-bone/60">
            Mais de 12 modelos prontos pra rodar. Sem balcão, sem fila, sem burocracia. Você combina
            o ponto de encontro, vistoria pelo app, e dirige.
          </p>
        </div>
        <div className="relative flex flex-col gap-3 text-sm text-bone/70">
          <span className="flex items-center gap-3">
            <Zap size={16} className="text-volt" /> 10% comissão · diárias a partir de R$ 129
          </span>
          <span className="flex items-center gap-3">
            <ShieldCheck size={16} className="text-volt" /> Contratos digitais e CNH verificada
          </span>
        </div>
      </div>

      {/* Painel do formulário */}
      <div className="flex flex-col justify-center bg-bone px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          {children}
          <Link
            href="/"
            className="label-mono mt-10 inline-flex items-center gap-2 text-ink/45 hover:text-ink"
          >
            <ArrowLeft size={14} /> Voltar à página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
