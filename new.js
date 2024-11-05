document.addEventListener('DOMContentLoaded', loadTasks);
const addButton=document.getElementById('add-button');
addButton.addEventListener('click', function() {
    const taskText = document.getElementById('todo-input').value;  // Get the text from the input field

    if (taskText == '') return;  // If the input is empty, do nothing

    addTask(taskText); 
    saveTaskToLocalStorage(taskText);
    document.getElementById('todo-input').value = '';  // input field clear panrathukku
});

// Function to add the task to the list
function addTask(taskText) {
    const li = document.createElement('li'); 
    

    // Create a checkbox for checking
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox'; 

    // Create a span element for the task text
    const task = document.createElement('span');
    task.innerText = taskText;  // Set the text of the span to the taskText

    // Create the delete button, and first its  disabled
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';  
    deleteButton.classList.add('delete-button');
    deleteButton.disabled = true;  // Disable the delete button first

    // When the checkbox is clicked, line-through the text if checked and enable delete button
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            task.style.textDecoration = 'line-through';  // Add line-through if checked
            deleteButton.disabled = false;  // Enable the delete button
        } else {
            task.style.textDecoration = 'none';  // Remove line-through if unchecked
            deleteButton.disabled = true;  // Disable the delete button again
        }
    });

    // When the delete button is clicked, remove the task
    deleteButton.addEventListener('click', function() {
        const todoList=document.getElementById('todo-list');
        todoList.removeChild(li); 
        removeTaskFromLocalStorage(taskText); 
    });

    // Add the checkbox, task text, and delete button to the list item (li)
    li.appendChild(checkbox);
    li.appendChild(task);
    li.appendChild(deleteButton);
    document.getElementById('todo-list').appendChild(li);
}


function saveTaskToLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();  //  current tasks 
    tasks.push(taskText);  // Add the new task to the tasks array using push
    localStorage.setItem('tasks', JSON.stringify(tasks));  // ippo update panra task localstorage la save panrathukku
}

// Load tasks from localStorage and display them
function loadTasks() {
    let tasks = getTasksFromLocalStorage();  // Get tasks from localStorage
    tasks.forEach(function(task) {
        addTask(task);  // Add each task to the list
    });
}

// Get tasks 
function getTasksFromLocalStorage() {
    let tasks1 = localStorage.getItem('tasks');  
    // return tasks ? JSON.parse(tasks) : [];  // If there are tasks, parse them, otherwise return an empty array
if(tasks1){
    return JSON.parse(tasks1);
}else{
    return [];
}

}

// Remove task
function removeTaskFromLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();  //current task
    tasks2 = tasks.filter(function(task) {
        return task !== taskText;  // Return only tasks that are not the one we want to remove
    });
    localStorage.setItem('tasks', JSON.stringify(tasks2));  // Save the updated tasks array to localStorage
}