import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/layout/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { TasksPage } from './pages/TasksPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectViewPage } from './pages/ProjectViewPage';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:id" element={<ProjectViewPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </AppProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;