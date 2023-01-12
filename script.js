const todoForm = document.querySelector('#todo-form');
const todoList = document.querySelector('#todo-list');
const edit = document.getElementById("edit")
const save = document.getElementById("save")
const editinput = document.getElementById("edit-input")
console.log(editinput);


todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const todoTitle = todoForm.querySelector('#todo-title').value;
  const todoSubTasks = todoForm.querySelector('#todo-sub-tasks').value;
  const todo = {
    title: todoTitle,
    subTasks: todoSubTasks.split(',')
  };
  saveTodo(todo);
  todoForm.reset();
});

function saveTodo(todo) {
  let todos = getTodos();
  todos.push(todo);
  localStorage.setItem('taskManager', JSON.stringify(todos));
  renderTodos();
}


function getTodos() {
  let todos = localStorage.getItem('taskManager');
  if (todos === null) {
    return [];
  }
  return JSON.parse(todos);
}

function renderTodos() {
  const todos = getTodos();
  todoList.innerHTML = '';
  todos.forEach((todo, todoIndex) => {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo'); 
    const todoHeadDiv = document.createElement('div');
    const todoTitle = document.createElement('h2');
    todoTitle.textContent = todo.title[0].toUpperCase() + todo.title.slice(1);
    todoHeadDiv.appendChild(todoTitle); 
    const deleteButton = document.createElement('i');
    deleteButton.classList.add("fa-solid", "fa-trash");
    deleteButton.addEventListener('click', () => {
      deleteTodo(todoIndex);
    });
    
    todoHeadDiv.appendChild(deleteButton);
    todoDiv.appendChild(todoHeadDiv);
    const todoSubTasks = document.createElement('ul');
    todo.subTasks.forEach((subTask, subTaskIndex) => {
      const li = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      const label = document.createElement('label');
      label.textContent = subTask;
      checkbox.addEventListener('change', (event) => {
        if (event.target.checked) {
          label.style.textDecoration = 'line-through';
        } else {
          label.style.textDecoration = 'none';
        }
      });
      li.appendChild(checkbox);
      li.appendChild(label);
      const deleteSubTaskButton = document.createElement('i');
      deleteSubTaskButton.classList.add("fa-solid" , "fa-trash");   
      const editSubTaskButton = document.createElement('i');
    
      editSubTaskButton.classList.add("fa-regular" , "fa-pen-to-square"); 
      deleteSubTaskButton.addEventListener('click', () => {
        deleteSubTask(todoIndex, subTaskIndex);
      });
      editSubTaskButton.addEventListener('click', () => {
           edit.classList.toggle("is-active");
           
           save.onclick= function(){
            editTask(todoIndex, subTaskIndex , editinput , label)
           }
      });
      li.appendChild(deleteSubTaskButton);
      li.appendChild(editSubTaskButton)

      todoSubTasks.appendChild(li);
    });
    todoDiv.appendChild(todoSubTasks);
    todoList.appendChild(todoDiv);
  });
}


function deleteTodo(index) { 
  console.log("object");
  let todos = getTodos();
  todos.splice(index, 1);
  localStorage.setItem('taskManager', JSON.stringify(todos));
  renderTodos();
}


function deleteSubTask(todoIndex, subTaskIndex) {
  let todos = getTodos();
  todos[todoIndex].subTasks.splice(subTaskIndex, 1);
  localStorage.setItem('taskManager', JSON.stringify(todos));
  renderTodos();
}
function editTask(todoIndex, subTaskIndex , editinput , label){
  let todos= getTodos();
   todos[todoIndex].subTasks[subTaskIndex]=editinput.value
   localStorage.setItem('taskManager', JSON.stringify(todos));
    edit.classList.toggle("is-active")
    renderTodos();
   
}

renderTodos();

  

  
