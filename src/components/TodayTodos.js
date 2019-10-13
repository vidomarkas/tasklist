import React from "react";
import TodoItem from "./TodoItem";

export default function TodayTodos({
  todos,
  currentTimeMiliseconds,
  markComplete,
  deleteTodo
}) {
  return todos.map(todo => {
    const date = new Date(todo.unformattedDeadline);
    const deadlineMiliseconds = date.getTime() / 1000;

    if (
      (deadlineMiliseconds - currentTimeMiliseconds) / 86400 > 0 &&
      (deadlineMiliseconds - currentTimeMiliseconds) / 86400 <= 1
    ) {
      return (
        <>
          <TodoItem
            todo={todo}
            key={todo.id}
            markComplete={markComplete}
            deleteTodo={deleteTodo}
          />
        </>
      );
    } else {
      return null;
    }
  });
}
