const taskList = document.getElementById('task-list');
const themeToggle = document.getElementById('theme-toggle');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const countPending = document.getElementById('count-pending');
const countDone = document.getElementById('count-done');

// Tareas de Ejemplo (Solo se cargan la primera vez)
const demoTasks = [
    { id: 1, text: "Configurar estructura semántica", priority: "Alta", completed: true },
    { id: 2, text: "Implementar filtros de estado", priority: "Alta", completed: false }
];

let tasks = JSON.parse(localStorage.getItem('tasks')) || [...demoTasks];

// 1. Gestión del Modo Oscuro
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

// 2. Renderizado con Filtros (Paso 8)
function renderTasks() {
    const search = document.getElementById('search-input').value.toLowerCase();
    const priorityFilter = document.getElementById('filter-priority').value;
    const statusFilter = document.getElementById('filter-status').value;
    
    taskList.innerHTML = '';
    
    const filtered = tasks.filter(t => {
        const matchesSearch = t.text.toLowerCase().includes(search);
        const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter;
        const matchesStatus = statusFilter === 'all' 
            ? true 
            : statusFilter === 'completed' ? t.completed : !t.completed;

        return matchesSearch && matchesPriority && matchesStatus;
    });

    filtered.forEach(task => {
        const div = document.createElement('div');
        const priorityConfig = {
            'Alta':  { dot: 'bg-red-500',    border: 'border-l-red-500 bg-red-50/20 dark:bg-red-900/10' },
            'Media': { dot: 'bg-yellow-500', border: 'border-l-yellow-500 bg-yellow-50/20 dark:bg-yellow-900/10' },
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
        taskList.appendChild(div);
    });
    updateStats();
}

// 3. Lógica de Tareas (Edición y Borrado real)
window.editTask = (id) => {
    const task = tasks.find(t => t.id === id);
    const newText = prompt("Edita el nombre de la tarea:", task.text);
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
    tasks = tasks.filter(t => t.id !== id);
    save();
};

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

function save() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function addTask(text, priority) {
    if (text.trim() === "") return;
    tasks.push({ id: Date.now(), text, priority, completed: false });
    save();
}

// 4. Eventos
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

const modal = document.getElementById('modal-add');
document.getElementById('open-add-modal').onclick = () => modal.classList.remove('hidden');
document.getElementById('close-modal').onclick = closeModal;
function closeModal() { modal.classList.add('hidden'); }

document.getElementById('search-input').oninput = renderTasks;
document.getElementById('filter-priority').onchange = renderTasks;
document.getElementById('filter-status').onchange = renderTasks;
document.getElementById('reset-btn').onclick = () => { if(confirm("¿Borrar todo?")) { localStorage.clear(); location.reload(); }};

// Inicio
applyTheme();
renderTasks();