import React, { Component } from "react";

import PropTypes from "prop-types";

export class TodoItem extends Component {
  getStyle = () => {
    return {
      
      
      textDecoration: this.props.todo.completed ? "line-through" : "none"
    };
  };

  render() {
    const { id, title } = this.props.todo;
    return (
      <div className="todo__item" style={this.getStyle()}>
        <label className="todo__item-title">
          {title}
          <input className="todo__item__checkbox"
            type="checkbox"
            onChange={this.props.markComplete.bind(this, id)}
          />

          <button
            className="btn btn-delete"
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
