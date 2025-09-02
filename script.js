let input = document.getElementById('todoinput');
let btn = document.getElementById('addbtn');
let taskList = document.getElementById('task-list');

// Load tasks from localStorage or start with empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

btn.addEventListener('click', addTask);

function addTask() {
  let val = input.value.trim();
  if (val === "") {
    alert("Please enter a task.");
    return;
  }
  tasks.push({ id: Date.now(), text: val, completed: false });
  input.value = "";
  saveTasks();
  renderTasks();
}

// Save tasks array to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach(task => {
    let el = document.createElement('div');
    el.classList.add('todo');
    el.innerHTML = `
      <span class="task ${task.completed ? 'completed' : ''}">${task.text}</span>
      <button class="complete">${task.completed ? 'Undo' : 'Complete'}</button>
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>
    `;

    // Delete task
    el.querySelector('.delete').onclick = function() {
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks();
      renderTasks();
    };

    // Edit task
    el.querySelector('.edit').onclick = function() {
      let taskSpan = el.querySelector('.task');
      if (this.innerText === "Edit") {
        taskSpan.setAttribute("contenteditable", "true");
        taskSpan.focus();
        this.innerText = "Save";
      } else {
        taskSpan.setAttribute("contenteditable", "false");
        task.text = taskSpan.innerText.trim();
        saveTasks();
        this.innerText = "Edit";
      }
    };

    // Mark as complete/undo
    el.querySelector('.complete').onclick = function() {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    };

    taskList.appendChild(el);
  });
}

// Render tasks on initial load
renderTasks();


