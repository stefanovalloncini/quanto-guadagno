import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { EmployeePage } from "@/ui/features/employee-calculator";
import { AppLayout } from "@/ui/shared/AppLayout.tsx";

const router = createBrowserRouter([
  {
    path: "/calcola-stipendio",
    element: (
      <AppLayout>
        <EmployeePage />
      </AppLayout>
    ),
  },
  { path: "/", element: <Navigate to="/calcola-stipendio" replace /> },
  { path: "*", element: <Navigate to="/calcola-stipendio" replace /> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
