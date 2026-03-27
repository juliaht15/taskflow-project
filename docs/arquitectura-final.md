# 🏛️ Arquitectura del Proyecto: TaskFlow Pro

## 1. Estructura de Módulos
Hemos dividido el proyecto en tres capas lógicas para asegurar la escalabilidad:
- **Módulo 1 (Lógica):** Utilidades matemáticas puras con TypeScript estricto.
- **Módulo 2 (Dominio):** Modelado de la universidad usando Interfaces y Uniones Discriminadas para evitar estados imposibles.
- **Módulo 3 (Frontend):** Implementación en React de componentes genéricos reutilizables.

## 2. Decisiones Técnicas
- **Tipado Genérico:** Implementamos una `DataTable<T>` que permite visualizar cualquier estructura de datos, garantizando seguridad de tipos en tiempo de compilación.
- **Tailwind CSS v4:** Configuración moderna mediante `@tailwindcss/postcss` para un diseño ágil y responsive.
- **NodeNext:** Uso del sistema de módulos más reciente de Node para compatibilidad con ESM.

## 3. Beneficios de TypeScript
Gracias al uso de TS, hemos reducido los errores en tiempo de ejecución al validar las propiedades de las matrículas y los datos de las tablas antes de que lleguen al navegador.