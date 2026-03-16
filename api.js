/**
 * CAPA DE SERVICIO DE API - TASKFLOW PRO
 * Centraliza todas las peticiones fetch al servidor.
 */
const API_URL = 'http://localhost:3000/api/v1/tasks';

export const taskAPI = {
    // Obtener todas las tareas (GET)
    async getAll() {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Error al obtener tareas');
        return await res.json();
    },

    // Crear una tarea (POST) - Ahora acepta 'priority'
    async create(title, priority = 'Media') {
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
    },

    // Actualizar estado o título (PATCH)
    async update(id, updates) {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        });
        if (!res.ok) throw new Error('No se pudo actualizar la tarea');
        return await res.json();
    },

    // Eliminar una tarea (DELETE)
    async delete(id) {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('No se pudo eliminar la tarea');
        return true;
    }
};