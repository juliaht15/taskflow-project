# 🚀 Operaciones: Testing y Despliegue - TaskFlow Pro

> **Nota de organización:** Este documento unifica las fases de verificación de calidad, la infraestructura técnica y la estrategia de puesta en producción del proyecto.

---

## 🧪 Pruebas de Software (Testing)

### Pruebas Manuales
* **Creación:** Se validó que las tareas se guardan correctamente en el servidor Express.
* **Persistencia:** Al reiniciar el servidor, los datos se mantienen en memoria (o se resetean según el diseño de la sesión).
* **Validación:** Se comprobó que el formulario no permite el envío de tareas con campos vacíos.

### Diseño y UX
* **Compatibilidad:** Comprobado y funcional en navegadores Chrome y Firefox.
* **Responsive:** El layout colapsa y se adapta correctamente en dispositivos móviles y tablets.

---

## 🏗️ Infraestructura y Entorno

TaskFlow está desplegado como una **SPA (Single Page Application)** utilizando el ecosistema de **Vercel**, sincronizado directamente con el repositorio de GitHub para despliegues automatizados tras cada `push`.

### Ficha Técnica del Proyecto
* **Plataforma:** Vercel
* **Repositorio:** `juliaht15/taskflow-project`
* **Framework:** React + Vite
* **Rama de Producción:** `main`

---

## 🛠️ Configuración de Build e Inyección de Rutas

Dado que el código fuente de React reside en el subdirectorio `/react`, hemos configurado un archivo de control `vercel.json` en la raíz para orquestar el despliegue:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "buildCommand": "cd react && npm install && npm run build",
  "outputDirectory": "react/dist"
}
```

### Puntos clave de la configuración:
1. **Enrutamiento SPA:** La regla `rewrites` redirige cualquier tráfico al `index.html`. Esto es crítico para que **React Router** tome el control y las rutas como `/tasks` no devuelvan un error 404 al recargar el navegador.
2. **Pipeline de Construcción:** Vercel navega automáticamente a la subcarpeta, instala dependencias y genera los archivos estáticos optimizados.

---

## 🔐 Variables de Entorno

La comunicación con el backend es dinámica. En el panel de control de Vercel, se ha configurado la siguiente variable:

| Variable | Descripción | Valor de Ejemplo |
| :--- | :--- | :--- |
| `VITE_API_URL` | URL base del backend Express | `https://api.taskflow.pro/api` |

> [!IMPORTANT]
> Nunca incluyas archivos `.env` en el repositorio Git. Las claves deben gestionarse siempre desde la interfaz del proveedor de hosting.

---

## 🔗 Acceso al Proyecto

La aplicación es totalmente funcional y accesible en vivo a través de:

🌐 **[TaskFlow Pro en Vercel](https://juliaht15-taskflow-project.vercel.app)**

---

## ✅ Checklist de Calidad Post-Despliegue

Se han realizado las siguientes pruebas de humo (*smoke tests*) en el entorno real:
- [x] **Renderizado:** Carga inicial fluida.
- [x] **Persistencia:** El Dark Mode se mantiene tras refrescar la página.
- [x] **Rutas:** Navegación directa vía URL funcional (gracias a `rewrites`).
- [x] **Integridad:** El formulario de tareas comunica correctamente con los estados globales.
- [x] **Estilos:** Renderizado correcto de gradientes y utilidades de Tailwind.

---

## 📈 Roadmap de Mantenimiento

1. **Backend Pro:** Migración de la API de Express a un entorno de producción dedicado (Railway/Render).
2. **Base de Datos:** Implementación de persistencia real con MongoDB Atlas.
3. **Auth:** Integración de sistema de usuarios y sesiones seguras.
```

---
