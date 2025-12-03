import React, { useState } from "react";
import { taskServices } from "../services/taskServices";
import { useUserContext } from "../contexts/userContext";
import { toast } from "sonner";

export default function TaskForm({ onTaskCreated }: { onTaskCreated: () => void }) {
  const { token } = useUserContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return toast.error("Usuário não autenticado");
    if (!title.trim()) return;

    try {
      await taskServices.createTask(token, { title, description });
      toast.success("Tarefa criada!");

      setTitle("");
      setDescription("");
      onTaskCreated();
    } catch {
      toast.error("Erro ao criar tarefa");
    }
  };

  return (
    <form onSubmit={submit}>
      <input
        className="form-control mb-3"
        placeholder="Título da tarefa..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="form-control mb-3"
        placeholder="Descrição (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="btn btn-primary">Criar tarefa</button>
    </form>
  );
}
