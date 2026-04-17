# ⚓ Hooks Personalizados - TaskFlow

Esta sección documenta la implementación de Hooks de React y la lógica de estado que impulsa la aplicación, incluyendo las optimizaciones de rendimiento de la **Fase 5**.

---

## ⚛️ Hooks de React Utilizados

### **useState**
*Gestión de estado local y UI.*

Se utiliza principalmente para controlar la interactividad inmediata de los componentes:
* **Formularios:** Control de inputs y validaciones.
* **UI Dinámica:** Colapsar/expandir formularios y modales.
* **Filtros:** Estado de los filtros seleccionados en la vista de tareas.

```tsx
// Ejemplo en TaskForm.tsx
const [isExpanded, setIsExpanded] = useState(false);
const [formData, setFormData] = useState({
  title: '',
  priority: 'medium' as Priority,
});
```

---

### **useEffect**
*Sincronización y efectos secundarios.*

| Aplicación | Descripción |
| :--- | :--- |
| **Persistencia** | Guardar y recuperar el tema (Dark/Light) en `localStorage`. |
| **DOM** | Inyectar la clase `.dark` en el elemento raíz del documento. |
| **Data Fetching** | Simulación de carga inicial de tareas y proyectos con `dispatch`. |

---

### **useMemo** ⭐ *(Optimización)*
*Memorización de cálculos costosos para evitar re-renders innecesarios.*

Implementado en el **AppContext** para procesar las estadísticas del Dashboard. Solo se recalcula si el array de tareas o proyectos cambia.

```tsx
const stats = useMemo(() => ({
  total: state.tasks.length,
  pending: state.tasks.filter(t => !t.completed).length,
  completed: state.tasks.filter(t => t.completed).length,
  projects: state.projects.length
}), [state.tasks, state.projects]);
```

---

### **useCallback** ⭐ *(Optimización)*
*Memorización de funciones para estabilidad de referencias.*

Fundamental para pasar funciones a componentes hijos (como `TaskCard`) que están envueltos en `React.memo`.

* **Funciones CRUD:** `addTask`, `toggleTask`, `deleteTask`.
* **Selectores:** `getTasksByTimeframe`, que filtra tareas sin recrear la lógica en cada render.

```tsx
const toggleTask = useCallback(async (id: string) => {
  const task = state.tasks.find(t => t.id === id);
  if (!task) return;
  dispatch({ 
    type: 'UPDATE_TASK', 
    payload: { ...task, completed: !task.completed } 
  });
}, [state.tasks]);
```

---

### **useReducer**
*Gestión de estado complejo y centralizado.*

Sustituye múltiples `useState` por un único flujo de datos predecible. Las acciones incluyen:
* `FETCH_SUCCESS`, `ADD_TASK`, `UPDATE_TASK`, `DELETE_TASK`.
* `ADD_PROJECT`, `DELETE_PROJECT`.

---

## 🎣 Custom Hooks de la Aplicación

Hemos abstraído el acceso al Contexto en dos hooks personalizados para facilitar el desarrollo y asegurar que se usen dentro de sus respectivos proveedores.

### `useApp()`
Es el motor de TaskFlow. Expone todo el estado global y las funciones de despacho.
```tsx
const { state, addTask, toggleTask, stats } = useApp();
```

### `useTheme()`
Permite acceder y modificar el modo visual (claro/oscuro) de forma sencilla.
```tsx
const { theme, toggleTheme } = useTheme();
```

---

## 📊 Resumen de Impacto

| Hook | Ubicación | Propósito | Impacto en Perf. |
| :--- | :--- | :--- | :--- |
| `useMemo` | AppContext | Stats del dashboard | 🚀 **Alto** |
| `useCallback` | AppContext | Estabilidad de funciones CRUD | 🚀 **Alto** |
| `useReducer` | AppContext | Centralización de lógica | 📈 **Medio** |
| `useEffect` | Global | Side effects y persistencia | 📈 **Medio** |

---