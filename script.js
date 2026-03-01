const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const clearDoneBtn = document.getElementById('clearDoneBtn');
const taskList = document.getElementById('taskList');
const totalCount = document.getElementById('totalCount');
const doneCount = document.getElementById('doneCount');
const progress = document.getElementById('progress');

let tasks = [];

function updateStats() {
  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const rate = total === 0 ? 0 : Math.round((done / total) * 100);

  totalCount.textContent = String(total);
  doneCount.textContent = String(done);
  progress.textContent = `${rate}%`;
}

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'task-item';

    const main = document.createElement('label');
    main.className = `task-main ${task.done ? 'done' : ''}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.addEventListener('change', () => {
      task.done = checkbox.checked;
      renderTasks();
    });

    const text = document.createElement('span');
    text.textContent = task.text;

    main.append(checkbox, text);

    const delBtn = document.createElement('button');
    delBtn.className = 'del-btn';
    delBtn.textContent = '删除';
    delBtn.addEventListener('click', () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      renderTasks();
    });

    li.append(main, delBtn);
    taskList.append(li);
  });

  updateStats();
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({
    id: crypto.randomUUID(),
    text,
    done: false,
  });

  taskInput.value = '';
  taskInput.focus();
  renderTasks();
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

clearDoneBtn.addEventListener('click', () => {
  tasks = tasks.filter((t) => !t.done);
  renderTasks();
});

renderTasks();
