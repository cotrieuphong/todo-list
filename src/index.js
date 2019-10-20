import "./styles.css";

var todoList = {
  todos: [111, 123],
  displayTodo: function() {
    document.querySelector(".todos").innerHTML = "";
    for (var i = 0; i < this.todos.length; i++) {
      var todo = document.createElement("p");
      todo.innerHTML = this.todos[i];
      document.querySelector(".todos").appendChild(todo);
    }
  },
  addTodo: function() {
    var todo = document.querySelector("input").value;
    this.todos.push(todo);
    this.displayTodo();
    document.querySelector("input").value = "";
  }
};

document.querySelector(".add").addEventListener("click", function() {
  todoList.addTodo();
});

document.querySelector(".input").addEventListener("keyup", function(event) {
  if (event.which === 13) {
    todoList.addTodo();
  }
});

todoList.displayTodo();
