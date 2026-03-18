/**
 * TASKFLOW PRO - API Client
 * Conectado directamente a la instancia de producción en Vercel.
 */

const API_URL = 'https://taskflow-project-uy2w.vercel.app/api/v1/tasks';

async function request(url, options = {}) {
  const { headers = {}, ...rest } = options;
  const response = await fetch(url, {
    headers: { 
      'Content-Type': 'application/json',
      ...headers
    },
    ...rest
  });
  if (!response.ok) throw new Error(`Error: ${response.status}`);
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
  delete: (id) => fetch(`${API_URL}/${id}`, { method: 'DELETE' })
};