import React, { Component } from "./node_modules/react";

import PropTypes from "./node_modules/prop-types";

export class TodoItem extends Component {
  getStyle = () => {
    return {
      backgroundColor: this.props.todo.completed ? "#2ECC71" : "#37324d"
      //backgroundColor: this.props.todo.expired ? "#f0134d" : "#37324d"
    };
  };
  convertDateFromISO = deadline => {
    const selectedDate = new Date(deadline);
    const date =
      selectedDate.getFullYear() +
      "-" +
      (selectedDate.getMonth() + 1) +
      "-" +
      selectedDate.getDate();

    const time = selectedDate.getHours() + ":" + selectedDate.getMinutes();

    return date + " " + time;
  };
  timeLeft = deadline => {
    // Current date in miliseconds
    const now = Date.now();
    // COnvert deadline to miliseconds
    const date = new Date(deadline);
    const deadlineMiliseconds = date.getTime();
    // Find difference

    let differenceMsec = deadlineMiliseconds - now;
    if (differenceMsec < 0) {
      this.props.handleExpiredTodo.bind(this);
      return "Expired";
    } else {
      // Calculate how much time is left
      const days = Math.floor(differenceMsec / 1000 / 60 / 60 / 24);
      differenceMsec -= days * 1000 * 60 * 60 * 24;
      const hh = Math.floor(differenceMsec / 1000 / 60 / 60);
      differenceMsec -= hh * 1000 * 60 * 60;
      const mm = Math.floor(differenceMsec / 1000 / 60);
      differenceMsec -= mm * 1000 * 60;

      if (days < 1) {
        return "Time left: " + hh + ":" + mm;
      }
      return "Time left: " + days + "days " + hh + ":" + mm;
    }
  };

  render() {
    const { id, title, body, timeCreated, deadline, expired } = this.props.todo;

    return (
      <div className="todo__item" style={this.getStyle()}>
        <p>{timeCreated}</p>
        <label className="todo__item-title">
          {title}
          <input className="todo__item__checkbox" type="checkbox" />

          <button
            className="btn btn-delete"
            onClick={this.props.deleteTodo.bind(this, id)}
          >
            &times;
          </button>
          <button
            className="btn btn-complete"
            onClick={this.props.markComplete.bind(this, id)}
          >
            &#10004;
          </button>
        </label>
        <p>{body}</p>
        <p>Deadline:{this.convertDateFromISO(deadline)}</p>
        <p>{this.timeLeft(this.convertDateFromISO(deadline))}</p>
      </div>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired
};

export default TodoItem;
