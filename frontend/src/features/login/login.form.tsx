import { useState } from "react";
import FormInput from "../../components/common/forms/form.input";
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

      <FormInput
        id="email"
        label="Email"
        name="email"
        type="email"
        value={email}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
        ) => setEmail(e.target.value)}
        autocomplete="username"
      />

      <FormInput
        id="password"
        label="Contraseña"
        name="password"
        type="password"
        value={password}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
        ) => setPassword(e.target.value)}
        autocomplete="current-password"
      />

      <button className={css.loginButton} disabled={isLoading}>
        {isLoading ? "Cargando..." : "Entrar"}
      </button>
    </form>
  );
};
