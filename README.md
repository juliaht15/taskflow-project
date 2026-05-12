![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-639?style=for-the-badge&logo=css&logoColor=fff)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=FFF)
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)

# 📝 TaskFlow Pro

> **Solución Fullstack para la gestión de tareas de alto rendimiento.**

TaskFlow Pro es una plataforma diseñada bajo estándares profesionales para la organización eficiente de proyectos. Separa de forma estricta las capas de frontend y backend para garantizar escalabilidad y un mantenimiento limpio del código.

| Servicio          | Plataforma | Enlace Directo                                                     |
| :---------------- | :--------- | :----------------------------------------------------------------- |
| **Frontend**      | Vercel     | [🚀 Ver Aplicación](https://taskflow-project-jht.vercel.app/)      |
| **API Backend**   | Render     | [📡 Endpoint API](https://taskflow-api-8d6c.onrender.com)          |
| **Documentación** | Trello     | [📋 Gestión Ágil](https://trello.com/b/CFXX99qx/task-flow-phase-5) |

> [!NOTE]
> **Rendimiento de la API:** Debido al uso del plan gratuito de Render, el servidor puede entrar en reposo. La primera petición puede tardar unos **30 segundos** en responder mientras la instancia se reactiva.

---

## 🌟 Características Destacadas

- **Gestión de Ciclo de Vida:** Flujo completo de creación, edición y eliminación de tareas con persistencia en base de datos.
- **Arquitectura de Proyectos:** Organización jerárquica mediante "Carpetas" dinámicas.
- **Priorización Inteligente:** Clasificación visual por niveles (Baja, Media, Alta).
- **UX Optimizada:** Feedback visual en tiempo real, estados de carga (loading states) y limpieza automática de formularios.
- **Modo Oscuro Nativo:** Interfaz adaptativa con persistencia de preferencia de usuario.

---

## 🛠️ Stack Tecnológico

### Frontend

- **React 18/19 + TypeScript:** Arquitectura de componentes robusta y tipado estático.
- **Tailwind CSS:** Diseño responsive y moderno basado en utilidades.
- **Context API:** Gestión de estado global centralizada.
- **Lucide React:** Iconografía vectorial consistente.
- **Axios:** Cliente HTTP configurado con interceptores para una comunicación limpia con la API.

### Backend

- **Node.js & Express:** Servidor escalable y rápido.
- **RESTful API:** Endpoints estructurados para `/tasks` y `/projects`.
- **CORS & Seguridad:** Configuración de cabeceras para despliegues seguros en entornos distintos.

---

## 📁 Estructura del Proyecto

```text
taskflow-project/
├── react/                 # Aplicación Frontend (Vite)
│   ├── src/
│   │   ├── components/    # Widgets y UI reusable
│   │   ├── context/       # Lógica de estado global
│   │   ├── lib/           # Configuración de Axios (api.ts)
│   │   └── pages/         # Vistas principales (HomePage)
├── api/                   # Servidor Backend (Node)
│   ├── src/
│   │   ├── routes/        # Definición de rutas
│   │   └── controllers/   # Lógica de negocio
└── README.md

```

---

## 🚀 Instalación y Uso Local

Para ejecutar el proyecto localmente, sigue estos pasos:

1. **Clonar el repositorio:**

```bash
git clone [https://github.com/juliaht15/taskflow-project.git](https://github.com/juliaht15/taskflow-project.git)
cd taskflow-project

```

2. **Configurar el Backend:**

```bash
cd api
npm install
npm run dev

```

3. **Configurar el Frontend:**

```bash
cd ../react
npm install
# Asegúrate de configurar tu .env con VITE_API_URL=http://localhost:5000/api
npm run dev

```

---

**Desarrollado por [Julia Huertas**](https://www.google.com/search?q=https://github.com/juliaht15) _Fullstack Developer - 2026_

```

```
