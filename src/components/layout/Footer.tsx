import Link from "next/link";
import { Logo } from "@/components/layout/Logo";

export function Footer() {
  return (
    <footer className="border-t border-bone-200 bg-bone">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm text-ink/55">
            Plataforma mediadora P2P de locação de veículos elétricos e híbridos. Não somos donos
            dos carros — conectamos locadores e locatários.
          </p>
        </div>
        <nav className="flex gap-14 text-sm">
          <div className="flex flex-col gap-2">
            <span className="label-mono mb-1 text-ink/40">Navegar</span>
            <Link href="/veiculos" className="text-ink/70 hover:text-ink">
              Veículos
            </Link>
            <Link href="/painel/locador" className="text-ink/70 hover:text-ink">
              Anunciar
            </Link>
            <Link href="/login" className="text-ink/70 hover:text-ink">
              Entrar
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="label-mono mb-1 text-ink/40">Compromisso</span>
            <span className="text-ink/70">10% de comissão</span>
            <span className="text-ink/70">Contrato digital</span>
            <span className="text-ink/70">Caução protegida</span>
          </div>
        </nav>
      </div>
      <div className="border-t border-bone-200 py-5">
        <p className="label-mono mx-auto max-w-6xl px-6 text-ink/40">
          © 2026 E-DriveOn · Projeto P.A.L · Senac
        </p>
      </div>
    </footer>
  );
}
