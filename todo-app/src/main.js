const todosListData = [
  { id: 1, name: "Chơi game", completed: false, date: "23/07/2025" },
  { id: 2, name: "Học javascript nâng cao", completed: true, date: "18/9/2025" },
  { id: 3, name: "Học react", completed: false, date: "19/9/2025" },
  { id: 4, name: "Học node js", completed: false, date: "19/9/2025" },
  { id: 5, name: "Học mongo db", completed: true, date: "10/9/2025" },
];

let todos = [...todosListData];
let filter = 'all'; // 'all', 'active', 'completed'
let editingId = null;

function getFilteredTodos() {
  if (filter === 'active') return todos.filter(t => !t.completed);
  if (filter === 'completed') return todos.filter(t => t.completed);
  return todos;
}

function renderTodos() {
  const todoList = document.getElementById('todoList');
  const emptyState = document.getElementById('emptyState');
  const todoCount = document.getElementById('todoCount');
  const clearCompletedBtn = document.getElementById('clearCompleted');

  const filteredTodos = getFilteredTodos();
  todoList.innerHTML = '';

  if (filteredTodos.length === 0) {
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
    filteredTodos.forEach(todo => {
      const item = document.createElement('div');
      item.className = `todo-item p-4 hover:bg-gray-50 fade-in flex items-center gap-3${todo.completed ? ' completed' : ''}`;

      // Checkbox/tick
      const checkBtn = document.createElement('button');
      checkBtn.className = `w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${todo.completed ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300'
        }`;
      checkBtn.innerHTML = todo.completed ? '✔️' : '';
      checkBtn.title = todo.completed ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu hoàn thành';
      checkBtn.onclick = () => {
        todo.completed = !todo.completed;
        renderTodos();
      };
      item.appendChild(checkBtn);

      // Nội dung hoặc input sửa
      const contentDiv = document.createElement('div');
      contentDiv.className = 'flex-1';
      if (editingId === todo.id) {
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = todo.name;
        editInput.className = 'px-2 py-1 border rounded w-full';
        editInput.onkeydown = (e) => {
          if (e.key === 'Enter') {
            saveEdit(todo.id, editInput.value);
          }
        };
        contentDiv.appendChild(editInput);

        const dateInput = document.createElement('input');
        dateInput.type = 'text';
        dateInput.value = todo.date;
        dateInput.className = 'px-2 py-1 border rounded w-full mt-1 text-xs';
        dateInput.onkeydown = (e) => {
          if (e.key === 'Enter') {
            saveEdit(todo.id, editInput.value, dateInput.value);
          }
        };
        contentDiv.appendChild(dateInput);

        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'Lưu';
        saveBtn.className = 'ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600';
        saveBtn.onclick = () => saveEdit(todo.id, editInput.value, dateInput.value);
        contentDiv.appendChild(saveBtn);

        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Hủy';
        cancelBtn.className = 'ml-2 px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400';
        cancelBtn.onclick = () => {
          editingId = null;
          renderTodos();
        };
        contentDiv.appendChild(cancelBtn);
      } else {
        const nameP = document.createElement('p');
        nameP.className = 'text-gray-800';
        nameP.textContent = todo.name;
        contentDiv.appendChild(nameP);

        const dateP = document.createElement('p');
        dateP.className = 'text-xs text-gray-500 mt-1';
        dateP.textContent = todo.date;
        contentDiv.appendChild(dateP);
      }
      item.appendChild(contentDiv);

      // Nút sửa/xóa
      const actionDiv = document.createElement('div');
      actionDiv.className = 'flex gap-2';
      if (editingId !== todo.id) {
        const editBtn = document.createElement('button');
        editBtn.className = 'p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors duration-200';
        editBtn.innerHTML = '✏️';
        editBtn.title = 'Chỉnh sửa';
        editBtn.onclick = () => {
          editingId = todo.id;
          renderTodos();
        };
        actionDiv.appendChild(editBtn);
      }
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors duration-200';
      deleteBtn.innerHTML = '🗑️';
      deleteBtn.title = 'Xóa';
      deleteBtn.onclick = () => {
        todos = todos.filter(t => t.id !== todo.id);
        renderTodos();
      };
      actionDiv.appendChild(deleteBtn);

      item.appendChild(actionDiv);

      todoList.appendChild(item);
    });
  }

  // Đếm số lượng
  todoCount.textContent = `${todos.length} công việc`;

  // Hiện nút xóa đã hoàn thành nếu có
  const hasCompleted = todos.some(t => t.completed);
  clearCompletedBtn.classList.toggle('hidden', !hasCompleted);
}

// Thêm mới
document.getElementById('todoForm').onsubmit = function (e) {
  e.preventDefault();
  const input = document.getElementById('todoInput');
  const name = input.value.trim();
  if (!name) return;
  const now = new Date();
  const date = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
  todos.push({
    id: Date.now(),
    name,
    completed: false,
    date,
  });
  input.value = '';
  renderTodos();
};

// Sửa
function saveEdit(id, newName, newDate) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.name = newName.trim() || todo.name;
    if (newDate) todo.date = newDate.trim() || todo.date;
  }
  editingId = null;
  renderTodos();
}

// Lọc
document.getElementById('filterAll').onclick = function () {
  filter = 'all';
  setActiveFilterBtn(this);
  renderTodos();
};
document.getElementById('filterActive').onclick = function () {
  filter = 'active';
  setActiveFilterBtn(this);
  renderTodos();
};
document.getElementById('filterCompleted').onclick = function () {
  filter = 'completed';
  setActiveFilterBtn(this);
  renderTodos();
};

function setActiveFilterBtn(btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active', 'bg-blue-500', 'text-white'));
  btn.classList.add('active', 'bg-blue-500', 'text-white');
}

// Xóa tất cả đã hoàn thành
document.getElementById('clearCompleted').onclick = function () {
  todos = todos.filter(t => !t.completed);
  renderTodos();
};

// Khởi tạo
renderTodos();