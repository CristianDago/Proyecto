// src/features/login/login.form.tsx
import { useState } from "react";
import { InputField } from "../../components/common/input-field/Input.field";

import css from "../../assets/styles/layout/login.form.module.scss";
import LoginFormProps from "../../interface/login/login.form.props";
import logo from "../../assets/images/LOGO-escuelas.png";

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form className={css.loginForm} onSubmit={handleSubmit}>
      <div className={css.inputTitle}>
        <img src={logo} alt="logo" className={css.logo} />
        <h2>Inicio de sesión</h2>
      </div>

      <InputField
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputField
        id="password"
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className={css.loginButton} disabled={isLoading}>
        {isLoading ? "Cargando..." : "Entrar"}{" "}
      </button>
    </form>
  );
};
