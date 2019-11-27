import React, { Component } from "react";
import TodoItem from "./TodoItem";

class UpcomingTodos extends Component {
  render() {
    const {
      todos,
      currentTimeMiliseconds,
      markComplete,
      deleteTodo,
      upcomingExpanded
    } = this.props;

    if (upcomingExpanded) {
      return todos.map((todo, index) => {
        const date = new Date(todo.unformattedDeadline);
        const deadlineMiliseconds = date.getTime() / 1000;
        if ((deadlineMiliseconds - currentTimeMiliseconds) / 86400 > 1) {
          return (
            <>
              <TodoItem
                todo={todo}
                key={index}
                markComplete={markComplete}
                deleteTodo={deleteTodo}
              />
            </>
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

export default UpcomingTodos;
