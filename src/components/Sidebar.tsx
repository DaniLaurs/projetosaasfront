// src/components/Sidebar.tsx
import { Link } from "react-router-dom";

export function Sidebar() {
  return (
    <div
      className="bg-dark text-white vh-100 p-3 border-end position-fixed"
      style={{ width: "250px" }}
    >
      <h4 className="mb-4">Menu</h4>

      {/* Botão para abrir e fechar */}
      <button
        className="btn btn-outline-light w-100 mb-3"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-expanded="true"
      >
        Menu
      </button>

      <div className="collapse show" id="sidebarMenu">
        <ul className="nav flex-column gap-2">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link text-white">
              📊 Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/tasks" className="nav-link text-white">
              ✅ Tarefas
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/plans" className="nav-link text-white">
              💼 Planos
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
