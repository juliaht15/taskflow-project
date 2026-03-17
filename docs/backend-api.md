# Ecosistema de Desarrollo y Herramientas de Backend

En la ingeniería de software moderna, el desarrollo de APIs no se limita a escribir código. Para garantizar la robustez, observabilidad y escalabilidad del sistema, integramos herramientas que optimizan el ciclo de vida del software.

## 1. Axios (Cliente HTTP)
**¿Qué es?** Es una librería basada en promesas para realizar peticiones HTTP tanto en el navegador como en Node.js.
**¿Por qué se usa?** * **Transformación automática:** Convierte automáticamente los datos a JSON.
* **Interceptores:** Permite capturar peticiones o respuestas antes de que sean procesadas (útil para añadir tokens de seguridad globalmente).
* **Sintaxis limpia:** A diferencia de `fetch`, Axios maneja mejor los errores de red y tiene una sintaxis más intuitiva.

## 2. Postman / Thunder Client
**¿Qué es?** Son plataformas de colaboración para el desarrollo y prueba de APIs.
**¿Por qué se usa?** * **Pruebas de caja negra:** Permiten testear los endpoints (`GET`, `POST`, `DELETE`) sin necesidad de tener el frontend terminado.
* **Documentación dinámica:** Generan ejemplos de peticiones y respuestas automáticamente.
* **Entornos:** Facilitan el cambio rápido entre URLs de desarrollo (localhost) y producción (Vercel/AWS).

## 3. Sentry (Gestión de Errores)
**¿Qué es?** Es una plataforma de monitoreo de errores y rendimiento (APM - Application Performance Monitoring).
**¿Por qué se usa?** * **Notificaciones en tiempo real:** Si el servidor falla en producción, Sentry envía una alerta inmediata antes de que el usuario lo reporte.
* **Trazabilidad:** Proporciona el "stack trace" exacto, el dispositivo del usuario y las líneas de código donde ocurrió el fallo.
* **Contexto:** Ayuda a entender bajo qué condiciones específicas ocurrió un error de servidor (500).

## 4. Swagger / OpenAPI
**¿Qué es?** Es un conjunto de herramientas de código abierto que ayudan a diseñar, construir, documentar y consumir servicios web RESTful.
**¿Por qué se usa?** * **Contrato de API:** Sirve como "manual de instrucciones" visual e interactivo para otros desarrolladores.
* **Estandarización:** Utiliza la especificación OpenAPI, que es el estándar universal en la industria.
* **Pruebas integradas:** Permite ejecutar peticiones directamente desde la página de documentación sin usar herramientas externas.

---
*Documentación para el proyecto TaskFlow Pro - Fase 3.*