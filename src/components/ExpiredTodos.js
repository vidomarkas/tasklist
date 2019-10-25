import React, { Component } from "react";
import TodoItem from "./TodoItem";

class ExpiredTodos extends Component {
  state = { counter: 0 };

  render() {
    const {
      todos,
      currentTimeMiliseconds,
      markComplete,
      deleteTodo,
      previousExpanded
    } = this.props;

    if (previousExpanded) {
      const prevTodos = [];
      return todos.map(todo => {
        const date = new Date(todo.unformattedDeadline);
        const deadlineMiliseconds = date.getTime() / 1000;
        if ((deadlineMiliseconds - currentTimeMiliseconds) / 86400 < -1) {
          prevTodos.push(todo);
          console.log(prevTodos);
          return (
            <TodoItem
              todo={todo}
              key={todo.id}
              markComplete={markComplete}
              deleteTodo={deleteTodo}
              // getDeadlinesMiliseconds={getDeadlinesMiliseconds}
            />
          );
        } else if (prevTodos.length === 0) {
          prevTodos.push(todo);
          console.log("nothing to show");
          return <h4>Nothing to show</h4>;
        }
      });
    } else {
      return null;
    }
  }
}

export default ExpiredTodos;
