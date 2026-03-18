import { taskAPI } from './api.js';

const el = (id) => document.getElementById(id);

class TaskApp {
    constructor() {
        this.tasks = [];
        this.init();
    }

    async init() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);

        el('taskForm').addEventListener('submit', (e) => this.handleFormSubmit(e));
        el('themeToggle').addEventListener('click', () => this.toggleTheme());
        el('priorityFilter').addEventListener('change', () => this.render());
        el('searchInput').addEventListener('input', () => this.render());
        
        await this.loadTasks();
    }

    async loadTasks() {
        try {
            const res = await taskAPI.getAll();
            this.tasks = res.data || [];
            this.render();
        } catch (err) { console.error(err); }
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        const title = el('taskInput').value.trim();
        const priority = el('taskPriority').value;
        if (!title) return;
        await taskAPI.create(title, priority);
        el('taskInput').value = '';
        await this.loadTasks();
    }

    async toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        await taskAPI.update(id, { completed: !task.completed });
        await this.loadTasks();
    }

    async deleteTask(id) {
        if (confirm('¿Borrar tarea?')) {
            await taskAPI.delete(id);
            await this.loadTasks();
        }
    }

    render() {
        const list = el('taskList');
        const filter = el('priorityFilter').value;
        const search = el('searchInput').value.toLowerCase();

        const filtered = this.tasks.filter(t => {
            return (filter === 'all' || t.priority === filter) && t.title.toLowerCase().includes(search);
        });

        // Stats
        const done = this.tasks.filter(t => t.completed).length;
        el('completedCount').innerText = done;
        el('pendingCount').innerText = this.tasks.length - done;
        el('progressBar').value = this.tasks.length ? (done / this.tasks.length) * 100 : 0;

        list.innerHTML = filtered.map(t => `
            <li class="task-item ${t.completed ? 'completed' : ''}">
                <div class="task-info">
                    <input type="checkbox" ${t.completed ? 'checked' : ''} onchange="app.toggleTask(${t.id})">
                    <span class="task-title">${t.title}</span>
                    <span class="badge ${t.priority.toLowerCase()}">${t.priority}</span>
                </div>
                <button class="delete-btn" onclick="app.deleteTask(${t.id})">🗑️</button>
            </li>
        `).join('');
    }

    toggleTheme() {
        const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    }
}

const app = new TaskApp();
window.app = app;