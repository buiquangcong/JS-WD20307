// const todoListData = [
//     "Chơi game",
//     "Học Javascript",
//     "Học React",
//     "Học NodeJS",
//     "Học MongoDB",
//     "Học MySQL",
//     "Học PostgreSQL",
//     "Học Redis",
// ];
// Array

const todosListData = [
    {
        id: 1,
        name: "Chơi game",
        completed: false,
        date: "23/07/2025",
    },
    {
        id: 2,
        name: "Học javascript nâng cao",
        completed: true,
        date: "18/9/2025",
    },
    {
        id: 3,
        name: "Học react",
        completed: false,
        date: "19/9/2025",
    },
    {
        id: 4,
        name: "Học node js",
        completed: false,
        date: "19/9/2025",
    },
    {
        id: 5,
        name: "Học mongo db",
        completed: true,
        date: "10/9/2025",
    },
];
const listElement = document.getElementById('todoList');
// let content = "";
// todosListData.forEach(function (todo) {
//     content += `<li>${todo}</li>`;
// });
// listElement.innerHTML = content;

// map() -> tạo mảng mới từ mảng cũ và biến đổi theo yêu cầu
// const newTodoListData = todoListData.map(function (todo) {
//     return `<li> ${todo} </li>`;
// }).join("")
// console.log(`mảng cũ`, todoListData)
// console.log(` mảng mới `, newTodoListData)

// listElement.innerHTML = newTodoListData

const newTodoListData = todosListData.map(function (todo) {
    return `<div class="todo-item p-4 hover:bg-gray-50 fade-in ${todo.completed ? "completed" : ""
        }">
        <div class="flex items-center gap-3">
                            <button
                                class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 bg-green-500 border-green-500 text-white"
                                aria-label="Đánh dấu chưa hoàn thành"
                            >
                                ✓
                            </button>
                            <div class="flex-1">
                                <p class="text-gray-800">${todo.id}</p>
                                <p class="text-gray-800">${todo.name}</p>
                                <p class="text-xs text-gray-500 mt-1">${todo.date}</p>
                            </div>

                            <div class="flex gap-2">
                                <button
                                    class="p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                                    aria-label="Chỉnh sửa"
                                >
                                    ✏️
                                </button>
                                <button
                                    class="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors duration-200"
                                    aria-label="Xóa"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    </div>`;
}).join("")
// hiển thị
listElement.innerHTML = newTodoListData;