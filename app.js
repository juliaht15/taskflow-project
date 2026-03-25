import { taskAPI } from './api.js';
const $ = id => document.getElementById(id);

class App {
  tasks = [];
  async init() {
    document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'light');
    $('taskForm').onsubmit = e => this.submit(e);
    $('themeToggle').onclick = () => this.toggleTheme();
    $('priorityFilter').onchange = () => this.render();
    $('searchInput').oninput = () => this.render();
    $('taskList').onclick = e => this.handleClick(e);
    await this.load();
  }
  
  async load() {
    try {
      const res = await taskAPI.getAll();
      this.tasks = res.data || [];
      this.render();
    } catch (err) { this.alert(err.message); }
  }
  
  async submit(e) {
    e.preventDefault();
    const title = $('taskInput').value.trim();
    const priority = $('taskPriority').value;
    if (title.length < 3) return this.alert('Mínimo 3 caracteres');
    await taskAPI.create(title, priority);
    $('taskInput').value = '';
    await this.load();
  }
  
  handleClick(e) {
    const li = e.target.closest('li');
    if (!li) return;
    const id = parseInt(li.dataset.id);
    if (e.target.classList.contains('delete-btn')) this.delete(id);
    else if (e.target.type === 'checkbox') this.toggle(id);
  }
  
  async toggle(id) {
    const task = this.tasks.find(t => t.id === id);
    await taskAPI.update(id, { completed: !task.completed });
    await this.load();
  }
  
  async delete(id) {
    if (!confirm('¿Borrar?')) return;
    await taskAPI.delete(id);
    await this.load();
  }
  
  render() {
    const filter = $('priorityFilter').value;
    const search = $('searchInput').value.toLowerCase();
    const filtered = this.tasks.filter(t => 
      (filter === 'all' || t.priority === filter) && t.title.toLowerCase().includes(search)
    );
    $('completedCount').textContent = this.tasks.filter(t => t.completed).length;
    $('pendingCount').textContent = this.tasks.length - $('completedCount').textContent;
    $('taskList').innerHTML = filtered.map(t => `
      <li data-id="${t.id}" class="task-item ${t.completed ? 'completed' : ''}">
        <div class="task-info">
          <input type="checkbox" ${t.completed ? 'checked' : ''}>
          <span class="title">${this.escape(t.title)}</span>
          <span class="badge priority-${t.priority.toLowerCase()}">${t.priority}</span>
        </div>
        <button class="delete-btn" aria-label="Eliminar">🗑️</button>
      </li>
    `).join('');
  }
  
  escape(t) {
    const d = document.createElement('div');
    d.textContent = t;
    return d.innerHTML;
  }
  
  alert(msg) {
    const el = $('error-alert');
    if (el) { el.textContent = msg; el.style.display = 'block'; setTimeout(() => el.style.display = 'none', 3000); }
  }
  
  toggleTheme() {
    const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }
}

const app = new App();
app.init();
window.app = app;