import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Layout>
      </TaskProvider>
    </BrowserRouter>
  );
}

export default App;