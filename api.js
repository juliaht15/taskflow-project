const API = '/api/v1/tasks';

const request = async (url, opts = {}) => {
  const res = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...opts });
  if (res.status === 204) return { success: true };
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `Error ${res.status}`);
  return { success: true,  data };
};

export const taskAPI = {
  getAll: () => request(API),
  create: (title, priority) => request(API, { method: 'POST', body: JSON.stringify({ title, priority }) }),
  update: (id, updates) => request(`${API}/${id}`, { method: 'PATCH', body: JSON.stringify(updates) }),
  delete: (id) => request(`${API}/${id}`, { method: 'DELETE' })
};