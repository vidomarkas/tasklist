import React, { Component } from "react";
import TodoItem from "./TodoItem";

class ExpiredTodos extends Component {
  render() {
    const {
      todos,
      currentTimeMiliseconds,
      markComplete,
      deleteTodo,
      previousExpanded
    } = this.props;

    if (previousExpanded) {
      return todos.map(todo => {
        const date = new Date(todo.unformattedDeadline);
        const deadlineMiliseconds = date.getTime() / 1000;
        if ((deadlineMiliseconds - currentTimeMiliseconds) / 86400 < -1) {
          return (
            <TodoItem
              todo={todo}
              key={todo.id}
              markComplete={markComplete}
              deleteTodo={deleteTodo}
              // getDeadlinesMiliseconds={getDeadlinesMiliseconds}
            />
          );
        } else {
          return null;
        }
      });
    } else {
      return null;
    }
  }
}

export default ExpiredTodos;
