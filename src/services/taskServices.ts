// src/services/taskServices.ts
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const taskServices = {
  async getTasks(token: string) {
    const res = await axios.get(`${API_URL}/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data; // <-- retorna apenas os dados
  },

  async createTask(
    token: string,
    data: { title: string; description?: string }
  ) {
    const res = await axios.post(`${API_URL}/tasks`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data; // <-- retorna apenas a task criada
  },

  async toggleDone(token: string, id: number) {
    const res = await axios.patch(
      `${API_URL}/tasks/${id}/toggle`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data; // <-- retorna a task atualizada
  },

  async deleteTask(token: string, id: number) {
    await axios.delete(`${API_URL}/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return true;
  },
};
