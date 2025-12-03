// src/pages/Plans.tsx
import  { type JSX } from "react";

export function Plans(): JSX.Element {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Planos disponíveis</h2>

      <div className="row g-4 justify-content-center">

        {/* Plano Básico */}
        <div className="col-md-4">
          <div className="card shadow h-100 text-center">
            <div className="card-header bg-primary text-white">
              <h4 className="my-2">Plano Básico</h4>
            </div>
            <div className="card-body">
              <h2 className="card-title">R$ 29/mês</h2>
              <ul className="list-unstyled mt-3 mb-4">
                <li>✔ 5 projetos</li>
                <li>✔ 3 usuários</li>
                <li>✔ Suporte básico</li>
              </ul>
              <button className="btn btn-primary w-100">Assinar</button>
            </div>
          </div>
        </div>

        {/* Plano Pro */}
        <div className="col-md-4">
          <div className="card shadow h-100 text-center border-primary">
            <div className="card-header bg-success text-white">
              <h4 className="my-2">Plano Pro</h4>
            </div>
            <div className="card-body">
              <h2 className="card-title">R$ 59/mês</h2>
              <ul className="list-unstyled mt-3 mb-4">
                <li>✔ Projetos ilimitados</li>
                <li>✔ 10 usuários</li>
                <li>✔ Suporte avançado</li>
              </ul>
              <button className="btn btn-success w-100">Assinar</button>
            </div>
          </div>
        </div>

        {/* Plano Premium */}
        <div className="col-md-4">
          <div className="card shadow h-100 text-center">
            <div className="card-header bg-dark text-white">
              <h4 className="my-2">Plano Premium</h4>
            </div>
            <div className="card-body">
              <h2 className="card-title">R$ 99/mês</h2>
              <ul className="list-unstyled mt-3 mb-4">
                <li>✔ Projetos ilimitados</li>
                <li>✔ Usuários ilimitados</li>
                <li>✔ Suporte prioritário 24/7</li>
              </ul>
              <button className="btn btn-dark w-100">Assinar</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Plans;
