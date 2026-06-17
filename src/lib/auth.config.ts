import type { NextAuthConfig } from "next-auth";
import type { Role } from "@prisma/client";

// Config edge-safe: SEM Prisma/bcrypt. Importada pelo proxy e pelo auth.ts completo.
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [], // o provider Credentials (Prisma + bcrypt) vive em auth.ts (runtime Node)
  callbacks: {
    // Roda no proxy: decide o acesso por rota/papel.
    authorized({ auth, request: { nextUrl } }) {
      const user = auth?.user;
      const { pathname } = nextUrl;

      const isProtected =
        pathname.startsWith("/painel") || pathname.startsWith("/reserva");
      if (!isProtected) return true;
      if (!user) return false; // → redireciona para /login

      const role = user.role;
      const home =
        role === "ADMIN"
          ? "/painel/admin"
          : role === "LOCADOR"
            ? "/painel/locador"
            : "/painel/locatario";

      // Cada área exige seu papel; quem erra a área cai no próprio painel.
      if (pathname.startsWith("/painel/admin") && role !== "ADMIN") {
        return Response.redirect(new URL(home, nextUrl));
      }
      if (pathname.startsWith("/painel/locador") && role !== "LOCADOR") {
        return Response.redirect(new URL(home, nextUrl));
      }
      if (pathname.startsWith("/painel/locatario") && role !== "LOCATARIO") {
        return Response.redirect(new URL(home, nextUrl));
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = (user as { role?: Role }).role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
