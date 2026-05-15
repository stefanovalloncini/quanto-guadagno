import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { EmployeePage } from "@/ui/features/employee-calculator";
import { ApprenticeshipPage } from "@/ui/features/apprenticeship";
import { ForfettarioPage } from "@/ui/features/forfettario";
import { HomePage } from "@/ui/features/home";
import { SourcesPage } from "@/ui/features/sources";
import { AboutPage } from "@/ui/features/about";
import { NotFoundPage } from "@/ui/features/not-found";
import { AppLayout } from "@/ui/shared/AppLayout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppLayout>
        <HomePage />
      </AppLayout>
    ),
  },
  {
    path: "/calcola-stipendio",
    element: (
      <AppLayout>
        <EmployeePage />
      </AppLayout>
    ),
  },
  {
    path: "/progressione-apprendistato",
    element: (
      <AppLayout>
        <ApprenticeshipPage />
      </AppLayout>
    ),
  },
  {
    path: "/partita-iva-forfettario",
    element: (
      <AppLayout>
        <ForfettarioPage />
      </AppLayout>
    ),
  },
  {
    path: "/fonti",
    element: (
      <AppLayout>
        <SourcesPage />
      </AppLayout>
    ),
  },
  {
    path: "/informazioni",
    element: (
      <AppLayout>
        <AboutPage />
      </AppLayout>
    ),
  },
  {
    path: "*",
    element: (
      <AppLayout>
        <NotFoundPage />
      </AppLayout>
    ),
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
