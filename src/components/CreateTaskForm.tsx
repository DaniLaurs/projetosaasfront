import { useState } from "react";
import { useTasksContext } from "../contexts/task-context";

export function CreateTaskForm() {
  console.log("render form");
  const { createTask } = useTasksContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // createTask({ title, description,});
    createTask({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título da tarefa"
        className="border p-2"
        required
      />

      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição (opcional)"
        className="border p-2"
      />

      <button className="bg-blue-600 text-white p-2 rounded">
        Criar Tarefa
      </button>
    </form>
  );
}
