  const todosContainer = document.getElementById('todos-container');
  const todoInput = document.getElementById('todo-input');
  const todoButton = document.getElementById('add-todo-button');
  

//what do I need? 
//I need to keep track of 
//1) Order of todos 
//2) State of todo 
//3) If todo is deleted 
//4) All in localStorage, which does not keep order.

//I could 
//1) make it an array of todos 
//2) when a todo is deleted, I iterate through all the current 
//todos and change their name property to be the order that they currently are in. 

//todos [{todo: 'eat', done: false}, {todo: 'sleep', done: true}]


let makeTodoState = () => { 
  localStorage.setItem('todos', JSON.stringify([]));
  return JSON.parse(localStorage.getItem('todos')); 
}


let hasTodos = () => { 
  return localStorage.getItem('todos')
}


let getTodosFromLocalStorage = () => { 

    if (hasTodos()) { 
      JSON.parse(localStorage.getItem('todos')).forEach((todo, idx) => { 
        //this needs to be createTodo
        let todoHTMLElement = document.createElement("li");
        todoHTMLElement.setAttribute('name', `${idx}`) 
        todoHTMLElement.appendChild(todoContent(todo['content'], todo['completed']))
         // todoHTMLElement.appendChild(todoDeleteButton()); 
        todosContainer.appendChild(todoHTMLElement)
      })

    } else { 
      makeTodoState();
    } 

  console.log('local storage state on page reload:', localStorage);
}

getTodosFromLocalStorage()



let todoContent = (text, completed) => { 
  let todoText = document.createElement("p");
  todoText.textContent = text; 
  todoText.addEventListener('click', () => { 
    console.log('completed', completed);
  })

  return todoText; 
}







//2. adding a todo 
const createTodo = () => { 
  let todo = document.createElement("li"); 
  todo.appendChild(todoContent(todoInput.value));
  todo.appendChild(todoDeleteButton());
  let idx = todosContainer.children.length
  todo.setAttribute('name', `${idx}`);

 
  setLocalStorage()
  return todo;
}





//2. changing a todos state 
//3. deleting a todo 
//4. getting a todo from the backend














  let setLocalStorage = () => { 
    let length = todosContainer.children.length

    console.log('inside setLocalStorage todosContainer length:', length);
  }



let todoDeleteButton = () => { 
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "delete"; 

  deleteButton.addEventListener('click', () => { 
    let todo = deleteButton.parentElement; 
    console.log('todo deleted id:', todo.getAttribute('name'));
    localStorage.removeItem(todo.getAttribute('name')); 

    deleteButton.parentElement.remove();

    console.log('local storage state when todo is deleted:', localStorage);
    setLocalStorage()
  })

  return deleteButton;
}


  

todoInput.addEventListener('input', event => { 
  todoInput.value = event.target.value; 
})
  
todoButton.addEventListener('click', () => {
  todosContainer.appendChild(createTodo());
  todoInput.value = '';
})
  
  

  
  
 








