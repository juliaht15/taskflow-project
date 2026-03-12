/**
 * TASKFLOW PRO - Lógica de aplicación
 * Refactorizada con asistencia de IA para máxima eficiencia
 */

// Selección de elementos del DOM
const taskListElement = document.getElementById('task-list');
const themeToggleButton = document.getElementById('theme-toggle');
const progressBarElement = document.getElementById('progress-bar');
const progressTextElement = document.getElementById('progress-text');
const pendingCountElement = document.getElementById('count-pending');
const completedCountElement = document.getElementById('count-done');

// Tareas por defecto (solo carga si no hay datos previos)
const DEFAULT_TASKS = [
    { id: 1, text: "Configurar estructura semántica", priority: "Alta", completed: true },
    { id: 2, text: "Implementar filtros de estado", priority: "Alta", completed: false }
];

// Carga inicial segura de datos
let tasks = [];
try {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [...DEFAULT_TASKS];
} catch (e) {
    console.error("Error al cargar LocalStorage, reiniciando datos...");
    tasks = [...DEFAULT_TASKS];
}

/**
 * Aplica el tema guardado o la preferencia del sistema
 */
function applyTheme() {
    const isDark = localStorage.theme === 'dark' || 
                  (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', isDark);
}

// Cambio de tema
themeToggleButton.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.theme = isDark ? 'dark' : 'light';
});

/**
 * Configuración visual de prioridades
 * @param {string} priority 
 */
function getPriorityConfig(priority) {
    const configs = {
        'Alta':  { dot: 'bg-red-500', border: 'border-l-red-500 bg-red-50/20 dark:bg-red-900/10' },
        'Media': { dot: 'bg-yellow-500', border: 'border-l-yellow-500 bg-yellow-50/20 dark:bg-yellow-900/10' },
        'Baja':  { dot: 'bg-green-500', border: 'border-l-green-500 bg-green-50/20 dark:bg-green-900/10' }
    };
    return configs[priority] || configs['Media'];
}

/**
 * Filtra tareas según búsqueda, prioridad y estado
 */
function getFilteredTasks() {
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    const priorityFilter = document.getElementById('filter-priority').value;
    const statusFilter = document.getElementById('filter-status').value;

    return tasks.filter(task => {
        const matchesSearch = task.text.toLowerCase().includes(searchQuery);
        const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
        const matchesStatus = statusFilter === 'all' ? true : 
                            statusFilter === 'completed' ? task.completed : !task.completed;
        return matchesSearch && matchesPriority && matchesStatus;
    });
}

/**
 * Crea el elemento de la tarea para el DOM
 */
function createTaskElement(task) {
    const div = document.createElement('div');
    const config = getPriorityConfig(task.priority);
    
    div.className = `task-item flex justify-between items-center p-4 rounded-2xl border border-slate-100 dark:border-slate-800 border-l-4 transition-all shadow-sm hover:shadow-md ${config.border} ${task.completed ? 'opacity-50 grayscale' : ''}`;
    
    div.innerHTML = `
        <div class="flex items-center gap-4">
            <input type="checkbox" ${task.completed ? 'checked' : ''} 
                class="w-5 h-5 cursor-pointer accent-indigo-600 rounded-lg transition-transform active:scale-90"
                onclick="toggleTask(${task.id})">
            <div class="flex items-center gap-3">
                <div class="w-2.5 h-2.5 rounded-full ${config.dot} animate-pulse"></div>
                <div>
                    <p class="font-bold text-sm leading-tight ${task.completed ? 'line-through text-slate-400' : ''}">${task.text}</p>
                    <span class="text-[9px] font-black uppercase tracking-widest opacity-40">${task.priority}</span>
                </div>
            </div>
        </div>
        <div class="flex gap-1">
            <button onclick="editTask(${task.id})" class="text-slate-300 hover:text-indigo-500 p-2 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
            </button>
            <button onclick="deleteTask(${task.id})" class="text-slate-300 hover:text-red-500 p-2 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
    `;
    return div;
}

function renderTasks() {
    taskListElement.innerHTML = '';
    const filteredTasks = getFilteredTasks();
    
    if (filteredTasks.length === 0) {
        taskListElement.innerHTML = `<p class="text-center py-10 text-slate-400 text-sm italic">No se encontraron tareas...</p>`;
    } else {
        filteredTasks.forEach(task => taskListElement.appendChild(createTaskElement(task)));
    }
    updateStats();
}

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    
    progressBarElement.style.width = `${percent}%`;
    progressTextElement.innerText = `${percent}% completado`;
    pendingCountElement.innerText = pending;
    completedCountElement.innerText = completed;
}

function save() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function addTask(text, priority) {
    if (!text || text.trim() === "") return;
    tasks.push({ id: Date.now(), text: text.trim(), priority, completed: false });
    save();
}

// Funciones globales para botones dinámicos
window.editTask = (id) => {
    const task = tasks.find(t => t.id === id);
    const newText = prompt("Edita tu tarea:", task.text);
    if (newText && newText.trim() !== "") {
        task.text = newText.trim();
        save();
    }
};

window.toggleTask = (id) => {
    tasks = tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t);
    save();
};

window.deleteTask = (id) => {
    if(confirm("¿Seguro que quieres eliminar esta tarea?")) {
        tasks = tasks.filter(t => t.id !== id);
        save();
    }
};

// Modales
const modalAdd = document.getElementById('modal-add');
const closeModal = () => {
    modalAdd.classList.add('hidden');
    modalAdd.classList.remove('flex');
};

document.getElementById('open-add-modal').onclick = () => {
    modalAdd.classList.remove('hidden');
    modalAdd.classList.add('flex');
};

document.getElementById('close-modal').onclick = closeModal;

// Formularios
document.getElementById('task-form').onsubmit = (e) => {
    e.preventDefault();
    addTask(document.getElementById('task-input').value, document.getElementById('task-priority').value);
    e.target.reset();
};

document.getElementById('modal-form').onsubmit = (e) => {
    e.preventDefault();
    addTask(document.getElementById('modal-input').value, document.getElementById('modal-priority').value);
    closeModal();
    e.target.reset();
};

// Filtros reactivos
document.getElementById('search-input').oninput = renderTasks;
document.getElementById('filter-priority').onchange = renderTasks;
document.getElementById('filter-status').onchange = renderTasks;
document.getElementById('reset-btn').onclick = () => { 
    if(confirm("Se borrarán todos los datos. ¿Continuar?")) { 
        localStorage.clear(); 
        location.reload(); 
    }
};

// Inicialización
applyTheme();
renderTasks();