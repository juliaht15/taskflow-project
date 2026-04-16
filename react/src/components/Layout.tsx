import type { ReactNode } from 'react';
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
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-black text-indigo-600 uppercase tracking-tighter">
            TaskFlow <span className="text-slate-400">Pro</span>
          </h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                location.pathname === item.path ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400'
              }`}
            >
              <span>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
};