![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-639?style=for-the-badge&logo=css&logoColor=fff)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=FFF)
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

# 📝 TaskFlow Pro

> Gestión de Tareas Profesional (SaaS-style)

Plataforma Fullstack diseñada para la organización eficiente de tareas y proyectos, ofreciendo una experiencia de usuario fluida con una interfaz moderna y alto rendimiento.

| Despliegue   | URL                                                       |
| ------------ | --------------------------------------------------------- |
| Frontend     | [Vercel](https://juliaht15-taskflow-project.vercel.app)   |
| Gestión Ágil | [Trello](https://trello.com/b/CFXX99qx/task-flow-phase-5) |

---

## Características

- **Gestión de Ciclo de Vida:** Creación, edición, completado y eliminación de tareas en tiempo real.
- **Filtro Inteligente y Prioridades:** Buscador dinámico integrado y clasificación por niveles (Alta, Media, Baja) con indicadores visuales.
- **Categorización por Proyectos:** Organización jerárquica con etiquetas visuales y creación dinámica de carpetas.
- **Tematización Dual:** Soporte nativo para Modo Claro y Modo Oscuro con persistencia visual.

---

## Tecnologías

| Frontend     | Uso                                              |
| ------------ | ------------------------------------------------ |
| React 18/19  | Biblioteca principal para la interfaz de usuario |
| Tailwind CSS | Estilizado moderno y responsive                  |
| Context API  | Gestión de estado global de la aplicación        |
| Lucide React | Set de iconos vectoriales                        |

| Backend    | Uso                                                  |
| ---------- | ---------------------------------------------------- |
| Node.js    | Entorno de ejecución para el servidor                |
| Express    | Framework para la creación de la API REST            |
| TypeScript | Tipado estático para asegurar la integridad de datos |

| Auxiliares | Uso                                           |
| ---------- | --------------------------------------------- |
| Axios      | Cliente HTTP con interceptores personalizados |
| CORS       | Middleware de seguridad para acceso cruzado   |
| Vercel     | Plataforma de despliegue y hosting            |

---

## Estructura del proyecto

```
taskflow-project/
├── react/                  # Frontend del proyecto
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── context/        # Estado global (Context API)
│   │   ├── hooks/          # Lógica personalizada
│   │   └── services/       # Comunicación con la API (Axios)
│   └── package.json
├── api/                    # Backend del proyecto (Node/Express)
│   ├── src/
│   │   ├── routes/         # Endpoints de /tasks y /projects
│   │   ├── controllers/    # Lógica de negocio
│   │   └── models/         # Interfaces y tipos de TS
│   └── package.json
└── README.md
```

---

## Descargar y ejecutar

```bash
# 1. Clonar el repositorio
git clone [https://github.com/juliaht15/taskflow-project.git](https://github.com/juliaht15/taskflow-project.git)
cd taskflow-project

# 2. Instalar y ejecutar Backend
cd api
npm install
npm run dev

# 3. Instalar y ejecutar Frontend (en otra terminal)
cd ../react
npm install
npm run dev
```

---

## Desplegar en Vercel

### Frontend

1. Conectar el repositorio de GitHub en el dashboard de Vercel.
2. Configurar el `Root Directory` como la carpeta `react/`.
3. Añadir las variables de entorno necesarias (API URL) y desplegar.

### Backend

1. Crear un nuevo proyecto en Vercel apuntando a la carpeta `api/`.
2. Asegurar que el archivo `vercel.json` esté correctamente configurado para funciones Serverless.
3. Desplegar y vincular la URL generada al Frontend.

---

_Desarrollado durante las prácticas en [Corner Estudios](https://www.corner-estudios.com) — Julia Huertas — 2026_

```

```
