import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const [tasks, setTasks] = useState<
    { id: number; text: string; completed: boolean }[]
  >([]);

  function addTask(text: string) {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  }

  function toggleTask(id: number) {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded mt-10">
      <h2 className="text-xl font-bold mb-4">Minhas Tarefas</h2>

      {/* Removido onTaskCreated — não existe no TaskForm */}
      <TaskForm onAdd={addTask} onTaskCreated={function (): void {
        throw new Error("Function not implemented.");
      } } />

      <div>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}
