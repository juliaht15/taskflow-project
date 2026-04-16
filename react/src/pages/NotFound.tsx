import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl mt-4">¡Ups! Te has salido del flujo (página no encontrada).</p>
      <Link to="/" className="mt-6 text-blue-500 underline">Volver al inicio</Link>
    </div>
  );
};

export default NotFound;