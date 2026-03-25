import { taskAPI } from './api.js';

const $ = id => document.getElementById(id);

class App {
  tasks = [];

  async init() {
    // Configuración inicial de UI
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Event Listeners centralizados
    $('taskForm').onsubmit = (e) => this.handleSubmit(e);
    $('themeToggle').onclick = () => this.toggleTheme();
    ['priorityFilter', 'searchInput'].forEach(id => $(id).oninput = () => this.render());
    $('taskList').onclick = (e) => this.handleAction(e);

    await this.fetchTasks();
  }

  async fetchTasks() {
    try {
      const res = await taskAPI.getAll();
      this.tasks = res.data || [];
      this.render();
    } catch (err) { this.showAlert(err.message); }
  }

  async handleSubmit(e) {
    e.preventDefault();
    const input = $('taskInput');
    const title = input.value.trim();
    if (title.length < 3) return this.showAlert('Mínimo 3 caracteres');

    try {
      const newTask = await taskAPI.create(title, $('taskPriority').value);
      this.tasks.push(newTask.data); // Optimistic UI: añadir sin recargar todo
      input.value = '';
      this.render();
    } catch (err) { this.showAlert('Error al crear'); }
  }

  async handleAction(e) {
    const li = e.target.closest('li');
    if (!li) return;
    const id = parseInt(li.dataset.id);

    if (e.target.classList.contains('delete-btn')) {
      if (!confirm('¿Borrar tarea?')) return;
      await taskAPI.delete(id);
      this.tasks = this.tasks.filter(t => t.id !== id);
    } else if (e.target.type === 'checkbox') {
      const task = this.tasks.find(t => t.id === id);
      task.completed = !task.completed;
      await taskAPI.update(id, { completed: task.completed });
    }
    this.render();
  }

  render() {
    const filter = $('priorityFilter').value;
    const search = $('searchInput').value.toLowerCase();
    
    const filtered = this.tasks.filter(t => 
      (filter === 'all' || t.priority === filter) && 
      t.title.toLowerCase().includes(search)
    );

    const completed = this.tasks.filter(t => t.completed).length;
    $('completedCount').textContent = completed;
    $('pendingCount').textContent = this.tasks.length - completed;

    $('taskList').innerHTML = filtered.map(t => `
      <li data-id="${t.id}" class="task-item ${t.completed ? 'completed' : ''}">
        <div class="task-info">
          <input type="checkbox" ${t.completed ? 'checked' : ''}>
          <span class="title">${this.esc(t.title)}</span>
          <span class="badge priority-${t.priority.toLowerCase()}">${t.priority}</span>
        </div>
        <button class="delete-btn" aria-label="Eliminar">🗑️</button>
      </li>
    `).join('');
  }

  esc(t) {
    const div = document.createElement('div');
    div.textContent = t;
    return div.innerHTML;
  }

  showAlert(msg) {
    const el = $('error-alert');
    if (!el) return;
    el.textContent = msg;
    el.style.display = 'block';
    setTimeout(() => el.style.display = 'none', 3000);
  }

  toggleTheme() {
    const theme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
}

new App().init();