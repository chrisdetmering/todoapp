  const todosContainer = document.getElementById('todos-container');
  const todoInput = document.getElementById('todo-input');
  const todoButton = document.getElementById('add-todo-button');
  

//
  const todoDeleteButton = () => { 
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "delete"; 
  
    deleteButton.addEventListener('click', () => { 
      let todo = deleteButton.parentElement; 
      console.log('todo name', todo.getAttribute('name'));
      localStorage.removeItem(todo.getAttribute('name')); 

      deleteButton.parentElement.remove();
    })
  
    return deleteButton;
  }


  const todoContent = (text, completed) => { 
    let todoText = document.createElement("p");
    todoText.textContent = text; 
    todoText.addEventListener('click', () => { 
      console.log('completed', completed);
    })

    return todoText; 
  }





  //TODO: I need to refactor this code
  let getTodosFromLocalStorage = () => { 
    for (let i = 0; i < localStorage.length; i++) {
      let todo = JSON.parse(localStorage.getItem(i));
    
      let todoHTMLElement = document.createElement("li"); 
      todoHTMLElement.setAttribute('name', `${i}`) 

      todoHTMLElement.appendChild(todoContent(todo['content'], todo['completed']));
      todoHTMLElement.appendChild(todoDeleteButton()); 
  
      todosContainer.appendChild(todoHTMLElement);
    } 
  }

  getTodosFromLocalStorage()


  
  todoInput.addEventListener('input', event => { 
    todoInput.value = event.target.value; 
  })
  

  todoButton.addEventListener('click', () => {
    todosContainer.appendChild(createTodo());
    todoInput.value = '';
  })
  
  const createTodo = () => { 
    let todo = document.createElement("li"); 
    todo.appendChild(todoContent(todoInput.value));
    todo.appendChild(todoDeleteButton());
    let idx = todosContainer.children.length

    localStorage.setItem(idx, JSON.stringify({content: todoInput.value, completed: false}))
    todo.setAttribute('name', `${idx}`);
    return todo;
  }

  
  
 








