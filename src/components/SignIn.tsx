import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../services/api";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await api.signIn({ email, password });

      if (res.error) return setMessage(res.error);
      if (!res.token) return setMessage("Erro inesperado ao entrar.");

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      setMessage("Login realizado com sucesso!");

      setTimeout(() => navigate("/dashboard"), 800);
    } catch {
      setMessage("Erro ao fazer login");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light dark-bg">
      <div className="card shadow p-4" style={{ width: "380px" }}>
        <h2 className="text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="form-control mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Senha"
            className="form-control mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn btn-primary w-100">Entrar</button>
        </form>

        {message && (
          <p className="text-danger text-center mt-3 fw-semibold">{message}</p>
        )}

        <p className="text-center mt-3">
          Não tem conta?{" "}
          <Link to="/signup" className="fw-semibold">
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}
