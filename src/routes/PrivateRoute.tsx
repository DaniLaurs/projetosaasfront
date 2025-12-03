// src/routes/PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  // Verifica se o usuário está logado
  const user = localStorage.getItem("user");

  if (!user) {
    // Se não estiver logado, redireciona para a página de login
    return <Navigate to="/signin" replace />;
  }

  // Se estiver logado, renderiza os filhos
  return <>{children}</>;
};

export default PrivateRoute;
