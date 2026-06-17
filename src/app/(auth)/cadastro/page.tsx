import type { Metadata } from "next";
import { RegisterForm } from "@/components/forms/RegisterForm";

export const metadata: Metadata = { title: "Criar conta · E-DriveOn" };

export default function CadastroPage() {
  return (
    <div>
      <p className="label-mono mb-2 text-ink/50">Comece agora</p>
      <h2 className="font-display mb-8 text-5xl text-ink">
        Criar conta<span className="text-volt">.</span>
      </h2>
      <RegisterForm />
    </div>
  );
}
