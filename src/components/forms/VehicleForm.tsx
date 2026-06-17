"use client";

import { useActionState } from "react";
import { Save } from "lucide-react";

import type { VehicleFormState } from "@/actions/vehicles";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { VEHICLE_TYPE_LABEL, CATEGORY_LABEL } from "@/lib/constants";

type Action = (prev: VehicleFormState, fd: FormData) => Promise<VehicleFormState>;

const TYPE_OPTIONS = (Object.keys(VEHICLE_TYPE_LABEL) as (keyof typeof VEHICLE_TYPE_LABEL)[]).map(
  (v) => ({ value: v, label: VEHICLE_TYPE_LABEL[v] }),
);
const CATEGORY_OPTIONS = (Object.keys(CATEGORY_LABEL) as (keyof typeof CATEGORY_LABEL)[]).map(
  (v) => ({ value: v, label: CATEGORY_LABEL[v] }),
);

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-3xl border border-bone-200 bg-white/40 p-6">
      <legend className="label-mono px-2 text-teal">{title}</legend>
      <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </fieldset>
  );
}

export function VehicleForm({
  action,
  defaults = {},
  submitLabel = "Publicar veículo",
}: {
  action: Action;
  defaults?: Record<string, string>;
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState<VehicleFormState, FormData>(
    action,
    undefined,
  );

  const v = (k: string) => state?.values?.[k] ?? defaults[k] ?? "";
  const e = (k: string) => state?.errors?.[k];

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <Section title="Identificação">
        <Input label="Marca" name="brand" defaultValue={v("brand")} error={e("brand")} placeholder="Volvo" required />
        <Input label="Modelo" name="model" defaultValue={v("model")} error={e("model")} placeholder="XC40 Recharge" required />
        <Input label="Ano" name="year" type="number" defaultValue={v("year") || "2024"} error={e("year")} required />
        <Select label="Tipo" name="type" options={TYPE_OPTIONS} defaultValue={v("type")} error={e("type")} placeholder="Selecione" required />
        <Select label="Categoria" name="category" options={CATEGORY_OPTIONS} defaultValue={v("category")} error={e("category")} placeholder="Selecione" required />
        <Input label="Cor" name="color" defaultValue={v("color")} error={e("color")} placeholder="Pebble Grey" required />
      </Section>

      <Section title="Localização">
        <Input label="Cidade" name="city" defaultValue={v("city") || "São Paulo"} error={e("city")} required />
        <Input label="Bairro" name="neighborhood" defaultValue={v("neighborhood")} error={e("neighborhood")} placeholder="Pinheiros" />
      </Section>

      <Section title="Preço (R$)">
        <Input label="Diária" name="dailyPrice" type="number" step="0.01" defaultValue={v("dailyPrice")} error={e("dailyPrice")} placeholder="289" required />
        <Input label="Caução" name="deposit" type="number" step="0.01" defaultValue={v("deposit")} error={e("deposit")} placeholder="1500" required />
      </Section>

      <Section title="Ficha técnica">
        <Input label="Autonomia (km)" name="rangeKm" type="number" defaultValue={v("rangeKm")} error={e("rangeKm")} placeholder="418" required />
        <Input label="Potência (cv)" name="powerCv" type="number" defaultValue={v("powerCv")} error={e("powerCv")} placeholder="408" required />
        <Input label="0-100 (s)" name="accel0to100" type="number" step="0.1" defaultValue={v("accel0to100")} error={e("accel0to100")} placeholder="4.9" required />
        <Input label="Consumo (kWh/100km)" name="consumptionKwh" type="number" step="0.1" defaultValue={v("consumptionKwh")} error={e("consumptionKwh")} placeholder="18.5" required />
        <Input label="Lugares" name="seats" type="number" defaultValue={v("seats") || "5"} error={e("seats")} required />
        <Input label="Porta-malas (L)" name="trunkLiters" type="number" defaultValue={v("trunkLiters")} error={e("trunkLiters")} placeholder="452" required />
        <Input label="Vel. máx (km/h)" name="topSpeedKmh" type="number" defaultValue={v("topSpeedKmh")} error={e("topSpeedKmh")} placeholder="180" required />
        <Input label="Bateria (kWh)" name="batteryKwh" type="number" step="0.1" defaultValue={v("batteryKwh")} error={e("batteryKwh")} placeholder="78" required />
      </Section>

      <fieldset className="rounded-3xl border border-bone-200 bg-white/40 p-6">
        <legend className="label-mono px-2 text-teal">Equipamentos & fotos</legend>
        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Textarea
            label="Equipamentos (um por linha)"
            name="features"
            defaultValue={v("features")}
            error={e("features")}
            placeholder={"Piloto automático adaptativo\nCâmera 360°\nCarregamento DC 150kW"}
          />
          <Textarea
            label="Fotos — URLs (uma por linha)"
            name="photos"
            defaultValue={v("photos")}
            error={e("photos")}
            placeholder={"https://images.unsplash.com/..."}
          />
        </div>
      </fieldset>

      {state?.message && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.message}</p>
      )}

      <div className="flex justify-end gap-3">
        <Button type="submit" size="lg" disabled={pending}>
          <Save size={18} /> {pending ? "Salvando…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
