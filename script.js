let input = document.getElementById('todoinput');
let btn = document.getElementById('addbtn');
let taskList = document.getElementById('task-list');
let tasks = [];

btn.addEventListener('click', addTask);

function addTask() {
  let val = input.value.trim();
  if (val === "") {
    alert("Please enter a task.");
    return;
  }
  tasks.push({ id: Date.now(), text: val });
  input.value = "";
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach(task => {
    let el = document.createElement('div');
    el.classList.add('todo');
    el.innerHTML = `
      <span class="task">${task.text}</span>
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>
    `;

    el.querySelector('.delete').onclick = function() {
      tasks = tasks.filter(t => t.id !== task.id);
      renderTasks();
    };

    el.querySelector('.edit').onclick = function() {
      let taskSpan = el.querySelector('.task');
      if (this.innerText === "Edit") {
        taskSpan.setAttribute("contenteditable", "true");
        taskSpan.focus();
        this.innerText = "Save";
      } else {
        taskSpan.setAttribute("contenteditable", "false");
        task.text = taskSpan.innerText.trim();
        this.innerText = "Edit";
      }
    };

    taskList.appendChild(el);
  });
}
