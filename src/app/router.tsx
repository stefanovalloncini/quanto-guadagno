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
const CompoundInterestPage = lazy(() =>
  import("@/ui/features/compound-interest").then((m) => ({
    default: m.CompoundInterestPage,
  })),
);
const NaspiPage = lazy(() => import("@/ui/features/naspi").then((m) => ({ default: m.NaspiPage })));
const PreavvisoPage = lazy(() =>
  import("@/ui/features/preavviso").then((m) => ({ default: m.PreavvisoPage })),
);
const InversePage = lazy(() =>
  import("@/ui/features/inverse").then((m) => ({ default: m.InversePage })),
);
const TredicesimaPage = lazy(() =>
  import("@/ui/features/tredicesima").then((m) => ({ default: m.TredicesimaPage })),
);
const InflationPage = lazy(() =>
  import("@/ui/features/inflation").then((m) => ({ default: m.InflationPage })),
);
const ComparisonPage = lazy(() =>
  import("@/ui/features/comparison").then((m) => ({ default: m.ComparisonPage })),
);
const EmployerCostPage = lazy(() =>
  import("@/ui/features/employer-cost").then((m) => ({ default: m.EmployerCostPage })),
);
const TfrPage = lazy(() => import("@/ui/features/tfr").then((m) => ({ default: m.TfrPage })));
const GlossarioPage = lazy(() =>
  import("@/ui/features/glossario").then((m) => ({ default: m.GlossarioPage })),
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
  { path: "/interesse-composto", element: lazyRoute(<CompoundInterestPage />) },
  { path: "/calcolo-naspi", element: lazyRoute(<NaspiPage />) },
  { path: "/preavviso-dimissioni", element: lazyRoute(<PreavvisoPage />) },
  { path: "/calcolo-netto-lordo", element: lazyRoute(<InversePage />) },
  { path: "/calcolo-tredicesima", element: lazyRoute(<TredicesimaPage />) },
  { path: "/inflazione", element: lazyRoute(<InflationPage />) },
  { path: "/confronto-stipendi", element: lazyRoute(<ComparisonPage />) },
  { path: "/costo-azienda", element: lazyRoute(<EmployerCostPage />) },
  { path: "/tfr", element: lazyRoute(<TfrPage />) },
  { path: "/glossario", element: lazyRoute(<GlossarioPage />) },
  { path: "/fonti", element: lazyRoute(<SourcesPage />) },
  { path: "/informazioni", element: lazyRoute(<AboutPage />) },
  { path: "*", element: lazyRoute(<NotFoundPage />) },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
