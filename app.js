const taskList = document.getElementById('task-list');
const themeToggle = document.getElementById('theme-toggle');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const countPending = document.getElementById('count-pending');
const countDone = document.getElementById('count-done');

// 1. Tareas de Ejemplo Profesional
const demoTasks = [
    { id: 1, text: "Configurar estructura semántica", priority: "Alta", completed: true },
    { id: 2, text: "Añadir clases de Tailwind", priority: "Alta", completed: true },
    { id: 3, text: "Implementar filtros de búsqueda", priority: "Media", completed: false },
    { id: 4, text: "Arreglar modo oscuro persistente", priority: "Alta", completed: false },
    { id: 5, text: "Diseñar círculos de prioridad", priority: "Baja", completed: true },
    { id: 6, text: "Desplegar aplicación final", priority: "Media", completed: false }
];

let tasks = JSON.parse(localStorage.getItem('tasks')) || [...demoTasks];

// 2. Modo Oscuro Real
function applyTheme() {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
});

// 3. Renderizado con Círculos y Estética Pro
function renderTasks() {
    const search = document.getElementById('search-input').value.toLowerCase();
    const filter = document.getElementById('filter-priority').value;
    
    taskList.innerHTML = '';
    
    const filtered = tasks.filter(t => {
        const matchesSearch = t.text.toLowerCase().includes(search);
        const matchesFilter = filter === 'all' || t.priority === filter;
        return matchesSearch && matchesFilter;
    });

    filtered.forEach(task => {
        const div = document.createElement('div');
        
        // Configuración de círculos y bordes laterales
        const priorityConfig = {
            'Alta':  { dot: 'bg-red-500',    border: 'border-l-red-500 bg-red-50/20 dark:bg-red-900/10' },
            'Media': { dot: 'bg-yellow-500', bg: 'bg-yellow-500', border: 'border-l-yellow-500 bg-yellow-50/20 dark:bg-yellow-900/10' },
            'Baja':  { dot: 'bg-green-500',  border: 'border-l-green-500 bg-green-50/20 dark:bg-green-900/10' }
        };

        const config = priorityConfig[task.priority];

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
            <button onclick="deleteTask(${task.id})" class="text-slate-300 hover:text-red-500 p-2 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        `;
        taskList.appendChild(div);
    });

    updateStats();
}

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    
    progressBar.style.width = `${percent}%`;
    progressText.innerText = `${percent}% completado`;
    countPending.innerText = pending;
    countDone.innerText = completed;
}

// 4. Lógica de Tareas
window.toggleTask = (id) => {
    tasks = tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t);
    save();
};

window.deleteTask = (id) => {
    tasks = tasks.filter(t => t.id !== id);
    if (tasks.length === 0) tasks = [...demoTasks];
    save();
};

function save() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// 5. Gestión de Formularios
function addTask(text, priority) {
    if (text.trim() === "") return;
    tasks.push({ id: Date.now(), text, priority, completed: false });
    save();
}

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

// 6. Eventos y Modales
const modal = document.getElementById('modal-add');
document.getElementById('open-add-modal').onclick = () => modal.classList.remove('hidden');
document.getElementById('close-modal').onclick = closeModal;
function closeModal() { modal.classList.add('hidden'); }

document.getElementById('search-input').oninput = renderTasks;
document.getElementById('filter-priority').onchange = renderTasks;
document.getElementById('reset-btn').onclick = () => { localStorage.clear(); location.reload(); };

// Inicio
applyTheme();
renderTasks();