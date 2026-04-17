# 🌐 Context API - TaskFlow

Esta sección describe la arquitectura de **Estado Global** de la aplicación, diseñada para evitar el *prop drilling* y centralizar la lógica de negocio en proveedores especializados.

---

## 🏗️ Implementación del Estado Global

TaskFlow divide las responsabilidades en dos contextos principales, permitiendo que la lógica visual y la lógica de datos operen de forma independiente.

### **1. ThemeContext** `src/context/ThemeContext.tsx`

Gestiona el motor de temas de la aplicación y la persistencia de preferencias.

* **Estado:** `light` | `dark`.
* **Persistencia:** Utiliza `localStorage` para recordar la selección del usuario tras recargar.
* **Sincronización:** Actúa directamente sobre el `classList` del elemento `<html>` para activar las variantes `dark:` de Tailwind CSS.

> [!TIP]
> Este contexto incluye una lógica de prevención de parpadeo (FOUC) para asegurar una carga limpia del tema.

---

### **2. AppContext**
`src/context/AppContext.tsx`

Es el núcleo lógico de TaskFlow. Gestiona entidades, estados de carga y operaciones CRUD.

**Estado Global (`AppState`):**
* `tasks`: Array principal de tareas.
* `projects`: Lista de categorías/proyectos.
* `loading`: Estado booleano para esqueletos de carga.
* `error`: Captura de excepciones globales.

**Funcionalidades Expuestas:**
| Función | Descripción |
| :--- | :--- |
| `addTask` | Crea una tarea con ID único (`crypto.randomUUID`) y timestamps. |
| `toggleTask` | Alterna el estado de completado y actualiza `updatedAt`. |
| `getTasksByTimeframe` | Selector memorizado para filtrar por periodos. |
| `stats` | Objeto de métricas (Total, Completadas, etc.) procesado con `useMemo`. |

---

## 🌲 Estructura de Proveedores

En `App.tsx`, los contextos se organizan jerárquicamente para heredar funcionalidades:

```tsx
<BrowserRouter>
  <ThemeProvider>         {/* 1. Gestión visual y persistencia de tema */}
    <AppProvider>         {/* 2. Fuente de verdad de datos (Tareas/Proyectos) */}
      <Layout>            {/* 3. Estructura base UI (Header/Main) */}
        <Routes>
           {/* Definición de vistas de la aplicación */}
        </Routes>
      </Layout>
    </AppProvider>
  </ThemeProvider>
</BrowserRouter>
```

---

## 🎣 Hooks de Acceso Seguro

Para consumir los datos sin repetir validaciones de `null`, utilizamos hooks personalizados que garantizan que el componente esté dentro del `Provider` correspondiente:

```tsx
// Ejemplo de consumo seguro
const { theme, toggleTheme } = useTheme();
const { tasks, stats } = useApp();
```

---

## 🚀 Optimizaciones de la Fase 5

El `AppContext` ha sido optimizado para aplicaciones de alta densidad de datos:

1.  **Memorización de Métricas:** Las estadísticas se envuelven en `useMemo`. Si añades una descripción a una tarea pero el conteo de completadas no cambia, el Dashboard **no** se recalcula.
2.  **Estabilidad de Referencias:** Todas las funciones CRUD usan `useCallback`. Esto permite que componentes hijos complejos (como `TaskList`) no sufran re-renders innecesarios al recibir estas funciones como props.

---