# TaskFlow Pro - Backend API Documentation

Esta documentación detalla la arquitectura, el diseño y el funcionamiento del servidor de TaskFlow Pro, desarrollado para la **Fase 3** del proyecto.

## Arquitectura del Sistema
El servidor sigue una **Arquitectura por Capas (Layered Architecture)** basada en el principio de **Separación de Responsabilidades (SoC)**. Esto permite que el código sea testeable y escalable.



### Estructura de Carpetas
```text
server/src/
├── config/         # Configuración y validación de variables de entorno (.env)
├── controllers/    # Directores de orquesta: extraen datos de req y envían res
├── routes/         # Definición de endpoints y verbos HTTP
├── services/       # Corazón de la app: lógica de negocio pura y persistencia
└── index.js        # Punto de entrada, middlewares globales y servidor