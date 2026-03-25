// src/api.js
const API_URL = 'https://taskflow-project-uy2w.vercel.app/api/v1/tasks';

async function request(url, options = {}) {
    try {
        const response = await fetch(url, {
            headers: { 'Content-Type': 'application/json' },
            ...options
        });
        
        if (response.status === 204) return { success: true };
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data?.error || `Error ${response.status}`);
        }
        
        return { success: true,  data };
    } catch (err) {
        console.error('API Error:', err.message, url);
        throw err;
    }
}

export const taskAPI = {
    getAll: () => request(API_URL),
    create: (title, priority) => request(API_URL, {
        method: 'POST',
        body: JSON.stringify({ title, priority })
    }),
    update: (id, updates) => request(`${API_URL}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates)
    }),
    delete: (id) => request(`${API_URL}/${id}`, { method: 'DELETE' })
};