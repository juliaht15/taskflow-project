# TaskFlow Pro - Backend API Documentation

Esta documentación detalla la arquitectura, el diseño y el funcionamiento del servidor de TaskFlow Pro, optimizado para alto rendimiento y mantenibilidad.

## Arquitectura del Sistema

El servidor implementa una **Arquitectura por Capas (Layered Architecture)**. Este diseño garantiza que la lógica de negocio esté aislada de la infraestructura de red.



### Estructura y Responsabilidades

| Capa | Carpeta | Responsabilidad |
| :--- | :--- | :--- |
| **Entrada** | `src/index.js` | Configuración de Express, Middlewares (CORS, JSON) y arranque. |
| **Ruteo** | `src/routes/` | Define los endpoints y aplica validaciones de parámetros (IDs). |
| **Control** | `src/controllers/`| Extrae datos de la petición (`req`) y formatea la respuesta (`res`). |
| **Lógica** | `src/services/` | **Corazón de la app**: Reglas de negocio y persistencia de datos. |
| **Config** | `src/config/` | Gestión centralizada de variables de entorno (`.env`). |

---

## Flujo de una Petición (Request Lifecycle)

1. **Client**: Envía `POST /api/v1/tasks`.
2. **Router**: Verifica que la ruta existe.
3. **Controller**: Valida que el `body` tenga los campos necesarios.
4. **Service**: Crea el objeto, asigna un ID, fecha y lo guarda en el array.
5. **Response**: El Controller devuelve un `201 Created` con la nueva tarea.

---

## Seguridad y Validaciones

* **CORS**: Configuración restrictiva basada en el entorno (Producción vs Desarrollo).
* **Centralización de Errores**: Uso de la clase personalizada `TaskError` para estandarizar respuestas de error (400, 404, 500).
* **Sanitización**: Los servicios limpian los strings (`trim()`) y validan tipos antes de persistir.

---

## Despliegue (Vercel)

El backend está configurado como una **Serverless Function**. 
* **Configuración**: `vercel.json` mapea todas las rutas `/api/*` al punto de entrada.
* **Runtime**: Node.js 18.x+.