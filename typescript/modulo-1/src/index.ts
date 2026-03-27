// src/index.ts
import { calcularMedia, filtrarAtipicos, calcularMediana } from './math-utils.js';

// Datos de prueba (Imagínate que son notas de un examen)
const notas = [5, 7, 8, 4, 9, 10, 100]; // El 100 es un error evidente
const notaMaximaPosible = 10;

// 1. Filtramos el error (el 100)
const notasValidas = filtrarAtipicos(notas, notaMaximaPosible);

// 2. Calculamos estadísticas
const media = calcularMedia(notasValidas);
const mediana = calcularMediana(notasValidas);

console.log("-----------------------------------------");
console.log("📊 REPORTE ESTADÍSTICO");
console.log("-----------------------------------------");
console.log(`✅ Notas procesadas: ${notasValidas.join(", ")}`);
console.log(`📈 Media del curso: ${media?.toFixed(2) ?? "N/A"}`);
console.log(`📍 Mediana: ${mediana}`);
console.log("-----------------------------------------");