/**
 * TASKFLOW PRO - Controlador de Interfaz (Frontend)
 * Importa la lógica de datos de api.js
 */
import { taskAPI } from './api.js';

let tasks = [];

// Elementos del DOM
const taskListElement = document.getElementById('task-list');
const progressBarElement = document.getElementById('progress-bar');
const progressTextElement = document.getElementById('progress-text');
const pendingCountElement = document.getElementById('count-pending');
const completedCountElement = document.getElementById('count-done');

/**
 * 1. GESTIÓN DE DATOS
 */
async function loadTasks() {
    try {
        // Feedback visual de carga
        taskListElement.innerHTML = `
            <div class="loading-state">
                <div class="spinner"></div>
                <p class="text-sm font-medium text-indigo-500 animate-pulse">Sincronizando tareas...</p>
            </div>`;
        
        tasks = await taskAPI.getAll();
        renderTasks();
    } catch (error) {
        taskListElement.innerHTML = `
            <div class="p-8 text-center bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/20">
                <p class="text-red-500 font-bold italic text-sm">Error: No se pudo conectar con el servidor.</p>
            </div>`;
    }
}

async function handleAddTask(title, priority) {
    try {
        await taskAPI.create(title, priority);
        closeModalFunc();
        await loadTasks();
    } catch (error) {
        alert(error.message);
    }
}

async function handleDeleteTask(id) {
    if(!confirm("¿Eliminar tarea definitivamente?")) return;
    try {
        await taskAPI.delete(id);
        await loadTasks();
    } catch (error) {
        alert("Error al borrar la tarea");
    }
}

async function handleToggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
        // Enviamos solo el cambio al servidor
        await taskAPI.update(id, { completed: !task.completed });
        await loadTasks();
    } catch (error) {
        // Revertir localmente si falla el servidor
        renderTasks();
        alert("Error al actualizar estado");
    }
}

/**
 * 2. RENDERIZADO Y FILTROS
 */
function renderTasks() {
    taskListElement.innerHTML = '';
    
    // Aplicar filtros antes de pintar
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    const priorityFilter = document.getElementById('filter-priority').value;
    const statusFilter = document.getElementById('filter-status').value;

    const filtered = tasks.filter(task => {
        const title = task.title || task.text || "";
        const matchesSearch = title.toLowerCase().includes(searchQuery);
        const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
        const matchesStatus = statusFilter === 'all' ? true : 
                            statusFilter === 'completed' ? task.completed : !task.completed;
        return matchesSearch && matchesPriority && matchesStatus;
    });

    if (filtered.length === 0) {
        taskListElement.innerHTML = `<p class="text-center py-10 text-slate-400 text-sm italic">No hay tareas que mostrar...</p>`;
    } else {
        filtered.forEach(task => {
            const div = document.createElement('div');
            const config = getPriorityConfig(task.priority || 'Media');
            
            div.className = `task-item flex justify-between items-center p-4 rounded-2xl border border-slate-100 dark:border-slate-800 border-l-4 transition-all shadow-sm ${config.border} ${task.completed ? 'completed' : ''}`;
            
            div.innerHTML = `
                <div class="flex items-center gap-4">
                    <input type="checkbox" ${task.completed ? 'checked' : ''} class="w-5 h-5 cursor-pointer accent-indigo-600 rounded-lg">
                    <div class="flex items-center gap-3">
                        <div class="w-2.5 h-2.5 rounded-full ${config.dot}"></div>
                        <div>
                            <p class="font-bold text-sm leading-tight">${task.title || task.text}</p>
                            <span class="text-[9px] font-black uppercase tracking-widest opacity-40">${task.priority || 'Media'}</span>
                        </div>
                    </div>
                </div>
                <button class="delete-btn text-slate-300 hover:text-red-500 p-2 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>`;

            div.querySelector('.delete-btn').onclick = () => handleDeleteTask(task.id);
            div.querySelector('input').onchange = () => handleToggleTask(task.id);
            taskListElement.appendChild(div);
        });
    }
    updateStats();
}

/**
 * 3. UTILIDADES Y EVENTOS
 */
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    
    progressBarElement.style.width = `${percent}%`;
    progressTextElement.innerText = `${percent}% completado`;
    pendingCountElement.innerText = total - completed;
    completedCountElement.innerText = completed;
}

function getPriorityConfig(p) {
    const configs = {
        'Alta':  { dot: 'bg-red-500', border: 'border-l-red-500 bg-red-50/20 dark:bg-red-900/10' },
        'Media': { dot: 'bg-yellow-500', border: 'border-l-yellow-500 bg-yellow-50/20 dark:bg-yellow-900/10' },
        'Baja':  { dot: 'bg-green-500', border: 'border-l-green-500 bg-green-50/20 dark:bg-green-900/10' }
    };
    return configs[p] || configs['Media'];
}

// Control de Modales
const modal = document.getElementById('modal-add');
const openModalFunc = () => { modal.classList.replace('hidden', 'flex'); };
const closeModalFunc = () => { modal.classList.replace('flex', 'hidden'); };

document.getElementById('open-add-modal').onclick = openModalFunc;
document.getElementById('close-modal').onclick = closeModalFunc;

// Modo Oscuro
document.getElementById('theme-toggle').onclick = () => {
    document.documentElement.classList.toggle('dark');
};

// Formularios
const processSubmit = (e, inputId, priorityId) => {
    e.preventDefault();
    const title = document.getElementById(inputId).value;
    const priority = document.getElementById(priorityId).value;
    handleAddTask(title, priority);
    e.target.reset();
};

document.getElementById('task-form').onsubmit = (e) => processSubmit(e, 'task-input', 'task-priority');
document.getElementById('modal-form').onsubmit = (e) => processSubmit(e, 'modal-input', 'modal-priority');

// Listeners de Filtros
['search-input', 'filter-priority', 'filter-status'].forEach(id => {
    document.getElementById(id).addEventListener('input', renderTasks);
});

// Inicio
loadTasks();