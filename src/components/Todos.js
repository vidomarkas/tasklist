import React, { Component } from "react";
import TodoItem from "./TodoItem";

import PropTypes from "prop-types";

export class Todos extends Component {
  getTimeLeft = (id, timeLeft) => {
    console.log(id, timeLeft);
  };
  render() {
    return this.props.todos.map(todo => {
      console.log(todo.timeLeft);
      return (
        <TodoItem
          todo={todo}
          key={todo.id}
          markComplete={this.props.markComplete}
          deleteTodo={this.props.deleteTodo}
          getTimeLeft={this.getTimeLeft}
        />
      );
    });
  }
}

Todos.propTypes = {
  todos: PropTypes.array.isRequired
};

export default Todos;
