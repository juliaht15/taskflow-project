// Usar ruta relativa (funciona en mismo dominio)
const API_URL = '/api/v1/tasks';

const request = async (url, opts = {}) => {
  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...opts
    });
    
    if (res.status === 204) return { success: true };
    
    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.error || `Error ${res.status}`);
    }
    
    return { success: true,  data };
  } catch (err) {
    console.error('API Error:', err.message, url);
    throw err;
  }
};

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