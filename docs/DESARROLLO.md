# 📁 Documentación de Componentes - TaskFlow

Esta guía detalla la arquitectura de componentes, sus propiedades y casos de uso dentro del proyecto TaskFlow.

---

## 🎨 UI Components
*Componentes atómicos y de interfaz base situados en `src/components/ui/`.*

### **Button**
Componente de botón altamente personalizable con múltiples variantes y estados.

| Prop | Tipo | Descripción |
| :--- | :--- | :--- |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | Estilo visual del botón. |
| `size` | `'sm' \| 'md' \| 'lg'` | Tamaño del padding y tipografía. |
| `loading` | `boolean` | Muestra un spinner y deshabilita el click. |
| `className` | `string` | Clases adicionales de Tailwind. |

**Ejemplo de uso:**
```tsx
<Button variant="primary" size="lg" loading={false}>
  Crear Tarea
</Button>
```

> **✨ Características:** Gradientes con Tailwind v4, estados de carga animados, efectos hover suaves y soporte nativo para Dark Mode.

---

### **Card**
Contenedor versátil para agrupar contenido relacionado.

* **Props:** `hover` (booleano), `gradient` (booleano), `className`.
* **Subcomponentes:** `CardHeader`, `CardTitle`, `CardContent`.

**Ejemplo de uso:**
```tsx
<Card hover gradient={false}>
  <CardHeader>
    <CardTitle>Mi Título</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Contenido principal del componente.</p>
  </CardContent>
</Card>
```

---

## 🏗️ Layout Components
*Estructura global de la aplicación en `src/components/layout/`.*

### **Header**
Barra de navegación principal con soporte para:
* **Branding:** Logo animado con gradientes.
* **Navegación:** Enlaces dinámicos (Panel, Tareas, Proyectos).
* **Utilidades:** Toggle de modo oscuro y perfil de usuario ("Julia").
* **Responsive:** Menú hamburguesa para dispositivos móviles.

### **Layout**
Wrapper principal que garantiza consistencia visual.
* Inyecta el `Header` automáticamente.
* Gestiona fondos globales y el contenedor centralizado.

---

## ✅ Task Components
*Lógica de negocio y gestión de tareas en `src/components/tasks/`.*

### **TaskForm**
Formulario inteligente para la creación de tareas.
* **Estados:** Soporta modo **Colapsado** (botón de acción simple) y **Expandido** (formulario completo).
* **Validación:** Campos requeridos para Título, Prioridad y Periodo.

### **TaskCard**
Representación visual de una tarea individual. Incluye:
* Checkbox de estado (completado/pendiente).
* Badges de colores según prioridad.
* Fechas formateadas localmente (ES).

### **TaskList**
Componente de orquestación que maneja estados de red:
1.  **Loading:** Spinner de carga centrado.
2.  **Error:** Mensaje informativo mediante `Card`.
3.  **Empty:** Ilustración de "Inbox" cuando no hay datos.
4.  **Success:** Renderizado dinámico de `TaskCard`.

---

## 📄 Pages (Vistas)
*Ubicadas en `src/pages/`.*

* **DashboardPage:** Resumen de métricas (Total, Pendientes, Completadas) y actividad reciente.
* **TasksPage:** Gestión con filtrado por periodo (Diaria, Semanal, Mensual).
* **ProjectsPage:** Grid de proyectos con selectores de color y contadores.
* **ProjectViewPage:** Vista detallada filtrada por ID de proyecto.

---

## 🛠️ Principios de Diseño

* **Composición:** Componentes pequeños, puros y reutilizables.
* **Tipado Estricto:** TypeScript al 100% en interfaces de Props.
* **Dark Mode First:** Uso sistemático de prefijos `dark:` en Tailwind.
* **Accesibilidad:** Implementación de ARIA labels y HTML semántico.
* **Performance:** Optimización mediante `React.memo` en componentes de listas extensas.

---

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

# 📝 Formularios e Interacción - TaskFlow

Esta sección detalla la implementación de **formularios controlados** y la lógica de interacción que garantiza la integridad de los datos y una experiencia de usuario (UX) fluida.

---

## 🏗️ Gestión de Estados Controlados

TaskFlow utiliza el patrón de **componentes controlados** de React. El estado del formulario es la "única fuente de verdad", sincronizando cada pulsación de tecla con el estado local antes de procesar el envío.

### **Estructura del Estado (`TaskForm.tsx`)**
Centralizamos todos los campos en un único objeto de estado para simplificar las actualizaciones y el mantenimiento:

```tsx
const [formData, setFormData] = useState({
  title: '',               // Requerido
  description: '',         // Opcional
  priority: 'medium',      // Enum: low | medium | high
  timeframe: 'general',    // Enum: daily | weekly | monthly...
  projectId: '',           // Relación opcional
  dueDate: '',             // Formato ISO string
});
```

---

## 🛠️ Implementación técnica

### **1. Sincronización de Inputs**
Cada campo utiliza una función de actualización inmutable para preservar los valores de los otros campos:

* **Texto y Áreas:**
    ```tsx
    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
    ```
* **Selectores con Tipado:**
    ```tsx
    onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}
    ```

### **2. Flujo de Envío (Submit)**
La función `handleSubmit` actúa como orquestador entre la UI y la lógica de negocio del Contexto:

1.  **Intercepción:** `e.preventDefault()` para evitar la recarga nativa.
2.  **Transformación:** Limpieza de strings vacíos y conversión de tipos.
3.  **Ejecución:** Llamada a `addTask()` desde el `useApp`.
4.  **Feedback:** Reseteo de campos y colapso de la interfaz tras el éxito.

---

## ✨ Experiencia de Usuario (UX)

### **Visualización Progresiva**
Para reducir la carga cognitiva, el formulario de tareas implementa un **Estado Dual**:
* **Modo Compacto:** Un botón de acción simple con gradiente de alta visibilidad.
* **Modo Expandido:** Un panel detallado con animaciones de transición que muestra todos los controles.

### **Accesibilidad y Estilos**
* **Feedback de Foco:** Anillos visuales (`ring-2 ring-indigo-500`) para navegación por teclado.
* **Validación Visual:** Uso del pseudo-clase `:invalid` y el atributo `required` para guiar al usuario.
* **Dark Mode:** Adaptación cromática automática:
    * *Light:* `bg-white` / `text-gray-900`
    * *Dark:* `dark:bg-gray-800` / `dark:text-white`

---

## 🎨 Creación de Proyectos Inline
A diferencia del formulario de tareas, la creación de proyectos se maneja de forma **inline** en `ProjectsPage.tsx`, permitiendo una creación rápida sin perder el contexto de la lista actual, optimizando el flujo de trabajo para usuarios avanzados.
```