import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { EmployeePage } from "@/ui/features/employee-calculator";
import { HomePage } from "@/ui/features/home";
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
  { path: "*", element: <Navigate to="/" replace /> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
