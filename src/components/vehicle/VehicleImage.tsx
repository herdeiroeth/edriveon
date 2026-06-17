import { Zap, Leaf } from "lucide-react";
import type { VehicleType } from "@prisma/client";

// Imagem editorial do veículo: usa a 1ª foto se houver, senão um gradiente da marca.
export function VehicleImage({
  brand,
  model,
  type,
  photo,
  className = "",
}: {
  brand: string;
  model: string;
  type: VehicleType;
  photo?: string | null;
  className?: string;
}) {
  if (photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photo}
        alt={`${brand} ${model}`}
        className={`size-full object-cover ${className}`}
      />
    );
  }

  const grad =
    type === "ELETRICO"
      ? "from-teal/40 via-ink to-ink"
      : "from-cyan/40 via-ink to-ink";

  return (
    <div
      className={`relative flex size-full flex-col justify-between overflow-hidden bg-gradient-to-br ${grad} p-5 ${className}`}
    >
      <div className="absolute -right-8 -top-8 size-40 rounded-full bg-volt/10 blur-2xl" />
      <span className="flex items-center gap-2 self-end rounded-full bg-bone/10 px-2 py-1 text-volt">
        {type === "ELETRICO" ? <Zap size={14} /> : <Leaf size={14} />}
      </span>
      <span className="font-display text-3xl text-bone/90">{model}</span>
    </div>
  );
}
