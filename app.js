import { taskAPI } from './api.js';

const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

async function loadTasks() {
    try {
        const response = await taskAPI.getAll();
        if (response.success) renderTasks(response.data);
    } catch (err) {
        console.error("Error:", err);
    }
}

function renderTasks(tasks) {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <span>${task.title} [${task.priority}]</span>
            <button onclick="handleDelete(${task.id})">🗑️</button>
            <button onclick="handleToggle(${task.id}, ${task.completed})">✔️</button>
        `;
        taskList.appendChild(li);
    });
    document.getElementById('pendingCount').innerText = tasks.length;
}

taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = taskInput.value;
    const priority = document.getElementById('taskPriority').value;
    await taskAPI.create(title, priority);
    taskInput.value = '';
    loadTasks();
});

// Funciones globales para los botones
window.handleDelete = async (id) => {
    await taskAPI.delete(id);
    loadTasks();
};

window.handleToggle = async (id, currentStatus) => {
    await taskAPI.update(id, { completed: !currentStatus });
    loadTasks();
};

loadTasks();