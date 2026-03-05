const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const themeToggle = document.getElementById('theme-toggle');

// Persistencia (Punto 5)
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Punto 4: Lógica de Modo Oscuro persistente
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

// Gestión de Tareas
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = { id: Date.now(), text: taskInput.value, completed: false };
    tasks.push(task);
    saveAndRender();
    taskInput.value = '';
});

function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const div = document.createElement('div');
        // Puntos 2 y 3: Diseño dinámico con utilidades de Tailwind
        div.className = `flex justify-between items-center p-4 rounded-xl border transition-all ${
            task.completed 
            ? 'task-completed bg-slate-100 dark:bg-slate-800 border-transparent' 
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md'
        }`;
        
        div.innerHTML = `
            <div class="flex items-center gap-3">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})" 
                    class="w-5 h-5 accent-indigo-600 cursor-pointer">
                <span class="font-medium text-slate-700 dark:text-slate-200">${task.text}</span>
            </div>
            <button onclick="deleteTask(${task.id})" class="text-red-500 hover:text-red-700 font-bold transition-colors">
                Eliminar
            </button>
        `;
        taskList.appendChild(div);
    });
}

// Funciones globales corregidas (Punto 2)
window.toggleTask = (id) => {
    tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    saveAndRender();
};

window.deleteTask = (id) => {
    tasks = tasks.filter(t => t.id !== id);
    saveAndRender();
};

// Inicio de la app
applyTheme();
renderTasks();