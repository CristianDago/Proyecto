// src/hooks/useDecodeToken.ts
import { useState, useEffect } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import * as Sentry from "@sentry/react";

interface DecodedToken extends JwtPayload {
  // Ajusta la interfaz según la estructura real de tu token
  uid?: string;
  email?: string;
  exp?: number; // Ejemplo: si tu token tiene fecha de expiración
  // ... otras propiedades de tu token
}

interface UseDecodeTokenResult {
  userId: string | null;
  email: string | null;
  error: string | null;
  decodeToken: (token: string | null) => DecodedToken | null;
}

export const useDecodeToken = (
  initialToken: string | null
): UseDecodeTokenResult => {
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const decodeToken = (token: string | null): DecodedToken | null => {
    if (!token) {
      setUserId(null);
      setEmail(null);
      setError(null);
      return null;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      setUserId(decoded.uid || null);
      setEmail(decoded.email || null);
      setError(null);
      return decoded;
    } catch (err) {
      const error = err as Error;
      Sentry.captureException(error);
      setUserId(null);
      setEmail(null);
      setError("Error al decodificar el token.");
      return null;
    }
  };

  useEffect(() => {
    decodeToken(initialToken);
  }, [initialToken]);

  return { userId, email, error, decodeToken };
};
