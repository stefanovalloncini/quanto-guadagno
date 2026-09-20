import type { CSSProperties, ReactNode } from "react";

type Gap = "xs" | "sm" | "md" | "lg" | "xl";

const gapVar: Record<Gap, string> = {
  xs: "var(--s-1)",
  sm: "var(--s-2)",
  md: "var(--s-4)",
  lg: "var(--s-6)",
  xl: "var(--s-8)",
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
