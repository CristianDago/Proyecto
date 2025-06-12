import { lazy } from "react";
import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { ProtectedRoute } from "./protected.routes";
import ProtectedLayout from "../components/layouts/protected-layout/protected.layout";

const LoginPage = lazy(() => import("../pages/login.page"));
const Dashboard = lazy(() => import("../pages/dashboard"));
const StudentProfile = lazy(() => import("../pages/student.profile"));
const AddStudent = lazy(() => import("../pages/add.student"));
const SchoolClass = lazy(() => import("../pages/school.class"));
const Statistics = lazy(() => import("../pages/statistics"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: "/dashboard",
            children: [
              { index: true, element: <Dashboard /> },
              { path: "student/:id", element: <StudentProfile /> },
              { path: "add-student", element: <AddStudent /> },
              { path: ":school/:course", element: <SchoolClass /> },
              { path: "estadisticas", element: <Statistics /> },
            ],
          },
        ],
      },
    ],
  },
];

interface AppRouter extends ReturnType<typeof createBrowserRouter> {}
export const router: AppRouter = createBrowserRouter(routes);
