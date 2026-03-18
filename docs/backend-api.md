# Backend API - TaskFlow Pro

## Arquitectura

El servidor está estructurado en patrón **MVC** (Model-View-Controller):

```
server/src/
├── config/          # Configuración (variables de entorno)
├── controllers/     # Lógica de handlers HTTP
├── routes/         # Definición de rutas
├── services/       # Lógica de negocio
└── index.js        # Punto de entrada
```

## Endpoints Principales

### GET /api/v1/tasks
Obtiene todas las tareas.

**Response:**
```json
{
  "success": true,
  "data": [
    { "id": 1, "title": "Task 1", "priority": "High", "completed": false, "createdAt": "2026-03-18T10:00:00Z" }
  ],
  "count": 1
}
```

### POST /api/v1/tasks
Crea una nueva tarea.

**Body:**
```json
{ "title": "Nueva tarea", "priority": "Medium" }
```

**Response (201):**
```json
{
  "success": true,
  "data": { "id": 3, "title": "Nueva tarea", "priority": "Medium", "completed": false }
}
```

### PATCH /api/v1/tasks/:id
Actualiza una tarea (marca como completada, etc).

**Body:**
```json
{ "completed": true }
```

### DELETE /api/v1/tasks/:id
Elimina una tarea.

**Response (200):**
```json
{
  "success": true,
  "message": "Tarea 1 eliminada"
}
```

---

## Stack Tecnológico

| Herramienta    | Propósito                              | Estado      |
|----------------|----------------------------------------|-------------|
| Express.js     | Framework HTTP                        | ✅ Activo   |
| Cors           | Control de origen cruzado              | ✅ Activo   |
| Dotenv         | Variables de entorno                  | ✅ Activo   |
| Nodemon        | Hot reload en desarrollo              | ✅ Activo   |
| Fetch API      | Cliente HTTP nativo                   | ✅ Activo   |
| Thunder Client | Testing de endpoints                  | 📋 Opcional |
| Swagger/OpenAPI| Documentación interactiva             | 📋 Planeado |
| Sentry         | Monitoreo de errores en producción    | 📋 Planeado |

---

## Validación y Manejo de Errores

El proyecto incluye:
- ✅ Validación de entrada en routes y services
- ✅ Errores estructurados con códigos (`TASK_NOT_FOUND`, `INVALID_TITLE`)
- ✅ Middleware global de error handling
- ✅ HTTP status codes correctos (200, 201, 400, 404, 500)

### Ejemplo de error:
```json
{
  "success": false,
  "error": "El título no puede estar vacío"
}
```

---

## Variables de Entorno (.env)

```
NODE_ENV=development
PORT=3000
CORS_ORIGIN=*
```

---

## Scripts disponibles

```bash
npm start    # Arranca el servidor
npm run dev  # Arranca con nodemon (recarga automática en cambios)
```

---

## Próximos Pasos

- [ ] Implementar Swagger/OpenAPI para documentación interactiva
- [ ] Integrar Sentry para monitoreo en producción
- [ ] Añadir tests unitarios con Node test runner
- [ ] Persistencia en base de datos (MongoDB/PostgreSQL)
- [ ] Seguridad: validación JWT, rate limiting

*Última actualización: 18 de marzo de 2026*