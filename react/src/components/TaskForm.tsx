import React, { useState } from "react";

// Definimos qué esperamos recibir (Props)
interface TaskFormProps {
  onTaskCreated: (task: any) => void;
  projects: any[];
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated, projects }) => {
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("1");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, projectId, completed: false }),
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
      className="bg-white p-6 rounded-2xl border-2 border-emerald-500 shadow-sm transition-all"
    >
      <input
        type="text"
        placeholder="¿Qué hay que hacer hoy, Julia?"
        className="w-full text-lg font-medium outline-none mb-4 text-slate-700 placeholder:text-slate-300"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="flex justify-between items-center">
        <select
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          className="bg-slate-50 p-2.5 rounded-xl text-sm font-semibold text-slate-600 outline-none border border-slate-100 cursor-pointer"
        >
          {projects.map((p: any) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-emerald-600 active:scale-95 transition-all shadow-md shadow-emerald-100"
        >
          Guardar Tarea
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
