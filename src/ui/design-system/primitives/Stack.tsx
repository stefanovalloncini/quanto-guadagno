import type { CSSProperties, ReactNode } from "react";

type Gap = "xs" | "sm" | "md" | "lg" | "xl";

const gapVar: Record<Gap, string> = {
  xs: "var(--space-1)",
  sm: "var(--space-2)",
  md: "var(--space-4)",
  lg: "var(--space-6)",
  xl: "var(--space-8)",
};

export interface StackProps {
  direction?: "row" | "column";
  gap?: Gap;
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  wrap?: boolean;
  as?: "div" | "section" | "ul";
  children: ReactNode;
}

export function Stack({
  direction = "column",
  gap = "md",
  align,
  justify,
  wrap,
  as = "div",
  children,
}: StackProps) {
  const Tag = as;
  const style: CSSProperties = {
    display: "flex",
    flexDirection: direction,
    gap: gapVar[gap],
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap ? "wrap" : "nowrap",
  };
  return <Tag style={style}>{children}</Tag>;
}
