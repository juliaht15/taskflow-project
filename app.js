/**
 * TASKFLOW PRO - Frontend Controller
 * All logic in English, UI remains in Spanish
 */
import { taskAPI } from './api.js';

let tasks = [];

// DOM Elements
const taskList = document.getElementById('taskList');
const progressBar = document.getElementById('progressBar');
const pendingCount = document.getElementById('pendingCount');
const completedCount = document.getElementById('completedCount');
const taskForm = document.getElementById('taskForm');
const searchInput = document.getElementById('searchInput');
const priorityFilter = document.getElementById('priorityFilter');
const themeToggle = document.getElementById('themeToggle');

/**
 * 1. DATA MANAGEMENT
 */
async function loadTasks() {
    try {
        taskList.innerHTML = '<p class="loading">Sincronizando tareas...</p>';
        tasks = await taskAPI.getAll();
        renderTasks();
    } catch (error) {
        taskList.innerHTML = '<p class="error">Error: No se pudo conectar con el servidor.</p>';
    }
}

async function handleAddTask(event) {
    event.preventDefault();
    const input = document.getElementById('taskInput');
    const priority = document.getElementById('taskPriority');
    
    try {
        await taskAPI.create(input.value, priority.value);
        input.value = '';
        await loadTasks();
    } catch (error) {
        alert(error.message);
    }
}

async function handleToggleTask(id, currentStatus) {
    try {
        await taskAPI.update(id, { completed: !currentStatus });
        await loadTasks();
    } catch (error) {
        alert("Error al actualizar estado");
    }
}

async function handleDeleteTask(id) {
    if (!confirm("¿Eliminar tarea?")) return;
    try {
        await taskAPI.delete(id);
        await loadTasks();
    } catch (error) {
        alert("Error al borrar");
    }
}

/**
 * 2. RENDERING
 */
function renderTasks() {
    taskList.innerHTML = '';
    
    const query = searchInput.value.toLowerCase();
    const filter = priorityFilter.value;

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(query);
        const matchesPriority = filter === 'all' || task.priority === filter;
        return matchesSearch && matchesPriority;
    });

    if (filteredTasks.length === 0) {
        taskList.innerHTML = '<p>No hay tareas que mostrar</p>';
    } else {
        filteredTasks.forEach(task => {
            const article = document.createElement('article');
            article.className = `task-item ${task.completed ? 'completed' : ''}`;
            
            article.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span>${task.title}</span>
                <mark class="badge priority-${task.priority}">${task.priority}</mark>
                <button class="btn-delete" aria-label="Eliminar">🗑️</button>
            `;

            article.querySelector('input').onchange = () => handleToggleTask(task.id, task.completed);
            article.querySelector('.btn-delete').onclick = () => handleDeleteTask(task.id);
            
            taskList.appendChild(article);
        });
    }
    updateStats();
}

/**
 * 3. UTILS & EVENTS
 */
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
    
    progressBar.value = percentage;
    pendingCount.innerText = total - completed;
    completedCount.innerText = completed;
}

// Theme Management
themeToggle.onclick = () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
};

// Event Listeners
taskForm.onsubmit = handleAddTask;
searchInput.oninput = renderTasks;
priorityFilter.onchange = renderTasks;

// Initialize
loadTasks();