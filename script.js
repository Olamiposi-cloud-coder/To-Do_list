const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <input type="checkbox">
            <span>${taskText}</span>
            <button class="deleteBtn">Delete</button>
        `;
        taskList.appendChild(taskItem);
        taskInput.value = "";

        const deleteBtn = taskItem.querySelector(".deleteBtn");
        deleteBtn.addEventListener("click", () => {
            taskItem.remove();
            updateLocalStorage();
        });

        const checkbox = taskItem.querySelector("input");
        checkbox.addEventListener("change", () => {
            updateLocalStorage();
        });

        const taskTextSpan = taskItem.querySelector("span");
        taskTextSpan.addEventListener("dblclick", () => {
            const newText = prompt("Edit task:", taskTextSpan.textContent);
            if (newText !== null && newText.trim() !== "") {
                taskTextSpan.textContent = newText;
                updateLocalStorage();
            }
        });
    }
}

// Add event listener for the Enter key
taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

// Function to update tasks in local storage
function updateLocalStorage() {
    const tasks = [];
    const taskItems = document.querySelectorAll("li");
    taskItems.forEach((taskItem) => {
        const taskText = taskItem.querySelector("span").textContent;
        const isCompleted = taskItem.querySelector("input").checked;
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage on page load
document.addEventListener("DOMContentLoaded", () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""}>
            <span>${task.text}</span>
            <button class="deleteBtn">Delete</button>
        `;
        taskList.appendChild(taskItem);

        const deleteBtn = taskItem.querySelector(".deleteBtn");
        deleteBtn.addEventListener("click", () => {
            taskItem.remove();
            updateLocalStorage();
        });

        const checkbox = taskItem.querySelector("input");
        checkbox.addEventListener("change", () => {
            updateLocalStorage();
        });

        const taskTextSpan = taskItem.querySelector("span");
        taskTextSpan.addEventListener("dblclick", () => {
            const newText = prompt("Edit task:", taskTextSpan.textContent);
            if (newText !== null && newText.trim() !== "") {
                taskTextSpan.textContent = newText;
                updateLocalStorage();
            }
        });
    });
});
