import React, { Component } from "react";

import PropTypes from "prop-types";
import TimeLeft from "./TimeLeft";
import Status from "./Status";
import IconCheck from "./IconCheck";
import IconEmpty from "./IconEmpty";
import IconManSearching from "./IconManSearching";

export class TodoItem extends Component {
  state = { timeLeft: null, expired: false, expanded: false };

  // getStyle = () => {
  //   if (this.state.expired && !this.props.todo.completed) {
  //     return { backgroundColor: "#f0134d" };
  //   } else if (this.props.todo.completed) {
  //     return { backgroundColor: "#2ECC71" };
  //   } else {
  //     return { backgroundColor: "#37324d" };
  //   }
  // };

  // Calculate how much time left until the deadline
  calcTimeLeft = deadline => {
    const formatDateFromISO = deadline => {
      const selectedDate = new Date(deadline);
      const date =
        selectedDate.getFullYear() +
        "/" +
        (selectedDate.getMonth() + 1) +
        "/" +
        selectedDate.getDate();

      const time =
        selectedDate.getHours() +
        ":" +
        selectedDate.getMinutes() +
        ":" +
        selectedDate.getSeconds();

      return date + " " + time;
    };

    // Current date in miliseconds
    const now = Date.now();
    // COnvert deadline to miliseconds
    const date = new Date(formatDateFromISO(deadline));
    const deadlineMiliseconds = date.getTime();

    // this.props.getDeadlinesMiliseconds.bind(
    //   this,
    //   this.props.todo.id,
    //   deadlineMiliseconds
    // );
    // Find difference

    let differenceMsec = deadlineMiliseconds - now;
    if (differenceMsec < 0) {
      this.setState({ expired: true, timeLeft: -1 });
      return "Expired";
    } else {
      // Calculate how much time is left
      const days = Math.floor(differenceMsec / 1000 / 60 / 60 / 24);
      differenceMsec -= days * 1000 * 60 * 60 * 24;
      const hh = Math.floor(differenceMsec / 1000 / 60 / 60);
      differenceMsec -= hh * 1000 * 60 * 60;
      const mm = Math.floor(differenceMsec / 1000 / 60);
      differenceMsec -= mm * 1000 * 60;
      const ss = Math.floor(differenceMsec / 1000);
      differenceMsec -= mm * 1000;

      if (days < 1) {
        this.setState({
          timeLeft:
            hh.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false
            }) +
            ":" +
            mm.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false
            }) +
            ":" +
            ss.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false
            })
        });
      } else {
        this.setState({
          timeLeft:
            days +
            " days " +
            hh.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false
            }) +
            ":" +
            mm.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false
            }) +
            ":" +
            ss.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false
            })
        });
      }
    }
  };
  // Check if todo is expired and stop calculating time
  checkIfExpired = () => {
    if (this.state.timeLeft < 0) {
      this.setState({ expired: true }, () => {
        // this.getStyle();
        clearInterval(this.myInterval);
      });
    }
  };

  componentDidMount() {
    this.myInterval = setInterval(() => {
      this.calcTimeLeft(this.props.todo.deadline);
      this.checkIfExpired();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    const {
      id,
      title,
      body,
      timeCreated,
      deadline,
      completed
    } = this.props.todo;

    return (
      <div
        className={
          this.state.expanded ? "todoItem todoItem__expanded" : "todoItem"
        }
      >
        <div className="todoItem__heading">
          <div
            className="btn btn-complete"
            onClick={this.props.markComplete.bind(this, id)}
          >
            {completed ? <IconCheck /> : <IconEmpty />}
          </div>
          <p
            className="todoItem__title"
            onClick={() => {
              this.setState({ expanded: !this.state.expanded });
            }}
          >
            {title}
          </p>
          <Status
            status={{
              expired: this.state.expired,
              completed: this.props.todo.completed
            }}
          />
        </div>
        <div
          className={
            this.state.expanded
              ? "todoItem__details--show todoItem__details"
              : "todoItem__details"
          }
        >
          <div className="todoItem__body">
            {body ? (
              <p>{body}</p>
            ) : (
              <div className="todoItem__body__noDetails">
                <IconManSearching />
                <p className="todoItem__body__noDetails--text">No details</p>
              </div>
            )}
          </div>
          <div className="todoItem__sidemenu">
            <div className="todoItem__sidemenu__section">
              <p className="todoItem__sidemenu__text--secondary">Created at</p>
              <p className="todoItem__sidemenu__text--primary">{timeCreated}</p>
            </div>
            <div className="todoItem__sidemenu__section">
              <p className="todoItem__sidemenu__text--secondary">Deadline</p>
              <p className="todoItem__sidemenu__text--primary">{deadline}</p>
            </div>
            <TimeLeft
              timeLeft={this.state.timeLeft}
              completed={this.props.todo.completed}
            />
            <div
              className="btn btn-delete"
              onClick={this.props.deleteTodo.bind(this, id)}
            >
              Delete Task
            </div>
          </div>

          {/* <p>{this.props.convertDateFromISO(deadline)}</p> */}
        </div>
      </div>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired
};

export default TodoItem;
