import type { ReactNode } from "react";
import { IntlProvider } from "@/ui/i18n";
import { ErrorBoundary } from "@/ui/shared/ErrorBoundary.tsx";

export function AppProviders({ children }: { readonly children: ReactNode }) {
  return (
    <ErrorBoundary>
      <IntlProvider>{children}</IntlProvider>
    </ErrorBoundary>
  );
}
