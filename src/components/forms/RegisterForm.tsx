"use client";

import Link from "next/link";
import { useActionState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { registerUser, type AuthFormState } from "@/actions/auth";
import { Button, LinkButton } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { RoleToggle } from "@/components/forms/RoleToggle";

export function RegisterForm() {
  const [state, action, pending] = useActionState<AuthFormState, FormData>(
    registerUser,
    undefined,
  );

  if (state?.success) {
    return (
      <div className="rounded-3xl border border-teal/30 bg-teal/10 p-8 text-center">
        <span className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-teal/15 text-teal">
          <CheckCircle2 size={26} />
        </span>
        <h3 className="font-display text-2xl text-ink">Cadastro em análise</h3>
        <p className="mt-2 text-sm text-ink/70">{state.message}</p>
        <LinkButton href="/login" variant="ink" className="mt-6">
          Ir para o login
        </LinkButton>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-5">
      <RoleToggle initial={state?.values?.role} />
      <p className="-mt-3 text-xs text-ink/50">
        Locador anuncia carros · Locatário aluga.
      </p>

      <Input
        label="Nome"
        name="name"
        autoComplete="name"
        placeholder="Seu nome"
        defaultValue={state?.values?.name}
        error={state?.errors?.name}
        required
      />
      <Input
        label="E-mail"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="voce@email.com"
        defaultValue={state?.values?.email}
        error={state?.errors?.email}
        required
      />
      <Input
        label="Senha"
        name="password"
        type="password"
        autoComplete="new-password"
        placeholder="Mínimo 8 caracteres"
        error={state?.errors?.password}
        required
      />

      {state?.message && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.message}</p>
      )}

      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Criando conta…" : "Criar conta"} <ArrowRight size={18} />
      </Button>

      <p className="text-center text-sm text-ink/60">
        Já tem conta?{" "}
        <Link href="/login" className="font-semibold text-ink underline-offset-2 hover:underline">
          Entrar
        </Link>
      </p>
    </form>
  );
}
