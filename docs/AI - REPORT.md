# 🤖 Reporte de Implementación e Investigación de IA - TaskFlow Pro

> **Nota de organización:** Este documento unifica la experimentación, el flujo de trabajo con Cursor, la ingeniería de prompts y la reflexión estratégica sobre el uso de Inteligencia Artificial en el proyecto.

---

## 1. Comparativa de Modelos: ChatGPT vs. Gemini

Se evaluó el desempeño de ambos modelos al explicar conceptos base de JavaScript y su eficacia en la resolución de problemas técnicos.

| Categoría | ChatGPT | Gemini |
| :--- | :--- | :--- |
| **Conceptos (Closures/Event Loop)** | Enfoque práctico y directo. Ideal para soluciones rápidas. | Análisis profundo de gestión de memoria y concurrencia. |
| **Debugging** | Identifica errores de sintaxis de forma inmediata. | Sugiere refactorizaciones completas para mejorar la legibilidad. |
| **Generación de Código** | Código legible con estructuras clásicas (for loops). | Soluciones modernas (Array methods) enfocadas en eficiencia. |

**Conclusión:** **Gemini** destaca en optimización y buenas prácticas para arquitecturas escalables, mientras que **ChatGPT** es más ágil para prototipado rápido.

---

## 2. Flujo de Trabajo con Cursor (IDE)

Este apartado detalla la metodología aplicada para optimizar la productividad mediante las capacidades nativas de la IA en el editor.

* **Indexación Global:** Uso de la capacidad de Cursor para mapear el repositorio completo, manteniendo el contexto de TaskFlow.
* **Comandos Clave:**
    * `Ctrl + K`: Refactorización inmediata de bloques de código (ej: implementación de `try/catch`).
    * `Ctrl + L`: Consultas técnicas sobre la arquitectura del código fuente.
    * `Ctrl + I` (Composer): Generación de cambios multi-archivo, coordinando estilos y lógica simultáneamente.

---

## 3. Experimentación y Protocolos (MCP)

Implementación del **Model Context Protocol (MCP)** para establecer un puente de comunicación bidireccional entre la IA y el entorno de desarrollo.

### Impacto de la IA en la Productividad (Benchmark)
| Tarea | Resolución Manual (Est.) | Resolución con IA | Impacto en la Calidad |
| :--- | :--- | :--- | :--- |
| **Validador de Password** | 10 min | 5 seg | Implementó validaciones de seguridad extra por defecto. |
| **Formateo de Fechas** | 15 min | Instantáneo | Localización exacta con `Intl.DateTimeFormat`. |
| **Filtrado Dinámico** | 30 min | 1 min | Sincronización perfecta entre HTML y JS mediante Composer. |

---

## 4. Registro de Prompt Engineering

Metodologías aplicadas para obtener resultados de alto nivel técnico:

1. **Persona Prompting:** "Actúa como Desarrollador Senior" para auditar accesibilidad y semántica.
2. **Chain of Thought:** Explicación de la trazabilidad desde el click del usuario hasta la actualización del DOM.
3. **Negative Constraints:** "No utilices librerías externas" para garantizar un código ligero en Vanilla JS.
4. **Few-Shot Prompting:** Proporcionar ejemplos de entrada/salida para generar Regex de extracción de tags.

---

## 5. Reflexión Final: El Paradigma de la Programación Asistida

La IA ha sido un catalizador de productividad, desplazando el foco desde la sintaxis mecánica hacia el **diseño de arquitectura**.

* **Limitaciones detectadas:** Riesgo de "alucinaciones" (selectores inexistentes) corregido mediante el uso de **MCP**.
* **Erosión de capacidad:** Se identifica el riesgo de delegación absoluta. La IA debe ser un motor de aceleración, nunca un sustituto del pensamiento lógico-estructural.
* **El nuevo rol:** El desarrollador evoluciona hacia una figura de **Arquitecto y Auditor**, supervisando que cada línea de código cumpla con los estándares de mantenibilidad.