// En features/login/login.tsx
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../components/auth/authContext";
import { useNavigate } from "react-router-dom";
import { Grid } from "../../components/common/grid/grid";
import { LoginForm } from "./loginForm";
import { authenticateUser } from "../../utils/authUtils";
import css from "./loginForm.module.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastMessage } from "../../components/common/toast-message/toastMessage";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const goTo = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      goTo("/dashboard");
    }
  }, [auth.isAuthenticated, goTo]);

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      try {
        const token = await authenticateUser(email, password);
        await auth.login(token);
        // Llama a ToastMessage como una función
        ToastMessage({ type: "success", message: "Inicio de sesión exitoso!" });
        goTo("/dashboard");
      } catch (error: any) {
        // Llama a ToastMessage como una función
        ToastMessage({
          type: "error",
          message: `Error al iniciar sesión: ${error.message}`,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [auth.login, goTo]
  );

  return (
    <Grid className={css.loginContainer}>
      <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
    </Grid>
  );
}
