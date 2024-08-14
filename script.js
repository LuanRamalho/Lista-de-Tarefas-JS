let tasks = [];
let currentEditIndex = null;

function addTask() {
    const taskInput = document.getElementById('newTask');
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, note: '' });
        taskInput.value = '';
        renderTasks();
    }
}

function removeTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function editTask(index) {
    currentEditIndex = index;
    const task = tasks[index];
    document.getElementById('editTaskText').value = task.text;
    document.getElementById('editTaskNote').value = task.note;
    document.getElementById('editContainer').style.display = 'block';
}

function saveTask() {
    const taskText = document.getElementById('editTaskText').value.trim();
    const taskNote = document.getElementById('editTaskNote').value.trim();
    if (taskText) {
        tasks[currentEditIndex] = { text: taskText, note: taskNote };
        currentEditIndex = null;
        document.getElementById('editContainer').style.display = 'none';
        renderTasks();
    }
}

function cancelEdit() {
    currentEditIndex = null;
    document.getElementById('editContainer').style.display = 'none';
}

function sortTasks() {
    
tasks.sort((a, b) => a.text.localeCompare(b.text));
    
renderTasks();

}

function moveTask(index, direction) {
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < tasks.length) {
        [tasks[index], tasks[newIndex]] = [tasks[newIndex], tasks[index]];
        renderTasks();
    }
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.text}</span>
            <div class="actions">
                <button onclick="editTask(${index})">Editar</button>
                <button onclick="removeTask(${index})">Remover</button>
                <button onclick="moveTask(${index}, -1)">UP</button>
                <button onclick="moveTask(${index}, 1)">DOWN</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}
