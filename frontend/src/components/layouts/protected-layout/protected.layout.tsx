import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../sidebar/sidebar";
import css from "../../../assets/styles/layout/protected.layout.module.scss";

const ProtectedLayout: React.FC = React.memo(() => {
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
