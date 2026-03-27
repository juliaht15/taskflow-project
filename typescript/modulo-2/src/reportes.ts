// src/reportes.ts
import { EstadoMatricula, Estudiante } from './types.js';

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

            const _exhaustivo: never = matricula;
            return `Error: Estado no controlado ${_exhaustivo}`;
    }

    return `🎓 ESTUDIANTE: ${estudiante.nombre} | ESTADO: ${matricula.tipo} | ${detalle}`;
}