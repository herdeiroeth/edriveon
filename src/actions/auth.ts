"use server";

import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";

import { signIn, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { registerSchema, flattenZodErrors } from "@/lib/validations";

export type AuthFormState =
  | {
      errors?: Record<string, string>;
      message?: string;
      success?: boolean;
      values?: { name?: string; email?: string; role?: string };
    }
  | undefined;

function panelFor(role: string | undefined) {
  if (role === "ADMIN") return "/painel/admin";
  return role === "LOCADOR" ? "/painel/locador" : "/painel/locatario";
}

// ─── Cadastro ──────────────────────────────────────────────────────────────
export async function registerUser(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  };

  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      errors: flattenZodErrors(parsed.error),
      values: {
        name: String(raw.name ?? ""),
        email: String(raw.email ?? ""),
        role: String(raw.role ?? ""),
      },
    };
  }

  const { name, email, password, role } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return {
      errors: { email: "Este e-mail já está cadastrado." },
      values: { name, email, role },
    };
  }

  const passwordHash = await bcrypt.hash(password, 12);
  // Novo cadastro entra como PENDENTE (default no schema) — sem login automático.
  await prisma.user.create({ data: { name, email, passwordHash, role } });

  return {
    success: true,
    message:
      "Cadastro enviado! Sua conta está em análise pela equipe interna. Você poderá entrar assim que for aprovada.",
  };
}

// ─── Login ───────────────────────────────────────────────────────────────
export async function authenticate(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  // O toggle de papel é só uma dica de destino; o proxy corrige se divergir do papel real.
  const redirectTo = panelFor(String(formData.get("role") ?? ""));
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  try {
    await signIn("credentials", { email, password, redirectTo });
  } catch (error) {
    if (error instanceof AuthError) {
      // Distingue aprovação pendente/negada de credenciais inválidas — sem
      // enumeração: o status só é revelado se a senha realmente confere.
      const user = await prisma.user.findUnique({ where: { email } });
      if (user && (await bcrypt.compare(password, user.passwordHash))) {
        if (user.status === "PENDENTE") {
          return { message: "Sua conta está aguardando aprovação interna." };
        }
        if (user.status === "NEGADO") {
          return { message: "Seu cadastro não foi aprovado. Entre em contato com o suporte." };
        }
      }
      return { message: "E-mail ou senha inválidos." };
    }
    throw error; // NEXT_REDIRECT — deve propagar
  }
  return undefined;
}

// ─── Logout ────────────────────────────────────────────────────────────────
export async function logout() {
  await signOut({ redirectTo: "/" });
}
