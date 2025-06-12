import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../sidebar/sidebar";
import { useAuth } from "../../auth/auth.context"; // Importa contexto
import css from "../../../assets/styles/layout/protected.layout.module.scss";

const ProtectedLayout: React.FC = React.memo(() => {
  const { isLoading, isAuthenticated } = useAuth(); // Usa el estado

  // Evita renderizar si aún se está autenticando
  if (isLoading) {
    return <div className={css.loading}>Cargando...</div>;
  }

  // Si no está autenticado, evita renderizar
  if (!isAuthenticated) {
    return <div className={css.loading}>No autorizado</div>;
  }

  return (
    <div className={css.layoutContainer}>
      <Sidebar />
      <main className={css.mainContent}>
        <div className={css.mainBackground}>
          <Outlet />
        </div>
      </main>
    </div>
  );
});

export default ProtectedLayout;
