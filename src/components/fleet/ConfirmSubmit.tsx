"use client";

import type { ReactNode } from "react";

// Botão submit que pede confirmação antes de enviar o form (ex.: remover veículo).
export function ConfirmSubmit({
  message,
  className,
  children,
}: {
  message: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(ev) => {
        if (!window.confirm(message)) ev.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
