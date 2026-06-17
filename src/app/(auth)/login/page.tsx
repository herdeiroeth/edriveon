import type { Metadata } from "next";
import { LoginForm } from "@/components/forms/LoginForm";

export const metadata: Metadata = { title: "Entrar · E-DriveOn" };

export default function LoginPage() {
  return (
    <div>
      <p className="label-mono mb-2 text-ink/50">Bem-vindo de volta</p>
      <h2 className="font-display mb-8 text-5xl text-ink">
        Entrar<span className="text-volt">.</span>
      </h2>
      <LoginForm />
    </div>
  );
}
