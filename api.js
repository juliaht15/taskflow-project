const API_URL = 'https://taskflow-project-uy2w.vercel.app/api/v1/tasks';

async function request(url, options = {}) {
    const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        ...options
    });
    if (!response.ok) throw new Error('Error en la petición');
    return response.json();
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