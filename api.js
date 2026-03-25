// Configuración dinámica de la URL base
const API_BASE = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000/api/v1/tasks' 
  : 'https://tu-backend-real.com/api/v1/tasks'; // Reemplaza con tu URL de producción

const request = async (url, method = 'GET', body = null) => {
  try {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
      ...(body && { body: JSON.stringify(body) })
    };

    const res = await fetch(url, options);
    
    // 204 No Content (habitual en DELETE) no tiene JSON
    if (res.status === 204) return { success: true };

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `Error ${res.status}`);

    return { success: true, data };
  } catch (err) {
    console.error(`❌ API [${method}] ${url}:`, err.message);
    throw err;
  }
};

export const taskAPI = {
  getAll: () => request(API_BASE),
  create: (title, priority) => request(API_BASE, 'POST', { title, priority }),
  update: (id, updates) => request(`${API_BASE}/${id}`, 'PATCH', updates),
  delete: (id) => request(`${API_BASE}/${id}`, 'DELETE')
};