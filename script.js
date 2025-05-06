const data = JSON.parse(localStorage.getItem("tasks")) || [];

// Handle add tasks with enter button
document.getElementById("taskInput").addEventListener("keypress", (event) => {
  event.key === "Enter" && addTask();
});

const addTask = () => {
  const a = document.getElementById("taskInput");
  const task = a.value.trim(); // Remove leading and trailing spaces

  if (task) {
    const current = data.length;

    data[current] = {
      id: current,
      name: task,
      done: false,
    };

    a.value = ""; // Clear input

    renderTasks();
  }
};

const renderTasks = () => {
  const container = document.getElementById("taskList");
  container.innerHTML = "";
  
  // Store the tasks in local storage
  localStorage.setItem("tasks", JSON.stringify(data));

  if (!data.length) {
    // Display a message if no tasks are available
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "emptyMessage";
    emptyMessage.textContent = "No tasks available.";
    container.appendChild(emptyMessage);
    return;
  }

  data.forEach((task, index) => {
    const div = document.createElement("div");
    div.className = "task";
    div.innerHTML = `<h2 class="taskName">${task.name}</h2>
         <div class="taskButtons">
           <button onclick="toggle(${index})">Toggle</button>
           <button onclick="deleteTask(${index})">Delete</button>
         </div>`;

    if (task.done) {
      const taskName = div.querySelector(".taskName");
      taskName.classList.add("taskDone");
    }

    container.appendChild(div);
  });
};

renderTasks(); // Render tasks initially

function toggle(index) {
  data[index].done = !data[index].done;

  renderTasks();
}

function deleteTask(index) {
  data.splice(index, 1); // Remove element at this index

  renderTasks();
}

// Remove all the tasks after 10 seconds
setInterval(() => {
  let allDone = true; // Initially all the tasks are done

  data.forEach((task) => {
    if (!task.done) {
      allDone = false;
    }
  });

  if (allDone && data.length > 0) {
    // If all tasks are done and data exists
    console.log("All tasks done!");
  }
}, 10000);
