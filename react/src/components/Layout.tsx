import { useState } from "react";
import { useApp } from "../context/AppContext";

export const Header = () => {
  // Desestructuración directa simplificada
  const { theme, toggleTheme } = useApp();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <span className="text-white text-xl font-bold">✓</span>
            </div>
            <h1 className="text-xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight">
              TaskFlow
            </h1>
          </div>

          {/* Actions Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 text-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-all active:scale-90"
              title="Cambiar modo"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-600"
              >
                <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-400 rounded-lg flex items-center justify-center text-white font-bold shadow-inner">
                  J
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200 hidden sm:block">
                  Julia
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 text-slate-400 transition-transform ${showUserMenu ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-52 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 animate-in fade-in zoom-in duration-150">
                  <div className="px-4 py-2 border-b border-slate-50 dark:border-slate-700/50 mb-1">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                      Cuenta
                    </p>
                  </div>
                  <a
                    href="#"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 transition-colors"
                  >
                    👤 Perfil
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 transition-colors"
                  >
                    ⚙️ Configuración
                  </a>
                  <hr className="my-2 border-slate-100 dark:border-slate-700/50" />
                  <a
                    href="#"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                  >
                    🚪 Cerrar sesión
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
    <Header />
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {children}
    </main>
  </div>
);
