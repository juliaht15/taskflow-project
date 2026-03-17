# Registro de Prompt Engineering - Estrategias de Optimización

Este documento técnico detalla las metodologías y patrones de *prompting* aplicados para optimizar el desarrollo, la refactorización y la documentación del ecosistema **TaskFlow**.

---

### 1. Instrucción Directa (Zero-shot)
> **Prompt:** "Explica de forma clara y con ejemplos de código: Closures, Event Loop y Hoisting en JavaScript."
* **Valor técnico:** Genera una base teórica inmediata sin necesidad de entrenamiento previo, permitiendo validar conceptos antes de la implementación.

### 2. Depuración Contextual (Debugging)
> **Prompt:** "Identifica fallos de lógica y errores de referencia en el siguiente bloque de funciones: [Snippet de código]"
* **Valor técnico:** Aísla bugs de sintaxis y *scope* en módulos específicos antes de su integración en el entorno de producción.

### 3. Generación con Restricciones (Constraint-based)
> **Prompt:** "Desarrolla tres funciones en JS: un validador de números primos, un formateador de strings (CamelCase) y un calculador de impuestos con una constante de IVA al 21%."
* **Lección aprendida:** La definición de constantes y límites lógicos reduce la variabilidad y garantiza código reutilizable y predecible.

### 4. Definición de Rol (Persona Prompting)
> **Prompt:** "Actúa como un Desarrollador Senior de Frontend. Audita mi archivo index.html y evalúa el cumplimiento de estándares de accesibilidad (WCAG, etiquetas alt, roles ARIA)."
* **Valor técnico:** Eleva el estándar de calidad al forzar a la IA a adoptar una perspectiva de experto, priorizando la semántica y la inclusión sobre el diseño visual básico.

### 5. Razonamiento en Cadena (Chain of Thought)
> **Prompt:** "Explícame la trazabilidad completa: desde que el usuario hace click en 'Añadir tarea' en index.html hasta que la función en app.js actualiza el DOM."
* **Valor técnico:** Desglosa la lógica secuencialmente, facilitando la comprensión del flujo de datos y la detección de cuellos de botella en la arquitectura.

### 6. Aprendizaje con Ejemplos (Few-Shot Prompting)
> **Prompt:** "Quiero implementar un sistema de tags. Entrada: 'Comprar pan #hogar'. Salida: Etiqueta visual 'hogar'. Crea una función Regex que extraiga el patrón tras el símbolo '#'."
* **Valor técnico:** Al proporcionar el formato de entrada/salida, la IA deduce el algoritmo de extracción óptimo sin explicaciones técnicas redundantes.

### 7. Restricciones Negativas (Negative Constraints)
> **Prompt:** "Refactoriza el módulo de eliminación de tareas. Restricción: No utilices librerías externas ni dependencias de terceros; emplea exclusivamente JavaScript Vanilla (ES6+)."
* **Valor técnico:** Evita el "bloatware" y garantiza un código ligero, mantenible y libre de dependencias innecesarias.

### 8. Integración con Contexto Real (MCP - Model Context Protocol)
> **Prompt:** "Accede mediante el servidor MCP a mis archivos locales y verifica si existe alguna discrepancia entre los IDs definidos en el HTML y los selectores del DOM en app.js."
* **Valor técnico:** Elimina las "alucinaciones" de la IA al sincronizar el modelo con el sistema de archivos real, proporcionando un diagnóstico 100% preciso basado en el código actual.

### 9. Ingeniería de Calidad (QA Prompting)
> **Prompt:** "Actúa como Ingeniero de QA. Genera una batería de 5 pruebas manuales para estresar la lista de tareas, incluyendo 'edge cases' como inputs vacíos o caracteres especiales."
* **Valor técnico:** Mejora la robustez de la aplicación al prever escenarios de error que podrían comprometer la integridad de los datos.

### 10. Documentación Automatizada (JSDoc Standard)
> **Prompt:** "Genera la documentación técnica JSDoc para todas las funciones del proyecto, especificando tipos de parámetros, valores de retorno y descripciones funcionales."
* **Valor técnico:** Estandariza la comunicación técnica, garantizando que el código sea legible y profesional para futuros colaboradores.

---

## Conclusión General
La efectividad de la IA en el desarrollo de software es directamente proporcional a la precisión del contexto proporcionado. La sinergia entre **roles especializados**, **restricciones negativas** y la conexión mediante **MCP** transforma a la IA de un asistente de texto a un colaborador técnico estratégico de alto nivel.