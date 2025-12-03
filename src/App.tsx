import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignIn } from "./components/SignIn";
import SignUp from "./components/SignUp";
import { Dashboard } from "./pages/Dasboard";
import PrivateRoute from "./routes/PrivateRoute";
import { Plans } from "./pages/plans";
import CheckoutPage from "./pages/checkout";
import { TasksPage } from "./pages/Task.Page";

import { UserProvider } from "./contexts/userContext";
import { TasksProvider } from "./contexts/task-context";
import { useEffect, useState } from "react";
import { loadTheme } from "./utils/theme";

import{ Sidebar }from "./components/Sidebar";

function PrivateLayout({ children }: { children: React.ReactNode }) {
  // controla o espaço lateral do conteúdo
  const [sidebarWidth, setSidebarWidth] = useState(250);

  useEffect(() => {
    const interval = setInterval(() => {
      const el = document.querySelector(".sidebar") as HTMLElement;
      if (el) {
        setSidebarWidth(el.offsetWidth);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Sidebar />
      <main
        className="p-4"
        style={{
          marginLeft: sidebarWidth,
          transition: "margin-left 0.3s ease",
        }}
      >
        {children}
      </main>
    </div>
  );
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <Dashboard />
              </PrivateLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <TasksPage />
              </PrivateLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  useEffect(() => loadTheme(), []);

  return (
    <UserProvider>
      <TasksProvider>
        <AppRouter />
      </TasksProvider>
    </UserProvider>
  );
}
