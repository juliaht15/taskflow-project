import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";

// Definimos qué es una Tarea y un Proyecto para que TypeScript esté contento
interface Task {
  id: string;
  title: string;
  completed: boolean;
  projectId: string;
}

interface Project {
  id: string;
  name: string;
  color: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([
    { id: "1", name: "General", color: "bg-blue-500" },
  ]);

  // Carga inicial de datos desde Render
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
        const json = await response.json();
        setTasks(json.data || []);
      } catch (err) {
        console.error("Error cargando tareas:", err);
      }
    };
    fetchTasks();
  }, []);

  // Crear proyecto automático (Adiós a los pop-ups de image_975d03.png)
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: `Proyecto ${projects.length + 1}`,
      color: projects.length % 2 === 0 ? "bg-purple-500" : "bg-emerald-500",
    };
    setProjects([...projects, newProject]);
  };

  const pendingTasks = tasks.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* CABECERA Y PERFIL PROFESIONAL */}
      <nav className="flex justify-between items-center p-6 bg-white border-b shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg text-white font-bold">
            TF
          </div>
          <h1 className="text-xl font-bold text-slate-800">TaskFlow Pro</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="font-bold text-slate-900 leading-none">Julia</p>
            <p className="text-xs text-indigo-600 font-semibold mt-1">
              {pendingTasks}{" "}
              {pendingTasks === 1 ? "tarea pendiente" : "tareas pendientes"}
            </p>
          </div>
          <div className="h-10 w-10 bg-indigo-50 border-2 border-indigo-600 rounded-full flex items-center justify-center text-indigo-700 font-bold shadow-inner">
            J
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* BARRA LATERAL: PROYECTOS */}
        <aside className="md:col-span-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">
              Mis Proyectos
            </h2>
            <button
              onClick={addProject}
              className="bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white w-6 h-6 rounded-full flex items-center justify-center transition-colors font-bold"
            >
              +
            </button>
          </div>
          <div className="space-y-1">
            {projects.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 p-3 hover:bg-white rounded-xl cursor-pointer transition-all group"
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full ${p.color} group-hover:scale-125 transition-transform`}
                ></div>
                <span className="text-sm font-medium text-slate-600 group-hover:text-indigo-600">
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </aside>

        {/* CONTENIDO: FORMULARIO Y LISTA */}
        <section className="md:col-span-3 space-y-8">
          <TaskForm
            projects={projects}
            onTaskCreated={(newTask: Task) => setTasks([newTask, ...tasks])}
          />

          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 text-lg">
              Tareas recientes
            </h3>
            {tasks.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center">
                <p className="text-slate-400 font-medium italic">
                  No se encontraron tareas que coincidan.
                </p>
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-5 h-5 border-2 border-slate-300 rounded-md"></div>
                    <span className="text-slate-700 font-medium">
                      {task.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                      {projects.find((p) => p.id === task.projectId)?.name ||
                        "General"}
                    </span>
                    <div
                      className={`w-3 h-3 rounded-full ${projects.find((p) => p.id === task.projectId)?.color || "bg-slate-300"}`}
                    ></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
