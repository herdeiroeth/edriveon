import Link from "next/link";
import { LogOut, Car } from "lucide-react";

import { requireUser } from "@/lib/guards";
import { logout } from "@/actions/auth";
import { Logo } from "@/components/layout/Logo";
import { ROLE_LABEL } from "@/lib/constants";

export default async function PainelLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();

  return (
    <div className="flex min-h-screen flex-col bg-bone">
      <header className="sticky top-0 z-20 border-b border-bone-200 bg-bone/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Logo />
          <nav className="flex items-center gap-2">
            <Link
              href="/veiculos"
              className="hidden items-center gap-2 rounded-full px-4 py-2 text-sm text-ink/70 hover:text-ink sm:flex"
            >
              <Car size={16} /> Catálogo
            </Link>
            <span className="hidden text-right sm:block">
              <span className="block text-sm font-medium text-ink">{user.name}</span>
              <span className="label-mono block text-ink/45">{ROLE_LABEL[user.role]}</span>
            </span>
            <form action={logout}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm text-ink/70 transition-colors hover:border-ink/40 hover:text-ink"
              >
                <LogOut size={16} /> Sair
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">{children}</main>
    </div>
  );
}
