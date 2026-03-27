// --- TIPOS PRIMITIVOS ---
let nombreProyecto: string = "TaskFlow Pro";
let tareasPendientes: number = 5;
let estaFinalizado: boolean = false;

// --- ARRAYS ---
let etiquetas: string[] = ["urgente", "escuela", "personal"];

// --- ENUMS (Ideal para estados fijos) ---
export enum Prioridad {
    BAJA = "Baja",
    MEDIA = "Media",
    ALTA = "Alta"
}

// --- INTERFAZ SIMPLE ---
export interface TareaBasica {
    titulo: string;
    prioridad: Prioridad;
}

const miPrimeraTarea: TareaBasica = {
    titulo: "Reconstruir Módulo 1",
    prioridad: Prioridad.ALTA
};

console.log(`🚀 Proyecto: ${nombreProyecto}`);
console.log(`📝 Tarea actual: ${miPrimeraTarea.titulo} [${miPrimeraTarea.prioridad}]`);