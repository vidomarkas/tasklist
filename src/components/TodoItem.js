import React, { Component } from "react";

import PropTypes from "prop-types";
import TimeLeft from "./TimeLeft";
import Status from "./Status";

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
            "days " +
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
    const { id, title, body, timeCreated, deadline } = this.props.todo;

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
            <svg
              className="btn-complete__svg"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="15px"
              height="15px"
              viewBox="0 0 442.533 442.533"
              style={{ enableBackgroundNew: "0 0 442.533 442.533" }}
              xmlSpace="preserve"
            >
              <g>
                <path
                  d="M434.539,98.499l-38.828-38.828c-5.324-5.328-11.799-7.993-19.41-7.993c-7.618,0-14.093,2.665-19.417,7.993L169.59,247.248
		l-83.939-84.225c-5.33-5.33-11.801-7.992-19.412-7.992c-7.616,0-14.087,2.662-19.417,7.992L7.994,201.852
		C2.664,207.181,0,213.654,0,221.269c0,7.609,2.664,14.088,7.994,19.416l103.351,103.349l38.831,38.828
		c5.327,5.332,11.8,7.994,19.414,7.994c7.611,0,14.084-2.669,19.414-7.994l38.83-38.828L434.539,137.33
		c5.325-5.33,7.994-11.802,7.994-19.417C442.537,110.302,439.864,103.829,434.539,98.499z"
                />
              </g>
            </svg>
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
          <p className="todoItem__dateCreated">{timeCreated}</p>

          <TimeLeft
            timeLeft={this.state.timeLeft}
            completed={this.props.todo.completed}
          />
          <p className="todoItem__body">{body}</p>
          {/* <p>{this.props.convertDateFromISO(deadline)}</p> */}
          <p className="todoItem__deadline">deadline {deadline}</p>

          <div
            className="btn btn-delete"
            onClick={this.props.deleteTodo.bind(this, id)}
          >
            Delete
          </div>
        </div>
      </div>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired
};

export default TodoItem;
