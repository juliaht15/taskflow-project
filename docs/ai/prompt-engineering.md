# Registro de Prompt Engineering - Proyecto Taskflow

Este documento detalla la experimentación con técnicas de optimización de prompts para mejorar el desarrollo, la refactorización y la documentación del proyecto Taskflow.

---

### 1. Conceptos Técnicos (Zero-shot)
> **Prompt:** "Explica de forma clara y con código: Closures, Event Loop y Hoisting en JS."
* **Por qué funciona:** Proporciona una base teórica rápida para entender el comportamiento del lenguaje sin necesidad de contexto previo.

### 2. Debugging Contextual
> **Prompt:** "Encuentra los errores en estas funciones: [se pegaron las funciones con fallos]"
* **Por qué funciona:** Permite identificar errores de sintaxis y lógica en bloques de código aislados antes de integrarlos al proyecto.

### 3. Creación de funciones con Restricciones
> **Prompt:** "Crea tres funciones en JS: una de números primos, otra de CamelCase y otra de cálculo de IVA al 21%."
* **Lección aprendida:** Cuanto más específico soy con las restricciones (ej: "usa constantes para el IVA"), más predecible y reutilizable es el código generado.

### 4. Definición de Rol (Persona Prompting)
> **Prompt:** "Actúa como un Desarrollador Senior de Frontend. Revisa mi archivo index.html y dime si cumple con las buenas prácticas de accesibilidad (etiquetas alt, roles aria)."
* **Por qué funciona:** Eleva la calidad de la respuesta al adoptar una perspectiva de experto, priorizando estándares que un modelo generalista podría ignorar.

### 5. Razonamiento Paso a Paso (Chain of Thought)
> **Prompt:** "Explícame paso a paso cómo se conecta mi archivo app.js con el index.html para capturar el evento de click en el botón de añadir tarea."
* **Por qué funciona:** Obliga a la IA a desglosar la lógica secuencialmente, facilitando el aprendizaje y la detección de fallos en el flujo de datos.

### 6. Few-Shot Prompting (Uso de ejemplos)
> **Prompt:** "Quiero añadir etiquetas a las tareas. Ejemplo: 'Comprar pan #hogar', 'Estudiar JS #estudios'. Crea una función que detecte el texto después del '#' y lo convierta en una etiqueta visual."
* **Por qué funciona:** Al proporcionar el formato de entrada esperado, la IA deduce el patrón de extracción (Regex) sin necesidad de explicaciones técnicas complejas.

### 7. Restricciones Negativas
> **Prompt:** "Refactoriza la función de eliminar tareas. Restricción: No utilices librerías externas ni jQuery, usa solo JavaScript Vanilla y que el código no ocupe más de 10 líneas."
* **Por qué funciona:** Evita el "sobrediseño" y garantiza que el código sea ligero y fácil de mantener sin dependencias extrañas.

### 8. Uso de Contexto MCP (Model Context Protocol)
> **Prompt:** "Usa el servidor MCP para leer mis archivos locales y dime si hay alguna discrepancia entre los IDs de mi index.html y los selectores que uso en app.js."
* **Por qué funciona:** Es el prompt más potente. Al acceder al sistema de archivos real, la IA elimina las alucinaciones y ofrece soluciones basadas en la realidad del proyecto.

### 9. Generación de Pruebas (QA)
> **Prompt:** "Actúa como un Ingeniero de QA. Genera una lista de 5 pruebas manuales para asegurar que la lista de tareas no falle con nombres vacíos o caracteres especiales."
* **Por qué funciona:** Ayuda a prever casos de borde (edge cases) que mejoran la robustez de la aplicación antes de la entrega.

### 10. Documentación Profesional
> **Prompt:** "Genera comentarios JSDoc para todas las funciones de mi proyecto, explicando qué parámetros reciben y qué devuelven."
* **Por qué funciona:** Estandariza la documentación técnica de forma masiva, ahorrando tiempo y mejorando la legibilidad para otros desarrolladores.

---

## Conclusión General
La efectividad de la IA depende directamente de la calidad y claridad del contexto. La combinación de **roles de experto**, **ejemplos claros** y la conexión directa a los archivos mediante **MCP** transforma a la IA de un simple asistente en un colaborador técnico de alto nivel.