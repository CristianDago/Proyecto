import { Outlet } from "react-router-dom";
import { useAuth } from "../components/auth/authContext";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { useProtectedRoute } from "../hooks/useProtectedRoute";

export const ProtectedRoute = () => {
  const isLoading = useProtectedRoute();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!useAuth().isAuthenticated) {
    return null; // Evita flash de contenido no autorizado
  }

  return <Outlet />;
};
