import { lazy } from "react";
import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { ProtectedRoute } from "./protectedRoutes";
import ProtectedLayout from "../components/layouts/protected-layout/protectedLayout";

const LoginPage = lazy(() => import("../pages/login/loginPage"));
const Signup = lazy(() => import("../pages/signup/signup"));
const Dashboard = lazy(() => import("../pages/dashboard/dashboard"));
const StudentProfile = lazy(
  () => import("../pages/student-profile/studentProfile")
);
const AddStudent = lazy(() => import("../pages/add-student/addStudent"));
const SchoolClass = lazy(() => import("../pages/school-class/schoolClass"));
const Statistics = lazy(() => import("../pages/statistics/statistics"));
const Chat = lazy(() => import("../pages/chat/chat"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <Signup />,
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
              { path: "chat", element: <Chat /> },
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
