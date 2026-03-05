// 1. Selección de elementos del DOM
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('search-input');
const taskCount = document.getElementById('task-count');
const themeToggle = document.getElementById('theme-toggle'); // Nuevo: Botón modo oscuro

const btnAll = document.getElementById('filter-all');
const btnUrgent = document.getElementById('filter-urgent');
const btnCompleted = document.getElementById('filter-completed');

let tasks = [];

// --- LÓGICA DE MODO OSCURO (Punto 4) ---
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
});

// 2. Cargar tareas al iniciar
document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks && savedTasks.length > 0) {
        tasks = savedTasks;
    } else {
        tasks = [
            { id: 1, text: "🚀 Configurar el entorno de desarrollo", category: "General", completed: true },
            { id: 2, text: "🔥 Implementar filtros dinámicos", category: "Urgente", completed: false }
        ];
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    renderTasks();
});

// 3. Envío del formulario
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTask = {
        id: Date.now(),
        text: taskInput.value,
        category: 'General',
        completed: false
    };
    tasks.push(newTask);
    saveAndRender();
    taskInput.value = ''; 
});

function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// 5. Función principal de renderizado (Corregida con Tailwind y Dark Mode)
function renderTasks(tasksToRender = tasks) {
    taskList.innerHTML = ''; 

    tasksToRender.forEach(task => {
        const article = document.createElement('article');
        
        // Clases de Tailwind: modo oscuro, bordes, sombras y hover (Puntos 2, 3 y Bonus)
        article.className = `
            flex justify-between items-center p-4 rounded-xl border transition-all duration-300
            ${task.completed 
                ? 'bg-gray-50 dark:bg-slate-900 border-transparent opacity-60' 
                : 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:translate-x-2'
            }
        `;
        
        article.innerHTML = `
            <div class="flex items-center gap-4">
                <input type="checkbox" class="w-5 h-5 accent-indigo-500 cursor-pointer" 
                    ${task.completed ? 'checked' : ''} 
                    onclick="toggleTask(${task.id})">
                <div>
                    <h3 class="font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-800 dark:text-gray-200'}">${task.text}</h3>
                    <span class="text-xs font-bold text-indigo-500 uppercase tracking-wider">${task.category}</span>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <span class="hidden sm:inline-block px-2 py-1 text-[10px] font-bold rounded-md ${task.completed ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}">
                    ${task.completed ? 'Hecho' : 'Pendiente'}
                </span>
                <button class="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-200" 
                    onclick="deleteTask(${task.id})">
                    Eliminar
                </button>
            </div>
        `;
        taskList.appendChild(article);
    });
    updateCounter();
}

// 6. Lógica de los filtros (Actualizada para clases de Tailwind)
function setActiveFilter(element) {
    [btnAll, btnUrgent, btnCompleted].forEach(btn => {
        btn.className = "p-3 rounded-lg cursor-pointer text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-indigo-500 transition-all text-sm";
    });
    element.className = "p-3 rounded-lg cursor-pointer bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-200 dark:shadow-none transition-all text-sm";
}

btnAll.addEventListener('click', () => { setActiveFilter(btnAll); renderTasks(tasks); });
btnUrgent.addEventListener('click', () => { setActiveFilter(btnUrgent); renderTasks(tasks.filter(t => !t.completed)); });
btnCompleted.addEventListener('click', () => { setActiveFilter(btnCompleted); renderTasks(tasks.filter(t => t.completed)); });

// 7. Interactividad
window.toggleTask = function(id) {
    tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    saveAndRender();
};

window.deleteTask = function(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveAndRender();
};

function updateCounter() {
    const pending = tasks.filter(t => !t.completed).length;
    taskCount.textContent = `${pending} tareas pendientes`;
}

// 8. Buscador
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = tasks.filter(task => task.text.toLowerCase().includes(term));
    renderTasks(filtered);
});