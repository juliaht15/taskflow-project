// src/index.ts
import { Estudiante, EstadoMatricula } from './types.js';
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

console.log(generarReporte(alumno, miMatricula));