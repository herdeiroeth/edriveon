import { Check, X } from "lucide-react";
import type { Role, UserStatus } from "@prisma/client";

import { approveUser, denyUser } from "@/actions/admin";
import { Badge } from "@/components/ui/Badge";
import { ConfirmSubmit } from "@/components/fleet/ConfirmSubmit";
import { ROLE_LABEL, USER_STATUS_LABEL } from "@/lib/constants";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  createdAt: Date;
};

const btn =
  "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors";

const statusTone = (s: UserStatus) =>
  s === "APROVADO" ? "teal" : s === "NEGADO" ? "muted" : "volt";

export function UserRow({ user }: { user: AdminUser }) {
  const since = new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(user.createdAt);

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-bone-200 bg-white/50 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-ink">{user.name}</h3>
          <Badge tone="muted">{ROLE_LABEL[user.role]}</Badge>
          <Badge tone={statusTone(user.status)}>{USER_STATUS_LABEL[user.status]}</Badge>
        </div>
        <p className="mt-0.5 text-sm text-ink/55">{user.email}</p>
        <p className="label-mono mt-1 text-ink/35">Cadastro · {since}</p>
      </div>

      <div className="flex shrink-0 gap-2">
        {user.status !== "APROVADO" && (
          <form action={approveUser.bind(null, user.id)}>
            <button
              type="submit"
              className={`${btn} bg-teal text-bone hover:bg-teal/90`}
            >
              <Check size={14} /> Aprovar
            </button>
          </form>
        )}
        {user.status !== "NEGADO" && (
          <form action={denyUser.bind(null, user.id)}>
            <ConfirmSubmit
              message={`Negar o cadastro de ${user.name} (${user.email})?`}
              className={`${btn} border border-red-300 text-red-600 hover:bg-red-50`}
            >
              <X size={14} /> Negar
            </ConfirmSubmit>
          </form>
        )}
      </div>
    </div>
  );
}
