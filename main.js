let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
if (!Array.isArray(tasks)) tasks = [];

function storeTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function renderTasks() {
  let tasksContainer = document.getElementById("tasks");
  tasksContainer.innerHTML = ""; 

  tasks.forEach((task, index) => {
    let content = `
      <div class="task ${task.isDone ? "taskDone" : ""}">
        <div>
          <h3>${task.title}</h3>
          <span class="material-symbols-outlined">event</span>
          <span>${task.date}</span>
        </div>
        <div>
          <button onclick="deleteTask(${index})" class="circle delete">
            <span class="material-symbols-outlined">delete</span>
          </button>
          <button onclick="editTask(${index})" class="circle edit">
            <span class="material-symbols-outlined">edit</span>
          </button>
          ${
            task.isDone
              ? `<button onclick="toggleTask(${index})" class="circle close">
                   <span class="material-symbols-outlined">close</span>
                 </button>`
              : `<button onclick="toggleTask(${index})" class="circle check">
                   <span class="material-symbols-outlined">check</span>
                 </button>`
          }
        </div>
      </div>
    `;
    tasksContainer.innerHTML += content;
  });
}

document.getElementById("add").addEventListener("click", addTask);

function addTask() {
  let title = document.getElementById("inputText").value.trim();
  let date = document.getElementById("inputDate").value;

  if (!title || !date) {
    alert("Please enter a task title and date!");
    return;
  }

  let taskObj = { title, date, isDone: false };
  tasks.push(taskObj);

  storeTasks(); 
  renderTasks();

  document.getElementById("inputText").value = "";
  document.getElementById("inputDate").value = "";
}

document.getElementById("clear").addEventListener("click", clearAllTasks);
function clearAllTasks() {
  let isConfirmed = confirm("Are you sure you want to clear all tasks?");
  if (isConfirmed) {
    tasks = [];
    storeTasks();
    renderTasks();
  }
}

function deleteTask(index) {
  if (
    confirm(`Are you sure you want to delete the task: ${tasks[index].title}?`)
  ) {
    tasks.splice(index, 1);
    storeTasks();
    renderTasks();
  }
}

function editTask(index) {
  let task = tasks[index];
  let newTitle = prompt("Enter new title", task.title);
  let newDate = prompt("Enter new date", task.date);

  if (!newTitle || !newDate) {
    alert("Please enter a task title and date!");
    return;
  }

  task.title = newTitle;
  task.date = newDate;

  storeTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].isDone = !tasks[index].isDone;
  storeTasks();
  renderTasks();
}

renderTasks();