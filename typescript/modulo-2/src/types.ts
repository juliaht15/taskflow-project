// src/types.ts

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

export type EstadoMatricula = MatriculaActiva | MatriculaSuspendida | MatriculaFinalizada;