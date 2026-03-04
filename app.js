// 1. Selección de elementos del DOM
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('search-input');
const taskCount = document.getElementById('task-count');

// Elementos de los filtros laterales (Sidebar)
const btnAll = document.getElementById('filter-all');
const btnUrgent = document.getElementById('filter-urgent');
const btnCompleted = document.getElementById('filter-completed');

// Array principal de tareas
let tasks = [];

// 2. Cargar tareas de LocalStorage al iniciar
document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
        tasks = savedTasks;
        renderTasks(); // Por defecto muestra todas
    }
});

// 3. Escuchar el envío del formulario
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

// 4. Función para guardar y redibujar
function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// 5. Función principal para pintar tareas (acepta una lista filtrada como opción)
function renderTasks(tasksToRender = tasks) {
    taskList.innerHTML = ''; 

    tasksToRender.forEach(task => {
        const article = document.createElement('article');
        article.className = `task-card ${task.completed ? 'completed' : ''}`;
        
        article.innerHTML = `
            <div class="task-info">
                <input type="checkbox" class="task-check" 
                    ${task.completed ? 'checked' : ''} 
                    onclick="toggleTask(${task.id})">
                <div>
                    <h3>${task.text}</h3>
                    <span class="category">${task.category}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center;">
                <span class="badge ${task.completed ? 'priority-low' : 'priority-medium'}">
                    ${task.completed ? 'Hecho' : 'Pendiente'}
                </span>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Eliminar</button>
            </div>
        `;
        taskList.appendChild(article);
    });

    updateCounter();
}

// 6. Lógica de los filtros del Sidebar
function setActiveFilter(element) {
    [btnAll, btnUrgent, btnCompleted].forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
}

btnAll.addEventListener('click', () => {
    setActiveFilter(btnAll);
    renderTasks(tasks); // Muestra todas
});

btnUrgent.addEventListener('click', () => {
    setActiveFilter(btnUrgent);
    // Filtramos las que NO están completadas
    const urgentTasks = tasks.filter(t => !t.completed);
    renderTasks(urgentTasks);
});

btnCompleted.addEventListener('click', () => {
    setActiveFilter(btnCompleted);
    // Filtramos las que SÍ están completadas
    const completedTasks = tasks.filter(t => t.completed);
    renderTasks(completedTasks);
});

// 7. Funciones de interactividad (Marcar y Borrar)
window.toggleTask = function(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
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

// 8. Bonus: Buscador
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = tasks.filter(task => task.text.toLowerCase().includes(term));
    renderTasks(filtered);
});