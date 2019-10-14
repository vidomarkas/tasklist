import React from "react";
import TodoItem from "./TodoItem";

export default function ExpiredTodos({
  todos,
  currentTimeMiliseconds,
  markComplete,
  deleteTodo,
  getDeadlinesMiliseconds
}) {
  return todos.map(todo => {
    const date = new Date(todo.unformattedDeadline);
    const deadlineMiliseconds = date.getTime() / 1000;
    if ((deadlineMiliseconds - currentTimeMiliseconds) / 86400 < -1) {
      return (
        <>
          <TodoItem
            todo={todo}
            key={todo.id}
            markComplete={markComplete}
            deleteTodo={deleteTodo}
            // getDeadlinesMiliseconds={getDeadlinesMiliseconds}
          />
        </>
      );
    } else {
      return null;
    }
  });
}
