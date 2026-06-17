import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "volt" | "ink" | "teal" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal";

const variants: Record<Variant, string> = {
  volt: "bg-volt text-ink hover:bg-volt/90",
  ink: "bg-ink text-bone hover:bg-ink/90",
  teal: "bg-teal text-bone hover:bg-teal/90",
  outline: "border border-ink/20 text-ink hover:border-ink/50 hover:bg-ink/5",
  ghost: "text-ink/70 hover:text-ink hover:bg-ink/5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

export function buttonClass(variant: Variant = "volt", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
};

export function Button({ variant = "volt", size = "md", className = "", ...props }: ButtonProps) {
  return <button className={buttonClass(variant, size, className)} {...props} />;
}

type LinkButtonProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function LinkButton({
  variant = "volt",
  size = "md",
  className = "",
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link className={buttonClass(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}
