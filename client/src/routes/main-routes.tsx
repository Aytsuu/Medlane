import MainLayout from "@/layouts/MainLayout";
import Dashboard from "@/pages/Dashboard";
import { patient_routes } from "./patient-routes";
import { withTransition } from "@/utils/withTransition";
import { employee_routes } from "./medicalemployee-routes";
import { appointment_routes } from "./appointment-routes";
import { Navigate } from "react-router";
import { billing_routes } from "./billing-routes";

export const main_routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: withTransition([
      {
        path: "/",
        element: <Navigate to="/dashboard"/>
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      ...patient_routes,
      ...employee_routes,
      ...appointment_routes,
      ...billing_routes
    ])
  }
]