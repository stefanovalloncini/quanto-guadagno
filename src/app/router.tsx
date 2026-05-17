import { lazy, Suspense, type ReactNode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "@/ui/features/home";
import { AppLayout } from "@/ui/shared/AppLayout.tsx";

const EmployeePage = lazy(() =>
  import("@/ui/features/employee-calculator").then((m) => ({ default: m.EmployeePage })),
);
const ApprenticeshipPage = lazy(() =>
  import("@/ui/features/apprenticeship").then((m) => ({ default: m.ApprenticeshipPage })),
);
const SalaryHistoryPage = lazy(() =>
  import("@/ui/features/salary-history").then((m) => ({ default: m.SalaryHistoryPage })),
);
const ForfettarioPage = lazy(() =>
  import("@/ui/features/forfettario").then((m) => ({ default: m.ForfettarioPage })),
);
const SourcesPage = lazy(() =>
  import("@/ui/features/sources").then((m) => ({ default: m.SourcesPage })),
);
const AboutPage = lazy(() => import("@/ui/features/about").then((m) => ({ default: m.AboutPage })));
const NotFoundPage = lazy(() =>
  import("@/ui/features/not-found").then((m) => ({ default: m.NotFoundPage })),
);

function lazyRoute(node: ReactNode) {
  return (
    <AppLayout>
      <Suspense fallback={null}>{node}</Suspense>
    </AppLayout>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppLayout>
        <HomePage />
      </AppLayout>
    ),
  },
  { path: "/calcola-stipendio", element: lazyRoute(<EmployeePage />) },
  { path: "/progressione-apprendistato", element: lazyRoute(<ApprenticeshipPage />) },
  { path: "/storico-stipendio", element: lazyRoute(<SalaryHistoryPage />) },
  { path: "/partita-iva-forfettario", element: lazyRoute(<ForfettarioPage />) },
  { path: "/fonti", element: lazyRoute(<SourcesPage />) },
  { path: "/informazioni", element: lazyRoute(<AboutPage />) },
  { path: "*", element: lazyRoute(<NotFoundPage />) },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
