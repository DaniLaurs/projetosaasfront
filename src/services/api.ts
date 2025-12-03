const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

export const api = {
  // --- SIGN UP ---
  signUp: async (data: {
    name: string;
    email: string;
    password: string;
    plan: string;
  }) => {
    const response = await fetch(`${API_URL}/auth/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // --- SIGN IN ---
  signIn: async (data: { email: string; password: string }) => {
    const response = await fetch(`${API_URL}/auth/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // --- UPDATE PLAN ---
  updatePlan: async (token: string, plan: string) => {
    const response = await fetch(`${API_URL}/auth/plan`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ plan }),
    });
    return response.json();
  },

  // ============================================================
  //                   ⭐ TAREFAS DO SAAS ⭐
  // ============================================================

  // Criar tarefa
  createTask: async (token: string, data: { title: string; description?: string }) => {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Listar todas tarefas do usuário
  getTasks: async (token: string) => {
    const response = await fetch(`${API_URL}/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },

  // Listar pendentes
  getPendingTasks: async (token: string) => {
    const response = await fetch(`${API_URL}/tasks/pending`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },

  // Listar concluídas
  getDoneTasks: async (token: string) => {
    const response = await fetch(`${API_URL}/tasks/done`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },

  // Alternar tarefa (done / not done)
  toggleTask: async (token: string, taskId: number) => {
    const response = await fetch(`${API_URL}/tasks/${taskId}/toggle`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },
};
