// src/contexts/task-context.ts
import { createContext, useContext, useState, useCallback, useMemo } from "react";
import { taskServices } from "../services/taskServices";

interface Task {
  id: number;
  title: string;
  description?: string;
  done: boolean;
}

interface TasksContextType {
  tasks: Task[];
  loading: boolean;
  fetchTasks: () => Promise<void>;
  createTask: (data: { title: string; description?: string }) => Promise<void>;
  toggleDone: (id: number) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;

  pendingCount: number;
  doneCount: number;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token") ?? "";

  const fetchTasks = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    try {
      const data = await taskServices.getTasks(token); 
      setTasks(data);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const createTask = useCallback(
    async (payload: { title: string; description?: string }) => {
      if (!token) return;

      const task = await taskServices.createTask(token, payload);
      setTasks((prev) => [...prev, task]);
    },
    [token]
  );

  const toggleDone = useCallback(
    async (id: number) => {
      if (!token) return;

      const updated = await taskServices.toggleDone(token, id);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    },
    [token]
  );

  const deleteTask = useCallback(
    async (id: number) => {
      if (!token) return;

      await taskServices.deleteTask(token, id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    },
    [token]
  );

  const pendingCount = useMemo(() => tasks.filter((t) => !t.done).length, [tasks]);
  const doneCount = useMemo(() => tasks.filter((t) => t.done).length, [tasks]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        loading,
        fetchTasks,
        createTask,
        toggleDone,
        deleteTask,
        pendingCount,
        doneCount,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasksContext() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasksContext deve ser usado dentro de <TasksProvider>");
  return ctx;
}
