import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../services/api";

export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // plano vem via URL ?plan=PRO
  const plan = searchParams.get("plan") || "FREE";

  async function handleConfirm() {
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("Você precisa estar logado.");
        return;
      }

      const res = await api.updatePlan(token, plan);

      // 💡 O backend retorna "message" e "user", não "success"
      if (res.user) {
        setMessage("Plano atualizado com sucesso!");

        localStorage.setItem("user", JSON.stringify(res.user));

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        setMessage(res.message || "Erro ao atualizar plano");
      }
    } catch (error) {
      setMessage("Erro ao atualizar plano.");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Finalizar Plano</h2>

        <p className="text-center mb-6 text-gray-600">
          Você está escolhendo o plano{" "}
          <span className="font-bold">{plan}</span>.
        </p>

        {message && (
          <p className="text-center mb-4 text-blue-600 font-semibold">
            {message}
          </p>
        )}

        <button
          onClick={handleConfirm}
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Processando..." : "Confirmar Plano"}
        </button>

        <button
          onClick={() => navigate("/plans")}
          className="w-full mt-4 py-3 rounded-lg border font-semibold hover:bg-gray-200"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
