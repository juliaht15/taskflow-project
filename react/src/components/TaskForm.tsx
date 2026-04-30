import React, { useState } from "react";

interface TaskFormProps {
  onTaskCreated: (task: any) => void;
  projects: any[];
}

export const TaskForm: React.FC<TaskFormProps> = ({
  onTaskCreated,
  projects,
}) => {
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState(projects[0]?.id || "1");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          projectId: Number(projectId),
          completed: false,
        }),
      });

      if (response.ok) {
        const json = await response.json();
        onTaskCreated(json.data);
        setTitle("");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-800 p-6 rounded-2xl border-2 border-emerald-500 shadow-sm transition-all mb-8"
    >
      <input
        type="text"
        placeholder="¿Qué hay que hacer hoy, Julia?"
        className="w-full text-lg font-medium outline-none mb-4 bg-transparent text-slate-700 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-500"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <select
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          className="w-full sm:w-auto bg-slate-50 dark:bg-slate-700 p-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-200 outline-none border border-slate-100 dark:border-slate-600 cursor-pointer"
        >
          {projects.map((p: any) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full sm:w-auto bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-emerald-600 active:scale-95 transition-all shadow-md shadow-emerald-100 dark:shadow-none"
        >
          Guardar Tarea
        </button>
      </div>
    </form>
  );
};
