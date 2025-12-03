
import { Link } from "react-router-dom";

export function Dashboard() {
  const toggleTheme = () => {
    const html = document.documentElement;
    const isDark = html.classList.toggle("dark");

    localStorage.theme = isDark ? "dark" : "light";
  };

  return (
    <div className="min-vh-100 p-4 bg-light dark-bg text-dark dark-text">
      <div className="container">

        <div className="text-center mb-4">
          <h1 className="fw-bold">Bem-vinda ao Dashboard 👋</h1>
          <p>Gerencie tarefas, acompanhe métricas e veja seus planos.</p>

          <button onClick={toggleTheme} className="btn btn-dark mt-2">
            Alternar Dark Mode 🌙
          </button>
        </div>

        <div className="row g-4 text-center">
          <div className="col-sm-4">
            <div className="card p-4 shadow">
              <h5>Tarefas Ativas</h5>
              <p className="fs-3 fw-bold text-primary">12</p>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="card p-4 shadow">
              <h5>Concluídas</h5>
              <p className="fs-3 fw-bold text-success">34</p>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="card p-4 shadow">
              <h5>Pendentes</h5>
              <p className="fs-3 fw-bold text-danger">5</p>
            </div>
          </div>
        </div>

        <div className="card shadow p-4 mt-4">
          <h4>Gráfico de Progresso</h4>
          <img
            src="https://quickchart.io/chart?c={type:'line',data:{labels:['Seg','Ter','Qua','Qui','Sex'],datasets:[{label:'Tarefas',data:[3,6,4,7,5]}]}}"
            className="img-fluid rounded"
          />
        </div>

        <div className="card shadow mt-4 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1581093588401-22f6362f299f?w=1200"
            className="img-fluid"
          />

          <div className="p-4">
            <h4>Conheça nossos planos</h4>
            <p>Acesse funcionalidades avançadas e suporte premium.</p>

            <Link to="/plans" className="btn btn-primary w-100">
              Ver Planos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
