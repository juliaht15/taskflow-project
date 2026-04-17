import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './App.css';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Aquí puedes añadir más rutas en el futuro */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}