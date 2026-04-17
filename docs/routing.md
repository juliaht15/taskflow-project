# 🛣️ Enrutamiento y Navegación - TaskFlow

TaskFlow utiliza **React Router v6** para gestionar una navegación tipo **SPA** (Single Page Application), asegurando una experiencia fluida, URLs semánticas y la persistencia del estado global entre cambios de vista.

---

## 🏗️ Configuración Centralizada

Todas las rutas están definidas en `src/App.tsx`, envueltas por el componente `Layout` para mantener la consistencia visual de la barra de navegación en toda la aplicación.

```tsx
<Routes>
  <Route path="/" element={<DashboardPage />} />
  <Route path="/tasks" element={<TasksPage />} />
  <Route path="/projects" element={<ProjectsPage />} />
  <Route path="/projects/:id" element={<ProjectViewPage />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

---

## 🗺️ Mapa de Navegación

| Ruta | Vista | Funcionalidad Clave |
| :--- | :--- | :--- |
| `/` | **Dashboard** | Métricas en tiempo real, KPIs de productividad y actividad reciente. |
| `/tasks` | **Gestión de Tareas** | Vista maestra con filtrado dinámico por periodos de tiempo. |
| `/projects` | **Proyectos** | Grid de categorías y acceso a la creación de nuevos proyectos. |
| `/projects/:id` | **Detalle de Proyecto** | Vista filtrada por ID con contexto específico del proyecto seleccionado. |
| `*` | **404 Error** | Manejo de rutas inexistentes con redirección controlada. |

---

## 🛠️ Herramientas de Navegación

### **1. Enlaces Activos (`useLocation`)**
El componente `Header.tsx` detecta automáticamente en qué sección se encuentra el usuario comparando el `location.pathname` con la ruta del enlace, aplicando estilos de resaltado mediante clases dinámicas de Tailwind.

### **2. Navegación Lógica (`useNavigate`)**
Utilizamos el hook `useNavigate` para redirecciones controladas por eventos, como el botón "Volver" en la vista de detalles:

```tsx
const navigate = useNavigate();
// Regreso al listado general
<Button onClick={() => navigate('/projects')}>Volver a Proyectos</Button>
```

### **3. Segmentos Dinámicos (`useParams`)**
La vista de proyecto individual extrae el identificador directamente de la URL. Esto permite que el componente sea capaz de recuperar los datos correctos incluso tras una recarga de página:

```tsx
const { id } = useParams<{ id: string }>();
const currentProject = state.projects.find(p => p.id === id);
```

---

## 🚀 Optimización y Despliegue

* **Sin Recargas:** La navegación se intercepta en el lado del cliente, evitando peticiones innecesarias al servidor y manteniendo el estado de los filtros.
* **Preparado para Producción:** Se incluye configuración para servidores (como `vercel.json`) mediante reglas de *rewrite* para soportar rutas directas:
    ```json
    { "source": "/(.*)", "destination": "/index.html" }
    ```

---

## 📋 Roadmap de Navegación

* [ ] **Code Splitting:** Implementar `React.lazy` para cargar las páginas solo cuando se visitan.
* [ ] **Migas de Pan:** Añadir *Breadcrumbs* en `/projects/:id` para mejorar la jerarquía visual.
* [ ] **URL Sync:** Sincronizar los filtros de tareas (Diarias/Semanales) con *Query Strings* (ej: `?filter=daily`).

---