// Next.js 16: "middleware" foi renomeado para "proxy". Mesma função.
// Só a config edge-safe (sem Prisma/bcrypt) decide o acesso por rota.
import NextAuth from "next-auth";
import type { NextRequest } from "next/server";
import type { NextFetchEvent } from "next/server";
import { authConfig } from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

// Função nomeada explícita para o analisador do Next reconhecer o export.
export function proxy(request: NextRequest, event: NextFetchEvent) {
  return (auth as unknown as (req: NextRequest, ev: NextFetchEvent) => unknown)(
    request,
    event,
  );
}

export const config = {
  // Protege apenas painéis e reserva. Landing, catálogo e detalhe são públicos.
  matcher: ["/painel/:path*", "/reserva/:path*"],
};
