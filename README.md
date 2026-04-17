# TaskFlow Pro - Gestión de Tareas Profesional

<div align="center">

![GitHub top language](https://img.shields.io/github/languages/top/juliaht15/taskflow-project?style=for-the-badge)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://juljaht15-taskflow-project.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

</div>

> **TaskFlow Pro** es una plataforma Fullstack diseñada para la organización eficiente de tareas y proyectos. Combina una interfaz moderna de alto rendimiento con una arquitectura robusta basada en React y Express.

---

## 🌟 Características Principales

* 📊 **Dashboard Interactivo:** Visualiza KPIs y métricas de productividad en tiempo real.
* 📅 **Gestión por Timeframes:** Filtra tus responsabilidades en vistas Diarias, Semanales y Mensuales.
* 📁 **Organización por Proyectos:** Agrupa tareas por categorías con identificación visual por colores.
* 🌗 **Modo Oscuro Nativo:** Interfaz adaptable con persistencia de preferencia en `localStorage`.
* 📱 **Responsive Design:** Experiencia optimizada para móviles, tablets y escritorio.
* 🛡️ **Type Safety:** Desarrollo íntegro en TypeScript para minimizar errores en tiempo de ejecución.
* 🚀 **API RESTful:** Backend estructurado para una comunicación fluida y escalable.

---

## 🚀 Demo e Infraestructura

* 🌐 **Live Demo:** [https://juljaht15-taskflow-project.vercel.app](https://juljaht15-taskflow-project.vercel.app)
* 📌 **Gestión Ágil (Trello):** [Ver Tablero Kanban](https://trello.com/b/CFXX99qx/task-flow-phase-5)

---

## 🛠️ Stack Tecnológico

### Frontend
* **React 19** + Vite
* **Tailwind CSS v4** (Estilos de última generación)
* **Lucide React** (Iconografía consistente)
* **React Router v6** (Navegación SPA)
* **Axios** (Cliente HTTP centralizado)

### Backend
* **Node.js** + **Express**
* **TypeScript** (Middleware y controladores tipados)
* **CORS** (Seguridad en comunicaciones)

---

## 🏗️ Arquitectura del Sistema

La aplicación sigue un modelo de separación de responsabilidades para facilitar el mantenimiento:

```mermaid
graph TD
    A[Frontend React/Vite] -->|Peticiones Axios| B[Backend Express API]
    subgraph "Cliente (Vercel)"
    A --> D[Context API / State]
    A --> E[Componentes UI]
    end
    subgraph "Servidor (Express)"
    B --> G[Rutas REST]
    B --> H[Controladores]
    B --> I[Servicios de Datos]
    end
````

-----

## 📦 Instalación y Ejecución Local

Sigue estos pasos para levantar el entorno de desarrollo:

### 1\. Clonar y Preparar

```bash
git clone [https://github.com/juliaht15/taskflow-project.git](https://github.com/juliaht15/taskflow-project.git)
cd taskflow-project
```

### 2\. Configurar Frontend

```bash
cd react
npm install
# Crear variables de entorno
echo "VITE_API_URL=http://localhost:3000/api" > .env.local
npm run dev
```

### 3\. Configurar Backend

```bash
# En una nueva terminal
cd api
npm install
npm run dev
```

-----

## 📡 API Endpoints (Base URL: `/api`)

### Tareas (`/tasks`)

  * `GET /tasks`: Lista completa de tareas.
  * `POST /tasks`: Crear nueva tarea (requiere título y prioridad).
  * `PATCH /tasks/:id`: Actualizar estado o descripción.
  * `DELETE /tasks/:id`: Eliminar registro permanente.

### Proyectos (`/projects`)

  * `GET /projects`: Obtener categorías existentes.
  * `POST /projects`: Crear nuevo grupo de trabajo.

-----

## 📚 Documentación Detallada

Puedes encontrar guías específicas en la carpeta [`/docs`](https://www.google.com/search?q=./docs/):

  * 📖 [Componentes](https://www.google.com/search?q=./docs/components.md) - Guía de la UI reutilizable.
  * ⚛️ [Hooks & Logic](https://www.google.com/search?q=./docs/hooks.md) - Optimización con `useMemo` y `useCallback`.
  * 🔄 [Estado Global](https://www.google.com/search?q=./docs/context.md) - Implementación de Context API.
  * 🚀 [Despliegue](https://www.google.com/search?q=./docs/deployment.md) - Configuración de Vercel y builds.

-----

## 👩‍💻 Autor

**Julia**

  * GitHub: [@juliaht15](https://github.com/juliaht15)
  * Proyecto final de Fase 5 - Fullstack Development.

-----

\<div align="center"\>

**Hecho por Julia Huertas - 2026**