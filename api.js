/**
 * CAPA DE SERVICIO DE API - TASKFLOW PRO
 * Centraliza todas las peticiones fetch al servidor Express.
 */

const API_URL = 'https://taskflow-project-uy2w-i6xzsfh3z-juliaht15s-projects.vercel.app/api/v1/tasks';
export const taskAPI = {
    
    /**
     * Obtener todas las tareas (GET)
     */
    async getAll() {
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error('Error al obtener tareas');
            return await res.json();
        } catch (error) {
            console.error("Error de conexión:", error);
            // Re-lanzamos el error para que la UI lo capture y muestre el mensaje rojo
            throw new Error('No se pudo conectar con el servidor. Verifica tu conexión.');
        }
    },

    /**
     * Crear una nueva tarea (POST)
     */
    async create(title, priority = 'Media') {
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, priority })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Error al crear la tarea');
            }
            return await res.json();
        } catch (error) {
            throw error;
        }
    },

    /**
     * Actualización parcial de una tarea (PATCH)
     */
    async update(id, updates) {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            });

            if (!res.ok) throw new Error('No se pudo actualizar la tarea');
            return await res.json();
        } catch (error) {
            throw error;
        }
    },

    /**
     * Eliminar una tarea definitivamente (DELETE)
     */
    async delete(id) {
        try {
            const res = await fetch(`${API_URL}/${id}`, { 
                method: 'DELETE' 
            });

            if (!res.ok) throw new Error('No se pudo eliminar la tarea');
            return true;
        } catch (error) {
            throw error;
        }
    }
};