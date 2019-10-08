import React, { Component } from "react";
import Calendar from "./Calendar";

export class AddTodo extends Component {
  state = {
    title: "",
    body: "",
    showForm: false,
    timeCreated: null,
    deadline: null,
    expired: false,
    timeLeft: null
  };

  onChangeTitle = e => {
    this.setState({ title: e.target.value });
  };
  onChangeBody = e => {
    this.setState({ body: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.title && this.state.body) {
      this.props.addtodo(
        this.state.title,
        this.state.body,
        this.state.timeCreated,
        this.state.deadline,
        this.state.expired,
        this.state.timeLeft
      );
      this.hideForm();
    }
    this.setState({ title: "", body: "" });
  };

  //convert date and show deadline
  formatDateFromISO = deadline => {
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

  //calculate how much time till the deadline
  calcTimeLeft = deadline => {
    console.log("working", deadline);
    // Current date in miliseconds
    const now = Date.now();
    // COnvert deadline to miliseconds
    const date = new Date(this.formatDateFromISO(deadline));
    const deadlineMiliseconds = date.getTime();

    // Find difference

    let differenceMsec = deadlineMiliseconds - now;
    if (differenceMsec < 0) {
      console.log("expired");
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

      if (days < 1) {
        console.log("Time left: " + hh + ":" + mm);
        this.setState({ timeLeft: hh + ":" + mm });
      } else {
        console.log("Time left: " + days + "days " + hh + ":" + mm);
        this.setState({ timeLeft: days + "days " + hh + ":" + mm });
      }
    }
  };

  showForm = () => {
    this.setState({ showForm: true });
  };

  hideForm = () => {
    this.setState({ showForm: false }, () => {});
  };

  selectedDeadline = deadline => {
    const formatedDeadline = this.formatDateFromISO(deadline);
    this.setState({ deadline: formatedDeadline }, () => {
      this.calcTimeLeft(deadline);
    });
  };

  createDate = () => {
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    const time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    this.setState({ timeCreated: date + " " + time });
  };

  render() {
    return (
      <>
        <div className="btn-addTodo" onClick={this.showForm}>
          +
        </div>
        <form
          className="addTodo__dialog"
          onSubmit={this.onSubmit}
          action=""
          style={
            this.state.showForm ? { display: "block" } : { display: "none" }
          }
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={this.state.title}
            onChange={this.onChangeTitle}
            maxLength="30"
          />
          <input
            type="text"
            name="body"
            placeholder="Add todo ..."
            value={this.state.body}
            onChange={this.onChangeBody}
          />

          <div className="deadline">
            Deadline:
            <Calendar deadline={this.selectedDeadline} />
          </div>
          <input
            type="submit"
            value="Add"
            className="btn btn-add"
            style={{ flex: "1" }}
            onClick={() => {
              this.createDate();
            }}
          />
          <button className="btn btn-cancel" onClick={this.hideForm}>
            Cancel
          </button>
        </form>
      </>
    );
  }
}

export default AddTodo;
