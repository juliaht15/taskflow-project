# 🌐 Capa de Red y API Client - TaskFlow

Esta sección describe la arquitectura de comunicación entre el cliente (React) y el servidor (Express), basada en **Axios** y reforzada con el tipado estricto de **TypeScript**.

---

## 🛠️ Configuración del Cliente Axios
`src/api/axios.ts`

Hemos centralizado la configuración de red en una instancia única de Axios. Esto permite aplicar políticas globales de seguridad y manejo de datos sin repetir código.

```tsx
import axios from 'axios';

const api = axios.create({
  // URL base adaptativa según el entorno de ejecución
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Límite de 10s para evitar colgar la UI
});

// Interceptor de seguridad: Inyecta el JWT en cada petición saliente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
```

---

## 🏗️ Contratos de Datos e Interfaces

Para asegurar la integridad de la información, el cliente utiliza las mismas definiciones de tipos que el servidor. Esto elimina errores de "campos indefinidos" durante el desarrollo.

* **Tipado de Respuesta:** Al usar `api.get<Task[]>('/tasks')`, TypeScript garantiza que los datos consumidos en los componentes sigan la estructura de la interfaz `Task`.
* **Interfaces Clave:** Localizadas en `src/types/index.ts`.

---

## 🚦 Gestión del Ciclo de Vida de Peticiones

TaskFlow gestiona explícitamente los estados de red mediante el **AppContext** para ofrecer feedback visual al usuario:

1.  **`FETCH_START`**: Activa *skeleton screens* o spinners.
2.  **`FETCH_SUCCESS`**: Hidrata el estado global con los datos del servidor.
3.  **`FETCH_ERROR`**: Captura excepciones (404, 500, Red caída) y muestra alertas amigables.

```tsx
const fetchTasks = async () => {
  dispatch({ type: 'FETCH_START' });
  try {
    const { data } = await api.get<Task[]>('/tasks');
    dispatch({ type: 'FETCH_SUCCESS', payload: data });
  } catch (err) {
    dispatch({ type: 'FETCH_ERROR', payload: 'No se pudieron sincronizar las tareas' });
  }
};
```

---

## 🔐 Variables de Entorno (Environment)

Utilizamos variables de entorno para que el código sea agnóstico al lugar donde se ejecuta:

| Entorno | Archivo | URL de API (Ejemplo) |
| :--- | :--- | :--- |
| **Desarrollo** | `.env.local` | `http://localhost:3000/api` |
| **Producción** | **Vercel Dashboard** | `https://api.taskflow.com/api` |

---

## 📑 Definición de Endpoints REST

| Método | Ruta | Acción | Status |
| :--- | :--- | :--- | :--- |
| `GET` | `/tasks` | Recupera el listado completo de tareas. | `200` |
| `POST` | `/tasks` | Persiste una nueva tarea en la base de datos. | `201` |
| `PATCH` | `/tasks/:id` | Actualización parcial (estado, prioridad, etc.). | `200` |
| `DELETE` | `/tasks/:id` | Eliminación física del registro. | `204` |

---

## 🚀 Optimizaciones de Red

* **Prevención de Race Conditions:** Deshabilitación de botones durante el estado de `loading`.
* **Manejo de CORS:** El backend solo autoriza peticiones provenientes del dominio oficial en Vercel.
* **Interceptores de Error:** Captura global de errores 401 para redirigir al login en caso de sesión expirada (futuro).

---