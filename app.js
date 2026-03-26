import { taskAPI } from './api.js';

// --- LÓGICA DE MODO OSCURO ---
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Cargar preferencia guardada
if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
});

// --- LÓGICA DE TAREAS ---
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

async function loadTasks() {
    try {
        const response = await taskAPI.getAll();
        if (response.success) renderTasks(response.data);
    } catch (err) { console.error("Error:", err); }
}

function renderTasks(tasks) {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        // Clases de Tailwind para los items
        li.className = `flex justify-between items-center py-4 ${task.completed ? 'opacity-50 line-through' : ''}`;
        li.innerHTML = `
            <span class="font-medium">${task.title} <span class="text-xs text-slate-400 ml-2">${task.priority}</span></span>
            <div class="flex gap-2">
                <button onclick="handleToggle(${task.id}, ${task.completed})" class="text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 p-2 rounded-lg">✔️</button>
                <button onclick="handleDelete(${task.id})" class="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg">🗑️</button>
            </div>
        `;
        taskList.appendChild(li);
    });
    document.getElementById('pendingCount').innerText = tasks.length;
}

// Eventos globales (se mantienen igual)
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await taskAPI.create(taskInput.value, document.getElementById('taskPriority').value);
    taskInput.value = '';
    loadTasks();
});

window.handleDelete = async (id) => { await taskAPI.delete(id); loadTasks(); };
window.handleToggle = async (id, status) => { await taskAPI.update(id, { completed: !status }); loadTasks(); };

loadTasks();