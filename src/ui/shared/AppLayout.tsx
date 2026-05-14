import type { ReactNode } from "react";
import { AppHeader } from "./AppHeader.tsx";
import { AppFooter } from "./AppFooter.tsx";
import { SkipLink } from "./SkipLink.tsx";
import { ErrorBoundary } from "./ErrorBoundary.tsx";

interface AppLayoutProps {
  readonly children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <SkipLink />
      <AppHeader />
      <main id="main" className="qg-main">
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
      <AppFooter />
    </>
  );
}
