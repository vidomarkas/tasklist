import React from "react";
import TodoItem from "./TodoItem";

const CompletedTodos = props => {
  console.log("working???", props);
  return props.todos.map(todo => {
    if (todo.completed === true) {
      console.log(todo);
      return (
        <TodoItem
          todo={todo}
          key={todo.id}
          markComplete={props.markComplete}
          deleteTodo={props.deleteTodo}
        />
      );
    } else {
      console.log("not completed");
      return null;
    }
  });
};

export default CompletedTodos;
