/**
 * TASKFLOW PRO - API Service Layer
 */

// Usamos ruta relativa para que funcione en cualquier despliegue de Vercel
const API_URL = '/api/v1/tasks';

export const taskAPI = {
    
    async getAll() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Error en la respuesta del servidor');
            return await response.json();
        } catch (error) {
            console.error("API Error (getAll):", error);
            throw new Error('No se pudo conectar con el servidor.');
        }
    },

    async create(title, priority = 'Medium') {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, priority })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al crear tarea');
            }
            return await response.json();
        } catch (error) {
            console.error("API Error (create):", error);
            throw error;
        }
    },

    async update(id, updates) {
        try {
            // Nota: Algunos backends usan PUT, otros PATCH. 
            // Si el tuyo usa PUT, cambia 'PATCH' por 'PUT' aquí abajo.
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PATCH', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            });

            if (!response.ok) throw new Error('No se pudo actualizar la tarea');
            return await response.json();
        } catch (error) {
            console.error("API Error (update):", error);
            throw error;
        }
    },

    async delete(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { 
                method: 'DELETE' 
            });

            if (!response.ok) throw new Error('No se pudo eliminar la tarea');
            return true;
        } catch (error) {
            console.error("API Error (delete):", error);
            throw error;
        }
    }
};