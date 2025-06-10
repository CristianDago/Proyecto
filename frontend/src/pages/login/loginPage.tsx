import React from "react";
import PublicLayout from "../../components/layouts/public-layout/publicLayout";
import Login from "../../features/login/login";

const LoginPage: React.FC = () => {
  return (
    <PublicLayout>
      <Login />
    </PublicLayout>
  );
};

export default LoginPage;
