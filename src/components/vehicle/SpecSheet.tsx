import { Zap, Gauge, Timer, Plug, Users, Briefcase, Wind, BatteryCharging } from "lucide-react";
import type { Vehicle } from "@prisma/client";

export function SpecSheet({ vehicle }: { vehicle: Vehicle }) {
  const specs = [
    { icon: Zap, label: "Autonomia", value: `${vehicle.rangeKm} km` },
    { icon: Gauge, label: "Potência", value: `${vehicle.powerCv} cv` },
    { icon: Timer, label: "0-100", value: `${vehicle.accel0to100}s` },
    { icon: Plug, label: "Consumo", value: `${vehicle.consumptionKwh} kWh/100km` },
    { icon: Users, label: "Lugares", value: String(vehicle.seats) },
    { icon: Briefcase, label: "Porta-malas", value: `${vehicle.trunkLiters}L` },
    { icon: Wind, label: "Vel. máx", value: `${vehicle.topSpeedKmh} km/h` },
    { icon: BatteryCharging, label: "Bateria", value: `${vehicle.batteryKwh} kWh` },
  ];

  return (
    <div className="rounded-3xl bg-ink p-7 text-bone">
      <p className="label-mono mb-5 text-volt">Specs · ficha técnica</p>
      <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
        {specs.map(({ icon: Icon, label, value }) => (
          <div key={label}>
            <span className="mb-1.5 flex items-center gap-1.5 text-bone/50">
              <Icon size={14} className="text-volt" />
              <span className="label-mono">{label}</span>
            </span>
            <p className="font-display text-2xl text-bone">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
