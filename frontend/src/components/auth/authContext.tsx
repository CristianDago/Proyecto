// src/components/auth/authContext.tsx
import { useContext, createContext, useState, useEffect, useMemo, useCallback } from "react";
import { useAuthStorage } from "./authStorage";
import { useDecodeToken } from "../../hooks/useDecodeToken";
import AuthProviderProps from "../../interface/auth/authProviderProps";
import AuthContextType from "../../interface/auth/authContextType";

const AuthContext = createContext<AuthContextType>({
  token: null,
  userId: null,
  email: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  isLoading: false,
  loginError: null,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { token: storedToken, updateToken, clearToken } = useAuthStorage();
  const { userId, email, decodeToken } = useDecodeToken(storedToken);
  const [isAuthenticated, setIsAuthenticated] = useState(!!storedToken);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    setIsAuthenticated(!!storedToken);
  }, [storedToken]);

  const login = useCallback(
    async (newToken: string) => {
      setIsLoading(true);
      setLoginError(null);
      try {
        decodeToken(newToken); // Decodifica el token
        await updateToken(newToken); // Guarda el token
        setIsAuthenticated(true); // Actualiza el estado de autenticación
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        clearToken();
        setIsAuthenticated(false);
        setLoginError("Credenciales inválidas o token corrupto.");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [updateToken, clearToken, decodeToken, setIsAuthenticated]
  );

  const logout = useCallback(() => {
    clearToken();
    setIsAuthenticated(false);
    setLoginError(null);
  }, [clearToken, setIsAuthenticated]);

  const value = useMemo(
    () => ({
      token: storedToken,
      userId,
      email,
      isAuthenticated,
      isLoading,
      login,
      logout,
      loginError,
    }),
    [
      storedToken,
      userId,
      email,
      isAuthenticated,
      isLoading,
      login,
      logout,
      loginError,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
