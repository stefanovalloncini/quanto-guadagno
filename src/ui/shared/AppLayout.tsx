import type { ReactNode } from "react";
import { AppHeader } from "./AppHeader.tsx";
import { AppFooter } from "./AppFooter.tsx";
import { SkipLink } from "./SkipLink.tsx";
import { ErrorBoundary } from "./ErrorBoundary.tsx";
import { PageMeta } from "./PageMeta.tsx";

interface AppLayoutProps {
  readonly children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <PageMeta />
      <SkipLink />
      <AppHeader />
      <main id="main" className="qg-main">
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
      <AppFooter />
    </>
  );
}
