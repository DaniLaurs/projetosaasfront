import { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import { taskServices } from "../services/taskServices";
import { useUserContext } from "../contexts/userContext";

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

export default function TaskList() {
  const { token } = useUserContext();
  const [tasks, setTasks] = useState<Task[]>([]);

  async function loadTasks() {
    if (!token) return;
    try {
      const data = await taskServices.getTasks(token);
      setTasks(data);
    } catch (err) {
      console.error("Erro ao carregar tarefas:", err);
    }
  }

  async function toggleTask(id: number) {
    if (!token) return;
    try {
      await taskServices.toggleDone(token, id);
      loadTasks();
    } catch (err) {
      console.error("Erro ao atualizar tarefa:", err);
    }
  }

  async function deleteTask(id: number) {
    if (!token) return;
    try {
      await taskServices.deleteTask(token, id);
      loadTasks();
    } catch (err) {
      console.error("Erro ao deletar tarefa:", err);
    }
  }

  useEffect(() => {
    loadTasks();
  }, [token]);

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded mt-10">
      <h2 className="text-xl font-bold mb-4">Minhas Tarefas</h2>

      <TaskForm onTaskCreated={loadTasks} />

      <div className="mt-4 space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-3 border rounded flex justify-between items-center"
          >
            <div>
              <p
                className={task.completed ? "line-through text-gray-500" : ""}
                onClick={() => toggleTask(task.id)}
                style={{ cursor: "pointer" }}
              >
                {task.title}
              </p>
              {task.description && <small>{task.description}</small>}
            </div>

            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 font-bold"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
