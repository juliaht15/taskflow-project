export const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Página no encontrada
        </p>
        <a
          href="/"
          className="inline-flex items-center px-6 py-3 rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 text-white font-medium hover:shadow-lg transition-all duration-300"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
};