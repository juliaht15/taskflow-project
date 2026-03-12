const taskListElement = document.getElementById('task-list');
const themeToggleButton = document.getElementById('theme-toggle');
const progressBarElement = document.getElementById('progress-bar');
const progressTextElement = document.getElementById('progress-text');
const pendingCountElement = document.getElementById('count-pending');
const completedCountElement = document.getElementById('count-done');

// Demo tasks (loaded only on first visit)
const DEFAULT_TASKS = [
    { id: 1, text: "Configurar estructura semántica", priority: "Alta", completed: true },
    { id: 2, text: "Implementar filtros de estado", priority: "Alta", completed: false }
];

let tasks = JSON.parse(localStorage.getItem('tasks')) || [...DEFAULT_TASKS];

/**
 * Apply theme based on localStorage or system preference
 */
function applyTheme() {
    const isDark = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) document.documentElement.classList.add('dark');
}

/**
 * Toggle dark/light theme and save preference
 */
themeToggleButton.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
});

/**
 * Get priority styling configuration
 * @param {string} priority - Task priority level
 * @returns {Object} Configuration object with dot and border classes
 */
function getPriorityConfig(priority) {
    const config = {
        'Alta':  { dot: 'bg-red-500', border: 'border-l-red-500 bg-red-50/20 dark:bg-red-900/10' },
        'Media': { dot: 'bg-yellow-500', border: 'border-l-yellow-500 bg-yellow-50/20 dark:bg-yellow-900/10' },
        'Baja':  { dot: 'bg-green-500', border: 'border-l-green-500 bg-green-50/20 dark:bg-green-900/10' }
    };
    return config[priority];
}

/**
 * Filter tasks based on search, priority, and status
 * @returns {Array} Filtered tasks array
 */
function getFilteredTasks() {
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    const priorityFilter = document.getElementById('filter-priority').value;
    const statusFilter = document.getElementById('filter-status').value;

    return tasks.filter(task => {
        const matchesSearch = task.text.toLowerCase().includes(searchQuery);
        const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
        const matchesStatus = statusFilter === 'all' ? true : statusFilter === 'completed' ? task.completed : !task.completed;
        return matchesSearch && matchesPriority && matchesStatus;
    });
}

/**
 * Create task DOM element
 * @param {Object} task - Task object
 * @returns {HTMLElement} Task item element
 */
function createTaskElement(task) {
    const div = document.createElement('div');
    const config = getPriorityConfig(task.priority);
    div.className = `task-item flex justify-between items-center p-4 rounded-2xl border border-slate-100 dark:border-slate-800 border-l-4 transition-all ${config.border} ${task.completed ? 'opacity-40 grayscale' : ''}`;
    
    div.innerHTML = `
        <div class="flex items-center gap-4">
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})" 
                class="w-5 h-5 cursor-pointer accent-indigo-600 rounded-lg">
            <div class="flex items-center gap-3">
                <div class="w-3 h-3 rounded-full ${config.dot} shadow-sm"></div>
                <div>
                    <p class="font-bold text-sm ${task.completed ? 'line-through text-slate-400' : ''}">${task.text}</p>
                    <span class="text-[9px] font-black uppercase tracking-widest opacity-40">${task.priority}</span>
                </div>
            </div>
        </div>
        <div class="flex gap-1">
            <button onclick="editTask(${task.id})" aria-label="Editar" class="text-slate-300 hover:text-indigo-500 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            </button>
            <button onclick="deleteTask(${task.id})" aria-label="Eliminar" class="text-slate-300 hover:text-red-500 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
    `;
    return div;
}

/**
 * Render all filtered tasks to the DOM
 */
function renderTasks() {
    taskListElement.innerHTML = '';
    const filteredTasks = getFilteredTasks();
    filteredTasks.forEach(task => taskListElement.appendChild(createTaskElement(task)));
    updateStats();
}

/**
 * Update progress bar and statistics
 */
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

/**
 * Save tasks to localStorage and re-render
 */
function save() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

/**
 * Add new task
 * @param {string} text - Task description
 * @param {string} priority - Task priority level
 */
function addTask(text, priority) {
    if (text.trim() === "") return;
    tasks.push({ id: Date.now(), text, priority, completed: false });
    save();
}

/**
 * Edit task text
 * @param {number} id - Task ID
 */
window.editTask = (id) => {
    const task = tasks.find(t => t.id === id);
    const newText = prompt("Edita el nombre de la tarea:", task.text);
    if (newText && newText.trim() !== "") {
        task.text = newText.trim();
        save();
    }
};

/**
 * Toggle task completion status
 * @param {number} id - Task ID
 */
window.toggleTask = (id) => {
    tasks = tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t);
    save();
};

/**
 * Delete task by ID
 * @param {number} id - Task ID
 */
window.deleteTask = (id) => {
    tasks = tasks.filter(t => t.id !== id);
    save();
};

/**
 * Close modal dialog
 */
function closeModal() {
    document.getElementById('modal-add').classList.add('hidden');
}

// Event listeners
document.getElementById('task-form').onsubmit = (e) => {
    e.preventDefault();
    const taskText = document.getElementById('task-input').value.trim();
    if (taskText === "") {
        alert("Por favor, ingresa una descripción para la tarea.");
        return;
    }
    addTask(taskText, document.getElementById('task-priority').value);
    e.target.reset();
};

document.getElementById('modal-form').onsubmit = (e) => {
    e.preventDefault();
    const modalText = document.getElementById('modal-input').value.trim();
    if (modalText === "") {
        alert("Por favor, ingresa una descripción para la tarea.");
        return;
    }
    addTask(modalText, document.getElementById('modal-priority').value);
    closeModal();
    e.target.reset();
};

document.getElementById('open-add-modal').onclick = () => document.getElementById('modal-add').classList.remove('hidden');
document.getElementById('close-modal').onclick = closeModal;
document.getElementById('search-input').oninput = renderTasks;
document.getElementById('filter-priority').onchange = renderTasks;
document.getElementById('filter-status').onchange = renderTasks;
document.getElementById('reset-btn').onclick = () => { if(confirm("¿Borrar todo?")) { localStorage.clear(); location.reload(); }};

// Initialize
applyTheme();
renderTasks();