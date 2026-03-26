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

## Herramientas del Ecosistema Backend

Para el desarrollo, pruebas y mantenimiento de esta API, se consideran las siguientes herramientas estándar de la industria:

* **Postman / Thunder Client**: Herramientas esenciales para el testing de endpoints. Permiten simular peticiones de clientes (GET, POST, etc.) antes de integrarlas en el frontend, facilitando la depuración de errores 400 o 500.
* **Axios**: Una librería basada en promesas para realizar peticiones HTTP. Aunque en este proyecto usamos `fetch` nativo, Axios es muy valorado por su capacidad de interceptar peticiones y transformar datos automáticamente.
* **Swagger (OpenAPI)**: Es el estándar para documentar APIs interactivas. Permite generar una página web donde otros desarrolladores pueden ver y probar los endpoints de la API de forma visual.
* **Sentry**: Plataforma de monitorización de errores en tiempo real. Si el servidor falla en producción, Sentry envía una alerta inmediata con la traza del error para que el desarrollador pueda corregirlo antes de que afecte a más usuarios.