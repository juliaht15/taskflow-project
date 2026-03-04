// 1. Selección de elementos del DOM
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('search-input');
const taskCount = document.getElementById('task-count'); // NUEVO: Para el contador

// Array principal de tareas
let tasks = [];

// 2. Cargar tareas de LocalStorage al iniciar
document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
        tasks = savedTasks;
        renderTasks();
    }
});

// 3. Escuchar el envío del formulario
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newTask = {
        id: Date.now(),
        text: taskInput.value,
        category: 'General',
        completed: false // NUEVO: Estado inicial para poder tachar la tarea
    };

    tasks.push(newTask);
    saveAndRender();
    taskInput.value = ''; // Limpiar el campo
});

// 4. Función para guardar en LocalStorage y redibujar
function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// 5. Función para pintar las tareas en el HTML
function renderTasks() {
    taskList.innerHTML = ''; // Limpiar lista actual

    tasks.forEach(task => {
        const article = document.createElement('article');
        // NOTA: Si la tarea está completada, añadimos la clase 'completed' para el CSS
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

    updateCounter(); // Actualizar el contador cada vez que renderizamos
}

// 6. NUEVO: Función para marcar/desmarcar tarea (Interactividad Pro)
window.toggleTask = function(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    saveAndRender();
};

// 7. Función para borrar tarea
window.deleteTask = function(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveAndRender();
};

// 8. NUEVO: Actualizar el contador de tareas pendientes
function updateCounter() {
    const pending = tasks.filter(t => !t.completed).length;
    taskCount.textContent = `${pending} tareas pendientes`;
}

// 9. BONUS: Filtro de búsqueda
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.task-card');

    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        // Usamos display flex o none para ocultar/mostrar según la búsqueda
        card.style.display = title.includes(term) ? 'flex' : 'none';
    });
});