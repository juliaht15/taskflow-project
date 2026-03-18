import { taskAPI } from './api.js';

const el = id => document.getElementById(id);

class TaskManager {
    constructor() {
        this.tasks = [];
        this.init();
    }

    async init() {
        await this.loadTasks();
        this.setupEventListeners();
        this.loadTheme();
    }

    async loadTasks() {
        try {
            this.tasks = await taskAPI.getAll();
            this.render();
        } catch (err) {
            console.error(err);
            el('taskList').innerHTML = "❌ Error de conexión";
        }
    }

    async toggleTask(id) {
        try {
            const task = this.tasks.find(t => t.id === id);
            if (task) {
                await taskAPI.update(id, { completed: !task.completed });
                await this.loadTasks();
            }
        } catch (err) {
            console.error('Error al actualizar:', err);
        }
    }

    async deleteTask(id) {
        if (!confirm('¿Borrar esta tarea?')) return;
        try {
            await taskAPI.delete(id);
            await this.loadTasks();
        } catch (err) {
            console.error('Error al borrar:', err);
        }
    }

    render() {
        const query = el('searchInput').value.toLowerCase();
        const filter = el('priorityFilter').value;

        el('taskList').innerHTML = this.tasks
            .filter(t => t.title.toLowerCase().includes(query) && (filter === 'all' || t.priority === filter))
            .map(t => this.createTaskHTML(t))
            .join('');

        this.updateStats();
    }

    createTaskHTML(task) {
        const checked = task.completed ? 'checked' : '';
        const css = task.completed ? 'completed' : '';
        const priority = task.priority.toLowerCase();
        const title = this.escapeHTML(task.title);

        return `
            <div class="task-item ${css}">
                <input type="checkbox" ${checked} data-id="${task.id}" class="task-checkbox">
                <span>${title}</span>
                <span class="badge priority-${priority}">${task.priority}</span>
                <button class="task-delete" data-id="${task.id}" aria-label="Eliminar">🗑️</button>
            </div>`;
    }

    escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    updateStats() {
        const done = this.tasks.filter(t => t.completed).length;
        const total = this.tasks.length;
        el('progressBar').value = total ? (done / total) * 100 : 0;
        el('pendingCount').textContent = total - done;
        el('completedCount').textContent = done;
    }

    setupEventListeners() {
        el('taskForm').addEventListener('submit', e => this.handleFormSubmit(e));
        el('searchInput').addEventListener('input', () => this.render());
        el('priorityFilter').addEventListener('change', () => this.render());
        el('themeToggle').addEventListener('click', () => this.toggleTheme());

        el('taskList').addEventListener('change', e => {
            if (e.target.classList.contains('task-checkbox')) {
                this.toggleTask(e.target.dataset.id);
            }
        });

        el('taskList').addEventListener('click', e => {
            if (e.target.classList.contains('task-delete')) {
                this.deleteTask(e.target.dataset.id);
            }
        });
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        const input = el('taskInput');
        const priority = el('taskPriority').value;

        try {
            await taskAPI.create(input.value, priority);
            input.value = '';
            await this.loadTasks();
        } catch (err) {
            console.error('Error al crear:', err);
        }
    }

    toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme');
        const theme = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    loadTheme() {
        const theme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', theme);
    }
}

new TaskManager();