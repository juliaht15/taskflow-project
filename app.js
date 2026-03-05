const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const themeToggle = document.getElementById('theme-toggle');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

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
        div.className = `flex justify-between items-center p-4 rounded-xl border transition-all duration-300 ${
            task.completed 
            ? 'task-completed bg-slate-100 dark:bg-slate-800 border-transparent opacity-60' 
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md'
        }`;
        
        div.innerHTML = `
            <div class="flex items-center gap-3">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})" 
                    class="w-5 h-5 accent-indigo-600 cursor-pointer focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900">
                <span class="font-medium text-slate-700 dark:text-slate-200">${task.text}</span>
            </div>
            <button onclick="deleteTask(${task.id})" class="text-red-500 hover:text-red-700 font-bold transition-colors focus:ring-2 focus:ring-red-500 focus:outline-none rounded p-1">
                Eliminar
            </button>
        `;
        taskList.appendChild(div);
    });
}

window.toggleTask = function(id) {
    tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    saveAndRender();
};

window.deleteTask = function(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveAndRender();
};

applyTheme();
renderTasks();