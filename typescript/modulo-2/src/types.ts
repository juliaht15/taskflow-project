// --- INTERFACES BÁSICAS ---

export interface Asignatura {
    id: string;
    nombre: string;
    creditos: number;
}

export interface Estudiante {
    readonly id: number; // No se puede cambiar una vez creado
    nombre: string;
    email: string;
}

// --- UNIÓN DISCRIMINADA (Patrón de oro) ---

export interface MatriculaActiva {
    tipo: "ACTIVA"; // El discriminante
    asignaturas: Asignatura[];
}

export interface MatriculaSuspendida {
    tipo: "SUSPENDIDA";
    motivo: string;
}

export interface MatriculaFinalizada {
    tipo: "FINALIZADA";
    notaMedia: number;
}

/** * IMPORTANTE: Definición de EstadoMatricula. 
 */
export type EstadoMatricula = MatriculaActiva | MatriculaSuspendida | MatriculaFinalizada;

// --- FUNCIÓN DE UTILIDAD (Ejemplo de uso del patrón) ---
export function obtenerResumenMatricula(estado: EstadoMatricula): string {
    switch (estado.tipo) {
        case "ACTIVA":
            return `Matrícula activa con ${estado.asignaturas.length} asignaturas.`;
        case "SUSPENDIDA":
            return `Matrícula suspendida por: ${estado.motivo}`;
        case "FINALIZADA":
            return `Estudios finalizados con nota media de ${estado.notaMedia}`;
        default:
            return "Estado desconocido";
    }
}