// src/hooks/useLogin.ts
import { useState, useCallback } from "react";
import { useAuthStorage } from "../components/auth/authStorage";
import { useDecodeToken } from "./useDecodeToken";
import * as Sentry from "@sentry/react";

interface UseLoginResult {
  isLoading: boolean;
  loginError: string | null;
  login: (newToken: string) => Promise<void>;
}

export const useLogin = (): UseLoginResult => {
  const { updateToken, clearToken } = useAuthStorage();
  const { decodeToken } = useDecodeToken(null); // No necesitamos el estado inicial aquí
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const login = useCallback(
    async (newToken: string) => {
      setIsLoading(true);
      setLoginError(null);
      try {
        const decoded = decodeToken(newToken);
        if (decoded) {
          updateToken(newToken);
          // Aquí podrías devolver información adicional del token si es necesario
        } else {
          clearToken();
          setLoginError("Credenciales inválidas o token corrupto.");
          throw new Error("Invalid or corrupt token");
        }
      } catch (error) {
        Sentry.captureException(error);
        clearToken();
        setLoginError("Credenciales inválidas o token corrupto.");
        throw error; // Propagar el error para que el componente llamante pueda manejarlo
      } finally {
        setIsLoading(false);
      }
    },
    [updateToken, clearToken, decodeToken]
  );

  return { isLoading, loginError, login };
};
