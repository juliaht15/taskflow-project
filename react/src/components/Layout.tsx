import { type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: '📊' },
    { name: 'Tareas', path: '/tasks', icon: '✅' },
    { name: 'Ajustes', path: '/settings', icon: '⚙️' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen">
        <div className="p-8">
          <h1 className="text-xl font-black text-indigo-600 uppercase tracking-tighter">
            TaskFlow <span className="text-slate-400">Pro</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-300 tracking-widest mt-1">JULIA PROJECT</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                    : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                }`}
              >
                <span className={isActive ? 'brightness-0 invert' : ''}>{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-6">
          <div className="bg-slate-900 rounded-2xl p-4 text-white">
            <p className="text-[10px] font-bold opacity-50 uppercase">Vercel Ready</p>
            <p className="text-xs font-medium mt-1">v1.0.4 Build</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-8 lg:p-12 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
};