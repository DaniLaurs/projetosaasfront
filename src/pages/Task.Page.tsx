import  { useEffect } from "react";
import TaskForm from "../components/TaskForm";
import { useTasksContext } from "../contexts/task-context";

export function TasksPage() {
  const { tasks, fetchTasks, toggleDone, deleteTask } = useTasksContext();

  useEffect(() => {
    fetchTasks();
  }, []);

  const pending = tasks.filter((t) => !t.done);
  const completed = tasks.filter((t) => t.done);

  return (
    <div className="container py-5">

      {/* CARD DE CRIAÇÃO */}
      <div className="card shadow-lg rounded-4 mb-5 border-0">
        <div className="card-body p-4">
          <h3 className="fw-bold mb-3">Criar nova tarefa</h3>
          <TaskForm onTaskCreated={fetchTasks} />
        </div>
      </div>

      {/* PENDENTES */}
      <h3 className="fw-bold mb-3">📌 Tarefas pendentes</h3>
      <div className="row g-4">
        {pending.length === 0 && (
          <p className="text-muted">Nenhuma tarefa pendente</p>
        )}

        {pending.map((task) => (
          <div className="col-md-6 col-lg-4" key={task.id}>
            <div className="card task-card shadow rounded-4 border-0 h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="fw-bold">{task.title}</h5>

                {task.description && (
                  <p className="text-muted small mt-2">{task.description}</p>
                )}

                <div className="mt-auto d-flex gap-2">
                  <button
                    className="btn btn-success w-50 rounded-3"
                    onClick={() => toggleDone(task.id)}
                  >
                    Concluir
                  </button>
                  <button
                    className="btn btn-outline-danger w-50 rounded-3"
                    onClick={() => deleteTask(task.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DIVISÓRIA */}
      <hr className="my-5 border-2 opacity-50" />

      {/* CONCLUÍDAS */}
      <h3 className="fw-bold mb-3">✅ Tarefas concluídas</h3>
      <div className="row g-4">
        {completed.length === 0 && (
          <p className="text-muted">Nenhuma tarefa concluída</p>
        )}

        {completed.map((task) => (
          <div className="col-md-6 col-lg-4" key={task.id}>
            <div className="card shadow rounded-4 border-0 h-100 bg-light-subtle">
              <div className="card-body d-flex flex-column">
                <h5 className="fw-bold text-decoration-line-through text-muted">
                  {task.title}
                </h5>

                {task.description && (
                  <p className="small text-muted mt-2">{task.description}</p>
                )}

                <div className="mt-auto d-flex gap-2">
                  <button
                    className="btn btn-warning w-50 rounded-3"
                    onClick={() => toggleDone(task.id)}
                  >
                    Reabrir
                  </button>
                  <button
                    className="btn btn-outline-danger w-50 rounded-3"
                    onClick={() => deleteTask(task.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
