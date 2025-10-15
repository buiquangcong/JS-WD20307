const todosListData = [
    { id: 1, name: "Chơi game", completed: false, date: "23/07/2025" },
    { id: 2, name: "Học javascript nâng cao", completed: true, date: "18/9/2025" },
    { id: 3, name: "Học react", completed: false, date: "19/9/2025" },
    { id: 4, name: "Học node js", completed: false, date: "19/9/2025" },
    { id: 5, name: "Học mongo db", completed: true, date: "10/9/2025" },
];

let todos = [...todosListData];
let filter = 'all';
let editingId = null;

// Lấy danh sách todo theo bộ lọc
function getFilteredTodos() {
    switch (filter) {
        case 'active':
            return todos.filter(t => !t.completed);
        case 'completed':
            return todos.filter(t => t.completed);
        default:
            return todos;
    }
}

// Hiển thị danh sách todo
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
            todoList.appendChild(createTodoItem(todo));
        });
    }
    todoCount.textContent = `${todos.length} công việc`;
    clearCompletedBtn.classList.toggle('hidden', !todos.some(t => t.completed));
}

// Tạo một item todo
function createTodoItem(todo) {
    const item = document.createElement('div');
    item.className = `todo-item p-4 hover:bg-gray-50 fade-in flex items-center gap-3${todo.completed ? ' completed' : ''}`;

    // Nút tích hoàn thành
    item.appendChild(createCheckButton(todo));

    // Nội dung hoặc input sửa
    item.appendChild(createContentDiv(todo));

    // Nút sửa/xóa
    item.appendChild(createActionDiv(todo));

    return item;
}

// Tạo nút tích hoàn thành
function createCheckButton(todo) {
    const checkBtn = document.createElement('button');
    checkBtn.className = `w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${todo.completed ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300'}`;
    checkBtn.innerHTML = todo.completed ? '✔️' : '';
    checkBtn.title = todo.completed ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu hoàn thành';
    checkBtn.onclick = () => toggleCompleted(todo.id);
    return checkBtn;
}

// Tạo phần nội dung hoặc input sửa
function createContentDiv(todo) {
    const contentDiv = document.createElement('div');
    contentDiv.className = 'flex-1';
    if (editingId === todo.id) {
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = todo.name;
        editInput.className = 'px-2 py-1 border rounded w-full';
        editInput.onkeydown = (e) => {
            if (e.key === 'Enter') saveEdit(todo.id, editInput.value, dateInput.value);
        };
        contentDiv.appendChild(editInput);

        const dateInput = document.createElement('input');
        dateInput.type = 'text';
        dateInput.value = todo.date;
        dateInput.className = 'px-2 py-1 border rounded w-full mt-1 text-xs';
        dateInput.onkeydown = (e) => {
            if (e.key === 'Enter') saveEdit(todo.id, editInput.value, dateInput.value);
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
        cancelBtn.onclick = () => cancelEdit();
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
    return contentDiv;
}

// Tạo phần nút sửa/xóa
function createActionDiv(todo) {
    const actionDiv = document.createElement('div');
    actionDiv.className = 'flex gap-2';
    if (editingId !== todo.id) {
        const editBtn = document.createElement('button');
        editBtn.className = 'p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors duration-200';
        editBtn.innerHTML = '✏️';
        editBtn.title = 'Chỉnh sửa';
        editBtn.onclick = () => startEdit(todo.id);
        actionDiv.appendChild(editBtn);
    }
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors duration-200';
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.title = 'Xóa';
    deleteBtn.onclick = () => deleteTodo(todo.id);
    actionDiv.appendChild(deleteBtn);
    return actionDiv;
}

// Xử lý tích hoàn thành
function toggleCompleted(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) todo.completed = !todo.completed;
    renderTodos();
}

// Bắt đầu sửa
function startEdit(id) {
    editingId = id;
    renderTodos();
}

// Hủy sửa
function cancelEdit() {
    editingId = null;
    renderTodos();
}

// Lưu sửa
function saveEdit(id, newName, newDate) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.name = newName.trim() || todo.name;
        if (newDate) todo.date = newDate.trim() || todo.date;
    }
    editingId = null;
    renderTodos();
}

// Xóa todo
function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    renderTodos();
}

// Thêm mới
function addTodo(name) {
    if (!name.trim()) return;
    const now = new Date();
    const date = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
    todos.push({
        id: Date.now(),
        name: name.trim(),
        completed: false,
        date,
    });
    renderTodos();
}

// Xóa tất cả đã hoàn thành
function clearCompletedTodos() {
    todos = todos.filter(t => !t.completed);
    renderTodos();
}

// Đổi bộ lọc
function setFilter(newFilter, btn) {
    filter = newFilter;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active', 'bg-blue-500', 'text-white'));
    btn.classList.add('active', 'bg-blue-500', 'text-white');
    renderTodos();
}

// Gán sự kiện cho các nút và form
function setupEventListeners() {
    document.getElementById('todoForm').onsubmit = function (e) {
        e.preventDefault();
        const input = document.getElementById('todoInput');
        addTodo(input.value);
        input.value = '';
    };
    document.getElementById('filterAll').onclick = function () {
        setFilter('all', this);
    };
    document.getElementById('filterActive').onclick = function () {
        setFilter('active', this);
    };
    document.getElementById('filterCompleted').onclick = function () {
        setFilter('completed', this);
    };
    document.getElementById('clearCompleted').onclick = function () {
        clearCompletedTodos();
    };
}

// Khởi tạo
setupEventListeners();
renderTodos();