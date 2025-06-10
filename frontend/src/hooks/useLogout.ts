// src/hooks/useLogout.ts
import { useCallback } from "react";
import { useAuthStorage } from "../components/auth/authStorage";

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
