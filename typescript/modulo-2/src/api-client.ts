// --- INTERFACES DE DATOS ---

export interface Asignatura {
    id: string;
    nombre: string;
    creditos: number;
}

export interface Estudiante {
    readonly id: number;
    nombre: string;
    email: string;
}

// --- UNIÓN DISCRIMINADA PARA MATRÍCULAS ---

export interface MatriculaActiva { tipo: "ACTIVA"; asignaturas: Asignatura[]; }
export interface MatriculaSuspendida { tipo: "SUSPENDIDA"; motivo: string; }
export interface MatriculaFinalizada { tipo: "FINALIZADA"; notaMedia: number; }

export type EstadoMatricula = MatriculaActiva | MatriculaSuspendida | MatriculaFinalizada;

// --- ESTRUCTURA DE RESPUESTA GENÉRICA ---

export interface RespuestaAPI<T> {
    success: boolean;
    data: T;
    error?: string;
}

// --- CLIENTE API GENÉRICO ---

/**
 * Función genérica <T> que realiza peticiones simuladas.
 * El uso de Promise<RespuestaAPI<T>> asegura que quien llame a la función
 * sepa exactamente qué tipo de datos recibirá.
 */
export async function obtenerRecurso<T>(url: string): Promise<RespuestaAPI<T>> {
    console.log(`📡 Solicitando recurso a: ${url}...`);
    
    // Simulamos un retraso de red de 500ms
    return new Promise((resolve) => {
        setTimeout(() => {
            // En una app real, aquí haríamos un fetch(url)
            resolve({
                success: true,
                data: {} as T 
            });
        }, 500);
    });
}