// src/reportes.ts
// Cambiamos './types.js' por './api-client.js' que es donde definiste las interfaces
import { EstadoMatricula, Estudiante } from './api-client.js';

export function generarReporte(estudiante: Estudiante, matricula: EstadoMatricula): string {
    let detalle = "";

    switch (matricula.tipo) {
        case "ACTIVA":
            detalle = `Cursando ${matricula.asignaturas.length} asignaturas.`;
            break;
        case "SUSPENDIDA":
            detalle = `Motivo de suspensión: ${matricula.motivo}`;
            break;
        case "FINALIZADA":
            detalle = `Graduado con media de ${matricula.notaMedia}`;
            break;
        default:
            // Este bloque asegura que si añades un tipo nuevo a EstadoMatricula, 
            // TS te avisará de que falta el caso en este switch.
            const _exhaustivo: never = matricula;
            return `Error: Estado no controlado ${_exhaustivo}`;
    }

    return `🎓 ESTUDIANTE: ${estudiante.nombre} | ESTADO: ${matricula.tipo} | ${detalle}`;
}