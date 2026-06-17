import { Zap } from "lucide-react";

const ITEMS = [
  "Mediadora P2P",
  "Não somos donos dos carros",
  "Diárias a partir de R$ 129",
  "Apenas 10% de comissão",
  "12 modelos",
  "5 cidades",
];

export function Ticker() {
  // Conteúdo duplicado para loop contínuo (translateX -50%).
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden border-y border-ink/10 bg-ink py-3 text-bone">
      <div className="flex w-max animate-ticker gap-8 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="label-mono flex items-center gap-8 text-bone/80">
            <Zap size={12} className="text-volt" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
