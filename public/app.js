const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

// Fetch all tasks and render them
const fetchTasks = async () => {
    const response = await fetch('/api/tasks');
    const tasks = await response.json();

    taskList.innerHTML = ''; // Clear current task list
    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <div>
                <strong>${task.title}</strong><br>
                <span>${task.description}</span>
            </div>
            <button onclick="deleteTask('${task._id}')">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
};

// Delete a task by ID
const deleteTask = async (id) => {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    fetchTasks(); // Re-fetch and update the task list
};

// Event listener for adding a task
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    const newTask = { title, description };

    await fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
    });

    fetchTasks(); // Refresh the task list
    taskForm.reset(); // Clear the form
});
