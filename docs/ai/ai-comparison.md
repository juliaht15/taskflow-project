# Comparación de IAs - Conceptos de JavaScript

En este experimento comparé cómo explican diferentes modelos de IA los conceptos base del lenguaje utilizado en Taskflow y su capacidad para resolver problemas.

## 1. Comparativa de Conceptos Teóricos

| Concepto | ChatGPT (Resumen) | Claude (Resumen) |
| :--- | :--- | :--- |
| **Closures** | Se centra en la persistencia de variables. Ejemplo corto y directo. | Explica el "entorno léxico" y la privacidad de datos con más detalle. |
| **Event Loop** | Lo explica como una cola de tareas simple para principiantes. | Detalla la diferencia técnica entre Microtasks y Macrotasks. |
| **Hoisting** | Explica que las variables "suben" al inicio del archivo. | Advierte sobre la "Temporal Dead Zone" específica de `let` y `const`. |

---

## 2. Detección de Errores (Debugging)
Se les pasó a ambos modelos un código con errores de referencia y de lógica en una función de suma y un selector del DOM.
* **ChatGPT:** Detectó el error de sintaxis rápidamente y propuso una solución funcional.
* **Claude:** Además de corregir el error, explicó por qué fallaba la referencia al scope global y sugirió una mejora en la declaración de variables.

---

## 3. Generación de Código
Pedí a ambos asistentes que crearan una función para filtrar tareas por prioridad.
* **Calidad de ChatGPT:** Código limpio, usando un bucle `for` tradicional, muy fácil de entender.
* **Calidad de Claude:** Utilizó métodos modernos como `.filter()` y `.map()`, entregando un código más profesional y optimizado.

---

## 4. Conclusión Final
**Claude** es más profundo académicamente, lo cual es mejor para entender el "por qué" de las cosas y aprender buenas prácticas. **ChatGPT** es mejor para entender el concepto rápido, obtener una respuesta inmediata y empezar a programar sin rodeos.