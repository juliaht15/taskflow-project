# 🏛️ Arquitectura Técnica y Capa de Datos - TaskFlow Pro

> **Documento Unificado - Fase 5:** Integración Fullstack, TypeScript Estricto y Gestión de Estado Global.

---

## 1. Estructura y Decisiones Técnicas (Frontend)

El proyecto sigue una arquitectura modular diseñada para la escalabilidad y el mantenimiento mediante el uso de TypeScript estricto.

### 1.1 Decisiones Clave de Tipado
* **Componentes Genéricos (`DataTable<T>`)**: Permite la reutilización total de la lógica de tablas para diferentes entidades (`Task`, `User`) manteniendo la seguridad de tipos.
* **Uniones Discriminadas**: Usamos `type Priority = 'High' | 'Medium' | 'Low';` para garantizar que el compilador detecte valores inválidos en tiempo de desarrollo.
* **Exhaustiveness Checking**: Implementación de `never` en bloques `switch` para obligar al manejo de todas las variantes posibles, asegurando un código mantenible.

| Aspecto | JavaScript | TypeScript |
|---------|-----------|------------|
| **Refactorización** | Riesgo alto de rotura | Seguro con type-checking |
| **Documentación** | Comentarios manuales | Los tipos son documentación viva |

---

## 2. Backend API: Arquitectura por Capas

El servidor implementa una **Arquitectura por Capas (Layered Architecture)** para aislar la lógica de negocio de la infraestructura de red.

### Estructura de Responsabilidades
* **Entrada (`src/index.js`)**: Configuración de Express, Middlewares (CORS, JSON) y arranque.
* **Ruteo (`src/routes/`)**: Definición de endpoints y validación de parámetros.
* **Control (`src/controllers/`)**: Gestión de la petición (`req`) y formato de respuesta (`res`).
* **Lógica (`src/services/`)**: Corazón de la aplicación: reglas de negocio y persistencia.

### Definición de Endpoints REST
| Método | Ruta | Acción | Status |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/tasks` | Recupera el listado completo de tareas. | `200` |
| `POST` | `/api/tasks` | Persiste una nueva tarea. | `201` |
| `PATCH` | `/api/tasks/:id` | Actualización parcial (estado, prioridad). | `200` |
| `DELETE` | `/api/tasks/:id` | Eliminación física del registro. | `204` |

---

## 3. 🌐 Capa de Red y API Client

La comunicación se centraliza en una instancia de **Axios** configurada en `src/api/axios.ts`, permitiendo políticas globales de seguridad.

### Configuración de Axios
* **Base URL Adaptativa**: `import.meta.env.VITE_API_URL` gestiona la URL según el entorno (Local vs Producción en Vercel).
* **Interceptores**: Gestión de seguridad inyectando el token JWT en las cabeceras de cada petición.
* **Gestión de Ciclo de Vida**: El cliente maneja explícitamente los estados `FETCH_START`, `SUCCESS` y `ERROR` para hidratar la UI con *skeletons* o alertas.

---

## 4. 🌳 Gestión del Estado Global (Context API)

TaskFlow divide las responsabilidades en dos contextos principales para evitar el *prop drilling*:

1. **ThemeContext**: Gestiona la persistencia del modo claro/oscuro en `localStorage` y sincroniza las variantes `dark:` de Tailwind CSS.
2. **AppContext**: Núcleo lógico que gestiona tareas, proyectos y métricas. 
    * **Optimización**: Las estadísticas se procesan con `useMemo` para evitar re-renders innecesarios.
    * **Hooks de Acceso**: Uso de `useTheme()` y `useApp()` para un consumo seguro de los datos.

---

## 5. 🛣️ Enrutamiento y Navegación

Utilizamos **React Router v6** para una experiencia SPA fluida, manteniendo el estado entre vistas.

* **Navegación Dinámica**: Uso de `useParams` para acceder a proyectos específicos (`/projects/:id`) y `useLocation` para resaltar el enlace activo en el Header.
* **Resiliencia**: Manejo de rutas inexistentes mediante una página `NotFound (*)` y configuración de `rewrites` en Vercel para soportar rutas directas.

### Diseño Visual Orientado a Tipos
El diseño no es solo estética; los **Badges Reactivos** con Tailwind se adaptan automáticamente a los cambios en los tipos de TypeScript mediante mapeos constantes de color.