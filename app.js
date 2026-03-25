import { taskAPI } from './api.js';
const el = (id) => document.getElementById(id);
const escapeHtml = (t) => { const d = document.createElement('div'); d.textContent = t; return d.innerHTML; };

class TaskApp {
    constructor() { this.tasks = []; this.loading = false; this.init(); }
    
    async init() {
        document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'light');
        el('taskForm').addEventListener('submit', e => this.handleFormSubmit(e));
        el('themeToggle').addEventListener('click', () => this.toggleTheme());
        el('priorityFilter').addEventListener('change', () => this.render());
        el('searchInput').addEventListener('input', () => this.render());
        el('taskList').addEventListener('click', e => this.handleListClick(e));
        await this.loadTasks();
    }

    setLoading(show) {
        this.loading = show;
        const spinner = el('loading');
        if (spinner) spinner.style.display = show ? 'block' : 'none';
    }
    showError(msg) {
        const alert = el('error-alert');
        if (alert) { alert.textContent = msg; alert.style.display = 'block'; setTimeout(() => alert.style.display = 'none', 3000); }
    }

    async loadTasks() {
        try {
            this.setLoading(true);
            const res = await taskAPI.getAll();
            this.tasks = res.data || [];
            this.render();
        } catch (err) { this.showError(err.message || 'Error al cargar'); console.error(err); }
        finally { this.setLoading(false); }
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        const title = el('taskInput').value.trim(), priority = el('taskPriority').value;
        if (!title || title.length < 3) return this.showError('Título mínimo 3 caracteres');
        try {
            this.setLoading(true);
            await taskAPI.create(title, priority);
            el('taskInput').value = '';
            await this.loadTasks();
        } catch (err) { this.showError(err.message || 'Error al crear'); }
        finally { this.setLoading(false); }
    }

    handleListClick(e) {
        const li = e.target.closest('li.task-item'); if (!li) return;
        const id = parseInt(li.dataset.id);
        if (e.target.classList.contains('delete-btn')) this.deleteTask(id);
        else if (e.target.type === 'checkbox') this.toggleTask(id);
    }

    async toggleTask(id) {
        try {
            const task = this.tasks.find(t => t.id === id);
            await taskAPI.update(id, { completed: !task.completed });
            await this.loadTasks();
        } catch { this.showError('Error al actualizar'); }
    }

    async deleteTask(id) {
        if (!confirm('¿Borrar tarea?')) return;
        try { await taskAPI.delete(id); await this.loadTasks(); }
        catch { this.showError('Error al eliminar'); }
    }

    render() {
        const list = el('taskList'), filter = el('priorityFilter').value, search = el('searchInput').value.toLowerCase();
        const filtered = this.tasks.filter(t => (filter === 'all' || t.priority === filter) && t.title.toLowerCase().includes(search));
        const done = this.tasks.filter(t => t.completed).length;
        el('completedCount').innerText = done;
        el('pendingCount').innerText = this.tasks.length - done;
        el('progressBar').value = this.tasks.length ? (done / this.tasks.length) * 100 : 0;
        list.innerHTML = filtered.map(t => `
            <li class="task-item ${t.completed ? 'completed' : ''}" data-id="${t.id}">
                <div class="task-info">
                    <input type="checkbox" ${t.completed ? 'checked' : ''}>
                    <span class="task-title">${escapeHtml(t.title)}</span>
                    <span class="badge priority-${t.priority.toLowerCase()}">${t.priority}</span>
                </div>
                <button class="delete-btn" aria-label="Eliminar">🗑️</button>
            </li>`).join('');
    }

    toggleTheme() {
        const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    }
}
const app = new TaskApp(); window.app = app;