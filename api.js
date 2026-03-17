/**
 * CAPA DE SERVICIO DE API - TASKFLOW PRO
 * Centraliza todas las peticiones fetch al servidor Express.
 * Elimina la dependencia de LocalStorage para usar persistencia en el Backend.
 */

// URL para desarrollo local. 
// Nota: Cuando despliegues en Vercel, deberás cambiar esto por tu URL de producción.
const API_URL = 'http://localhost:3000/api/v1/tasks';

export const taskAPI = {
    
    /**
     * Obtener todas las tareas (GET)
     * @returns {Promise<Array>} Lista de tareas desde el servidor.
     */
    async getAll() {
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error('Error al obtener tareas');
            return await res.json();
        } catch (error) {
            console.error("API Error (getAll):", error);
            throw error;
        }
    },

    /**
     * Crear una nueva tarea (POST)
     * @param {string} title 
     * @param {string} priority 
     */
    async create(title, priority = 'Media') {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, priority })
        });

        if (!res.ok) {
            const errorData = await res.json();
            // Captura el mensaje de validación del backend (ej: "Título muy corto")
            throw new Error(errorData.error || 'Error al crear la tarea');
        }
        return await res.json();
    },

    /**
     * Actualización parcial de una tarea (PATCH)
     * Ideal para el 'toggle' de completado o edición de título.
     * @param {number|string} id 
     * @param {object} updates - Ejemplo: { completed: true }
     */
    async update(id, updates) {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        });

        if (!res.ok) throw new Error('No se pudo actualizar la tarea en el servidor');
        return await res.json();
    },

    /**
     * Eliminar una tarea definitivamente (DELETE)
     * @param {number|string} id 
     */
    async delete(id) {
        const res = await fetch(`${API_URL}/${id}`, { 
            method: 'DELETE' 
        });

        if (!res.ok) throw new Error('No se pudo eliminar la tarea');
        // DELETE suele retornar 204 (No Content), por eso devolvemos true directamente
        return true;
    }
};