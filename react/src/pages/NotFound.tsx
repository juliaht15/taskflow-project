import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-in fade-in duration-700">
      {/* Icono o ilustración visual */}
      <div className="bg-red-50 p-6 rounded-full mb-6">
        <svg 
          className="w-16 h-16 text-red-500" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
          />
        </svg>
      </div>

      <h1 className="text-8xl font-black text-slate-200 absolute -z-10 select-none">
        404
      </h1>
      
      <h2 className="text-3xl font-bold text-slate-900 mt-2">
        Página no encontrada
      </h2>
      
      <p className="text-slate-600 mt-4 max-w-md">
        ¡Ups! Parece que te has salido del flujo. La página que buscas no existe o ha sido movida a otra dimensión.
      </p>

      <Link 
        to="/" 
        className="mt-8 px-6 py-3 bg-brand text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 hover:bg-brand-dark transition-all active:scale-95"
      >
        Volver al Panel Principal
      </Link>
    </div>
  );
};

export default NotFound;