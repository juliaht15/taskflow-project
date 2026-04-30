import React, { useState } from "react";
import { Task } from "../types";
import { useAppContext } from "../context/AppContext";
import { GripVertical, CheckCircle2, Circle, Trash2 } from "lucide-react";

export const TaskItem = ({ task }: { task: Task }) => {
  const { toggleTask, updateTaskTitle, deleteTask, searchQuery } =
    useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  if (
    searchQuery &&
    !task.title.toLowerCase().includes(searchQuery.toLowerCase())
  )
    return null;

  const handleBlur = () => {
    setIsEditing(false);
    if (title.trim() !== "" && title !== task.title) {
      updateTaskTitle(task.id, title);
    } else {
      setTitle(task.title);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleBlur();
    if (e.key === "Escape") {
      setIsEditing(false);
      setTitle(task.title);
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => e.dataTransfer.setData("taskId", String(task.id))}
      className="group flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl mb-2 border border-slate-100 dark:border-slate-700 hover:border-purple-200 dark:hover:border-purple-900 shadow-sm transition-all"
    >
      <GripVertical
        className="text-slate-300 dark:text-slate-600 cursor-grab active:cursor-grabbing"
        size={20}
      />

      <button
        onClick={() => toggleTask(task.id)}
        className="transition-transform active:scale-90"
      >
        {task.completed ? (
          <CheckCircle2 className="text-emerald-500" size={22} />
        ) : (
          <Circle
            className="text-slate-300 dark:text-slate-600 hover:text-purple-400"
            size={22}
          />
        )}
      </button>

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            className="w-full bg-transparent outline-none border-b border-purple-500 text-slate-700 dark:text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <p
            onDoubleClick={() => setIsEditing(true)}
            className={`truncate cursor-text dark:text-white ${
              task.completed
                ? "line-through text-slate-400 dark:text-slate-500"
                : "text-slate-700"
            }`}
          >
            {task.title}
          </p>
        )}
      </div>

      <button
        onClick={() => deleteTask(task.id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
        aria-label="Eliminar tarea"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export const TaskList = () => {
  const { tasks } = useAppContext();

  return (
    <div className="flex flex-col">
      {tasks.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-slate-400 dark:text-slate-500">
            No hay tareas pendientes
          </p>
        </div>
      ) : (
        tasks.map((task) => <TaskItem key={task.id} task={task} />)
      )}
    </div>
  );
};
