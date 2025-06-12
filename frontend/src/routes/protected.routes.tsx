import { Outlet } from "react-router-dom";
import { useAuth } from "../components/auth/auth.context";
import { LoadingSpinner } from "../components/ui/loading.spinner";
import { useProtectedRoute } from "../hooks/use.protected.route";

export const ProtectedRoute = () => {
  const isLoading = useProtectedRoute();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!useAuth().isAuthenticated) {
    return null;
  }

  return <Outlet />;
};
