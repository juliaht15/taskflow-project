// src/api-client.ts

export interface RespuestaAPI<T> {
    success: boolean;
    data: T;
    error?: string;
}

// Función genérica <T> que puede devolver cualquier tipo de dato
export async function obtenerRecurso<T>(url: string): Promise<RespuestaAPI<T>> {
    console.log(`📡 Conectando a: ${url}...`);
    
    // Simulamos una respuesta de red con un retardo
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                data: {} as T // En un caso real, aquí vendría el JSON del fetch
            });
        }, 500);
    });
}