import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { ComparisonPage } from "@/ui/features/comparison";
import { DataSourcesPage } from "@/ui/features/data-sources";
import { EmployeePage } from "@/ui/features/employee-calculator";
import { FreelancerPage } from "@/ui/features/freelancer-calculator";
import { HomePage } from "@/ui/features/home";
import { StatisticsPage } from "@/ui/features/statistics";
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
    path: "/calcolo-partita-iva",
    element: (
      <AppLayout>
        <FreelancerPage />
      </AppLayout>
    ),
  },
  {
    path: "/confronto-scenari",
    element: (
      <AppLayout>
        <ComparisonPage />
      </AppLayout>
    ),
  },
  {
    path: "/statistiche",
    element: (
      <AppLayout>
        <StatisticsPage />
      </AppLayout>
    ),
  },
  {
    path: "/fonti-dati",
    element: (
      <AppLayout>
        <DataSourcesPage />
      </AppLayout>
    ),
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
