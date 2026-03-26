const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000/api/v1/tasks'
  : '/api/v1/tasks';

const request = async (url, method = 'GET', body = null) => {
  try {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
      ...(body && { body: JSON.stringify(body) })
    };

    const res = await fetch(url, options);
    
    if (res.status === 204) return { success: true };

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `Error ${res.status}`);

    return { success: true, data };
  } catch (err) {
    console.error(`API Error [${method}] ${url}:`, err.message);
    throw err;
  }
};

export const taskAPI = {
  getAll: () => request(API_BASE),
  create: (title, priority) => request(API_BASE, 'POST', { title, priority }),
  update: (id, updates) => request(`${API_BASE}/${id}`, 'PATCH', updates),
  delete: (id) => request(`${API_BASE}/${id}`, 'DELETE')
};