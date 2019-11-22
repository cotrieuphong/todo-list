import "./styles.css";

// Declare new todo object
var todoList = {
  // todos array
  todos: [],
  displayTodo: function() {
    // Check if local storage have value
    if (localStorage.getItem("todos") === null) {
      // If not push dummy data to local storage
      this.pushDummyData();
    }
    var todos = this.getLocalStorage();
    this.todos = todos;
    // Clear all todos
    document.querySelector(".todo__list").innerHTML = "";
    // Re-render all todos
    for (var i = 0; i < this.todos.length; i++) {
      // Create li element
      var todo = document.createElement("li");
      // Add class to todo item
      todo.classList.add("todo__item");
      // Add unique id to todo item
      todo.id = i;
      // Check if completed or not
      if (this.todos[i].completed === true) {
        todo.innerHTML = this.todos[i].text;
        todo.classList.add("completed");
      } else {
        todo.innerHTML = this.todos[i].text;
      }
      // Create delete todo button
      todo.appendChild(this.createDeleteButton());
      // Create toggle todo button
      todo.appendChild(this.createToggleButton());
      // Add todo to top of todos list
      var list = document.querySelector(".todo__list");
      list.insertBefore(todo, list.firstChild);
    }
  },
  addTodo: function(text) {
    var todo = {
      text: text,
      completed: false
    };
    // Check if input have any value
    if (text) {
      // Push todo to array
      this.todos.push(todo);
      // Update local storage
      this.setLocalStorage(this.todos);
      // Display new todos
      this.displayTodo();
      // Clear input
      document.querySelector(".todo__input").value = "";
    }
  },
  deleteTodo: function(position) {
    // delete todo based on position in arrays
    this.todos.splice(position, 1);
    // Update local storage
    this.setLocalStorage(this.todos);
    // Re-render
    this.displayTodo();
  },
  editTodo: function(position, text) {
    // Edit todo
    this.todos[position].text = text;
    // Update local storage
    this.setLocalStorage(this.todos);
    // Re-render
    this.displayTodo();
  },
  toggleTodo: function(position) {
    // Toggle completed
    this.todos[position].completed = !this.todos[position].completed;
    // Update local storage
    this.setLocalStorage(this.todos);
    // Re-render
    this.displayTodo();
  },
  toggleAllTodo: function(event) {
    var toggleClass = event.target.classList;
    if (toggleClass.contains("todo__toggle-on")) {
      event.target.innerText = "Check All";
      toggleClass.remove("todo__toggle-on");
      toggleClass.add("todo__toggle-off");
      for (var i = 0; i < this.todos.length; i++) {
        this.todos[i].completed = false;
      }
    } else {
      event.target.innerText = "Un-check All";
      toggleClass.remove("todo__toggle-off");
      toggleClass.add("todo__toggle-on");
      for (var j = 0; j < this.todos.length; j++) {
        this.todos[j].completed = true;
      }
    }
    // Update local storage
    this.setLocalStorage(this.todos);
    // Re-render
    this.displayTodo();
  },
  showEditTodoInput: function(position) {
    // Target item
    var target = document.getElementById(position);
    // Clear todo item
    target.innerHTML = "";
    // Show change input
    target.appendChild(this.createChangeInput());
    target.appendChild(this.createSaveButton());
    // Input
    var input = target.children[0];
    var button = target.children[1];
    input.focus();
    input.value = this.todos[position].text;

    button.addEventListener("click", function() {
      todoList.editTodo(position, input.value);
    });

    input.addEventListener("keyup", function(event) {
      if (event.which === 13) {
        todoList.editTodo(position, input.value);
      }
    });

    input.addEventListener("focusout", function() {
      todoList.editTodo(position, input.value);
    });

    document
      .querySelector(".todo__change")
      .addEventListener("keyup", function(event) {
        if (event.which === 13) {
          todoList.editTodo(
            position,
            document.querySelector(".todo__change").value
          );
        }
      });
  },
  createChangeInput: function() {
    var changeInput = document.createElement("input");
    changeInput.className = "todo__change";
    return changeInput;
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement("button");
    deleteButton.className = "todo__delete";
    deleteButton.textContent = "Delete";
    return deleteButton;
  },
  createSaveButton: function() {
    var saveButton = document.createElement("button");
    saveButton.className = "todo__save";
    saveButton.textContent = "Save";
    return saveButton;
  },
  createToggleButton: function() {
    var toggleButton = document.createElement("button");
    toggleButton.className = "todo__item-toggle";
    toggleButton.textContent = "Toggle";
    return toggleButton;
  },
  enterPressed: function(input) {
    // Press enter key to add todo
    input.addEventListener("keyup", function(event) {
      if (event.which === 13) {
        todoList.addTodo(input.value);
      }
    });
  },
  pushDummyData: function() {
    // Dummy data
    var dummyData = [
      {
        text: "Try add some todos :)",
        completed: false
      },
      {
        text: "Click me to edit",
        completed: true
      }
    ];

    this.setLocalStorage(dummyData);
  },
  setLocalStorage: function(todos = this.todos) {
    var data = JSON.stringify(todos);
    localStorage.setItem("todos", data);
  },
  getLocalStorage: function() {
    var todos = JSON.parse(localStorage.getItem("todos"));
    return todos;
  },
  init: function() {
    this.displayTodo();
    this.enterPressed(document.querySelector(".todo__input"));
  }
};

// Click to add todo
document.querySelector(".todo__add").addEventListener("click", function() {
  todoList.addTodo(document.querySelector(".todo__input").value);
});

// Click event on todo list
document
  .querySelector(".todo__list")
  .addEventListener("click", function(event) {
    var target = event.target;
    // Delete item by id
    if (target.className === "todo__delete") {
      todoList.deleteTodo(target.parentNode.id);
    }
    // Show edit input
    else if (target.classList[0] === "todo__item") {
      todoList.showEditTodoInput(target.id);
    }
    // Toggle todo by id
    else if (target.className === "todo__item-toggle") {
      todoList.toggleTodo(target.parentNode.id);
    }
  });

document
  .querySelector(".todo__toggle")
  .addEventListener("click", function(event) {
    todoList.toggleAllTodo(event);
  });

// Display todo list
todoList.init();
