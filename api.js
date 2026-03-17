/**
 * CAPA DE SERVICIO DE API - TASKFLOW PRO
 */

// URL LIMPIA: Hemos verificado que esta es la ruta correcta de tu backend en Vercel
const API_URL = 'https://taskflow-project-uy2w-i6xzsfh3z-juliaht15s-projects.vercel.app/api/v1/tasks';

export const taskAPI = {
    
    /**
     * Obtener todas las tareas (GET)
     */
    async getAll() {
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error('Error en la respuesta del servidor');
            return await res.json();
        } catch (error) {
            console.error("Error getAll:", error);
            throw new Error('No se pudo conectar con el servidor. Verifica que el Backend esté online.');
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
            console.error("Error create:", error);
            throw error;
        }
    },

    /**
     * Actualización parcial de una tarea (PATCH)
     */
    async update(id, updates) {
        try {
            // Construcción segura de la URL: API_URL + / + id
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            });

            if (!res.ok) throw new Error('No se pudo actualizar la tarea');
            return await res.json();
        } catch (error) {
            console.error("Error update:", error);
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
            console.error("Error delete:", error);
            throw error;
        }
    }
};