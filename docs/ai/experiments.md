# Bitácora de Experimentación y Configuración de Protocolos (MCP)

Este documento registra formalmente las pruebas de rendimiento realizadas con modelos de IA y la implementación de protocolos de contexto avanzados para optimizar el ciclo de vida del proyecto **TaskFlow**.

---

## 1. Implementación Técnica: Model Context Protocol (MCP)

### ¿Qué es MCP?
El **Model Context Protocol (MCP)** es un estándar abierto que permite a los modelos de lenguaje (LLMs) interactuar de forma segura con fuentes de datos y herramientas externas. A diferencia de los métodos tradicionales de "copy-paste", MCP establece un puente de comunicación bidireccional entre la IA y el entorno de desarrollo en tiempo real.

### Aplicación en TaskFlow
Se ha desplegado un servidor de **Filesystem** mediante el comando `npx -y @modelcontextprotocol/server-filesystem` dentro de Cursor. Esta configuración otorga a la IA capacidades avanzadas:
* **Indexación Estructural:** Capacidad de mapear la jerarquía completa de directorios del proyecto.
* **Análisis de Dependencias Inter-ficheros:** Comprensión de cómo las clases CSS definidas impactan el DOM en el HTML.
* **Refactorización Contextual:** Ejecución de cambios lógicos en `app.js` con conocimiento pleno de las firmas de funciones existentes.

---

## 2. Benchmark de Modelos: ChatGPT vs. Gemini

### Experimento 01: Depuración y Análisis de Errores (Debugging)
Se evaluó la capacidad de detección de errores lógicos complejos y vulnerabilidades de sintaxis.
* **Resultado:** Ambos modelos resolvieron las incidencias. Sin embargo, **Gemini** proporcionó recomendaciones de "Clean Code" más alineadas con estándares de arquitectura modular, sugiriendo una semántica de variables más descriptiva.

### Experimento 02: Consistencia y Estilo de Código
Se solicitó la generación repetida de funciones de transformación (CamelCase) para medir la variabilidad de las respuestas.
* **Resultado:** ChatGPT mostró una alta consistencia con variaciones mínimas. **Gemini** tendió a ofrecer alternativas de optimización en cada iteración, comparando métodos como Expresiones Regulares frente a manipulaciones nativas de String.

---

## 3. Análisis Comparativo: Desarrollo Tradicional vs. Asistido por IA

Evaluación del impacto de la IA en la resolución de problemas y tareas específicas del proyecto.

### Parte A: Algoritmia y Lógica General

| Problema | Resolución Manual (Est.) | Resolución con IA | Impacto en la Calidad |
| :--- | :--- | :--- | :--- |
| **1. Validador de Password** | 10 min | 5 seg | La IA implementó validaciones de seguridad adicionales por defecto. |
| **2. Inversión de String** | 5 min | Instantáneo | Código optimizado y sintácticamente impecable. |
| **3. Eliminación de Duplicados** | 8 min | Instantáneo | Uso de estructuras `Set()`, garantizando eficiencia O(n). |

### Parte B: Implementación en TaskFlow

* **Tarea 1: Formateo de Fechas:** La implementación manual requería consulta de documentación para `Intl.DateTimeFormat` (15 min). La IA generó la lógica de localización en segundos.
* **Tarea 2: Filtrado Dinámico:** Mediante **Composer (Ctrl + I)**, se sincronizaron cambios en HTML y JS de forma simultánea, eliminando errores de discrepancia en selectores (ahorro estimado: 30 min).
* **Tarea 3: Persistencia en LocalStorage:** La IA garantizó una capa de serialización robusta, previniendo excepciones durante el parseo de datos nulos o corruptos.

---

## 4. Conclusión
La integración de IA y protocolos de contexto como MCP reduce el tiempo dedicado a tareas mecánicas y repetitivas entre un **80% y un 90%**. La función del desarrollador evoluciona de la escritura de sintaxis a la **supervisión arquitectónica**, asegurando que las soluciones propuestas mantengan un equilibrio entre eficiencia y mantenibilidad.