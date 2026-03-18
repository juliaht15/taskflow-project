const API_URL = '/api/v1/tasks';

// Importante: Usamos 'export' para que app.js pueda verlo
export const taskAPI = {
    async getAll() {
        const response = await fetch(API_URL);
        return await response.json();
    },
    async create(title, priority) {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, priority })
        });
        return await response.json();
    },
    async update(id, updates) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        });
        return await response.json();
    },
    async delete(id) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        return true;
    }
};