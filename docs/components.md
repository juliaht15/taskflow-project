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
