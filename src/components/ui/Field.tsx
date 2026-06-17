import type { ComponentProps, ReactNode } from "react";

const inputBase =
  "w-full rounded-xl border border-ink/15 bg-bone px-4 py-3 text-sm text-ink placeholder:text-ink/40 transition-colors focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30";

function Label({ htmlFor, children }: { htmlFor?: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="label-mono mb-2 block text-ink/60">
      {children}
    </label>
  );
}

function ErrorText({ children }: { children?: ReactNode }) {
  if (!children) return null;
  return <p className="mt-1.5 text-xs text-red-700">{children}</p>;
}

type InputProps = ComponentProps<"input"> & { label?: string; error?: string };

export function Input({ label, error, id, name, className = "", ...props }: InputProps) {
  const fieldId = id ?? name;
  return (
    <div className={className}>
      {label && <Label htmlFor={fieldId}>{label}</Label>}
      <input
        id={fieldId}
        name={name}
        className={`${inputBase} ${error ? "border-red-500" : ""}`}
        {...props}
      />
      <ErrorText>{error}</ErrorText>
    </div>
  );
}

type TextareaProps = ComponentProps<"textarea"> & { label?: string; error?: string };

export function Textarea({ label, error, id, name, className = "", ...props }: TextareaProps) {
  const fieldId = id ?? name;
  return (
    <div className={className}>
      {label && <Label htmlFor={fieldId}>{label}</Label>}
      <textarea
        id={fieldId}
        name={name}
        className={`${inputBase} min-h-24 resize-y ${error ? "border-red-500" : ""}`}
        {...props}
      />
      <ErrorText>{error}</ErrorText>
    </div>
  );
}

type SelectProps = ComponentProps<"select"> & {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
};

export function Select({
  label,
  error,
  id,
  name,
  className = "",
  options,
  placeholder,
  ...props
}: SelectProps) {
  const fieldId = id ?? name;
  return (
    <div className={className}>
      {label && <Label htmlFor={fieldId}>{label}</Label>}
      <select
        id={fieldId}
        name={name}
        className={`${inputBase} appearance-none ${error ? "border-red-500" : ""}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ErrorText>{error}</ErrorText>
    </div>
  );
}
