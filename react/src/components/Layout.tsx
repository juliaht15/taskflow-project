import React from "react";
import { useAppContext } from "../context/AppContext";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { searchQuery, setSearchQuery, toggleTheme, theme } = useAppContext();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <h1 className="text-xl font-black text-purple-600">TaskFlow</h1>
          <div className="flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Buscar tareas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-700 rounded-lg py-2 px-4 outline-none focus:ring-2 focus:ring-purple-500 text-slate-900 dark:text-white"
            />
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            aria-label="Cambiar tema"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto p-6">{children}</main>
    </div>
  );
};
