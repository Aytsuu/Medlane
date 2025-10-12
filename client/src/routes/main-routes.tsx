import MainLayout from "@/layouts/MainLayout";
import Dashboard from "@/pages/Dashboard";
import { patient_routes } from "./patient-routes";
import { withTransition } from "@/utils/withTransition";
import { employee_routes } from "./medicalemployee-routes";

export const main_routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: withTransition([
      {
        path: "/",
        element: <Dashboard />
      },
      ...patient_routes,
      ...employee_routes
    ])
  }
]