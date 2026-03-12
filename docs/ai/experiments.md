# Bitácora de Experimentos y Configuración MCP

Este documento registra las pruebas realizadas con diferentes modelos de IA y la implementación del protocolo de contexto para mejorar el desarrollo de TaskFlow.

---

## 1. Investigación: Model Context Protocol (MCP)

### ¿Qué es MCP?
Es un protocolo abierto que permite a los modelos de IA conectarse de forma segura a datos y herramientas externas (bases de datos, archivos locales, APIs). En lugar de copiar y pegar código manualmente, la IA "conecta" con la fuente de información en tiempo real.

### Implementación en TaskFlow
He configurado un servidor de **Filesystem** mediante el comando `npx -y @modelcontextprotocol/server-filesystem` en Cursor. Esto permite que la IA:
* Lea la estructura completa de carpetas.
* Analice las relaciones entre archivos (ej. clases de CSS aplicadas en el HTML).
* Realice refactorizaciones sabiendo exactamente qué funciones existen en `app.js`.

---

## 2. Experimentos de Comparativa (ChatGPT vs Claude)

### Experimento 01: Detección de Bugs
Se probó la capacidad de ambos modelos para encontrar errores sutiles de lógica y sintaxis.
* **Resultado:** Ambos modelos pasaron la prueba, pero Claude ofreció consejos de "Clean Code" más profundos, sugiriendo mejores nombres de variables.

### Experimento 02: Estilos de Código
Se pidió la misma función (CamelCase) varias veces para observar la consistencia.
* **Resultado:** ChatGPT varía poco su respuesta; Claude intenta optimizarla y proponer alternativas (Regex vs Métodos de String) en cada intento.

---

## 3. Comparativa: Desarrollo Manual vs. IA (Paso 7)

A continuación, se detallan los resultados de resolver problemas lógicos y tareas del proyecto con y sin asistencia.

### Parte A: Problemas de Programación General

| Problema | Resolución Manual (Est.) | Resolución con IA | Diferencia de Calidad |
| :--- | :--- | :--- | :--- |
| **1. Validador de Password** | 10 min | 5 segundos | La IA incluyó manejo de errores por defecto. |
| **2. Invertir una cadena** | 5 min | Instantáneo | Código idéntico, ahorro de tiempo total. |
| **3. Eliminar duplicados** | 8 min | Instantáneo | La IA usó `new Set()`, la opción más eficiente. |

### Parte B: Tareas Aplicadas al Proyecto TaskFlow

* **Tarea 1: Formateo de fechas:** Sin IA hubiera tardado 15 min investigando `Intl.DateTimeFormat`. Con IA, la función se generó en segundos con el formato local correcto.
* **Tarea 2: Filtro por estado:** Usando **Composer (Ctrl + I)**, la IA modificó HTML y JS simultáneamente, ahorrando 30 min de ajustes manuales de IDs.
* **Tarea 3: Persistencia LocalStorage:** La IA aseguró que el flujo `JSON.stringify` / `JSON.parse` fuera robusto, evitando errores de datos "null".

---

## 4. Conclusión Final
El uso de IA reduce el tiempo de desarrollo en un **80-90%** en tareas repetitivas. Sin embargo, la supervisión humana sigue siendo clave para validar que la lógica sugerida no sea excesivamente compleja para el mantenimiento del proyecto.