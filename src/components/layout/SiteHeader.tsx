import Link from "next/link";

import { auth } from "@/lib/auth";
import { Logo } from "@/components/layout/Logo";
import { LinkButton } from "@/components/ui/Button";

export async function SiteHeader() {
  const session = await auth();
  const isLogged = !!session?.user;
  const role = session?.user?.role;
  const painelHref =
    role === "ADMIN"
      ? "/painel/admin"
      : role === "LOCADOR"
        ? "/painel/locador"
        : "/painel/locatario";

  const navLink = "text-sm text-ink/70 transition-colors hover:text-ink";

  return (
    <header className="sticky top-0 z-30 border-b border-bone-200 bg-bone/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo />

        <nav className="hidden items-center gap-7 md:flex">
          <Link href="/veiculos" className={navLink}>
            Veículos
          </Link>
          <Link href="/painel/locatario" className={navLink}>
            Minhas reservas
          </Link>
          <Link href="/painel/locador" className={navLink}>
            Anunciar
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {isLogged ? (
            <LinkButton href={painelHref} variant="outline" size="sm">
              Meu painel
            </LinkButton>
          ) : (
            <Link href="/login" className={`hidden sm:block ${navLink}`}>
              Entrar
            </Link>
          )}
          <LinkButton href="/veiculos" size="sm">
            Alugar agora
          </LinkButton>
        </div>
      </div>
    </header>
  );
}
