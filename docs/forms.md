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

---