import React, { Component } from "react";
import TodoItem from "./TodoItem";

class TodayTodos extends Component {
  render() {
    const {
      todos,
      currentTimeMiliseconds,
      markComplete,
      deleteTodo,
      todayExpanded
    } = this.props;
    if (todayExpanded) {
      return todos.map((todo, index) => {
        const date = new Date(todo.unformattedDeadline);
        const deadlineMiliseconds = date.getTime() / 1000;
        if (
          (deadlineMiliseconds - currentTimeMiliseconds) / 86400 > -1 &&
          (deadlineMiliseconds - currentTimeMiliseconds) / 86400 <= 1
        ) {
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

export default TodayTodos;
