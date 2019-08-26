import React, { Component } from "react";

import PropTypes from "prop-types";

export class TodoItem extends Component {
  getStyle = () => {
    return {
      background: "#f4f4f4",
      padding: "10px",
      borderBottom: "1px solid #ccc",
      textDecoration: this.props.todo.completed ? "line-through" : "none"
    };
  };

  render() {
    const { id, title } = this.props.todo;
    return (
      <div className="todoItem" style={this.getStyle()}>
        <label className="todo">
          {title}
          <input
            type="checkbox"
            onChange={this.props.markComplete.bind(this, id)}
          />

          <button
            className="btn-delete"
            onClick={this.props.deleteTodo.bind(this, id)}
          >
            &times;
          </button>
        </label>
      </div>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired
};

export default TodoItem;
