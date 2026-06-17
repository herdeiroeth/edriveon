import type { Role } from "@prisma/client";
import type { DefaultSession } from "next-auth";

// Aumenta os tipos do Auth.js para carregar `id` e `role` na sessão/JWT.
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }

  interface User {
    role: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
}
