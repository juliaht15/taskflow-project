# Memoria del Proyecto: Task Flow

> **Nota de organización:** Este documento unifica la fase de investigación, definición y gestión del proyecto para ofrecer una visión clara y sin ruido del ciclo de vida del desarrollo.

---

## 1. Definición del Proyecto

### Problema que resuelve
**Task Flow** surge para solucionar el caos en la organización de tareas diarias. Muchos usuarios se sienten abrumados por herramientas demasiado complejas o excesivamente simples. Esta aplicación ofrece un equilibrio profesional, permitiendo gestionar flujos de trabajo con una interfaz intuitiva basada en React y una persistencia de datos robusta en el backend.

### Usuario objetivo
* **Freelancers** que necesitan organizar sus proyectos de forma ágil.
* **Estudiantes de programación** que buscan una herramienta con estética técnica y funcional.
* **Equipos pequeños** que prefieren simplicidad, velocidad y claridad visual.

### Funcionalidades principales
* **Gestión CRUD Completa:** Capacidad para crear, leer, actualizar y eliminar tareas en tiempo real.
* **Arquitectura Fullstack:** Conexión real con una API desarrollada en Node.js/Express.
* **Interfaz Dinámica y Resiliente:** Gestión de estados visuales de carga (*loading*), éxito y manejo de errores de red.
* **Categorización Inteligente:** Clasificación de tareas mediante etiquetas y estados.

### Funcionalidades opcionales (Implementadas)
* Filtros de búsqueda por prioridad o estado.
* Implementación de **Modo Oscuro** (Dark Mode) persistente.
* Notificaciones visuales de feedback al usuario tras acciones clave.

### Mejoras futuras
* Sistema de **Autenticación de Usuarios** (JWT).
* Soporte para **Drag & Drop** para la reordenación visual de tareas.
* Integración con módulos de gestión académica y reportes de productividad.

---

## 2. Investigación: Metodologías de Desarrollo

### ¿Qué es Agile?
Es una filosofía orientada al desarrollo de software que prioriza la **entrega continua de valor**, la capacidad de respuesta ante los cambios y la colaboración constante. En lugar de grandes entregas finales, Agile divide el proyecto en iteraciones pequeñas para asegurar que el producto evoluciona según las necesidades reales.

### Scrum: Marco de Trabajo por Sprints
Scrum organiza el desarrollo en ciclos cerrados y rítmicos.
* **Roles clave:** * *Product Owner:* Gestiona el valor del producto y prioridades.
    * *Scrum Master:* Facilita el proceso y elimina impedimentos.
    * *Equipo de Desarrollo:* Profesionales que ejecutan el trabajo técnico.
* **Artefactos y Eventos:**
    * *Sprint:* Ciclo de trabajo fijo (2-4 semanas).
    * *Backlog:* Lista priorizada de todo lo que el producto necesita.
    * *Sprint Review:* Revisión del incremento de software funcional al final del ciclo.

### Kanban: Gestión Visual del Flujo
Método enfocado en la visualización del trabajo y la eficiencia del flujo constante.
* **Tablero Kanban:** Representación visual del estado de las tareas (To Do, Doing, Done).
* **Límite WIP (Work In Progress):** Técnica para limitar el trabajo en curso, evitando la sobrecarga del equipo y detectando cuellos de botella.

### Diferencias y Casos de Uso

| Característica | Scrum | Kanban |
| :--- | :--- | :--- |
| **Tiempo** | Ciclos fijos (Sprints) | Flujo continuo de entrega |
| **Roles** | Roles definidos y obligatorios | No requiere roles específicos |
| **Flexibilidad** | Cambios limitados durante el Sprint | Permite cambios en cualquier momento |

* **Cuándo usar Scrum:** En proyectos complejos que requieren una estructura rítmica y entregas parciales predecibles.
* **Cuándo usar Kanban:** Ideal para mantenimiento, soporte o proyectos donde las prioridades cambian rápidamente y se busca optimizar el flujo de trabajo existente.