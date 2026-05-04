import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

const variantClass: Record<Variant, string> = {
  primary: "qg-btn qg-btn--primary",
  secondary: "qg-btn qg-btn--secondary",
  ghost: "qg-btn qg-btn--ghost",
};

export function Button({ variant = "primary", className, children, ...rest }: ButtonProps) {
  const cls = [variantClass[variant], className].filter(Boolean).join(" ");
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
