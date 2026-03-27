// src/reportes.ts
import { EstadoMatricula, Estudiante } from './types.js';

export function generarReporte(estudiante: Estudiante, matricula: EstadoMatricula): string {
    let detalle = "";

    switch (matricula.tipo) {
        case "ACTIVA":
            // Aquí TS sabe que existe 'asignaturas'
            detalle = `Cursando ${matricula.asignaturas.length} asignaturas.`;
            break;
        case "SUSPENDIDA":
            // Aquí TS sabe que existe 'motivo'
            detalle = `Motivo de suspensión: ${matricula.motivo}`;
            break;
        case "FINALIZADA":
            // Aquí TS sabe que existe 'notaMedia'
            detalle = `Graduado con media de ${matricula.notaMedia}`;
            break;
    }

    return `🎓 ESTUDIANTE: ${estudiante.nombre} | ESTADO: ${matricula.tipo} | ${detalle}`;
}