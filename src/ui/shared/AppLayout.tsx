import type { ReactNode } from "react";
import { AppHeader } from "./AppHeader.tsx";
import { AppFooter } from "./AppFooter.tsx";
import { SkipLink } from "./SkipLink.tsx";

export function AppLayout({ children }: { readonly children: ReactNode }) {
  return (
    <div className="qg-app-shell">
      <SkipLink targetId="main" />
      <AppHeader />
      <div className="qg-app-shell__content">{children}</div>
      <AppFooter />
    </div>
  );
}
