import { taskAPI } from './api.js';

let tasks = [];
const el = id => document.getElementById(id);

async function loadTasks() {
    try {
        tasks = await taskAPI.getAll();
        render();
    } catch { el('taskList').innerHTML = "Error de conexión"; }
}

function render() {
    const query = el('searchInput').value.toLowerCase();
    const filter = el('priorityFilter').value;
    
    el('taskList').innerHTML = tasks
        .filter(t => t.title.toLowerCase().includes(query) && (filter === 'all' || t.priority === filter))
        .map(t => `
            <div class="task-item ${t.completed ? 'completed' : ''}">
                <input type="checkbox" ${t.completed ? 'checked' : ''} onchange="toggle('${t.id}', ${t.completed})">
                <span>${t.title}</span>
                <span class="badge priority-${t.priority.toLowerCase()}">${t.priority}</span>
                <button onclick="del('${t.id}')">🗑️</button>
            </div>`).join('');
    
    updateStats();
}

window.toggle = async (id, status) => { await taskAPI.update(id, { completed: !status }); loadTasks(); };
window.del = async (id) => { if(confirm('¿Borrar?')) { await taskAPI.delete(id); loadTasks(); } };

el('taskForm').onsubmit = async (e) => {
    e.preventDefault();
    await taskAPI.create(el('taskInput').value, el('taskPriority').value);
    el('taskInput').value = '';
    loadTasks();
};

el('searchInput').oninput = render;
el('priorityFilter').onchange = render;
el('themeToggle').onclick = () => {
    const t = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', t);
};

const updateStats = () => {
    const done = tasks.filter(t => t.completed).length;
    el('progressBar').value = tasks.length ? (done / tasks.length) * 100 : 0;
    el('pendingCount').innerText = tasks.length - done;
    el('completedCount').innerText = done;
};

loadTasks();