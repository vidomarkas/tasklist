import React, { Component } from "./node_modules/react";
import TodoItem from "./TodoItem";
import PropTypes from "./node_modules/prop-types";

export class Todos extends Component {
  render() {
    return this.props.todos.map(todo => (
      <TodoItem
        todo={todo}
        key={todo.id}
        markComplete={this.props.markComplete}
        deleteTodo={this.props.deleteTodo}
        handleExpiredTodo={this.props.handleExpiredTodo}
      />
    ));
  }
}

Todos.propTypes = {
  todos: PropTypes.array.isRequired
};

export default Todos;
