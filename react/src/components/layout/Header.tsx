import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, Menu, X, Sun, Moon, User } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme(); // ✅ Contexto del tema
  const { stats } = useApp(); // ✅ Contexto de la app (si lo necesitas)

  const navItems = [
    { name: 'Panel', path: '/' },
    { name: 'Tareas', path: '/tasks' },
    { name: 'Proyectos', path: '/projects' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              TaskFlow
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  location.pathname === item.path
                    ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions & Theme Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800">
              <div className="w-6 h-6 rounded-full bg-linear-to-r from-indigo-500 to-pink-500 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Julia</span>
            </div>
            
            <button
              onClick={toggleTheme} // ✅ Esto ahora funciona
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-gray-700 dark:text-gray-300" /> : <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block px-4 py-3 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2 flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400">
              <div className="w-6 h-6 rounded-full bg-linear-to-r from-indigo-500 to-pink-500" />
              <span>Julia</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};