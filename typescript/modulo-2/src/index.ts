// src/index.ts
// Cambiamos './types.js' por './api-client.js' para que coincida con tus archivos
import { Estudiante, EstadoMatricula } from './api-client.js';
import { generarReporte } from './reportes.js';

const alumno: Estudiante = {
    id: 1,
    nombre: "Julia Huertas",
    email: "julia@example.com"
};

const miMatricula: EstadoMatricula = {
    tipo: "ACTIVA",
    asignaturas: [
        { id: "TS101", nombre: "TypeScript Avanzado", creditos: 6 },
        { id: "RX202", nombre: "React Estricto", creditos: 8 }
    ]
};

// Imprimimos el resultado final en la consola
console.log("-----------------------------------------");
console.log(generarReporte(alumno, miMatricula));
console.log("-----------------------------------------");