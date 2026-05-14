import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "solid" | "quiet" | "link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: Variant;
  readonly children: ReactNode;
}

export function Button({
  variant = "solid",
  className,
  children,
  ...rest
}: ButtonProps) {
  const cls = ["qg-btn", `qg-btn--${variant}`, className]
    .filter(Boolean)
    .join(" ");
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
