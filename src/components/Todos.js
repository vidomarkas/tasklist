import React, { Component } from "react";
import TodoItem from "./TodoItem";

import PropTypes from "prop-types";

export class Todos extends Component {
  render() {
    const d = new Date();
    const currentTimeMiliseconds = d.getTime() / 1000;
    return this.props.todos.map(todo => {
      const date = new Date(todo.unformattedDeadline);
      const deadlineMiliseconds = date.getTime() / 1000;

      console.log((deadlineMiliseconds - currentTimeMiliseconds) / 86400);
      if ((deadlineMiliseconds - currentTimeMiliseconds) / 86400 > 0) {
        return (
          <div>
            <h2>Active todos</h2>
            <TodoItem
              todo={todo}
              key={todo.id}
              markComplete={this.props.markComplete}
              deleteTodo={this.props.deleteTodo}
            />
          </div>
        );
      } else {
        return (
          <div>
            <h2>Expired todos</h2>
            <TodoItem
              todo={todo}
              key={todo.id}
              markComplete={this.props.markComplete}
              deleteTodo={this.props.deleteTodo}
            />
          </div>
        );
      }
    });
  }
}

Todos.propTypes = {
  todos: PropTypes.array.isRequired
};

export default Todos;
