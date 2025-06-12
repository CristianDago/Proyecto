import { useCallback } from "react";
import { useAuthStorage } from "../components/auth/auth.storage";

interface UseLogoutResult {
  logout: () => void;
}

export const useLogout = (): UseLogoutResult => {
  const { clearToken } = useAuthStorage();

  const logout = useCallback(() => {
    clearToken();
  }, [clearToken]);

  return { logout };
};
