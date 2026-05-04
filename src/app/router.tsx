import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { EmployeePage } from "@/ui/features/employee-calculator";
import { SkipLink } from "@/ui/shared/SkipLink.tsx";

const Root = () => (
  <>
    <SkipLink targetId="main" />
    <EmployeePage />
  </>
);

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/calcola-stipendio" replace /> },
  { path: "/calcola-stipendio", element: <Root /> },
  { path: "*", element: <Navigate to="/calcola-stipendio" replace /> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
