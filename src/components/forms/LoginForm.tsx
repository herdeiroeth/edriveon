"use client";

import Link from "next/link";
import { useActionState } from "react";
import { ArrowRight } from "lucide-react";

import { authenticate, type AuthFormState } from "@/actions/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { RoleToggle } from "@/components/forms/RoleToggle";

export function LoginForm() {
  const [state, action, pending] = useActionState<AuthFormState, FormData>(
    authenticate,
    undefined,
  );

  return (
    <form action={action} className="flex flex-col gap-5">
      <RoleToggle />

      <Input
        label="E-mail"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="voce@email.com"
        required
      />
      <Input
        label="Senha"
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        required
      />

      <div className="flex items-center justify-between text-xs text-ink/60">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="keep" className="accent-teal" />
          Manter conectado
        </label>
        <span className="label-mono cursor-default">Esqueci a senha</span>
      </div>

      {state?.message && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.message}</p>
      )}

      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Entrando…" : "Entrar"} <ArrowRight size={18} />
      </Button>

      <p className="text-center text-sm text-ink/60">
        Ainda não tem conta?{" "}
        <Link href="/cadastro" className="font-semibold text-ink underline-offset-2 hover:underline">
          Cadastre-se
        </Link>
      </p>
    </form>
  );
}
