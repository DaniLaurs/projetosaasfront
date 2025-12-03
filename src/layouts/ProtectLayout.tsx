import { Sidebar } from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export function ProtectedLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar fixo */}
      <Sidebar />

      {/* Conteúdo da página */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
