const todosContainer = document.getElementById('todos-container');
const todoInput = document.getElementById('todo-input');
const todoButton = document.getElementById('add-todo-button');
  


let addToggleTodoHandler = (todoBody) => { 
  todoBody.addEventListener('click', () => { 
    toggleTodoUIStyle(toggleTodoState(todoBody));
  })
}


let toggleTodoState = (todoBody) => { 
  let id = todoBody.parentElement.getAttribute('name')
  let todos = JSON.parse(localStorage.getItem('todos'));
  let todo = todos[id]; 
  todo.done = !todo.done; 
  todos[id] = todo;
  localStorage.setItem('todos', JSON.stringify(todos));
  console.log('todo state changed in local storage:', todo); 

  return {todoBody, todo}; 
}

let toggleTodoUIStyle = ({todoBody, todo}) => { 
  console.log('this is the todo that was clicked: ', todo);
  console.log('this is the todo body: ', todoBody)
  if (todo.done) { 
    todoBody.style.textDecoration = 'line-through';
  } else { 
    todoBody.style.textDecoration = 'none';
  }
}



let deleteFromLocalStorage = (todoIdx) => { 
  console.log('todo to be deleted at index:', todoIdx);
  let todos = JSON.parse(localStorage.getItem('todos')); 
  todos.splice(todoIdx, 1); 
  console.log('new todos after todo was deleted:', todos)
  updateDOMElements(todos)
  localStorage.setItem('todos', JSON.stringify(todos));
}


let updateDOMElements = (todos) => { 
  for (i = 0; i < todos.length; i++) { 
    todosContainer.children[i].setAttribute('name', i);
  }
}


let todoDeleteButton = () => { 
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "delete"; 

  deleteButton.addEventListener('click', () => { 
    let todoIdx = deleteButton.parentElement.getAttribute('name')
    console.log('todo index to be deleted:', todoIdx); 
    deleteButton.parentElement.remove();
    deleteFromLocalStorage(todoIdx)
    
  })

  return deleteButton;
}



let makeTodoState = () => { 
  localStorage.setItem('todos', JSON.stringify([]));
  return JSON.parse(localStorage.getItem('todos')); 
}


let hasTodos = () => { 
  return localStorage.getItem('todos')
}


let getTodosFromLocalStorage = () => { 
  hasTodos() ? JSON.parse(localStorage.getItem('todos')).forEach((todo) => { 
        todosContainer.appendChild(createTodo(todo)) })
     : makeTodoState();
}



let createTodo = (todo) => { 
  let todoContainer = document.createElement("li"); 
  let todoBody = document.createElement('p');
  let id = todosContainer.children.length;

  if (todo) { 
    todoBody.textContent = todo.todo;
    if (todo.done) { 
      todoBody.style.textDecoration = 'line-through';
    } else { 
      todoBody.style.textDecoration = 'none';
    }
    console.log('todo created from local storage: ', todo);

  } else { 
    todoBody.textContent = todoInput.value;
    addTodoToLocalStorage({todo: todoInput.value, done: false })
  }
  
  todoContainer.setAttribute('name', `${id}`);
  todoContainer.appendChild(todoBody);
  todoContainer.appendChild(todoDeleteButton());
  addToggleTodoHandler(todoBody);

  return todoContainer;
}

getTodosFromLocalStorage()

todoInput.addEventListener('input', event => { 
  todoInput.value = event.target.value; 
})
  

todoButton.addEventListener('click', () => {
  todosContainer.appendChild(createTodo());
  todoInput.value = '';
})
  
let addTodoToLocalStorage = (todo) => { 
  let todos = JSON.parse(localStorage.getItem('todos'));
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

  
  









