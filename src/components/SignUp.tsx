import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../services/api";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const res = await api.signUp({
        name,
        email,
        password,
        plan: "free",
      });

      if (res.error) {
        setMessage(res.error);
        setIsError(true);
        return;
      }

      if (res.message !== "Cadastro realizado com sucesso") {
        setMessage(res.message || "Erro ao cadastrar.");
        setIsError(true);
        return;
      }

      setMessage("🎉 Cadastro realizado com sucesso!");
      setTimeout(() => navigate("/signin"), 1000);
    } catch {
      setMessage("Erro ao conectar ao servidor.");
      setIsError(true);
    }

    setLoading(false);
  }

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light dark-bg px-3">
      <div className="card shadow p-4" style={{ width: "420px" }}>
        <h2 className="text-center mb-4">Criar conta</h2>

        {message && (
          <p
            className={`text-center fw-semibold ${
              isError ? "text-danger" : "text-success"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-3">
          <label className="form-label">Nome</label>
          <input
            className="form-control mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="form-label">Senha</label>
          <input
            type="password"
            className="form-control mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <p className="text-center mt-3">
          Já tem conta?{" "}
          <Link to="/signin" className="fw-semibold">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
